// app/api/login/route.ts

import { NextResponse } from 'next/server';
import { mockUser } from '@/lib/mockData';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === mockUser.email && password === mockUser.password) {
    return NextResponse.json({
      success: true,
      user: {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
      },
    });
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}
