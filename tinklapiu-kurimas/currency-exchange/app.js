const express = require("express");

const Router = require("./routers/Router");

// create server
const app = express();

app.use(express.json());

app.use("/api/v1/currency", Router);

module.exports = app;
