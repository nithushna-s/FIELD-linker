const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, isAdmin } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ firstName, lastName, email, password: hashedPassword, isAdmin });
    await user.save();

    const token = jwt.sign({ userId: user._id, email: user.email, isAdmin: user.isAdmin }, secretKey, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true, maxAge: 360 });

    res.json({ message: 'Signup successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found or password incorrect, return error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email, isAdmin: user.isAdmin }, secretKey, { expiresIn: '1h' });

    // Send success response with token and isAdmin flag
    return res.json({ isAdmin: user.isAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const logout = async (req, res) => {
  try {
    res.clearCookie('token');

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { signup, login, logout };
