'use client'
import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Key, 
  BookOpen, 
  User, 
  LogOut, 
  Plus, 
  Copy, 
  Trash2, 
  Eye,
  EyeOff,
  Check,
  X
} from 'lucide-react';

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('api-keys');
  const [docTab, setDocTab] = useState('dms');
  const [userProfile, setUserProfile] = useState(null);
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateKey, setShowCreateKey] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [creatingKey, setCreatingKey] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState({});
  const [copiedKey, setCopiedKey] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/user/login');
      return;
    }

    if (session?.user?.backendId) {
      fetchUserData();
    }
  }, [session, status, router]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/profile/${session.user.backendId}`);
      const data = await response.json();
      
      if (data.success) {
        setUserProfile(data.user);
        setApiKeys(data.user.apiKeys || []);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const createApiKey = async () => {
    if (!newKeyName.trim()) return;
    
    setCreatingKey(true);
    try {
      const response = await fetch(`http://localhost:5000/api/user/api-key/${session.user.backendId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyName: newKeyName })
      });
      
      const data = await response.json();
      if (data.success) {
        setApiKeys([data.apiKey, ...apiKeys]);
        setNewKeyName('');
        setShowCreateKey(false);
      }
    } catch (error) {
      console.error('Error creating API key:', error);
    } finally {
      setCreatingKey(false);
    }
  };

  const deactivateApiKey = async (keyId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/api-key/${session.user.backendId}/${keyId}/deactivate`, {
        method: 'PUT'
      });
      
      if (response.ok) {
        setApiKeys(apiKeys.map(key => 
          key.id === keyId ? { ...key, isActive: false } : key
        ));
      }
    } catch (error) {
      console.error('Error deactivating API key:', error);
    }
  };

  const copyToClipboard = async (text, keyId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(keyId);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const toggleKeyVisibility = (keyId) => {
    setVisibleKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'api-keys', label: 'API Keys', icon: Key },
    { id: 'documentation', label: 'Documentation', icon: BookOpen },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen  bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-10">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">OKDriver</h1>
          
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* API Keys Tab */}
        {activeTab === 'api-keys' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">API Keys</h2>
              <button
                onClick={() => setShowCreateKey(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create API Key
              </button>
            </div>

            {/* Create API Key Modal */}
            {showCreateKey && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-96">
                  <h3 className="text-xl font-semibold mb-4">Create New API Key</h3>
                  <input
                    type="text"
                    placeholder="Enter key name"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => {
                        setShowCreateKey(false);
                        setNewKeyName('');
                      }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={createApiKey}
                      disabled={creatingKey || !newKeyName.trim()}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {creatingKey ? 'Creating...' : 'Create'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* API Keys List */}
            <div className="space-y-4">
              {apiKeys.length === 0 ? (
                <div className="text-center py-12">
                  <Key className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No API Keys</h3>
                  <p className="text-gray-500">Create your first API key to start using OKDriver APIs</p>
                </div>
              ) : (
                apiKeys.map((key) => (
                  <div key={key.id} className="bg-white rounded-lg p-6 shadow-sm border">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{key.keyName}</h3>
                        <p className="text-sm text-gray-500">
                          Created {new Date(key.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          key.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {key.isActive ? 'Active' : 'Inactive'}
                        </span>
                        {key.isActive && (
                          <button
                            onClick={() => deactivateApiKey(key.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-100 rounded-lg p-3 font-mono text-sm">
                        {visibleKeys[key.id] ? key.apiKey : '••••••••••••••••••••••••••••••••'}
                      </div>
                      <button
                        onClick={() => toggleKeyVisibility(key.id)}
                        className="p-2 text-gray-600 hover:text-gray-800"
                      >
                        {visibleKeys[key.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => copyToClipboard(key.apiKey, key.id)}
                        className="p-2 text-gray-600 hover:text-gray-800"
                      >
                        {copiedKey === key.id ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    
                    {key.expiresAt && (
                      <p className="text-sm text-gray-500 mt-2">
                        Expires: {new Date(key.expiresAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* Documentation Tab */}
        {activeTab === 'documentation' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">API Documentation</h2>
            
            {/* API Tabs */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {[
                    { id: 'dms', label: 'DMS API', icon: 'Database' },
                    { id: 'assistant', label: 'OKDriver Assistant', icon: 'Users' },
                    { id: 'integration', label: 'Integration Guide', icon: 'Settings' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setDocTab(tab.id)}
                      className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                        docTab === tab.id
                          ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* DMS API Tab */}
                {docTab === 'dms' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">DMS API Endpoints</h3>
                    <div className="space-y-6">
                      {[
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
                      ].map((endpoint, index) => (
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
                {docTab === 'assistant' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">OKDriver Assistant API</h3>
                    <div className="space-y-6">
                      {[
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
                      ].map((endpoint, index) => (
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
                {docTab === 'integration' && (
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
                          <li>Create an API key from the API Keys tab</li>
                          <li>Install the OKDriver SDK or use direct HTTP requests</li>
                          <li>Authenticate using your API key</li>
                          <li>Start making API calls to integrate driver management</li>
                        </ol>
                      </div>
                      
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h4 className="text-xl font-semibold text-gray-900 mb-4">Code Example</h4>
                        <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto">
                          <code>{`// Example: Integrating DMS API
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
};`}</code>
                        </pre>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h4 className="text-xl font-semibold text-gray-900 mb-4">Authentication</h4>
                        <p className="text-gray-700 mb-4">All API requests must include your API key in the Authorization header:</p>
                        <pre className="bg-gray-800 text-green-400 p-4 rounded-lg">
                          <code>Authorization: Bearer your_api_key_here</code>
                        </pre>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h4 className="text-xl font-semibold text-gray-900 mb-4">Base URL</h4>
                        <p className="text-gray-700 mb-4">All API endpoints are relative to:</p>
                        <pre className="bg-gray-800 text-green-400 p-4 rounded-lg">
                          <code>https://api.okdriver.com</code>
                        </pre>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Profile</h2>
            
            {userProfile && (
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <div className="flex items-center mb-8">
                  {userProfile.picture ? (
                    <img
                      src={userProfile.picture}
                      alt={userProfile.name}
                      className="w-20 h-20 rounded-full mr-6"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-6">
                      {userProfile.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">{userProfile.name}</h3>
                    <p className="text-gray-600">{userProfile.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <p className="text-gray-900">{userProfile.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <p className="text-gray-900">{userProfile.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Verified</label>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      userProfile.emailVerified 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {userProfile.emailVerified ? 'Verified' : 'Not Verified'}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                    <p className="text-gray-900">{new Date(userProfile.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{apiKeys.length}</div>
                      <div className="text-sm text-gray-600">API Keys</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {apiKeys.filter(key => key.isActive).length}
                      </div>
                      <div className="text-sm text-gray-600">Active Keys</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">0</div>
                      <div className="text-sm text-gray-600">API Calls</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
