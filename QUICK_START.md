# Quick Start Guide - MongoDB Setup for Interview Prep App

## ⚡ 5-Minute Setup

### Step 1: Download MongoDB (2 minutes)
1. Go to: https://www.mongodb.com/try/download/community
2. Select **Windows** OS
3. Download the `.msi` installer
4. Run installer and follow the wizard
5. **IMPORTANT**: Choose "Install MongoDB as a Service" (makes it auto-start)

### Step 2: Verify MongoDB is Running (30 seconds)
1. Press `Win + R`
2. Type: `services.msc`
3. Look for **"MongoDB Server"** in the list
4. Status should say **"Running"**
5. If not running, right-click and click "Start"

### Step 3: Install Project Dependencies (1 minute)
```bash
cd "C:\Users\MK MUGHAL\OneDrive\Desktop\interview-prep-app"
npm install
```

### Step 4: Create .env File (30 seconds)
```batch
copy .env.example .env
```

This creates a `.env` file with:
```
MONGO_URI=mongodb://localhost:27017/interviewdb
PORT=5000
```

### Step 5: Import Interview Questions (1 minute)

**Option A: Using Node.js (Recommended)**
```bash
npm run import-db
```

**Option B: Using MongoDB Compass (GUI - Easier)**
1. Open **MongoDB Compass** (from Windows Start Menu)
2. Click "Connect" (default connection)
3. Right-click on "Databases" → "Create Database"
   - Database name: `interviewdb`
   - Collection name: `questions`
4. Click "Import Data" (folder icon)
5. Select `questions.json` file
6. Click "Import"

**Option C: Using Command Line**
```bash
mongoimport --db=interviewdb --collection=questions --file=questions.json --jsonArray --drop
```

### Step 6: Start Your App!
```bash
npm run server
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

---

## 📊 What Gets Imported?

The `questions.json` file contains **23 interview questions** in 4 categories:

- **HR Questions** (7 questions) - "Tell me about yourself", etc.
- **Technical Questions** (6 questions) - Polymorphism, REST APIs, etc.
- **Aptitude Questions** (5 questions) - Math, logic puzzles, etc.
- **Logical Questions** (5 questions) - Brain teasers, deduction, etc.

Each question has:
- `question`: The question text
- `category`: HR, Technical, Aptitude, or Logical
- `difficulty`: Easy, Medium, or Hard
- `createdAt`: Timestamp

---

## 🔍 Verify the Import Worked

### Using MongoDB Compass (GUI)
1. Open MongoDB Compass
2. Look for **"interviewdb"** database in the left panel
3. Click on **"questions"** collection
4. You should see all 23 questions listed

### Using Command Line
```bash
mongosh
> use interviewdb
> db.questions.countDocuments()
```

Output should be: `23`

---

## 📤 Export Database (For Sharing)

### Export as JSON
```bash
mongoexport --db=interviewdb --collection=questions --out=questions_backup.json
```

This creates `questions_backup.json` file you can share with team members.

### Export Using Compass
1. Right-click **"questions"** collection
2. Click **"Export Collection"**
3. Choose **JSON** format
4. Save file

---

## 🚀 Using the Backend API

Once the server is running at `http://localhost:5000`, you can:

### Get all questions
```bash
curl http://localhost:5000/api/questions
```

### Get HR questions only
```bash
curl http://localhost:5000/api/questions/category/HR
```

### Add a new question
```bash
curl -X POST http://localhost:5000/api/questions \
  -H "Content-Type: application/json" \
  -d '{"question":"Your question","category":"HR","difficulty":"Easy"}'
```

---

## 🐛 Troubleshooting

### MongoDB service not running?
1. Press `Win + R` → `services.msc`
2. Find "MongoDB Server"
3. Right-click → "Start"
4. Check "Startup type" is "Automatic"

### `npm run import-db` fails?
1. Make sure MongoDB is running (check above)
2. Make sure `questions.json` file exists in project folder
3. Try using MongoDB Compass instead (Option B above)

### Cannot connect to MongoDB?
1. Check if MongoDB service is running
2. Try: `mongosh` in command prompt
3. If that works, MongoDB is running fine
4. Check `.env` file has correct connection string

### Port 5000 already in use?
1. Change PORT in `.env` file to different number (e.g., 5001)
2. Restart server

### Still having issues?
See the full guides:
- `MONGODB_SETUP.md` - Detailed setup instructions
- `MONGODB_COMMANDS.md` - All MongoDB commands

---

## 📋 Checklist

- [ ] MongoDB installed and running
- [ ] `npm install` completed
- [ ] `.env` file created
- [ ] Questions imported (23 documents)
- [ ] Backend server started (`npm run server`)
- [ ] Can access `http://localhost:5000/api/questions`
- [ ] Questions visible in MongoDB Compass

---

## 🎉 Next Steps

1. **Connect React to Backend**: Update React app to fetch questions from API
2. **Add User Authentication**: Add user login/signup
3. **Store User Answers**: Save user responses to database
4. **Generate Reports**: Create analytics dashboard
5. **Deploy**: Put it online using Vercel, Heroku, Railway, etc.

---

## 📚 Additional Resources

- MongoDB Official Docs: https://docs.mongodb.com/
- Mongoose Documentation: https://mongoosejs.com/
- Express.js Guide: https://expressjs.com/
- MongoDB Compass Guide: https://www.mongodb.com/products/compass

---

**Need help? Check `MONGODB_COMMANDS.md` for detailed reference!**
