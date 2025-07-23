#!/bin/bash

# Mercury Frontend Build Script
# This script builds the Next.js application

set -e  # Exit on any error

echo "🚀 Starting build process for Mercury Frontend..."

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Error: bun is not installed. Please install bun first."
    exit 1
fi

echo "📦 Installing dependencies..."
bun install

echo "🔨 Building the application..."
bun run build

echo "✅ Build completed successfully!"
echo "📁 Build output is available in the .next directory"
echo "🚀 You can now run ./scripts/start.sh to start the production server" 