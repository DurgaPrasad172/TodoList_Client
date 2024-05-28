// src/components/todo/TodoList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import './TodoList.css'; // Import CSS file

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await axios.get(`http://localhost:3000/api/tasks/getTasks/${user.email}`);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const newTask = { title, body, email: user.email };
      const response = await axios.post('http://localhost:3000/api/tasks/addTask', newTask);
      setTasks([...tasks, response.data.list]);
      setTitle('');
      setBody('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="todo-container">
      <h2 className="todo-title">Todo List</h2>
      <form onSubmit={handleAddTask} className="todo-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="todo-input"
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          className="todo-textarea"
        ></textarea>
        <button type="submit" className="todo-button">Add Task</button>
      </form>
      <ul className="todo-list">
        {tasks.map((task) => (
          <TodoItem key={task._id} task={task} setTasks={setTasks} tasks={tasks} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
