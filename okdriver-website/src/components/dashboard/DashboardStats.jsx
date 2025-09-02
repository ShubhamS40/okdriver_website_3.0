'use client'
import React from 'react';
import { Car, MessageCircle, Users, MapPin } from 'lucide-react';

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white border border-gray-200 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Vehicles</p>
            <p className="text-2xl font-bold text-black">{stats.totalVehicles}</p>
          </div>
          <Car className="w-8 h-8 text-gray-400" />
        </div>
      </div>
      <div className="bg-white border border-gray-200 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Active Chats</p>
            <p className="text-2xl font-bold text-black">{stats.activeChats}</p>
          </div>
          <MessageCircle className="w-8 h-8 text-gray-400" />
        </div>
      </div>
      <div className="bg-white border border-gray-200 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Clients</p>
            <p className="text-2xl font-bold text-black">{stats.totalClients}</p>
          </div>
          <Users className="w-8 h-8 text-gray-400" />
        </div>
      </div>
      <div className="bg-white border border-gray-200 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Locations</p>
            <p className="text-2xl font-bold text-black">{stats.locations}</p>
          </div>
          <MapPin className="w-8 h-8 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;