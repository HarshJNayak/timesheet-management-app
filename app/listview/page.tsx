"use client";
import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import { format, addDays, parseISO } from "date-fns";

interface Task {
  id: string;
  date: string;
  name: string;
  project: string;
  hours: number;
}

export default function ListViewPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpenTaskId, setMenuOpenTaskId] = useState<string | null>(null);
  const [warning, setWarning] = useState("");
  const [weekStart, setWeekStart] = useState<Date | null>(null);
  const [days, setDays] = useState<string[]>([]);
  const [showCreate, setShowCreate] = useState(false);

  const addTask = (task: Task) => {
    const dailyTotal = tasks
      .filter((t) => t.date === task.date && t.id !== task.id)
      .reduce((sum, t) => sum + t.hours, 0);

    if (task.hours + dailyTotal > 8) {
      setWarning("⚠️ You are now doing overtime.");
    } else {
      setWarning("");
    }

    if (editTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editTask.id ? { ...task } : t))
      );
      setEditTask(null);
      setShowEditModal(false);
    } else {
      setTasks((prev) => [...prev, { ...task, id: crypto.randomUUID() }]);
      setShowModal(false);
    }
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setMenuOpenTaskId(null);
  };

  const startEdit = (task: Task) => {
    setEditTask(task);
    setCurrentDate(task.date);
    setShowEditModal(true);
    setMenuOpenTaskId(null);
  };

  const totalEffectiveHours = tasks.reduce((sum, task) => {
    const totalForDay = tasks
      .filter((t) => t.date === task.date)
      .reduce((acc, t) => acc + t.hours, 0);
    return sum + Math.min(totalForDay, 8);
  }, 0);

  const percentage = Math.min((totalEffectiveHours / 40) * 100, 100);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const week = params.get("week");

    if (week) {
      const weekStartDate = parseISO(week);
      setWeekStart(weekStartDate);
      const weekdays = Array.from({ length: 5 }).map((_, i) =>
        format(addDays(weekStartDate, i), "yyyy-MM-dd")
      );
      setDays(weekdays);
      fetch(`/api/entries?week=${week}`)
        .then((res) => res.json())
        .then((data) => setTasks(data))
        .catch((err) => console.error("Failed to load tasks:", err));
    } else {
      setShowCreate(true);
    }

    const handleClick = () => {
      setDropdownOpen(false);
      setMenuOpenTaskId(null);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const handleCreate = () => {
    const startDate = new Date("2025-07-21");
    setWeekStart(startDate);
    const weekdays = Array.from({ length: 5 }).map((_, i) =>
      format(addDays(startDate, i), "yyyy-MM-dd")
    );
    setDays(weekdays);
    setShowCreate(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      <Header />

      <main className="flex-1 px-4 sm:px-8 md:px-16 py-8">
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">This week's timesheet</h2>
              {weekStart && (
                <p className="text-gray-500 text-sm">
                  {format(weekStart, "MMMM d")} –{" "}
                  {format(addDays(weekStart, 4), "MMMM d, yyyy")}
                </p>
              )}
            </div>
            <div className="text-right space-y-1 w-1/2">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{totalEffectiveHours}/40 hrs</span>
                <span>{Math.round(percentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="h-2 bg-orange-500 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {showCreate && (
            <button
              onClick={handleCreate}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md ml-2 hover:bg-indigo-700 active:bg-indigo-800 transition-colors cursor-pointer"
            >
              + Create
            </button>
          )}

          {days.map((day) => (
            <div key={day}>
              <h3 className="text-sm text-gray-600 mb-2">
                {format(parseISO(day), "MMMM d")}
              </h3>
              {tasks
                .filter((t) => t.date === day)
                .map((t) => (
                  <div
                    key={t.id}
                    className="border rounded-md p-4 bg-gray-50 mb-2 flex justify-between items-center"
                  >
                    <div className="text-gray-800">{t.name}</div>
                    <div className="ml-auto text-right text-sm text-gray-600 space-y-1">
                      <p>{t.hours} hrs</p>
                      <p>
                        <span className="text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-xs font-medium inline-block">
                          Project name: {t.project}
                        </span>
                      </p>
                    </div>
                    <div
                      className="relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() =>
                          setMenuOpenTaskId((prev) =>
                            prev === t.id ? null : t.id
                          )
                        }
                        className="hover:bg-gray-400 p-1 rounded-full cursor-pointer"
                      >
                        <span className="text-xl leading-none">⋮</span>
                      </button>
                      {menuOpenTaskId === t.id && (
                        <div className="absolute right-0 mt-2 w-28 bg-white shadow border rounded z-20">
                          <button
                            onClick={() => startEdit(t)}
                            className="block w-full text-left px-4 py-1 text-sm text-blue-500 hover:text-blue-700 cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteTask(t.id)}
                            className="block w-full text-left px-4 py-1 text-sm text-red-500 hover:bg-red-100 cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentDate(day);
                  setShowModal(true);
                  setWarning("");
                }}
                className="mt-2 border-2 border-dotted border-blue-400 rounded-md p-3 text-blue-600 cursor-pointer hover:bg-blue-50"
              >
                + Add new task
              </div>
            </div>
          ))}
          {warning && (
            <p className="text-sm text-yellow-600 font-medium mt-4">{warning}</p>
          )}
        </div>
      </main>

      <footer className="text-center text-sm text-gray-500 py-4">
        © 2025 HarshNayak. All rights reserved.
      </footer>

      {(showModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40 flex items-center justify-center px-4">
          <TaskModal
            initialTask={editTask}
            date={currentDate}
            onClose={() => {
              setShowModal(false);
              setShowEditModal(false);
              setEditTask(null);
              setWarning("");
            }}
            onSave={addTask}
          />
        </div>
      )}
    </div>
  );
}

function TaskModal({
  date,
  initialTask,
  onClose,
  onSave,
}: {
  date: string;
  initialTask?: Task | null;
  onClose: () => void;
  onSave: (task: Task) => void;
}) {
  const [name, setName] = useState(initialTask?.name || "");
  const [project, setProject] = useState(initialTask?.project || "");
  const [hours, setHours] = useState(initialTask?.hours || 0);

  return (
    <div
      className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-lg font-semibold mb-4">
        {initialTask ? "Edit Task" : "Add New Task"}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium">Task Description</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="e.g. Homepage Development"
          />
        </div>

        <div>
          <label className="block font-medium">Project Name</label>
          <input
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="e.g. Button"
          />
        </div>

        <div>
          <label className="block font-medium">Hours</label>
          <input
            type="number"
            min="0"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>
      </div>

      <div className="flex justify-end mt-6 space-x-4">
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 active:bg-gray-500 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={() =>
            onSave({
              id: initialTask?.id || crypto.randomUUID(),
              name,
              project,
              hours,
              date,
            })
          }
          className="bg-indigo-600 text-white px-4 py-2 rounded-md ml-2 hover:bg-indigo-700 active:bg-indigo-800 transition-colors cursor-pointer"
        >
          {initialTask ? "Update Task" : "Add Entry"}
        </button>
      </div>
    </div>
  );
}
