'use client'
import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Key, BookOpen, User, LogOut, CreditCard } from 'lucide-react';

// Import components
import ProfileComponent from '../components/ProfileComponent';
import ApiKeysComponent from '../components/ApiKeysComponent';
import DocumentationComponent from '../components/DocumentationComponent';
import BillingComponent from '../components/BillingComponent';

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile, setUserProfile] = useState(null);
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [apiPlans, setApiPlans] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/user/login');
      return;
    }

    if (session?.user?.backendId) {
      fetchUserData();
      
      // Check for payment status in URL
      const payment = searchParams.get('payment');
      if (payment) {
        setPaymentStatus(payment);
        // Refresh subscription data after payment
        fetchSubscription();
      }
    }
  }, [session, status, router, searchParams]);

  // Fetch API plans when billing tab is active
  useEffect(() => {
    if (activeTab === 'billing' && session?.user?.backendId) {
      fetchApiPlans();
    }
  }, [activeTab, session]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/profile/${session.user.backendId}`);
      const data = await response.json();
      
      if (data.success) {
        setUserProfile(data.user);
        setApiKeys(data.user.apiKeys || []);
      }
      
      // Fetch subscription data
      await fetchSubscription();
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchApiPlans = async () => {
    try {
      setLoadingPlans(true);
      const res = await fetch('http://localhost:5000/api/admin/api-plans');
      const json = await res.json();
      if (json.ok && json.data) {
        setApiPlans(json.data.filter(plan => plan.isActive));
      }
    } catch (e) {
      console.error('Error fetching API plans:', e);
    } finally {
      setLoadingPlans(false);
    }
  };

  const fetchSubscription = async () => {
    if (!session?.user?.backendId) return;
    
    try {
      const res = await fetch(`http://localhost:5000/api/user/subscription/${session.user.backendId}`);
      const json = await res.json();
      
      if (json.success && json.subscription) {
        setSubscription(json.subscription);
      } else {
        setSubscription(null);
      }
    } catch (e) {
      console.error('Error fetching subscription:', e);
      setSubscription(null);
    }
  };

  const hasActiveSubscription = subscription && subscription.status === 'ACTIVE';

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Payment notification */}
      {paymentStatus && (
        <div 
          className={`fixed top-4 right-4 p-4 rounded-md shadow-md z-50 ${
            paymentStatus === 'success' 
              ? 'bg-green-100 border border-green-200' 
              : 'bg-red-100 border border-red-200'
          }`}
        >
          <p className={paymentStatus === 'success' ? 'text-green-800' : 'text-red-800'}>
            {paymentStatus === 'success' 
              ? 'Payment successful! Your subscription is now active.' 
              : 'Payment failed. Please try again.'}
          </p>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">User Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, {userProfile?.name || session?.user?.name || 'User'}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/user/login' })}
            className="flex items-center mt-4 md:mt-0 text-gray-600 hover:text-black"
          >
            <LogOut size={18} className="mr-2" />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <nav className="flex flex-col">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center px-4 py-3 hover:bg-gray-50 ${
                    activeTab === 'profile' ? 'bg-gray-100 border-l-4 border-black' : ''
                  }`}
                >
                  <User size={20} className="mr-3" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('api-keys')}
                  className={`flex items-center px-4 py-3 hover:bg-gray-50 ${
                    activeTab === 'api-keys' ? 'bg-gray-100 border-l-4 border-black' : ''
                  }`}
                >
                  <Key size={20} className="mr-3" />
                  <span>API Keys</span>
                </button>
                <button
                  onClick={() => setActiveTab('documentation')}
                  className={`flex items-center px-4 py-3 hover:bg-gray-50 ${
                    activeTab === 'documentation' ? 'bg-gray-100 border-l-4 border-black' : ''
                  }`}
                >
                  <BookOpen size={20} className="mr-3" />
                  <span>Documentation</span>
                </button>
                <button
                  onClick={() => setActiveTab('billing')}
                  className={`flex items-center px-4 py-3 hover:bg-gray-50 ${
                    activeTab === 'billing' ? 'bg-gray-100 border-l-4 border-black' : ''
                  }`}
                >
                  <CreditCard size={20} className="mr-3" />
                  <span>Billing</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-9">
            {activeTab === 'profile' && (
              <ProfileComponent 
                userProfile={userProfile} 
                subscription={subscription} 
              />
            )}
            
            {activeTab === 'api-keys' && (
              <ApiKeysComponent 
                apiKeys={apiKeys} 
                setApiKeys={setApiKeys} 
                session={session} 
                hasActiveSubscription={hasActiveSubscription} 
              />
            )}
            
            {activeTab === 'documentation' && (
              <DocumentationComponent 
                hasActiveSubscription={hasActiveSubscription} 
              />
            )}
            
            {activeTab === 'billing' && (
              <BillingComponent 
                apiPlans={apiPlans} 
                subscription={subscription} 
                session={session} 
                loadingPlans={loadingPlans}
                fetchSubscription={fetchSubscription}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
