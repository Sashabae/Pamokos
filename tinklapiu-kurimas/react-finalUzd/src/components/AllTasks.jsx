import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function AllTasks() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/tasks")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const deleteTask = async (id) => {
    const confirmation = confirm("Delete this task?");
    if (!confirmation) return;

    try {
      const response = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setData(data.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Task: </th>
          <th>Due date: </th>
          <th>Edit / Delete task: </th>
        </tr>
      </thead>
      <tbody>
        {data.map((task) => (
          <tr key={task.id}>
            <td>{task.name}</td>
            <td>{task.dueDate}</td>
            <td>
             <button class="btn btn-outline-info">
                <Link to={`/tasks/${task.id}`}>
                Edit
              </Link>
              </button> 
              {" "}
              <button className="btn btn-outline-danger" onClick={() => deleteTask(task.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
