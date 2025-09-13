const express = require('express');
const router = express.Router();

// Import controllers
const { createVehicleLimitPlan } = require('../../../../../controller/admin/company/top_up_Plan/vehicle-limit-plan/createVehicleLimitPlanController');
const { getVehicleLimitPlans } = require('../../../../../controller/admin/company/top_up_Plan/vehicle-limit-plan/getVehicleLimitAllPlanController');
const { updateVehicleLimitPlan } = require('../../../../../controller/admin/company/top_up_Plan/vehicle-limit-plan/updateVehicleLimitPlan.controller');
const { deleteVehicleLimitPlan } = require('../../../../../controller/admin/company/top_up_Plan/vehicle-limit-plan/deleteVehicleLimitPlan.controller');

// Routes
// Create a new vehicle limit plan
router.post('/vehicle-limit-plans', createVehicleLimitPlan);

// Get all vehicle limit plans
router.get('/vehicle-limit-plans', getVehicleLimitPlans);

// Update a vehicle limit plan
router.put('/vehicle-limit-plans/:id', updateVehicleLimitPlan);

// Delete a vehicle limit plan
router.delete('/vehicle-limit-plans/:id', deleteVehicleLimitPlan);

module.exports = router;
