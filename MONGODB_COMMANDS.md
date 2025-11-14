# MongoDB Commands Reference

## Quick Start - Windows Users

### 1. Check MongoDB Service Status
```batch
sc query MongoDB
```

### 2. Start MongoDB Service
```batch
net start MongoDB
```

### 3. Stop MongoDB Service
```batch
net stop MongoDB
```

### 4. Open MongoDB Shell (CLI)
```batch
mongosh
```

### 5. Open MongoDB Compass (GUI - Easier!)
- Search for "MongoDB Compass" in Windows Start Menu
- Click Connect (default: localhost:27017)

---

## Using MongoDB Shell (mongosh)

### Connect to MongoDB
```bash
mongosh
# or
mongosh mongodb://localhost:27017
```

### Create Database
```javascript
use interviewdb
```

### Check Current Database
```javascript
db
```

### List All Databases
```javascript
show dbs
```

### Create Collection
```javascript
db.createCollection("questions")
```

### View Collections
```javascript
show collections
```

### Insert Single Question
```javascript
db.questions.insertOne({
  "question": "Tell me about yourself.",
  "category": "HR",
  "difficulty": "Easy"
})
```

### Insert Multiple Questions
```javascript
db.questions.insertMany([
  { "question": "Tell me about yourself.", "category": "HR", "difficulty": "Easy" },
  { "question": "What are your strengths?", "category": "HR", "difficulty": "Medium" },
  { "question": "Explain polymorphism.", "category": "Technical", "difficulty": "Hard" }
])
```

### Find All Questions
```javascript
db.questions.find()

// Pretty print
db.questions.find().pretty()
```

### Find Specific Question
```javascript
db.questions.find({ question: "Tell me about yourself." })

// By category
db.questions.find({ category: "HR" })

// By difficulty
db.questions.find({ difficulty: "Easy" })
```

### Count Questions
```javascript
db.questions.countDocuments()

// By category
db.questions.countDocuments({ category: "Technical" })
```

### Update Question
```javascript
db.questions.updateOne(
  { question: "Tell me about yourself." },
  { $set: { difficulty: "Medium" } }
)
```

### Delete Question
```javascript
db.questions.deleteOne({ question: "Tell me about yourself." })

// Delete by ID
db.questions.deleteOne({ _id: ObjectId("...") })
```

### Delete All Questions
```javascript
db.questions.deleteMany({})
```

### Drop Collection
```javascript
db.questions.drop()
```

### Drop Database
```javascript
db.dropDatabase()
```

---

## Export Commands

### Export to JSON (Command Line)
```bash
mongodump --db interviewdb --collection questions --out ./backup
```

### Export All Data to JSON
```bash
mongodump --out ./backup
```

### Export from Remote MongoDB
```bash
mongodump --uri "mongodb+srv://username:password@cluster.mongodb.net/interviewdb" --out ./backup
```

---

## Import Commands

### Import from JSON
```bash
mongoimport --db interviewdb --collection questions --file questions.json --jsonArray --drop
```

### Import from BSON
```bash
mongorestore --db interviewdb ./backup/interviewdb
```

---

## Useful Queries

### Find All with Sort
```javascript
db.questions.find().sort({ difficulty: 1 })  // Ascending
db.questions.find().sort({ difficulty: -1 }) // Descending
```

### Find with Limit
```javascript
db.questions.find().limit(5)
```

### Find with Skip
```javascript
db.questions.find().skip(5).limit(5)
```

### Find with Projection (Select specific fields)
```javascript
db.questions.find({}, { question: 1, category: 1 })
```

### Find with Regex
```javascript
db.questions.find({ question: /yourself/ })
```

### Aggregation Pipeline
```javascript
db.questions.aggregate([
  { $match: { category: "HR" } },
  { $group: { _id: "$difficulty", count: { $sum: 1 } } }
])
```

---

## Using Node.js/Express API

### Install Dependencies
```bash
npm install express mongoose cors dotenv
```

### Copy .env file
```batch
copy .env.example .env
```

### Start Server
```bash
npm run server
```

### API Endpoints

#### Get All Questions
```bash
GET http://localhost:5000/api/questions
```

#### Get Questions by Category
```bash
GET http://localhost:5000/api/questions/category/HR
```

#### Get Single Question
```bash
GET http://localhost:5000/api/questions/:id
```

#### Create Question
```bash
POST http://localhost:5000/api/questions
Content-Type: application/json

{
  "question": "Tell me about yourself.",
  "category": "HR",
  "difficulty": "Easy"
}
```

#### Update Question
```bash
PUT http://localhost:5000/api/questions/:id
Content-Type: application/json

{
  "question": "Updated question text",
  "category": "Technical",
  "difficulty": "Hard"
}
```

#### Delete Question
```bash
DELETE http://localhost:5000/api/questions/:id
```

#### Bulk Import Questions
```bash
POST http://localhost:5000/api/questions/bulk/import
Content-Type: application/json

{
  "questions": [
    { "question": "Q1", "category": "HR", "difficulty": "Easy" },
    { "question": "Q2", "category": "Technical", "difficulty": "Hard" }
  ]
}
```

#### Health Check
```bash
GET http://localhost:5000/api/health
```

---

## Troubleshooting

### MongoDB won't start
- Check if port 27017 is in use
- Check Windows Services (services.msc)
- Check MongoDB logs in: `C:\Program Files\MongoDB\Server\7.0\log`

### mongosh command not found
- Add MongoDB to PATH or use full path:
  ```batch
  "C:\Program Files\MongoDB\Server\7.0\bin\mongosh.exe"
  ```

### Cannot connect to MongoDB
- Make sure MongoDB service is running
- Check firewall settings
- Try: `mongosh --eval "db.adminCommand('ping')"`

### Import fails
- Verify JSON file format is valid
- Make sure MongoDB is running
- Check file path is correct
- Ensure database doesn't have validation issues

### Permission denied errors
- Run Command Prompt as Administrator
- Check file permissions
- Check MongoDB data directory permissions

---

## Database Backup & Restore

### Backup Everything
```bash
mongodump --out C:\Users\YourName\MongoDB_Backup
```

### Restore Everything
```bash
mongorestore C:\Users\YourName\MongoDB_Backup
```

### Backup Specific Database
```bash
mongodump --db interviewdb --out C:\Users\YourName\MongoDB_Backup
```

### Restore Specific Database
```bash
mongorestore --db interviewdb C:\Users\YourName\MongoDB_Backup\interviewdb
```

---

## Using MongoDB Compass (GUI)

1. **Open MongoDB Compass** (search in Windows Start Menu)
2. **Click "Connect"** (connects to localhost:27017 by default)
3. **Create Database**: Click "+" button, enter database name "interviewdb"
4. **Create Collection**: Click "+" button, enter collection name "questions"
5. **Insert Document**: Click "Insert Document", paste JSON:
   ```json
   {
     "question": "Tell me about yourself.",
     "category": "HR",
     "difficulty": "Easy"
   }
   ```
6. **Import Data**: Click "Import Data" button, select questions.json file
7. **Export Data**: Select database → Click "Export Collection" → Choose format (JSON/CSV)
8. **View Data**: Click collection to see all documents
9. **Query Data**: Use query filter at top:
   ```json
   { "category": "HR" }
   ```

---

## Connection Strings

### Local MongoDB
```
mongodb://localhost:27017/interviewdb
```

### MongoDB Atlas (Cloud)
```
mongodb+srv://username:password@cluster-name.mongodb.net/interviewdb?retryWrites=true&w=majority
```

### MongoDB with Authentication
```
mongodb://username:password@localhost:27017/interviewdb
```

---

## Environment Variables (.env)

```
MONGO_URI=mongodb://localhost:27017/interviewdb
PORT=5000
NODE_ENV=development
```

---

## Next Steps

1. ✅ Install MongoDB
2. ✅ Start MongoDB service
3. ✅ Create database and collections
4. ✅ Import questions
5. ✅ Set up Node.js backend
6. ✅ Connect React frontend to API
7. ✅ Deploy to cloud

---
