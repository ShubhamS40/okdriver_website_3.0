'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function PlanDetails() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [plan, setPlan] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlan, setEditedPlan] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [subscribers, setSubscribers] = useState([]); // Add missing subscribers state

  // Avoid SSR/client HTML mismatch by rendering after mount only
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDriverPlan = mounted ? String(params.id || '').startsWith('driver-') : false;
  const rawId = mounted ? String(params.id || '').split('-')[1] : '';

  const loadPlan = async () => {
    if (!mounted) return; // Don't load until mounted
    
    setLoading(true);
    setError('');
    try {
      if (isDriverPlan) {
        const res = await fetch('https://backend.okdriver.in/api/admin/driverplan/driver-plans');
        const json = await res.json();
        const found = Array.isArray(json?.data) ? json.data.find(p => String(p.id) === rawId) : null;
        if (!found) throw new Error('Plan not found');
        const mapped = {
          id: `driver-${found.id}`,
          type: 'driver',
          name: found.name,
          price: Number(found.price),
          billingCycle: typeof found.billingCycle === 'string' ? found.billingCycle : String(found.billingCycle),
          description: found.description || '',
          benefits: Array.isArray(found.benefits) ? found.benefits : [],
          services: Array.isArray(found.services) ? found.services.map(s => s.name || String(s)) : [],
          storageAllocation: found.storageLimitGB || 0,
          status: found.isActive ? 'active' : 'inactive',
          subscribers: found.subscriberCount || 0, // Add default values
          createdAt: found.createdAt ? new Date(found.createdAt).toLocaleDateString() : 'N/A',
          updatedAt: found.updatedAt ? new Date(found.updatedAt).toLocaleDateString() : 'N/A',
        };
        setPlan(mapped);
        setEditedPlan({ ...mapped, benefits: mapped.benefits.join('\n') });
        
        // Mock subscribers data for now - replace with actual API call
        setSubscribers([]);
        
      } else {
        const res = await fetch('https://backend.okdriver.in/api/admin/companyplan/list');
        const json = await res.json();
        const found = Array.isArray(json?.data) ? json.data.find(p => String(p.id) === rawId) : null;
        if (!found) throw new Error('Plan not found');
        const mapped = {
          id: `company-${found.id}`,
          type: 'company',
          name: found.name,
          price: Number(found.price),
          billingCycle: found.billingCycle || 'custom',
          description: found.description || '',
          benefits: Array.isArray(found.keyAdvantages) ? found.keyAdvantages : [],
          services: Array.isArray(found.services) ? found.services.map(s => s.name || String(s)) : [],
          storageAllocation: found.storageLimitGB || 0,
          status: found.isActive ? 'active' : 'inactive',
          subscribers: found.subscriberCount || 0, // Add default values
          createdAt: found.createdAt ? new Date(found.createdAt).toLocaleDateString() : 'N/A',
          updatedAt: found.updatedAt ? new Date(found.updatedAt).toLocaleDateString() : 'N/A',
        };
        setPlan(mapped);
        setEditedPlan({ ...mapped, benefits: mapped.benefits.join('\n') });
        
        // Mock subscribers data for now - replace with actual API call
        setSubscribers([]);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load plan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted) {
      loadPlan();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, mounted]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing, reset form
      setEditedPlan({
        ...plan,
        benefits: plan.benefits.join('\n')
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPlan({
      ...editedPlan,
      [name]: value
    });
  };

  const handleServiceChange = (service) => {
    const updatedServices = [...editedPlan.services];
    
    if (updatedServices.includes(service)) {
      // Remove service if already included
      const index = updatedServices.indexOf(service);
      updatedServices.splice(index, 1);
    } else {
      // Add service if not included
      updatedServices.push(service);
    }
    
    setEditedPlan({
      ...editedPlan,
      services: updatedServices
    });
  };

  const handleStatusToggle = () => {
    setEditedPlan({
      ...editedPlan,
      status: editedPlan.status === 'active' ? 'inactive' : 'active'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const benefitsArray = editedPlan.benefits.split('\n').map(b => b.trim()).filter(Boolean);

    try {
      if (isDriverPlan) {
        const payload = {
          name: editedPlan.name,
          description: editedPlan.description,
          price: Number(editedPlan.price),
          billingCycle: editedPlan.billingCycle,
          benefits: benefitsArray,
          storageLimitGB: Number(editedPlan.storageAllocation),
        };
        const res = await fetch(`https://backend.okdriver.in/api/admin/driverplan/driver-plans/${rawId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Failed to update plan');
      } else {
        const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
        if (!token) {
          alert('Admin auth required. Please login again.');
          return;
        }
        const payload = {
          planId: Number(rawId),
        };
        // Company update endpoint updates selection; we need to update plan itself
        // Use dedicated update endpoint
        const res = await fetch(`https://backend.okdriver.in/api/admin/companyplan/update/${rawId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({
            name: editedPlan.name,
            description: editedPlan.description,
            price: Number(editedPlan.price),
            durationDays: undefined,
            billingCycle: editedPlan.billingCycle,
            keyAdvantages: benefitsArray,
            vehicleLimit: undefined,
            storageLimitGB: Number(editedPlan.storageAllocation) || undefined,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || data?.message || 'Failed to update plan');
      }

      await loadPlan();
      setIsEditing(false);
      alert('Plan updated successfully!');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Update failed');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this plan?')) return;
    try {
      if (isDriverPlan) {
        const res = await fetch(`https://backend.okdriver.in/api/admin/driverplan/driver-plans/${rawId}`, { method: 'DELETE' });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || 'Failed to delete plan');
      } else {
        const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
        if (!token) {
          alert('Admin auth required. Please login again.');
          return;
        }
        const res = await fetch(`https://backend.okdriver.in/api/admin/companyplan/delete/${rawId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || data?.message || 'Failed to delete plan');
      }
      alert('Plan deleted');
      router.push('/admin/plans');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Delete failed');
    }
  };

  // Show loading state until mounted and plan is loaded
  if (!mounted || loading || !plan) {
    return (
      <div className="container-custom py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container-custom py-8">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={loadPlan} 
            className="mt-4 btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link href="/admin/plans" className="text-black hover:underline flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Plans
          </Link>
          <h1 className="text-3xl font-bold">{isEditing ? 'Edit Plan' : 'Plan Details'}</h1>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleEditToggle}
            className={isEditing ? "btn-secondary" : "btn-primary"}
          >
            {isEditing ? 'Cancel' : 'Edit Plan'}
          </button>
          {!isEditing && (
            <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors">
              Delete Plan
            </button>
          )}
        </div>
      </div>

      {/* Plan Status Banner */}
      <div className={`mb-6 p-4 rounded-lg ${plan.status === 'active' ? 'bg-green-100' : 'bg-red-100'}`}>
        <div className="flex items-center">
          <div className={`h-3 w-3 rounded-full mr-2 ${plan.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="font-medium">
            {plan.status === 'active' ? 'This plan is currently active and available to customers' : 'This plan is currently inactive and not available to customers'}
          </span>
        </div>
      </div>

      {/* Tabs - Only show when not editing */}
      {!isEditing && (
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('subscribers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'subscribers' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Subscribers ({subscribers.length})
            </button>
          </nav>
        </div>
      )}

      {/* Edit Form */}
      {isEditing ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Plan Basic Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Plan Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        value={editedPlan.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Billing Cycle</label>
                      <div className="flex flex-wrap space-x-4">
                        <label className="inline-flex items-center mb-2">
                          <input
                            type="radio"
                            className="form-radio h-4 w-4 text-black"
                            name="billingCycle"
                            value="daily"
                            checked={editedPlan.billingCycle === 'daily'}
                            onChange={() => setEditedPlan({...editedPlan, billingCycle: 'daily'})}
                          />
                          <span className="ml-2">Daily</span>
                        </label>
                        <label className="inline-flex items-center mb-2">
                          <input
                            type="radio"
                            className="form-radio h-4 w-4 text-black"
                            name="billingCycle"
                            value="monthly"
                            checked={editedPlan.billingCycle === 'monthly'}
                            onChange={() => setEditedPlan({...editedPlan, billingCycle: 'monthly'})}
                          />
                          <span className="ml-2">Monthly</span>
                        </label>
                        <label className="inline-flex items-center mb-2">
                          <input
                            type="radio"
                            className="form-radio h-4 w-4 text-black"
                            name="billingCycle"
                            value="quarterly"
                            checked={editedPlan.billingCycle === 'quarterly'}
                            onChange={() => setEditedPlan({...editedPlan, billingCycle: 'quarterly'})}
                          />
                          <span className="ml-2">3 Months</span>
                        </label>
                        <label className="inline-flex items-center mb-2">
                          <input
                            type="radio"
                            className="form-radio h-4 w-4 text-black"
                            name="billingCycle"
                            value="yearly"
                            checked={editedPlan.billingCycle === 'yearly'}
                            onChange={() => setEditedPlan({...editedPlan, billingCycle: 'yearly'})}
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
                          name="price"
                          className="w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                          value={editedPlan.price}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">
                            {editedPlan.billingCycle === 'daily' ? '/day' :
                             editedPlan.billingCycle === 'monthly' ? '/month' : 
                             editedPlan.billingCycle === 'quarterly' ? '/quarter' : '/year'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <div className="flex items-center">
                        <button 
                          type="button"
                          onClick={handleStatusToggle}
                          className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${editedPlan.status === 'active' ? 'bg-green-500' : 'bg-gray-200'}`}
                        >
                          <span className="sr-only">Toggle Status</span>
                          <span 
                            className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${editedPlan.status === 'active' ? 'translate-x-5' : 'translate-x-0'}`}
                          />
                        </button>
                        <span className="ml-3 text-sm">
                          {editedPlan.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
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
                      name="description"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      value={editedPlan.description}
                      onChange={handleInputChange}
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
                      name="benefits"
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      value={editedPlan.benefits}
                      onChange={handleInputChange}
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
                          checked={editedPlan.services.includes('drowsinessMonitoring')}
                          onChange={() => handleServiceChange('drowsinessMonitoring')}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="drowsinessMonitoring" className="font-medium text-gray-700">Drowsiness Monitoring System</label>
                        <p className="text-gray-500">AI-powered system to detect driver drowsiness</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="voiceAssistant"
                          type="checkbox"
                          className="h-4 w-4 text-black border-gray-300 rounded"
                          checked={editedPlan.services.includes('voiceAssistant')}
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
                          checked={editedPlan.services.includes('sosAlert')}
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="storageAllocation" className="block text-sm font-medium text-gray-700">Storage (GB)</label>
                      <span className="text-sm font-medium">{editedPlan.storageAllocation} GB</span>
                    </div>
                    <input
                      type="range"
                      id="storageAllocation"
                      name="storageAllocation"
                      min="1"
                      max="100"
                      value={editedPlan.storageAllocation}
                      onChange={handleInputChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-3">
              <button 
                type="button" 
                onClick={handleEditToggle}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Plan Information */}
              <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
                <h2 className="text-xl font-semibold mb-4">Plan Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Plan Name</p>
                    <p className="font-medium">{plan.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-medium">₹{plan.price} / {plan.billingCycle === 'daily' ? 'day' : plan.billingCycle === 'monthly' ? 'month' : plan.billingCycle === 'quarterly' ? '3 months' : 'year'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className={`font-medium ${plan.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                      {plan.status === 'active' ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Subscribers</p>
                    <p className="font-medium">{plan.subscribers}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="font-medium">{plan.createdAt}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-medium">{plan.updatedAt}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="mt-1">{plan.description}</p>
                </div>
              </div>

              {/* Plan Stats */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Plan Statistics</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-gray-500 text-sm font-medium mb-1">Active Subscribers</h3>
                    <p className="text-3xl font-bold">{plan.subscribers}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-gray-500 text-sm font-medium mb-1">Storage Allocation</h3>
                    <p className="text-3xl font-bold">{plan.storageAllocation} GB</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-gray-500 text-sm font-medium mb-1">Monthly Revenue</h3>
                    <p className="text-3xl font-bold">₹{(plan.price * plan.subscribers).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
                <h2 className="text-xl font-semibold mb-4">Plan Benefits</h2>
                <ul className="space-y-2">
                  {plan.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Included Services</h2>
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${plan.services.includes('drowsinessMonitoring') ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 text-gray-400'}`}>
                    <div className="flex items-center">
                      <div className={`h-4 w-4 rounded-full mr-2 ${plan.services.includes('drowsinessMonitoring') ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                      <h3 className="font-medium">Drowsiness Monitoring</h3>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${plan.services.includes('voiceAssistant') ? 'bg-purple-50 border border-purple-100' : 'bg-gray-50 text-gray-400'}`}>
                    <div className="flex items-center">
                      <div className={`h-4 w-4 rounded-full mr-2 ${plan.services.includes('voiceAssistant') ? 'bg-purple-500' : 'bg-gray-300'}`}></div>
                      <h3 className="font-medium">Voice Assistant</h3>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${plan.services.includes('sosAlert') ? 'bg-red-50 border border-red-100' : 'bg-gray-50 text-gray-400'}`}>
                    <div className="flex items-center">
                      <div className={`h-4 w-4 rounded-full mr-2 ${plan.services.includes('sosAlert') ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                      <h3 className="font-medium">SOS Alert</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subscribers Tab */}
          {activeTab === 'subscribers' && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">Plan Subscribers</h2>
                  <p className="text-gray-500">Users currently subscribed to this plan</p>
                </div>
                <button className="btn-secondary text-sm py-1">
                  Export List
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subscribed Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subscribers.map((subscriber) => (
                      <tr key={subscriber.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {subscriber.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {subscriber.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {subscriber.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${subscriber.type === 'Individual' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                            {subscriber.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {subscriber.subscribedDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link 
                            href={subscriber.type === 'Individual' ? `/admin/drivers/${subscriber.id}` : `/admin/fleet/${subscriber.id}`} 
                            className="text-black hover:text-gray-700 mr-3"
                          >
                            View
                          </Link>
                          <button className="text-black hover:text-gray-700">
                            Change Plan
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {subscribers.length === 0 && (
                <div className="py-8 text-center text-gray-500">
                  No subscribers found for this plan.
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}