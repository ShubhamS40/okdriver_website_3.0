const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Driver routes
const otpRoutes = require('./routes/driver/DriverAuth/otpRoutes');
const driverRegistration = require('./routes/driver/DriverAuth/driverRegistration');
const driverAuthRoutes = require('./routes/driver/DriverAuth/driverAuth');

// Company routes
const companyRoutes = require('./routes/company/CompanyAuthRoutes/companyAuthRoute');
const companyChatRoutes = require('./routes/company/companyChatRoutes');

dotenv.config();
const app = express();
const http = require('http').createServer(app);
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

// Initialize Socket.IO
const { initializeSocketServer } = require('./socket');
const io = initializeSocketServer(http);

// Middlewares
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});

// Static audio
const audioDir = path.join(__dirname, 'audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}
app.use('/audio', express.static(audioDir));

// Routes
app.use('/api/driver', otpRoutes);
app.use('/api/drivers', driverRegistration);
app.use('/api/driver/auth', driverAuthRoutes);

// Company routes
app.use('/api/company', companyRoutes);
app.use('/api/admin/auth', require('./routes/admin/adminAuth/adminAuthRoute'));
app.use('/api/assistant', require('./routes/driver/DriverVoiceAssistant/driverVoiceAssistant'));

// WEBSITE ALL ROUTE
console.log('🔄 Loading company client routes...');
app.use('/api/company/clients', require('./routes/company/client/clientRoute'));
console.log('✅ Company client routes mounted at /api/company/clients');

app.use('/api/company/vehicles', require('./routes/company/vechile/companyVehicleRoute'));
app.use('/api/company', require('./routes/company/companyChatRoutes'));

// Admin  routes
app.use('/api/admin/driverplan', require('./routes/admin/driver/driverPlan/driverPlanRoute'));
app.use('/api/admin/companyplan', require('./routes/admin/company/companyPlan/planRoute'));

// Health check
app.get('/', (req, res) => {
  res.send('Ok Driver + Company Backend Services are Running Successfully');
});


// ---------------- SOCKET.IO REALTIME CHAT ----------------

// Authentication for sockets
io.use(async (socket, next) => {
  try {
    const { token, role, vehicleId } = socket.handshake.auth || {};
    if (!token) return next(new Error('unauthorized'));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (role === 'COMPANY') {
      const company = await prisma.company.findUnique({ where: { id: decoded.id } });
      if (!company) return next(new Error('unauthorized'));
      socket.data.companyId = company.id;
      socket.data.driver = false; // Explicitly set driver to false
    } else if (role === 'CLIENT') {
      socket.data.clientId = decoded.clientId;
      socket.data.driver = false; // Explicitly set driver to false
    } else if (role === 'DRIVER') {
      socket.data.driver = true;
      socket.data.vehicleId = decoded.vehicleId;
      socket.data.companyId = decoded.companyId; // Keep companyId for room joining
    }
    
    if (vehicleId) socket.data.vehicleId = Number(vehicleId);
    next();
  } catch (e) {
    console.error("❌ Socket auth failed:", e.message);
    next(new Error('unauthorized'));
  }
});

// Connection
io.on('connection', (socket) => {
  let room = undefined;
  
  console.log(`🔗 New socket connection: ${socket.id}`);
  console.log(`🔗 Socket data:`, socket.data);
  console.log(`🔗 Auth handshake:`, socket.handshake.auth);
  
  if (socket.data.vehicleId) {
    room = `vehicle:${socket.data.vehicleId}`;
    socket.join(room);
    console.log(`🚗 Vehicle ${socket.data.vehicleId} joined vehicle room`);
  }
  
  if (socket.data.companyId && socket.data.driver === false) {
    const companyRoom = `company:${socket.data.companyId}`;
    socket.join(companyRoom);
    console.log(`🏢 Company ${socket.data.companyId} joined company room`);
  }

  console.log(`🔗 Socket connected: ${socket.id}, joined room: ${room}`);

  // Send chat message (updated to use VehicleChat model)
  socket.on('chat:send', async (payload, cb) => {
    try {
      const { vehicleId, message, attachmentUrl } = payload || {};
      const vid = Number(vehicleId || socket.data.vehicleId);
      if (!vid || !message) return cb && cb({ ok: false, error: 'missing fields' });

      console.log(`📨 Received chat:send from socket ${socket.id}`);
      console.log(`📨 Vehicle ID: ${vid}, Message: ${message}`);
      console.log(`📨 Socket data:`, {
        companyId: socket.data.companyId,
        driver: socket.data.driver,
        vehicleId: socket.data.vehicleId,
        clientId: socket.data.clientId
      });
      console.log(`📨 Auth handshake:`, socket.handshake.auth);

      // Get vehicle info to find company
      const vehicle = await prisma.vehicle.findUnique({
        where: { id: vid },
        select: { companyId: true }
      });

      if (!vehicle) return cb && cb({ ok: false, error: 'vehicle not found' });

      // Sender identify and create VehicleChat data
      let data = { 
        vehicleId: vid, 
        companyId: vehicle.companyId,
        message: message.trim(), 
        senderType: 'DRIVER',
        attachmentUrl: attachmentUrl || null,
        isRead: false
      };
      
      // Fix: Check driver first, then company
      if (socket.data.driver && !socket.data.companyId) {
        data.senderType = 'DRIVER';
        console.log(`📤 Message from DRIVER (vehicle ${vid})`);
      } else if (socket.data.companyId && !socket.data.driver) {
        data.senderType = 'COMPANY';
        console.log(`📤 Message from COMPANY (${socket.data.companyId})`);
      } else if (socket.data.clientId) {
        data.senderType = 'CLIENT';
        console.log(`📤 Message from CLIENT (${socket.data.clientId})`);
      } else {
        // Default to DRIVER if we can't determine
        data.senderType = 'DRIVER';
        console.log(`📤 Message from DRIVER (default, vehicle ${vid})`);
      }

      // Save chat in VehicleChat table
      const chat = await prisma.vehicleChat.create({ data });
      console.log(`💾 Message saved to database: ${chat.senderType} - ${chat.message}`);

      // Broadcast to room with enhanced message data
      const messageData = {
        id: chat.id,
        message: chat.message,
        senderType: chat.senderType,
        createdAt: chat.createdAt,
        attachmentUrl: chat.attachmentUrl,
        isRead: chat.isRead,
        vehicleId: chat.vehicleId,
        companyId: chat.companyId
      };

      // Send to vehicle room (driver will receive)
      io.to(`vehicle:${vid}`).emit('new_message', messageData);
      
      // Send to company room (company will receive)
      io.to(`company:${vehicle.companyId}`).emit('new_message', messageData);
      
      console.log(`📤 Message broadcasted: ${chat.senderType} -> Vehicle:${vid}, Company:${vehicle.companyId}`);

      cb && cb({ ok: true, chat: messageData });
    } catch (err) {
      console.error('chat:send error', err);
      cb && cb({ ok: false, error: 'internal' });
    }
  });

  // Fetch chat history (updated to use VehicleChat model)
  socket.on('chat:history', async (vehicleId, cb) => {
    try {
      const vid = Number(vehicleId || socket.data.vehicleId);
      if (!vid) return cb && cb({ ok: false, error: 'missing vehicleId' });

      // Get only last 24 hours of messages
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      const chats = await prisma.vehicleChat.findMany({
        where: { 
          vehicleId: vid,
          createdAt: {
            gte: oneDayAgo
          }
        },
        orderBy: { createdAt: 'asc' }
      });

      cb && cb({ ok: true, chats });
    } catch (err) {
      console.error('chat:history error', err);
      cb && cb({ ok: false, error: 'internal' });
    }
  });

  // Mark messages as read
  socket.on('mark_messages_read', async (payload, cb) => {
    try {
      const { messageIds, vehicleId } = payload || {};
      const vid = Number(vehicleId || socket.data.vehicleId);
      
      if (!vid || !messageIds || !Array.isArray(messageIds)) {
        return cb && cb({ ok: false, error: 'missing fields' });
      }

      await prisma.vehicleChat.updateMany({
        where: {
          id: { in: messageIds },
          vehicleId: vid,
          senderType: socket.data.companyId ? 'DRIVER' : 'COMPANY'
        },
        data: {
          isRead: true
        }
      });

      cb && cb({ ok: true });
    } catch (err) {
      console.error('mark_messages_read error', err);
      cb && cb({ ok: false, error: 'internal' });
    }
  });

  // Get unread count
  socket.on('get_unread_count', async (payload, cb) => {
    try {
      const { vehicleId } = payload || {};
      const vid = Number(vehicleId || socket.data.vehicleId);
      
      if (!vid) return cb && cb({ ok: false, error: 'missing vehicleId' });

      const unreadCount = await prisma.vehicleChat.count({
        where: {
          vehicleId: vid,
          senderType: socket.data.companyId ? 'DRIVER' : 'COMPANY',
          isRead: false
        }
      });

      cb && cb({ ok: true, unreadCount });
    } catch (err) {
      console.error('get_unread_count error', err);
      cb && cb({ ok: false, error: 'internal' });
    }
  });

  socket.on('disconnect', () => {
    console.log(`❌ Socket disconnected: ${socket.id}`);
  });
});

// Scheduled cleanup for old messages (every hour)
setInterval(async () => {
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const result = await prisma.vehicleChat.deleteMany({
      where: {
        createdAt: {
          lt: oneDayAgo
        }
      }
    });

    if (result.count > 0) {
      console.log(`🧹 Cleaned up ${result.count} old chat messages`);
    }
  } catch (error) {
    console.error('❌ Error cleaning up old messages:', error);
  }
}, 60 * 60 * 1000); // Run every hour

// Start server
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
  console.log(`✅ Server + Socket.IO started on port ${PORT}`);
  console.log(`🧹 Message cleanup scheduled every hour`);
});
