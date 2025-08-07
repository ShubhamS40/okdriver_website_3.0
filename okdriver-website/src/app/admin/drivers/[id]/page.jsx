'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

// Mock data for demonstration
const mockDrivers = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com', 
    phone: '+1 234-567-8901', 
    location: 'New York, NY',
    address: '123 Main St, New York, NY 10001',
    plan: 'Premium', 
    status: 'Active', 
    registeredDate: '2023-01-15', 
    lastActive: '2023-05-20',
    vehicleInfo: {
      make: 'Toyota',
      model: 'Camry',
      year: '2020',
      licensePlate: 'ABC-1234'
    },
    subscriptionDetails: {
      planName: 'Premium',
      startDate: '2023-01-15',
      renewalDate: '2023-06-15',
      amount: '$29.99',
      billingCycle: 'Monthly',
      paymentMethod: 'Credit Card (ending in 4567)',
      services: ['Drowsiness Monitoring System', 'Voice Assistant', 'SOS Alert', 'Advanced Analytics']
    },
    usageStats: {
      totalDrives: 142,
      totalHours: 215,
      alertsTriggered: 7,
      lastDriveDate: '2023-05-20'
    }
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    phone: '+1 234-567-8902', 
    location: 'Los Angeles, CA',
    address: '456 Ocean Ave, Los Angeles, CA 90001',
    plan: 'Basic', 
    status: 'Active', 
    registeredDate: '2023-02-10', 
    lastActive: '2023-05-19',
    vehicleInfo: {
      make: 'Honda',
      model: 'Civic',
      year: '2019',
      licensePlate: 'XYZ-7890'
    },
    subscriptionDetails: {
      planName: 'Basic',
      startDate: '2023-02-10',
      renewalDate: '2023-06-10',
      amount: '$9.99',
      billingCycle: 'Monthly',
      paymentMethod: 'PayPal',
      services: ['Drowsiness Monitoring System', 'Basic Analytics']
    },
    usageStats: {
      totalDrives: 87,
      totalHours: 132,
      alertsTriggered: 3,
      lastDriveDate: '2023-05-19'
    }
  },
  // Add more mock drivers as needed
];

// Mock payment history
const mockPaymentHistory = [
  { id: 1, driverId: 1, date: '2023-05-15', amount: '$29.99', status: 'Completed', method: 'Credit Card (ending in 4567)' },
  { id: 2, driverId: 1, date: '2023-04-15', amount: '$29.99', status: 'Completed', method: 'Credit Card (ending in 4567)' },
  { id: 3, driverId: 1, date: '2023-03-15', amount: '$29.99', status: 'Completed', method: 'Credit Card (ending in 4567)' },
  { id: 4, driverId: 2, date: '2023-05-10', amount: '$9.99', status: 'Completed', method: 'PayPal' },
  { id: 5, driverId: 2, date: '2023-04-10', amount: '$9.99', status: 'Completed', method: 'PayPal' },
];

export default function DriverDetails() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [driver, setDriver] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const driverId = parseInt(params.id);
    const driverData = mockDrivers.find(d => d.id === driverId);
    
    if (driverData) {
      setDriver(driverData);
      // Get payment history for this driver
      const driverPayments = mockPaymentHistory.filter(p => p.driverId === driverId);
      setPaymentHistory(driverPayments);
    } else {
      // Driver not found, redirect to drivers list
      router.push('/admin/drivers');
    }
  }, [params.id, router]);

  if (!driver) {
    return (
      <div className="container-custom py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link href="/admin/drivers" className="text-black hover:underline flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Drivers List
          </Link>
          <h1 className="text-3xl font-bold">Driver Details</h1>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            Edit Driver
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors">
            Delete Account
          </button>
        </div>
      </div>

      {/* Driver Status Banner */}
      <div className={`mb-6 p-4 rounded-lg ${driver.status === 'Active' ? 'bg-green-100' : 'bg-red-100'}`}>
        <div className="flex items-center">
          <div className={`h-3 w-3 rounded-full mr-2 ${driver.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="font-medium">
            {driver.status === 'Active' ? 'This driver account is currently active' : 'This driver account is currently inactive'}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('subscription')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'subscription' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Subscription Details
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'payments' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Payment History
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'usage' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Usage Statistics
          </button>
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{driver.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium">{driver.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium">{driver.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{driver.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Full Address</p>
                <p className="font-medium">{driver.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Registration Date</p>
                <p className="font-medium">{driver.registeredDate}</p>
              </div>
            </div>
          </div>

          {/* Subscription Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Subscription Summary</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Current Plan</p>
                <p className="font-medium">{driver.subscriptionDetails.planName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Billing Cycle</p>
                <p className="font-medium">{driver.subscriptionDetails.billingCycle}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Next Renewal</p>
                <p className="font-medium">{driver.subscriptionDetails.renewalDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-medium">{driver.subscriptionDetails.amount}</p>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('subscription')} 
              className="mt-4 w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              View Full Details
            </button>
          </div>

          {/* Vehicle Information */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
            <h2 className="text-xl font-semibold mb-4">Vehicle Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Make</p>
                <p className="font-medium">{driver.vehicleInfo.make}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Model</p>
                <p className="font-medium">{driver.vehicleInfo.model}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Year</p>
                <p className="font-medium">{driver.vehicleInfo.year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">License Plate</p>
                <p className="font-medium">{driver.vehicleInfo.licensePlate}</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-3 py-1">
                <p className="text-sm">Last active on {driver.lastActive}</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-3 py-1">
                <p className="text-sm">Completed {driver.usageStats.totalDrives} drives</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-3 py-1">
                <p className="text-sm">{driver.usageStats.alertsTriggered} drowsiness alerts triggered</p>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('usage')} 
              className="mt-4 w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              View Usage Statistics
            </button>
          </div>
        </div>
      )}

      {/* Subscription Details Tab */}
      {activeTab === 'subscription' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Current Plan */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
            <h2 className="text-xl font-semibold mb-4">Current Subscription Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Plan Name</p>
                <p className="font-medium">{driver.subscriptionDetails.planName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-medium">{driver.subscriptionDetails.amount} / {driver.subscriptionDetails.billingCycle}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium">{driver.subscriptionDetails.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Next Renewal</p>
                <p className="font-medium">{driver.subscriptionDetails.renewalDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">{driver.subscriptionDetails.paymentMethod}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium text-green-600">Active</p>
              </div>
            </div>

            <h3 className="font-semibold mb-2">Included Services</h3>
            <ul className="space-y-2 mb-6">
              {driver.subscriptionDetails.services.map((service, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  {service}
                </li>
              ))}
            </ul>

            <div className="flex space-x-3">
              <button className="btn-primary">
                Change Plan
              </button>
              <button className="btn-secondary">
                Update Payment Method
              </button>
            </div>
          </div>

          {/* Available Plans */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
            <div className="space-y-4">
              <div className={`border rounded-lg p-4 ${driver.subscriptionDetails.planName === 'Basic' ? 'border-black bg-gray-50' : ''}`}>
                <h3 className="font-bold">Basic</h3>
                <p className="text-lg mb-2">$9.99/month</p>
                <ul className="text-sm space-y-1 mb-3">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Drowsiness Monitoring System
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Basic Analytics
                  </li>
                </ul>
                {driver.subscriptionDetails.planName === 'Basic' ? (
                  <p className="text-sm font-medium">Current Plan</p>
                ) : (
                  <button className="text-sm text-black hover:text-gray-700 underline">Switch to Basic</button>
                )}
              </div>

              <div className={`border rounded-lg p-4 ${driver.subscriptionDetails.planName === 'Standard' ? 'border-black bg-gray-50' : ''}`}>
                <h3 className="font-bold">Standard</h3>
                <p className="text-lg mb-2">$19.99/month</p>
                <ul className="text-sm space-y-1 mb-3">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Drowsiness Monitoring System
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Voice Assistant
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Standard Analytics
                  </li>
                </ul>
                {driver.subscriptionDetails.planName === 'Standard' ? (
                  <p className="text-sm font-medium">Current Plan</p>
                ) : (
                  <button className="text-sm text-black hover:text-gray-700 underline">Switch to Standard</button>
                )}
              </div>

              <div className={`border rounded-lg p-4 ${driver.subscriptionDetails.planName === 'Premium' ? 'border-black bg-gray-50' : ''}`}>
                <h3 className="font-bold">Premium</h3>
                <p className="text-lg mb-2">$29.99/month</p>
                <ul className="text-sm space-y-1 mb-3">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Drowsiness Monitoring System
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Voice Assistant
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    SOS Alert
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Advanced Analytics
                  </li>
                </ul>
                {driver.subscriptionDetails.planName === 'Premium' ? (
                  <p className="text-sm font-medium">Current Plan</p>
                ) : (
                  <button className="text-sm text-black hover:text-gray-700 underline">Switch to Premium</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment History Tab */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Payment History</h2>
            <p className="text-gray-500">View all transactions for this driver</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentHistory.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      TX-{payment.id.toString().padStart(5, '0')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${payment.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {paymentHistory.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              No payment history available for this driver.
            </div>
          )}
        </div>
      )}

      {/* Usage Statistics Tab */}
      {activeTab === 'usage' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Usage Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-3">
            <h2 className="text-xl font-semibold mb-4">Usage Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-500 text-sm font-medium mb-1">Total Drives</h3>
                <p className="text-3xl font-bold">{driver.usageStats.totalDrives}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-500 text-sm font-medium mb-1">Total Hours</h3>
                <p className="text-3xl font-bold">{driver.usageStats.totalHours}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-500 text-sm font-medium mb-1">Alerts Triggered</h3>
                <p className="text-3xl font-bold">{driver.usageStats.alertsTriggered}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-500 text-sm font-medium mb-1">Last Drive</h3>
                <p className="text-3xl font-bold">{driver.usageStats.lastDriveDate}</p>
              </div>
            </div>
          </div>

          {/* Usage Graph Placeholder */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-3">
            <h2 className="text-xl font-semibold mb-4">Usage Over Time</h2>
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Usage graph would be displayed here</p>
            </div>
            <div className="mt-4 flex justify-end">
              <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Last Year</option>
              </select>
            </div>
          </div>

          {/* Alert Details */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-3">
            <h2 className="text-xl font-semibold mb-4">Alert Details</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Alert Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2023-05-18 14:23:45
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Drowsiness Detected
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      12 seconds
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Highway I-95, Mile 67
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2023-05-15 09:12:33
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        SOS Alert Triggered
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      N/A
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Main Street, Downtown
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2023-05-10 22:45:12
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Drowsiness Detected
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      8 seconds
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Route 27, Suburban Area
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}