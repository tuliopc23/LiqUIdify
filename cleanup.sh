#!/bin/bash

# Cleanup script for LiqUIdify repository before publication
echo "🧹 Cleaning up repository files..."

# Remove Replit-specific files
rm -f .replit
rm -f replit.md

# Remove macOS system files
find . -name ".DS_Store" -delete

# Remove crush directory and logs
rm -rf .crush
rm -f crush-panic-main-*.log

# Remove development artifacts
rm -f button-preview.html

# Remove logs directory if it exists
rm -rf logs

echo "✅ Cleanup complete!"
echo "Removed:"
echo "  - Replit files (.replit, replit.md)"
echo "  - macOS .DS_Store files"
echo "  - .crush directory"
echo "  - crush panic logs"
echo "  - button-preview.html"
echo "  - logs directory"
