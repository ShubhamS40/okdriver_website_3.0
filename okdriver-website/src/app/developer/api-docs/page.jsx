'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Copy, Check, Play, Download, ExternalLink, Search, Filter } from 'lucide-react';

export default function ApiDocsPage() {
  const [copiedCode, setCopiedCode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All APIs' },
    { id: 'dms', label: 'DMS API' },
    { id: 'assistant', label: 'Assistant API' },
    { id: 'auth', label: 'Authentication' },
    { id: 'webhooks', label: 'Webhooks' }
  ];

  const apiEndpoints = [
    {
      id: 'dms-vehicles',
      category: 'dms',
      method: 'POST',
      endpoint: '/api/dms/vehicles',
      title: 'Register Vehicle',
      description: 'Register a new vehicle in the DMS system',
      parameters: [
        { name: 'companyId', type: 'string', required: true, description: 'Unique company identifier' },
        { name: 'vehicleType', type: 'string', required: true, description: 'Type of vehicle (truck, van, car)' },
        { name: 'licensePlate', type: 'string', required: true, description: 'Vehicle license plate number' },
        { name: 'driverId', type: 'string', required: false, description: 'Assigned driver ID' },
        { name: 'capacity', type: 'number', required: false, description: 'Vehicle capacity in kg' }
      ],
      response: {
        success: true,
        data: {
          vehicleId: 'veh_123456',
          companyId: 'comp_789',
          vehicleType: 'truck',
          licensePlate: 'ABC-1234',
          status: 'active',
          createdAt: '2024-01-15T10:30:00Z'
        }
      },
      codeExample: `// Register a new vehicle
const registerVehicle = async (vehicleData) => {
  const response = await fetch('https://api.okdriver.com/api/dms/vehicles', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(vehicleData)
  });
  
  return await response.json();
};

// Example usage
const newVehicle = await registerVehicle({
  companyId: 'comp_789',
  vehicleType: 'truck',
  licensePlate: 'ABC-1234',
  capacity: 5000
});`
    },
    {
      id: 'dms-drivers',
      category: 'dms',
      method: 'GET',
      endpoint: '/api/dms/drivers',
      title: 'Get Drivers',
      description: 'Retrieve all drivers for a company',
      parameters: [
        { name: 'companyId', type: 'string', required: true, description: 'Company identifier' },
        { name: 'status', type: 'string', required: false, description: 'Filter by driver status' },
        { name: 'limit', type: 'number', required: false, description: 'Number of results to return' },
        { name: 'offset', type: 'number', required: false, description: 'Number of results to skip' }
      ],
      response: {
        success: true,
        data: [
          {
            driverId: 'drv_123',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            status: 'active',
            vehicleId: 'veh_123456'
          }
        ],
        pagination: {
          total: 1,
          limit: 10,
          offset: 0
        }
      },
      codeExample: `// Get all drivers for a company
const getDrivers = async (companyId, filters = {}) => {
  const queryParams = new URLSearchParams({
    companyId,
    ...filters
  });
  
  const response = await fetch(\`https://api.okdriver.com/api/dms/drivers?\${queryParams}\`, {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  });
  
  return await response.json();
};

// Example usage
const drivers = await getDrivers('comp_789', {
  status: 'active',
  limit: 20
});`
    },
    {
      id: 'assistant-chat',
      category: 'assistant',
      method: 'POST',
      endpoint: '/api/assistant/chat',
      title: 'Send Message',
      description: 'Send a message to OKDriver Assistant',
      parameters: [
        { name: 'message', type: 'string', required: true, description: 'Message content' },
        { name: 'driverId', type: 'string', required: true, description: 'Driver identifier' },
        { name: 'context', type: 'string', required: false, description: 'Message context' },
        { name: 'priority', type: 'string', required: false, description: 'Message priority level' }
      ],
      response: {
        success: true,
        data: {
          messageId: 'msg_456',
          response: 'Your next delivery is scheduled for 2:30 PM at 123 Main St.',
          timestamp: '2024-01-15T14:30:00Z',
          context: 'delivery_schedule'
        }
      },
      codeExample: `// Send message to assistant
const sendMessage = async (message, driverId, context = 'general') => {
  const response = await fetch('https://api.okdriver.com/api/assistant/chat', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message,
      driverId,
      context
    })
  });
  
  return await response.json();
};

// Example usage
const response = await sendMessage(
  'What is my next delivery?',
  'drv_123',
  'delivery_schedule'
);`
    },
    {
      id: 'auth-login',
      category: 'auth',
      method: 'POST',
      endpoint: '/api/auth/login',
      title: 'User Login',
      description: 'Authenticate user and get access token',
      parameters: [
        { name: 'email', type: 'string', required: true, description: 'User email address' },
        { name: 'password', type: 'string', required: true, description: 'User password' },
        { name: 'remember', type: 'boolean', required: false, description: 'Remember user session' }
      ],
      response: {
        success: true,
        data: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          user: {
            userId: 'usr_123',
            email: 'user@example.com',
            role: 'company_admin',
            companyId: 'comp_789'
          },
          expiresIn: 3600
        }
      },
      codeExample: `// User login
const login = async (email, password) => {
  const response = await fetch('https://api.okdriver.com/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  
  return await response.json();
};

// Example usage
const authData = await login('user@example.com', 'password123');
localStorage.setItem('token', authData.data.token);`
    },
    {
      id: 'webhook-create',
      category: 'webhooks',
      method: 'POST',
      endpoint: '/api/webhooks',
      title: 'Create Webhook',
      description: 'Create a new webhook endpoint',
      parameters: [
        { name: 'url', type: 'string', required: true, description: 'Webhook endpoint URL' },
        { name: 'events', type: 'array', required: true, description: 'Events to subscribe to' },
        { name: 'secret', type: 'string', required: false, description: 'Webhook secret for verification' }
      ],
      response: {
        success: true,
        data: {
          webhookId: 'wh_789',
          url: 'https://your-app.com/webhook',
          events: ['vehicle.created', 'driver.updated'],
          status: 'active',
          createdAt: '2024-01-15T10:30:00Z'
        }
      },
      codeExample: `// Create webhook
const createWebhook = async (webhookData) => {
  const response = await fetch('https://api.okdriver.com/api/webhooks', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(webhookData)
  });
  
  return await response.json();
};

// Example usage
const webhook = await createWebhook({
  url: 'https://your-app.com/webhook',
  events: ['vehicle.created', 'driver.updated'],
  secret: 'your-webhook-secret'
});`
    }
  ];

  const filteredEndpoints = apiEndpoints.filter(endpoint => {
    const matchesSearch = endpoint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endpoint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || endpoint.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = async (code, endpointId) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(endpointId);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800';
      case 'POST': return 'bg-blue-100 text-blue-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">API Documentation</h1>
            <p className="text-gray-600">Complete reference for OKDriver APIs</p>
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
                    placeholder="Search APIs..."
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

              {/* Quick Links */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Links</h3>
                <div className="space-y-2">
                  <a href="#authentication" className="block text-blue-600 hover:text-blue-800 text-sm">
                    Authentication Guide
                  </a>
                  <a href="#rate-limits" className="block text-blue-600 hover:text-blue-800 text-sm">
                    Rate Limits
                  </a>
                  <a href="#error-codes" className="block text-blue-600 hover:text-blue-800 text-sm">
                    Error Codes
                  </a>
                  <a href="#webhooks" className="block text-blue-600 hover:text-blue-800 text-sm">
                    Webhooks
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {filteredEndpoints.map((endpoint, index) => (
                <motion.div
                  key={endpoint.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  {/* Endpoint Header */}
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getMethodColor(endpoint.method)}`}>
                          {endpoint.method}
                        </span>
                        <code className="text-lg font-mono text-gray-800 bg-gray-100 px-3 py-1 rounded">
                          {endpoint.endpoint}
                        </code>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => copyToClipboard(endpoint.codeExample, endpoint.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Copy code"
                        >
                          {copiedCode === endpoint.id ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Try it out">
                          <Play className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mt-3">{endpoint.title}</h2>
                    <p className="text-gray-600 mt-1">{endpoint.description}</p>
                  </div>

                  <div className="p-6">
                    {/* Parameters */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Parameters</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-2 font-medium text-gray-900">Name</th>
                              <th className="text-left py-2 font-medium text-gray-900">Type</th>
                              <th className="text-left py-2 font-medium text-gray-900">Required</th>
                              <th className="text-left py-2 font-medium text-gray-900">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {endpoint.parameters.map((param, paramIndex) => (
                              <tr key={paramIndex} className="border-b border-gray-100">
                                <td className="py-2">
                                  <code className="text-blue-600 font-mono">{param.name}</code>
                                </td>
                                <td className="py-2 text-gray-600">{param.type}</td>
                                <td className="py-2">
                                  {param.required ? (
                                    <span className="text-red-600 font-medium">Yes</span>
                                  ) : (
                                    <span className="text-gray-500">No</span>
                                  )}
                                </td>
                                <td className="py-2 text-gray-600">{param.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Response Example */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Response Example</h3>
                      <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto">
                        <code>{JSON.stringify(endpoint.response, null, 2)}</code>
                      </pre>
                    </div>

                    {/* Code Example */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">Code Example</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">JavaScript</span>
                          <button
                            onClick={() => copyToClipboard(endpoint.codeExample, endpoint.id)}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {copiedCode === endpoint.id ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto">
                        <code>{endpoint.codeExample}</code>
                      </pre>
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
              <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
              <p className="text-blue-100 mb-6">
                Explore our additional resources to get the most out of OKDriver APIs
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="/developer/sdk" className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
                  <Download className="w-6 h-6 mb-2" />
                  <h3 className="font-semibold">SDK Downloads</h3>
                  <p className="text-sm text-blue-100">Get our official SDKs</p>
                </a>
                <a href="/developer/examples" className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
                  <Code className="w-6 h-6 mb-2" />
                  <h3 className="font-semibold">Code Examples</h3>
                  <p className="text-sm text-blue-100">Real-world implementations</p>
                </a>
                <a href="/contact" className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
                  <ExternalLink className="w-6 h-6 mb-2" />
                  <h3 className="font-semibold">Support</h3>
                  <p className="text-sm text-blue-100">Get help from our team</p>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
