'use client'
import React, { useState } from 'react';
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
  const [vehicles] = useState([
    { id: 1, name: 'Vehicle 001', driver: 'John Doe', status: 'Active', location: 'Delhi', client: 'Company A' },
    { id: 2, name: 'Vehicle 002', driver: 'Jane Smith', status: 'Inactive', location: 'Mumbai', client: 'Company B' },
    { id: 3, name: 'Vehicle 003', driver: 'Mike Johnson', status: 'Active', location: 'Bangalore', client: 'Company C' },
  ]);

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

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Vehicles</p>
              <p className="text-2xl font-bold text-black">{vehicles.length}</p>
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
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-black">Vehicle List</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-black">{vehicle.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{vehicle.driver}</td>
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
                  <td className="px-6 py-4 text-sm text-gray-600">{vehicle.client}</td>
                  <td className="px-6 py-4">
                    <button className="text-black hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAddVehicle = () => (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-black mb-6">Add New Vehicle</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Name</label>
          <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Driver Name</label>
          <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Client Company</label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
            <option>Select Client</option>
            <option>Company A</option>
            <option>Company B</option>
            <option>Company C</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            Add Vehicle
          </button>
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
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Add New Client</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Company Name" className="border border-gray-300 rounded-lg px-3 py-2" />
              <input type="email" placeholder="Email" className="border border-gray-300 rounded-lg px-3 py-2" />
              <input type="tel" placeholder="Phone" className="border border-gray-300 rounded-lg px-3 py-2" />
              <input type="text" placeholder="Location" className="border border-gray-300 rounded-lg px-3 py-2" />
              <div className="md:col-span-2">
                <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  Add Client
                </button>
              </div>
            </div>
          </div>
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
              <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                Save Changes
              </button>
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
            <h1 className="text-xl font-bold text-black">Chat Support System</h1>
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