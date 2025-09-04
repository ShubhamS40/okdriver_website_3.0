const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const http = require('http');

// Import Kafka and WebSocket services
const { initializeProducer, initializeConsumer } = require('./config/kafka');
const webSocketService = require('./services/websocketService');
const locationProcessor = require('./services/locationProcessor');

// Driver routes
const otpRoutes = require('./routes/driver/DriverAuth/otpRoutes');
const driverRegistration = require('./routes/driver/DriverAuth/driverRegistration');
const driverAuthRoutes = require('./routes/driver/DriverAuth/driverAuth');

// Company routes
const companyRoutes = require('./routes/company/CompanyAuthRoutes/companyAuthRoute');



dotenv.config();
const app = express();

// Create HTTP server for WebSocket
const server = http.createServer(app);

// Middlewares
app.use(cors());
app.use(express.json());

// Request logger to debug routing issues
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});

// Static audio serving and directory setup (for Voice Assistant)
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

// Voice Assistant routes
app.use('/api/assistant', require('./routes/driver/DriverVoiceAssistant/driverVoiceAssistant'));






// WEBSITE ALL ROUTE 

// company routes
app.use('/api/company/vehicles', require('./routes/company/vechile/companyVehicleRoute'));

console.log('🔄 Loading company client routes...');
app.use('/api/company/clients', (req, res, next) => {
  console.log('🔍 Client route hit:', req.method, req.path);
  next();
}, require('./routes/company/client/clientRoute'));
console.log('✅ Company client routes mounted at /api/company/clients');


// Admin  routes

app.use('/api/admin/driverplan', require('./routes/admin/driver/driverPlan/driverPlanRoute'));
app.use('/api/admin/companyplan', require('./routes/admin/company/companyPlan/planRoute'));





// // Admin routes
// app.use('/api/admin/company/plans', require('./routes/admin/company/companyPlan/planRoute'));
// app.use('/api/admin/company/auth', require('./routes/company/CompanyAuthRoutes/companyAuthRoute'));
// app.use('/api/admin/company/vehicles', require('./routes/company/vechile/companyVehicleRoute'));
// app.use('/api/admin/company/clients', require('./routes/admin/companyClients'));




// Health check route
app.get('/', (req, res) => {
  res.send('Ok Driver + Company Backend Services are Running Successfully');
});


// Initialize Kafka and WebSocket services
async function initializeServices() {
  try {
    console.log('🚀 Initializing Kafka and WebSocket services...');
    
    // Initialize Kafka producer
    await initializeProducer();
    
    // Initialize Kafka consumer
    await initializeConsumer();
    
    // Initialize WebSocket service
    webSocketService.initialize(server);
    
    // Start location processor
    await locationProcessor.start();
    
    console.log('✅ All services initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize services:', error);
    process.exit(1);
  }
}

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
  
  // Initialize services after server starts
  initializeServices();
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 Received SIGTERM, shutting down gracefully...');
  
  try {
    await locationProcessor.cleanup();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
});

process.on('SIGINT', async () => {
  console.log('🛑 Received SIGINT, shutting down gracefully...');
  
  try {
    await locationProcessor.cleanup();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
});
