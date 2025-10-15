import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MapPin, MessageCircle, Users, Eye, EyeOff, X, Car, Calendar, Clock, ChevronDown, Send } from 'lucide-react';
import io from 'socket.io-client';

export default function VehicleDetail({ vehicleId, companyToken, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [showPassword, setShowPassword] = useState({});
  const [chatMode, setChatMode] = useState(''); // 'vehicle', 'client-list', 'individual-client', or ''
  const [selectedChatOption, setSelectedChatOption] = useState(null);
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const selectedClientRef = useRef(null);
  const [clientMessages, setClientMessages] = useState([]);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const socketRef = useRef(null); // Add ref to track socket instance

  // Resolve token: prefer prop, else fallback to localStorage
  const resolvedCompanyToken = useMemo(() => {
    if (companyToken && typeof companyToken === 'string') return companyToken;
    try {
      const stored = localStorage.getItem('company_token') || localStorage.getItem('companyToken');
      return stored || '';
    } catch (_) {
      return '';
    }
  }, [companyToken]);

  const headers = useMemo(() => ({
    'Content-Type': 'application/json',
    ...(resolvedCompanyToken ? { Authorization: `Bearer ${resolvedCompanyToken}` } : {})
  }), [resolvedCompanyToken]);
   console.log(resolvedCompanyToken);
   
  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://backend.okdriver.in/api/company/clients/vehicle/${vehicleId}/details`, { headers });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.message || 'Failed to load vehicle details');
      }

      // Fetch company lists with members to populate emails for assigned lists
      let listsWithMembers = [];
      try {
        const listsRes = await fetch('https://backend.okdriver.in/api/company/clients/lists', { headers });
        if (listsRes.ok) {
          const listsJson = await listsRes.json();
          listsWithMembers = Array.isArray(listsJson) ? listsJson : [];
        }
      } catch (_) {}

      // Normalize to the UI structure previously used
      const normalized = {
        vehicle: {
          id: json.vehicle?.id,
          vehicleNumber: json.vehicle?.vehicleNumber,
          model: json.vehicle?.model || 'N/A',
          status: 'ACTIVE',
          password: json.vehicle?.password || 'Not available',
          createdAt: json.latestLocation?.recordedAt ? new Date(json.latestLocation.recordedAt).toLocaleString() : 'N/A',
          updatedAt: json.latestLocation?.recordedAt ? new Date(json.latestLocation.recordedAt).toLocaleString() : 'N/A',
          type: json.vehicle?.type || 'N/A'
        },
        latestLocation: json.latestLocation ? {
          lat: json.latestLocation.lat,
          lng: json.latestLocation.lng,
          address: `${json.latestLocation.lat}, ${json.latestLocation.lng}`
        } : { lat: 0, lng: 0, address: 'No location yet' },
        clientLists: Array.isArray(json.listNames) ? json.listNames.map((name, idx) => {
          const matched = listsWithMembers.find(l => l.name === name);
          const emails = matched && Array.isArray(matched.members)
            ? matched.members
                .filter(m => typeof m.client?.id === 'number') // ensure numeric id for realtime matching
                .map(m => ({
                  id: m.client.id,
                  email: m.client?.email || '',
                  status: 'active'
                }))
            : [];
          return {
            id: matched?.id || idx + 1,
            name,
            emailCount: emails.length,
            emails
          };
        }) : [],
        chats: Array.isArray(json.chats) ? json.chats.map((c, idx) => ({
          id: c.id || idx + 1,
          senderType: c.senderType || 'System',
          message: c.message || '',
          timestamp: c.createdAt ? new Date(c.createdAt).toLocaleString() : ''
        })) : []
      };

      setData(normalized);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Initialize Leaflet map once data is loaded
  useEffect(() => {
    if (!data?.latestLocation || showChat) return;

    const ensureLeaflet = () => new Promise((resolve) => {
      if (window.L) return resolve();
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
      document.head.appendChild(css);
      const js = document.createElement('script');
      js.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
      js.onload = () => resolve();
      document.head.appendChild(js);
    });

    const initMap = async () => {
      await ensureLeaflet();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      const lat = Number(data.latestLocation.lat) || 0;
      const lng = Number(data.latestLocation.lng) || 0;
      const map = window.L.map(mapRef.current, { center: [lat, lng], zoom: 14 });
      mapInstanceRef.current = map;
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      // Build a type-specific icon and show vehicle number in popup
      const t = String(data.vehicle?.type || '').toLowerCase();
      let svg = '';
      if (t.includes('bus')) {
        svg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10z"/></svg>`;
      } else if (t.includes('truck')) {
        svg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z"/></svg>`;
      } else {
        svg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11C5.84 5 5.28 5.42 5.08 6.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-1.92-5.99z"/></svg>`;
      }
      const icon = window.L.divIcon({
        html: `<div style="background:#2563eb;border-radius:50%;width:38px;height:38px;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 4px 8px rgba(0,0,0,.25);position:relative;">${svg}<div style="position:absolute;bottom:-8px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #2563eb;"></div></div>`,
        iconSize: [38, 46],
        iconAnchor: [19, 46],
        className: 'vehicle-marker'
      });
      const marker = window.L.marker([lat, lng], { icon }).addTo(map);
      marker.bindPopup(`<strong>${data.vehicle?.vehicleNumber || ''}</strong><br/>Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`).openPopup();
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [data, showChat]);

  // Cleanup socket connection properly
  const cleanupSocket = () => {
    if (socketRef.current) {
      console.log('🧹 Cleaning up socket connection...');
      try {
        socketRef.current.removeAllListeners();
        socketRef.current.disconnect();
      } catch (error) {
        console.error('Error during socket cleanup:', error);
      }
      socketRef.current = null;
      setSocket(null);
      setIsConnected(false);
    }
  };

  // Add the missing function to get selected list emails
  const getSelectedListEmails = () => {
    if (chatMode === 'client-list' && selectedChatOption && data?.clientLists) {
      const selectedList = data.clientLists.find(list => list.id === selectedChatOption.id);
      return selectedList ? selectedList.emails : [];
    }
    return [];
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

  const handleChatClick = () => {
    if (!showChat) {
      setShowChatOptions(true);
    } else {
      setShowChat(false);
      setChatMode('');
      setSelectedChatOption(null);
      setShowChatOptions(false);
    }
  };

  const handleChatOptionSelect = (option) => {
    setSelectedChatOption(option);
    setShowChatOptions(false);
    setShowChat(true);
    
    if (option.type === 'vehicle') {
      setChatMode('vehicle');
    } else if (option.type === 'client-list') {
      setChatMode('client-list');
    } else if (option.type === 'individual-client') {
      setChatMode('individual-client');
      setSelectedClient(option.client);
      // Load chat history for the selected client
      loadClientChatHistory(option.client.id);
    }
  };

  const handleClientClick = (client) => {
    setSelectedClient(client);
    selectedClientRef.current = client;
    setChatMode('individual-client');
    setShowChat(true);
    setSelectedChatOption({
      type: 'individual-client',
      name: `Client: ${client.email}`,
      client: client
    });
    const cid = parseInt(client.id, 10);
    if (!Number.isFinite(cid)) {
      console.error('Invalid client id for chat history:', client.id);
      setClientMessages([]);
    } else {
      loadClientChatHistory(cid);
    }
  };

  const sendMessage = async () => {
    if (!chatInput.trim()) return;

    if (chatMode === 'vehicle') {
      if (socket && isConnected) {
        // Send message via socket for real-time communication
        console.log('📤 Sending message via socket:', chatInput.trim());
        try {
          socket.emit('chat:send', {
            vehicleId: parseInt(vehicleId),
            message: chatInput.trim()
          });
          // Don't add message locally - let it come through socket to avoid echoing
        } catch (error) {
          console.error('Error sending socket message:', error);
          // Fallback to HTTP if socket fails
          await sendMessageHTTP();
        }
      } else {
        // Fallback to HTTP API if socket is not connected
        await sendMessageHTTP();
      }
    } else if (chatMode === 'client-list') {
      // Handle client list messaging (email functionality)
      console.log('Client list messaging not implemented yet');
    } else if (chatMode === 'individual-client' && selectedClient) {
      // Send message to individual client
      try {
        const cid = parseInt(selectedClient.id, 10);
        if (!Number.isFinite(cid)) {
          throw new Error('Invalid client id');
        }
        const response = await fetch(`https://backend.okdriver.in/api/company/clients/${cid}/send-message`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            message: chatInput.trim()
          })
        });
        
        if (response.ok) {
          const result = await response.json();
          // Add message to local state
          setClientMessages(prev => [...prev, result.data]);
          scrollToBottom();
        } else {
          const err = await response.json().catch(() => ({}));
          console.error('Send to client failed:', err?.message || response.status);
        }
      } catch (error) {
        console.error('Error sending message to client:', error);
      }
    }

    setChatInput('');
  };

  const sendMessageHTTP = async () => {
    try {
      const response = await fetch(`https://backend.okdriver.in/api/company/vehicles/${vehicleId}/send-message`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: chatInput.trim()
        })
      });
      
      if (response.ok) {
        // Do not append locally; server will broadcast via socket to avoid duplication
        // const result = await response.json();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const getChatTitle = () => {
    if (chatMode === 'vehicle') {
      return `Chat with Vehicle: ${data?.vehicle?.vehicleNumber}`;
    } else if (chatMode === 'client-list' && selectedChatOption) {
      return `Chat with List: ${selectedChatOption.name}`;
    } else if (chatMode === 'individual-client' && selectedClient) {
      return `Chat with Client: ${selectedClient.email}`;
    }
    return 'Chat Messages';
  };

  // Generate chat placeholder text
  const getChatPlaceholder = () => {
    if (chatMode === 'client-list' && selectedChatOption) {
      const emails = getSelectedListEmails();
      return `Type message to ${selectedChatOption.name} list (${emails.length} emails)...`;
    } else if (chatMode === 'individual-client' && selectedClient) {
      return `Type your message to ${selectedClient.email}...`;
    }
    return `Type your message to ${selectedChatOption?.name || 'chat'}...`;
  };

  // Initialize socket connection with proper error handling
  useEffect(() => {
    selectedClientRef.current = selectedClient;
  }, [selectedClient]);

  useEffect(() => {
    if (resolvedCompanyToken && vehicleId && !socketRef.current) {
      console.log('🔌 Initializing socket connection...');
      
      // Optional: lightweight ping without assuming JSON route exists
      const testServerConnectivity = async () => {
        try {
          const response = await fetch('https://backend.okdriver.in/', { method: 'GET' });
          console.log('✅ Backend reachable:', response.ok, response.status);
        } catch (error) {
          console.warn('⚠️ Backend ping failed (non-blocking):', error?.message || error);
        }
      };
      
      testServerConnectivity();
      
      try {
        const newSocket = io('https://backend.okdriver.in', {
          auth: {
            token: resolvedCompanyToken,
            role: 'COMPANY',
            vehicleId: parseInt(vehicleId)
          },
          forceNew: true,
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          timeout: 10000,
          // Add these options to prevent WebSocket issues
          transports: ['websocket', 'polling'],
          upgrade: true,
          rememberUpgrade: false
        });

        // Store reference
        socketRef.current = newSocket;
        setSocket(newSocket);

        newSocket.on('connect', () => {
          console.log('✅ Connected to socket server');
          setIsConnected(true);
        });

        newSocket.on('disconnect', (reason) => {
          console.log('❌ Disconnected from socket server:', reason);
          setIsConnected(false);
        });

        newSocket.on('connect_error', (error) => {
          console.error('🔴 Socket connection error:', error);
          console.error('🔴 Error details:', {
            message: error.message,
            description: error.description,
            type: error.type,
            context: error.context
          });
          setIsConnected(false);
        });

        newSocket.on('new_message', (message) => {
          console.log('📨 Received message:', message);

          // Vehicle chat only if it matches current vehicle
          if (message.vehicleId && Number(message.vehicleId) === Number(vehicleId)) {
            setMessages(prev => {
              const next = prev.some(m => m.id === message.id) ? prev : [...prev, message];
              // sort by createdAt ascending
              next.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
              return [...next];
            });
          }

          // Individual client chat only if we're viewing that client
          const sc = selectedClientRef.current;
          if (message.clientId && sc && Number(message.clientId) === Number(sc.id)) {
            setClientMessages(prev => {
              const next = prev.some(m => m.id === message.id) ? prev : [...prev, message];
              next.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
              return [...next];
            });
          }

          scrollToBottom();
        });

        newSocket.on('error', (error) => {
          console.error('🔴 Socket error:', error);
        });

        // Handle WebSocket close events properly
        newSocket.on('close', (code, reason) => {
          console.log('🔒 Socket closed:', code, reason);
          setIsConnected(false);
        });

      } catch (error) {
        console.error('🔴 Error initializing socket:', error);
      }
    }

    // Cleanup function
    return () => {
      cleanupSocket();
    };
  }, [companyToken, vehicleId]);

  // Cleanup on unmount or when component closes
  useEffect(() => {
    return () => {
      cleanupSocket();
    };
  }, []);

  // Load chat history when chat mode changes to vehicle
  useEffect(() => {
    if (chatMode === 'vehicle' && vehicleId && socket && isConnected) {
      loadChatHistory();
    }
  }, [chatMode, vehicleId, socket, isConnected]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages, clientMessages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const loadChatHistory = async () => {
    try {
      if (socket && isConnected) {
        // Use socket to get chat history with timeout
        const timeoutId = setTimeout(() => {
          console.warn('Socket chat history request timed out, falling back to HTTP');
          loadChatHistoryHTTP();
        }, 5000);

        socket.emit('chat:history', parseInt(vehicleId), (response) => {
          clearTimeout(timeoutId);
          if (response && response.ok) {
            setMessages(response.chats || []);
          } else {
            console.warn('Socket chat history failed, falling back to HTTP');
            loadChatHistoryHTTP();
          }
        });
      } else {
        // Fallback to HTTP API
        await loadChatHistoryHTTP();
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const loadChatHistoryHTTP = async () => {
    try {
      const res = await fetch(`https://backend.okdriver.in/api/company/vehicles/${vehicleId}/chat-history`, { headers });
      const json = await res.json();
      if (res.ok) {
        const sorted = (json.data || []).slice().sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        setMessages(sorted);
      }
    } catch (error) {
      console.error('Error loading chat history via HTTP:', error);
    }
  };

  const loadClientChatHistory = async (clientId) => {
    try {
      const res = await fetch(`https://backend.okdriver.in/api/company/clients/${clientId}/chat-history`, { headers });
      const json = await res.json();
      if (res.ok) {
        const sorted = (json.data || []).slice().sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        setClientMessages(sorted);
      } else {
        console.error('Error loading client chat history:', json.message);
        setClientMessages([]);
      }
    } catch (error) {
      console.error('Error loading client chat history:', error);
      setClientMessages([]);
    }
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

  // Chat options data
  const chatOptions = [
    {
      type: 'vehicle',
      name: `Vehicle: ${data?.vehicle?.vehicleNumber}`,
      icon: Car,
      description: 'Chat with vehicle driver'
    },
    // Show individual clients instead of client lists
    ...data?.clientLists?.flatMap(list => 
      list.emails?.map(email => ({
        type: 'individual-client',
        id: email.id,
        name: email.email,
        icon: Users,
        description: `Client from ${list.name}`,
        client: email
      })) || []
    ) || []
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
      <div className="bg-white w-full max-w-7xl h-full max-h-[90vh] rounded-lg overflow-hidden flex flex-col relative">
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b bg-gray-50 relative">
          <div className="flex items-center gap-3">
            <Car className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-xl text-gray-800">Vehicle Details - {data?.vehicle?.vehicleNumber}</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button 
                onClick={handleChatClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  showChat ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                Chat
                {!showChat && <ChevronDown className="w-4 h-4" />}
              </button>
              
              {/* Chat Options Dropdown - Fixed z-index issue */}
              {showChatOptions && (
                <>
                  {/* Backdrop to close dropdown when clicked outside */}
                  <div 
                    className="fixed inset-0 z-[9998]" 
                    onClick={() => setShowChatOptions(false)}
                  />
                  {/* Dropdown with higher z-index */}
                  <div 
                    className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 max-h-96 overflow-y-auto"
                    style={{ zIndex: 9999 }}
                  >
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Select Chat Option</h4>
                      <div className="space-y-2">
                        {chatOptions.map((option, index) => {
                          const IconComponent = option.icon;
                          return (
                            <button
                              key={`${option.type}-${option.id || index}`}
                              onClick={() => handleChatOptionSelect(option)}
                              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors text-left"
                            >
                              <IconComponent className="w-5 h-5 text-blue-600" />
                              <div className="flex-1">
                                <div className="font-medium text-gray-800">{option.name}</div>
                                <div className="text-sm text-gray-600">{option.description}</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <button onClick={() => { cleanupSocket(); onClose(); }} className="text-gray-500 hover:text-gray-700 p-2">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          {/* Left Side - Vehicle Details & Client Lists */}
          <div className="w-1/2 border-r flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto">
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
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                              {list.emails.map((email) => (
                                <div key={email.id} className="flex items-center justify-between bg-white rounded p-2 border">
                                  <span className="text-sm text-gray-700">{email.email}</span>
                                  <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      email.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                      {email.status}
                                    </span>
                                    <button
                                      onClick={() => handleClientClick(email)}
                                      className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors flex items-center gap-1"
                                    >
                                      <MessageCircle className="w-3 h-3" />
                                      Chat
                                    </button>
                                  </div>
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
          </div>

          {/* Right Side - Map or Chat */}
          <div className="w-1/2 flex flex-col min-h-0">
            {showChat ? (
              /* Chat UI - Fixed scrolling structure */
              <div className="flex-1 flex flex-col min-h-0">
                {/* Chat Header - Fixed */}
                <div className="flex-shrink-0 px-6 py-4 border-b bg-gray-50">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-lg flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-blue-600" />
                      {getChatTitle()}
                    </h4>
                    {selectedChatOption && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        {chatMode === 'vehicle' ? (
                          <Car className="w-4 h-4" />
                        ) : (
                          <Users className="w-4 h-4" />
                        )}
                        <span>{selectedChatOption.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Chat Messages - Scrollable */}
                <div 
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto min-h-0"
                  style={{ 
                    scrollBehavior: 'smooth',
                    maxHeight: 'calc(100vh - 300px)' // Ensure proper height calculation
                  }}
                >
                  <div className="p-4 space-y-4">
                    {chatMode === 'vehicle' ? (
                      <>
                        {messages.map((message) => (
                          <div key={message.id} className={`flex ${message.senderType === 'COMPANY' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.senderType === 'COMPANY' 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-200 text-gray-800'
                            }`}>
                              <div className="text-sm font-medium mb-1">
                                {message.senderType === 'COMPANY' ? 'You' : 'Driver'}
                              </div>
                              <div className="text-sm">{message.message}</div>
                              <div className="text-xs opacity-75 mt-1">
                                {new Date(message.createdAt).toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        ))}
                        {messages.length === 0 && (
                          <div className="text-center text-gray-500 mt-8">
                            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p>No messages yet</p>
                            <p className="text-sm">Start a conversation with the driver!</p>
                          </div>
                        )}
                        {/* Scroll anchor */}
                        <div ref={messagesEndRef} />
                      </>
                    ) : chatMode === 'individual-client' ? (
                      <>
                        {clientMessages.map((message) => (
                          <div key={message.id} className={`flex ${message.senderType === 'COMPANY' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.senderType === 'COMPANY' 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-200 text-gray-800'
                            }`}>
                              <div className="text-sm font-medium mb-1">
                                {message.senderType === 'COMPANY' ? 'You' : 'Client'}
                              </div>
                              <div className="text-sm">{message.message}</div>
                              <div className="text-xs opacity-75 mt-1">
                                {new Date(message.createdAt).toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        ))}
                        {clientMessages.length === 0 && (
                          <div className="text-center text-gray-500 mt-8">
                            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p>No messages yet</p>
                            <p className="text-sm">Start a conversation with the client!</p>
                          </div>
                        )}
                        {/* Scroll anchor */}
                        <div ref={messagesEndRef} />
                      </>
                    ) : (
                      <>
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
                        {data.chats.length === 0 && (
                          <div className="text-center text-gray-500 mt-8">
                            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p>No messages yet</p>
                            <p className="text-sm">Start a conversation!</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Chat Input - Fixed */}
                <div className="flex-shrink-0 p-4 border-t bg-white">
                  {chatMode === 'vehicle' && (
                    <div className="flex items-center gap-2 mb-2 text-xs">
                      <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className={isConnected ? 'text-green-600' : 'text-red-600'}>
                        {isConnected ? 'Connected' : 'Disconnected'}
                      </span>
                    </div>
                  )}
                  {chatMode === 'individual-client' && (
                    <div className="flex items-center gap-2 mb-2 text-xs">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-blue-600">
                        Chat with {selectedClient?.email}
                      </span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={getChatPlaceholder()}
                      disabled={chatMode === 'vehicle' && !isConnected}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!chatInput.trim() || (chatMode === 'vehicle' && !isConnected)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Map UI - Keeping original map functionality intact */
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-shrink-0 px-6 py-4 border-b bg-gray-50">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-red-600" />
                    Live Location
                  </h4>
                </div>
                <div className="flex-1 relative min-h-0">
                  <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}