const TaskCard = () => (
  <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm border mb-2">
    <span className="text-gray-700">Homepage Development</span>
    <div className="flex items-center gap-4">
      <span className="text-gray-500">4 hrs</span>
      <button className="bg-gray-100 px-3 py-1 text-sm rounded border">Project Name</button>
      <button className="text-gray-400">⋮</button>
    </div>
  </div>
);

export default TaskCard;
