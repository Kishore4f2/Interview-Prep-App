# Interview Prep App - MongoDB Integration Guide

## 📚 Documentation Files Created

This project now has complete MongoDB integration! Here are all the files:

### 🚀 Getting Started
- **`QUICK_START.md`** ⭐ **START HERE!**
  - 5-minute setup guide
  - Step-by-step instructions
  - Quick verification checklist

### 📖 Detailed Guides
- **`MONGODB_SETUP.md`**
  - Complete installation instructions
  - Connection setup
  - Database creation
  - Export/Import procedures

- **`MONGODB_COMMANDS.md`**
  - All MongoDB commands reference
  - Query examples
  - API endpoint documentation
  - Troubleshooting guide

### 💾 Database Files
- **`questions.json`**
  - 23 sample interview questions
  - Organized by category (HR, Technical, Aptitude, Logical)
  - Ready to import into MongoDB

### 🛠 Setup Scripts
- **`setup-mongodb.bat`** (Windows)
  - Automated setup script
  - Checks MongoDB installation
  - Verifies service status

- **`import-mongodb.bat`** (Windows)
  - Batch script to import questions
  - Easy one-click import

- **`import-mongodb.sh`** (Linux/Mac)
  - Shell script for Unix systems

### 🔧 Backend Files
- **`server.js`**
  - Express.js backend server
  - MongoDB connection setup
  - REST API endpoints for CRUD operations
  - Features:
    - Get all questions
    - Get questions by category
    - Create new questions
    - Update questions
    - Delete questions
    - Bulk import
    - Health check endpoint

- **`import-questions.js`**
  - Node.js script to import questions
  - Beautiful console output
  - Error handling
  - Verification summary

### ⚙️ Configuration Files
- **`.env.example`**
  - Template for environment variables
  - Copy to `.env` and customize

- **`package.json`** (Updated)
  - Added MongoDB dependencies
  - New npm scripts:
    - `npm run server` - Start backend
    - `npm run dev` - Run frontend + backend
    - `npm run import-db` - Import questions

---

## 🎯 Quick Setup (Choose One Method)

### Method 1: Automated (Windows) - 30 seconds
```batch
setup-mongodb.bat
import-mongodb.bat
npm run server
```

### Method 2: Manual (All OS)
```bash
# 1. Copy env file
copy .env.example .env

# 2. Import questions
npm run import-db

# 3. Start server
npm run server
```

### Method 3: Visual (MongoDB Compass)
1. Open MongoDB Compass
2. Click "Import Data"
3. Select `questions.json`
4. Done!

---

## 📊 Data Structure

### Interview Questions Collection

```javascript
{
  _id: ObjectId("..."),
  question: "Tell me about yourself.",
  category: "HR",           // HR, Technical, Aptitude, or Logical
  difficulty: "Easy",       // Easy, Medium, or Hard
  createdAt: ISODate("...")
}
```

### Categories & Questions Count

| Category | Count | Examples |
|----------|-------|----------|
| HR | 7 | Tell me about yourself, Strengths/weaknesses |
| Technical | 6 | Polymorphism, SQL vs NoSQL, Event loop |
| Aptitude | 5 | Math problems, Number sequences |
| Logical | 5 | Brain teasers, Logic puzzles |
| **Total** | **23** | |

---

## 🔌 API Endpoints

All endpoints are at `http://localhost:5000/api/`

### Questions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/questions` | Get all questions |
| GET | `/questions/:id` | Get single question |
| GET | `/questions/category/:category` | Get by category |
| POST | `/questions` | Create question |
| PUT | `/questions/:id` | Update question |
| DELETE | `/questions/:id` | Delete question |
| POST | `/questions/bulk/import` | Bulk import |
| GET | `/health` | Health check |

### Example Requests

**Get all questions:**
```bash
curl http://localhost:5000/api/questions
```

**Get HR questions:**
```bash
curl http://localhost:5000/api/questions/category/HR
```

**Create new question:**
```bash
curl -X POST http://localhost:5000/api/questions \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Your question here?",
    "category": "Technical",
    "difficulty": "Hard"
  }'
```

---

## 🗄️ MongoDB Setup

### Installation
1. Download: https://www.mongodb.com/try/download/community
2. Run installer (choose "Run as Service" option)
3. MongoDB starts automatically

### Verification
```bash
# Check service status
sc query MongoDB

# Connect with CLI
mongosh

# Connect with GUI
# Open "MongoDB Compass" from Start Menu
```

### Database Info
- **Database**: `interviewdb`
- **Collection**: `questions`
- **Host**: `localhost`
- **Port**: `27017`
- **Connection**: `mongodb://localhost:27017/interviewdb`

---

## 📤 Export/Import Data

### Export Questions
```bash
# As JSON
mongoexport --db=interviewdb --collection=questions --out=backup.json

# Using mongodump
mongodump --db=interviewdb --out=./backup
```

### Import Questions
```bash
# From JSON
mongoimport --db=interviewdb --collection=questions --file=questions.json --jsonArray --drop

# From dump
mongorestore --db=interviewdb ./backup/interviewdb
```

### Share with Team
1. Export to JSON:
   ```bash
   mongoexport --db=interviewdb --collection=questions --out=interview_questions.json
   ```
2. Send `interview_questions.json` file
3. Others can import with:
   ```bash
   mongoimport --db=interviewdb --collection=questions --file=interview_questions.json --jsonArray --drop
   ```

---

## 🚀 Running the Application

### Start Backend Server
```bash
npm run server
```

Output:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
📝 API Documentation:
   GET  /api/questions
   GET  /api/questions/:id
   ... (more endpoints)
```

### Start Both Frontend & Backend
```bash
npm run dev
```
(Requires `concurrently` package - install with: `npm install concurrently --save-dev`)

### Start Only Frontend
```bash
npm start
```

---

## 📋 MongoDB Commands Reference

### Connect
```bash
mongosh
mongosh mongodb://localhost:27017/interviewdb
```

### Database Operations
```javascript
show dbs                    // List databases
use interviewdb            // Switch database
db.dropDatabase()           // Delete database
```

### Collection Operations
```javascript
show collections                        // List collections
db.createCollection("questions")       // Create collection
db.questions.drop()                    // Delete collection
```

### Query Operations
```javascript
db.questions.find()                        // Get all
db.questions.find({ category: "HR" })     // Filter
db.questions.countDocuments()              // Count
db.questions.findOne()                     // Get one
```

### Insert Operations
```javascript
db.questions.insertOne({ ... })       // Insert one
db.questions.insertMany([ ... ])      // Insert many
```

### Update Operations
```javascript
db.questions.updateOne(
  { _id: ObjectId("...") },
  { $set: { difficulty: "Hard" } }
)
```

### Delete Operations
```javascript
db.questions.deleteOne({ _id: ObjectId("...") })
db.questions.deleteMany({ category: "HR" })
```

---

## 🐛 Troubleshooting

### MongoDB not running?
```bash
# Check status
sc query MongoDB

# Start service
net start MongoDB

# Stop service
net stop MongoDB
```

### Port already in use?
- Change PORT in `.env`
- Or kill process: `netstat -ano | findstr :5000`

### Cannot import questions?
1. Verify MongoDB is running
2. Check `questions.json` exists
3. Check JSON format is valid
4. Try using MongoDB Compass GUI instead

### Connection refused?
1. Check MongoDB service is running
2. Check firewall allows port 27017
3. Try: `mongosh --eval "db.adminCommand('ping')"`

### See more issues?
Check `MONGODB_COMMANDS.md` section "Troubleshooting"

---

## 📦 Dependencies Added

### Backend Dependencies
- **express**: ^4.18.2 - Web framework
- **mongoose**: ^7.5.0 - MongoDB ODM
- **cors**: ^2.8.5 - Cross-origin requests
- **dotenv**: ^16.3.1 - Environment variables

### Install all
```bash
npm install
```

### Install individually
```bash
npm install express mongoose cors dotenv
```

---

## 📝 File Structure

```
interview-prep-app/
├── src/                          # React frontend
│   ├── InterviewPrepApp.js
│   ├── App.js
│   └── ...
├── public/                       # Static files
├── server.js                     # ✨ Express backend
├── import-questions.js           # ✨ Data import script
├── questions.json               # ✨ Sample questions
├── .env.example                 # ✨ Config template
├── setup-mongodb.bat            # ✨ Setup script (Windows)
├── import-mongodb.bat           # ✨ Import script (Windows)
├── import-mongodb.sh            # ✨ Import script (Unix)
├── package.json                 # ✨ Updated with dependencies
├── QUICK_START.md               # ✨ 5-minute guide
├── MONGODB_SETUP.md             # ✨ Detailed setup
├── MONGODB_COMMANDS.md          # ✨ Command reference
└── README.md                    # ✨ This file

✨ = New or Modified
```

---

## 🎓 Learning Resources

- **MongoDB**: https://docs.mongodb.com/
- **Mongoose**: https://mongoosejs.com/
- **Express**: https://expressjs.com/
- **REST API Design**: https://restfulapi.net/

---

## 🚀 Next Steps

1. ✅ Setup MongoDB
2. ✅ Import questions
3. ✅ Start backend server
4. **Next:** Connect React frontend to backend API
5. **Then:** Add user authentication
6. **Finally:** Deploy to cloud

---

## ❓ Need Help?

1. Check `QUICK_START.md` for 5-minute setup
2. Check `MONGODB_COMMANDS.md` for command reference
3. Check `MONGODB_SETUP.md` for detailed instructions
4. Check troubleshooting sections in any guide

---

**Created with ❤️ for your Interview Prep App**

Last Updated: November 14, 2025
