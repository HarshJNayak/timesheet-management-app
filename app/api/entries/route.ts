import { NextResponse } from 'next/server';

const dataByWeek: Record<string, any[]> = {
  '2025-06-30': [
    { id: '1', name: 'Task 1', project: 'Website', hours: 8, date: '2025-06-30' },
    { id: '2', name: 'Task 2', project: 'Website', hours: 8, date: '2025-07-01' },
    { id: '3', name: 'Task 3', project: 'Website', hours: 8, date: '2025-07-02' },
    { id: '4', name: 'Task 4', project: 'Website', hours: 8, date: '2025-07-03' },
    { id: '5', name: 'Task 5', project: 'Website', hours: 8, date: '2025-07-04' }
  ],
  '2025-07-07': [
    { id: '1', name: 'Task 1', project: 'Website', hours: 8, date: '2025-07-07' },
    { id: '2', name: 'Task 2', project: 'Website', hours: 8, date: '2025-07-08' },
    { id: '3', name: 'Task 3', project: 'Website', hours: 3, date: '2025-07-09' },
    { id: '4', name: 'Task 4', project: 'Website', hours: 8, date: '2025-07-10' },
    { id: '5', name: 'Task 5', project: 'Website', hours: 2, date: '2025-07-11' }
  ],
  '2025-07-14': [
    { id: '1', name: 'Task 1', project: 'Website', hours: 8, date: '2025-07-14' },
    { id: '2', name: 'Task 2', project: 'Website', hours: 8, date: '2025-07-15' },
    { id: '3', name: 'Task 3', project: 'Website', hours: 8, date: '2025-07-16' },
    { id: '4', name: 'Task 4', project: 'Website', hours: 8, date: '2025-07-17' },
    { id: '5', name: 'Task 5', project: 'Website', hours: 8, date: '2025-07-18' }
  ],
  '2025-07-21': [] 
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const week = searchParams.get('week');
  const data = week ? dataByWeek[week] || [] : [];
  return NextResponse.json(data);
}
