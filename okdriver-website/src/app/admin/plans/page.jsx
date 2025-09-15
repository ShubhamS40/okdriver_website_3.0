'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

export default function SubscriptionPlans() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      setError('');
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
          ? driverJson.data.map((p) => ({
              id: `driver-${p.id}`,
              name: p.name,
              price: Number(p.price),
              billingCycle: typeof p.billingCycle === 'string' ? p.billingCycle : String(p.billingCycle),
              description: p.description || '',
              benefits: Array.isArray(p.benefits) ? p.benefits : [],
              services: Array.isArray(p.services) ? p.services.map((s) => s.name || String(s)) : [],
              status: p.isActive ? 'active' : 'inactive',
              planType: 'Individual',
              subscribers: 0,
            }))
          : [];

        const companyPlans = Array.isArray(companyJson?.data)
          ? companyJson.data
              .filter((p) => p.planType === 'SUBSCRIPTION') // Only show SUBSCRIPTION type plans
              .map((p) => ({
                id: `company-${p.id}`,
                name: p.name,
                price: Number(p.price),
                billingCycle: p.billingCycle || 'custom',
                description: p.description || '',
                benefits: Array.isArray(p.keyAdvantages) ? p.keyAdvantages : [],
                services: Array.isArray(p.services) ? p.services.map((s) => s.name || String(s)) : [],
                status: p.isActive ? 'active' : 'inactive',
                planType: 'Fleet Company',
                subscribers: 0,
              }))
          : [];

        setPlans([...driverPlans, ...companyPlans]);
      } catch (err) {
        console.error(err);
        setError('Failed to load plans');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const filteredPlans = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return plans.filter((plan) => {
      // Only show Fleet Company and Individual Driver plans
      const isValidPlanType = plan.planType === 'Fleet Company' || plan.planType === 'Individual';
      
      const matchesSearch =
        plan.name.toLowerCase().includes(term) ||
        plan.description.toLowerCase().includes(term);
      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'active' && plan.status === 'active') ||
        (activeTab === 'inactive' && plan.status === 'inactive');
      
      return isValidPlanType && matchesSearch && matchesTab;
    });
  }, [plans, searchTerm, activeTab]);

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
          <p className="text-gray-600">Manage Fleet Company and Individual Driver subscription plans</p>
        </div>
        <Link href="/admin/plans/create" className="btn-primary">
          Create New Plan
        </Link>
      </div>

      {/* Plan Type Filter */}
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

      {/* Plan Types Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Individual Driver Plans</h3>
          <p className="text-blue-600 text-sm">
            Plans designed for individual drivers - {filteredPlans.filter(p => p.planType === 'Individual').length} plans available
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Fleet Company Plans</h3>
          <p className="text-green-600 text-sm">
            Plans designed for fleet companies - {filteredPlans.filter(p => p.planType === 'Fleet Company').length} plans available
          </p>
        </div>
      </div>

      {/* Plans Grid */}
      {loading && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">Loading plans...</div>
      )}

      {error && !loading && (
        <div className="bg-red-100 text-red-800 rounded-lg shadow-md p-4 mb-6">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">{plan.name}</h2>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                    plan.planType === 'Individual' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {plan.planType}
                  </span>
                </div>
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
                  {plan.services.map((srv, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">{srv}</span>
                  ))}
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
      
      {filteredPlans.length === 0 && !loading && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No plans found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search terms.' : 'No Fleet Company or Individual Driver plans available.'}
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