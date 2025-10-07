#!/bin/bash

# GinyWow Server Startup Script
# This script helps you start your GinyWow application on a server

set -e

echo "🚀 Starting GinyWow Server..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    npm install -g pm2
fi

# Create logs directory
mkdir -p logs

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "❌ Build files not found. Please run 'npm run build' first."
    exit 1
fi

# Check if dist/index.js exists
if [ ! -f "dist/index.js" ]; then
    echo "❌ Server file not found. Please run 'npm run build' first."
    exit 1
fi

# Set environment variables
export NODE_ENV=production
export PORT=${PORT:-5000}

echo "🔧 Environment: $NODE_ENV"
echo "🌐 Port: $PORT"

# Start the application with PM2
echo "▶️  Starting application with PM2..."
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Show status
echo "📊 Application Status:"
pm2 status

echo "✅ GinyWow server started successfully!"
echo "🌐 Your application should be available at: http://localhost:$PORT"
echo ""
echo "📝 Useful commands:"
echo "  pm2 logs ginywow     - View logs"
echo "  pm2 monit           - Monitor processes"
echo "  pm2 restart ginywow - Restart application"
echo "  pm2 stop ginywow    - Stop application"
