"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function TopUpPlans() {
  const [vehicleLimitPlans, setVehicleLimitPlans] = useState([]);
  const [clientLimitPlans, setClientLimitPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('all'); // 'all', 'vehicle', 'client'
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all'); // 'all', 'low', 'medium', 'high'
  const [sortBy, setSortBy] = useState('name'); // 'name', 'price', 'limit'

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch vehicle limit plans
      const vehicleResponse = await fetch('https://backend.okdriver.in/api/admin/company/top-up-plan/vehicle-limit/vehicle-limit-plans');
      if (!vehicleResponse.ok) {
        throw new Error('Failed to fetch vehicle limit plans');
      }
      const vehicleData = await vehicleResponse.json();
      
      // Fetch client limit plans
      const clientResponse = await fetch('https://backend.okdriver.in/api/admin/company/top-up-plan/client-limit/client-limit-plans');
      if (!clientResponse.ok) {
        throw new Error('Failed to fetch client limit plans');
      }
      const clientData = await clientResponse.json();
      
      setVehicleLimitPlans(vehicleData.data || []);
      setClientLimitPlans(clientData.data || []);
    } catch (err) {
      console.error('Error fetching plans:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Combine all plans with type identifier
  const getAllPlans = () => {
    const vehiclePlans = vehicleLimitPlans.map(plan => ({
      ...plan,
      type: 'vehicle',
      limit: plan.vehicleLimit,
      limitLabel: `${plan.vehicleLimit} Vehicles`
    }));
    
    const clientPlans = clientLimitPlans.map(plan => ({
      ...plan,
      type: 'client',
      limit: plan.clientLimit,
      limitLabel: `${plan.clientLimit} Clients`
    }));
    
    return [...vehiclePlans, ...clientPlans];
  };

  // Filter and sort plans
  const getFilteredAndSortedPlans = () => {
    let plans = getAllPlans();
    
    // Filter by type
    if (filterType !== 'all') {
      plans = plans.filter(plan => plan.type === filterType);
    }
    
    // Filter by search term
    if (searchTerm) {
      plans = plans.filter(plan => 
        plan.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (plan.description && plan.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filter by price range
    if (priceFilter !== 'all') {
      plans = plans.filter(plan => {
        const price = parseFloat(plan.price);
        switch (priceFilter) {
          case 'low':
            return price < 1000;
          case 'medium':
            return price >= 1000 && price < 5000;
          case 'high':
            return price >= 5000;
          default:
            return true;
        }
      });
    }
    
    // Sort plans
    plans.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'limit':
          return (a.limit || 0) - (b.limit || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
    
    return plans;
  };

  const filteredPlans = getFilteredAndSortedPlans();

  // Handle view details
  const handleViewDetails = (plan) => {
    // Navigate to appropriate detail page based on plan type
    if (plan.type === 'vehicle') {
      window.location.href = `/admin/plans/top-up/vehicle-limit/${plan.id}`;
    } else if (plan.type === 'client') {
      window.location.href = `/admin/plans/top-up/client-limit/${plan.id}`;
    }
  };

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <Link href="/admin/plans" className="text-black hover:underline flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Plans
        </Link>
        <h1 className="text-3xl font-bold">Top-Up Plans</h1>
        <p className="text-gray-600">Manage vehicle and client limit top-up plans</p>
      </div>

      {/* Enhanced Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Plans</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name or description..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Plan Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Plan Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            >
              <option value="all">All Plans</option>
              <option value="vehicle">Vehicle Plans</option>
              <option value="client">Client Plans</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            >
              <option value="all">All Prices</option>
              <option value="low">Under ₹1,000</option>
              <option value="medium">₹1,000 - ₹5,000</option>
              <option value="high">Above ₹5,000</option>
            </select>
          </div>
        </div>

        {/* Sort and Results Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="mb-2 md:mb-0">
            <span className="text-sm text-gray-600">
              Showing {filteredPlans.length} plan{filteredPlans.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="limit">Limit</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black mb-4"></div>
          <p>Loading plans...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          <p>{error}</p>
          <button 
            onClick={fetchPlans}
            className="mt-2 text-sm text-red-700 hover:text-red-900 underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Plans Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.length > 0 ? (
            filteredPlans.map((plan) => (
              <div key={`${plan.type}-${plan.id}`} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:border-black transition-all">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      plan.type === 'vehicle' 
                        ? 'bg-gray-100 text-gray-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {plan.type === 'vehicle' ? 'Vehicle Plan' : 'Client Plan'}
                    </span>
                  </div>
                  
                  <div className="text-3xl font-bold text-black mb-4">₹{plan.price}</div>
                  
                  <div className="mb-4">
                    <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      plan.type === 'vehicle' 
                        ? 'bg-black text-white' 
                        : 'bg-gray-800 text-white'
                    }`}>
                      {plan.limitLabel}
                    </span>
                  </div>
                  
                  {plan.description && (
                    <p className="text-gray-600 mb-4 text-sm">{plan.description}</p>
                  )}
                  
                  <div className="mt-6">
                    <button
                      onClick={() => handleViewDetails(plan)}
                      className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 text-lg mb-2">No plans found</p>
              <p className="text-gray-400 text-sm">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      )}

      {/* Create New Plan Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-end">
        <Link href="/admin/plans/create/vehicle-limit" className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition-colors text-center">
          Create Vehicle Limit Plan
        </Link>
        <Link href="/admin/plans/create/client-limit" className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-center">
          Create Client Limit Plan
        </Link>
      </div>
    </div>
  );
}