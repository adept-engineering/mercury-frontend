#!/bin/bash

# Mercury Frontend Stop Script
# This script stops the running Next.js server

echo "🛑 Stopping Mercury Frontend server..."

# Default port
PORT=${PORT:-3000}

# Find and kill the process running on the specified port
PID=$(lsof -ti:$PORT)

if [ -z "$PID" ]; then
    echo "ℹ️  No server found running on port $PORT"
    exit 0
fi

echo "🔍 Found server process (PID: $PID) running on port $PORT"
echo "🛑 Stopping server..."

# Kill the process gracefully
kill -TERM $PID

# Wait a bit for graceful shutdown
sleep 2

# Check if process is still running
if kill -0 $PID 2>/dev/null; then
    echo "⚠️  Server didn't stop gracefully, forcing shutdown..."
    kill -KILL $PID
fi

echo "✅ Server stopped successfully!"

# Alternative method: kill all node processes (use with caution)
# echo "🛑 Killing all Node.js processes..."
# pkill -f "next start" || true
# echo "✅ All Next.js processes stopped!" 