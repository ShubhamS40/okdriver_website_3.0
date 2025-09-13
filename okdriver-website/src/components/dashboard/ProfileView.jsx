'use client'
import React, { useState, useEffect } from 'react';
import { useVehicleLimit } from '../../hooks/useVehicleLimit';
import UpgradePlanModal from './../UpgradePlanModal';

const ProfileView = () => {
  const [companyDetails, setCompanyDetails] = useState({
    name: '',
    email: '',
    details: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const { 
    companyPlan, 
    currentVehicleCount, 
    loading: planLoading, 
    error: planError,
    getPlanDetails,
    hasPlan,
    getCompanyDetailsFromToken,
    refreshData 
  } = useVehicleLimit();

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Load company details from token or API
  useEffect(() => {
    const loadCompanyDetails = () => {
      const tokenDetails = getCompanyDetailsFromToken();
      if (tokenDetails) {
        setCompanyDetails({
          name: tokenDetails.name,
          email: tokenDetails.email,
          details: 'Vehicle management and chat support system'
        });
      }
    };

    loadCompanyDetails();
  }, [getCompanyDetailsFromToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Here you would typically make an API call to update company details
      // For now, we'll just simulate a save
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      alert('Company details updated successfully!');
    } catch (err) {
      alert('Failed to update company details');
    } finally {
      setSaving(false);
    }
  };

  const planDetails = getPlanDetails();

  return (
    <div className="space-y-6">
      {/* Company Profile Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-black">Company Profile</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input 
              type="text" 
              name="name"
              value={companyDetails.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${!isEditing ? 'bg-gray-50' : ''}`} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              name="email"
              value={companyDetails.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${!isEditing ? 'bg-gray-50' : ''}`} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
            <textarea 
              name="details"
              value={companyDetails.details}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 h-24 ${!isEditing ? 'bg-gray-50' : ''}`}
            />
          </div>
          
          {isEditing && (
            <div className="flex gap-3">
              <button 
                onClick={handleSave}
                disabled={saving}
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Plan Details Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-black">Subscription Plan</h3>
          {hasPlan() && (
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Upgrade Plan
            </button>
          )}
        </div>

        {planLoading ? (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
            <span className="ml-2">Loading plan details...</span>
          </div>
        ) : planError ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-red-800 font-medium">Error loading plan details</p>
                <p className="text-red-600 text-sm">{planError}</p>
                <button
                  onClick={refreshData}
                  className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        ) : planDetails ? (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                <p className="text-lg font-semibold text-gray-900">{planDetails.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <p className="text-lg font-semibold text-gray-900">
                  ₹{planDetails.price} / {planDetails.durationDays} days
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Limit</label>
                <p className="text-lg font-semibold text-gray-900">
                  {planDetails.maxVehicles === 0 ? 'Unlimited' : planDetails.maxVehicles} vehicles
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Vehicles</label>
                <p className="text-lg font-semibold text-gray-900">
                  {planDetails.currentVehicles} / {planDetails.maxVehicles === 0 ? '∞' : planDetails.maxVehicles}
                </p>
              </div>
            </div>

            {planDetails.description && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className="text-gray-600">{planDetails.description}</p>
              </div>
            )}

            {/* Vehicle Usage Progress Bar */}
            {planDetails.maxVehicles > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Usage</label>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      planDetails.currentVehicles >= planDetails.maxVehicles 
                        ? 'bg-red-500' 
                        : planDetails.currentVehicles >= planDetails.maxVehicles * 0.8 
                        ? 'bg-yellow-500' 
                        : 'bg-green-500'
                    }`}
                    style={{ 
                      width: `${Math.min((planDetails.currentVehicles / planDetails.maxVehicles) * 100, 100)}%` 
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {planDetails.remainingVehicles === 'Unlimited' 
                    ? 'Unlimited vehicles remaining'
                    : `${planDetails.remainingVehicles} vehicles remaining`
                  }
                </p>
              </div>
            )}

            {/* Upgrade Warning */}
            {planDetails.maxVehicles > 0 && planDetails.currentVehicles >= planDetails.maxVehicles && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-red-800 font-medium">Vehicle limit reached!</p>
                    <p className="text-red-600 text-sm">You cannot add more vehicles with your current plan. Upgrade to add more vehicles.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">No active subscription plan found.</p>
            
            {/* Debug Information */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4 text-left">
              <h4 className="font-semibold text-gray-800 mb-2">Debug Information:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Loading: {planLoading ? 'Yes' : 'No'}</p>
                <p>Error: {planError || 'None'}</p>
                <p>Company Plan: {companyPlan ? 'Found' : 'Not found'}</p>
                <p>Has Plan: {hasPlan() ? 'Yes' : 'No'}</p>
                <p>Vehicle Count: {currentVehicleCount}</p>
                <p>Token: {typeof window !== 'undefined' && localStorage.getItem('companyToken') ? 'Present' : 'Missing'}</p>
              </div>
            </div>
            
            {/* Mock Plan for Testing */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 text-left">
              <h4 className="font-semibold text-blue-800 mb-2">Mock Plan (For Testing):</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p>Plan Name: Basic Plan</p>
                <p>Price: ₹999 / 30 days</p>
                <p>Vehicle Limit: 5 vehicles</p>
                <p>Current Vehicles: {currentVehicleCount}</p>
                <p>Remaining: {Math.max(0, 5 - currentVehicleCount)} vehicles</p>
              </div>
            </div>
            
            <button
              onClick={() => window.location.href = '/company/subscription'}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Choose a Plan
            </button>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex gap-3">
          <button 
            onClick={() => {
              if (typeof window !== 'undefined') {
                localStorage.removeItem('companyToken');
                window.location.href = '/company/login';
              }
            }}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Upgrade Plan Modal */}
      <UpgradePlanModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        currentPlan={planDetails}
        currentVehicleCount={currentVehicleCount}
      />
    </div>
  );
};

export default ProfileView;