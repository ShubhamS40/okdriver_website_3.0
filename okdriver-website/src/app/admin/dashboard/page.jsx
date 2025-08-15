'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data for drivers
const mockDrivers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+91 9876543210', location: 'Mumbai', status: 'Active', registrationDate: '2023-05-01', plan: 'Premium' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+91 9876543211', location: 'Delhi', status: 'Active', registrationDate: '2023-05-02', plan: 'Basic' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', phone: '+91 9876543212', location: 'Bangalore', status: 'Inactive', registrationDate: '2023-05-03', plan: 'Day Pass' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', phone: '+91 9876543213', location: 'Chennai', status: 'Active', registrationDate: '2023-05-04', plan: 'Premium' },
  { id: 5, name: 'Michael Wilson', email: 'michael@example.com', phone: '+91 9876543214', location: 'Hyderabad', status: 'Active', registrationDate: '2023-05-05', plan: 'Basic' },
];

// Mock data for support tickets
const mockTickets = [
  { id: 'T-1001', subject: 'App not working', status: 'Open', priority: 'High', date: '2023-05-10' },
  { id: 'T-1002', subject: 'Payment issue', status: 'In Progress', priority: 'Medium', date: '2023-05-09' },
  { id: 'T-1003', subject: 'Feature request', status: 'Open', priority: 'Low', date: '2023-05-08' },
  { id: 'T-1004', subject: 'Account access', status: 'Closed', priority: 'High', date: '2023-05-07' },
  { id: 'T-1005', subject: 'Subscription question', status: 'Open', priority: 'Medium', date: '2023-05-06' },
];

// Enhanced subscription plans with plan types
const mockPlans = [
  { 
    id: 1, 
    name: 'Basic Individual', 
    price: 499, 
    features: '24/7 Support, Basic Monitoring', 
    subscribers: 25, 
    status: 'Active', 
    billingCycle: 'Monthly', 
    description: 'Perfect for individual drivers', 
    benefits: ['24/7 Customer Support', 'Basic Monitoring Features', 'Monthly Reports'], 
    includedServices: ['Drowsiness Monitoring'],
    planType: 'individual'
  },
  { 
    id: 2, 
    name: 'Premium Individual', 
    price: 999, 
    features: '24/7 Support, Advanced Monitoring, Voice Assistant', 
    subscribers: 42, 
    status: 'Active', 
    billingCycle: 'Monthly', 
    description: 'Ideal for professional drivers', 
    benefits: ['24/7 Priority Support', 'Advanced Monitoring Features', 'Weekly Reports', 'Performance Analytics'], 
    includedServices: ['Drowsiness Monitoring', 'Voice Assistant'],
    planType: 'individual'
  },
  { 
    id: 3, 
    name: 'Enterprise Fleet', 
    price: 1999, 
    features: 'All Features, Priority Support, Custom Integration', 
    subscribers: 18, 
    status: 'Active', 
    billingCycle: 'Monthly', 
    description: 'Best for fleet companies', 
    benefits: ['24/7 Dedicated Support', 'All Monitoring Features', 'Daily Reports', 'Advanced Analytics', 'Custom Integration'], 
    includedServices: ['Drowsiness Monitoring', 'Voice Assistant', 'SOS Alert'],
    planType: 'company'
  },
  { 
    id: 4, 
    name: 'Corporate Fleet Plus', 
    price: 2999, 
    features: '24/7 Support, Fleet Management, Driver Analytics', 
    subscribers: 12, 
    status: 'Active', 
    billingCycle: 'Monthly', 
    description: 'Advanced fleet management solution', 
    benefits: ['24/7 Dedicated Support', 'Fleet Dashboard', 'Driver Performance Analytics', 'Real-time Tracking'], 
    includedServices: ['Drowsiness Monitoring', 'Voice Assistant', 'SOS Alert', 'Fleet Management'],
    planType: 'company'
  },
  { 
    id: 5, 
    name: 'Day Pass', 
    price: 9.99, 
    features: '24-hour Access, Basic Monitoring, SOS Alert', 
    subscribers: 56, 
    status: 'Active', 
    billingCycle: 'Daily', 
    description: 'Pay-as-you-go option for occasional drivers', 
    benefits: ['24-hour Drowsiness Monitoring', 'Basic Voice Assistant', 'SOS Alert System', 'Email Support'], 
    includedServices: ['Drowsiness Monitoring', 'SOS Alert'],
    planType: 'individual'
  },
];

// Mock data for fleet companies
const mockFleetCompanies = [
  { id: 1, name: 'Speedy Logistics', email: 'contact@speedylogistics.com', phone: '+91 9876543220', location: 'Mumbai', status: 'Active', registrationDate: '2023-04-01', driversCount: 25, plan: 'Enterprise Fleet' },
  { id: 2, name: 'City Movers', email: 'info@citymovers.com', phone: '+91 9876543221', location: 'Delhi', status: 'Active', registrationDate: '2023-04-15', driversCount: 18, plan: 'Corporate Fleet Plus' },
  { id: 3, name: 'Express Delivery', email: 'support@expressdelivery.com', phone: '+91 9876543222', location: 'Bangalore', status: 'Inactive', registrationDate: '2023-05-01', driversCount: 12, plan: 'Enterprise Fleet' },
  { id: 4, name: 'Safe Ride Co.', email: 'hello@saferide.com', phone: '+91 9876543223', location: 'Chennai', status: 'Active', registrationDate: '2023-05-10', driversCount: 30, plan: 'Corporate Fleet Plus' },
  { id: 5, name: 'Metro Transport', email: 'contact@metrotransport.com', phone: '+91 9876543224', location: 'Hyderabad', status: 'Active', registrationDate: '2023-05-20', driversCount: 22, plan: 'Enterprise Fleet' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('drivers');
  const [planFilter, setPlanFilter] = useState('all');

  // Filter plans based on selected filter
  const filteredPlans = planFilter === 'all' ? mockPlans : mockPlans.filter(plan => plan.planType === planFilter);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage drivers, subscriptions, and support tickets</p>
          </div>
          <div className="flex space-x-4">
            <div className="relative group">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-10 hidden group-hover:block border">
                <Link href="/admin/drivers/create" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Add Driver
                </Link>
                
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Create Plans</div>
                
                <Link href="/admin/plans/create/drivers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Plan for Individual Driver
                </Link>
                
                <Link href="/admin/plans/create/company" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Plan for Fleet Company
                </Link>
                
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <Link href="/admin/fleet/create" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Add Fleet Company
                  </Link>
                </div>
              </div>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Data
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('drivers')}
                className={`${activeTab === 'drivers' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors`}
              >
                Registered Drivers
              </button>
              <button
                onClick={() => setActiveTab('plans')}
                className={`${activeTab === 'plans' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors`}
              >
                Subscription Plans
              </button>
              <button
                onClick={() => setActiveTab('fleet')}
                className={`${activeTab === 'fleet' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors`}
              >
                Fleet Companies
              </button>
              <button
                onClick={() => setActiveTab('tickets')}
                className={`${activeTab === 'tickets' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors`}
              >
                Support Tickets
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`${activeTab === 'payments' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors`}
              >
                Payment Records
              </button>
            </nav>
          </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Drivers Tab */}
          {activeTab === 'drivers' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Total Registered Drivers: {mockDrivers.length}</h2>
                <div className="flex space-x-4">
                  <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm transition-colors">
                    Export List
                  </button>
                  <Link href="/admin/drivers/create" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm transition-colors">
                    Add New Driver
                  </Link>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockDrivers.map((driver) => (
                      <tr key={driver.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{driver.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{driver.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            {driver.plan}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${driver.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {driver.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                          <Link href={`/admin/drivers/${driver.id}`} className="text-blue-600 hover:text-blue-800">View</Link>
                          <button className="text-green-600 hover:text-green-800">Edit</button>
                          <button className="text-red-600 hover:text-red-800">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Subscription Plans Tab */}
          {activeTab === 'plans' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search plans..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                    <div className="absolute left-3 top-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  <select 
                    value={planFilter} 
                    onChange={(e) => setPlanFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="all">All Plans</option>
                    <option value="individual">Individual Plans</option>
                    <option value="company">Company Plans</option>
                  </select>
                </div>
                <div className="flex space-x-4">
                  <Link href="/admin/plans" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm transition-colors">
                    Manage Plans
                  </Link>
                  <div className="relative group">
                    <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Create Plan
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg py-2 z-10 hidden group-hover:block border">
                      <Link href="/admin/plans/create/drivers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        For Individual Drivers
                      </Link>
                      <Link href="/admin/plans/create/company" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        For Fleet Companies
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlans.map((plan) => (
                  <div key={plan.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          plan.planType === 'individual' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {plan.planType === 'individual' ? 'Individual' : 'Fleet Company'}
                        </span>
                      </div>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${plan.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {plan.status}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{plan.price}
                        <span className="text-sm font-normal text-gray-500">
                          {plan.billingCycle === 'Daily' ? '/day' : plan.billingCycle === 'Monthly' ? '/month' : plan.billingCycle === 'Quarterly' ? '/quarter' : '/year'}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">{plan.billingCycle} billing</p>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2 text-gray-900">Included Services:</h4>
                      <div className="flex flex-wrap gap-1">
                        {plan.includedServices.map((service, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded font-medium">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-500">{plan.subscribers} subscribers</div>
                      <Link 
                        href={`/admin/plans/${plan.id}`} 
                        className="text-black hover:text-gray-700 font-medium text-sm flex items-center group"
                      >
                        View Details
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Fleet Companies Tab */}
          {activeTab === 'fleet' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search companies..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                    <div className="absolute left-3 top-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black">
                    <option>All Companies</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
                <div className="flex space-x-4">
                  <Link href="/admin/fleet" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm transition-colors">
                    Manage Fleet Companies
                  </Link>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drivers</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockFleetCompanies.map((company) => (
                      <tr key={company.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{company.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{company.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            {company.driversCount} drivers
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                            {company.plan}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${company.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {company.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                          <Link href={`/admin/fleet/${company.id}`} className="text-blue-600 hover:text-blue-800">View</Link>
                          <button className="text-green-600 hover:text-green-800">Edit</button>
                          <button className="text-red-600 hover:text-red-800">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Support Tickets Tab */}
          {activeTab === 'tickets' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Support Tickets</h2>
                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm transition-colors">
                  Create Ticket
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockTickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.subject}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            ticket.status === 'Open' ? 'bg-yellow-100 text-yellow-800' : 
                            ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            ticket.priority === 'High' ? 'bg-red-100 text-red-800' : 
                            ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                          <button className="text-blue-600 hover:text-blue-800">View</button>
                          <button className="text-green-600 hover:text-green-800">Reply</button>
                          <button className="text-red-600 hover:text-red-800">Close</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Payment Records Tab */}
          {activeTab === 'payments' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Payment Records</h2>
                <div className="flex space-x-4">
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black">
                    <option>All Time</option>
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Last 3 Months</option>
                  </select>
                  <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm transition-colors">
                    Export Report
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-sm font-medium text-blue-600 mb-2">Total Revenue</h3>
                  <p className="text-2xl font-bold text-blue-900">₹12,45,000</p>
                  <p className="text-sm text-blue-600 mt-1">+12% from last month</p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                  <h3 className="text-sm font-medium text-green-600 mb-2">This Month</h3>
                  <p className="text-2xl font-bold text-green-900">₹2,85,000</p>
                  <p className="text-sm text-green-600 mt-1">+8% from last month</p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                  <h3 className="text-sm font-medium text-purple-600 mb-2">Active Subscriptions</h3>
                  <p className="text-2xl font-bold text-purple-900">151</p>
                  <p className="text-sm text-purple-600 mt-1">Individual + Fleet</p>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
                  <h3 className="text-sm font-medium text-orange-600 mb-2">Average Revenue</h3>
                  <p className="text-2xl font-bold text-orange-900">₹825</p>
                  <p className="text-sm text-orange-600 mt-1">Per subscriber/month</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TX-12345</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Premium Individual</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹999</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-15</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-800">View Details</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TX-12346</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Speedy Logistics</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">Enterprise Fleet</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹1,999</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-14</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-800">View Details</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TX-12347</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jane Smith</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Basic Individual</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹499</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-10</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Failed</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-800">View Details</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TX-12348</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Robert Johnson</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Day Pass</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹9.99</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-09</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-800">View Details</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TX-12349</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">City Movers</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">Corporate Fleet Plus</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹2,999</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-08</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-800">View Details</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>

  );
}