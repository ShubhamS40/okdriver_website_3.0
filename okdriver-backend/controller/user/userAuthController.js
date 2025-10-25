const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

// Save or update user from Google authentication
const saveUserFromGoogle = async (req, res) => {
  try {
    const { googleId, email, name, picture, emailVerified } = req.body;

    if (!googleId || !email || !name) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: googleId, email, name'
      });
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { googleId }
    });

    if (user) {
      // Update existing user
      user = await prisma.user.update({
        where: { googleId },
        data: {
          email,
          name,
          picture,
          emailVerified,
          updatedAt: new Date()
        }
      });
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          googleId,
          email,
          name,
          picture,
          emailVerified
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'User saved successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        emailVerified: user.emailVerified
      }
    });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        apiKeys: {
          where: { isActive: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        apiKeys: user.apiKeys
      }
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Create API key for user
const createApiKey = async (req, res) => {
  try {
    const { userId } = req.params;
    const { keyName } = req.body;

    if (!keyName) {
      return res.status(400).json({
        success: false,
        message: 'Key name is required'
      });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate API key
    const apiKey = `okd_${crypto.randomBytes(32).toString('hex')}`;
    
    // Set expiration date (1 year from now)
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    const newApiKey = await prisma.userApiKey.create({
      data: {
        userId,
        keyName,
        apiKey,
        expiresAt
      }
    });

    res.status(201).json({
      success: true,
      message: 'API key created successfully',
      apiKey: {
        id: newApiKey.id,
        keyName: newApiKey.keyName,
        apiKey: newApiKey.apiKey,
        createdAt: newApiKey.createdAt,
        expiresAt: newApiKey.expiresAt
      }
    });
  } catch (error) {
    console.error('Error creating API key:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get user's API keys
const getUserApiKeys = async (req, res) => {
  try {
    const { userId } = req.params;

    const apiKeys = await prisma.userApiKey.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({
      success: true,
      apiKeys: apiKeys.map(key => ({
        id: key.id,
        keyName: key.keyName,
        apiKey: key.apiKey,
        isActive: key.isActive,
        lastUsedAt: key.lastUsedAt,
        createdAt: key.createdAt,
        expiresAt: key.expiresAt
      }))
    });
  } catch (error) {
    console.error('Error fetching API keys:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Deactivate API key
const deactivateApiKey = async (req, res) => {
  try {
    const { userId, keyId } = req.params;

    const apiKey = await prisma.userApiKey.findFirst({
      where: {
        id: keyId,
        userId: userId
      }
    });

    if (!apiKey) {
      return res.status(404).json({
        success: false,
        message: 'API key not found'
      });
    }

    await prisma.userApiKey.update({
      where: { id: keyId },
      data: { isActive: false }
    });

    res.status(200).json({
      success: true,
      message: 'API key deactivated successfully'
    });
  } catch (error) {
    console.error('Error deactivating API key:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, picture } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name || user.name,
        picture: picture || user.picture,
        updatedAt: new Date()
      }
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        picture: updatedUser.picture,
        emailVerified: updatedUser.emailVerified
      }
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  saveUserFromGoogle,
  getUserProfile,
  createApiKey,
  getUserApiKeys,
  deactivateApiKey,
  updateUserProfile
};
