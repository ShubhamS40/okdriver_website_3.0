import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { token, password } = body;

    if (!token || !password) {
      return NextResponse.json({ success: false, message: 'Token and password are required' }, { status: 400 });
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ success: false, message: data.message || 'Failed to reset password' }, { status: response.status });
    }

    return NextResponse.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password API error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}