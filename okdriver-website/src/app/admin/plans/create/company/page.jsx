"use client";
import { useState } from "react";

export default function CreatePlan() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    durationDays: "",
    billingType: "",
    customDays: "",
    vehicleLimit: "",
    storageLimit: "",
    features: [],
    services: [],
    advantages: ""
  });

  // Predefined billing cycles
  const billingCycles = {
    month: [
      { label: "1 Month", days: 30 },
      { label: "3 Months", days: 90 },
      { label: "6 Months", days: 180 },
    ],
    year: [
      { label: "1 Year", days: 365 },
      { label: "2 Years", days: 730 },
      { label: "3 Years", days: 1095 },
    ]
  };

  // Available features for fleet management
  const availableFeatures = [
    "24/7 Drowsiness Monitoring",
    "Advanced Voice Assistant",
    "Basic Voice Assistant",
    "SOS Alert System",
    "SOS Alert System with GPS Tracking",
    "Standard Support",
    "Priority Support",
    "Dedicated Support",
    "Performance Analytics",
    "Driver Performance Analytics",
    "Fleet Management Dashboard",
    "API Integration",
    "Real-time Vehicle Tracking",
    "Route Optimization",
    "Fuel Management",
    "Maintenance Scheduling",
    "Driver Behavior Analysis",
    "Geofencing",
    "Speed Monitoring",
    "Emergency Response"
  ];

  // Available services
  const availableServices = [
    { id: "drowsiness", name: "Drowsiness Monitoring", color: "blue" },
    { id: "voice", name: "Voice Assistant", color: "purple" },
    { id: "sos", name: "SOS Alert", color: "red" },
    { id: "tracking", name: "GPS Tracking", color: "green" },
    { id: "analytics", name: "Analytics", color: "orange" },
    { id: "maintenance", name: "Maintenance", color: "cyan" },
    { id: "support", name: "Support", color: "gray" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBillingTypeChange = (type) => {
    setForm((prev) => ({
      ...prev,
      billingType: type,
      durationDays: "",
      customDays: ""
    }));
  };

  const handleDurationSelect = (days) => {
    setForm((prev) => ({
      ...prev,
      durationDays: String(days),
      customDays: ""
    }));
  };

  const handleCustomDaysChange = (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      customDays: value,
      durationDays: value
    }));
  };

  const handleFeatureToggle = (feature) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleServiceToggle = (serviceId) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const getDurationLabel = () => {
    const days = parseInt(form.durationDays);
    if (!days) return "";
    if (days <= 31) return "Monthly";
    if (days <= 366) return "Yearly";
    return "Multi-year";
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!form.name || !form.price || !form.durationDays || !form.vehicleLimit) {
      alert("❌ Please fill in all required fields (Name, Price, Duration, Vehicle Limit)");
      return;
    }
    if (form.features.length === 0) {
      alert("❌ Please select at least one feature");
      return;
    }
    // Services are optional per requirement

    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    if (!token) {
      alert('Admin auth required. Please login again.');
      return;
    }

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      durationDays: Number(form.durationDays),
      billingCycle: getDurationLabel(),
      keyAdvantages: form.advantages
        ? form.advantages.split('\n').map(s => s.trim()).filter(Boolean)
        : [],
      vehicleLimit: Number(form.vehicleLimit),
      storageLimitGB: form.storageLimit ? Number(form.storageLimit) : 10,
      // NOTE: Backend expects numeric IDs for features/services.
      // For now, send empty arrays unless you map them to IDs.
      features: [],
      services: []
    };

    try {
      const res = await fetch('http://localhost:5000/api/admin/companyplan/creation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        console.error('Company plan creation failed:', data);
        alert(data?.error || data?.message || 'Failed to create plan');
        return;
      }

      alert('✅ Plan created successfully!');
      setForm({
        name: "",
        description: "",
        price: "",
        durationDays: "",
        billingType: "",
        customDays: "",
        vehicleLimit: "",
        storageLimit: "",
        features: [],
        services: [],
        advantages: ""
      });
    } catch (error) {
      console.error(error);
      alert('❌ Network error');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 min-h-screen">
      <button
        onClick={() => window.history.back()}
        className="text-sm text-gray-600 hover:underline mb-4 flex items-center gap-2"
      >
        ← Back to Plans
      </button>

      <h1 className="text-3xl font-bold mb-2">Create Company Subscription Plan</h1>
      <p className="text-gray-600 mb-8">
        Create a comprehensive subscription plan for fleet operators with customizable features and services
      </p>

      <div className="space-y-8">
        
        {/* Basic Plan Information */}
        <div className="bg-white shadow-lg p-6 rounded-xl">
          <h2 className="font-bold mb-6 text-xl text-gray-800">Basic Plan Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Plan Name *</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Basic, Premium, Enterprise"
                className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Price (₹) *</label>
              <input
                type="number"
                name="price"
                placeholder="99.99"
                className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
                value={form.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block mb-2 font-semibold text-gray-700">Plan Description</label>
            <textarea
              name="description"
              placeholder="Describe what this plan offers to fleet operators"
              className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
              rows={3}
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="mt-6">
            <label className="block mb-2 font-semibold text-gray-700">Key Advantages</label>
            <textarea
              name="advantages"
              placeholder="List the main advantages and benefits of this plan"
              className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
              rows={3}
              value={form.advantages}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Plan Limits */}
        <div className="bg-white shadow-lg p-6 rounded-xl">
          <h2 className="font-bold mb-6 text-xl text-gray-800">Plan Limits & Capacity</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Vehicle Limit *</label>
              <input
                type="number"
                name="vehicleLimit"
                placeholder="e.g. 50, 100, 500"
                className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
                value={form.vehicleLimit}
                onChange={handleChange}
                min="1"
                required
              />
              <p className="text-sm text-gray-500 mt-1">Maximum number of vehicles that can be added to this plan</p>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Storage Allocation (GB)</label>
              <input
                type="number"
                name="storageLimit"
                placeholder="10"
                className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
                value={form.storageLimit}
                onChange={handleChange}
                min="1"
              />
              <p className="text-sm text-gray-500 mt-1">Data storage limit for this plan (default: 10 GB)</p>
            </div>
          </div>
        </div>

        {/* Billing Duration */}
        <div className="bg-white shadow-lg p-6 rounded-xl">
          <h2 className="font-bold mb-6 text-xl text-gray-800">Billing Duration *</h2>
          
          {/* Duration Type Selection */}
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={() => handleBillingTypeChange("month")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                form.billingType === "month"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Monthly Plans
            </button>
            <button
              type="button"
              onClick={() => handleBillingTypeChange("year")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                form.billingType === "year"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Yearly Plans
            </button>
            <button
              type="button"
              onClick={() => handleBillingTypeChange("custom")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                form.billingType === "custom"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Custom Duration
            </button>
          </div>

          {/* Duration Options */}
          {form.billingType && form.billingType !== "custom" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {billingCycles[form.billingType].map((cycle) => (
                <button
                  key={cycle.days}
                  type="button"
                  onClick={() => handleDurationSelect(cycle.days)}
                  className={`p-4 border-2 rounded-xl text-left transition-all ${
                    form.durationDays === String(cycle.days)
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-semibold text-lg">{cycle.label}</div>
                  <div className="text-sm text-gray-600">{cycle.days} days</div>
                </button>
              ))}
            </div>
          )}

          {/* Custom Duration Input */}
          {form.billingType === "custom" && (
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-gray-700">Custom Duration (Days)</label>
              <input
                type="number"
                placeholder="Enter number of days"
                className="w-full md:w-80 border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
                value={form.customDays}
                onChange={handleCustomDaysChange}
                min="1"
                required
              />
            </div>
          )}

          {/* Selected Duration Display */}
          {form.durationDays && (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-800 font-semibold">
                  Selected Duration: {form.durationDays} days ({getDurationLabel()})
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Plan Features */}
        <div className="bg-white shadow-lg p-6 rounded-xl">
          <h2 className="font-bold mb-6 text-xl text-gray-800">Plan Features *</h2>
          <p className="text-gray-600 mb-4">Select the features included in this subscription plan</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {availableFeatures.map((feature) => (
              <div
                key={feature}
                onClick={() => handleFeatureToggle(feature)}
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  form.features.includes(feature)
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    form.features.includes(feature)
                      ? "border-green-500 bg-green-500"
                      : "border-gray-300"
                  }`}>
                    {form.features.includes(feature) && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              </div>
            ))}
          </div>
          
          {form.features.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <span className="text-blue-800 font-medium">
                {form.features.length} feature{form.features.length > 1 ? 's' : ''} selected
              </span>
            </div>
          )}
        </div>


        {/* Plan Preview */}
        {(form.name && form.price && form.durationDays && form.features.length > 0) && (
          <div className="bg-white shadow-lg p-6 rounded-xl border-2 border-blue-200">
            <h2 className="font-bold mb-6 text-xl text-gray-800">Plan Preview</h2>
            
            <div className="border-2 border-gray-200 rounded-xl p-6 max-w-md">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{form.name}</h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
              </div>
              
              <div className="mb-4">
                <span className="text-3xl font-bold">₹{form.price}</span>
                <span className="text-gray-600">/{getDurationLabel().toLowerCase()}</span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">
                {form.description || "Essential safety features for fleet operators"}
              </p>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Benefits:</h4>
                <div className="space-y-1">
                  {form.features.slice(0, 4).map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
           
              
              <div className="text-sm text-gray-600 mb-4">
                Up to {form.vehicleLimit || '∞'} vehicles
              </div>
              
              <button
                type="button"
                className="w-full bg-black text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="bg-white shadow-lg p-6 rounded-xl">
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
            >
              Create Subscription Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}