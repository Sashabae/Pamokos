const { data, dir, fs } = require("../models/Model");

// POST
exports.postCarrier = (req, res) => {
  const { pickup_postcode, delivery_postcode, vehicle, carrier_name } =
    req.body;

  const distance = 316;
  const priceDistance = 0.2 * distance; // Base price

  // Vehicle markup
  const vehicleMarkup = {
    bicycle: 1.1,
    motorbike: 1.15,
    parcel_car: 1.2,
    small_van: 1.3,
    large_van: 1.4,
  };

  const totalVehiclePrice = Math.round(priceDistance * vehicleMarkup[vehicle]); // Total price

  const carrier = data.find((c) => c.carrier_name === carrier_name);
  if (!carrier) {
    return res.status(404).json({
      status: "fail",
      error: "Carrier not found",
    });
  }
  const carrierPrice = carrier.base_price;

  fs.writeFile(dir, JSON.stringify(data), () => {
    res.status(201).json({
      pickup_postcode,
      delivery_postcode,
      // distance_km: distance,
      vehicle: vehicle,
      // price: totalVehiclePrice,    // only counting vehicle markup price
      carrier_name,
      price: carrierPrice, // base_price of the carrier
    });
  });
};
