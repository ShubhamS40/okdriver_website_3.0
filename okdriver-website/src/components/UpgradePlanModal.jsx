'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UpgradePlanModal = ({ isOpen, onClose, currentPlan, currentVehicleCount }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      fetchPlans();
    }
  }, [isOpen]);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/plans/list');
      
      if (!response.ok) {
        throw new Error('Failed to fetch plans');
      }
      
      const data = await response.json();
      // Filter out the current plan and show only higher tier plans
      const availablePlans = data.filter(plan => 
        plan.id !== currentPlan?.id && 
        (plan.maxVehicles === null || plan.maxVehicles > currentVehicleCount)
      );
      setPlans(availablePlans);
    } catch (err) {
      console.error('Error fetching plans:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const initializePayment = async () => {
    if (!selectedPlan) return;
    
    try {
      setPaymentProcessing(true);
      
      const token = localStorage.getItem('companyToken');
      if (!token) {
        alert('You need to be logged in to make a payment. Redirecting to login page...');
        router.push('/company/login');
        return;
      }
      
      // Create PayU params via backend
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: selectedPlan.price,
          currency: 'INR',
          receipt: `plan_upgrade_${Date.now()}`,
          planId: selectedPlan.id
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
      setPaymentProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Upgrade Your Plan</h2>
              <p className="text-gray-600 mt-1">
                You've reached the vehicle limit for your current plan. Choose a higher tier plan to add more vehicles.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Current Plan Info */}
          {currentPlan && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Current Plan</h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium">{currentPlan.name}</p>
                  <p className="text-sm text-gray-600">
                    {currentPlan.maxVehicles ? `Up to ${currentPlan.maxVehicles} vehicles` : 'Unlimited vehicles'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">₹{currentPlan.price}</p>
                  <p className="text-sm text-gray-600">/{currentPlan.durationDays} days</p>
                </div>
              </div>
              <div className="mt-2 text-sm text-red-600">
                Current vehicles: {currentVehicleCount} / {currentPlan.maxVehicles || '∞'}
              </div>
            </div>
          )}

          {/* Available Plans */}
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
              <span className="ml-2">Loading plans...</span>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Available Plans</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPlan?.id === plan.id 
                        ? 'border-black ring-2 ring-black bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handlePlanSelect(plan)}
                  >
                    <div className="text-center">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{plan.name}</h4>
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        ₹{plan.price}
                        <span className="text-sm text-gray-600">/{plan.durationDays} days</span>
                      </div>
                      {plan.description && (
                        <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                      )}
                      
                      <div className="text-left space-y-1">
                        <div className="flex items-center text-sm">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          {plan.maxVehicles ? `Up to ${plan.maxVehicles} vehicles` : 'Unlimited vehicles'}
                        </div>
                        <div className="flex items-center text-sm">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          24/7 Support
                        </div>
                        <div className="flex items-center text-sm">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          Real-time monitoring
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={initializePayment}
              disabled={!selectedPlan || paymentProcessing}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {paymentProcessing ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                `Upgrade to ${selectedPlan?.name || 'Selected Plan'}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePlanModal;
