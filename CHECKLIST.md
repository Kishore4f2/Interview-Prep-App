# ✅ MongoDB Setup Checklist

## 🎯 Pre-Setup Requirements

- [ ] Windows/Mac/Linux OS
- [ ] Node.js 22.x or higher installed
- [ ] npm 10.x or higher installed
- [ ] Internet connection (for downloads)
- [ ] Administrator access (for installing MongoDB)

**Verify:**
```bash
node --version
npm --version
```

---

## 🔧 Installation Phase

### Step 1: Install MongoDB

- [ ] Download MongoDB Community Edition from https://www.mongodb.com/try/download/community
- [ ] Run the `.msi` installer
- [ ] Accept license agreement
- [ ] Choose "Complete Setup"
- [ ] ✅ **Ensure "Install MongoDB as a Service" is checked**
- [ ] Complete installation
- [ ] MongoDB service should start automatically

**Verify:**
```bash
mongosh --version
```

### Step 2: Verify MongoDB Service

- [ ] Press `Win + R` → type `services.msc`
- [ ] Look for "MongoDB Server" in the list
- [ ] Check Status column shows "Running"
- [ ] Check "Startup Type" is "Automatic"
- [ ] If not running: Right-click → "Start"

**Alternative Verify:**
```bash
sc query MongoDB
```

---

## 📦 Project Setup Phase

### Step 3: Install Dependencies

```bash
cd "C:\Users\MK MUGHAL\OneDrive\Desktop\interview-prep-app"
npm install
```

- [ ] Command completes without errors
- [ ] `node_modules` folder created
- [ ] All 4 new packages installed:
  - [ ] express
  - [ ] mongoose
  - [ ] cors
  - [ ] dotenv

**Verify:**
```bash
npm list express mongoose cors dotenv
```

### Step 4: Create Environment File

```bash
copy .env.example .env
```

- [ ] `.env` file created in project root
- [ ] Contains `MONGO_URI=mongodb://localhost:27017/interviewdb`
- [ ] Contains `PORT=5000`
- [ ] File is **NOT** committed to git

**Check file:**
```bash
type .env
```

---

## 🗄️ Database Setup Phase

### Step 5: Import Interview Questions

**Choose ONE method:**

#### Method A: Node.js Script (Recommended)
```bash
npm run import-db
```
- [ ] Script runs successfully
- [ ] Shows "✅ Import Completed Successfully!"
- [ ] Displays summary: "23 questions imported"
- [ ] Shows breakdown by category
- [ ] Shows breakdown by difficulty

#### Method B: Windows Batch Script
```bash
import-mongodb.bat
```
- [ ] Script runs
- [ ] Shows success message
- [ ] 23 questions imported

#### Method C: MongoDB Compass (GUI)
- [ ] Open MongoDB Compass
- [ ] Click "Connect"
- [ ] Click "Import Data"
- [ ] Select `questions.json` file
- [ ] Choose `interviewdb` database
- [ ] Choose `questions` collection
- [ ] Click "Import"
- [ ] See success confirmation

#### Method D: Command Line
```bash
mongoimport --db=interviewdb --collection=questions --file=questions.json --jsonArray --drop
```
- [ ] Command succeeds
- [ ] Shows "23 imported"

**Verify Import:**
```bash
mongosh
> use interviewdb
> db.questions.countDocuments()
```
Should output: `23`

---

## 🚀 Backend Startup Phase

### Step 6: Start Backend Server

```bash
npm run server
```

- [ ] Server starts without errors
- [ ] Displays: "✅ Connected to MongoDB"
- [ ] Displays: "🚀 Server running on http://localhost:5000"
- [ ] Shows API endpoint list
- [ ] No error messages in console

**Console should show:**
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
📝 API Documentation:
   GET  /api/questions
   GET  /api/questions/:id
   ... (more endpoints)
```

---

## ✔️ API Verification Phase

### Step 7: Test API Endpoints

#### Test 1: Health Check
```bash
curl http://localhost:5000/api/health
```
- [ ] Returns JSON response
- [ ] Shows MongoDB: "Connected"

#### Test 2: Get All Questions
```bash
curl http://localhost:5000/api/questions
```
- [ ] Returns JSON array
- [ ] Contains 23 questions
- [ ] Each question has `_id`, `question`, `category`, `difficulty`

#### Test 3: Get Specific Category
```bash
curl http://localhost:5000/api/questions/category/HR
```
- [ ] Returns HR questions only
- [ ] Count shows: 7 questions

#### Test 4: Get by Category
```bash
curl http://localhost:5000/api/questions/category/Technical
```
- [ ] Returns Technical questions
- [ ] Count shows: 6 questions

#### Test 5: Get by Category
```bash
curl http://localhost:5000/api/questions/category/Aptitude
```
- [ ] Returns Aptitude questions
- [ ] Count shows: 5 questions

#### Test 6: Get by Category
```bash
curl http://localhost:5000/api/questions/category/Logical
```
- [ ] Returns Logical questions
- [ ] Count shows: 5 questions

---

## 🔍 MongoDB Verification Phase

### Step 8: Verify Database with MongoDB Compass

- [ ] Open MongoDB Compass
- [ ] Click "Connect"
- [ ] In left panel, expand "Databases"
- [ ] Find "interviewdb" database
- [ ] Click to expand
- [ ] Find "questions" collection
- [ ] Click to open
- [ ] See all 23 questions displayed
- [ ] Can scroll through questions
- [ ] Each document shows proper structure

**Or Command Line:**
```bash
mongosh
> use interviewdb
> db.questions.find().pretty()
> db.questions.countDocuments()
```

---

## 📤 Export Verification Phase

### Step 9: Test Export Functionality

#### Export as JSON
```bash
mongoexport --db=interviewdb --collection=questions --out=test_export.json
```
- [ ] Command succeeds
- [ ] Creates `test_export.json` file
- [ ] File contains 23 documents
- [ ] File is valid JSON

#### Verify Export File
```bash
type test_export.json
```
- [ ] Shows JSON content
- [ ] Each document has all fields
- [ ] No errors parsing JSON

---

## 📝 Documentation Review Phase

### Step 10: Review Guides

- [ ] Read `START_HERE.md`
- [ ] Read `QUICK_START.md`
- [ ] Skim `MONGODB_SETUP.md`
- [ ] Bookmark `MONGODB_COMMANDS.md`
- [ ] Check `SETUP_COMPLETE.md`
- [ ] Review `VISUAL_SUMMARY.md`

---

## 🎯 Backend Integration Phase

### Step 11: Update React to Use API

In `src/InterviewPrepApp.js`:

- [ ] Add function to fetch questions from API:
```javascript
const fetchQuestions = async (category) => {
  const url = category 
    ? `http://localhost:5000/api/questions/category/${category}`
    : `http://localhost:5000/api/questions`;
  
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
};
```

- [ ] Update `handleDomainSelect` to use API instead of hardcoded questions
- [ ] Test that questions load from database
- [ ] Verify all 4 categories work correctly

---

## 🧪 Final Testing Phase

### Step 12: Complete Integration Test

- [ ] Stop server: `Ctrl+C`
- [ ] Start server: `npm run server`
- [ ] Open browser: `http://localhost:5000/api/questions`
- [ ] See all 23 questions in JSON
- [ ] Test each API endpoint
- [ ] React app loads without errors
- [ ] Can select domain and get questions
- [ ] Questions match database

---

## 🐛 Troubleshooting Checklist

If something doesn't work:

### MongoDB Issues
- [ ] MongoDB service running? (Check Services)
- [ ] Port 27017 available? (Check `netstat -ano | findstr :27017`)
- [ ] MongoDB installed in default location?
- [ ] User has permission to data directory?

### Node.js Issues
- [ ] Node version correct? (`node --version`)
- [ ] npm packages installed? (`npm list`)
- [ ] No syntax errors? (Check console)
- [ ] Network connectivity? (Check firewall)

### Database Issues
- [ ] Database exists? (`use interviewdb`)
- [ ] Collection exists? (`show collections`)
- [ ] Questions imported? (`db.questions.countDocuments()`)
- [ ] Connection string correct in `.env`?

### API Issues
- [ ] Server running on port 5000? (Check console)
- [ ] API responding? (`curl http://localhost:5000/api/health`)
- [ ] MongoDB connected? (Check server logs)
- [ ] CORS enabled? (Check server.js)

### See Also
- `MONGODB_COMMANDS.md` → Troubleshooting section
- `MONGODB_SETUP.md` → Common issues

---

## 📊 Verification Summary

After completing all steps, you should have:

**Software:**
- [ ] MongoDB installed and running
- [ ] Node.js and npm installed
- [ ] All dependencies installed

**Files:**
- [ ] `.env` file created
- [ ] `questions.json` ready
- [ ] `server.js` available
- [ ] All guides created

**Database:**
- [ ] MongoDB service running
- [ ] `interviewdb` database created
- [ ] `questions` collection created
- [ ] 23 documents imported

**Backend:**
- [ ] `npm run server` works
- [ ] Server runs on port 5000
- [ ] All API endpoints working
- [ ] MongoDB connected

**Testing:**
- [ ] API endpoints respond correctly
- [ ] Questions accessible via API
- [ ] Data matches expectations
- [ ] No errors in console

---

## 🎉 Success Indicators

When everything is working, you should see:

```
✅ MongoDB installed
✅ MongoDB service running
✅ npm dependencies installed
✅ .env file created
✅ 23 questions imported
✅ Backend server running on port 5000
✅ All API endpoints working
✅ React app can fetch questions
✅ Database has all expected data
✅ No errors in console
```

---

## 📋 Files Status

| File | Status | Location |
|------|--------|----------|
| server.js | ✅ Created | Root |
| import-questions.js | ✅ Created | Root |
| questions.json | ✅ Created | Root |
| .env.example | ✅ Created | Root |
| .env | ✅ Created | Root |
| package.json | ✅ Updated | Root |
| QUICK_START.md | ✅ Created | Root |
| MONGODB_SETUP.md | ✅ Created | Root |
| MONGODB_COMMANDS.md | ✅ Created | Root |
| SETUP_COMPLETE.md | ✅ Created | Root |
| START_HERE.md | ✅ Created | Root |
| VISUAL_SUMMARY.md | ✅ Created | Root |

---

## 🚀 Ready to Go!

When all checkboxes are checked:

✅ **MongoDB Setup Complete**
✅ **Database Created and Populated**
✅ **Backend Server Running**
✅ **API Endpoints Working**
✅ **Ready for React Integration**

**Next Step:** Read QUICK_START.md again and follow the integration steps

---

## 📞 Need Help?

| Issue | Solution |
|-------|----------|
| Lost? | Read START_HERE.md |
| Quick setup? | Read QUICK_START.md |
| Need commands? | See MONGODB_COMMANDS.md |
| More details? | Check MONGODB_SETUP.md |
| Overview? | Check SETUP_COMPLETE.md |
| Visual? | See VISUAL_SUMMARY.md |

---

**Setup Date**: November 14, 2025
**Version**: 1.0
**Status**: Ready to Use ✅

---

**🎊 Congratulations on completing the MongoDB Setup!**

*Your Interview Prep App is now database-ready!*
