import React from 'react';

const TaskModal = ({ taskData, saveTask, closeModal }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    saveTask({ ...taskData, [name]: value });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-lg sm:max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {taskData.id ? 'Editar Tarea' : 'Nueva Tarea'}
        </h2>
        <form>
          <div className="mb-4">
            <label htmlFor="title" className="block font-bold mb-2">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              className="border border-gray-400 p-2 w-full"
              value={taskData.title}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dueDate" className="block font-bold mb-2">Fecha de Vencimiento</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className="border border-gray-400 p-2 w-full"
              value={taskData.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block font-bold mb-2">Estado</label>
            <select
              id="status"
              name="status"
              className="border border-gray-400 p-2 w-full"
              value={taskData.status}
              onChange={handleChange}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En Proceso">En Progreso</option>
              <option value="Completada">Completada</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="priority" className="block font-bold mb-2">Prioridad</label>
            <select
              id="priority"
              name="priority"
              className="border border-gray-400 p-2 w-full"
              value={taskData.priority}
              onChange={handleChange}
            >
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="comments" className="block font-bold mb-2">Comentarios</label>
            <textarea
              id="comments"
              name="comments"
              className="border border-gray-400 p-2 w-full"
              rows="3"
              value={taskData.comments}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row justify-end sm:space-x-2 space-y-2 sm:space-y-0">
            <button
              type="button"
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
              onClick={closeModal}
            >
              Cancelar
            </button>

            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => saveTask(taskData)}
            >
              {taskData.id ? 'Guardar Cambios' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
