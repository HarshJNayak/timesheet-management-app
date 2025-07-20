// components/Header.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("John Doe");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    router.push("/login"); 
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b">
      <div className="text-lg font-semibold text-blue-600">ticktock</div>

      <div className="text-lg font-medium">
        {pathname === "/dashboard" ? "Dashboard" : "Timesheets"}
      </div>

      <div className="flex items-center gap-4 relative">
        {pathname === "/dashboard" && (
          <Link
            href="/listview"
            className="text-sm text-blue-600 hover:underline"
          >
            📋 List View
          </Link>
        )}
        {pathname === "/listview" && (
          <Link
            href="/dashboard"
            className="text-sm text-blue-600 hover:underline"
          >
            🔁 Dashboard
          </Link>
        )}

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-sm font-medium text-gray-700 flex items-center gap-1 hover:text-blue-600 transition-colors cursor-pointer"
          >
            {username} <span>▼</span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md">
              <button
className="block w-full px-4 py-2 text-sm text-red-400 hover:text-white hover:bg-red-600 active:bg-red-700 text-left cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
