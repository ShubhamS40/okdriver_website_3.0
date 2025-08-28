import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Forward the request to the backend API
    console.log('Verifying payment with data:', body);
    console.log('Using token:', token.substring(0, 10) + '...');
    
    const response = await fetch('http://localhost:5000/api/admin/companyplan/payment/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body),
    });

    // Always read as text first to avoid crashes when backend sends HTML
    const raw = await response.text();
    let data;
    try {
      data = raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.error('Non-JSON response from backend (verify-payment):', raw);
      return NextResponse.json(
        { success: false, message: 'Payment verification failed', details: raw?.slice(0, 500) },
        { status: response.status || 502 }
      );
    }

    console.log('Backend verification response:', data);
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error in payment verify-payment API route:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}