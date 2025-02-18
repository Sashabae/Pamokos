const argon2 = require('argon2');
const {
  createUser,
  getUserByEmail,
  getUserById,
} = require('../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

// COOKIES
const sendCookie = (token, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie('jwt', token, cookieOptions);
};

// SIGNUP
exports.signup = async (req, res, next) => {
  try {
    const newUser = req.body;

    const hash = await argon2.hash(newUser.password);

    newUser.password = hash;

    // default role
    newUser.role = 'user';

    const createdUser = await createUser(newUser);

    // if(!createdUser) throw new AppError('User not created', 500);

    // po signup is karto login
    const token = signToken(createdUser.id);

    // issiunciame cookie su token
    sendCookie(token, res);

    createdUser.password = undefined;
    createdUser.id = undefined;

    res.status(201).json({
      status: 'success',
      data: createdUser,
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);

    const token = signToken(user.id);
    sendCookie(token, res);

    user.password = undefined;
    user.id = undefined;

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// PROTECT
exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      throw new AppError('You are not logged in', 401);
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await getUserById(id);

    if (!currentUser) throw new AppError('User not found', 401);

    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

// ROLE ACCESS
exports.allowAccessTo = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role))
        throw new AppError('You are not allowed to access this route', 403);
      next();
    } catch (error) {
      next(error);
    }
  };
};

exports.logout = (req, res) => {
  return res.clearCookie('jwt').status(200).json({
    message: 'You are logged out',
    status: 'success',
  });
};

exports.getAuthenticatedUser = (req, res, next) => {
  try {
    const authdUser = req.user;
    authdUser.password = undefined;

    res.status(200).json({
      status: 'success',
      data: authdUser,
    });
  } catch (error) {
    next(error);
  }
};
