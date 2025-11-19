#!/bin/bash

# Deployment script for pipetkaonline.ru
# This script should be run on the Ubuntu server

set -e  # Exit on error

echo "🚀 Starting deployment..."

# Navigate to project directory
cd /var/www/pipetkaonline.ru

# Pull latest changes from GitHub
echo "📥 Pulling latest changes from GitHub..."
git pull origin main

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Build new image
echo "🔨 Building new Docker image..."
docker-compose build --no-cache

# Start containers
echo "▶️  Starting containers..."
docker-compose up -d

# Wait for container to be healthy
echo "⏳ Waiting for container to be ready..."
sleep 10

# Show logs
echo "📋 Recent logs:"
docker-compose logs --tail=50

# Check container status
echo "✅ Container status:"
docker-compose ps

echo "🎉 Deployment completed!"

