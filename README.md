# Timesheet Management App

This is a simple timesheet tracking application built using Next.js 15, TypeScript, and Tailwind CSS. It includes a login screen, a dashboard with weekly summaries, and a list view to manage daily task entries for each week.

## Features

- Dummy login system (no real authentication)
- Dashboard displaying weekly timesheet status
- List view showing detailed daily tasks for a selected week
- Ability to add, edit, and delete tasks
- Tasks stored temporarily in localStorage (no backend)
- Weekly progress calculated with a cap of 8 hours per day
- Conditional UI:
  - "Completed" (green) if 40 hours logged
  - "Incomplete" (yellow) if some hours logged
  - "Missing" (red) if no hours logged
- Responsive layout with Tailwind CSS
- Hover and active UI states for buttons and menu

## Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/HarshJNayak/timesheet-management-app.git
cd timesheet-management-app

2. Install dependencies
npm install

3. Run the development server
npm run dev

4.The app will be available at http://localhost:3000/login

## Technologies Used

- Next.js 15 (App Router)  
- TypeScript  
- Tailwind CSS  
- LocalStorage for state persistence  
- React Hooks (`useState`, `useEffect`)


## Assumptions and Notes

- No backend or authentication system is implemented  
- All timesheet data is stored in `localStorage` and resets on browser refresh  
- Only one dummy user is supported at a time  
- The "Create" button appears only once for a given week with no existing data  
- A maximum of 8 hours per day counts toward the 40-hour weekly progress bar


## Time Spent

Approximately 48 hours

- Project setup and login: 6–8 hours  
- Dashboard and list view logic: 20 hours  
- LocalStorage handling and UI states: 8–10 hours  
- Styling, responsiveness, and interactivity: 10–12 hours


## Future Improvements

- Real authentication using NextAuth or Firebase  
- Persistent backend storage (e.g. Supabase or MongoDB)  
- Better error handling and input validation  
- Support for multiple users and weeks  
- Unit and integration tests


Author
Harsh Nayak
Frontend Developer


