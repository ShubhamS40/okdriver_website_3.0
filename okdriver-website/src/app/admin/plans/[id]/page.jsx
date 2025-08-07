'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

// Mock data for subscription plans
const mockPlans = [
  {
    id: 1,
    name: 'Basic',
    price: 99.99,
    billingCycle: 'monthly',
    description: 'Essential safety features for individual drivers',
    benefits: [
      '24/7 Drowsiness Monitoring',
      'Basic Voice Assistant',
      'SOS Alert System',
      'Standard Support'
    ],
    services: ['drowsinessMonitoring', 'sosAlert'],
    subscribers: 128,
    status: 'active',
    storageAllocation: 10, // GB
    createdAt: '2023-01-15',
    updatedAt: '2023-04-20'
  },
  {
    id: 2,
    name: 'Premium',
    price: 199.99,
    billingCycle: 'monthly',
    description: 'Advanced features for professional drivers',
    benefits: [
      '24/7 Drowsiness Monitoring',
      'Advanced Voice Assistant',
      'SOS Alert System with GPS Tracking',
      'Priority Support',
      'Performance Analytics'
    ],
    services: ['drowsinessMonitoring', 'voiceAssistant', 'sosAlert'],
    subscribers: 85,
    status: 'active',
    storageAllocation: 25, // GB
    createdAt: '2023-01-15',
    updatedAt: '2023-05-10'
  },
  {
    id: 3,
    name: 'Enterprise',
    price: 499.99,
    billingCycle: 'monthly',
    description: 'Complete solution for fleet management',
    benefits: [
      '24/7 Drowsiness Monitoring',
      'Advanced Voice Assistant',
      'SOS Alert System with GPS Tracking',
      'Fleet Management Dashboard',
      'Driver Performance Analytics',
      'API Integration',
      'Dedicated Support'
    ],
    services: ['drowsinessMonitoring', 'voiceAssistant', 'sosAlert'],
    subscribers: 42,
    status: 'active',
    storageAllocation: 50, // GB
    createdAt: '2023-02-01',
    updatedAt: '2023-05-15'
  },
  {
    id: 4,
    name: 'Summer Special',
    price: 149.99,
    billingCycle: 'quarterly',
    description: 'Limited time offer with special pricing',
    benefits: [
      '24/7 Drowsiness Monitoring',
      'Basic Voice Assistant',
      'SOS Alert System',
      'Standard Support'
    ],
    services: ['drowsinessMonitoring', 'voiceAssistant', 'sosAlert'],
    subscribers: 17,
    status: 'inactive',
    storageAllocation: 15, // GB
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01'
  },
  {
    id: 5,
    name: 'Day Pass',
    price: 9.99,
    billingCycle: 'daily',
    description: 'Pay-as-you-go option for occasional drivers',
    benefits: [
      '24-hour Drowsiness Monitoring',
      'Basic Voice Assistant',
      'SOS Alert System',
      'Email Support'
    ],
    services: ['drowsinessMonitoring', 'sosAlert'],
    subscribers: 56,
    status: 'active',
    storageAllocation: 5, // GB
    createdAt: '2023-06-01',
    updatedAt: '2023-06-01'
  }
];

// Mock subscribers data
const mockSubscribers = [
  { id: 101, name: 'John Smith', email: 'john@example.com', type: 'Individual', subscribedDate: '2023-04-15', planId: 1 },
  { id: 102, name: 'Emma Davis', email: 'emma@example.com', type: 'Individual', subscribedDate: '2023-04-18', planId: 1 },
  { id: 103, name: 'Michael Johnson', email: 'michael@example.com', type: 'Individual', subscribedDate: '2023-04-20', planId: 1 },
  { id: 104, name: 'Sarah Wilson', email: 'sarah@example.com', type: 'Individual', subscribedDate: '2023-04-22', planId: 2 },
  { id: 105, name: 'David Brown', email: 'david@example.com', type: 'Individual', subscribedDate: '2023-04-25', planId: 2 },
  { id: 201, name: 'City Express Logistics', email: 'contact@cityexpress.com', type: 'Fleet', subscribedDate: '2023-03-10', planId: 3 },
  { id: 202, name: 'FastTrack Delivery', email: 'info@fasttrackdelivery.com', type: 'Fleet', subscribedDate: '2023-03-15', planId: 3 },
  { id: 203, name: 'Metro Cab Services', email: 'dispatch@metrocab.com', type: 'Fleet', subscribedDate: '2023-05-05', planId: 4 },
];

export default function PlanDetails() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [plan, setPlan] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlan, setEditedPlan] = useState(null);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const planId = parseInt(params.id);
    const planData = mockPlans.find(p => p.id === planId);
    
    if (planData) {
      setPlan(planData);
      setEditedPlan({
        ...planData,
        benefits: planData.benefits.join('\n')
      });
      
      // Get subscribers for this plan
      const planSubscribers = mockSubscribers.filter(s => s.planId === planId);
      setSubscribers(planSubscribers);
    } else {
      // Plan not found, redirect to plans list
      router.push('/admin/plans');
    }
  }, [params.id, router]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process benefits from textarea to array
    const processedPlan = {
      ...editedPlan,
      benefits: editedPlan.benefits.split('\n').filter(benefit => benefit.trim() !== '')
    };
    
    // In a real app, this would be an API call to update the plan
    console.log('Updated plan:', processedPlan);
    
    // Update local state
    setPlan(processedPlan);
    setIsEditing(false);
    
    // Show success message
    alert('Plan updated successfully!');
  };

  if (!plan) {
    return (
      <div className="container-custom py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
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
            <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors">
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