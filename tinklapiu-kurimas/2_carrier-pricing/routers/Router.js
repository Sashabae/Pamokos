const express = require("express");
const Controller = require("../controllers/Controller");
const { deleteMiddleware } = require("../middlewares/routeMiddlewares");

const { postCarrier, getCarrier} = Controller;

// ROUTES
const Router = express.Router();

// aprasome routes
Router.route("/").post(postCarrier);

module.exports = Router;
