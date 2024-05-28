// src/components/todo/TodoItem.js
import React, { useState } from 'react';
import axios from 'axios';
import './TodoItem.css'; // Import CSS file

const TodoItem = ({ task, setTasks, tasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [body, setBody] = useState(task.body);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/deleteTask/${task._id}`);
      setTasks(tasks.filter((t) => t._id !== task._id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async () => {
    try {
      const updatedTask = { title, body };
      const response = await axios.put(`http://localhost:3000/api/tasks/updateTask/${task._id}`, updatedTask);
      setTasks(tasks.map((t) => (t._id === task._id ? response.data.task : t)));
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li className="todo-item">
      {isEditing ? (
        <div className="todo-edit">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="todo-input"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="todo-textarea"
          ></textarea>
          <div className="todo-buttons">
            <button onClick={handleEdit} className="todo-button save">Save</button>
            <button onClick={() => setIsEditing(false)} className="todo-button cancel">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="todo-view">
          <h3 className="todo-title">{task.title}</h3>
          <p className="todo-body">{task.body}</p>
          <div className="todo-buttons">
            <button onClick={() => setIsEditing(true)} className="todo-button edit">Edit</button>
            <button onClick={handleDelete} className="todo-button delete">Delete</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
