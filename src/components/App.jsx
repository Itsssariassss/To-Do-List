import React, { useState, useEffect } from 'react';
import "tailwindcss/tailwind.css";
import TaskTable from "./TaskTable";
import TaskModal from "./TaskModal";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (task) => {
    if (task.id) {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, ...task } : t))
      );
    } else {
      setTasks((prev) => [...prev, { ...task, id: prev.length + 1 }]);
    }
    setShowNewTaskModal(false);
  };

  const handleEditTaskModal = (task) => {
    setCurrentTask(task);
    setShowNewTaskModal(true);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      setTasks((prev) =>
        prev
          .filter((task) => task.id !== taskId)
          .map((task, idx) => ({
            ...task,
            id: idx + 1,
          }))
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-gray-700 mb-6">Gestor de Tareas</h1>
      <button
        onClick={() => setShowNewTaskModal(true)}
        className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md"
      >
        + Nueva Tarea
      </button>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <TaskTable tasks={tasks} onEdit={handleEditTaskModal} onDelete={handleDeleteTask} />
      </div>
      {showNewTaskModal && (
        <TaskModal
          task={currentTask}
          onClose={() => setShowNewTaskModal(false)}
          onSave={handleAddTask}
        />
      )}
    </div>
  );
}

export default App;
