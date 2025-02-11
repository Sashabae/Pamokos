const express = require("express");

const invoiceController = require("../controllers/invoiceController");
// const { protect, allowAccessTo } = require("../controllers/usersController");

const paginationValidator = require("../validators/pagination");
const validate = require("../validators/validate");

const {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} = invoiceController;

const router = express.Router();

// routes
router
  .route("/")
  .get(paginationValidator, validate, getAllInvoices)
  .post(validate, createInvoice);

router
  .route("/:id")
  .get(getInvoiceById)
  .patch(updateInvoice)
  .delete(deleteInvoice);

module.exports = router;
