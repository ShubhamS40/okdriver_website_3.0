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
      
      // Handle the new API response format
      if (data.summary && data.subscriptionsByStatus) {
        // Process the new comprehensive response format
        const enrichedPlan = {
          summary: data.summary,
          subscriptionsByType: data.subscriptionsByType,
          subscriptionsByStatus: data.subscriptionsByStatus,
          allPurchasedPlans: data.allPurchasedPlans || [],
          company: data.company
        };
        setCompanyPlan(enrichedPlan);
      } else {
        setCompanyPlan(null);
      }
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

      const response = await fetch('https://backend.okdriver.in/api/company/vehicles', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const vehicleData = data.data || data;
        const count = Array.isArray(vehicleData) ? vehicleData.length : 0;
        console.log('Current vehicle count:', count);
        setCurrentVehicleCount(count);
      }
    } catch (err) {
      console.error('Error fetching vehicle count:', err);
    }
  };

  // Calculate total vehicle limit (base + top-up)
  const calculateTotalVehicleLimit = () => {
    if (!companyPlan) return { hasActivePlan: false, totalLimit: 0, baseLimit: 0, topUpLimit: 0 };
    
    const activeSubscriptions = companyPlan.subscriptionsByStatus?.active || [];
    const basePlans = activeSubscriptions.filter(s => 
      s.plan.planType === 'SUBSCRIPTION' && s.subscriptionStatus === 'ACTIVE'
    );
    const topUpPlans = activeSubscriptions.filter(s => 
      s.plan.planType === 'VEHICLE_LIMIT' && s.subscriptionStatus === 'ACTIVE'
    );
    
    // Must have at least one active base plan
    const hasActiveBasePlan = basePlans.length > 0;
    
    if (!hasActiveBasePlan) {
      return { hasActivePlan: false, totalLimit: 0, baseLimit: 0, topUpLimit: 0 };
    }
    
    // Calculate limits
    const baseVehicleLimit = basePlans.reduce((sum, plan) => {
      const limit = plan.plan.vehicleLimit || 0;
      console.log(`Base plan ${plan.plan.name}: ${limit} vehicles`);
      return sum + limit;
    }, 0);
    
    // Top-up plans are only valid when base plan is active
    const topUpVehicleLimit = topUpPlans.reduce((sum, plan) => {
      const limit = plan.plan.vehicleLimit || 0;
      console.log(`Top-up plan ${plan.plan.name}: ${limit} vehicles`);
      return sum + limit;
    }, 0);
    
    const totalVehicleLimit = baseVehicleLimit + topUpVehicleLimit;
    
    console.log('Vehicle Limit Calculation:', {
      hasActiveBasePlan,
      baseVehicleLimit,
      topUpVehicleLimit,
      totalVehicleLimit,
      currentVehicleCount
    });
    
    return {
      hasActivePlan: true,
      totalLimit: totalVehicleLimit,
      baseLimit: baseVehicleLimit,
      topUpLimit: topUpVehicleLimit
    };
  };

  // Check if adding a vehicle would exceed the limit
  const canAddVehicle = () => {
    const limitInfo = calculateTotalVehicleLimit();
    
    console.log('canAddVehicle check:', {
      hasActivePlan: limitInfo.hasActivePlan,
      totalLimit: limitInfo.totalLimit,
      currentCount: currentVehicleCount,
      canAdd: limitInfo.hasActivePlan && (limitInfo.totalLimit === 0 || currentVehicleCount < limitInfo.totalLimit)
    });
    
    // No active plan = can't add vehicles
    if (!limitInfo.hasActivePlan) {
      return false;
    }
    
    // Unlimited vehicles (when totalLimit is 0)
    if (limitInfo.totalLimit === 0) {
      return true;
    }
    
    // Check if current count is less than total limit
    return currentVehicleCount < limitInfo.totalLimit;
  };

  // Get remaining vehicle slots
  const getRemainingSlots = () => {
    const limitInfo = calculateTotalVehicleLimit();
    
    if (!limitInfo.hasActivePlan) {
      return 0;
    }
    
    if (limitInfo.totalLimit === 0) {
      return 'Unlimited';
    }
    
    return Math.max(0, limitInfo.totalLimit - currentVehicleCount);
  };

  // Check if company has a plan
  const hasPlan = () => {
    const limitInfo = calculateTotalVehicleLimit();
    return limitInfo.hasActivePlan;
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
    
    const limitInfo = calculateTotalVehicleLimit();
    const activeSubscriptions = companyPlan.subscriptionsByStatus?.active || [];
    const basePlans = activeSubscriptions.filter(s => 
      s.plan.planType === 'SUBSCRIPTION' && s.subscriptionStatus === 'ACTIVE'
    );
    const topUpPlans = activeSubscriptions.filter(s => 
      s.plan.planType === 'VEHICLE_LIMIT' && s.subscriptionStatus === 'ACTIVE'
    );
    
    // Get primary base plan (first active subscription plan)
    const primaryBasePlan = basePlans.length > 0 ? basePlans[0] : null;
    
    const remaining = limitInfo.totalLimit ? limitInfo.totalLimit - currentVehicleCount : 0;
    
    return {
      // Summary information
      summary: companyPlan.summary,
      subscriptionsByType: companyPlan.subscriptionsByType,
      company: companyPlan.company,
      
      // Plan details
      name: primaryBasePlan ? primaryBasePlan.plan.name : 'No Active Plan',
      hasPlan: limitInfo.hasActivePlan,
      planName: primaryBasePlan ? primaryBasePlan.plan.name : 'No Plan',
      price: primaryBasePlan ? primaryBasePlan.plan.price : 0,
      maxVehicles: limitInfo.totalLimit,
      durationDays: primaryBasePlan ? primaryBasePlan.plan.durationDays : 0,
      description: primaryBasePlan ? primaryBasePlan.plan.description : '',
      currentVehicles: currentVehicleCount,
      remainingVehicles: limitInfo.totalLimit === 0 ? 'Unlimited' : remaining,
      startDate: primaryBasePlan ? primaryBasePlan.subscriptionStartDate : null,
      endDate: primaryBasePlan ? primaryBasePlan.subscriptionEndDate : null,
      status: primaryBasePlan ? primaryBasePlan.subscriptionStatus : 'INACTIVE',
      
      // Vehicle limits breakdown
      baseVehicleLimit: limitInfo.baseLimit,
      topUpVehicleLimit: limitInfo.topUpLimit,
      totalVehicleLimit: limitInfo.totalLimit,
      
      // Plan arrays
      basePlans: basePlans,
      topUpPlans: topUpPlans,
      allActiveSubscriptions: activeSubscriptions,
      
      // Counts
      subscriptionPlansCount: companyPlan.subscriptionsByType?.subscriptionPlans?.count || 0,
      vehicleLimitPlansCount: companyPlan.subscriptionsByType?.vehicleLimitPlans?.count || 0,
      totalActiveSubscriptions: companyPlan.summary?.totalActiveSubscriptions || 0,
      
      // Additional data
      allPurchasedPlans: companyPlan.allPurchasedPlans || []
    };
  };

  // Function to refresh all vehicle limit data
  const refreshData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchCompanyPlan(),
        fetchVehicleCount()
      ]);
    } catch (err) {
      console.error('Error refreshing vehicle limit data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyPlan();
    fetchVehicleCount();
  }, []);

  return {
    companyPlan,
    vehicleCount: currentVehicleCount,
    loading,
    error,
    canAddVehicle,
    getRemainingSlots,
    hasPlan,
    getPlanDetails,
    getCompanyDetailsFromToken,
    refreshData,
    // Expose the calculation function for debugging
    calculateTotalVehicleLimit
  };
};