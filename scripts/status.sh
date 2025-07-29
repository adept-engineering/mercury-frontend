#!/bin/bash

# Mercury Frontend Status Script
# This script checks the status of the Next.js server

# Configuration
PID_FILE=".mercury-frontend.pid"
LOG_FILE=".mercury-frontend.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "$1"
}

# Load PORT from .env if it exists and PORT is not already set
if [ -z "$PORT" ] && [ -f .env ]; then
    export $(grep -E '^PORT=' .env | xargs)
fi

# Default port
PORT=${PORT:-3000}

log "${BLUE}🔍 Mercury Frontend Server Status${NC}"
log "${BLUE}================================${NC}"

# Check PID file
if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if kill -0 "$PID" 2>/dev/null; then
        log "${GREEN}✅ Server process found (PID: $PID)${NC}"
        
        # Get process info
        PROCESS_INFO=$(ps -p "$PID" -o pid,ppid,cmd,etime --no-headers 2>/dev/null || echo "Process info unavailable")
        log "${BLUE}📋 Process Info:${NC}"
        log "   $PROCESS_INFO"
        
        # Check if port is in use
        if lsof -ti:$PORT >/dev/null 2>&1; then
            log "${GREEN}✅ Port $PORT is active${NC}"
            
            # Health check
            log "${BLUE}🏥 Performing health check...${NC}"
            if curl -s -f "http://localhost:$PORT" > /dev/null 2>&1; then
                log "${GREEN}✅ Server is healthy and responding${NC}"
                
                # Get response time
                RESPONSE_TIME=$(curl -s -w "%{time_total}" -o /dev/null "http://localhost:$PORT" 2>/dev/null || echo "N/A")
                log "${BLUE}⏱️  Response time: ${RESPONSE_TIME}s${NC}"
            else
                log "${YELLOW}⚠️  Server is running but not responding to health check${NC}"
            fi
        else
            log "${YELLOW}⚠️  Process exists but port $PORT is not active${NC}"
        fi
    else
        log "${YELLOW}⚠️  Stale PID file found (PID: $PID)${NC}"
        log "${BLUE}💡 Run ./scripts/stop.sh to clean up${NC}"
    fi
else
    log "${YELLOW}ℹ️  No PID file found${NC}"
    
    # Check if any process is running on the port
    PORT_PID=$(lsof -ti:$PORT 2>/dev/null || echo "")
    if [ -n "$PORT_PID" ]; then
        log "${YELLOW}⚠️  Found process on port $PORT (PID: $PORT_PID)${NC}"
        log "${BLUE}💡 This might be a different server or orphaned process${NC}"
    else
        log "${RED}❌ No server running on port $PORT${NC}"
    fi
fi

# Show recent logs if available
if [ -f "$LOG_FILE" ]; then
    log "\n${BLUE}📋 Recent Logs (last 10 lines):${NC}"
    log "${BLUE}--------------------------------${NC}"
    tail -n 10 "$LOG_FILE" 2>/dev/null || log "${YELLOW}Unable to read log file${NC}"
fi

# Show disk usage
log "\n${BLUE}💾 Disk Usage:${NC}"
log "${BLUE}-------------${NC}"
if [ -d ".next" ]; then
    BUILD_SIZE=$(du -sh .next 2>/dev/null | cut -f1 || echo "unknown")
    log "Build directory: $BUILD_SIZE"
else
    log "Build directory: Not found (run ./scripts/build.sh first)"
fi

# Show environment info
log "\n${BLUE}🌍 Environment:${NC}"
log "${BLUE}---------------${NC}"
log "Port: $PORT"
log "Node.js: $(node --version 2>/dev/null || echo 'Not found')"
log "Bun: $(bun --version 2>/dev/null || echo 'Not found')" 