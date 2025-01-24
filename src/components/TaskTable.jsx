import React from 'react';

const TaskTable = ({ tasks, deleteTask, openTaskModal }) => {
  return (
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
              <td className="p-2">
                <button
                  onClick={() => openTaskModal(task)}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded"
                >
                  Eliminar
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
