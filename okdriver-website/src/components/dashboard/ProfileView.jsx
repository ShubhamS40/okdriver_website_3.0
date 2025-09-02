'use client'
import React from 'react';

const ProfileView = () => {
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
};

export default ProfileView;