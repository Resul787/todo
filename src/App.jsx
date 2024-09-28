import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const addTask = () => {
    if (task.trim() !== "") {
      const newTask = {
        text: task,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);
      setTask("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const filterTasks = (status) => {
    switch (status) {
      case "all":
        return tasks;
      case "completed":
        return tasks.filter(task => task.isCompleted);
      case "active":
        return tasks.filter(task => !task.isCompleted);
      default:
        return tasks;
    }
  };

  return (
    <div className="app-container">
      <h1> To-Do List</h1>
      <input
        type="text"
        value={task}
        onChange={handleInputChange}
        placeholder=""
      />
      <button onClick={addTask}>Add</button>

      <div className="filters">
        <button onClick={() => setTasks(filterTasks("all"))}>All</button>
        <button onClick={() => setTasks(filterTasks("active"))}>Active</button>
        <button onClick={() => setTasks(filterTasks("completed"))}>Done</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.isCompleted ? "completed" : ""}>
            <span onClick={() => toggleTaskCompletion(index)}>
              {task.text}
            </span>
            <button onClick={() => removeTask(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
