const express = require('express');
const { addVehicle, updateVehicle, deleteVehicle, getAllVehicles } = require('../../../controller/company/vechile/route');

const router = express.Router();

// @route   POST /api/vehicles
// @desc    Add a new vehicle
router.post('/vehicles', addVehicle);

// @route   PUT /api/vehicles/:id
// @desc    Update vehicle details
router.put('/vehicles/:id', updateVehicle);

// @route   DELETE /api/vehicles/:id
// @desc    Delete a vehicle
router.delete('/vehicles/:id', deleteVehicle);

// @route   GET /api/vehicles
// @desc    Get all vehicles
router.get('/vehicles', getAllVehicles);
router.get('/shubham', (req, res) => {
  res.send('Hello Shubham');
});

module.exports = router;
