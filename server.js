// server.js - Node.js Backend with MySQL Connection

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const User = require('./models/User');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Database Connection
sequelize.authenticate()
  .then(() => {
    console.log('✅ Connected to MySQL');
    return sequelize.sync(); // Sync models with database
  })
  .then(() => {
    console.log('✅ Database synced');
  })
  .catch((err) => {
    console.error('❌ MySQL connection error:', err);
  });

// API Routes

// Authentication Routes

// Register User
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Login User
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check for user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running',
    mysql: 'Connected'
  });
});

// FORCE DB SYNC (Temporary Fix)
app.get('/api/fix-db', async (req, res) => {
  try {
    await sequelize.authenticate();
    await User.sync({ alter: true });
    res.send('<h1>✅ Database Fixed! User table created.</h1><p>You can now go back and Sign Up.</p>');
  } catch (error) {
    res.status(500).send(`<h1>❌ Error: ${error.message}</h1>`);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// Start server
const PORT = process.env.PORT || process.env.SERVER_PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

