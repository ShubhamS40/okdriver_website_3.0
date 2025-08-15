"use client";
import { useState } from "react";

export default function CreatePlan() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    durationDays: "",
    billingType: "", // To track month/year selection
    customDays: "", // For custom duration input
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBillingTypeChange = (type) => {
    setForm((prev) => ({
      ...prev,
      billingType: type,
      durationDays: "", // Reset duration when changing type
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.name || !form.price || !form.durationDays) {
      alert("❌ Please fill in all required fields (Name, Price, Duration)");
      return;
    }

    try {
      const res = await fetch("/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: form.price,
          durationDays: form.durationDays,
        }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        alert("✅ Plan created successfully!");
        // Reset form
        setForm({
          name: "",
          description: "",
          price: "",
          durationDays: "",
          billingType: "",
          customDays: "",
        });
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Server error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <button
        onClick={() => window.history.back()}
        className="text-sm text-gray-600 hover:underline mb-4"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-2xl font-bold mb-2">Create Subscription Plan</h1>
      <p className="text-gray-500 mb-6">
        Create a new subscription plan for your customers
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-6 rounded-lg space-y-6"
      >
        {/* Plan Information */}
        <div>
          <h2 className="font-semibold mb-4 text-lg">Plan Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Plan Name *</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Basic, Premium, Enterprise"
                className="w-full border rounded p-3"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Price (₹) *</label>
              <input
                type="number"
                name="price"
                placeholder="0.00"
                className="w-full border rounded p-3"
                value={form.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              name="description"
              placeholder="Describe the plan in a few sentences"
              className="w-full border rounded p-3"
              rows={3}
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Billing Cycle Selection */}
        <div>
          <h2 className="font-semibold mb-4 text-lg">Billing Cycle *</h2>
          
          {/* Month/Year Toggle */}
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => handleBillingTypeChange("month")}
              className={`px-4 py-2 rounded-md transition-colors ${
                form.billingType === "month"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Monthly Plans
            </button>
            <button
              type="button"
              onClick={() => handleBillingTypeChange("year")}
              className={`px-4 py-2 rounded-md transition-colors ${
                form.billingType === "year"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Yearly Plans
            </button>
            <button
              type="button"
              onClick={() => handleBillingTypeChange("custom")}
              className={`px-4 py-2 rounded-md transition-colors ${
                form.billingType === "custom"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Custom
            </button>
          </div>

          {/* Duration Options */}
          {form.billingType && form.billingType !== "custom" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {billingCycles[form.billingType].map((cycle) => (
                <button
                  key={cycle.days}
                  type="button"
                  onClick={() => handleDurationSelect(cycle.days)}
                  className={`p-3 border rounded-lg text-left transition-all ${
                    form.durationDays === String(cycle.days)
                      ? "border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-medium">{cycle.label}</div>
                  <div className="text-sm text-gray-500">{cycle.days} days</div>
                </button>
              ))}
            </div>
          )}

          {/* Custom Duration Input */}
          {form.billingType === "custom" && (
            <div className="mb-4">
              <label className="block mb-2 font-medium">Custom Duration (Days)</label>
              <input
                type="number"
                placeholder="Enter number of days"
                className="w-full md:w-64 border rounded p-3"
                value={form.customDays}
                onChange={handleCustomDaysChange}
                min="1"
                required
              />
            </div>
          )}

          {/* Selected Duration Display */}
          {form.durationDays && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <span className="text-green-800 font-medium">
                Selected Duration: {form.durationDays} days
                {form.durationDays <= 31 && " (Monthly)"}
                {form.durationDays > 31 && form.durationDays <= 366 && " (Yearly)"}
                {form.durationDays > 366 && " (Multi-year)"}
              </span>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t">
          <button
            type="submit"
            className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium"
          >
            Create Plan
          </button>
        </div>
      </form>
    </div>
  );
}