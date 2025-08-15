import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch('http://localhost:5000/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error('Non-JSON response from backend:', text);
      return NextResponse.json(
        { message: 'Backend did not return JSON' },
        { status: 502 }
      );
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error in admin login API route:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
