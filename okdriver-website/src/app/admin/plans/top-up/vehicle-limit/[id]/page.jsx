"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VehicleLimitPlanDetail({ params }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlan, setEditedPlan] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch plan details
  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const response = await fetch(`https://backend.okdriver.in/api/admin/company/top-up-plan/vehicle-limit/vehicle-limit-plans/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch plan details');
        }
        
        const data = await response.json();
        setPlan(data.data);
        setEditedPlan(data.data);
      } catch (err) {
        console.error('Error fetching plan details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlanDetails();
  }, [id]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPlan(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle status toggle
  const handleStatusToggle = () => {
    setEditedPlan(prev => ({
      ...prev,
      isActive: !prev.isActive
    }));
  };

  // Handle save
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const payload = {
        name: editedPlan.name,
        description: editedPlan.description || '',
        price: parseFloat(editedPlan.price),
        vehicleCount: parseInt(editedPlan.vehicleLimit),
        isActive: editedPlan.isActive
      };
      
      const response = await fetch(`https://backend.okdriver.in/api/admin/company/top-up-plan/vehicle-limit/vehicle-limit-plans/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update plan');
      }
      
      const data = await response.json();
      setPlan(data.data);
      setIsEditing(false);
      alert('Plan updated successfully');
    } catch (err) {
      console.error('Error updating plan:', err);
      alert(`Failed to update plan: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this plan? This action cannot be undone.')) {
      return;
    }
    
    setDeleting(true);
    
    try {
      const response = await fetch(`https://backend.okdriver.in/api/admin/company/top-up-plan/vehicle-limit/vehicle-limit-plans/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete plan');
      }
      
      alert('Plan deleted successfully');
      router.push('/admin/plans/top-up');
    } catch (err) {
      console.error('Error deleting plan:', err);
      alert(`Failed to delete plan: ${err.message}`);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="container-custom py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>Error: {error || 'Plan not found'}</p>
          <Link href="/admin/plans/top-up" className="text-red-700 underline mt-2 inline-block">
            Back to Plans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/admin/plans/top-up" className="text-black hover:underline flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Plans
        </Link>
        <h1 className="text-3xl font-bold">Plan Details</h1>
      </div>

      {/* Status Indicator */}
      <div className={`mb-6 p-4 rounded-lg ${plan.isActive ? 'bg-green-50' : 'bg-gray-50'}`}>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${plan.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <p>
            This plan is currently <span className="font-semibold">{plan.isActive ? 'active' : 'inactive'}</span> and {plan.isActive ? 'available' : 'not available'} to customers
          </p>
        </div>
      </div>

      {/* Plan Information */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Plan Information</h2>
            <div className="space-x-2">
              {isEditing ? (
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                  >
                    Edit Plan
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                  >
                    {deleting ? 'Deleting...' : 'Delete Plan'}
                  </button>
                </>
              )}
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Plan Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editedPlan.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={editedPlan.price}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                {/* Vehicle Limit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Limit</label>
                  <input
                    type="number"
                    name="vehicleLimit"
                    value={editedPlan.vehicleLimit}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    min="1"
                    required
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className="flex items-center mt-2">
                    <button
                      type="button"
                      onClick={handleStatusToggle}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none ${editedPlan.isActive ? 'bg-black' : 'bg-gray-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${editedPlan.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                    <span className="ml-2 text-sm">{editedPlan.isActive ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="col-span-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={editedPlan.description || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md h-24"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Plan Name</h3>
                <p className="mt-1">{plan.name}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Price</h3>
                <p className="mt-1">₹{plan.price}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Vehicle Limit</h3>
                <p className="mt-1">{plan.vehicleLimit} vehicles</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p className="mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${plan.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {plan.isActive ? 'Active' : 'Inactive'}
                  </span>
                </p>
              </div>

              <div className="col-span-full">
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1">{plan.description || 'No description provided'}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                <p className="mt-1">{new Date(plan.createdAt).toLocaleDateString()}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                <p className="mt-1">{new Date(plan.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}