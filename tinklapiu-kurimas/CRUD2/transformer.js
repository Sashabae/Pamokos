const express = require("express");
const dotenv = require("dotenv");
const os = require("os");
const si = require("systeminformation");

//load env variables
// CREATE .env file with PORT = 3000
dotenv.config();
const port = process.env.PORT;

//create server
const app = express();

//converts incoming json data to js object and puts it to req.body
app.use(express.json());

// /alpha
app.post("/alpha", (req, res) => {
  const sortedKeys = Object.keys(req.body).sort();
  const sortedObject = {};
  sortedKeys.forEach((key) => {
    sortedObject[key] = req.body[key];
  });
  res.status(201).json({
    status: "success",
    data: sortedObject,
  });
});

// /flatten
app.post("/flatten", (req, res) => {
  const flattenedObject = {};
  Object.keys(req.body).forEach((key) => {
    if (Array.isArray(req.body[key])) {
      flattenedObject[key] = req.body[key].join(",");
    } else {
      flattenedObject[key] = req.body[key];
    }
  });
  res.status(201).json({
    status: "success",
    data: flattenedObject,
  });
});

// /status
app.get("/status", async (req, res) => {
  try {
    const memoryUsed = ((os.totalmem() - os.freemem()) / os.totalmem()) * 100;
    const cpuUsed = await si.currentLoad();
    res.status(200).json({
      "mem-used-pct": memoryUsed.toFixed(1),
      "cpu-used-pct": cpuUsed.currentLoad.toFixed(1),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve system status" });
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
