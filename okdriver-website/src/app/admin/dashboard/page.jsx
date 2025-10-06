'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useFetch } from '@/components/FetchProviders';
import { AdminNotification } from '../../../components/dashboard/AdminNotification';  

// Drivers will be loaded from backend

// Ticket helpers
const statusBadge = (s) => {
  const map = {
    OPEN: 'bg-yellow-100 text-yellow-800',
    'IN PROGRESS': 'bg-blue-100 text-blue-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    CLOSED: 'bg-green-100 text-green-800'
  };
  return map[s] || 'bg-gray-100 text-gray-800';
};

// Plans will be fetched from backend

// Fleet companies loaded from backend
async function fetchFleetCompanies() {
  try {
    const res = await fetch('http://localhost:5000/api/admin/companies/list', { cache: 'no-store' });
    const json = await res.json();
    if (json?.ok && Array.isArray(json.data)) return json.data;
  } catch (e) { console.error('load companies failed', e); }
  return [];
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('drivers');
  const [planFilter, setPlanFilter] = useState('all');
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [plansError, setPlansError] = useState('');
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [companiesError, setCompaniesError] = useState('');
  const [payments, setPayments] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [paymentsError, setPaymentsError] = useState('');
  const [tickets, setTickets] = useState([]);
  const [ticketsError, setTicketsError] = useState('');
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [ticketModal, setTicketModal] = useState(null); // selected ticket
  const [adminResponse, setAdminResponse] = useState('');
  const [adminStatus, setAdminStatus] = useState('IN_PROGRESS');
  const [drivers, setDrivers] = useState([]);
  const [loadingDrivers, setLoadingDrivers] = useState(false);
  const [driversError, setDriversError] = useState('');
  const { fetchJson } = useFetch();

  useEffect(() => {
    const loadDrivers = async () => {
      setLoadingDrivers(true);
      setDriversError('');
      try {
        const { res, data } = await fetchJson('http://localhost:5000/api/admin/drivers', { cache: 'no-store' });
        if (!res.ok) throw new Error(data?.error || 'Failed to load drivers');
        setDrivers(Array.isArray(data?.data) ? data.data : []);
      } catch (e) {
        console.error(e);
        setDriversError(e.message);
      } finally {
        setLoadingDrivers(false);
      }
    };
    loadDrivers();
    const loadPlans = async () => {
      setLoadingPlans(true);
      setPlansError('');
      try {
        const [driverRes, companyRes] = await Promise.all([
          fetch('http://localhost:5000/api/admin/driverplan/driver-plans'),
          fetch('http://localhost:5000/api/admin/companyplan/list'),
        ]);
        const [driverJson, companyJson] = await Promise.all([
          driverRes.json().catch(() => ({ data: [] })),
          companyRes.json().catch(() => ({ data: [] })),
        ]);
        const driverPlans = Array.isArray(driverJson?.data)
          ? driverJson.data.map(p => ({
              id: `driver-${p.id}`,
              name: p.name,
              price: Number(p.price),
              description: p.description || '',
              billingCycle: typeof p.billingCycle === 'string' ? p.billingCycle : String(p.billingCycle),
              benefits: Array.isArray(p.benefits) ? p.benefits : [],
              includedServices: Array.isArray(p.services) ? p.services.map(s => s.name || String(s)) : [],
              subscribers: 0,
              status: p.isActive ? 'Active' : 'Inactive',
              planType: 'individual',
            }))
          : [];
        const companyPlans = Array.isArray(companyJson?.data)
          ? companyJson.data.map(p => ({
              id: `company-${p.id}`,
              name: p.name,
              price: Number(p.price),
              description: p.description || '',
              billingCycle: p.billingCycle || 'custom',
              benefits: Array.isArray(p.keyAdvantages) ? p.keyAdvantages : [],
              includedServices: Array.isArray(p.services) ? p.services.map(s => s.name || String(s)) : [],
              subscribers: 0,
              status: p.isActive ? 'Active' : 'Inactive',
              planType: 'company',
            }))
          : [];
        setPlans([...driverPlans, ...companyPlans]);
      } catch (err) {
        console.error(err);
        setPlansError('Failed to load plans');
      } finally {
        setLoadingPlans(false);
      }
    };
    loadPlans();
    const loadCompanies = async () => {
      setLoadingCompanies(true);
      setCompaniesError('');
      try {
        const data = await fetchFleetCompanies();
        setCompanies(data);
      } catch (e) {
        console.error(e);
        setCompaniesError('Failed to load companies');
      } finally {
        setLoadingCompanies(false);
      }
    };
    loadCompanies();
    const loadPayments = async () => {
      setLoadingPayments(true);
      setPaymentsError('');
      try {
        const res = await fetch('http://localhost:5000/api/admin/payment/company-transactions');
        const json = await res.json();
        setPayments(Array.isArray(json?.data) ? json.data : []);
      } catch (e) {
        console.error(e);
        setPaymentsError('Failed to load payments');
      } finally {
        setLoadingPayments(false);
      }
    };
    loadPayments();
    const loadTickets = async () => {
      setLoadingTickets(true);
      setTicketsError('');
      try {
        const headers = { 'Content-Type': 'application/json' };
        if (typeof window !== 'undefined' && localStorage.getItem('adminToken')) {
          headers.Authorization = `Bearer ${localStorage.getItem('adminToken')}`;
        }
        const res = await fetch('http://localhost:5000/api/admin/support/tickets', { headers });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || 'Failed to load tickets');
        const rows = Array.isArray(json?.data) ? json.data : [];
        setTickets(rows);
      } catch (e) {
        console.error(e);
        setTicketsError(e.message);
      } finally {
        setLoadingTickets(false);
      }
    };
    loadTickets();
  }, []);

  // Filter plans based on selected filter
  const filteredPlans = useMemo(() => {
    const base = planFilter === 'all' ? plans : plans.filter(p => p.planType === planFilter);
    return base;
  }, [planFilter, plans]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage drivers, subscriptions, and support tickets</p>
          </div>
          <div className="flex items-center space-x-4">
            <AdminNotification />
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
                <h2 className="text-xl font-semibold">Total Registered Drivers: {drivers.length}</h2>
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
                    {drivers.map((driver) => (
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
              {driversError && (<div className="mt-4 text-red-700 bg-red-100 border border-red-200 rounded p-3">{driversError}</div>)}
              {loadingDrivers && (<div className="mt-4 text-gray-600">Loading drivers...</div>)}
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

              {plansError && (
                <div className="mb-4 text-red-700 bg-red-100 border border-red-200 rounded p-3">{plansError}</div>
              )}
              {loadingPlans && (
                <div className="mb-4 text-gray-600">Loading plans...</div>
              )}
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
                        <span className="text-sm font-normal text-gray-500 ml-1">/
                          {String(plan.billingCycle).toLowerCase() === 'daily' ? 'day' :
                           String(plan.billingCycle).toLowerCase() === 'monthly' ? 'month' :
                           String(plan.billingCycle).toLowerCase() === 'quarterly' || String(plan.billingCycle).toLowerCase() === 'three_months' ? 'quarter' : 'year'}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500 capitalize">{String(plan.billingCycle).toLowerCase()} billing</p>
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
                    {companies.map((company) => (
                      <tr key={company.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{company.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{company.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.phone || '—'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.location || '—'}</td>
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
              {companiesError && (
                <div className="mt-4 text-red-700 bg-red-100 border border-red-200 rounded p-3">{companiesError}</div>
              )}
              {loadingCompanies && (
                <div className="mt-4 text-gray-600">Loading companies...</div>
              )}
            </div>
          )}

          {/* Support Tickets Tab */}
          {activeTab === 'tickets' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Support Tickets</h2>
                <div />
              </div>

              {ticketsError && (
                <div className="mb-4 text-red-700 bg-red-100 border border-red-200 rounded p-3">{ticketsError}</div>
              )}
              {loadingTickets && (
                <div className="mb-4 text-gray-600">Loading tickets...</div>
              )}

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
                    {tickets.map((t) => (
                      <tr key={t.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.subject}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusBadge(t.status)}`}>
                            {t.status === 'IN_PROGRESS' ? 'In Progress' : t.status.charAt(0) + t.status.slice(1).toLowerCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            t.priority === 'HIGH' ? 'bg-red-100 text-red-800' : t.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {t.priority.charAt(0) + t.priority.slice(1).toLowerCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(t.createdAt).toISOString().slice(0,10)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                          <button onClick={() => { setTicketModal(t); setAdminResponse(t.adminResponse || ''); setAdminStatus(t.status || 'IN_PROGRESS'); }} className="text-blue-600 hover:text-blue-800">View</button>
                          {t.status !== 'CLOSED' && (
                            <button onClick={async () => {
                              const headers = { 'Content-Type': 'application/json' };
                              if (typeof window !== 'undefined' && localStorage.getItem('adminToken')) headers.Authorization = `Bearer ${localStorage.getItem('adminToken')}`;
                              await fetch(`http://localhost:5000/api/admin/support/tickets/${t.id}`, { method: 'PUT', headers, body: JSON.stringify({ status: 'CLOSED' }) });
                              setTickets(prev => prev.map(x => x.id === t.id ? { ...x, status: 'CLOSED', resolvedAt: new Date().toISOString() } : x));
                            }} className="text-red-600 hover:text-red-800">Close</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {ticketModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Ticket #{ticketModal.id}</h3>
                      <button onClick={() => setTicketModal(null)} className="text-gray-500 hover:text-black">✕</button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-500">Subject</div>
                        <div className="text-gray-900 font-medium">{ticketModal.subject}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Description</div>
                        <div className="text-gray-800 whitespace-pre-wrap">{ticketModal.description}</div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm"><span className="text-gray-500 mr-1">Status:</span><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusBadge(adminStatus)}`}>{adminStatus === 'IN_PROGRESS' ? 'In Progress' : adminStatus.charAt(0) + adminStatus.slice(1).toLowerCase()}</span></div>
                        <select value={adminStatus} onChange={(e) => setAdminStatus(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm">
                          <option value="OPEN">Open</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="CLOSED">Closed</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Admin Response</label>
                        <textarea value={adminResponse} onChange={(e) => setAdminResponse(e.target.value)} rows={5} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Write your response or resolution steps..." />
                      </div>
                      <div className="flex justify-end space-x-3 pt-2">
                        <button onClick={() => setTicketModal(null)} className="px-4 py-2 rounded-lg border">Cancel</button>
                        <button onClick={async () => {
                          const headers = { 'Content-Type': 'application/json' };
                          if (typeof window !== 'undefined' && localStorage.getItem('adminToken')) headers.Authorization = `Bearer ${localStorage.getItem('adminToken')}`;
                          await fetch(`http://localhost:5000/api/admin/support/tickets/${ticketModal.id}`, { method: 'PUT', headers, body: JSON.stringify({ status: adminStatus, adminResponse }) });
                          setTickets(prev => prev.map(x => x.id === ticketModal.id ? { ...x, status: adminStatus, adminResponse, resolvedAt: adminStatus === 'CLOSED' ? new Date().toISOString() : x.resolvedAt } : x));
                          setTicketModal(null);
                        }} className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800">Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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

              {paymentsError && (
                <div className="mb-4 text-red-700 bg-red-100 border border-red-200 rounded p-3">{paymentsError}</div>
              )}
              {loadingPayments && (
                <div className="mb-4 text-gray-600">Loading payments...</div>
              )}
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
                    {payments.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.transactionId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">{p.plan}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{p.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(p.date).toISOString().slice(0,10)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${p.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link href={`/admin/fleet/${p.customerId}`} className="text-blue-600 hover:text-blue-800">View Details</Link>
                        </td>
                      </tr>
                    ))}
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