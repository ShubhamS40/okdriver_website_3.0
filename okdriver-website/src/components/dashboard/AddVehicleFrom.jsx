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
  // Import useVehicleLimit hook to check if vehicle limit is reached
  const { canAddVehicle, getPlanDetails } = useVehicleLimit();
  const canAdd = canAddVehicle();
  const planDetails = getPlanDetails();
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-black mb-6">Add New Vehicle</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Number *</label>
          <input 
            name="vehicleNumber" 
            value={vehicleForm.vehicleNumber} 
            onChange={handleVehicleChange} 
            placeholder="e.g. MH12AB1234" 
            type="text" 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" 
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" 
            />
            <button 
              type="button" 
              onClick={generateRandomPassword} 
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select 
            name="type" 
            value={vehicleForm.type} 
            onChange={handleVehicleChange} 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="">Select type</option>
            <option value="Truck">Truck</option>
            <option value="Bus">Bus</option>
            <option value="Car">Car</option>
            <option value="Van">Van</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company ID *</label>
          <input 
            name="companyId" 
            value={vehicleForm.companyId} 
            onChange={handleVehicleChange} 
            type="number" 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" 
          />
          <p className="text-xs text-gray-500 mt-1">Prefilled from login if available</p>
        </div>
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <button 
              onClick={submitVehicle} 
              disabled={vehicleSubmitting || !canAdd} 
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-60"
              title={!canAdd ? `Vehicle limit reached (${planDetails?.maxVehicles || 0} vehicles)` : ''}
            >
              {vehicleSubmitting ? 'Adding...' : 'Add Vehicle'}
            </button>
            {vehicleMsg && (
              <span className={`text-sm ${vehicleMsg.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                {vehicleMsg}
              </span>
            )}
          </div>
          {!canAdd && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              <p>You have reached the maximum limit of {planDetails?.maxVehicles || 0} vehicles for your current plan.</p>
              <p className="mt-1">Please <a href="/company/subscription" className="font-medium underline">upgrade your plan</a> to add more vehicles.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddVehicleForm;