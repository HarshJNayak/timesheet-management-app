// lib/mockData.ts

export const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  password: "password123",
};

export const weeklyTimesheets = [
  {
    id: 1,
    userId: 1,
    week: "2024-01-21 to 2024-01-25",
    totalHours: 20,
  },
];

export const timesheetEntries = [
  {
    id: 101,
    userId: 1,
    date: "2024-01-21",
    project: "Project Alpha",
    task: "UI Redesign",
    hours: 4,
  },
  {
    id: 102,
    userId: 1,
    date: "2024-01-22",
    project: "Project Beta",
    task: "Bug Fixes",
    hours: 6,
  },
  {
    id: 103,
    userId: 1,
    date: "2024-01-23",
    project: "Project Gamma",
    task: "API Integration",
    hours: 5,
  },
];
