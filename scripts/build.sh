#!/bin/bash

# Mercury Frontend Build Script
# This script builds the Next.js application

set -e  # Exit on any error

# Configuration
LOG_FILE=".mercury-frontend-build.log"

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "🚀 Starting build process for Mercury Frontend..."

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    log "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    log "❌ Error: bun is not installed. Please install bun first."
    exit 1
fi

# Check available disk space (optional but helpful)
AVAILABLE_SPACE=$(df . | awk 'NR==2 {print $4}')
if [ "$AVAILABLE_SPACE" -lt 1000000 ]; then  # Less than 1GB
    log "⚠️  Warning: Low disk space available ($AVAILABLE_SPACE KB)"
fi

log "📦 Installing dependencies..."
if bun install; then
    log "✅ Dependencies installed successfully"
else
    log "❌ Failed to install dependencies"
    exit 1
fi

log "🔨 Building the application..."
if bun run build; then
    log "✅ Build completed successfully!"
    log "📁 Build output is available in the .next directory"
    log "🚀 You can now run ./scripts/start.sh to start the production server"
    
    # Show build size info
    if [ -d ".next" ]; then
        BUILD_SIZE=$(du -sh .next 2>/dev/null | cut -f1 || echo "unknown")
        log "📊 Build size: $BUILD_SIZE"
    fi
else
    log "❌ Build failed"
    exit 1
fi 