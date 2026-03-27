// Authentication Controller
// Handles login, signup, and user authentication

const User = require('../models/User');
const { generateToken } = require('../middleware/auth');
const { successResponse, errorResponse } = require('../utils/helpers');

/**
 * Register new user (Signup)
 */
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, missionName, spaceAgency } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      missionName,
      spaceAgency,
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json(
      successResponse(
        {
          token,
          user: user.getPublicProfile(),
        },
        'User registered successfully'
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check password
    const isPasswordWithin = await user.matchPassword(password);
    if (!isPasswordWithin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.json(
      successResponse(
        {
          token,
          user: user.getPublicProfile(),
        },
        'Login successful'
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user profile
 */
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json(successResponse(user.getPublicProfile(), 'Profile retrieved'));
  } catch (error) {
    next(error);
  }
};

/**
 * Update user profile
 */
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, missionName, spaceAgency, crewPosition, age, bloodType } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        name,
        missionName,
        spaceAgency,
        crewPosition,
        age,
        bloodType,
      },
      { new: true, runValidators: true }
    );

    res.json(successResponse(user.getPublicProfile(), 'Profile updated successfully'));
  } catch (error) {
    next(error);
  }
};

/**
 * Logout (on client side mainly)
 */
exports.logout = (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful. Please clear your JWT token on the client.',
  });
};
