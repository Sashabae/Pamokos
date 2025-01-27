const express = require('express');

// routers
const bookRouter = require('./routes/bookRoutes');
const authorRouter = require('./routes/authorRoutes');
const userRouter = require('./routes/userRoutes');

// errors handler and cookies
const errorHandler = require('./middlewares/errorHandler');
const AppError = require('./utils/appError');
const cookieParser = require('cookie-parser');

// create server
const app = express();

// Middleware, that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json());

// middleware for parsing cookies
app.use(cookieParser());

// ROUTES
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/authors', authorRouter);
app.use('/api/v1/auth', userRouter);

// ERRORS
app.all('*', (req, res, next) => {
  const error = new AppError(404, 'Not found');

  next(error);
});

app.use(errorHandler);

module.exports = app;
