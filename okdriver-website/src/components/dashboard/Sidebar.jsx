'use client'
import React from 'react';
import { 
  MessageCircle, 
  Car, 
  Users, 
  MapPin, 
  Settings, 
  User,
  Menu,
  BarChart
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection, sidebarOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Menu },
    { id: 'vehicles', label: 'Add Vehicle', icon: Car },
    { id: 'clients', label: 'Add Client', icon: Users },
    { id: 'locations', label: 'View All Locations', icon: MapPin },
    { id: 'report', label: 'Reports', icon: BarChart },
    { id: 'chat', label: 'Chat Section', icon: MessageCircle },
    { id: 'help', label: 'Help & Support', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
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
  );
};

export default Sidebar;