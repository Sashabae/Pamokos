const {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../models/appointmentModel");
const AppError = require("../utils/appError");

// GET ALL
exports.getAllAppointments = async (req, res) => {
  try {
    const search = req.query.search || "";
    const sortBy = req.query.sortBy || "petname"; // Default sorting by petname
    const sortOrder = req.query.sortOrder || "desc"; // Default descending order

    const { appointments } = await getAllAppointments(
      req.user,
      search,
      sortBy,
      sortOrder
    );

    // Return empty array if no appointments found
    if (!appointments || appointments.length === 0) {
      return res.status(200).json({
        status: "success",
        data: { appointments: [] },
      });
    }

    res.status(200).json({
      status: "success",
      data: { appointments },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET BY ID
exports.getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await getAppointmentById(id);

    if (!appointment) {
      res.status(404).json({
        status: "fail",
        message: "Invalid id, appointment not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: appointment,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// POST
exports.createAppointment = async (req, res) => {
  try {
    const newAppointment = req.body;

    if (
      !newAppointment ||
      !newAppointment.petname ||
      !newAppointment.ownername ||
      !newAppointment.date ||
      !newAppointment.time
    ) {
      res.status(400).json({
        status: "fail",
        message: "Missing appointment information, or its required fields.",
      });
      return;
    }

    // Add user id
    newAppointment.userId = req.user.id;

    // Create new appointment
    const createdAppointment = await createAppointment(newAppointment);

    res.status(201).json({
      status: "success",
      data: createdAppointment,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// PATCH
exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAppointment = req.body;

    if (!updatedAppointment) {
      res.status(400).json({
        status: "fail",
        message: "Missing appointment information",
      });
      return;
    }

    const updated = await updateAppointment(id, updatedAppointment);

    if (!updated) {
      res.status(404).json({
        status: "fail",
        message: "Invalid id. Appointment not found and not updated",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: updated,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// DELETE
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteAppointment(id);

    if (!deleted) {
      res.status(404).json({
        status: "fail",
        message: "Invalid id. Appointment not found and not deleted",
      });
      return;
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
