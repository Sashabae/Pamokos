const {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getFilteredInvoices,
} = require("../models/InvoiceModel");
const AppError = require("../utils/appError");

// GET ALL
exports.getAllInvoices = async (req, res) => {
  try {
    let { page, limit = 10, status } = req.query;

    // Default values if not provided
    page = parseInt(page); // page
    limit = parseInt(limit); // items per page
    // Calculate offset
    const offset = (page - 1) * limit;

    // Validate inputs
    if (page < 1 || limit < 1) {
      return res.status(400).json({ error: "Invalid page or limit value" });
    }

    //get paginated invoices
    const { invoices, totalCount } = await getAllInvoices(limit, offset, status);

    if (!invoices.length === 0) {
      throw new AppError("No invoices found", 404);
    }

    // response format is JSend
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      data: invoices,
      meta: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET BY ID
exports.getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await getInvoiceById(id);

    if (!invoice) {
      res.status(404).json({
        status: "fail",
        message: "Invalid id, invoice not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: invoice,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// POST
exports.createInvoice = async (req, res) => {
  try {
    const newInvoice = req.body;

    if (
      !newInvoice ||
      !newInvoice.date ||
      !newInvoice.fullname ||
      !newInvoice.price ||
      !newInvoice.status
    ) {
      res.status(400).json({
        status: "fail",
        message: "Missing invoice information, or its required fields.",
      });
      return;
    }

    // Create new invoice
    const createdInvoice = await createInvoice(newInvoice);

    res.status(201).json({
      status: "success",
      data: createdInvoice,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// PATCH
exports.updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInvoice = req.body;

    if (!updatedInvoice) {
      res.status(400).json({
        status: "fail",
        message: "Missing invoice information",
      });
      return;
    }

    const updated = await updateInvoice(id, updatedInvoice);

    if (!updated) {
      res.status(404).json({
        status: "fail",
        message: "Invalid id. Invoice not found and not updated",
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
exports.deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteInvoice(id);

    if (!deleted) {
      res.status(404).json({
        status: "fail",
        message: "Invalid id. Invoice not found and not deleted",
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

