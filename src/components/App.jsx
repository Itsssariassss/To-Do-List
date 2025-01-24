import React, { useState, useEffect } from 'react';
import "tailwindcss/tailwind.css"
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
      setTasks((prev) => [
        ...prev,
        { ...task, id: prev.length + 1 },
      ]);
    }
    setShowNewTaskModal(false);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      setTasks((prev) =>
        prev.filter((task) => task.id !== taskId).map((task, idx) => ({
          ...task,
          id: idx + 1,
        }))
      );
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gestor de Tareas</h1>
      <button
        onClick={() => setShowNewTaskModal(true)}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        Nueva Tarea
      </button>
      <TaskTable tasks={tasks} onEdit={setCurrentTask} onDelete={handleDeleteTask} />
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
