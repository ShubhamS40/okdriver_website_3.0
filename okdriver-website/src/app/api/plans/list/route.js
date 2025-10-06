import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://backend.okdriver.in:5000/api/admin/companyplan/list', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    let data;
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error('Non-JSON response from backend (plans list):', text);
      return NextResponse.json({ message: 'Failed to fetch plans' }, { status: 502 });
    }

    // Normalize shape: backend returns { message, data: [...] }
    const normalized = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : []);

    return NextResponse.json(normalized, { status: response.status });
  } catch (err) {
    console.error('Error in /api/plans/list:', err);
    return NextResponse.json({ message: 'Failed to fetch plans' }, { status: 500 });
  }
}