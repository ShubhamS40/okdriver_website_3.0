'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useVehicleLimit } from '../../../hooks/useVehicleLimit';

function VehicleLimitSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const { refreshData, getPlanDetails } = useVehicleLimit();
  const [planDetails, setPlanDetails] = useState(null);

  useEffect(() => {
    // Refresh vehicle limit data to get updated limits
    refreshData();
    
    // Get transaction details from URL
    const txnid = searchParams.get('txnid');
    const mihpayid = searchParams.get('mihpayid');
    
    if (!txnid) {
      // If no transaction ID, redirect to dashboard
      router.push('/company/dashboard');
      return;
    }
    
    // Get updated plan details
    const details = getPlanDetails();
    setPlanDetails(details);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white border-2 border-green-500 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-black mb-4">Vehicle Limit Upgraded!</h1>
          
          <p className="text-gray-600 mb-6">
            Your payment was successful and your vehicle limit has been increased.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="text-black font-medium">{searchParams.get('txnid') || 'N/A'}</span>
            </div>
            {searchParams.get('mihpayid') && (
              <div className="flex justify-between">
                <span className="text-gray-600">Payment ID:</span>
                <span className="text-black font-medium">{searchParams.get('mihpayid')}</span>
              </div>
            )}
          </div>
          
          {planDetails && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium text-black mb-2">Updated Vehicle Limit</h3>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Current Vehicles:</span>
                <span className="text-black font-medium">{planDetails.currentVehicles}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Maximum Vehicles:</span>
                <span className="text-black font-medium">{planDetails.maxVehicles === 0 ? 'Unlimited' : planDetails.maxVehicles}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Remaining Slots:</span>
                <span className="text-black font-medium">{planDetails.remainingVehicles === 'Unlimited' ? 'Unlimited' : planDetails.remainingVehicles}</span>
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/company/vehicles" className="bg-black text-white font-medium py-3 px-6 rounded hover:bg-gray-800">
              Manage Vehicles
            </Link>
            <Link href="/company/dashboard" className="bg-white text-black border border-black font-medium py-3 px-6 rounded hover:bg-gray-100">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VehicleLimitSuccess() {
  return (
    <Suspense fallback={(
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black">Loading...</p>
        </div>
      </div>
    )}>
      <VehicleLimitSuccessContent />
    </Suspense>
  );
}