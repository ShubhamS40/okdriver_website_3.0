'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, BookOpen, Zap, Shield, Globe, Smartphone, Database, Cloud, Terminal, Users, Settings, BarChart3 } from 'lucide-react';

export default function DeveloperPage() {
  const [activeTab, setActiveTab] = useState('dms');

  const apiTabs = [
    { id: 'dms', label: 'DMS API', icon: Database },
    { id: 'assistant', label: 'OKDriver Assistant', icon: Users },
    { id: 'integration', label: 'Integration Guide', icon: Settings }
  ];

  const dmsEndpoints = [
    {
      method: 'POST',
      endpoint: '/api/dms/vehicles',
      description: 'Register a new vehicle',
      params: ['companyId', 'vehicleType', 'licensePlate', 'driverId'],
      example: {
        companyId: 'comp_123',
        vehicleType: 'truck',
        licensePlate: 'ABC-1234',
        driverId: 'driver_456'
      }
    },
    {
      method: 'GET',
      endpoint: '/api/dms/vehicles/{id}',
      description: 'Get vehicle details',
      params: ['vehicleId'],
      example: {
        vehicleId: 'vehicle_789'
      }
    },
    {
      method: 'PUT',
      endpoint: '/api/dms/vehicles/{id}',
      description: 'Update vehicle information',
      params: ['vehicleId', 'status', 'location'],
      example: {
        vehicleId: 'vehicle_789',
        status: 'active',
        location: { lat: 40.7128, lng: -74.0060 }
      }
    },
    {
      method: 'GET',
      endpoint: '/api/dms/drivers',
      description: 'Get all drivers for a company',
      params: ['companyId', 'status'],
      example: {
        companyId: 'comp_123',
        status: 'active'
      }
    }
  ];

  const assistantEndpoints = [
    {
      method: 'POST',
      endpoint: '/api/assistant/chat',
      description: 'Send message to OKDriver Assistant',
      params: ['message', 'driverId', 'context'],
      example: {
        message: 'What is my next delivery?',
        driverId: 'driver_456',
        context: 'delivery_schedule'
      }
    },
    {
      method: 'GET',
      endpoint: '/api/assistant/voice',
      description: 'Get voice response for driver',
      params: ['driverId', 'query'],
      example: {
        driverId: 'driver_456',
        query: 'route_optimization'
      }
    },
    {
      method: 'POST',
      endpoint: '/api/assistant/notifications',
      description: 'Send notification to driver',
      params: ['driverId', 'message', 'type'],
      example: {
        driverId: 'driver_456',
        message: 'New delivery assigned',
        type: 'urgent'
      }
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'JWT-based authentication with role-based access control'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'WebSocket support for live vehicle tracking and notifications'
    },
    {
      icon: Globe,
      title: 'RESTful API',
      description: 'Standard REST endpoints with comprehensive documentation'
    },
    {
      icon: Smartphone,
      title: 'Mobile Ready',
      description: 'Optimized for mobile applications and driver interfaces'
    }
  ];

  const codeExample = `// Example: Integrating DMS API
import axios from 'axios';

const API_BASE_URL = 'https://api.okdriver.com';

// Register a new vehicle
const registerVehicle = async (vehicleData) => {
  try {
    const response = await axios.post(\`\${API_BASE_URL}/api/dms/vehicles\`, vehicleData, {
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error registering vehicle:', error);
  }
};

// Get vehicle location
const getVehicleLocation = async (vehicleId) => {
  try {
    const response = await axios.get(\`\${API_BASE_URL}/api/dms/vehicles/\${vehicleId}/location\`, {
      headers: {
        'Authorization': \`Bearer \${token}\`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching location:', error);
  }
};

// Send message to OKDriver Assistant
const sendToAssistant = async (message, driverId) => {
  try {
    const response = await axios.post(\`\${API_BASE_URL}/api/assistant/chat\`, {
      message,
      driverId,
      context: 'general'
    }, {
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
  }
};`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Developer <span className="text-yellow-300">Portal</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Integrate OKDriver's powerful APIs into your applications. Build amazing driver management and assistant features.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                <Code className="w-5 h-5 inline mr-2" />
                Get API Key
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                <BookOpen className="w-5 h-5 inline mr-2" />
                View Documentation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful API Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to build comprehensive driver management solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* API Documentation Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              API Documentation
            </h2>
            <p className="text-xl text-gray-600">
              Explore our comprehensive API endpoints and integration guides
            </p>
          </motion.div>

          {/* API Tabs */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex">
                {apiTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5 inline mr-2" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* DMS API Tab */}
              {activeTab === 'dms' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">DMS API Endpoints</h3>
                  <div className="space-y-6">
                    {dmsEndpoints.map((endpoint, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                        <div className="flex items-center mb-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                            endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                            endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {endpoint.method}
                          </span>
                          <code className="ml-4 text-lg font-mono text-gray-800">
                            {endpoint.endpoint}
                          </code>
                        </div>
                        <p className="text-gray-700 mb-4">{endpoint.description}</p>
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Parameters:</h4>
                          <div className="flex flex-wrap gap-2">
                            {endpoint.params.map((param, paramIndex) => (
                              <span key={paramIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                                {param}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Example Request:</h4>
                          <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto">
                            <code>{JSON.stringify(endpoint.example, null, 2)}</code>
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Assistant API Tab */}
              {activeTab === 'assistant' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">OKDriver Assistant API</h3>
                  <div className="space-y-6">
                    {assistantEndpoints.map((endpoint, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                        <div className="flex items-center mb-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                            endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                            endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {endpoint.method}
                          </span>
                          <code className="ml-4 text-lg font-mono text-gray-800">
                            {endpoint.endpoint}
                          </code>
                        </div>
                        <p className="text-gray-700 mb-4">{endpoint.description}</p>
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Parameters:</h4>
                          <div className="flex flex-wrap gap-2">
                            {endpoint.params.map((param, paramIndex) => (
                              <span key={paramIndex} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
                                {param}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Example Request:</h4>
                          <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto">
                            <code>{JSON.stringify(endpoint.example, null, 2)}</code>
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Integration Guide Tab */}
              {activeTab === 'integration' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Integration Guide</h3>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">Quick Start</h4>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>Register for an API key at our developer portal</li>
                        <li>Install the OKDriver SDK or use direct HTTP requests</li>
                        <li>Authenticate using your API key</li>
                        <li>Start making API calls to integrate driver management</li>
                      </ol>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">Code Example</h4>
                      <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto">
                        <code>{codeExample}</code>
                      </pre>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">SDK Support</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-white rounded-lg">
                          <Terminal className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                          <h5 className="font-semibold">JavaScript</h5>
                          <p className="text-sm text-gray-600">npm install okdriver-sdk</p>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg">
                          <Terminal className="w-8 h-8 text-green-600 mx-auto mb-2" />
                          <h5 className="font-semibold">Python</h5>
                          <p className="text-sm text-gray-600">pip install okdriver</p>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg">
                          <Terminal className="w-8 h-8 text-red-600 mx-auto mb-2" />
                          <h5 className="font-semibold">PHP</h5>
                          <p className="text-sm text-gray-600">composer require okdriver/sdk</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Join thousands of developers building amazing driver management solutions with OKDriver APIs
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                <Cloud className="w-5 h-5 inline mr-2" />
                Start Building
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                <BarChart3 className="w-5 h-5 inline mr-2" />
                View Analytics
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
