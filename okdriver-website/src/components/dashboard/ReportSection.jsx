'use client'
import React, { useState } from 'react';

const ReportSection = () => {
  const [timeRange, setTimeRange] = useState('This week');
  
  // Mock data for the report section - focused on client data
  const reportData = {
    totalClients: 0,
    activeClients: 0,
    totalBookings: 0,
    totalRevenue: 0,
    totalServiceHours: 0,
    lastUpdated: '2025-09-02',
    clientStatus: {
      active: 33,
      inactive: 33,
      pending: 34
    }
  };

  // Time range options
  const timeRanges = ['This week', 'Last week', 'This month', 'Last month'];

  return (
    <div className="space-y-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Total Clients and Active Clients Card */}
        <div className="bg-black text-white p-6 rounded-lg col-span-1 md:col-span-2">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-300">Total Clients</p>
              <div className="flex items-center mt-2">
                <span className="text-4xl font-bold">{reportData.totalClients}</span>
              </div>
            </div>
            <div>
              <p className="text-gray-300">Active Clients</p>
              <div className="flex items-center mt-2">
                <span className="text-4xl font-bold">{reportData.activeClients}</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">Updated to {reportData.lastUpdated}</p>
        </div>

        {/* Total Bookings Card */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <div className="flex flex-col">
            <p className="text-gray-500">Total Bookings</p>
            <p className="text-4xl font-bold text-black mt-2">{reportData.totalBookings}</p>
            <div className="mt-auto">
              <select 
                className="mt-4 text-sm text-gray-500 bg-transparent border-none focus:ring-0 p-0"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                {timeRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <div className="flex flex-col">
            <p className="text-gray-500">Total Revenue ($)</p>
            <p className="text-4xl font-bold text-black mt-2">{reportData.totalRevenue}</p>
            <div className="mt-auto">
              <select 
                className="mt-4 text-sm text-gray-500 bg-transparent border-none focus:ring-0 p-0"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                {timeRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Total Service Hours Card */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <div className="flex flex-col">
            <p className="text-gray-500">Total Service Hours</p>
            <p className="text-4xl font-bold text-black mt-2">{reportData.totalServiceHours}</p>
            <div className="mt-auto">
              <select 
                className="mt-4 text-sm text-gray-500 bg-transparent border-none focus:ring-0 p-0"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                {timeRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reminder Section */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-black">Client Reminders</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Contract renewal</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Payment due dates</span>
            </div>
          </div>

          {/* Client Status Pie Chart */}
          <div className="mt-6">
            <div className="relative w-40 h-40 mx-auto">
              {/* SVG Pie Chart */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Active slice (33%) */}
                <path 
                  d="M50 50 L50 0 A50 50 0 0 1 97.55 34.55 Z" 
                  fill="#10b981"
                />
                {/* Inactive slice (33%) */}
                <path 
                  d="M50 50 L97.55 34.55 A50 50 0 0 1 65.45 97.55 Z" 
                  fill="#ef4444"
                />
                {/* Pending slice (34%) */}
                <path 
                  d="M50 50 L65.45 97.55 A50 50 0 0 1 0 50 A50 50 0 0 1 50 0 Z" 
                  fill="#f59e0b"
                />
              </svg>
            </div>
            <div className="flex justify-center mt-4 space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 mr-1"></div>
                <span>Active</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 mr-1"></div>
                <span>Inactive</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 mr-1"></div>
                <span>Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Client Activity Statistics Section */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-black">Client Activity Statistics</h3>
            <select 
              className="text-sm text-gray-500 bg-transparent border-none focus:ring-0 p-0"
              defaultValue="Last 7 days"
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>

          {/* Activity Tabs */}
          <div className="flex space-x-4 mb-4">
            <button className="text-blue-600 border-b-2 border-blue-600 pb-1">Booking frequency</button>
            <button className="text-gray-500 hover:text-gray-700">Payment activity</button>
            <button className="text-gray-500 hover:text-gray-700">Service usage</button>
          </div>

          {/* Chart Area */}
          <div className="h-64 w-full">
            {/* Simple Bar Chart */}
            <div className="h-full w-full flex items-end justify-between">
              {/* Y-axis labels */}
              <div className="absolute left-0 h-full flex flex-col justify-between text-xs text-gray-500">
                <span>100</span>
                <span>80</span>
                <span>60</span>
                <span>40</span>
                <span>20</span>
                <span>0</span>
              </div>
              
              {/* Empty chart - would be populated with real data */}
              <div className="w-full h-full flex items-end justify-around pl-8">
                {/* No bars shown as data is 0 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportSection;