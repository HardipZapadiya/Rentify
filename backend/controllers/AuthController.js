const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// @desc    Register user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  const { name, email, password, phone_number, address } = req.body;
  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password, phone_number, address, role: 'Customer' });

    res.status(201).json({
      id: user.user_id, name: user.name, email: user.email,
      role: user.role, token: generateToken(user.user_id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
const authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && (await user.matchPassword(password))) {
      res.json({
        id: user.user_id, name: user.name, email: user.email,
        role: user.role, token: generateToken(user.user_id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.user_id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
const updateUserProfile = async (req, res) => {
  const { name, phone_number, address, currentPassword, newPassword } = req.body;
  try {
    const user = await User.findByPk(req.user.user_id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update basic fields
    if (name) user.name = name;
    if (phone_number !== undefined) user.phone_number = phone_number;
    if (address !== undefined) user.address = address;

    // Handle password change
    if (newPassword) {
      if (!currentPassword) return res.status(400).json({ message: 'Current password required' });
      const isMatch = await user.matchPassword(currentPassword);
      if (!isMatch) return res.status(401).json({ message: 'Current password is incorrect' });
      
      if (newPassword.length < 6) {
        return res.status(400).json({ message: 'New password must be at least 6 characters long' });
      }
      
      user.password = newPassword; // hook will hash this
    }

    await user.save();
    res.json({
      id: user.user_id, name: user.name, email: user.email,
      role: user.role, phone_number: user.phone_number, address: user.address
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, authUser, getUserProfile, updateUserProfile };
