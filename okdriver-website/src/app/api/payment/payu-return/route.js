import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const status = formData.get('status');
    const txnid = formData.get('txnid');
    const mihpayid = formData.get('mihpayid');
    const amount = formData.get('amount');

    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://backend.okdriver.in/';
    // Forward minimal fields to backend verify (unauth) for consistency
    const verifyResp = await fetch(`${apiBase}/api/admin/companyplan/payment/payu-return`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, txnid, mihpayid, amount })
    });

    let redirect;
    if (status === 'success' && verifyResp.ok) {
      redirect = `/company/subscription-success?txnid=${encodeURIComponent(txnid || '')}&mihpayid=${encodeURIComponent(mihpayid || '')}`;
    } else {
      const err = await verifyResp.json().catch(() => ({}));
      redirect = `/company/payment-failed?error=${encodeURIComponent(err.message || 'Payment failed')}`;
    }
    return NextResponse.redirect(new URL(redirect, request.url));
  } catch (e) {
    return NextResponse.redirect(new URL('/company/payment-failed?error=Unexpected', request.url));
  }
}

export async function GET(request) {
  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  const txnid = url.searchParams.get('txnid');
  const mihpayid = url.searchParams.get('mihpayid');
  const redirect = status === 'success'
    ? `/company/subscription-success?txnid=${encodeURIComponent(txnid || '')}&mihpayid=${encodeURIComponent(mihpayid || '')}`
    : `/company/payment-failed?error=${encodeURIComponent('Payment not successful')}`;
  return NextResponse.redirect(new URL(redirect, request.url));
}


