'use client'
import React from 'react';
import { useVehicleLimit } from '../../hooks/useVehicleLimit';

const VehicleLimitWarning = () => {
  const { getPlanDetails, hasPlan } = useVehicleLimit();
  const planDetails = getPlanDetails();

  if (!hasPlan() || !planDetails || planDetails.maxVehicles === 0) {
    return null;
  }

  const usagePercentage = (planDetails.currentVehicles / planDetails.maxVehicles) * 100;
  const isNearLimit = usagePercentage >= 80;
  const isAtLimit = usagePercentage >= 100;

  if (!isNearLimit) {
    return null;
  }

  return (
    <div className={`rounded-lg p-4 mb-6 ${
      isAtLimit 
        ? 'bg-red-50 border border-red-200' 
        : 'bg-yellow-50 border border-yellow-200'
    }`}>
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${
          isAtLimit ? 'text-red-500' : 'text-yellow-500'
        }`}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${
            isAtLimit ? 'text-red-800' : 'text-yellow-800'
          }`}>
            {isAtLimit ? 'Vehicle Limit Reached!' : 'Approaching Vehicle Limit'}
          </h3>
          <div className={`mt-2 text-sm ${
            isAtLimit ? 'text-red-700' : 'text-yellow-700'
          }`}>
            <p>
              {isAtLimit 
                ? `You have reached the maximum limit of ${planDetails.maxVehicles} vehicles for your ${planDetails.name} plan. You cannot add more vehicles until you upgrade your plan.`
                : `You are using ${planDetails.currentVehicles} out of ${planDetails.maxVehicles} vehicles (${Math.round(usagePercentage)}%). Consider upgrading your plan soon to avoid hitting the limit.`
              }
            </p>
            <div className="mt-3">
              <button
                onClick={() => window.location.href = '/company/subscription'}
                className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md ${
                  isAtLimit 
                    ? 'text-red-800 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                    : 'text-yellow-800 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
                } transition-colors`}
              >
                {isAtLimit ? 'Upgrade Plan Now' : 'View Plans'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleLimitWarning;
