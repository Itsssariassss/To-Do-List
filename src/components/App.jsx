import React, { useState } from 'react';

function App() {
  const [tasks] = useState([
    
    { id: 1, task: "Task-1", dueDate: "26-nov-21", status: "Completed", priority: "High" },
    { id: 2, task: "Task-2", dueDate: "28-nov-21", status: "Pending", priority: "Low" },
    { id: 3, task: "Task-3", dueDate: "30-nov-21", status: "Completed", priority: "High" },
    { id: 4, task: "Task-4", dueDate: "04-nov-21", status: "Completed", priority: "High" },
   
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-500';
      case 'Pending': return 'bg-red-500';
      case 'In Progress': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  // Cálculos para las estadísticas
  const totalTasks = tasks.length;
  const dueToday = 2; // Este valor debería calcularse basado en la fecha actual
  const overDue = 0;

  const totalPending = tasks.filter(task => task.status === 'Pending').length;
  const totalCompleted = tasks.filter(task => task.status === 'Completed').length;
  const totalInProgress = tasks.filter(task => task.status === 'In Progress').length;

  const totalHigh = tasks.filter(task => task.priority === 'High').length;
  const totalMedium = tasks.filter(task => task.priority === 'Medium').length;
  const totalLow = tasks.filter(task => task.priority === 'Low').length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Task Stats */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-cyan-500 text-white p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Task</h3>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="p-4">
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Total Task</td>
                    <td className="py-2 text-right">{totalTasks}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Due for Today</td>
                    <td className="py-2 text-right">{dueToday}</td>
                  </tr>
                  <tr>
                    <td className="py-2">Over Due</td>
                    <td className="py-2 text-right">{overDue}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Status Stats */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-cyan-500 text-white p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Status</h3>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="p-4">
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Total Pending</td>
                    <td className="py-2 text-right">{totalPending}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Total Completed</td>
                    <td className="py-2 text-right">{totalCompleted}</td>
                  </tr>
                  <tr>
                    <td className="py-2">Total in Progress</td>
                    <td className="py-2 text-right">{totalInProgress}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Priority Stats */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-cyan-500 text-white p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Priority</h3>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              </div>
            </div>
            <div className="p-4">
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Total High</td>
                    <td className="py-2 text-right">{totalHigh}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Total Medium</td>
                    <td className="py-2 text-right">{totalMedium}</td>
                  </tr>
                  <tr>
                    <td className="py-2">Total Low</td>
                    <td className="py-2 text-right">{totalLow}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="bg-navy-700 text-white">
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Task</th>
                <th className="py-3 px-4 text-left">Due Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Priority</th>
                <th className="py-3 px-4 text-left">Comments</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={tasks.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{task.id}</td>
                  <td className="py-3 px-4">{task.task}</td>
                  <td className="py-3 px-4">{task.dueDate}</td>
                  <td className="py-3 px-4">
                    <span className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(task.status)}`}></span>
                      {task.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{task.priority}</td>
                  <td className="py-3 px-4"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;