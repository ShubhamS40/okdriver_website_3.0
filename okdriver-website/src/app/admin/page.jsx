'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminPanel() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if user is authenticated
  useEffect(() => {
    // This would normally check a token in localStorage or cookies
    const checkAuth = () => {
      // Mock authentication check
      const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
      setIsAuthenticated(isLoggedIn);
      setIsLoading(false);
      
      if (!isLoggedIn) {
        // Redirect to login if not authenticated
        router.push('/admin/login');
      }
    };
    
    checkAuth();
  }, [router]);
  
  // If still loading, show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }
  
  // If not authenticated, don't render anything (redirect happens in useEffect)
  if (!isAuthenticated) {
    return null;
  }
  
  // Admin panel content
  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <button 
          onClick={() => {
            localStorage.removeItem('adminLoggedIn');
            router.push('/admin/login');
          }}
          className="btn-secondary"
        >
          Logout
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard Card */}
        <Link href="/admin/dashboard" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-2">Dashboard</h2>
          <p className="text-gray-600 mb-4">View statistics and overall system performance</p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">View Dashboard</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
        
        {/* Subscription Plans Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-2">Subscription Plans</h2>
          <p className="text-gray-600 mb-4">Manage subscription plans and pricing</p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Manage Plans</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        {/* Registered Drivers Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-2">Registered Drivers</h2>
          <p className="text-gray-600 mb-4">View and manage driver accounts</p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">View Drivers</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        {/* Support Tickets Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-2">Support Tickets</h2>
          <p className="text-gray-600 mb-4">Manage customer support tickets</p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">View Tickets</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        {/* Payment Records Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-2">Payment Records</h2>
          <p className="text-gray-600 mb-4">View and manage payment transactions</p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">View Payments</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        {/* Settings Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-2">Settings</h2>
          <p className="text-gray-600 mb-4">Configure system settings and preferences</p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Manage Settings</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Quick Stats Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Drivers</h3>
            <p className="text-3xl font-bold">1,248</p>
            <p className="text-green-500 text-sm mt-2">+12% from last month</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Active Subscriptions</h3>
            <p className="text-3xl font-bold">964</p>
            <p className="text-green-500 text-sm mt-2">+8% from last month</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Open Tickets</h3>
            <p className="text-3xl font-bold">24</p>
            <p className="text-red-500 text-sm mt-2">+5 from yesterday</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Monthly Revenue</h3>
            <p className="text-3xl font-bold">$48,294</p>
            <p className="text-green-500 text-sm mt-2">+15% from last month</p>
          </div>
        </div>
      </div>
      
      {/* Recent Activity Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">New driver registration</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">John Smith</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 4, 2023 - 10:23 AM</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Subscription upgrade</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sarah Johnson</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 3, 2023 - 3:45 PM</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Support ticket opened</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Michael Brown</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 3, 2023 - 11:32 AM</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Payment received</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Emily Davis</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 2, 2023 - 9:15 AM</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Account deactivation</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Robert Wilson</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 1, 2023 - 4:50 PM</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Cancelled</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}