import React, { useState } from 'react';
import './TodoList.css'; // Importar archivo CSS para los estilos personalizados

const MAX_TASK_LENGTH = 30;

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskIndex, setEditingTaskIndex] = useState(-1);
  const [editedTask, setEditedTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      if (newTask.length > MAX_TASK_LENGTH) {
        alert(`La tarea no puede tener más de ${MAX_TASK_LENGTH} caracteres.`);
      } else {
        setTasks([...tasks, newTask]);
        setNewTask('');
      }
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    if (editedTask.trim() !== '') {
      if (editedTask.length > MAX_TASK_LENGTH) {
        alert(`La tarea no puede tener más de ${MAX_TASK_LENGTH} caracteres.`);
      } else {
        const updatedTasks = [...tasks];
        updatedTasks[index] = editedTask;
        setTasks(updatedTasks);
        setEditingTaskIndex(-1);
        setEditedTask('');
      }
    }
  };

  return (
    <div className="todo-list-container">
      <h1 className="todo-header">Lista de tareas</h1>
      <div className="todo-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button className="add-button" onClick={addTask}>
          Agregar tarea
        </button>
      </div>
      <ul className="tasks-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            {editingTaskIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button className="save-button" onClick={() => editTask(index)}>
                  Guardar
                </button>
              </>
            ) : (
              <>
                {task}
                <div className="task-buttons">
                  <button className="edit-button" onClick={() => {
                    setEditingTaskIndex(index);
                    setEditedTask(task);
                  }}>
                    Editar
                  </button>
                  <button className="delete-button" onClick={() => deleteTask(index)}>
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
