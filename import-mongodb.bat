@echo off
REM MongoDB Import Script for Windows
REM This script imports the interview questions JSON file to MongoDB

setlocal enabledelayedexpansion

set DATABASE_NAME=interviewdb
set COLLECTION_NAME=questions
set JSON_FILE=questions.json

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║   Interview Prep App - MongoDB Import Script           ║
echo ║   (Windows Version)                                     ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Check if mongoimport is available
where mongoimport >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ mongoimport is not installed or not in PATH
    echo.
    echo Fallback: Using MongoDB Compass to import
    echo 1. Open MongoDB Compass
    echo 2. Click on your database (or create one)
    echo 3. Click "Create Database" if needed
    echo    Database: %DATABASE_NAME%
    echo    Collection: %COLLECTION_NAME%
    echo 4. Click Import Data button
    echo 5. Select the %JSON_FILE% file
    echo.
    pause
    exit /b 1
)

echo ✅ mongoimport found
echo.

REM Check if JSON file exists
if not exist "%JSON_FILE%" (
    echo ❌ File not found: %JSON_FILE%
    pause
    exit /b 1
)

echo Importing questions to MongoDB...
echo Database: %DATABASE_NAME%
echo Collection: %COLLECTION_NAME%
echo File: %JSON_FILE%
echo.

mongoimport --db="%DATABASE_NAME%" --collection="%COLLECTION_NAME%" --file="%JSON_FILE%" --jsonArray --drop

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Questions imported successfully!
    echo.
    echo Verify with MongoDB Compass:
    echo 1. Open MongoDB Compass
    echo 2. Connect to localhost:27017
    echo 3. Look for "%DATABASE_NAME%" database
    echo 4. Click on "%COLLECTION_NAME%" collection
    echo.
) else (
    echo.
    echo ❌ Import failed
    echo.
    echo Try this alternative:
    echo mongoimport --db=%DATABASE_NAME% --collection=%COLLECTION_NAME% --file=%JSON_FILE% --jsonArray --drop
    echo.
)

pause
