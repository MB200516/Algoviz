@echo off
echo ======================================
echo DSA Nexus - Quick Start Script
echo ======================================
echo.

echo Checking prerequisites...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo X node is not installed
    pause
    exit /b 1
) else (
    echo √ node is installed
)

where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo X npm is not installed
    pause
    exit /b 1
) else (
    echo √ npm is installed
)

echo.
echo ======================================
echo Setting up the project...
echo ======================================
echo.

echo 1. Installing server dependencies...
cd server
call npm install
cd ..

echo.
echo 2. Installing client dependencies...
cd client
call npm install
cd ..

echo.
echo 3. Starting MongoDB...
echo Please ensure MongoDB is running manually
net start MongoDB

echo.
echo 4. Seeding database...
cd database
node seed.js
cd ..

echo.
echo ======================================
echo Starting the application...
echo ======================================
echo.

echo Starting backend server...
start cmd /k "cd server && npm run dev"

timeout /t 5

echo Starting frontend client...
start cmd /k "cd client && npm run dev"

echo.
echo ======================================
echo √ Application is starting!
echo ======================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Close this window when done
pause
