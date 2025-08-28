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
    console.log('Creating payment order with data:', body);
    console.log('Using token:', token.substring(0, 10) + '...');
    
    const response = await fetch('http://localhost:5000/api/admin/companyplan/payment/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get('content-type') || '';
    let data;
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error('Non-JSON response from backend (create-order):', text);
      return NextResponse.json(
        { success: false, message: 'Failed to create payment order: ' + response.statusText },
        { status: response.status || 502 }
      );
    }

    console.log('Backend response:', data);
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error in payment create-order API route:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}