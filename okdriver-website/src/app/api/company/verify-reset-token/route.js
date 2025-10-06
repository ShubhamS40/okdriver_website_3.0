import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ success: false, message: 'Token is required' }, { status: 400 });
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/verify-reset-token?token=${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ success: false, message: data.message || 'Invalid or expired token' }, { status: response.status });
    }

    return NextResponse.json({ success: true, email: data.email });
  } catch (error) {
    console.error('Verify reset token API error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}