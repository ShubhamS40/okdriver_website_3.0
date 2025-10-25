'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminPanel() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [dataError, setDataError] = useState('');
  const [isClient, setIsClient] = useState(false);
  
  // Ensure we're on the client side before accessing localStorage
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Check if user is authenticated
  useEffect(() => {
    if (!isClient) return; // Wait for client-side hydration
    
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('adminToken');
        const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
        
        if (!token || !isLoggedIn) {
          // Clear invalid tokens
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminLoggedIn');
          router.push('/admin/login');
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [router, isClient]);
  
  // Fetch dashboard data when authenticated
  useEffect(() => {
    if (!isAuthenticated || !isClient) return;
    
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch('/api/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            // Token expired or invalid
            handleLogout();
            return;
          }
          throw new Error(`Failed to fetch dashboard data: ${response.status}`);
        }
        
        const data = await response.json();
        setDashboardData(data.data || data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setDataError('Failed to load dashboard data');
      }
    };
    
    fetchDashboardData();
  }, [isAuthenticated, isClient]);
  
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminLoggedIn');
      router.push('/admin/login');
    }
  };
  
  // Show loading state while checking authentication or on server side
  if (!isClient || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }
  
  // If not authenticated, show nothing (redirect happens in useEffect)
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }
  
  // Admin panel content
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <button 
            onClick={handleLogout}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dashboard Card */}
          <Link href="/admin/dashboard" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <h2 className="text-xl font-bold mb-2 text-gray-900">Dashboard</h2>
            <p className="text-gray-600 mb-4">View statistics and overall system performance</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-blue-600">View Dashboard</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
          
          {/* Subscription Plans Card */}
          <Link href="/admin/plans" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <h2 className="text-xl font-bold mb-2 text-gray-900">Subscription Plans</h2>
            <p className="text-gray-600 mb-4">Manage subscription plans and pricing</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-blue-600">Manage Plans</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
          
          {/* Top Up Plans Card - NEW */}
          <Link href="/admin/plans/top-up" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <h2 className="text-xl font-bold mb-2 text-gray-900">Top Up Plans</h2>
            <p className="text-gray-600 mb-4">Manage top-up plans and credit packages</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-purple-600">Manage Top-ups</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </Link>
          
          {/* API Plans Card - NEW */}
          <Link href="/admin/api-plans" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <h2 className="text-xl font-bold mb-2 text-gray-900">API Plans</h2>
            <p className="text-gray-600 mb-4">Manage API pricing plans and rate limits</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-green-600">Manage API Plans</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
          </Link>
          
          {/* Registered Drivers Card */}
          <Link href="/admin/drivers" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <h2 className="text-xl font-bold mb-2 text-gray-900">Registered Drivers</h2>
            <p className="text-gray-600 mb-4">View and manage driver accounts</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-blue-600">View Drivers</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
          
          {/* Support Tickets Card */}
          <Link href="/admin/tickets" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <h2 className="text-xl font-bold mb-2 text-gray-900">Support Tickets</h2>
            <p className="text-gray-600 mb-4">Manage customer support tickets</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-blue-600">View Tickets</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
          
          {/* Payment Records Card */}
          <Link href="/admin/payments" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <h2 className="text-xl font-bold mb-2 text-gray-900">Payment Records</h2>
            <p className="text-gray-600 mb-4">View and manage payment transactions</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-blue-600">View Payments</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
          
          {/* Settings Card */}
          <Link href="/admin/settings" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <h2 className="text-xl font-bold mb-2 text-gray-900">Settings</h2>
            <p className="text-gray-600 mb-4">Configure system settings and preferences</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-blue-600">Manage Settings</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
        
        {/* Quick Stats Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Quick Stats</h2>
          {dataError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6" role="alert">
              <p className="font-medium">Error</p>
              <p>{dataError}</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-gray-500 text-sm font-medium mb-1">Total Drivers</h3>
              <p className="text-3xl font-bold text-gray-900">{dashboardData?.totalDrivers || '0'}</p>
              <p className="text-green-600 text-sm mt-2">{dashboardData?.driverGrowth || '+0%'} from last month</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-gray-500 text-sm font-medium mb-1">Active Subscriptions</h3>
              <p className="text-3xl font-bold text-gray-900">{dashboardData?.activeSubscriptions || '0'}</p>
              <p className="text-green-600 text-sm mt-2">{dashboardData?.subscriptionGrowth || '+0%'} from last month</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-gray-500 text-sm font-medium mb-1">Open Tickets</h3>
              <p className="text-3xl font-bold text-gray-900">{dashboardData?.openTickets || '0'}</p>
              <p className={dashboardData?.ticketChange?.startsWith('+') ? "text-red-600 text-sm mt-2" : "text-green-600 text-sm mt-2"}>
                {dashboardData?.ticketChange || '+0'} from yesterday
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-gray-500 text-sm font-medium mb-1">Monthly Revenue</h3>
              <p className="text-3xl font-bold text-gray-900">₹{dashboardData?.monthlyRevenue || '0'}</p>
              <p className="text-green-600 text-sm mt-2">{dashboardData?.revenueGrowth || '+0%'} from last month</p>
            </div>
          </div>
        </div>
        
        {/* Recent Activity Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Recent Activity</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            {dashboardData?.recentActivity && dashboardData.recentActivity.length > 0 ? (
              <div className="overflow-x-auto">
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
                    {dashboardData.recentActivity.map((activity, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{activity.action}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.user}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            activity.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                            activity.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {activity.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-lg font-medium text-gray-900 mb-2">No recent activity</p>
                <p>{dataError ? 'Failed to load recent activity' : 'No recent activity to display'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}