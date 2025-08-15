"use client"
import React, { useEffect, useState } from 'react';

const SubscriptionSuccess = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Redirect to dashboard after countdown
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/company/dashboard';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="bg-green-50 rounded-full h-24 w-24 flex items-center justify-center mx-auto">
          <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="mt-6 text-3xl font-bold text-gray-900">Payment Successful!</h2>
        
        <p className="mt-2 text-gray-600">
          Your subscription has been activated successfully. You can now access all the features of your plan.
        </p>
        
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-700 mb-2">You will be redirected to your dashboard in <span className="font-bold">{countdown}</span> seconds.</p>
          <button
            onClick={() => window.location.href = '/company/dashboard'}
            className="mt-4 w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Go to Dashboard Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;