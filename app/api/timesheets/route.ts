// app/api/timesheets/route.ts
import { NextResponse } from 'next/server';

const timesheets = [
  { week: 1, date: '1 – 5 January, 2024', status: 'COMPLETED', action: 'View' },
  { week: 2, date: '8 – 12 January, 2024', status: 'INCOMPLETE', action: 'Update' },
  { week: 3, date: '15 – 19 January, 2024', status: 'COMPLETED', action: 'View' },
  { week: 4, date: '14 – 18 July, 2025', status: 'COMPLETED', action: 'View' },
  { week: 5, date: '21 – 25 July, 2025', status: 'MISSING', action: 'Create' },
];

export async function GET() {
  return NextResponse.json(timesheets);
}
