const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

const API_KEY = process.env.API_KEY;
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

// GET
const getCurrency = async (req, res) => {
  const { base } = req.params;

  if (!base) {
    return res.status(400).json({
      status: "error",
      error: "Base currency is required.",
    });
  }

  try {
    const response = await axios.get(`${BASE_URL}/latest/${base}`);
    if (response.data.result === "error") {
      return res.status(400).json({
        status: "error",
        error: "Invalid base currency.",
      });
    }
    return res.status(200).json({
      status: "success",
      base: base,
      rates: response.data.conversion_rates,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      error: "Failed to fetch exchange rates.",
    });
  }
};

// POST
const postCurrency = async (req, res) => {
  const { base, target, amount } = req.body;

  if (!base || !target || !amount || amount < 0) {
    return res.status(400).json({
      status: "error",
      error: "Ivalid input / Amount can't be negative.",
    });
  }

  try {
    const response = await axios.get(`${BASE_URL}/latest/${base}`);

    if (response.data.result === "error") {
      return res.status(400).json({
        status: "error",
        error: "Invalid base currency.",
      });
    }

    const exchangeRate = response.data.conversion_rates[target];
    if (!exchangeRate) {
      return res.status(400).json({
        status: "error",
        error: "Invalid target currency.",
      });
    }

    const convertedAmount = amount * exchangeRate;

    return res.json({
      status: "success",
      base,
      target,
      amount,
      convertedAmount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "fail",
      error: "Failed to convert currency.",
    });
  }
};

module.exports = {
  getCurrency,
  postCurrency,
};
