const express = require('express');
const {
  getAssignedVehicles,
  getVehicleLocationHistory,
  getAssignedVehiclesRealTime,
} = require('./../../../controller/company/client/getAssignedVechileDetails'); // SAME folder ka route.js import karo
const {
  clientLogin,
  sendClientOtp,
  verifyClientOtp
} = require('./../../../controller/company/client/clientController'); // SAME folder ka route.js import karo
const {
  getVehicleChats,sendMessageToVehicle
} = require('./../../../controller/company/client/chatVechileController'); // SAME folder ka route.js import karo

const verifyClientAuth = require('../../../middleware/verifyClientAuth');
const { verifyCompanyAuth } = require('../../../middleware/companyAuth');

// List controllers
const {
  createClientList,
  getClientLists,
  deleteClientList,
  addMemberToList,
  removeMemberFromList,
  assignListToVehicle,
  revokeListFromVehicle,
  getVehicleClients
} = require('../../../controller/company/client/listController');
const { getVehicleListAssignments, getVehicleDetails } = require('../../../controller/company/client/listAssignmentsController');

const router = express.Router();

// Debug route to test if router is working
router.get('/test', (req, res) => {
  console.log('✅ Client route test endpoint hit');
  res.json({ message: 'Client route is working' });
});

// Test route for assigned vehicles endpoint
router.get('/test-assigned-vehicles', (req, res) => {
  console.log('🚗 Test assigned vehicles endpoint hit');
  res.json({ 
    message: 'Assigned vehicles endpoint is working',
    path: req.path,
    method: req.method
  });
});

// Debug route to test assignment endpoint
router.get('/test-assignment/:listId/:vehicleId', verifyCompanyAuth, (req, res) => {
  console.log('🔍 Testing assignment endpoint with:', req.params);
  res.json({ 
    message: 'Assignment test endpoint hit',
    params: req.params,
    companyId: req.company.id
  });
});

// Login/Register Client
router.post('/login', clientLogin);

// OTP via email for client login
router.post('/otp/send', sendClientOtp);
router.post('/otp/verify', verifyClientOtp);

// Get all assigned vehicles (with last location)
router.get('/assigned-vehicles', verifyClientAuth, (req, res, next) => {
  console.log('🚗 GET /assigned-vehicles endpoint hit for client:', req.user);
  next();
}, getAssignedVehicles);

// Get real-time vehicle data
router.get('/assigned-vehicles/realtime', verifyClientAuth, getAssignedVehiclesRealTime);

// Get location history for a specific vehicle
router.get('/assigned-vehicles/:vehicleId/history', verifyClientAuth, getVehicleLocationHistory);

// Send message to a vehicle
router.post('/chat', verifyClientAuth, sendMessageToVehicle);

// Get chat history for a vehicle
router.get('/chat/:vehicleId', verifyClientAuth, getVehicleChats);

// Client Lists (company-authenticated)
router.post('/lists', verifyCompanyAuth, createClientList);
router.get('/lists', verifyCompanyAuth, getClientLists);
router.delete('/lists/:listId', verifyCompanyAuth, deleteClientList);

// Members
router.post('/lists/:listId/members', verifyCompanyAuth, addMemberToList);
router.delete('/lists/:listId/members/:clientId', verifyCompanyAuth, removeMemberFromList);

// Assignments to vehicles
router.post('/lists/:listId/assign/:vehicleId', verifyCompanyAuth, assignListToVehicle);
router.delete('/lists/:listId/assign/:vehicleId', verifyCompanyAuth, revokeListFromVehicle);

// View who can access a vehicle
router.get('/vehicles/:vehicleId/clients', verifyCompanyAuth, getVehicleClients);

// Vehicle -> list names assignments (for dashboard table)
router.get('/vehicles-list-assignments', verifyCompanyAuth, getVehicleListAssignments);

// Vehicle details (location, lists, chats)
router.get('/vehicle/:vehicleId/details', verifyCompanyAuth, getVehicleDetails);

// Import chat controllers
const {
  getClientChatHistory,
  sendCompanyMessageToClient,
  sendClientMessage,
  markClientMessagesAsRead,
  getClientUnreadCount,
} = require('../../../controller/company/client/clientChatController');

// Import additional middleware
const companyOrClientAuth = require('../../../middleware/companyOrClientAuth');

console.log('✅ Client routes loaded with assignListToVehicle route');

// @route   GET /api/company/clients/:clientId/chat-history
// @desc    Get chat history for a specific client (company or client token)
router.get('/:clientId/chat-history', companyOrClientAuth, getClientChatHistory);

// @route   POST /api/company/clients/:clientId/send-message
// @desc    Send message from company to client (company token) or client to company (client token)
router.post('/:clientId/send-message', companyOrClientAuth, (req, res) => {
  // Route to appropriate handler based on user type
  if (req.userType === 'company') {
    return sendCompanyMessageToClient(req, res);
  } else if (req.userType === 'client') {
    return sendClientMessage(req, res);
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
});

// @route   PUT /api/company/clients/:clientId/mark-read
// @desc    Mark messages as read (client token)
router.put('/:clientId/mark-read', companyOrClientAuth, markClientMessagesAsRead);

// @route   GET /api/company/clients/:clientId/unread-count
// @desc    Get unread message count for client (client token)
router.get('/:clientId/unread-count', companyOrClientAuth, getClientUnreadCount);

module.exports = router;