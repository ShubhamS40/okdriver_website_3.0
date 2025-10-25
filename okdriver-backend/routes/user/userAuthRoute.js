const express = require('express');
const router = express.Router();
const {
  saveUserFromGoogle,
  getUserProfile,
  createApiKey,
  getUserApiKeys,
  deactivateApiKey,
  updateUserProfile
} = require('../../controller/user/userAuthController');

// Save user from Google authentication
router.post('/save-user', saveUserFromGoogle);

// Get user profile
router.get('/profile/:userId', getUserProfile);

// Update user profile
router.put('/profile/:userId', updateUserProfile);

// Create API key for user
router.post('/api-key/:userId', createApiKey);

// Get user's API keys
router.get('/api-keys/:userId', getUserApiKeys);

// Deactivate API key
router.put('/api-key/:userId/:keyId/deactivate', deactivateApiKey);

module.exports = router;
