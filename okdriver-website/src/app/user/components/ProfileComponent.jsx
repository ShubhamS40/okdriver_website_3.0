'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

export default function ProfileComponent({ userProfile, subscription }) {
  // Calculate days left in subscription if active
  const getDaysLeft = () => {
    if (!subscription || subscription.status !== 'ACTIVE') return 0;
    
    const endDate = new Date(subscription.endAt);
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 mb-6"
    >
      <div className="flex items-center mb-6">
        <div className="bg-black text-white p-3 rounded-full mr-4">
          <User size={24} />
        </div>
        <h2 className="text-2xl font-bold">User Profile</h2>
      </div>

      {userProfile ? (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <img 
              src={userProfile.picture || "https://via.placeholder.com/100"} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold">{userProfile.name}</h3>
              <p className="text-gray-600">{userProfile.email}</p>
              <p className="text-sm text-gray-500">
                Account created: {new Date(userProfile.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-6 border-t pt-4">
            <h4 className="text-lg font-semibold mb-2">Subscription Status</h4>
            {subscription && subscription.status === 'ACTIVE' ? (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-green-800">Active Subscription</p>
                    <p className="text-sm text-green-700">
                      Valid until: {new Date(subscription.endAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-green-100 text-green-800 font-bold py-2 px-4 rounded-full">
                    {getDaysLeft()} days left
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="font-medium text-red-800">No Active Subscription</p>
                <p className="text-sm text-red-700">
                  Purchase a plan to create and use API keys
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      )}
    </motion.div>
  );
}