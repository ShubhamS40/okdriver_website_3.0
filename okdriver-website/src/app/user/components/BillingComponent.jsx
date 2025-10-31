'use client'
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Check } from 'lucide-react';

export default function BillingComponent({ 
  apiPlans, 
  subscription, 
  session, 
  loadingPlans,
  fetchSubscription
}) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const formRef = useRef(null);

  // Function to handle PayU payment
  const handlePurchasePlan = async (plan) => {
    if (!session?.user?.backendId) return;
    
    setProcessingPayment(true);
    setPaymentError(null);
    
    try {
      // Create order on backend
      const orderResponse = await fetch('http://localhost:5000/api/user/payment/order', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.backendId}`
        },
        body: JSON.stringify({
          userId: session.user.backendId,
          planId: plan.id,
          amount: plan.price,
          productInfo: `API Plan: ${plan.name}`,
          firstName: session.user.name.split(' ')[0],
          lastName: session.user.name.split(' ').slice(1).join(' ') || '',
          email: session.user.email,
          phone: '9999999999', // Default phone
          successUrl: `${window.location.origin}/user/dashboard?payment=success`,
          failureUrl: `${window.location.origin}/user/dashboard?payment=failure`
        })
      });
      
      const orderData = await orderResponse.json();
      
      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create order');
      }
      
      // Use the hidden form reference instead of creating a new one
      const form = formRef.current || document.createElement('form');
      form.method = 'POST';
      form.action = orderData.paymentUrl;
      
      // Clear any existing inputs
      while (form.firstChild) {
        form.removeChild(form.firstChild);
      }
      
      // Add all required PayU fields
      for (const key in orderData.formData) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = orderData.formData[key];
        form.appendChild(input);
      }
      
      if (!formRef.current) {
        document.body.appendChild(form);
      }
      form.submit();
      
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError(error.message || 'Payment processing failed');
      setProcessingPayment(false);
    }
  };

  // Calculate days left in subscription
  const getDaysLeft = () => {
    if (!subscription || subscription.status !== 'ACTIVE') return 0;
    
    const endDate = new Date(subscription.endAt);
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <div className="flex items-center mb-6">
        <div className="bg-black text-white p-3 rounded-full mr-4">
          <CreditCard size={24} />
        </div>
        <h2 className="text-2xl font-bold">Billing & Subscription</h2>
      </div>

      {/* Current Subscription Status */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Current Subscription</h3>
        {subscription && subscription.status === 'ACTIVE' ? (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-green-800">Active Plan: {subscription.plan?.name || 'Standard Plan'}</p>
                <p className="text-sm text-green-700">
                  Valid until: {new Date(subscription.endAt).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-green-100 text-green-800 font-bold py-2 px-4 rounded-full">
                {getDaysLeft()} days left
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <p className="font-medium text-yellow-800">No Active Subscription</p>
            <p className="text-sm text-yellow-700">
              Purchase a plan below to use the API
            </p>
          </div>
        )}
      </div>

      {/* Available Plans */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Available Plans</h3>
        
        {loadingPlans ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : apiPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {apiPlans.map((plan) => (
              <div 
                key={plan.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedPlan?.id === plan.id 
                    ? 'border-black bg-gray-50' 
                    : 'border-gray-200 hover:border-gray-400'
                }`}
                onClick={() => setSelectedPlan(plan)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-medium">{plan.name}</h4>
                  {selectedPlan?.id === plan.id && (
                    <div className="bg-black text-white p-1 rounded-full">
                      <Check size={16} />
                    </div>
                  )}
                </div>
                <p className="text-2xl font-bold my-2">₹{plan.price}</p>
                <p className="text-sm text-gray-600 mb-2">Valid for {plan.daysValidity} days</p>
                <ul className="text-sm space-y-1 mb-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check size={14} className="mr-2 text-green-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePurchasePlan(plan);
                  }}
                  disabled={processingPayment}
                  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                >
                  {processingPayment ? 'Processing...' : 'Purchase Now'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No plans available at the moment.</p>
          </div>
        )}
        
        {paymentError && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">{paymentError}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}