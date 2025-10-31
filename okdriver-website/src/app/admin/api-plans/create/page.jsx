'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function CreateAPIPlan() {
  const router = useRouter();
  const [planName, setPlanName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState(['']);
  const [saving, setSaving] = useState(false);
  const [daysValidity, setDaysValidity] = useState('30');
  const [durationType, setDurationType] = useState('monthly'); // monthly, quarterly, halfyearly, yearly, custom

  const addFeature = () => {
    setFeatures([...features, '']);
  };

  const removeFeature = (index) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Calculate days validity based on duration type
    let calculatedDaysValidity = daysValidity;
    if (durationType === 'monthly') {
      calculatedDaysValidity = 30;
    } else if (durationType === 'quarterly') {
      calculatedDaysValidity = 90;
    } else if (durationType === 'halfyearly') {
      calculatedDaysValidity = 180;
    } else if (durationType === 'yearly') {
      calculatedDaysValidity = 365;
    }
    // For custom, use the user-entered daysValidity
    
    // Validate required fields
    if (!planName || !price || !calculatedDaysValidity) {
      toast.error('Please fill all required fields');
      return;
    }

    // Filter out empty features
    const filteredFeatures = features.filter(feature => feature.trim() !== '');

    try {
      setSaving(true);
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
      
      if (!token) {
        toast.error('You need to be logged in to create a plan');
        router.push('/admin/login');
        return;
      }
      
      const response = await fetch('http://localhost:5000/api/admin/api-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: planName,
          price: parseFloat(price),
          description,
          features: filteredFeatures,
          daysValidity: parseInt(calculatedDaysValidity),
          isActive: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create API plan');
      }

      toast.success('API Plan created successfully');
      router.push('/admin/api-plans');
    } catch (error) {
      console.error('Error creating API plan:', error);
      toast.error('Failed to create API plan');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button className="flex items-center text-gray-600 hover:text-gray-900 mb-6 text-sm">
          <span className="mr-2">←</span> Back to Plans
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New API Plan
          </h1>
          <p className="text-gray-600">
            Create a comprehensive API plan with customizable features and pricing
          </p>
        </div>

        {/* Form */}
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            {/* Basic Plan Information */}
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Basic Plan Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Plan Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plan Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="e.g., Basic, Premium, Enterprise"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="99.99"
                  step="0.01"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              {/* Plan Duration (in days) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Billing Duration <span className="text-red-500">*</span>
                </label>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setDurationType('monthly')}
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        durationType === 'monthly'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Monthly Plans
                    </button>
                    <button
                      type="button"
                      onClick={() => setDurationType('quarterly')}
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        durationType === 'quarterly'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Quarterly Plans
                    </button>
                    <button
                      type="button"
                      onClick={() => setDurationType('halfyearly')}
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        durationType === 'halfyearly'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      6 Months
                    </button>
                    <button
                      type="button"
                      onClick={() => setDurationType('yearly')}
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        durationType === 'yearly'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Yearly Plans
                    </button>
                    <button
                      type="button"
                      onClick={() => setDurationType('custom')}
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        durationType === 'custom'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Custom Duration
                    </button>
                  </div>
                </div>
                
                {durationType === 'custom' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Custom Days <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={daysValidity}
                      onChange={e => setDaysValidity(e.target.value)}
                      placeholder="Enter number of days"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      min="1"
                    />
                  </div>
                )}
                
                {durationType === 'monthly' && (
                  <div className="mt-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-md">
                    Selected Duration: 30 days (Monthly)
                  </div>
                )}
                {durationType === 'quarterly' && (
                  <div className="mt-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-md">
                    Selected Duration: 90 days (Quarterly)
                  </div>
                )}
                {durationType === 'halfyearly' && (
                  <div className="mt-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-md">
                    Selected Duration: 180 days (6 Months)
                  </div>
                )}
                {durationType === 'yearly' && (
                  <div className="mt-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-md">
                    Selected Duration: 365 days (1 Year)
                  </div>
                )}
              </div>
            </div>

            {/* Plan Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plan Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what this plan offers to API users"
                rows="4"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
              />
            </div>

            {/* Features Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Features <span className="text-red-500">*</span>
                </label>
                <button
                  onClick={addFeature}
                  className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <Plus size={16} className="mr-1" />
                  Add Feature
                </button>
              </div>

              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                    {features.length > 1 && (
                      <button
                        onClick={() => removeFeature(index)}
                        className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        title="Remove feature"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 mt-6">
            <button
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="px-6 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-60"
            >
              {saving ? 'Creating...' : 'Create API Plan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}