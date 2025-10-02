'use client'
import React from 'react';
import { useVehicleLimit } from '../../hooks/useVehicleLimit';

const AddVehicleForm = ({ 
  vehicleForm, 
  handleVehicleChange, 
  generateRandomPassword, 
  submitVehicle, 
  vehicleSubmitting, 
  vehicleMsg 
}) => {
  const { 
    canAddVehicle, 
    getPlanDetails, 
    getRemainingSlots,
    loading: planLoading,
    error: planError 
  } = useVehicleLimit();

  const canAdd = canAddVehicle();
  const planDetails = getPlanDetails();
  const remainingSlots = getRemainingSlots();

  // Calculate usage details for display
  const getUsageInfo = () => {
    if (!planDetails) return null;

    return {
      currentVehicles: planDetails.currentVehicles || 0,
      totalLimit: planDetails.totalVehicleLimit || 0,
      baseLimit: planDetails.baseVehicleLimit || 0,
      topUpLimit: planDetails.topUpVehicleLimit || 0,
      remainingSlots: remainingSlots,
      hasActivePlan: planDetails.hasPlan,
      isUnlimited: planDetails.totalVehicleLimit === 0
    };
  };

  const usageInfo = getUsageInfo();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-black">Add New Vehicle</h3>
        {usageInfo && (
          <div className="text-right">
            <p className="text-sm text-gray-600">
              Vehicle Usage: {usageInfo.currentVehicles} / {usageInfo.isUnlimited ? '∞' : usageInfo.totalLimit}
            </p>
            <p className="text-xs text-gray-500">
              {usageInfo.remainingSlots === 'Unlimited' 
                ? 'Unlimited vehicles available' 
                : `${usageInfo.remainingSlots} slots remaining`}
            </p>
          </div>
        )}
      </div>

      {/* Vehicle Limit Status Card */}
      {usageInfo && (
        <div className={`mb-6 p-4 rounded-lg border ${
          !usageInfo.hasActivePlan
            ? 'bg-red-50 border-red-200'
            : !canAdd && !usageInfo.isUnlimited
            ? 'bg-red-50 border-red-200'
            : usageInfo.currentVehicles >= usageInfo.totalLimit * 0.8 && !usageInfo.isUnlimited
            ? 'bg-yellow-50 border-yellow-200'
            : 'bg-green-50 border-green-200'
        }`}>
          <div className="flex items-start justify-between">
            <div>
              <h4 className={`font-semibold text-sm ${
                !usageInfo.hasActivePlan
                  ? 'text-red-800'
                  : !canAdd && !usageInfo.isUnlimited
                  ? 'text-red-800'
                  : usageInfo.currentVehicles >= usageInfo.totalLimit * 0.8 && !usageInfo.isUnlimited
                  ? 'text-yellow-800'
                  : 'text-green-800'
              }`}>
                {!usageInfo.hasActivePlan
                  ? 'No Active Plan'
                  : !canAdd && !usageInfo.isUnlimited
                  ? 'Vehicle Limit Reached'
                  : usageInfo.currentVehicles >= usageInfo.totalLimit * 0.8 && !usageInfo.isUnlimited
                  ? 'Approaching Limit'
                  : 'Vehicle Limit Status'}
              </h4>
              <p className={`text-sm ${
                !usageInfo.hasActivePlan
                  ? 'text-red-700'
                  : !canAdd && !usageInfo.isUnlimited
                  ? 'text-red-700'
                  : usageInfo.currentVehicles >= usageInfo.totalLimit * 0.8 && !usageInfo.isUnlimited
                  ? 'text-yellow-700'
                  : 'text-green-700'
              }`}>
                {!usageInfo.hasActivePlan
                  ? 'You need an active subscription plan to add vehicles.'
                  : !canAdd && !usageInfo.isUnlimited
                  ? `You have reached your vehicle limit of ${usageInfo.totalLimit} vehicles.`
                  : usageInfo.currentVehicles >= usageInfo.totalLimit * 0.8 && !usageInfo.isUnlimited
                  ? `You are using ${usageInfo.currentVehicles} out of ${usageInfo.totalLimit} vehicles.`
                  : usageInfo.isUnlimited
                  ? 'You have unlimited vehicles on your current plan.'
                  : `You can add ${usageInfo.remainingSlots} more vehicle${usageInfo.remainingSlots !== 1 ? 's' : ''}.`}
              </p>
            </div>
            
            {/* Vehicle Limit Breakdown */}
            <div className="text-right text-xs text-gray-600">
              {usageInfo.hasActivePlan && !usageInfo.isUnlimited && (
                <div>
                  <p>Base Limit: {usageInfo.baseLimit}</p>
                  {usageInfo.topUpLimit > 0 && <p>Top-up: +{usageInfo.topUpLimit}</p>}
                  <p className="font-semibold">Total: {usageInfo.totalLimit}</p>
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar for Non-Unlimited Plans */}
          {usageInfo.hasActivePlan && !usageInfo.isUnlimited && usageInfo.totalLimit > 0 && (
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    usageInfo.currentVehicles >= usageInfo.totalLimit 
                      ? 'bg-red-500' 
                      : usageInfo.currentVehicles >= usageInfo.totalLimit * 0.8 
                      ? 'bg-yellow-500' 
                      : 'bg-green-500'
                  }`}
                  style={{ 
                    width: `${Math.min((usageInfo.currentVehicles / usageInfo.totalLimit) * 100, 100)}%` 
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {planLoading && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            <p className="text-blue-800 text-sm">Loading plan details...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {planError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm font-medium">Error loading plan details</p>
          <p className="text-red-700 text-xs mt-1">{planError}</p>
        </div>
      )}

      {/* Add Vehicle Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Number *</label>
          <input 
            name="vehicleNumber" 
            value={vehicleForm.vehicleNumber} 
            onChange={handleVehicleChange} 
            placeholder="e.g. MH12AB1234" 
            type="text" 
            disabled={!canAdd || planLoading}
            className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
              (!canAdd || planLoading) ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Password *</label>
          <div className="flex gap-2">
            <input 
              name="password" 
              value={vehicleForm.password} 
              onChange={handleVehicleChange} 
              type="text" 
              disabled={!canAdd || planLoading}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                (!canAdd || planLoading) ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
            <button 
              type="button" 
              onClick={generateRandomPassword} 
              disabled={!canAdd || planLoading}
              className={`px-3 py-2 border border-gray-300 rounded-lg ${
                (!canAdd || planLoading) 
                  ? 'bg-gray-100 cursor-not-allowed text-gray-400' 
                  : 'hover:bg-gray-50'
              }`}
            >
              Random
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
          <input 
            name="model" 
            value={vehicleForm.model} 
            onChange={handleVehicleChange} 
            placeholder="e.g. DZIRE" 
            type="text" 
            disabled={!canAdd || planLoading}
            className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
              (!canAdd || planLoading) ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select 
            name="type" 
            value={vehicleForm.type} 
            onChange={handleVehicleChange} 
            disabled={!canAdd || planLoading}
            className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
              (!canAdd || planLoading) ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
          >
            <option value="">Select type</option>
            <option value="Truck">Truck</option>
            <option value="Bus">Bus</option>
            <option value="Car">Car</option>
            <option value="Van">Van</option>
            <option value="Motorcycle">Motorcycle</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company ID *</label>
          <input 
            name="companyId" 
            value={vehicleForm.companyId} 
            onChange={handleVehicleChange} 
            type="number" 
            disabled={!canAdd || planLoading}
            className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
              (!canAdd || planLoading) ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
          />
          <p className="text-xs text-gray-500 mt-1">Prefilled from login if available</p>
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button 
                onClick={submitVehicle} 
                disabled={vehicleSubmitting || !canAdd || planLoading} 
                className={`px-6 py-2 rounded-lg transition-colors font-medium ${
                  vehicleSubmitting || !canAdd || planLoading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
                title={
                  planLoading 
                    ? 'Loading plan details...'
                    : !usageInfo?.hasActivePlan
                    ? 'No active subscription plan'
                    : !canAdd && !usageInfo?.isUnlimited
                    ? `Vehicle limit reached (${usageInfo?.totalLimit || 0} vehicles)`
                    : vehicleSubmitting
                    ? 'Adding vehicle...'
                    : 'Add vehicle to your fleet'
                }
              >
                {vehicleSubmitting ? 'Adding...' : 'Add Vehicle'}
              </button>

              {vehicleMsg && (
                <span className={`text-sm ${
                  vehicleMsg.includes('successfully') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {vehicleMsg}
                </span>
              )}
            </div>

            {/* Quick Action Links */}
            {usageInfo && !usageInfo.hasActivePlan && (
              <a 
                href="/company/subscription" 
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Choose a Plan →
              </a>
            )}
            {usageInfo && usageInfo.hasActivePlan && !canAdd && !usageInfo.isUnlimited && (
              <a 
                href="/company/upgrade" 
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Upgrade Plan →
              </a>
            )}
          </div>

          {/* Detailed Warning Messages */}
          {!canAdd && usageInfo && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div className="text-sm">
                  {!usageInfo.hasActivePlan ? (
                    <>
                      <p className="text-red-800 font-medium">No Active Subscription Plan</p>
                      <p className="text-red-700 mt-1">
                        You need to subscribe to a plan to add vehicles to your fleet.
                      </p>
                      <div className="mt-2">
                        <a 
                          href="/company/subscription" 
                          className="inline-flex items-center text-red-700 font-medium hover:text-red-800"
                        >
                          View Available Plans →
                        </a>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-red-800 font-medium">Vehicle Limit Reached</p>
                      <p className="text-red-700 mt-1">
                        Your current plan allows a maximum of {usageInfo.totalLimit} vehicles 
                        ({usageInfo.baseLimit} base + {usageInfo.topUpLimit} top-up).
                      </p>
                      <div className="mt-2 space-x-4">
                        <a 
                          href="/company/upgrade" 
                          className="inline-flex items-center text-red-700 font-medium hover:text-red-800"
                        >
                          Upgrade Plan →
                        </a>
                        <a 
                          href="/company/top-up" 
                          className="inline-flex items-center text-red-700 font-medium hover:text-red-800"
                        >
                          Buy Top-up →
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Approaching Limit Warning */}
          {canAdd && usageInfo && !usageInfo.isUnlimited && 
           usageInfo.currentVehicles >= usageInfo.totalLimit * 0.8 && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div className="text-sm">
                  <p className="text-yellow-800 font-medium">Approaching Vehicle Limit</p>
                  <p className="text-yellow-700 mt-1">
                    You're using {usageInfo.currentVehicles} out of {usageInfo.totalLimit} vehicles. 
                    Consider upgrading your plan before reaching the limit.
                  </p>
                  <div className="mt-2">
                    <a 
                      href="/company/upgrade" 
                      className="inline-flex items-center text-yellow-700 font-medium hover:text-yellow-800"
                    >
                      Plan Upgrades →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddVehicleForm;