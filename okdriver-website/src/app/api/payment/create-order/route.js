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
    
    const response = await fetch('http://localhost:5000/api/admin/plan/payment/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log('Backend response:', data);
    
    // Return the response from the backend
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error in payment create-order API route:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}