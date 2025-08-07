'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

// Mock data for demonstration
const mockFleetCompanies = [
  { 
    id: 1, 
    name: 'City Express Logistics', 
    email: 'contact@cityexpress.com', 
    phone: '+1 234-567-8910', 
    location: 'New York, NY',
    address: '123 Logistics Way, New York, NY 10001',
    website: 'www.cityexpresslogistics.com',
    contactPerson: 'Michael Johnson',
    contactPersonRole: 'Fleet Manager',
    contactPersonEmail: 'michael@cityexpress.com',
    contactPersonPhone: '+1 234-567-8920',
    totalDrivers: 48,
    activeDrivers: 42,
    plan: 'Enterprise',
    status: 'Active',
    registeredDate: '2023-01-10',
    subscriptionDetails: {
      planName: 'Enterprise',
      startDate: '2023-01-10',
      renewalDate: '2023-07-10',
      amount: '$499.99',
      billingCycle: 'Monthly',
      paymentMethod: 'Corporate Credit Card (ending in 3456)',
      services: ['Drowsiness Monitoring System', 'Voice Assistant', 'SOS Alert', 'Advanced Analytics', 'Fleet Management Dashboard', 'API Integration']
    },
    fleetStats: {
      totalTrips: 4250,
      totalHours: 12480,
      alertsTriggered: 87,
      lastActivityDate: '2023-05-20',
      avgDailyActiveDrivers: 38
    },
    vehicles: [
      { type: 'Delivery Van', count: 28 },
      { type: 'Box Truck', count: 12 },
      { type: 'Sedan', count: 8 }
    ]
  },
  { 
    id: 2, 
    name: 'FastTrack Delivery', 
    email: 'info@fasttrackdelivery.com', 
    phone: '+1 234-567-8911', 
    location: 'Chicago, IL',
    address: '456 Delivery Blvd, Chicago, IL 60601',
    website: 'www.fasttrackdelivery.com',
    contactPerson: 'Sarah Williams',
    contactPersonRole: 'Operations Director',
    contactPersonEmail: 'sarah@fasttrackdelivery.com',
    contactPersonPhone: '+1 234-567-8921',
    totalDrivers: 35,
    activeDrivers: 30,
    plan: 'Enterprise',
    status: 'Active',
    registeredDate: '2023-02-15',
    subscriptionDetails: {
      planName: 'Enterprise',
      startDate: '2023-02-15',
      renewalDate: '2023-08-15',
      amount: '$499.99',
      billingCycle: 'Monthly',
      paymentMethod: 'Corporate Credit Card (ending in 7890)',
      services: ['Drowsiness Monitoring System', 'Voice Assistant', 'SOS Alert', 'Advanced Analytics', 'Fleet Management Dashboard']
    },
    fleetStats: {
      totalTrips: 3120,
      totalHours: 9360,
      alertsTriggered: 62,
      lastActivityDate: '2023-05-19',
      avgDailyActiveDrivers: 28
    },
    vehicles: [
      { type: 'Delivery Van', count: 20 },
      { type: 'Box Truck', count: 8 },
      { type: 'Sedan', count: 7 }
    ]
  },
  // Add more mock fleet companies as needed
];

// Mock payment history
const mockPaymentHistory = [
  { id: 1, fleetId: 1, date: '2023-05-10', amount: '$499.99', status: 'Completed', method: 'Corporate Credit Card (ending in 3456)' },
  { id: 2, fleetId: 1, date: '2023-04-10', amount: '$499.99', status: 'Completed', method: 'Corporate Credit Card (ending in 3456)' },
  { id: 3, fleetId: 1, date: '2023-03-10', amount: '$499.99', status: 'Completed', method: 'Corporate Credit Card (ending in 3456)' },
  { id: 4, fleetId: 2, date: '2023-05-15', amount: '$499.99', status: 'Completed', method: 'Corporate Credit Card (ending in 7890)' },
  { id: 5, fleetId: 2, date: '2023-04-15', amount: '$499.99', status: 'Completed', method: 'Corporate Credit Card (ending in 7890)' },
];

// Mock drivers for the fleet
const mockFleetDrivers = [
  { id: 101, fleetId: 1, name: 'John Smith', email: 'john@cityexpress.com', phone: '+1 234-567-1001', status: 'Active', lastActive: '2023-05-20' },
  { id: 102, fleetId: 1, name: 'Emma Davis', email: 'emma@cityexpress.com', phone: '+1 234-567-1002', status: 'Active', lastActive: '2023-05-19' },
  { id: 103, fleetId: 1, name: 'Robert Wilson', email: 'robert@cityexpress.com', phone: '+1 234-567-1003', status: 'Inactive', lastActive: '2023-05-10' },
  { id: 104, fleetId: 1, name: 'Lisa Brown', email: 'lisa@cityexpress.com', phone: '+1 234-567-1004', status: 'Active', lastActive: '2023-05-20' },
  { id: 105, fleetId: 1, name: 'David Miller', email: 'david@cityexpress.com', phone: '+1 234-567-1005', status: 'Active', lastActive: '2023-05-18' },
  { id: 201, fleetId: 2, name: 'Jennifer Lee', email: 'jennifer@fasttrackdelivery.com', phone: '+1 234-567-2001', status: 'Active', lastActive: '2023-05-19' },
  { id: 202, fleetId: 2, name: 'Michael Chen', email: 'michael@fasttrackdelivery.com', phone: '+1 234-567-2002', status: 'Active', lastActive: '2023-05-18' },
];

export default function FleetDetails() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [fleet, setFleet] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [fleetDrivers, setFleetDrivers] = useState([]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fleetId = parseInt(params.id);
    const fleetData = mockFleetCompanies.find(f => f.id === fleetId);
    
    if (fleetData) {
      setFleet(fleetData);
      // Get payment history for this fleet
      const fleetPayments = mockPaymentHistory.filter(p => p.fleetId === fleetId);
      setPaymentHistory(fleetPayments);
      // Get drivers for this fleet
      const drivers = mockFleetDrivers.filter(d => d.fleetId === fleetId);
      setFleetDrivers(drivers);
    } else {
      // Fleet not found, redirect to fleet list
      router.push('/admin/fleet');
    }
  }, [params.id, router]);

  if (!fleet) {
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
          <Link href="/admin/fleet" className="text-black hover:underline flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Fleet Companies
          </Link>
          <h1 className="text-3xl font-bold">Fleet Company Details</h1>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            Edit Company
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors">
            Delete Company
          </button>
        </div>
      </div>

      {/* Fleet Status Banner */}
      <div className={`mb-6 p-4 rounded-lg ${fleet.status === 'Active' ? 'bg-green-100' : 'bg-red-100'}`}>
        <div className="flex items-center">
          <div className={`h-3 w-3 rounded-full mr-2 ${fleet.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="font-medium">
            {fleet.status === 'Active' ? 'This fleet company account is currently active' : 'This fleet company account is currently inactive'}
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
            onClick={() => setActiveTab('drivers')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'drivers' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Drivers ({fleetDrivers.length})
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
          {/* Company Information */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
            <h2 className="text-xl font-semibold mb-4">Company Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Company Name</p>
                <p className="font-medium">{fleet.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium">{fleet.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium">{fleet.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Website</p>
                <p className="font-medium">{fleet.website}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{fleet.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Full Address</p>
                <p className="font-medium">{fleet.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Registration Date</p>
                <p className="font-medium">{fleet.registeredDate}</p>
              </div>
            </div>
          </div>

          {/* Subscription Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Subscription Summary</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Current Plan</p>
                <p className="font-medium">{fleet.subscriptionDetails.planName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Billing Cycle</p>
                <p className="font-medium">{fleet.subscriptionDetails.billingCycle}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Next Renewal</p>
                <p className="font-medium">{fleet.subscriptionDetails.renewalDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-medium">{fleet.subscriptionDetails.amount}</p>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('subscription')} 
              className="mt-4 w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              View Full Details
            </button>
          </div>

          {/* Contact Person */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
            <h2 className="text-xl font-semibold mb-4">Primary Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Contact Person</p>
                <p className="font-medium">{fleet.contactPerson}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium">{fleet.contactPersonRole}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{fleet.contactPersonEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{fleet.contactPersonPhone}</p>
              </div>
            </div>
          </div>

          {/* Fleet Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Fleet Summary</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Total Drivers</p>
                <p className="font-medium">{fleet.totalDrivers}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Drivers</p>
                <p className="font-medium text-green-600">{fleet.activeDrivers}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Vehicle Types</p>
                <div className="mt-1">
                  {fleet.vehicles.map((vehicle, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{vehicle.type}:</span>
                      <span className="font-medium">{vehicle.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('drivers')} 
              className="mt-4 w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              View All Drivers
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
                <p className="font-medium">{fleet.subscriptionDetails.planName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-medium">{fleet.subscriptionDetails.amount} / {fleet.subscriptionDetails.billingCycle}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium">{fleet.subscriptionDetails.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Next Renewal</p>
                <p className="font-medium">{fleet.subscriptionDetails.renewalDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">{fleet.subscriptionDetails.paymentMethod}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium text-green-600">Active</p>
              </div>
            </div>

            <h3 className="font-semibold mb-2">Included Services</h3>
            <ul className="space-y-2 mb-6">
              {fleet.subscriptionDetails.services.map((service, index) => (
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
              <div className={`border rounded-lg p-4 ${fleet.subscriptionDetails.planName === 'Enterprise' ? 'border-black bg-gray-50' : ''}`}>
                <h3 className="font-bold">Enterprise</h3>
                <p className="text-lg mb-2">$499.99/month</p>
                <ul className="text-sm space-y-1 mb-3">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Up to 50 drivers
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    All driver safety features
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Fleet management dashboard
                  </li>
                </ul>
                {fleet.subscriptionDetails.planName === 'Enterprise' ? (
                  <p className="text-sm font-medium">Current Plan</p>
                ) : (
                  <button className="text-sm text-black hover:text-gray-700 underline">Switch to Enterprise</button>
                )}
              </div>

              <div className={`border rounded-lg p-4 ${fleet.subscriptionDetails.planName === 'Enterprise Plus' ? 'border-black bg-gray-50' : ''}`}>
                <h3 className="font-bold">Enterprise Plus</h3>
                <p className="text-lg mb-2">$799.99/month</p>
                <ul className="text-sm space-y-1 mb-3">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Unlimited drivers
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    All driver safety features
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Advanced fleet management
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    API Integration
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Priority support
                  </li>
                </ul>
                {fleet.subscriptionDetails.planName === 'Enterprise Plus' ? (
                  <p className="text-sm font-medium">Current Plan</p>
                ) : (
                  <button className="text-sm text-black hover:text-gray-700 underline">Switch to Enterprise Plus</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Drivers Tab */}
      {activeTab === 'drivers' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Fleet Drivers</h2>
              <p className="text-gray-500">Manage drivers associated with this fleet</p>
            </div>
            <div className="flex space-x-3">
              <button className="btn-primary text-sm py-1">
                Add Driver
              </button>
              <button className="btn-secondary text-sm py-1">
                Export List
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fleetDrivers.map((driver) => (
                  <tr key={driver.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {driver.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {driver.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {driver.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {driver.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${driver.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {driver.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {driver.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link href={`/admin/drivers/${driver.id}`} className="text-black hover:text-gray-700 mr-3">
                        View
                      </Link>
                      <button className="text-black hover:text-gray-700 mr-3">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {fleetDrivers.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              No drivers found for this fleet company.
            </div>
          )}
        </div>
      )}

      {/* Payment History Tab */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Payment History</h2>
            <p className="text-gray-500">View all transactions for this fleet company</p>
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
              No payment history available for this fleet company.
            </div>
          )}
        </div>
      )}

      {/* Usage Statistics Tab */}
      {activeTab === 'usage' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Usage Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-3">
            <h2 className="text-xl font-semibold mb-4">Fleet Usage Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-500 text-sm font-medium mb-1">Total Trips</h3>
                <p className="text-3xl font-bold">{fleet.fleetStats.totalTrips}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-500 text-sm font-medium mb-1">Total Hours</h3>
                <p className="text-3xl font-bold">{fleet.fleetStats.totalHours}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-500 text-sm font-medium mb-1">Alerts Triggered</h3>
                <p className="text-3xl font-bold">{fleet.fleetStats.alertsTriggered}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-500 text-sm font-medium mb-1">Last Activity</h3>
                <p className="text-3xl font-bold">{fleet.fleetStats.lastActivityDate}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-500 text-sm font-medium mb-1">Avg. Daily Active</h3>
                <p className="text-3xl font-bold">{fleet.fleetStats.avgDailyActiveDrivers}</p>
              </div>
            </div>
          </div>

          {/* Usage Graph Placeholder */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-3">
            <h2 className="text-xl font-semibold mb-4">Fleet Activity Over Time</h2>
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Fleet activity graph would be displayed here</p>
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

          {/* Driver Activity */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-3">
            <h2 className="text-xl font-semibold mb-4">Driver Activity</h2>
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Driver activity breakdown would be displayed here</p>
            </div>
          </div>

          {/* Alert Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-3">
            <h2 className="text-xl font-semibold mb-4">Alert Distribution</h2>
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Alert distribution chart would be displayed here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}