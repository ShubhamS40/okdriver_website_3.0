'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CreatePlan() {
  const [planName, setPlanName] = useState('');
  const [billingCycle, setBillingCycle] = useState('monthly'); // Options: daily, monthly, quarterly, yearly
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [benefits, setBenefits] = useState('');
  
  // Services checkboxes
  const [services, setServices] = useState({
    drowsinessMonitoring: false,
    voiceAssistant: false,
    sosAlert: false
  });
  
  // Storage allocation
  const [storageAllocation, setStorageAllocation] = useState(50);
  
  // Condition based approach for DMS
  const [dmsConditions, setDmsConditions] = useState([]);

  // Handle service checkbox changes
  const handleServiceChange = (service) => {
    const newServices = {
      ...services,
      [service]: !services[service]
    };
    
    setServices(newServices);
    
    // If DMS is checked, add default conditions
    if (service === 'drowsinessMonitoring') {
      if (!services.drowsinessMonitoring) {
        // When enabling DMS, add default conditions
        setDmsConditions(['eye_closure', 'head_position', 'yawning']);
      } else {
        // When disabling DMS, clear conditions
        setDmsConditions([]);
      }
    }
  };
  
  // Handle DMS condition changes
  const handleDmsConditionChange = (condition) => {
    if (dmsConditions.includes(condition)) {
      setDmsConditions(dmsConditions.filter(c => c !== condition));
    } else {
      setDmsConditions([...dmsConditions, condition]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const benefitsArray = benefits.split('\n').map(b => b.trim()).filter(Boolean);
    const storageLimitGB = Number(storageAllocation);
    const durationMap = { daily: 1, monthly: 30, quarterly: 90, yearly: 365 };
    const durationDays = durationMap[billingCycle] || 30;

    const payload = {
      name: planName,
      description,
      price: Number(price),
      billingCycle,
      durationDays,
      benefits: benefitsArray,
      // Keeping features empty for now; can be expanded separately
      features: [],
      storageLimitGB,
      // Backend expects array of service IDs; omit to avoid invalid IDs
    };

    try {
      const res = await fetch('https://backend.okdriver.in/api/admin/driverplan/driver-plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        console.error('Driver plan creation failed:', data);
        alert(data?.error || 'Failed to create driver plan');
        return;
      }

      alert('Plan created successfully!');
      // Reset form
      setPlanName('');
      setBillingCycle('monthly');
      setPrice('');
      setDescription('');
      setBenefits('');
      setStorageAllocation(50);
      setDmsConditions([]);
      setServices({
        drowsinessMonitoring: false,
        voiceAssistant: false,
        sosAlert: false
      });
    } catch (err) {
      console.error(err);
      alert('Network error while creating plan');
    }
  };

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link href="/admin/dashboard" className="text-black hover:underline flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">Create Subscription Plan</h1>
          <p className="text-gray-600">Create a new subscription plan for your customers</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Plan Basic Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Plan Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="planName" className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                    <input
                      type="text"
                      id="planName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="e.g. Basic, Premium, Enterprise"
                      value={planName}
                      onChange={(e) => setPlanName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Billing Cycle</label>
                    <div className="flex flex-wrap space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio h-4 w-4 text-black"
                          name="billingCycle"
                          value="daily"
                          checked={billingCycle === 'daily'}
                          onChange={() => setBillingCycle('daily')}
                        />
                        <span className="ml-2">Daily</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio h-4 w-4 text-black"
                          name="billingCycle"
                          value="monthly"
                          checked={billingCycle === 'monthly'}
                          onChange={() => setBillingCycle('monthly')}
                        />
                        <span className="ml-2">Monthly</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio h-4 w-4 text-black"
                          name="billingCycle"
                          value="quarterly"
                          checked={billingCycle === 'quarterly'}
                          onChange={() => setBillingCycle('quarterly')}
                        />
                        <span className="ml-2">3 Months</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio h-4 w-4 text-black"
                          name="billingCycle"
                          value="yearly"
                          checked={billingCycle === 'yearly'}
                          onChange={() => setBillingCycle('yearly')}
                        />
                        <span className="ml-2">Yearly</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">₹</span>
                      </div>
                      <input
                        type="number"
                        id="price"
                        className="w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">
                          {billingCycle === 'daily' ? '/day' : 
                           billingCycle === 'monthly' ? '/month' : 
                           billingCycle === 'quarterly' ? '/quarter' : 
                           '/year'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Plan Description</h2>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    id="description"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Describe the plan in a few sentences"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            
            {/* Plan Features and Services */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Plan Benefits</h2>
                <div>
                  <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 mb-1">Benefits (one per line)</label>
                  <textarea
                    id="benefits"
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="e.g.\n24/7 Support\nUnlimited Usage\nPriority Access"
                    value={benefits}
                    onChange={(e) => setBenefits(e.target.value)}
                    required
                  ></textarea>
                  <p className="mt-1 text-sm text-gray-500">Enter each benefit on a new line</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Included Services</h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="drowsinessMonitoring"
                        type="checkbox"
                        className="h-4 w-4 text-black border-gray-300 rounded"
                        checked={services.drowsinessMonitoring}
                        onChange={() => handleServiceChange('drowsinessMonitoring')}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="drowsinessMonitoring" className="font-medium text-gray-700">Drowsiness Monitoring System</label>
                      <p className="text-gray-500">AI-powered system to detect driver drowsiness</p>
                    </div>
                  </div>
                  
                  {/* Condition Based Approach for DMS */}
                  {services.drowsinessMonitoring && (
                    <div className="ml-8 mt-2 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm font-medium text-gray-700 mb-2">Condition Based Approach:</p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            id="eye_closure"
                            type="checkbox"
                            className="h-4 w-4 text-black border-gray-300 rounded"
                            checked={dmsConditions.includes('eye_closure')}
                            onChange={() => handleDmsConditionChange('eye_closure')}
                          />
                          <label htmlFor="eye_closure" className="ml-2 text-sm text-gray-700">Eye Closure</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="head_position"
                            type="checkbox"
                            className="h-4 w-4 text-black border-gray-300 rounded"
                            checked={dmsConditions.includes('head_position')}
                            onChange={() => handleDmsConditionChange('head_position')}
                          />
                          <label htmlFor="head_position" className="ml-2 text-sm text-gray-700">Head Position</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="yawning"
                            type="checkbox"
                            className="h-4 w-4 text-black border-gray-300 rounded"
                            checked={dmsConditions.includes('yawning')}
                            onChange={() => handleDmsConditionChange('yawning')}
                          />
                          <label htmlFor="yawning" className="ml-2 text-sm text-gray-700">Yawning Detection</label>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="voiceAssistant"
                        type="checkbox"
                        className="h-4 w-4 text-black border-gray-300 rounded"
                        checked={services.voiceAssistant}
                        onChange={() => handleServiceChange('voiceAssistant')}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="voiceAssistant" className="font-medium text-gray-700">Voice Assistant</label>
                      <p className="text-gray-500">Hands-free voice commands and assistance</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="sosAlert"
                        type="checkbox"
                        className="h-4 w-4 text-black border-gray-300 rounded"
                        checked={services.sosAlert}
                        onChange={() => handleServiceChange('sosAlert')}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="sosAlert" className="font-medium text-gray-700">SOS Alert</label>
                      <p className="text-gray-500">Emergency alert system for critical situations</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <h2 className="text-xl font-semibold mb-4">Storage Allocation</h2>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Drag to allocate storage:</span>
                    <span className="text-sm font-medium">{storageAllocation} GB</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={storageAllocation}
                    onChange={(e) => setStorageAllocation(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 GB</span>
                    <span>50 GB</span>
                    <span>100 GB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-3">
            <Link href="/admin/dashboard" className="btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn-primary">
              Create Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}