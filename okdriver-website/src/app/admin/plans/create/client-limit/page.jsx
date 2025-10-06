"use client";
import { useState } from "react";
import Link from "next/link";

export default function CreateClientLimitPlan() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    clientCount: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!form.name || !form.price || !form.clientCount) {
      alert("Please fill all required fields");
      return;
    }

    // Prepare data for API
    const planData = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      clientCount: parseInt(form.clientCount),
      isActive: true
    };

    try {
      const response = await fetch('https://backend.okdriver.in/api/admin/company/top-up-plan/client-limit/client-limit-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(planData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Client Limit Plan created successfully!');
        // Reset form or redirect
        setForm({
          name: "",
          description: "",
          price: "",
          clientCount: ""
        });
      } else {
        alert(`Error: ${data.message || 'Failed to create plan'}`);
      }
    } catch (error) {
      console.error('Error creating plan:', error);
      alert('Failed to create plan. Please try again.');
    }
  };

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <Link href="/admin/plans" className="text-black hover:underline flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Plans
        </Link>
        <h1 className="text-3xl font-bold">Create Client Limit Plan</h1>
        <p className="text-gray-600">Create a new subscription plan with client count limit</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plan Name */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter plan name"
              required
            />
          </div>

          {/* Price */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Client Count */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Client Count Limit *</label>
            <input
              type="number"
              name="clientCount"
              value={form.clientCount}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Maximum number of clients"
              min="1"
              required
            />
          </div>

          {/* Note about Top-up Plan */}
          <div className="col-span-1">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h3 className="font-medium text-blue-800 mb-1">Top-up Plan Information</h3>
              <p className="text-sm text-blue-600">
                This is a top-up plan for extending client limits. Duration will automatically align with the company's current subscription period.
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter plan description"
              rows="3"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Plan
          </button>
        </div>
      </form>
    </div>
  );
}