const express = require('express');
const { signup, login } = require('../controlers/authControler');
const validateNewUser = require('../validators/signup');
const validate = require('../validators/validate');
const validateLogin = require('../validators/login');

const router = express.Router();

router.route('/register').post(validateNewUser, validate, signup);
router.route('/login').post(validateLogin, validate, login);

module.exports = router;
