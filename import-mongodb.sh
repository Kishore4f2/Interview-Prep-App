#!/bin/bash
# MongoDB Import Script - For Linux/Mac Users
# For Windows users, use MongoDB Compass or mongoimport command

DATABASE_NAME="interviewdb"
COLLECTION_NAME="questions"
JSON_FILE="questions.json"

echo "╔════════════════════════════════════════════════════════╗"
echo "║   Interview Prep App - MongoDB Import Script           ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Check if mongoimport is available
if ! command -v mongoimport &> /dev/null; then
    echo "❌ mongoimport is not installed or not in PATH"
    echo "   Make sure MongoDB tools are installed"
    exit 1
fi

echo "✅ mongoimport found"
echo ""

# Check if JSON file exists
if [ ! -f "$JSON_FILE" ]; then
    echo "❌ File not found: $JSON_FILE"
    exit 1
fi

echo "Importing questions to MongoDB..."
echo "Database: $DATABASE_NAME"
echo "Collection: $COLLECTION_NAME"
echo "File: $JSON_FILE"
echo ""

mongoimport \
    --db="$DATABASE_NAME" \
    --collection="$COLLECTION_NAME" \
    --file="$JSON_FILE" \
    --jsonArray \
    --drop

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Questions imported successfully!"
    echo ""
    echo "Verify with:"
    echo "  mongosh"
    echo "  > use interviewdb"
    echo "  > db.questions.find()"
else
    echo ""
    echo "❌ Import failed"
    exit 1
fi
