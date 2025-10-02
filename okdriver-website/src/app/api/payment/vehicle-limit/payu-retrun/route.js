import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Get the form data from PayU return
    const formData = await request.formData();
    const paymentStatus = formData.get('status');
    const txnid = formData.get('txnid');
    const mihpayid = formData.get('mihpayid');
    const amount = formData.get('amount');
    
    // Prefer auth verification; if token missing, fall back to unauth payu-return endpoint
    const token = request.cookies.get('companyToken')?.value;
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const endpoint = `${apiBase}/api/admin/company/top-up-plan/vehicle-limit/payment/${token ? 'verify' : 'payu-return'}`;
    const headers = token ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } : { 'Content-Type': 'application/json' };
    const verifyResponse = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ txnid, mihpayid, status: paymentStatus, amount })
    });
    
    // Determine redirect URL based on payment status
    let redirectUrl;
    
    if (paymentStatus === 'success' && verifyResponse.ok) {
      // Payment successful, redirect to success page
      redirectUrl = `/company/vehicle-limit-success?txnid=${txnid}&mihpayid=${mihpayid}`;
    } else {
      // Payment failed, redirect to failure page
      const errorData = await verifyResponse.json().catch(() => ({}));
      const errorMessage = errorData.message || 'Payment verification failed';
      redirectUrl = `/company/payment-failed?error=${encodeURIComponent(errorMessage)}`;
    }
    
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  } catch (error) {
    console.error('PayU return handler error:', error);
    return NextResponse.redirect(
      new URL(`/company/payment-failed?error=${encodeURIComponent('An unexpected error occurred')}`, request.url)
    );
  }
}

export async function GET(request) {
  // Handle GET requests (PayU might send GET for some return flows)
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const txnid = searchParams.get('txnid');
  const mihpayid = searchParams.get('mihpayid');
  const amount = searchParams.get('amount');
  
  try {
    // Verify the payment with backend (fallback to unauth endpoint if token missing)
    const token = request.cookies.get('companyToken')?.value;
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const endpoint = `${apiBase}/api/admin/company/top-up-plan/vehicle-limit/payment/${token ? 'verify' : 'payu-return'}`;
    const headers = token ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } : { 'Content-Type': 'application/json' };
    const verifyResponse = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ txnid, mihpayid, status, amount })
    });
    
    // Determine redirect URL based on payment status
    let redirectUrl;
    
    if (status === 'success' && verifyResponse.ok) {
      // Payment successful, redirect to success page
      redirectUrl = `/company/vehicle-limit-success?txnid=${txnid}&mihpayid=${mihpayid}`;
    } else {
      // Payment failed, redirect to failure page
      const errorData = await verifyResponse.json().catch(() => ({}));
      const errorMessage = errorData.message || 'Payment verification failed';
      redirectUrl = `/company/payment-failed?error=${encodeURIComponent(errorMessage)}`;
    }
    
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  } catch (error) {
    console.error('PayU return handler error:', error);
    return NextResponse.redirect(
      new URL(`/company/payment-failed?error=${encodeURIComponent('An unexpected error occurred')}`, request.url)
    );
  }
}