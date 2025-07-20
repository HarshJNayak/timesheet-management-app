'use client';

import React from "react";
import Header from "@/components/Header";
import TimesheetList from "@/components/TimesheetList";

export default function DashboardPage() {
  return (
    <div>
      <Header /> 
      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        <TimesheetList />
      </main>
    </div>
  );
}
