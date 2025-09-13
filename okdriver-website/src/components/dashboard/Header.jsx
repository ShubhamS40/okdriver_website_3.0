'use client'
import React from 'react';
import { Menu, User } from 'lucide-react';
import { CompanyNotification } from '../../components/dashboard/CompanyNotification';

const Header = ({ setSidebarOpen, sidebarOpen }) => {
  return (
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
          <CompanyNotification />
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;