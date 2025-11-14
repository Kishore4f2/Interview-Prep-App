# MongoDB Setup Guide for Interview Prep App

## Step 1: Download and Install MongoDB

### Option A: MongoDB Community Server (Recommended for Development)
1. Download MongoDB Community Edition from: https://www.mongodb.com/try/download/community
2. Choose Windows as your OS
3. Run the installer (.msi file)
4. Follow the installation wizard:
   - Accept the license agreement
   - Choose "Complete Setup" (includes MongoDB Server, MongoDB Compass, and tools)
   - Click Install
5. MongoDB will be installed and auto-configured as a Windows Service
6. By default, MongoDB runs on: `mongodb://localhost:27017`

### Option B: MongoDB Atlas (Cloud Database - Optional)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Update your environment variables with the connection string

## Step 2: Verify MongoDB Installation

Check if MongoDB is running:
```bash
# On Windows, MongoDB runs as a service by default
# Check Services: Press Win+R → services.msc → Look for "MongoDB Server"

# Or test the connection:
mongosh
```

If mongosh doesn't work, MongoDB tools might not be in PATH. Try:
```bash
"C:\Program Files\MongoDB\Server\7.0\bin\mongosh.exe"
```

## Step 3: Access MongoDB

### Using MongoDB Compass (GUI - Easier)
1. Open MongoDB Compass (installed with MongoDB)
2. Click "Connect"
3. You should see your local database connection

### Using MongoDB Shell (CLI)
```bash
mongosh
```

## Step 4: Create Database and Insert Questions

Once connected via mongosh or Compass:

```javascript
// Create database
use interviewdb

// Create collection
db.createCollection("questions")

// Insert sample questions
db.questions.insertMany([
  { "question": "Tell me about yourself." },
  { "question": "What are your strengths and weaknesses?" },
  { "question": "Why do you want to work for our company?" },
  { "question": "Describe a challenging situation you've overcome." },
  { "question": "What are your career goals for the next 5 years?" },
  { "question": "Explain polymorphism in Object-Oriented Programming." },
  { "question": "What is the difference between SQL and NoSQL databases?" },
  { "question": "How does the event loop work in JavaScript?" },
  { "question": "What is the next number in the sequence: 2, 4, 8, 16?" },
  { "question": "If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?" }
])

// Verify insertion
db.questions.find()
```

## Step 5: Export Database

### Export to JSON
```bash
mongoexport --db interviewdb --collection questions --out questions.json
```

### Export to BSON (Binary Format - preserves more data types)
```bash
mongodump --db interviewdb --collection questions --out ./backup
```

The exported files will be in:
- **JSON**: `questions.json` in your current directory
- **BSON**: `./backup/interviewdb/questions.bson`

## Step 6: Share the Export File

The exported JSON file will look like:
```json
[
  { "_id": { "$oid": "..." }, "question": "Tell me about yourself." },
  { "_id": { "$oid": "..." }, "question": "What are your strengths and weaknesses?" },
  ...
]
```

Share this file with your team members or clients.

## Step 7: Import Database (For Others)

To restore the database:
```bash
mongoimport --db interviewdb --collection questions --file questions.json
```

## Useful MongoDB Commands

```javascript
// Show all databases
show dbs

// Switch to database
use interviewdb

// Show all collections
show collections

// Count documents
db.questions.countDocuments()

// Find all questions
db.questions.find()

// Find specific question
db.questions.find({ question: "Tell me about yourself." })

// Delete a question
db.questions.deleteOne({ question: "Tell me about yourself." })

// Update a question
db.questions.updateOne(
  { question: "Tell me about yourself." },
  { $set: { category: "HR", difficulty: "Easy" } }
)

// Drop collection
db.questions.drop()

// Drop database
db.dropDatabase()
```

## Troubleshooting

### MongoDB not starting?
1. Check if port 27017 is available
2. Check Services (services.msc) - MongoDB Server should be running
3. Check MongoDB logs: `C:\Program Files\MongoDB\Server\7.0\log`

### mongosh command not found?
- Add MongoDB to PATH or use full path to mongosh.exe

### Connection refused?
- Make sure MongoDB service is running
- Check firewall settings

## Next Steps

1. **Install Node.js Dependencies**: Add Express and Mongoose to your React app backend
2. **Create Backend API**: Build REST API to connect to MongoDB
3. **Update Frontend**: Connect React app to backend API
4. **Deploy**: Deploy to cloud service (Heroku, Railway, Vercel)
