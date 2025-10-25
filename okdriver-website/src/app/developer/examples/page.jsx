'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Copy, Play, Download, ExternalLink, CheckCircle, Filter, Search } from 'lucide-react';

export default function ExamplesPage() {
  const [copiedCode, setCopiedCode] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Examples' },
    { id: 'dms', label: 'DMS Integration' },
    { id: 'assistant', label: 'Assistant API' },
    { id: 'webhooks', label: 'Webhooks' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'dashboard', label: 'Dashboard' }
  ];

  const examples = [
    {
      id: 'vehicle-tracking',
      category: 'dms',
      title: 'Real-time Vehicle Tracking',
      description: 'Track vehicle locations in real-time using WebSocket connections',
      difficulty: 'Intermediate',
      language: 'JavaScript',
      tags: ['WebSocket', 'Real-time', 'Location'],
      codeExample: `// Real-time vehicle tracking with WebSocket
import { OKDriver } from 'okdriver-sdk';

const client = new OKDriver({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Connect to WebSocket for real-time updates
const ws = new WebSocket('wss://api.okdriver.com/ws');

ws.onopen = () => {
  console.log('Connected to OKDriver WebSocket');
  
  // Subscribe to vehicle location updates
  ws.send(JSON.stringify({
    type: 'subscribe',
    channel: 'vehicle_locations',
    companyId: 'comp_123'
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  if (data.type === 'vehicle_location_update') {
    updateVehicleLocation(data.vehicleId, data.location);
  }
};

function updateVehicleLocation(vehicleId, location) {
  // Update your UI with new vehicle location
  const vehicleElement = document.getElementById(\`vehicle-\${vehicleId}\`);
  if (vehicleElement) {
    vehicleElement.style.left = \`\${location.lat}px\`;
    vehicleElement.style.top = \`\${location.lng}px\`;
  }
}

// Get initial vehicle locations
const vehicles = await client.dms.vehicles.list({
  companyId: 'comp_123',
  status: 'active'
});

vehicles.data.forEach(vehicle => {
  displayVehicle(vehicle);
});`,
      explanation: 'This example shows how to implement real-time vehicle tracking using WebSocket connections. It subscribes to location updates and updates the UI accordingly.'
    },
    {
      id: 'driver-assistant-chat',
      category: 'assistant',
      title: 'Driver Assistant Chat Integration',
      description: 'Integrate OKDriver Assistant into your driver mobile app',
      difficulty: 'Beginner',
      language: 'React Native',
      tags: ['Chat', 'Mobile', 'Assistant'],
      codeExample: `// React Native driver assistant chat
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { OKDriver } from 'okdriver-sdk';

const ChatScreen = ({ driverId }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const client = new OKDriver({
    apiKey: 'your-api-key',
    environment: 'production'
  });

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await client.assistant.chat({
        message: inputText,
        driverId: driverId,
        context: 'driver_chat'
      });

      const assistantMessage = {
        id: Date.now() + 1,
        text: response.data.response,
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{
            alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: item.sender === 'user' ? '#007AFF' : '#F0F0F0',
            padding: 12,
            borderRadius: 16,
            marginVertical: 4,
            maxWidth: '80%'
          }}>
            <Text style={{
              color: item.sender === 'user' ? 'white' : 'black'
            }}>
              {item.text}
            </Text>
          </View>
        )}
      />
      
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#DDD',
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 12,
            marginRight: 8
          }}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask OKDriver Assistant..."
          multiline
        />
        <TouchableOpacity
          onPress={sendMessage}
          disabled={isLoading}
          style={{
            backgroundColor: '#007AFF',
            borderRadius: 20,
            padding: 12,
            opacity: isLoading ? 0.5 : 1
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {isLoading ? '...' : 'Send'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;`,
      explanation: 'This React Native example shows how to integrate OKDriver Assistant into a mobile app, allowing drivers to chat with the AI assistant.'
    },
    {
      id: 'webhook-handler',
      category: 'webhooks',
      title: 'Webhook Event Handler',
      description: 'Handle webhook events from OKDriver in your backend',
      difficulty: 'Intermediate',
      language: 'Node.js',
      tags: ['Webhooks', 'Backend', 'Events'],
      codeExample: `// Express.js webhook handler
const express = require('express');
const crypto = require('crypto');
const { OKDriver } = require('okdriver-sdk');

const app = express();
app.use(express.json());

// Initialize OKDriver client
const client = new OKDriver({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Verify webhook signature
function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

// Webhook endpoint
app.post('/webhook/okdriver', (req, res) => {
  const signature = req.headers['x-okdriver-signature'];
  const payload = JSON.stringify(req.body);
  
  // Verify webhook signature
  if (!verifyWebhookSignature(payload, signature, process.env.WEBHOOK_SECRET)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  const event = req.body;
  
  switch (event.type) {
    case 'vehicle.created':
      handleVehicleCreated(event.data);
      break;
      
    case 'vehicle.updated':
      handleVehicleUpdated(event.data);
      break;
      
    case 'driver.status_changed':
      handleDriverStatusChanged(event.data);
      break;
      
    case 'delivery.completed':
      handleDeliveryCompleted(event.data);
      break;
      
    default:
      console.log('Unknown event type:', event.type);
  }
  
  res.status(200).json({ received: true });
});

// Event handlers
async function handleVehicleCreated(vehicleData) {
  console.log('New vehicle created:', vehicleData);
  
  // Send notification to admin
  await sendNotification({
    type: 'vehicle_created',
    message: \`New vehicle \${vehicleData.licensePlate} has been registered\`,
    vehicleId: vehicleData.id
  });
}

async function handleDriverStatusChanged(driverData) {
  console.log('Driver status changed:', driverData);
  
  // Update driver status in your database
  await updateDriverStatus(driverData.id, driverData.status);
  
  // Notify relevant parties
  if (driverData.status === 'offline') {
    await notifyDispatcher(driverData.id, 'Driver went offline');
  }
}

async function handleDeliveryCompleted(deliveryData) {
  console.log('Delivery completed:', deliveryData);
  
  // Update delivery status
  await updateDeliveryStatus(deliveryData.id, 'completed');
  
  // Calculate driver performance
  await calculateDriverPerformance(deliveryData.driverId);
}

// Helper functions
async function sendNotification(notification) {
  // Implement your notification logic
  console.log('Sending notification:', notification);
}

async function updateDriverStatus(driverId, status) {
  // Update driver status in your database
  console.log(\`Updating driver \${driverId} status to \${status}\`);
}

async function notifyDispatcher(driverId, message) {
  // Notify dispatcher about driver status
  console.log(\`Notifying dispatcher: \${message}\`);
}

async function updateDeliveryStatus(deliveryId, status) {
  // Update delivery status in your database
  console.log(\`Updating delivery \${deliveryId} status to \${status}\`);
}

async function calculateDriverPerformance(driverId) {
  // Calculate and update driver performance metrics
  console.log(\`Calculating performance for driver \${driverId}\`);
}

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});`,
      explanation: 'This Node.js example shows how to handle webhook events from OKDriver, including signature verification and event processing.'
    },
    {
      id: 'dashboard-integration',
      category: 'dashboard',
      title: 'Fleet Management Dashboard',
      description: 'Build a comprehensive fleet management dashboard',
      difficulty: 'Advanced',
      language: 'React',
      tags: ['Dashboard', 'React', 'Charts'],
      codeExample: `// React fleet management dashboard
import React, { useState, useEffect } from 'react';
import { OKDriver } from 'okdriver-sdk';
import { LineChart, BarChart, PieChart } from 'recharts';

const FleetDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const client = new OKDriver({
    apiKey: 'your-api-key',
    environment: 'production'
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load vehicles
      const vehiclesResponse = await client.dms.vehicles.list({
        companyId: 'comp_123'
      });
      setVehicles(vehiclesResponse.data);

      // Load drivers
      const driversResponse = await client.dms.drivers.list({
        companyId: 'comp_123'
      });
      setDrivers(driversResponse.data);

      // Load statistics
      const statsResponse = await client.analytics.getStats({
        companyId: 'comp_123',
        period: '30d'
      });
      setStats(statsResponse.data);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const VehicleCard = ({ vehicle }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{vehicle.licensePlate}</h3>
          <p className="text-sm text-gray-600">{vehicle.vehicleType}</p>
        </div>
        <div className={\`px-2 py-1 rounded-full text-xs \${
          vehicle.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }\`}>
          {vehicle.status}
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        Driver: {vehicle.driverName || 'Unassigned'}
      </div>
    </div>
  );

  const DriverCard = ({ driver }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{driver.name}</h3>
          <p className="text-sm text-gray-600">{driver.email}</p>
        </div>
        <div className={\`px-2 py-1 rounded-full text-xs \${
          driver.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }\`}>
          {driver.status}
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        Vehicle: {driver.vehicleId || 'None'}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Fleet Management Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Vehicles</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.totalVehicles || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Active Drivers</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.activeDrivers || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Deliveries Today</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.deliveriesToday || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Fuel Efficiency</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.fuelEfficiency || 0}%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Delivery Trends</h3>
          <LineChart width={400} height={200} data={stats.deliveryTrends || []}>
            <LineChart.Line type="monotone" dataKey="deliveries" stroke="#8884d8" />
          </LineChart>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Vehicle Status</h3>
          <PieChart width={400} height={200}>
            <PieChart.Pie data={stats.vehicleStatus || []} dataKey="value" nameKey="name" />
          </PieChart>
        </div>
      </div>

      {/* Vehicles and Drivers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Vehicles</h2>
          <div className="space-y-4">
            {vehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Drivers</h2>
          <div className="space-y-4">
            {drivers.map(driver => (
              <DriverCard key={driver.id} driver={driver} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetDashboard;`,
      explanation: 'This React example shows how to build a comprehensive fleet management dashboard with real-time data, charts, and vehicle/driver management.'
    },
    {
      id: 'mobile-driver-app',
      category: 'mobile',
      title: 'Driver Mobile App Integration',
      description: 'Complete mobile app integration for drivers',
      difficulty: 'Advanced',
      language: 'Flutter',
      tags: ['Mobile', 'Flutter', 'Driver App'],
      codeExample: `// Flutter driver mobile app
import 'package:flutter/material.dart';
import 'package:okdriver_flutter/okdriver_flutter.dart';

class DriverApp extends StatefulWidget {
  @override
  _DriverAppState createState() => _DriverAppState();
}

class _DriverAppState extends State<DriverApp> {
  late OKDriverClient client;
  Driver? currentDriver;
  List<Delivery> deliveries = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    initializeClient();
    loadDriverData();
  }

  void initializeClient() {
    client = OKDriverClient(
      apiKey: 'your-api-key',
      environment: 'production',
    );
  }

  Future<void> loadDriverData() async {
    try {
      // Get current driver
      final driverResponse = await client.dms.drivers.getCurrent();
      setState(() {
        currentDriver = driverResponse.data;
      });

      // Get driver's deliveries
      final deliveriesResponse = await client.dms.deliveries.list(
        driverId: currentDriver!.id,
        status: 'pending',
      );
      setState(() {
        deliveries = deliveriesResponse.data;
      });

    } catch (e) {
      print('Error loading driver data: \$e');
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> startDelivery(String deliveryId) async {
    try {
      await client.dms.deliveries.updateStatus(
        deliveryId: deliveryId,
        status: 'in_progress',
      );
      
      // Show success message
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Delivery started successfully')),
      );
      
      // Reload data
      loadDriverData();
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error starting delivery: \$e')),
      );
    }
  }

  Future<void> completeDelivery(String deliveryId) async {
    try {
      await client.dms.deliveries.updateStatus(
        deliveryId: deliveryId,
        status: 'completed',
      );
      
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Delivery completed successfully')),
      );
      
      loadDriverData();
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error completing delivery: \$e')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Text('Driver Dashboard'),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
      ),
      body: Column(
        children: [
          // Driver Info Card
          Container(
            margin: EdgeInsets.all(16),
            padding: EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.blue[50],
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              children: [
                CircleAvatar(
                  radius: 30,
                  backgroundColor: Colors.blue,
                  child: Text(
                    currentDriver?.name.substring(0, 1) ?? 'D',
                    style: TextStyle(fontSize: 24, color: Colors.white),
                  ),
                ),
                SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        currentDriver?.name ?? 'Driver',
                        style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        currentDriver?.email ?? '',
                        style: TextStyle(color: Colors.grey[600]),
                      ),
                      Container(
                        margin: EdgeInsets.only(top: 8),
                        padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.green,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          'Online',
                          style: TextStyle(color: Colors.white, fontSize: 12),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // Deliveries List
          Expanded(
            child: ListView.builder(
              itemCount: deliveries.length,
              itemBuilder: (context, index) {
                final delivery = deliveries[index];
                return Card(
                  margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: ListTile(
                    title: Text('Delivery #\${delivery.id}'),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('From: \${delivery.pickupAddress}'),
                        Text('To: \${delivery.deliveryAddress}'),
                        Text('Status: \${delivery.status}'),
                      ],
                    ),
                    trailing: delivery.status == 'pending'
                        ? ElevatedButton(
                            onPressed: () => startDelivery(delivery.id),
                            child: Text('Start'),
                          )
                        : delivery.status == 'in_progress'
                            ? ElevatedButton(
                                onPressed: () => completeDelivery(delivery.id),
                                child: Text('Complete'),
                              )
                            : null,
                  ),
                );
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Open chat with assistant
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => AssistantChatScreen()),
          );
        },
        child: Icon(Icons.chat),
        backgroundColor: Colors.blue,
      ),
    );
  }
}

class AssistantChatScreen extends StatefulWidget {
  @override
  _AssistantChatScreenState createState() => _AssistantChatScreenState();
}

class _AssistantChatScreenState extends State<AssistantChatScreen> {
  final TextEditingController _messageController = TextEditingController();
  List<ChatMessage> messages = [];
  late OKDriverClient client;

  @override
  void initState() {
    super.initState();
    client = OKDriverClient(
      apiKey: 'your-api-key',
      environment: 'production',
    );
  }

  Future<void> sendMessage() async {
    final message = _messageController.text.trim();
    if (message.isEmpty) return;

    setState(() {
      messages.add(ChatMessage(
        text: message,
        isUser: true,
        timestamp: DateTime.now(),
      ));
    });

    _messageController.clear();

    try {
      final response = await client.assistant.chat(
        message: message,
        driverId: 'current_driver_id',
        context: 'driver_chat',
      );

      setState(() {
        messages.add(ChatMessage(
          text: response.data.response,
          isUser: false,
          timestamp: DateTime.now(),
        ));
      });
    } catch (e) {
      setState(() {
        messages.add(ChatMessage(
          text: 'Sorry, I encountered an error. Please try again.',
          isUser: false,
          timestamp: DateTime.now(),
        ));
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('OKDriver Assistant'),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: messages.length,
              itemBuilder: (context, index) {
                final message = messages[index];
                return Align(
                  alignment: message.isUser ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    margin: EdgeInsets.all(8),
                    padding: EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: message.isUser ? Colors.blue : Colors.grey[300],
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      message.text,
                      style: TextStyle(
                        color: message.isUser ? Colors.white : Colors.black,
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          Container(
            padding: EdgeInsets.all(16),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _messageController,
                    decoration: InputDecoration(
                      hintText: 'Ask OKDriver Assistant...',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(24),
                      ),
                    ),
                  ),
                ),
                SizedBox(width: 8),
                FloatingActionButton(
                  onPressed: sendMessage,
                  child: Icon(Icons.send),
                  backgroundColor: Colors.blue,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class ChatMessage {
  final String text;
  final bool isUser;
  final DateTime timestamp;

  ChatMessage({
    required this.text,
    required this.isUser,
    required this.timestamp,
  });
}

void main() {
  runApp(MaterialApp(
    home: DriverApp(),
  ));
}`,
      explanation: 'This Flutter example shows a complete driver mobile app with delivery management, real-time updates, and OKDriver Assistant integration.'
    }
  ];

  const filteredExamples = examples.filter(example => {
    const matchesSearch = example.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         example.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         example.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || example.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = async (code, exampleId) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(exampleId);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Code Examples</h1>
            <p className="text-gray-600">Real-world implementations and integration examples</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search examples..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left text-blue-600 hover:text-blue-800 text-sm flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Download All Examples
                  </button>
                  <button className="w-full text-left text-blue-600 hover:text-blue-800 text-sm flex items-center">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on GitHub
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {filteredExamples.map((example, index) => (
                <motion.div
                  key={example.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  {/* Example Header */}
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h2 className="text-xl font-bold text-gray-900">{example.title}</h2>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(example.difficulty)}`}>
                          {example.difficulty}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-semibold">
                          {example.language}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => copyToClipboard(example.codeExample, example.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Copy code"
                        >
                          {copiedCode === example.id ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Run example">
                          <Play className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Download">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{example.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {example.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Code Example */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">Code Example</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">{example.language}</span>
                          <button
                            onClick={() => copyToClipboard(example.codeExample, example.id)}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {copiedCode === example.id ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{example.codeExample}</code>
                      </pre>
                    </div>

                    {/* Explanation */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">How it works</h4>
                      <p className="text-gray-700">{example.explanation}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-12 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-4">Need More Examples?</h2>
              <p className="text-blue-100 mb-6">
                Explore our comprehensive collection of examples and tutorials
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="/developer/api-docs" className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
                  <Code className="w-6 h-6 mb-2" />
                  <h3 className="font-semibold">API Documentation</h3>
                  <p className="text-sm text-blue-100">Complete API reference</p>
                </a>
                <a href="/developer/sdk" className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
                  <Download className="w-6 h-6 mb-2" />
                  <h3 className="font-semibold">SDK Downloads</h3>
                  <p className="text-sm text-blue-100">Official SDKs</p>
                </a>
                <a href="/contact" className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
                  <ExternalLink className="w-6 h-6 mb-2" />
                  <h3 className="font-semibold">Community</h3>
                  <p className="text-sm text-blue-100">Get help from developers</p>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
