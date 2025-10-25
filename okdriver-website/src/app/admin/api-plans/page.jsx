'use client'
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Check } from 'lucide-react';

export default function ApiPlansPage() {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock plans
  const mockPlans = [
    {
      id: 1,
      name: 'Starter',
      description: 'Perfect for small businesses getting started with driver management',
      price: 29,
      period: '/month',
      features: [
        'Basic DMS API access',
        'Driver management',
        'Vehicle tracking',
        'Email support',
        'Basic analytics',
      ],
      createdAt: '2024-01-15',
    },
    {
      id: 2,
      name: 'Professional',
      description: 'Ideal for growing companies with moderate API usage',
      price: 99,
      period: '/month',
      features: [
        'Full DMS API access',
        'OKDriver Assistant API',
        'Advanced analytics',
        'Priority support',
        'Webhook support',
        'Custom integrations',
      ],
      createdAt: '2024-01-10',
    },
    {
      id: 3,
      name: 'Enterprise',
      description: 'For large organizations with high-volume API requirements',
      price: 299,
      period: '/month',
      features: [
        'Unlimited API access',
        'Custom rate limits',
        'Dedicated support',
        'SLA guarantee',
        'Custom integrations',
        'Advanced security',
        'White-label options',
      ],
      createdAt: '2024-01-05',
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setPlans(mockPlans);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this API plan?')) {
      setPlans(prev => prev.filter(plan => plan.id !== id));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-700">Loading API plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">API Plans</h1>
            <p className="text-gray-600 mt-1">Manage your API pricing plans</p>
          </div>
          <a
            href="/admin/api-plans/create"
            className="flex items-center bg-black text-white px-5 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Plan
          </a>
        </div>
      </div>

      {/* Plans Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map(plan => (
          <div
            key={plan.id}
            className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all bg-white flex flex-col justify-between"
          >
            {/* Plan Header */}
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{plan.description}</p>
                </div>
                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                  Active
                </span>
              </div>

              <div className="mt-4 mb-2">
                <span className="text-4xl font-bold"> ${plan.price}</span>
                <span className="text-gray-500 ml-1">{plan.period}</span>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Created on{' '}
                {new Date(plan.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>

              <h4 className="text-sm font-semibold mb-3">FEATURES</h4>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start text-gray-700 text-sm">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 mr-2" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center border-t border-gray-200 pt-4">
              <a
                href={`/admin/api-plans/edit/${plan.id}`}
                className="flex items-center justify-center flex-1 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors mr-2"
              >
                <Edit className="w-4 h-4 mr-1" /> Edit
              </a>
              <button
                onClick={() => handleDelete(plan.id)}
                className="flex items-center justify-center bg-gray-100 text-black py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {plans.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-xl font-semibold mb-2">No API Plans Found</h3>
          <p className="text-gray-600 mb-6">
            Get started by creating your first API plan
          </p>
          <a
            href="/admin/api-plans/create"
            className="inline-flex items-center bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Plan
          </a>
        </div>
      )}
    </div>
  );
}
