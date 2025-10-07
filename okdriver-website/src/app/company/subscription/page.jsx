"use client"
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const CompanySubscriptionContent = () => {
  const searchParams = useSearchParams();
  const planId = searchParams.get('planId');
  
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // Fetch the plan details when component mounts
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        // Use the same API endpoint as login component
        const response = await fetch('https://backend.okdriver.in/api/admin/companyplan/list');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch plans: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Check if response has expected structure
        if (!data.data || !Array.isArray(data.data)) {
          throw new Error('Invalid API response structure');
        }
        
        // Filter only SUBSCRIPTION type plans that are active
        const subscriptionPlans = data.data.filter(plan => 
          plan.planType === 'SUBSCRIPTION' && plan.isActive === true
        );
        
        console.log('All plans:', data.data);
        console.log('Filtered subscription plans:', subscriptionPlans);
        
        setPlans(subscriptionPlans);
        
        // If planId is provided in URL, select that plan
        if (planId) {
          const plan = subscriptionPlans.find(p => p.id === parseInt(planId));
          if (plan) {
            setSelectedPlan(plan);
          } else {
            console.warn(`Plan with ID ${planId} not found in subscription plans`);
          }
        }
      } catch (err) {
        console.error('Error fetching plans:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlans();
  }, [planId]);
  
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };
  
  const initializePayment = async () => {
    if (!selectedPlan) {
      alert('Please select a plan first');
      return;
    }
    
    try {
      setPaymentProcessing(true);
      
      // Get token from localStorage
      const token = localStorage.getItem('companyToken');
      if (!token) {
        alert('You need to be logged in to make a payment. Redirecting to login page...');
        window.location.href = '/company/login';
        return;
      }
      
      console.log('Token found, proceeding with payment');
      console.log('Selected plan:', selectedPlan);
      
      // Create payment order via backend
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: selectedPlan.price,
          currency: 'INR',
          receipt: `plan_purchase_${Date.now()}`,
          planId: selectedPlan.id,
          planName: selectedPlan.name,
          durationDays: selectedPlan.durationDays,
          billingCycle: selectedPlan.billingCycle
        })
      });
      
      if (!orderResponse.ok) {
        const errorData = await orderResponse.json().catch(() => ({}));
        console.error('Order creation failed:', errorData);
        throw new Error(`Failed to create payment order: ${errorData.message || orderResponse.statusText}`);
      }
      
      console.log('Order response received');
      const orderData = await orderResponse.json();
      
      if (!orderData.success || !orderData.params || !orderData.action) {
        throw new Error('Invalid payment initialization response');
      }
      
      // Build a form and submit to PayU
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = orderData.action;
      
      Object.entries(orderData.params).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });
      
      document.body.appendChild(form);
      form.submit();
      
    } catch (err) {
      console.error('Payment initialization error:', err);
      alert('Payment initialization failed: ' + err.message);
      setPaymentProcessing(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
          <span>Loading subscription plans...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Plans</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <div className="space-y-2">
            <button 
              onClick={() => window.location.reload()} 
              className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Try Again
            </button>
            <button 
              onClick={() => window.location.href = '/company/login'} 
              className="w-full bg-gray-100 text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (plans.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md text-center">
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">No Subscription Plans Available</h2>
          <p className="text-yellow-600 mb-4">
            There are no active subscription plans available at the moment. Please contact support for assistance.
          </p>
          <button 
            onClick={() => window.location.href = '/company/login'} 
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">OK</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">Choose Your Subscription Plan</h1>
          <p className="text-gray-600">Select the plan that best fits your company's needs</p>
        </div>
        
        {/* Plan Selection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`bg-white border rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer ${
                selectedPlan?.id === plan.id ? 'border-black ring-2 ring-black' : 'border-gray-200'
              }`}
              onClick={() => handlePlanSelect(plan)}
            >
              <div className="text-center">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    Subscription Plan
                  </span>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-black mb-1">
                  ₹{plan.price}
                  <span className="text-lg text-gray-600">
                    /{plan.billingCycle || `${plan.durationDays} days`}
                  </span>
                </div>
                {plan.description && (
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                )}
                
                {/* Features */}
                <div className="mt-6 text-left">
                  <h4 className="font-medium text-sm text-gray-500 mb-2">FEATURES</h4>
                  <ul className="space-y-2">
                    {plan.vehicleLimit && (
                      <li className="flex items-center text-sm">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        Up to {plan.vehicleLimit} vehicles
                      </li>
                    )}
                    {plan.storageLimitGB && (
                      <li className="flex items-center text-sm">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        {plan.storageLimitGB} GB Storage
                      </li>
                    )}
                    {plan.durationDays && (
                      <li className="flex items-center text-sm">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        {plan.durationDays} days validity
                      </li>
                    )}
                    {plan.keyAdvantages && plan.keyAdvantages.length > 0 ? (
                      plan.keyAdvantages.slice(0, 2).map((advantage, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          {advantage}
                        </li>
                      ))
                    ) : (
                      <li className="flex items-center text-sm">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        24/7 Support
                      </li>
                    )}
                  </ul>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlanSelect(plan);
                  }}
                  className={`mt-6 w-full py-2 px-4 rounded-lg font-medium ${
                    selectedPlan?.id === plan.id 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-black hover:bg-gray-200'
                  } transition-colors`}
                >
                  {selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Payment Button */}
        <div className="text-center">
          <button
            onClick={initializePayment}
            disabled={!selectedPlan || paymentProcessing}
            className="bg-black text-white py-3 px-8 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {paymentProcessing ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              `Proceed to Payment${selectedPlan ? ` - ₹${selectedPlan.price}` : ''}`
            )}
          </button>
          
          <p className="mt-4 text-sm text-gray-500">
            By proceeding, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default function CompanySubscription() {
  return (
    <Suspense fallback={(
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
          <span>Loading...</span>
        </div>
      </div>
    )}>
      <CompanySubscriptionContent />
    </Suspense>
  );
}