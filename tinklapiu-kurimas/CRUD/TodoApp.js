const express = require("express");
const dotenv = require("dotenv");

//load env variables
// CREATE .env file with PORT = 3000
dotenv.config();
const port = process.env.PORT;

//create server
const app = express();

//converts incoming json data to js object and puts it to req.body
app.use(express.json());

let tasks = [];

// GET
app.get("/todos", (req, res) => {
  res.status(200).json({
    status: "success",
    data: tasks,
  });
});

// POST
app.post("/todos", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    description: req.body.description,
    completed: req.body.completed || false,
  };
  tasks.push(newTask);

  res.status(201).json({
    status: "success",
    data: newTask,
  });
});

// PUT
app.put("/todos/:id", (req, res) => {
  const id = +req.params.id;
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  if (req.body.description !== undefined) {
    task.description = req.body.description;
  }
  if (req.body.completed !== undefined) {
    task.completed = req.body.completed;
  }

  res.status(200).json({
    status: "success",
    data: task,
  });
});

// DELETE
app.delete("/todos/:id", (req, res) => {
  const id = +req.params.id;
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }
  tasks.splice(index, 1);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
