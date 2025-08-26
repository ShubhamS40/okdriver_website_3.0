const express = require('express');
const {
  getAssignedVehicles,
} = require('./../../../controller/company/client/getAssignedVechileDetails'); // SAME folder ka route.js import karo
const {
  clientLogin
} = require('./../../../controller/company/client/clientController'); // SAME folder ka route.js import karo
const {
  getVehicleChats,sendMessageToVehicle
} = require('./../../../controller/company/client/chatVechileController'); // SAME folder ka route.js import karo

const verifyClientAuth = require('../../../middleware/verifyClientAuth');

const router = express.Router();

// Login/Register Client
router.post('/login', clientLogin);

// Get all assigned vehicles (with last location)
router.get('/vehicles', verifyClientAuth, getAssignedVehicles);

// Send message to a vehicle
router.post('/chat', verifyClientAuth, sendMessageToVehicle);

// Get chat history for a vehicle
router.get('/chat/:vehicleId', verifyClientAuth, getVehicleChats);

module.exports = router;
