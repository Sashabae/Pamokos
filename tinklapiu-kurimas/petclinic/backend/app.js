const express = require("express");

const appointmentRouter = require("./routes/appointmentRoutes");
const userRouter = require("./routes/userRoutes");

const errorHandler = require("./utils/ErrorHandling");
const AppError = require("./utils/appError");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// create server
const app = express();

// Middleware, that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json());

// middleware for parsing cookies
app.use(cookieParser());

//middleware for cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ROUTES
app.use("/api/v1/appointments", appointmentRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  const error = new AppError(404, "Not found");

  next(error);
});

app.use(errorHandler);

module.exports = app;
