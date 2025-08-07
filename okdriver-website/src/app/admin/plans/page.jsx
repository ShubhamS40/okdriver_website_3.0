'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data for subscription plans
const mockPlans = [
  {
    id: 1,
    name: 'Basic',
    price: 99.99,
    billingCycle: 'monthly',
    description: 'Essential safety features for individual drivers',
    benefits: [
      '24/7 Drowsiness Monitoring',
      'Basic Voice Assistant',
      'SOS Alert System',
      'Standard Support'
    ],
    services: ['drowsinessMonitoring', 'sosAlert'],
    subscribers: 128,
    status: 'active'
  },
  {
    id: 2,
    name: 'Premium',
    price: 199.99,
    billingCycle: 'monthly',
    description: 'Advanced features for professional drivers',
    benefits: [
      '24/7 Drowsiness Monitoring',
      'Advanced Voice Assistant',
      'SOS Alert System with GPS Tracking',
      'Priority Support',
      'Performance Analytics'
    ],
    services: ['drowsinessMonitoring', 'voiceAssistant', 'sosAlert'],
    subscribers: 85,
    status: 'active'
  },
  {
    id: 3,
    name: 'Enterprise',
    price: 499.99,
    billingCycle: 'monthly',
    description: 'Complete solution for fleet management',
    benefits: [
      '24/7 Drowsiness Monitoring',
      'Advanced Voice Assistant',
      'SOS Alert System with GPS Tracking',
      'Fleet Management Dashboard',
      'Driver Performance Analytics',
      'API Integration',
      'Dedicated Support'
    ],
    services: ['drowsinessMonitoring', 'voiceAssistant', 'sosAlert'],
    subscribers: 42,
    status: 'active'
  },
  {
    id: 4,
    name: 'Summer Special',
    price: 149.99,
    billingCycle: 'quarterly',
    description: 'Limited time offer with special pricing',
    benefits: [
      '24/7 Drowsiness Monitoring',
      'Basic Voice Assistant',
      'SOS Alert System',
      'Standard Support'
    ],
    services: ['drowsinessMonitoring', 'voiceAssistant', 'sosAlert'],
    subscribers: 17,
    status: 'inactive'
  },
  {
    id: 5,
    name: 'Day Pass',
    price: 9.99,
    billingCycle: 'daily',
    description: 'Pay-as-you-go option for occasional drivers',
    benefits: [
      '24-hour Drowsiness Monitoring',
      'Basic Voice Assistant',
      'SOS Alert System',
      'Email Support'
    ],
    services: ['drowsinessMonitoring', 'sosAlert'],
    subscribers: 56,
    status: 'active'
  }
];

export default function SubscriptionPlans() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('active');
  
  // Filter plans based on search term and active tab
  const filteredPlans = mockPlans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'active' && plan.status === 'active') ||
                      (activeTab === 'inactive' && plan.status === 'inactive');
    return matchesSearch && matchesTab;
  });

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link href="/admin/dashboard" className="text-black hover:underline flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">Subscription Plans</h1>
          <p className="text-gray-600">Manage your subscription plans</p>
        </div>
        <Link href="/admin/plans/create" className="btn-primary">
          Create New Plan
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Search plans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-md ${activeTab === 'all' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              All Plans
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 rounded-md ${activeTab === 'active' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab('inactive')}
              className={`px-4 py-2 rounded-md ${activeTab === 'inactive' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              Inactive
            </button>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">{plan.name}</h2>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${plan.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {plan.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <div className="mb-4">
                <span className="text-3xl font-bold">₹{plan.price}</span>
                <span className="text-gray-500">/{plan.billingCycle === 'daily' ? 'day' : plan.billingCycle === 'monthly' ? 'month' : plan.billingCycle === 'quarterly' ? '3 months' : 'year'}</span>
              </div>
              
              <p className="text-gray-600 mb-4">{plan.description}</p>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Benefits:</h3>
                <ul className="space-y-1">
                  {plan.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Included Services:</h3>
                <div className="flex flex-wrap gap-2">
                  {plan.services.includes('drowsinessMonitoring') && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Drowsiness Monitoring</span>
                  )}
                  {plan.services.includes('voiceAssistant') && (
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Voice Assistant</span>
                  )}
                  {plan.services.includes('sosAlert') && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">SOS Alert</span>
                  )}
                </div>
              </div>
              
              <div className="text-sm text-gray-500 mb-4">
                <span>{plan.subscribers} active subscribers</span>
              </div>
              
              <div className="flex space-x-2">
                <Link 
                  href={`/admin/plans/${plan.id}`}
                  className="flex-1 bg-black text-white text-center py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  View Details
                </Link>
                <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredPlans.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No plans found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating a new plan.'}
          </p>
          <div className="mt-6">
            <Link href="/admin/plans/create" className="btn-primary">
              Create New Plan
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}