import React, { useState, useEffect } from "react";

const TaskModal = ({ task, onSave: saveTask, onClose: closeModal }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    dueDate: "",
    status: "Pendiente"
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setTaskData(task);
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSave = () => {
    let newErrors = {};
    if (!taskData.title?.trim()) {
      newErrors.title = "El título es obligatorio.";
    }
    if (!taskData.dueDate) {
      newErrors.dueDate = "La fecha de vencimiento es obligatoria.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    saveTask(taskData);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {taskData.id ? "Editar Tarea" : "Nueva Tarea"}
        </h2>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={taskData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        <input
          type="date"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate}</p>}
        <select
          name="status"
          value={taskData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="Pendiente">Pendiente</option>
          <option value="En Progreso">En progreso</option>
          <option value="Completada">Completada</option>
        </select>
        <div className="flex justify-end gap-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
