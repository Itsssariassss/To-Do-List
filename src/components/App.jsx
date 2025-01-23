import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState('Pendiente');
  const [newTaskPriority, setNewTaskPriority] = useState('Alta');
  const [newTaskComments, setNewTaskComments] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const openNewTaskModal = (task = null) => {
    if (task) {
      setEditTaskId(task.id);
      setNewTaskTitle(task.title);
      setNewTaskDueDate(task.dueDate);
      setNewTaskStatus(task.status);
      setNewTaskPriority(task.priority);
      setNewTaskComments(task.comments);
    } else {
      setEditTaskId(null);
      setNewTaskTitle('');
      setNewTaskDueDate('');
      setNewTaskStatus('Pendiente');
      setNewTaskPriority('Alta');
      setNewTaskComments('');
    }
    setShowNewTaskModal(true);
  };

  const closeNewTaskModal = () => {
    setShowNewTaskModal(false);
    setEditTaskId(null);
    setNewTaskTitle('');
    setNewTaskDueDate('');
    setNewTaskStatus('Pendiente');
    setNewTaskPriority('Alta');
    setNewTaskComments('');
  };

  const saveTask = () => {
    if (!newTaskTitle.trim() || !newTaskDueDate) {
      alert('El título y la fecha de vencimiento son obligatorios.');
      return;
    }

    if (editTaskId !== null) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTaskId
            ? {
                ...task,
                title: newTaskTitle.trim(),
                dueDate: newTaskDueDate,
                status: newTaskStatus,
                priority: newTaskPriority,
                comments: newTaskComments.trim(),
              }
            : task
        )
      );
    } else {
      const newTask = {
        id: tasks.length + 1,
        title: newTaskTitle.trim(),
        dueDate: newTaskDueDate,
        status: newTaskStatus,
        priority: newTaskPriority,
        comments: newTaskComments.trim(),
      };
      setTasks([...tasks, newTask]);
    }

    closeNewTaskModal();
  };

  const deleteTask = (taskId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      const updatedTasks = tasks
        .filter((task) => task.id !== taskId)
        .map((task, index) => ({ ...task, id: index + 1 }));
      setTasks(updatedTasks);
    }
  };

  return (
    <div className="p-8 sm:p-4">
      <h1 className="text-2xl sm:text-xl font-bold mb-4">Gestor de Tareas</h1>
      <button
        onClick={() => openNewTaskModal()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Nueva Tarea
      </button>

      {showNewTaskModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-lg sm:max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editTaskId !== null ? 'Editar Tarea' : 'Nueva Tarea'}
            </h2>
            <form>
              <div className="mb-4">
                <label htmlFor="title" className="block font-bold mb-2">
                  Título
                </label>
                <input
                  type="text"
                  id="title"
                  className="border border-gray-400 p-2 w-full"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="dueDate" className="block font-bold mb-2">
                  Fecha de Vencimiento
                </label>
                <input
                  type="date"
                  id="dueDate"
                  className="border border-gray-400 p-2 w-full"
                  value={newTaskDueDate}
                  onChange={(e) => setNewTaskDueDate(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="status" className="block font-bold mb-2">
                  Estado
                </label>
                <select
                  id="status"
                  className="border border-gray-400 p-2 w-full"
                  value={newTaskStatus}
                  onChange={(e) => setNewTaskStatus(e.target.value)}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En Proceso">En Progreso</option>
                  <option value="Completada">Completada</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="priority" className="block font-bold mb-2">
                  Prioridad
                </label>
                <select
                  id="priority"
                  className="border border-gray-400 p-2 w-full"
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                >
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Baja">Baja</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="comments" className="block font-bold mb-2">
                  Comentarios
                </label>
                <textarea
                  id="comments"
                  className="border border-gray-400 p-2 w-full"
                  rows="3"
                  value={newTaskComments}
                  onChange={(e) => setNewTaskComments(e.target.value)}
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row justify-end sm:space-x-2 space-y-2 sm:space-y-0">
                <button
                  type="button"
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                  onClick={closeNewTaskModal}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={saveTask}
                >
                  {editTaskId !== null ? 'Guardar Cambios' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Título</th>
              <th className="p-2 text-left">Fecha</th>
              <th className="p-2 text-left">Estado</th>
              <th className="p-2 text-left">Prioridad</th>
              <th className="p-2 text-left">Comentarios</th>
              <th className="p-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-b">
                <td className="p-2">{task.id}</td>
                <td className="p-2">{task.title}</td>
                <td className="p-2">{task.dueDate}</td>
                <td className="p-2">{task.status}</td>
                <td className="p-2">{task.priority}</td>
                <td className="p-2">{task.comments}</td>
                <td className="p-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <button
                    onClick={() => openNewTaskModal(task)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
