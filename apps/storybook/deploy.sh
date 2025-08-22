#!/bin/bash
# Deploy script for LiqUIdify Storybook to Vercel

set -e

echo "🚀 Deploying LiqUIdify Storybook to Vercel..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    bun add -g vercel
fi

# Build the library first to ensure latest components
echo "📦 Building components library..."
cd ../../
bun run build:lib

# Go back to storybook directory
cd apps/storybook

# Build Storybook
echo "📚 Building Storybook..."
bun run build

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel deploy --prod

echo "✅ Deployment complete!"
echo "🔗 Your Storybook will be available at: https://storybook.useliquidify.dev"
