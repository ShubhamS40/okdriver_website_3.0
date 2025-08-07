'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data for drivers
const mockDrivers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+91 9876543210', location: 'Mumbai', status: 'Active', registrationDate: '2023-05-01' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+91 9876543211', location: 'Delhi', status: 'Active', registrationDate: '2023-05-02' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', phone: '+91 9876543212', location: 'Bangalore', status: 'Inactive', registrationDate: '2023-05-03' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', phone: '+91 9876543213', location: 'Chennai', status: 'Active', registrationDate: '2023-05-04' },
  { id: 5, name: 'Michael Wilson', email: 'michael@example.com', phone: '+91 9876543214', location: 'Hyderabad', status: 'Active', registrationDate: '2023-05-05' },
];

// Mock data for support tickets
const mockTickets = [
  { id: 'T-1001', subject: 'App not working', status: 'Open', priority: 'High', date: '2023-05-10' },
  { id: 'T-1002', subject: 'Payment issue', status: 'In Progress', priority: 'Medium', date: '2023-05-09' },
  { id: 'T-1003', subject: 'Feature request', status: 'Open', priority: 'Low', date: '2023-05-08' },
  { id: 'T-1004', subject: 'Account access', status: 'Closed', priority: 'High', date: '2023-05-07' },
  { id: 'T-1005', subject: 'Subscription question', status: 'Open', priority: 'Medium', date: '2023-05-06' },
];

// Mock data for subscription plans
const mockPlans = [
  { id: 1, name: 'Basic', price: 499, features: '24/7 Support, Basic Monitoring', subscribers: 25, status: 'Active', billingCycle: 'Monthly', description: 'Perfect for individual drivers', benefits: ['24/7 Customer Support', 'Basic Monitoring Features', 'Monthly Reports'], includedServices: ['Drowsiness Monitoring'] },
  { id: 2, name: 'Premium', price: 999, features: '24/7 Support, Advanced Monitoring, Voice Assistant', subscribers: 42, status: 'Active', billingCycle: 'Monthly', description: 'Ideal for professional drivers', benefits: ['24/7 Priority Support', 'Advanced Monitoring Features', 'Weekly Reports', 'Performance Analytics'], includedServices: ['Drowsiness Monitoring', 'Voice Assistant'] },
  { id: 3, name: 'Enterprise', price: 1999, features: 'All Features, Priority Support, Custom Integration', subscribers: 18, status: 'Active', billingCycle: 'Monthly', description: 'Best for fleet companies', benefits: ['24/7 Dedicated Support', 'All Monitoring Features', 'Daily Reports', 'Advanced Analytics', 'Custom Integration'], includedServices: ['Drowsiness Monitoring', 'Voice Assistant', 'SOS Alert'] },
  { id: 4, name: 'Summer Special', price: 799, features: '24/7 Support, Basic Monitoring, Limited Time Offer', subscribers: 10, status: 'Inactive', billingCycle: 'Quarterly', description: 'Limited time offer with special pricing', benefits: ['24/7 Customer Support', 'Basic Monitoring Features', 'Monthly Reports', 'Seasonal Discount'], includedServices: ['Drowsiness Monitoring', 'SOS Alert'] },
  { id: 5, name: 'Day Pass', price: 9.99, features: '24-hour Access, Basic Monitoring, SOS Alert', subscribers: 56, status: 'Active', billingCycle: 'Daily', description: 'Pay-as-you-go option for occasional drivers', benefits: ['24-hour Drowsiness Monitoring', 'Basic Voice Assistant', 'SOS Alert System', 'Email Support'], includedServices: ['Drowsiness Monitoring', 'SOS Alert'] },
];

// Mock data for fleet companies
const mockFleetCompanies = [
  { id: 1, name: 'Speedy Logistics', email: 'contact@speedylogistics.com', phone: '+91 9876543220', location: 'Mumbai', status: 'Active', registrationDate: '2023-04-01', driversCount: 25, plan: 'Enterprise' },
  { id: 2, name: 'City Movers', email: 'info@citymovers.com', phone: '+91 9876543221', location: 'Delhi', status: 'Active', registrationDate: '2023-04-15', driversCount: 18, plan: 'Enterprise' },
  { id: 3, name: 'Express Delivery', email: 'support@expressdelivery.com', phone: '+91 9876543222', location: 'Bangalore', status: 'Inactive', registrationDate: '2023-05-01', driversCount: 12, plan: 'Premium' },
  { id: 4, name: 'Safe Ride Co.', email: 'hello@saferide.com', phone: '+91 9876543223', location: 'Chennai', status: 'Active', registrationDate: '2023-05-10', driversCount: 30, plan: 'Enterprise' },
  { id: 5, name: 'Metro Transport', email: 'contact@metrotransport.com', phone: '+91 9876543224', location: 'Hyderabad', status: 'Active', registrationDate: '2023-05-20', driversCount: 22, plan: 'Premium' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('drivers');

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Manage drivers, subscriptions, and support tickets</p>
        </div>
        <div className="flex space-x-4">
          <div className="relative group">
            <button className="btn-secondary flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
              <Link href="/admin/drivers/create" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Add Driver</Link>
              <Link href="/admin/plans/create" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Create Plan</Link>
              <Link href="/admin/fleet/create" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Add Fleet Company</Link>
            </div>
          </div>
          <button className="btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Data
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('drivers')}
              className={`${activeTab === 'drivers' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Registered Drivers
            </button>
            <button
              onClick={() => setActiveTab('plans')}
              className={`${activeTab === 'plans' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Subscription Plans
            </button>
            <button
              onClick={() => setActiveTab('fleet')}
              className={`${activeTab === 'fleet' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Fleet Companies
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`${activeTab === 'tickets' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Support Tickets
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`${activeTab === 'payments' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Payment Records
            </button>
          </nav>
        </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Drivers Tab */}
        {activeTab === 'drivers' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Total Registered Drivers: {mockDrivers.length}</h2>
              <div className="flex space-x-4">
                <button className="btn-secondary text-sm py-1">
                  Export List
                </button>
                <button className="btn-primary text-sm py-1">
                  Add New Driver
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
                      Plan
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockDrivers.map((driver) => (
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
                        {driver.plan || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${driver.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {driver.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link href={`/admin/drivers/${driver.id}`} className="text-black hover:text-gray-700 mr-3">View</Link>
                        <button className="text-black hover:text-gray-700 mr-3">Edit</button>
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
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <div className="absolute left-3 top-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <select className="border border-gray-300 rounded-md px-3 py-2">
                  <option>All Plans</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="flex space-x-4">
                <Link href="/admin/plans" className="btn-primary text-sm py-1 px-4 inline-flex items-center">
                  Manage Plans
                </Link>
                <Link href="/admin/plans/create" className="btn-secondary text-sm py-1 px-4 inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Plan
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockPlans.map((plan) => (
                <div key={plan.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold">{plan.name}</h3>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${plan.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {plan.status}
                    </span>
                  </div>
                  <p className="text-xl font-bold mb-2">₹{plan.price}{plan.billingCycle === 'Daily' ? '/day' : plan.billingCycle === 'Monthly' ? '/month' : plan.billingCycle === 'Quarterly' ? '/quarter' : '/year'}</p>
                  <p className="text-gray-600 mb-4">{plan.billingCycle} billing</p>
                  <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Included Services:</h4>
                    <div className="flex flex-wrap gap-2">
                      {plan.includedServices.map((service, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{service}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-500">{plan.subscribers} subscribers</div>
                    <Link href={`/admin/plans/${plan.id}`} className="text-black hover:text-gray-700 font-medium text-sm">
                      View Details →
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
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <div className="absolute left-3 top-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <select className="border border-gray-300 rounded-md px-3 py-2">
                  <option>All Companies</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="flex space-x-4">
                <Link href="/admin/fleet" className="btn-primary text-sm py-1 px-4 inline-flex items-center">
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
                    <tr key={company.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{company.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.driversCount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.plan}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${company.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {company.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link href={`/admin/fleet/${company.id}`} className="text-black hover:text-gray-700 mr-3">View</Link>
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
              <button className="btn-primary text-sm py-1">
                Create Ticket
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockTickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {ticket.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket.subject}
                      </td>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-black hover:text-gray-700 mr-3">View</button>
                        <button className="text-black hover:text-gray-700 mr-3">Reply</button>
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
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                  <option>All Time</option>
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>Last 3 Months</option>
                </select>
                <button className="btn-secondary text-sm py-1">
                  Export Report
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
                <p className="text-3xl font-bold">$12,450.00</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">This Month</h3>
                <p className="text-3xl font-bold">$2,850.00</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Active Subscriptions</h3>
                <p className="text-3xl font-bold">42</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Driver
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      TX-12345
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      John Doe
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Premium
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      $29.99
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2023-05-15
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      TX-12344
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Jane Smith
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Basic
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      $9.99
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2023-05-14
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      TX-12343
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Robert Johnson
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Premium
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      $29.99
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2023-05-10
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Failed
                      </span>
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
  );
}