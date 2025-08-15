import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Forward the request to the backend API
    const response = await fetch('http://localhost:5000/api/admin/plan/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    // Return the response from the backend
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error in plans list API route:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}