'use client';
import React, { useState } from 'react';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void; 
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [projectName, setProjectName] = useState('');
  const [typeOfWork, setTypeOfWork] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [hours, setHours] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-2">Add new entry</h2>
        <hr className="mb-4" />

 
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Select Project<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

          <div className="mb-4">
          <label className="block mb-1 font-medium">
            Type of Work<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Bug fixes"
            value={typeOfWork}
            onChange={(e) => setTypeOfWork(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Task Description<span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            placeholder="Write text here"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <p className="text-sm text-gray-500 mt-1">Write clearly what was done in this task.</p>
        </div>

        {/* Hours */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Hours<span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setHours((prev) => Math.max(0, prev - 1))}
              className="px-3 py-1 border rounded-md bg-gray-100 hover:bg-gray-200"
            >
              −
            </button>
            <span className="text-lg font-semibold">{hours}</span>
            <button
              type="button"
              onClick={() => setHours((prev) => prev + 1)}
              className="px-3 py-1 border rounded-md bg-gray-100 hover:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>

        <hr className="mb-4" />

        <div className="flex justify-end gap-4">
          <button
            onClick={onAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Entry
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md 
             hover:bg-gray-400 active:bg-gray-500 
             transition-colors duration-200 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
