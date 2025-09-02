'use client'
import React from 'react';

const AddVehicleForm = ({ 
  vehicleForm, 
  handleVehicleChange, 
  generateRandomPassword, 
  submitVehicle, 
  vehicleSubmitting, 
  vehicleMsg 
}) => {
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
              disabled={vehicleSubmitting} 
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-60"
            >
              {vehicleSubmitting ? 'Adding...' : 'Add Vehicle'}
            </button>
            {vehicleMsg && (
              <span className={`text-sm ${vehicleMsg.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                {vehicleMsg}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicleForm;