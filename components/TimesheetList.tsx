'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { eachWeekOfInterval, format, addDays } from 'date-fns';

interface WeekEntry {
  week: number;
  start: string;
  end: string;
  status: string;
  action: string;
  startDateString: string;
}

const TimesheetList = () => {
  const [weeks, setWeeks] = useState<WeekEntry[]>([]);
  const router = useRouter();

  useEffect(() => {
    const start = new Date(2025, 5, 30); // June 30, 2025
    const end = new Date(2025, 6, 25);   // July 25, 2025
    const allWeeks = eachWeekOfInterval({ start, end }, { weekStartsOn: 1 });

    const fetchWeeks = async () => {
      const today = new Date();

      const weekData: WeekEntry[] = await Promise.all(
        allWeeks.map(async (startDate, i) => {
          const startStr = format(startDate, 'yyyy-MM-dd');
          const displayStart = format(startDate, 'd MMMM');
          const displayEnd = format(addDays(startDate, 4), 'd MMMM');

          const res = await fetch(`/api/entries?week=${startStr}`);
          const data = await res.json();
          const total = data.reduce((sum: number, entry: any) => sum + entry.hours, 0);

          let status = '';
          let action = '';

          if (data.length === 0) {
            if (startDate > today) {
              status = 'MISSING';
              action = 'Create';
            } else {
              status = 'MISSING';
              action = 'Create';
            }
          } else if (total >= 40) {
            status = 'COMPLETED';
            action = 'View';
          } else {
            status = 'INCOMPLETE';
            action = 'Update';
          }

          return {
            week: i + 1,
            start: displayStart,
            end: displayEnd,
            status,
            action,
            startDateString: startStr,
          };
        })
      );

      setWeeks(weekData);
    };

    fetchWeeks();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-700';
      case 'INCOMPLETE':
        return 'bg-yellow-100 text-yellow-700';
      case 'MISSING':
        return 'bg-red-100 text-red-700';
      default:
        return '';
    }
  };

  const handleActionClick = (weekStart: string, mode: string) => {
    router.push(`/listview?week=${weekStart}&mode=${mode.toLowerCase()}`);
  };

  return (
    <table className="w-full table-auto border border-gray-300 text-left text-sm">
      <thead>
        <tr className="bg-gray-200 text-gray-700">
          <th className="px-4 py-2">Week #</th>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {weeks.map((entry, idx) => (
          <tr key={idx} className="border-t">
            <td className="px-4 py-2">{entry.week}</td>
            <td className="px-4 py-2">{entry.start} – {entry.end}</td>
            <td className="px-4 py-2">
              <span className={`px-3 py-1 rounded-full font-medium text-xs inline-block ${getStatusStyle(entry.status)}`}>
                {entry.status}
              </span>
            </td>
            <td
              className="px-4 py-2 text-blue-600 underline cursor-pointer"
              onClick={() => handleActionClick(entry.startDateString, entry.action)}
            >
              {entry.action}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TimesheetList;
