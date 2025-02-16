const express = require("express");

const appointmentController = require("../controllers/appointmentController");
const { protect, allowAccessTo } = require("../controllers/usersController");

const paginationValidator = require("../validators/pagination");
const validate = require("../validators/validate");

const {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = appointmentController;

const router = express.Router();

// routes
router
  .route("/")
  .get(
    protect,
    allowAccessTo("admin", "user"),
    paginationValidator,
    validate,
    getAllAppointments
  )
  .post(protect, allowAccessTo("admin", "user"), validate, createAppointment);

router
  .route("/:id")
  .get(protect, getAppointmentById)
  .patch(protect, allowAccessTo("admin", "user"), updateAppointment)
  .delete(protect, allowAccessTo("admin", "user"), deleteAppointment);

module.exports = router;
