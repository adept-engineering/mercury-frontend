#!/bin/bash

# Mercury Frontend Stop Script
# This script stops the running Next.js server

# Configuration
PID_FILE=".mercury-frontend.pid"
LOG_FILE=".mercury-frontend.log"
GRACEFUL_TIMEOUT=10
FORCE_TIMEOUT=5

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "🛑 Stopping Mercury Frontend server..."

# Load PORT from .env if it exists and PORT is not already set
if [ -z "$PORT" ] && [ -f .env ]; then
    export $(grep -E '^PORT=' .env | xargs)
fi

# Default port
PORT=${PORT:-3000}

# Try to get PID from PID file first
if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if kill -0 "$PID" 2>/dev/null; then
        log "🔍 Found server process from PID file (PID: $PID)"
    else
        log "🧹 Stale PID file found, removing..."
        rm -f "$PID_FILE"
        PID=""
    fi
fi

# If no PID from file, try to find by port
if [ -z "$PID" ]; then
    PID=$(lsof -ti:$PORT 2>/dev/null || echo "")
    if [ -n "$PID" ]; then
        log "🔍 Found server process by port (PID: $PID)"
    fi
fi

if [ -z "$PID" ]; then
    log "ℹ️  No server found running on port $PORT"
    # Clean up any stale files
    rm -f "$PID_FILE"
    exit 0
fi

log "🛑 Stopping server (PID: $PID)..."

# Kill the process gracefully
kill -TERM "$PID"

# Wait for graceful shutdown with timeout
log "⏳ Waiting for graceful shutdown (timeout: ${GRACEFUL_TIMEOUT}s)..."
TIMEOUT_COUNT=0
while [ $TIMEOUT_COUNT -lt $GRACEFUL_TIMEOUT ] && kill -0 "$PID" 2>/dev/null; do
    sleep 1
    TIMEOUT_COUNT=$((TIMEOUT_COUNT + 1))
done

# Check if process is still running
if kill -0 "$PID" 2>/dev/null; then
    log "⚠️  Server didn't stop gracefully, forcing shutdown..."
    kill -KILL "$PID"
    
    # Wait for force kill with shorter timeout
    FORCE_COUNT=0
    while [ $FORCE_COUNT -lt $FORCE_TIMEOUT ] && kill -0 "$PID" 2>/dev/null; do
        sleep 1
        FORCE_COUNT=$((FORCE_COUNT + 1))
    done
    
    if kill -0 "$PID" 2>/dev/null; then
        log "❌ Failed to stop server process (PID: $PID)"
        log "💡 You may need to manually kill the process"
        exit 1
    fi
fi

# Clean up PID file
rm -f "$PID_FILE"

log "✅ Server stopped successfully!"

# Verify server is no longer running on the port
if lsof -ti:$PORT >/dev/null 2>&1; then
    log "⚠️  Warning: Port $PORT is still in use by another process"
else
    log "✅ Port $PORT is now free"
fi 