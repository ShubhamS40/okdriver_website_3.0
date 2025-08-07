'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data for demonstration
const mockFleetCompanies = [
  { 
    id: 1, 
    name: 'City Express Logistics', 
    email: 'contact@cityexpress.com', 
    phone: '+1 234-567-8910', 
    location: 'New York, NY',
    totalDrivers: 48,
    activeDrivers: 42,
    plan: 'Enterprise',
    status: 'Active',
    registeredDate: '2023-01-10'
  },
  { 
    id: 2, 
    name: 'FastTrack Delivery', 
    email: 'info@fasttrackdelivery.com', 
    phone: '+1 234-567-8911', 
    location: 'Chicago, IL',
    totalDrivers: 35,
    activeDrivers: 30,
    plan: 'Enterprise',
    status: 'Active',
    registeredDate: '2023-02-15'
  },
  { 
    id: 3, 
    name: 'Metro Cab Services', 
    email: 'support@metrocab.com', 
    phone: '+1 234-567-8912', 
    location: 'Boston, MA',
    totalDrivers: 72,
    activeDrivers: 65,
    plan: 'Enterprise Plus',
    status: 'Active',
    registeredDate: '2023-01-22'
  },
  { 
    id: 4, 
    name: 'Golden State Transport', 
    email: 'contact@gstransport.com', 
    phone: '+1 234-567-8913', 
    location: 'San Francisco, CA',
    totalDrivers: 28,
    activeDrivers: 25,
    plan: 'Enterprise',
    status: 'Inactive',
    registeredDate: '2023-03-05'
  },
  { 
    id: 5, 
    name: 'Sunshine Delivery Co.', 
    email: 'info@sunshinedelivery.com', 
    phone: '+1 234-567-8914', 
    location: 'Miami, FL',
    totalDrivers: 54,
    activeDrivers: 50,
    plan: 'Enterprise Plus',
    status: 'Active',
    registeredDate: '2023-02-28'
  },
];

// Mock data for deleted fleet companies
const mockDeletedFleetCompanies = [
  { 
    id: 6, 
    name: 'Rapid Transit LLC', 
    email: 'info@rapidtransit.com', 
    phone: '+1 234-567-8915', 
    location: 'Dallas, TX',
    totalDrivers: 22,
    plan: 'Enterprise',
    deletedDate: '2023-04-15',
    reason: 'Company closed operations'
  },
  { 
    id: 7, 
    name: 'Urban Movers Inc.', 
    email: 'contact@urbanmovers.com', 
    phone: '+1 234-567-8916', 
    location: 'Seattle, WA',
    totalDrivers: 18,
    plan: 'Enterprise',
    deletedDate: '2023-04-20',
    reason: 'Switched to different service provider'
  },
];

export default function FleetManagement() {
  const [activeTab, setActiveTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter fleet companies based on search term
  const filteredActiveFleets = mockFleetCompanies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDeletedFleets = mockDeletedFleetCompanies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Fleet Companies Management</h1>
        <Link href="/admin" className="btn-secondary">
          Back to Admin Panel
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by company name, email, or location..."
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
            Add New Fleet Company
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
            Active Fleet Companies ({mockFleetCompanies.length})
          </button>
          <button
            onClick={() => setActiveTab('deleted')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'deleted' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Deleted Companies ({mockDeletedFleetCompanies.length})
          </button>
        </nav>
      </div>

      {/* Active Fleet Companies Tab */}
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
                    Company Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Drivers
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
                {filteredActiveFleets.map((company) => (
                  <tr key={company.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {company.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        <p className="font-medium">{company.name}</p>
                        <p className="text-xs">{company.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {company.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        <p>{company.totalDrivers} total</p>
                        <p className="text-xs text-green-600">{company.activeDrivers} active</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {company.plan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${company.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {company.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link href={`/admin/fleet/${company.id}`} className="text-black hover:text-gray-700 mr-3">
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
          {filteredActiveFleets.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              No fleet companies found matching your search criteria.
            </div>
          )}
        </div>
      )}

      {/* Deleted Fleet Companies Tab */}
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
                    Company Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Previous Drivers
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
                {filteredDeletedFleets.map((company) => (
                  <tr key={company.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {company.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        <p className="font-medium">{company.name}</p>
                        <p className="text-xs">{company.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {company.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {company.totalDrivers}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {company.plan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {company.deletedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {company.reason}
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
          {filteredDeletedFleets.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              No deleted fleet companies found matching your search criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
}