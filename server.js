// server.js - Node.js Backend with MongoDB Connection

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/interviewdb';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// Define Question Schema
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['HR', 'Technical', 'Aptitude', 'Logical'],
    default: 'HR'
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create Question Model
const Question = mongoose.model('Question', questionSchema);

// API Routes

// Get all questions
app.get('/api/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get questions by category
app.get('/api/questions/category/:category', async (req, res) => {
  try {
    const questions = await Question.find({ category: req.params.category });
    res.json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get a single question
app.get('/api/questions/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    res.json({
      success: true,
      data: question
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Create a new question
app.post('/api/questions', async (req, res) => {
  try {
    const { question, category, difficulty } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: 'Question text is required'
      });
    }

    const newQuestion = new Question({
      question,
      category: category || 'HR',
      difficulty: difficulty || 'Medium'
    });

    await newQuestion.save();
    res.status(201).json({
      success: true,
      message: 'Question created successfully',
      data: newQuestion
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update a question
app.put('/api/questions/:id', async (req, res) => {
  try {
    const { question, category, difficulty } = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      { question, category, difficulty },
      { new: true, runValidators: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    res.json({
      success: true,
      message: 'Question updated successfully',
      data: updatedQuestion
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Delete a question
app.delete('/api/questions/:id', async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);

    if (!deletedQuestion) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    res.json({
      success: true,
      message: 'Question deleted successfully',
      data: deletedQuestion
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Bulk import questions
app.post('/api/questions/bulk/import', async (req, res) => {
  try {
    const { questions } = req.body;

    if (!Array.isArray(questions)) {
      return res.status(400).json({
        success: false,
        message: 'Questions must be an array'
      });
    }

    const insertedQuestions = await Question.insertMany(questions);
    res.status(201).json({
      success: true,
      message: `${insertedQuestions.length} questions imported successfully`,
      count: insertedQuestions.length,
      data: insertedQuestions
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
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation:`);
  console.log(`   GET  /api/questions - Get all questions`);
  console.log(`   GET  /api/questions/:id - Get a specific question`);
  console.log(`   GET  /api/questions/category/:category - Get questions by category`);
  console.log(`   POST /api/questions - Create a new question`);
  console.log(`   PUT  /api/questions/:id - Update a question`);
  console.log(`   DELETE /api/questions/:id - Delete a question`);
  console.log(`   POST /api/questions/bulk/import - Bulk import questions`);
  console.log(`   GET  /api/health - Health check`);
});
