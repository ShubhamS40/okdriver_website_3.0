'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data for demonstration
const mockDrivers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234-567-8901', location: 'New York, NY', plan: 'Premium', status: 'Active', registeredDate: '2023-01-15', lastActive: '2023-05-20' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234-567-8902', location: 'Los Angeles, CA', plan: 'Basic', status: 'Active', registeredDate: '2023-02-10', lastActive: '2023-05-19' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', phone: '+1 234-567-8903', location: 'Chicago, IL', plan: 'Premium', status: 'Inactive', registeredDate: '2023-01-20', lastActive: '2023-04-15' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', phone: '+1 234-567-8904', location: 'Houston, TX', plan: 'Standard', status: 'Active', registeredDate: '2023-03-05', lastActive: '2023-05-18' },
  { id: 5, name: 'Michael Wilson', email: 'michael@example.com', phone: '+1 234-567-8905', location: 'Phoenix, AZ', plan: 'Basic', status: 'Active', registeredDate: '2023-03-15', lastActive: '2023-05-17' },
];

// Mock data for deleted drivers
const mockDeletedDrivers = [
  { id: 6, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1 234-567-8906', location: 'Miami, FL', plan: 'Premium', deletedDate: '2023-04-10', reason: 'Account closed by user' },
  { id: 7, name: 'David Brown', email: 'david@example.com', phone: '+1 234-567-8907', location: 'Seattle, WA', plan: 'Standard', deletedDate: '2023-04-15', reason: 'Violation of terms' },
  { id: 8, name: 'Lisa Miller', email: 'lisa@example.com', phone: '+1 234-567-8908', location: 'Denver, CO', plan: 'Basic', deletedDate: '2023-04-20', reason: 'Account closed by user' },
];

export default function DriversManagement() {
  const [activeTab, setActiveTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter drivers based on search term
  const filteredActiveDrivers = mockDrivers.filter(driver => 
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDeletedDrivers = mockDeletedDrivers.filter(driver => 
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Drivers Management</h1>
        <Link href="/admin" className="btn-secondary">
          Back to Admin Panel
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by name, email, or location..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="flex gap-2">
          <button className="btn-primary text-sm py-1">
            Add New Driver
          </button>
          <button className="btn-secondary text-sm py-1">
            Export List
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('active')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'active' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Active Drivers ({mockDrivers.length})
          </button>
          <button
            onClick={() => setActiveTab('deleted')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'deleted' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Deleted Accounts ({mockDeletedDrivers.length})
          </button>
        </nav>
      </div>

      {/* Active Drivers Tab */}
      {activeTab === 'active' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                    Location
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
                {filteredActiveDrivers.map((driver) => (
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
                      {driver.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {driver.plan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${driver.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {driver.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link href={`/admin/drivers/${driver.id}`} className="text-black hover:text-gray-700 mr-3">
                        View
                      </Link>
                      <button className="text-black hover:text-gray-700 mr-3">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredActiveDrivers.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              No drivers found matching your search criteria.
            </div>
          )}
        </div>
      )}

      {/* Deleted Drivers Tab */}
      {activeTab === 'deleted' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Previous Plan
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deleted Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDeletedDrivers.map((driver) => (
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
                      {driver.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {driver.plan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {driver.deletedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {driver.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-green-600 hover:text-green-800 mr-3">
                        Restore
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        Permanently Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredDeletedDrivers.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              No deleted accounts found matching your search criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
}