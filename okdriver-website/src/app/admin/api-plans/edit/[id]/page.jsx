'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function EditAPIPlan({ params }) {
  const router = useRouter();
  const { id } = params;
  
  const [planName, setPlanName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState(['']);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [daysValidity, setDaysValidity] = useState('30');
  const [durationType, setDurationType] = useState('monthly');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://backend.okdriver.in';
        const res = await fetch(`${apiUrl}/api/admin/api-plans/${id}`);
        if (!res.ok) throw new Error('Failed to fetch plan details');
        
        const data = await res.json();
        const plan = data.data;
        
        setPlanName(plan.name);
        setPrice(plan.price.toString());
        setDescription(plan.description || '');
        setFeatures(plan.features?.length ? plan.features : ['']);
        setIsActive(plan.isActive);
        
        // Set days validity and duration type
        setDaysValidity(plan.daysValidity.toString());
        if (plan.daysValidity === 30) setDurationType('monthly');
        else if (plan.daysValidity === 90) setDurationType('quarterly');
        else if (plan.daysValidity === 180) setDurationType('halfyearly');
        else if (plan.daysValidity === 365) setDurationType('yearly');
        else setDurationType('custom');
      } catch (error) {
        console.error('Error fetching plan:', error);
        toast.error('Failed to load plan details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlan();
  }, [id]);

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
        toast.error('You need to be logged in to update a plan');
        router.push('/admin/login');
        return;
      }
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://backend.okdriver.in';
      const response = await fetch(`${apiUrl}/api/admin/api-plans/${id}`, {
        method: 'PUT',
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
          isActive,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update API plan');
      }

      toast.success('API Plan updated successfully');
      router.push('/admin/api-plans');
    } catch (error) {
      console.error('Error updating API plan:', error);
      toast.error('Failed to update API plan');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-700">Loading plan details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button 
          onClick={() => router.push('/admin/api-plans')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 text-sm"
        >
          <span className="mr-2">←</span> Back to Plans
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Edit API Plan
          </h1>
          <p className="text-gray-600">
            Update your API plan details, features, and pricing
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
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
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the plan"
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            {/* Plan Duration */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plan Duration <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setDurationType('monthly');
                    setDaysValidity('30');
                  }}
                  className={`px-4 py-2 border rounded-md text-sm font-medium ${
                    durationType === 'monthly'
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDurationType('quarterly');
                    setDaysValidity('90');
                  }}
                  className={`px-4 py-2 border rounded-md text-sm font-medium ${
                    durationType === 'quarterly'
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Quarterly
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDurationType('halfyearly');
                    setDaysValidity('180');
                  }}
                  className={`px-4 py-2 border rounded-md text-sm font-medium ${
                    durationType === 'halfyearly'
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  6 Months
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDurationType('yearly');
                    setDaysValidity('365');
                  }}
                  className={`px-4 py-2 border rounded-md text-sm font-medium ${
                    durationType === 'yearly'
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Yearly
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDurationType('custom');
                  }}
                  className={`px-4 py-2 border rounded-md text-sm font-medium ${
                    durationType === 'custom'
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Custom
                </button>
              </div>

              {durationType === 'custom' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Duration (days)
                  </label>
                  <input
                    type="number"
                    value={daysValidity}
                    onChange={(e) => setDaysValidity(e.target.value)}
                    placeholder="Number of days"
                    className="w-full md:w-1/3 px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            {/* Status */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-gray-900"
                    name="status"
                    checked={isActive}
                    onChange={() => setIsActive(true)}
                  />
                  <span className="ml-2 text-gray-700">Active</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-gray-900"
                    name="status"
                    checked={!isActive}
                    onChange={() => setIsActive(false)}
                  />
                  <span className="ml-2 text-gray-700">Inactive</span>
                </label>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Plan Features
                </h2>
                <button
                  type="button"
                  onClick={addFeature}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Feature
                </button>
              </div>

              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="e.g., Unlimited API calls"
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="ml-2 p-2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => router.push('/admin/api-plans')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md mr-4 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}