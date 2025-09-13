'use client'
import { useState, useEffect } from 'react';

export const useVehicleLimit = () => {
  const [companyPlan, setCompanyPlan] = useState(null);
  const [currentVehicleCount, setCurrentVehicleCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch company plan details
  const fetchCompanyPlan = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('companyToken') : null;
      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }

      console.log('Fetching company plan with token:', token.substring(0, 20) + '...');
      
      const response = await fetch('/api/company/plan', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Plan API response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Plan API error:', errorData);
        throw new Error(`Failed to fetch company plan: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('Plan data received:', data);
      setCompanyPlan(data);
    } catch (err) {
      console.error('Error fetching company plan:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch current vehicle count
  const fetchVehicleCount = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('companyToken') : null;
      if (!token) return;

      const response = await fetch('http://localhost:5000/api/company/vehicles', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const vehicleData = data.data || data;
        const count = Array.isArray(vehicleData) ? vehicleData.length : 0;
        setCurrentVehicleCount(count);
      }
    } catch (err) {
      console.error('Error fetching vehicle count:', err);
    }
  };

  // Check if adding a vehicle would exceed the limit
  const canAddVehicle = () => {
    if (!companyPlan) return false;
    if (companyPlan.maxVehicles === null || companyPlan.maxVehicles === undefined) return true; // Unlimited
    return currentVehicleCount < companyPlan.maxVehicles;
  };

  // Get remaining vehicle slots
  const getRemainingSlots = () => {
    if (!companyPlan) return 0;
    if (companyPlan.maxVehicles === null || companyPlan.maxVehicles === undefined) return 'Unlimited';
    return Math.max(0, companyPlan.maxVehicles - currentVehicleCount);
  };

  // Check if company has a plan
  const hasPlan = () => {
    return companyPlan && companyPlan.id;
  };

  // Get company details from JWT token as fallback
  const getCompanyDetailsFromToken = () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('companyToken') : null;
      if (!token) return null;
      
      const payload = JSON.parse(atob(token.split('.')[1] || ''));
      return {
        name: payload.companyName || 'Company Name',
        email: payload.email || 'company@example.com',
        id: payload.id || null
      };
    } catch (err) {
      console.error('Error parsing token:', err);
      return null;
    }
  };

  // Get plan details for display
  const getPlanDetails = () => {
    if (!companyPlan) return null;
    
    return {
      name: companyPlan.name || 'No Plan',
      price: companyPlan.price || 0,
      maxVehicles: companyPlan.maxVehicles || 0,
      durationDays: companyPlan.durationDays || 0,
      description: companyPlan.description || '',
      currentVehicles: currentVehicleCount,
      remainingVehicles: getRemainingSlots()
    };
  };

  useEffect(() => {
    fetchCompanyPlan();
    fetchVehicleCount();
  }, []);

  return {
    companyPlan,
    currentVehicleCount,
    loading,
    error,
    canAddVehicle,
    getRemainingSlots,
    hasPlan,
    getPlanDetails,
    getCompanyDetailsFromToken,
    refreshData: () => {
      fetchCompanyPlan();
      fetchVehicleCount();
    }
  };
};
