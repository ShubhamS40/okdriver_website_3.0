"use client";
import { useState, useEffect } from "react";
import { useVehicleLimit } from "../../../hooks/useVehicleLimit";

export default function CompanyTopUpPlans() {
  const [vehicleLimitPlans, setVehicleLimitPlans] = useState([]);
  const [clientLimitPlans, setClientLimitPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchasing, setPurchasing] = useState(false);
  const [showOnlyVehiclePlans, setShowOnlyVehiclePlans] = useState(false);
  
  // Get vehicle limit information
  const { canAddVehicle, getPlanDetails } = useVehicleLimit();

  useEffect(() => {
    fetchPlans();
    
    // Check if vehicle limit is reached
    const planDetails = getPlanDetails();
    if (planDetails && planDetails.currentVehicles >= planDetails.maxVehicles) {
      setShowOnlyVehiclePlans(true);
    }
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [vehicleResponse, clientResponse] = await Promise.all([
        fetch('https://backend.okdriver.in/api/admin/company/top-up-plan/vehicle-limit/vehicle-limit-plans'),
        fetch('https://backend.okdriver.in/api/admin/company/top-up-plan/client-limit/client-limit-plans')
      ]);

      if (!vehicleResponse.ok || !clientResponse.ok) {
        throw new Error('Failed to fetch plans');
      }

      const vehicleData = await vehicleResponse.json();
      const clientData = await clientResponse.json();
      
      setVehicleLimitPlans(vehicleData.data || []);
      setClientLimitPlans(clientData.data || []);
    } catch (err) {
      setError('Failed to load plans');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (plan, type) => {
    setPurchasing(true);
    
    try {
      const token = localStorage.getItem('companyToken');
      if (!token) {
        alert('You need to be logged in to make a payment');
        return;
      }
      
      // Determine which API endpoint to use based on plan type
      const apiEndpoint = type === 'vehicle' && showOnlyVehiclePlans
        ? '/api/payment/vehicle-limit/create-order'
        : '/api/payment/create-order';
      
      // Create PayU payment order via backend
      const orderResponse = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: plan.price,
          currency: 'INR',
          receipt: type === 'vehicle' 
            ? `vehicle_limit_purchase_${Date.now()}` 
            : `topup_purchase_${Date.now()}`,
          planId: plan.id
        })
      });
      
      if (!orderResponse.ok) {
        const errorData = await orderResponse.json().catch(() => ({}));
        throw new Error(`Failed to create payment order: ${errorData.message || orderResponse.statusText}`);
      }
      
      const orderData = await orderResponse.json();
      
      if (!orderData.success || !orderData.params || !orderData.action) {
        throw new Error('Invalid payment init response');
      }
      
      // Build a form and submit to PayU
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = orderData.action;
      Object.entries(orderData.params).forEach(([k, v]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = k;
        input.value = v;
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      alert('Payment initialization failed: ' + err.message);
      setPurchasing(false);
    }
  };

  // Filter plans based on whether we need to show only vehicle plans
  const allPlans = showOnlyVehiclePlans
    ? vehicleLimitPlans.map(plan => ({ ...plan, type: 'vehicle', limitText: `${plan.vehicleLimit} Vehicles` }))
    : [
        ...vehicleLimitPlans.map(plan => ({ ...plan, type: 'vehicle', limitText: `${plan.vehicleLimit} Vehicles` })),
        ...clientLimitPlans.map(plan => ({ ...plan, type: 'client', limitText: `${plan.clientLimit} Clients` }))
      ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black">Loading plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-black mb-4">{error}</p>
          <button 
            onClick={fetchPlans}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {showOnlyVehiclePlans && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 text-red-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Vehicle Limit Reached!</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>You have reached the maximum limit of vehicles for your current plan. Please select a vehicle limit plan below to add more vehicles.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">{showOnlyVehiclePlans ? 'Vehicle Limit Plans' : 'Top-Up Plans'}</h1>
          <p className="text-gray-600">
            {showOnlyVehiclePlans 
              ? 'Increase your vehicle limit by purchasing one of these plans' 
              : 'Extend your limits with our top-up plans'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPlans.map((plan) => (
            <div key={`${plan.type}-${plan.id}`} className="bg-white border-2 border-black rounded-lg p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-black">{plan.name}</h3>
                <span className="text-sm text-gray-600">
                  {plan.type === 'vehicle' ? 'Vehicle Plan' : 'Client Plan'}
                </span>
              </div>
              
              <div className="mb-4">
                <span className="text-3xl font-bold text-black">₹{plan.price}</span>
              </div>
              
              <div className="mb-4">
                <span className="bg-black text-white text-sm px-3 py-1 rounded">
                  +{plan.limitText}
                </span>
              </div>
              
              {plan.description && (
                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
              )}
              
              <button
                onClick={() => handlePurchase(plan, plan.type)}
                disabled={purchasing}
                className="w-full bg-black text-white font-medium py-3 px-4 rounded hover:bg-gray-800 disabled:opacity-50"
              >
                {purchasing ? 'Processing...' : showOnlyVehiclePlans && plan.type === 'vehicle' ? 'Upgrade Vehicle Limit' : 'Purchase Now'}
              </button>
            </div>
          ))}
        </div>

        {allPlans.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No plans available at the moment</p>
          </div>
        )}
      </div>
    </div>
  );
}