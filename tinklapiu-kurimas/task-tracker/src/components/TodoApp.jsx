import { useState } from "react";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, { text: newTask, completed: false }]);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];

    updatedTasks[index].completed = !updatedTasks[index].completed;

    setTasks(updatedTasks);
  };

  console.log(tasks);

  return (
    <>
      <h1>Task Tracker</h1>
      <button onClick={() => addTask(prompt("Enter a task:"))}>Add Task</button>
      {tasks.length === 0 ? (
        <p>No tasks yet!</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.text}
              </span>
              <button onClick={() => toggleComplete(index)}>
                {task.completed ? "Undo" : "Done"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
