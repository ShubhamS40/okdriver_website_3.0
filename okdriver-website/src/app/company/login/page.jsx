"use client"
import React, { useState } from 'react';

const CompanyLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loginResponse, setLoginResponse] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/company/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage (in real app, consider more secure storage)
        localStorage.setItem('companyToken', data.token);
        
        setLoginResponse(data);
        
        if (data.hasActivePlan) {
          // Redirect to dashboard
          window.location.href = '/company/dashboard';
        } else {
          // If no active plan, show plan selection
          // Component will render plan selection UI
        }
        // If no active plan, component will show plan selection
      } else {
        // Handle API errors
        if (response.status === 404) {
          setErrors({ email: 'Company not found with this email' });
        } else if (response.status === 400) {
          setErrors({ password: 'Invalid password' });
        } else {
          setErrors({ submit: data.message || 'Login failed' });
        }
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlanSelection = (planId) => {
    // Redirect to subscription page with selected plan
    window.location.href = `/company/subscription?planId=${planId}`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  // Show plan selection if login successful but no active plan
  if (loginResponse && !loginResponse.hasActivePlan) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">OK</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-black">
              Welcome, {loginResponse.company.name}!
            </h2>
            <p className="mt-2 text-gray-600">
              Choose a subscription plan to get started with OKDriver
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loginResponse.plans.map((plan) => (
              <div key={plan.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-black transition-all">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-black mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-black mb-1">
                    ₹{plan.price}
                    <span className="text-lg text-gray-600">/{plan.duration}</span>
                  </div>
                  {plan.description && (
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  )}
                  <button
                    onClick={() => handlePlanSelection(plan.id)}
                    className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setLoginResponse(null)}
              className="text-gray-600 hover:text-black transition-colors"
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            {/* <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">OK</span>
            </div> */}
          </div>
          <h2 className="text-3xl font-bold text-black">
            Company Login
          </h2>
          <p className="mt-2 text-gray-600">
            Sign in to your OKDriver company account
          </p>
        </div>

        {/* Form */}
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                placeholder="Enter your company email"
              />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-black transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 bg-white border-gray-300 rounded focus:ring-black focus:ring-2"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="/forgot-password" className="text-black hover:text-gray-700 transition-colors">
                Forgot your password?
              </a>
            </div>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <a href="/company/signup" className="text-black hover:text-gray-700 transition-colors font-medium">
                Register your company
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogin;