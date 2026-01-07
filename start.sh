#!/bin/bash

echo "======================================"
echo "DSA Nexus - Quick Start Script"
echo "======================================"
echo ""

check_command() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ $1 is not installed. Please install it first."
        return 1
    else
        echo "✅ $1 is installed"
        return 0
    fi
}

echo "Checking prerequisites..."
check_command node
check_command npm
check_command mongod
check_command python3
check_command java
check_command g++

echo ""
echo "======================================"
echo "Setting up the project..."
echo "======================================"
echo ""

echo "1. Installing server dependencies..."
cd server
npm install
cd ..

echo ""
echo "2. Installing client dependencies..."
cd client
npm install
cd ..

echo ""
echo "3. Starting MongoDB..."
if command -v brew &> /dev/null; then
    brew services start mongodb-community
elif command -v systemctl &> /dev/null; then
    sudo systemctl start mongod
else
    echo "Please start MongoDB manually"
fi

echo ""
echo "4. Seeding database..."
cd database
node seed.js
cd ..

echo ""
echo "======================================"
echo "Starting the application..."
echo "======================================"
echo ""

echo "Starting backend server..."
cd server
npm run dev &
SERVER_PID=$!
cd ..

sleep 5

echo "Starting frontend client..."
cd client
npm run dev &
CLIENT_PID=$!
cd ..

echo ""
echo "======================================"
echo "✅ Application is running!"
echo "======================================"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

trap "kill $SERVER_PID $CLIENT_PID" EXIT

wait
