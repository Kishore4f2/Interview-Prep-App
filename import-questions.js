// import-questions.js - Import questions from JSON file to MongoDB

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/interviewdb';

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

const Question = mongoose.model('Question', questionSchema);

async function importQuestions() {
  try {
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║   Interview Prep App - MongoDB Import                   ║');
    console.log('╚════════════════════════════════════════════════════════╝');
    console.log('');
    
    // Connect to MongoDB
    console.log(`📡 Connecting to MongoDB: ${MONGO_URI}`);
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');
    console.log('');

    // Read JSON file
    const jsonFilePath = path.join(__dirname, 'questions.json');
    console.log(`📂 Reading questions file: ${jsonFilePath}`);
    
    if (!fs.existsSync(jsonFilePath)) {
      console.error('❌ File not found:', jsonFilePath);
      process.exit(1);
    }

    const questionsData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    console.log(`✅ Found ${questionsData.length} questions`);
    console.log('');

    // Delete existing questions
    console.log('🗑️  Clearing existing questions...');
    const deleteResult = await Question.deleteMany({});
    console.log(`✅ Deleted ${deleteResult.deletedCount} existing questions`);
    console.log('');

    // Insert new questions
    console.log('📝 Importing questions...');
    const insertedQuestions = await Question.insertMany(questionsData);
    console.log(`✅ Successfully imported ${insertedQuestions.length} questions`);
    console.log('');

    // Display summary
    console.log('📊 Summary by Category:');
    const categories = {};
    insertedQuestions.forEach(q => {
      categories[q.category] = (categories[q.category] || 0) + 1;
    });
    
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} questions`);
    });
    console.log('');

    // Display summary by difficulty
    console.log('📈 Summary by Difficulty:');
    const difficulties = {};
    insertedQuestions.forEach(q => {
      difficulties[q.difficulty] = (difficulties[q.difficulty] || 0) + 1;
    });
    
    Object.entries(difficulties).forEach(([difficulty, count]) => {
      console.log(`   ${difficulty}: ${count} questions`);
    });
    console.log('');

    // Verify import
    console.log('🔍 Verifying import...');
    const totalQuestions = await Question.countDocuments();
    console.log(`✅ Total questions in database: ${totalQuestions}`);
    console.log('');

    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║   ✅ Import Completed Successfully!                    ║');
    console.log('╚════════════════════════════════════════════════════════╝');
    console.log('');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Import failed:');
    console.error(error.message);
    console.log('');
    console.log('Troubleshooting:');
    console.log('1. Make sure MongoDB is running');
    console.log('2. Check the MongoDB connection URI in .env');
    console.log('3. Verify questions.json file exists');
    console.log('4. Check JSON file format is valid');
    console.log('');
    process.exit(1);
  }
}

importQuestions();
