const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Import your User model (assuming you have one)
const User = require('../models/user'); // Replace with the actual path

// POST route for user registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST route for user login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by their username
    const user = await User.findOne({ username });

    // If user does not exist, return an error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords do not match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Log the user in (you might use a session or JWT for this)
    // For simplicity, we'll assume a successful login here
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
