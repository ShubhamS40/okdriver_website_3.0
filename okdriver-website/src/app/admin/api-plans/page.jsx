'use client'
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ApiPlansPage() {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://backend.okdriver.in';
        const res = await fetch(`${apiUrl}/api/admin/api-plans`);
        if (!res.ok) throw new Error('Failed to fetch api plans');
        const json = await res.json();
        setPlans(json.data || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this API plan?')) return;
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://backend.okdriver.in';
      // Backend expects DELETE /api/admin/api-plans/:id (path param). Fallback supports body id too.
      const res = await fetch(`${apiUrl}/api/admin/api-plans/${id}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        // Some deployments may still read id from body; keeping for safety
        body: JSON.stringify({ id })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        if (data.error === 'constraint_violation') {
          toast.error(data.message || 'Cannot delete this plan because it has active subscriptions');
        } else if (data.error === 'not_found') {
          toast.error('Plan not found or already deleted');
        } else if (data.error === 'invalid_id') {
          toast.error('Invalid plan id');
        } else {
          toast.error('Failed to delete API plan');
        }
        return;
      }
      // If backend archived instead of hard delete
      if (data.archived) {
        // Remove from list to match "deleted" behavior in UI
        setPlans(prev => prev.filter(p => p.id !== id));
        toast.success('Plan archived (it had subscriptions). It is removed from list.');
        return;
      }

      setPlans(prev => prev.filter(p => p.id !== id));
      toast.success('API Plan deleted successfully');
    } catch (e) {
      toast.error(e.message || 'Failed to delete API plan');
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
                  {plan.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="mt-4 mb-2">
                <span className="text-4xl font-bold"> ₹{Number(plan.price)}</span>
              </div>

              {/* Duration Badge */}
              <div className="mt-2 mb-4">
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                  {plan.daysValidity === 30 && 'Monthly Plan'}
                  {plan.daysValidity === 90 && 'Quarterly Plan'}
                  {plan.daysValidity === 180 && '6 Months Plan'}
                  {plan.daysValidity === 365 && 'Yearly Plan'}
                  {![30, 90, 180, 365].includes(plan.daysValidity) && `${plan.daysValidity} Days`}
                </span>
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
                {(plan.features || []).map((feature, idx) => (
                  <li key={idx} className="flex items-start text-gray-700 text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    <span>{feature}</span>
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
