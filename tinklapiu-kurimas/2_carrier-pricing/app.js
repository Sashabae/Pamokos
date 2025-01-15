const express = require("express");
const { sayHello, addRequestedDate } = require("./middlewares/appMiddlewares");
const Router = require("./routers/Router");

// create server
const app = express();

app.use(express.json());

app.use(sayHello, addRequestedDate);

app.use("/api/v1/carrier", Router);

module.exports = app;
