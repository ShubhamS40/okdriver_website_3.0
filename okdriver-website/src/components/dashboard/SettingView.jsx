'use client'
import React from 'react';

const SettingsView = () => {
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
};

export default SettingsView;