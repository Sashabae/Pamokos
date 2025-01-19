const express = require("express");
const Controller = require("../controllers/controller");

const { getCurrency, postCurrency } = Controller;

// ROUTERS
const Router = express.Router();

// routes
Router.route("/exchange-rates/:base").get(getCurrency)
Router.route("/convert").post(postCurrency);

module.exports = Router;
