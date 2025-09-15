import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Get the form data from PayU return
    const formData = await request.formData();
    const paymentStatus = formData.get('status');
    const txnid = formData.get('txnid');
    const mihpayid = formData.get('mihpayid');
    const amount = formData.get('amount');
    
    // Verify the payment with backend
    const token = request.cookies.get('companyToken')?.value;
    
    if (!token) {
      // If no token, redirect to login
      return NextResponse.redirect(new URL('/company/login', request.url));
    }
    
    // Call backend to verify payment
    const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/company/top-up-plan/vehicle-limit/payment/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        txnid,
        mihpayid,
        status: paymentStatus,
        amount
      })
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
    // Verify the payment with backend
    const token = request.cookies.get('companyToken')?.value;
    
    if (!token) {
      // If no token, redirect to login
      return NextResponse.redirect(new URL('/company/login', request.url));
    }
    
    // Call backend to verify payment
    const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/company/top-up-plan/vehicle-limit/payment/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        txnid,
        mihpayid,
        status,
        amount
      })
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