#!/bin/bash

# Function to kill all child processes when script exits
cleanup() {
    echo "Stopping all services..."
    kill $(jobs -p) 2>/dev/null
    exit
}

# Set up trap for cleanup
trap cleanup SIGINT SIGTERM

echo "Starting SMS Services..."

# Start Backend
echo "Starting Backend (Port 5000)..."
npm run dev &

# Start Website
echo "Starting Website (Port 3000)..."
(cd website && npm run dev) &

# Start Mobile
echo "Starting Mobile (Expo)..."
(cd mobile && npm start) &

# Wait for all background processes
wait
