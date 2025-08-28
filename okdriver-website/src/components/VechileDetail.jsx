import React, { useEffect, useMemo, useState } from 'react';
import { MapPin, MessageCircle, Users, Eye, EyeOff, X, Car, Calendar, Clock } from 'lucide-react';

export default function VehicleDetail({ vehicleId, companyToken, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [showPassword, setShowPassword] = useState({});

  const headers = useMemo(() => ({
    'Content-Type': 'application/json',
    ...(companyToken ? { Authorization: `Bearer ${companyToken}` } : {})
  }), [companyToken]);

  // Mock data - replace with actual API calls
  const mockData = {
    vehicle: {
      id: vehicleId,
      vehicleNumber: "DL6SAX6208",
      model: "DZIRE",
      status: "ACTIVE",
      password: "$2b$10$UR:gcdMzEsHGmPGHTEAtW09",
      createdAt: "2025-08-26 17:12:56.277",
      updatedAt: "2025-08-26 17:12:56.277",
      type: "Car"
    },
    latestLocation: {
      lat: 28.6139,
      lng: 77.2090,
      address: "New Delhi, India"
    },
    clientLists: [
      {
        id: 1,
        name: "bonnet(Stock1/Total1)",
        emailCount: 3,
        emails: [
          { id: 1, email: "admin@company.com", status: "active" },
          { id: 2, email: "manager@company.com", status: "active" },
          { id: 3, email: "support@company.com", status: "inactive" }
        ]
      },
      {
        id: 2,
        name: "Test Can-Am(0/0)",
        emailCount: 2,
        emails: [
          { id: 4, email: "test@canam.com", status: "active" },
          { id: 5, email: "demo@canam.com", status: "active" }
        ]
      }
    ],
    chats: [
      { id: 1, senderType: "Admin", message: "Vehicle location updated", timestamp: "2025-08-26 10:30" },
      { id: 2, senderType: "Driver", message: "Trip completed successfully", timestamp: "2025-08-26 11:45" },
      { id: 3, senderType: "System", message: "Maintenance reminder", timestamp: "2025-08-26 14:20" }
    ]
  };

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      // Simulate API call
      setTimeout(() => {
        setData(mockData);
        setLoading(false);
      }, 1000);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleListClick = (list) => {
    setSelectedList(selectedList?.id === list.id ? null : list);
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    // Add message logic here
    setChatInput('');
  };

  useEffect(() => { 
    load(); 
  }, [vehicleId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-8">
          <div className="text-center">Loading vehicle details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-8">
          <div className="text-red-600 text-center">{error}</div>
          <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-7xl h-full max-h-[90vh] rounded-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
          <div className="flex items-center gap-3">
            <Car className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-xl text-gray-800">Vehicle Details - {data?.vehicle?.vehicleNumber}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowChat(!showChat)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                showChat ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              Chat
            </button>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Side - Vehicle Details & Client Lists */}
          <div className="w-1/2 border-r overflow-auto">
            <div className="p-6">
              {/* Vehicle Information */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  Vehicle Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Vehicle Number</label>
                    <p className="text-gray-800 font-medium">{data.vehicle.vehicleNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Model</label>
                    <p className="text-gray-800">{data.vehicle.model}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      data.vehicle.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {data.vehicle.status}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Type</label>
                    <p className="text-gray-800">{data.vehicle.type}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-600">Password</label>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-800 font-mono text-sm">
                        {showPassword.main ? data.vehicle.password : '••••••••••••••••'}
                      </p>
                      <button
                        onClick={() => togglePasswordVisibility('main')}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {showPassword.main ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Created</label>
                    <p className="text-gray-800 text-sm">{data.vehicle.createdAt}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Updated</label>
                    <p className="text-gray-800 text-sm">{data.vehicle.updatedAt}</p>
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Current Location
                </h4>
                <p className="text-gray-700">{data.latestLocation.address}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Coordinates: {data.latestLocation.lat}, {data.latestLocation.lng}
                </p>
              </div>

              {/* Client Lists */}
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  Client Lists ({data.clientLists.length})
                </h4>
                <div className="space-y-2">
                  {data.clientLists.map((list) => (
                    <div key={list.id} className="border rounded-lg bg-white">
                      <button
                        onClick={() => handleListClick(list)}
                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4 text-gray-600" />
                          <span className="font-medium text-gray-800">{list.name}</span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {list.emailCount} emails
                          </span>
                        </div>
                        <div className="text-gray-400">
                          {selectedList?.id === list.id ? '−' : '+'}
                        </div>
                      </button>
                      
                      {selectedList?.id === list.id && (
                        <div className="px-4 pb-4 border-t bg-gray-50">
                          <h5 className="font-medium text-gray-700 mb-2 mt-3">Email Addresses:</h5>
                          <div className="space-y-2">
                            {list.emails.map((email) => (
                              <div key={email.id} className="flex items-center justify-between bg-white rounded p-2 border">
                                <span className="text-sm text-gray-700">{email.email}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  email.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {email.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Map or Chat */}
          <div className="w-1/2 flex flex-col">
            {showChat ? (
              /* Chat UI */
              <div className="flex-1 flex flex-col">
                <div className="px-6 py-4 border-b bg-gray-50">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    Chat Messages
                  </h4>
                </div>
                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {data.chats.map((chat) => (
                    <div key={chat.id} className="bg-white rounded-lg p-4 border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-800">{chat.senderType}</span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {chat.timestamp}
                        </span>
                      </div>
                      <p className="text-gray-700">{chat.message}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t bg-white">
                  <div className="flex gap-2">
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Type your message..."
                    />
                    <button
                      onClick={sendMessage}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Map UI */
              <div className="flex-1 flex flex-col">
                <div className="px-6 py-4 border-b bg-gray-50">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-red-600" />
                    Live Location
                  </h4>
                </div>
                <div className="flex-1 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
                    <div className="text-center p-8">
                      <MapPin className="w-16 h-16 text-red-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Map Integration</h3>
                      <p className="text-gray-600 mb-4">Integrate with Google Maps, OpenStreetMap, or Leaflet</p>
                      <div className="bg-white rounded-lg p-4 border">
                        <p className="text-sm text-gray-700">
                          <strong>Current Position:</strong><br />
                          Latitude: {data.latestLocation.lat}<br />
                          Longitude: {data.latestLocation.lng}<br />
                          Address: {data.latestLocation.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}