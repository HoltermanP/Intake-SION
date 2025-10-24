#!/bin/bash

# Vercel Deployment Script
echo "🚀 Starting Vercel Deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Deploy Frontend
echo "📦 Deploying Frontend..."
cd client
vercel --prod --yes
cd ..

# Deploy Backend
echo "📦 Deploying Backend..."
cd server
vercel --prod --yes
cd ..

echo "✅ Deployment complete!"
echo "🌐 Check your Vercel dashboard for URLs"
