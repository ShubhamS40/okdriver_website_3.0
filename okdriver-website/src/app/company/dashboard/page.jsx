'use client'
import React, { useEffect, useState } from 'react';
import VehicleDetail from '../../../components/VechileDetail.jsx';
import ClientManager from '@/components/ClientManager';
import { 
  MessageCircle, 
  Car, 
  Users, 
  MapPin, 
  Settings, 
  User,
  Plus,
  Search,
  Bell,
  Menu,
  X,
  Eye,
  Phone,
  Mail
} from 'lucide-react';

export default function ChatSupportDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [vehiclesLoading, setVehiclesLoading] = useState(false);
  const [vehiclesError, setVehiclesError] = useState('');

  const [chatRooms] = useState([
    { id: 1, vehicle: 'Vehicle 001', participants: ['Driver', 'Client', 'Support'], lastMessage: '2 mins ago', status: 'active' },
    { id: 2, vehicle: 'Vehicle 002', participants: ['Driver', 'Client'], lastMessage: '15 mins ago', status: 'idle' },
    { id: 3, vehicle: 'Vehicle 003', participants: ['Driver', 'Support'], lastMessage: '1 hour ago', status: 'closed' },
  ]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Menu },
    { id: 'vehicles', label: 'Add Vehicle', icon: Car },
    { id: 'clients', label: 'Add Client', icon: Users },
    { id: 'locations', label: 'View All Locations', icon: MapPin },
    { id: 'chat', label: 'Chat Section', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  // --- Add Vehicle form state ---
  const [vehicleForm, setVehicleForm] = useState({
    vehicleNumber: '',
    password: '',
    model: '',
    type: '',
    companyId: ''
  });
  const [vehicleSubmitting, setVehicleSubmitting] = useState(false);
  const [vehicleMsg, setVehicleMsg] = useState('');

  // Load vehicles from API
  const loadVehicles = async () => {
    setVehiclesLoading(true);
    setVehiclesError('');
    
    // Check if we have authentication token
    const token = typeof window !== 'undefined' ? localStorage.getItem('companyToken') : null;
    if (!token) {
      setVehiclesError('No authentication token found. Please log in again.');
      setVehiclesLoading(false);
      return;
    }
    
    try {
      const res = await fetch('http://localhost:5000/api/company/vehicles', {
        headers: {
          'Content-Type': 'application/json',
          ...(typeof window !== 'undefined' && localStorage.getItem('companyToken') ? 
            { Authorization: `Bearer ${localStorage.getItem('companyToken')}` } : {})
        }
      });
      const data = await res.json();
      if (!res.ok) {
        console.error('Vehicle API error:', res.status, data);
        throw new Error(data?.message || `Failed to load vehicles (${res.status})`);
      }
      
      console.log('API Response:', data); // Debug log
      
      // Handle both wrapped and unwrapped response formats
      let vehicleData = data;
      if (data.data) {
        vehicleData = data.data; // If wrapped in data property
      }
      
      // Map API response to UI format
      const mappedVehicles = Array.isArray(vehicleData) ? vehicleData.map(v => ({
        id: v.id,
        name: v.vehicleNumber,
        driver: 'N/A', // Driver info not in vehicle table
        status: v.status === 'ACTIVE' ? 'Active' : 'Inactive',
        location: 'N/A', // Location not in vehicle table
        client: 'N/A', // Client info not in vehicle table
        model: v.model || 'N/A',
        type: v.type || 'N/A',
        createdAt: v.createdAt ? new Date(v.createdAt).toLocaleDateString() : 'N/A'
      })) : [];
      
             console.log('Mapped Vehicles:', mappedVehicles); // Debug log
       setVehicles(mappedVehicles);
       
       // Also reload assignments to get updated client list data
       await loadAssignments();
     } catch (err) {
      console.error('Load vehicles error:', err);
      
      // Check if it's a JSON parsing error (HTML response)
      if (err.message.includes('Unexpected token') && err.message.includes('<!DOCTYPE')) {
        setVehiclesError('Server returned HTML instead of JSON. Please check authentication or server status.');
      } else {
        setVehiclesError('Failed to load vehicles: ' + err.message);
      }
    } finally {
      setVehiclesLoading(false);
    }
  };

  // Try to prefill companyId from JWT (if payload has id)
  useEffect(() => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('companyToken') : null;
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1] || ''));
        if (payload?.id && !vehicleForm.companyId) {
          setVehicleForm(prev => ({ ...prev, companyId: String(payload.id) }));
        }
      }
    } catch (err) {
      console.log('Token decode error:', err);
      // ignore decode errors
    }
  }, []);

  // Load vehicles on component mount
  useEffect(() => {
    loadVehicles();
  }, []);

  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setVehicleForm(prev => ({ ...prev, [name]: value }));
  };

  const generateRandomPassword = () => {
    const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789@$%!';
    let pwd = '';
    for (let i = 0; i < 10; i++) {
      pwd += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setVehicleForm(prev => ({ ...prev, password: pwd }));
  };

  const submitVehicle = async () => {
    setVehicleMsg('');
    const { vehicleNumber, password } = vehicleForm;
    if (!vehicleNumber || !password) {
      setVehicleMsg('vehicleNumber and password are required');
      return;
    }
    setVehicleSubmitting(true);
    try {
      const payload = {
        vehicleNumber: vehicleForm.vehicleNumber,
        password: vehicleForm.password
      };
      
      // Only add model and type if they have values
      if (vehicleForm.model.trim()) {
        payload.model = vehicleForm.model;
      }
      if (vehicleForm.type) {
        payload.type = vehicleForm.type;
      }
      
      console.log('Submitting vehicle:', payload); // Debug log
      
      const res = await fetch('http://localhost:5000/api/company/vehicles', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(typeof window !== 'undefined' && localStorage.getItem('companyToken') ? 
            { Authorization: `Bearer ${localStorage.getItem('companyToken')}` } : {})
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        console.error('Add vehicle API error:', res.status, data);
        throw new Error(data?.message || `Failed to add vehicle (${res.status})`);
      }
      setVehicleMsg('Vehicle added successfully');
      setVehicleForm(prev => ({ ...prev, vehicleNumber: '', password: '', model: '', type: '' }));
      // Reload vehicles list after adding
      await loadVehicles();
    } catch (err) {
      console.error('Submit vehicle error:', err);
      setVehicleMsg(err.message || 'Error adding vehicle');
    } finally {
      setVehicleSubmitting(false);
    }
  };

  const [assignments, setAssignments] = useState([]);
  const [detailVehicleId, setDetailVehicleId] = useState(null);

  const loadAssignments = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('companyToken') : '';
      if (!token) return;
      
      console.log('🔗 Loading vehicle assignments...');
      const res = await fetch('http://localhost:5000/api/company/clients/vehicles-list-assignments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      console.log('📋 Assignments data:', data);
      
      if (Array.isArray(data)) {
        setAssignments(data);
        console.log('✅ Assignments loaded:', data.length, 'assignments');
      } else {
        console.log('❌ Assignments data is not an array:', data);
      }
    } catch (e) {
      console.error('❌ Failed to load assignments:', e);
    }
  };

  useEffect(() => { loadAssignments(); }, []);

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Vehicles</p>
              <p className="text-2xl font-bold text-black">{vehiclesLoading ? '...' : vehicles.length}</p>
            </div>
            <Car className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Chats</p>
              <p className="text-2xl font-bold text-black">{chatRooms.filter(c => c.status === 'active').length}</p>
            </div>
            <MessageCircle className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Clients</p>
              <p className="text-2xl font-bold text-black">25</p>
            </div>
            <Users className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Locations</p>
              <p className="text-2xl font-bold text-black">12</p>
            </div>
            <MapPin className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-black">Vehicle List</h3>
          <div className="flex gap-2">
            <button 
              onClick={loadVehicles}
              className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors"
            >
              Refresh
            </button>
                         <button 
               onClick={async () => {
                 try {
                   const res = await fetch('http://localhost:5000/');
                   const text = await res.text();
                   alert(`Backend is running: ${text}`);
                 } catch (e) {
                   alert(`Backend error: ${e.message}`);
                 }
               }}
               className="text-sm bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded transition-colors"
             >
               Test Backend
             </button>
             <button 
               onClick={() => {
                 console.log('🔍 Current assignments:', assignments);
                 console.log('🔍 Current vehicles:', vehicles);
                 alert(`Assignments: ${assignments.length}\nVehicles: ${vehicles.length}\nCheck console for details`);
               }}
               className="text-sm bg-green-100 hover:bg-green-200 px-3 py-1 rounded transition-colors"
             >
               Debug Data
             </button>
          </div>
        </div>
        {vehiclesError && (
          <div className="p-4 text-red-600 bg-red-50 border-b border-red-200">
            {vehiclesError}
            <button 
              onClick={loadVehicles}
              className="ml-2 text-sm underline hover:no-underline"
            >
              Retry
            </button>
          </div>
        )}
        {vehiclesLoading ? (
          <div className="p-8 text-center text-gray-500">Loading vehicles...</div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client Lists</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vehicles.length > 0 ? vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-black">{vehicle.name}</td>
                  
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      vehicle.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{vehicle.location}</td>
                                     <td className="px-6 py-4 text-sm text-gray-600">
                     {(() => {
                       const assignment = assignments.find(a => a.vehicleId === vehicle.id);
                       if (assignment && assignment.listNames && assignment.listNames.length > 0) {
                         return assignment.listNames.join(', ');
                       }
                       return '—';
                     })()}
                   </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{vehicle.model}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{vehicle.type}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => setDetailVehicleId(vehicle.id)} className="text-black hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                    No vehicles found. Add your first vehicle using the "Add Vehicle" option.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        )}
      </div>
      {detailVehicleId && (
        <VehicleDetail vehicleId={detailVehicleId} companyToken={typeof window !== 'undefined' ? localStorage.getItem('companyToken') : ''} onClose={() => setDetailVehicleId(null)} />
      )}
    </div>
  );

  const renderAddVehicle = () => (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-black mb-6">Add New Vehicle</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Number *</label>
          <input name="vehicleNumber" value={vehicleForm.vehicleNumber} onChange={handleVehicleChange} placeholder="e.g. MH12AB1234" type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Password *</label>
          <div className="flex gap-2">
            <input name="password" value={vehicleForm.password} onChange={handleVehicleChange} type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" />
            <button type="button" onClick={generateRandomPassword} className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Random</button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
          <input name="model" value={vehicleForm.model} onChange={handleVehicleChange} placeholder="e.g. DZIRE" type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select name="type" value={vehicleForm.type} onChange={handleVehicleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
            <option value="">Select type</option>
            <option value="Truck">Truck</option>
            <option value="Bus">Bus</option>
            <option value="Car">Car</option>
            <option value="Van">Van</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company ID *</label>
          <input name="companyId" value={vehicleForm.companyId} onChange={handleVehicleChange} type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" />
          <p className="text-xs text-gray-500 mt-1">Prefilled from login if available</p>
        </div>
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <button onClick={submitVehicle} disabled={vehicleSubmitting} className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-60">
              {vehicleSubmitting ? 'Adding...' : 'Add Vehicle'}
            </button>
            {vehicleMsg && (
              <span className={`text-sm ${vehicleMsg.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                {vehicleMsg}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderChatSection = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-black">Active Chat Rooms</h3>
          <p className="text-sm text-gray-600">Monitor conversations between drivers, clients, and support</p>
        </div>
        <div className="divide-y divide-gray-200">
          {chatRooms.map((room) => (
            <div key={room.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-black">{room.vehicle} Chat Room</h4>
                  <p className="text-sm text-gray-600">
                    Participants: {room.participants.join(', ')}
                  </p>
                  <p className="text-xs text-gray-500">Last message: {room.lastMessage}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    room.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : room.status === 'idle'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {room.status}
                  </span>
                  <button className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-800 transition-colors">
                    Join Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'vehicles':
        return renderAddVehicle();
      case 'clients':
        return (
          <ClientManager companyToken={typeof window !== 'undefined' ? localStorage.getItem('companyToken') : ''} />
        );
      case 'locations':
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">All Vehicle Locations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-black">{vehicle.name}</h4>
                  <p className="text-sm text-gray-600">📍 {vehicle.location}</p>
                  <p className="text-sm text-gray-500">Driver: {vehicle.driver}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'chat':
        return renderChatSection();
      case 'settings':
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-black">Dark/Light Mode</span>
                <button className="bg-gray-200 rounded-full p-1 w-12 h-6 flex items-center">
                  <div className="bg-white rounded-full w-4 h-4 transition-transform"></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-black">Notifications</span>
                <button className="bg-black rounded-full p-1 w-12 h-6 flex items-center justify-end">
                  <div className="bg-white rounded-full w-4 h-4"></div>
                </button>
              </div>
            </div>
          </div>
        );
             case 'profile':
         return (
           <div className="bg-white border border-gray-200 rounded-lg p-6">
             <h3 className="text-lg font-semibold text-black mb-4">Company Profile</h3>
             <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                 <input type="text" defaultValue="Chat Support Company" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                 <input type="email" defaultValue="admin@company.com" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
                 <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24" defaultValue="Vehicle management and chat support system"></textarea>
               </div>
               <div className="flex gap-3">
                 <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                   Save Changes
                 </button>
                 <button 
                   onClick={() => {
                     if (typeof window !== 'undefined') {
                       localStorage.removeItem('companyToken');
                       window.location.href = '/company/login';
                     }
                   }}
                   className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                 >
                   Logout
                 </button>
               </div>
             </div>
           </div>
         );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:text-black"
            >
              <Menu className="w-6 h-6" />
            </button>
                         <h1 className="text-xl font-bold text-black">Company Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 text-gray-400" />
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
          <div className="p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? 'bg-black text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    {sidebarOpen && <span>{item.label}</span>}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}