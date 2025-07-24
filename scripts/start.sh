#!/bin/bash

# Mercury Frontend Start Script
# This script starts the production Next.js server

set -e  # Exit on any error

echo "🚀 Starting Mercury Frontend production server..."

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if .next directory exists (build output)
if [ ! -d ".next" ]; then
    echo "❌ Error: .next directory not found. Please run ./scripts/build.sh first."
    exit 1
fi

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Error: bun is not installed. Please install bun first."
    exit 1
fi

# Set default port if not provided
PORT=${PORT:-3000}

echo "🌐 Starting server on port $PORT..."

# Start the production server
bun run start --port $PORT 