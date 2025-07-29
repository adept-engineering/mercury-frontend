#!/bin/bash

# Mercury Frontend Start Script
# This script starts the production Next.js server

set -e  # Exit on any error

# Configuration
PID_FILE=".mercury-frontend.pid"
LOG_FILE=".mercury-frontend.log"
HEALTH_CHECK_TIMEOUT=30
HEALTH_CHECK_INTERVAL=2

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "🚀 Starting Mercury Frontend production server..."

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    log "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if .next directory exists (build output)
if [ ! -d ".next" ]; then
    log "❌ Error: .next directory not found. Please run ./scripts/build.sh first."
    exit 1
fi

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    log "❌ Error: bun is not installed. Please install bun first."
    exit 1
fi

# Check if server is already running
if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if kill -0 "$PID" 2>/dev/null; then
        log "⚠️  Server is already running (PID: $PID)"
        log "Use ./scripts/stop.sh to stop the server first."
        exit 1
    else
        log "🧹 Cleaning up stale PID file"
        rm -f "$PID_FILE"
    fi
fi

# Load PORT from .env if it exists and PORT is not already set
if [ -z "$PORT" ] && [ -f .env ]; then
    export $(grep -E '^PORT=' .env | xargs)
fi

# Set default port if not provided
PORT=${PORT:-3000}

log "🌐 Starting server on port $PORT..."

# Start the production server
nohup bun run start --port $PORT > "$LOG_FILE" 2>&1 &
SERVER_PID=$!

# Save PID to file
echo "$SERVER_PID" > "$PID_FILE"

log "📝 Server started with PID: $SERVER_PID"
log "📋 Logs are being written to: $LOG_FILE"

# Health check
log "🔍 Performing health check..."
HEALTH_CHECK_COUNT=0
while [ $HEALTH_CHECK_COUNT -lt $((HEALTH_CHECK_TIMEOUT / HEALTH_CHECK_INTERVAL)) ]; do
    if curl -s -f "http://localhost:$PORT" > /dev/null 2>&1; then
        log "✅ Server is healthy and responding on port $PORT"
        log "🎉 Mercury Frontend is ready!"
        exit 0
    fi
    
    HEALTH_CHECK_COUNT=$((HEALTH_CHECK_COUNT + 1))
    sleep $HEALTH_CHECK_INTERVAL
done

log "⚠️  Health check timeout - server may not be fully ready"
log "📋 Check logs at $LOG_FILE for more details"
log "🔍 Server PID: $SERVER_PID"
