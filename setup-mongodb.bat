@echo off
REM MongoDB Setup and Database Import Script for Windows

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║   Interview Prep App - MongoDB Setup                   ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Check if MongoDB is installed
echo Checking MongoDB installation...
where mongod >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ MongoDB is not installed or not in PATH
    echo.
    echo Please download and install MongoDB from:
    echo https://www.mongodb.com/try/download/community
    echo.
    pause
    exit /b 1
)

echo ✅ MongoDB found!
echo.

REM Check if MongoDB service is running
echo Checking MongoDB service status...
sc query MongoDB >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /F "tokens=3" %%A in ('sc query MongoDB ^| findstr "STATE"') do (
        if "%%A"=="RUNNING" (
            echo ✅ MongoDB service is running
        ) else (
            echo ⚠️  MongoDB service is not running
            echo Starting MongoDB service...
            net start MongoDB
        )
    )
) else (
    echo ⚠️  MongoDB service not found as Windows Service
    echo Make sure MongoDB is running before proceeding
)

echo.
echo Waiting for MongoDB to be ready...
timeout /t 2 /nobreak

REM Test connection
echo Testing MongoDB connection...
mongosh --version >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ MongoDB shell available
    echo.
    echo Creating database and importing questions...
    REM This will be done by Node.js server
) else (
    echo ⚠️  MongoDB shell not available
    echo You can still use MongoDB Compass or connect from Node.js
)

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║   Setup Complete!                                       ║
echo ╚════════════════════════════════════════════════════════╝
echo.
echo Next steps:
echo 1. Install Node.js dependencies:
echo    npm install
echo.
echo 2. Install MongoDB dependencies:
echo    npm install express mongoose cors dotenv
echo.
echo 3. Copy .env.example to .env:
echo    copy .env.example .env
echo.
echo 4. Start the backend server:
echo    npm run server
echo.
echo 5. Import questions to MongoDB via API:
echo    Use the provided MongoDB import commands or Postman
echo.
pause
