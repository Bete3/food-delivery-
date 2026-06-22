import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Helper function to generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
export const registerUser = async (req, res) => {
  const name = req.body?.name?.trim();
  const email = req.body?.email?.trim().toLowerCase();
  const password = req.body?.password;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide name, email, and password' });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user (password gets hashed automatically via Schema hook)
    const user = await User.create({ name, email, password });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data received' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  const email = req.body?.email?.trim().toLowerCase();
  const password = req.body?.password;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
export const getUserProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  return res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  });
};

// @desc    Update current user profile
// @route   PUT /api/auth/profile
export const updateUserProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const nextName = req.body?.name?.trim();
  const nextEmail = req.body?.email?.trim().toLowerCase();
  const nextPassword = req.body?.password;

  if (nextEmail && nextEmail !== user.email) {
    const emailExists = await User.findOne({ email: nextEmail });
    if (emailExists) {
      return res.status(400).json({ message: 'Email is already in use' });
    }
    user.email = nextEmail;
  }

  if (nextName) {
    user.name = nextName;
  }

  if (nextPassword) {
    user.password = nextPassword;
  }

  const updatedUser = await user.save();

  return res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    token: generateToken(updatedUser._id),
  });
};

// @desc    Get total number of registered users
// @route   GET /api/auth/users/count
export const getUserCount = async (_req, res) => {
  try {
    const count = await User.countDocuments();
    return res.json({ count });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};