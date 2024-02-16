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

    // Create JWT token
    const token = jwt.sign({ userId: user._id, email: user.email, isAdmin: user.isAdmin }, secretKey, { expiresIn: '1h' });

    // Set token as a cookie
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // maxAge is in milliseconds (1 hour)

    res.json({ message: 'Signup successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// User login
const login = async (req, res) => {
  try {
     const { email, password } = req.body;
 
     const user = await User.findOne({ email });
 
     if (!user) {
       return res.status(401).json({ message: 'Invalid credentials' });
     }
 
     const isPasswordValid = await bcrypt.compare(password, user.password);
 
     if (!isPasswordValid) {
       return res.status(401).json({ message: 'Invalid credentials' });
     }
 
    
     if (user.isAdmin) {
       console.log('Admin login successful');
       return res.json({ message: 'Admin login successful', isAdmin: true });
   
 
     } else {
 
       return res.json({ message: 'User login successful', isAdmin: false });
     }
  } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Internal server error' });
  }
 };


const logout = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie('token');

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { signup, login, logout };
