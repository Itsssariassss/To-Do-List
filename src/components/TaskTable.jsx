import React from 'react';

// Componente TaskTable que recibe las tareas, una función para eliminar y otra para editar
const TaskTable = ({ tasks: tasks, onDelete: deleteTask, onEdit: openTaskModal }) => {
  return (
    <div className="overflow-x-auto px-4 py-2 sm:px-6 md:px-8">
      {/* Tabla para mostrar las tareas */}
      <table className="w-full table-auto border-separate border-spacing-0">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left text-sm font-semibold text-gray-700">ID</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700">Título</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700">Fecha</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700">Estado</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Itera sobre la lista de tareas y muestra cada una en una fila */}
          {tasks.map((task) => (
            <tr key={task.id} className="border-b hover:bg-gray-50">
              <td className="p-3 text-sm text-gray-600">{task.id}</td>
              <td className="p-3 text-sm text-gray-600">{task.title}</td>
              <td className="p-3 text-sm text-gray-600">{task.dueDate}</td>
              <td className="p-3 text-sm text-gray-600">{task.status}</td>
              <td className="p-3 text-sm flex space-x-2">
                {/* Botón para editar una tarea */}
                <button
                  onClick={() => openTaskModal(task)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  ✏️ Editar
                </button>

                {/* Botón para eliminar una tarea */}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  🗑️ Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
