#!/bin/bash

# CI Performance Validation Script
# Ensures S-tier performance requirements are met before deployment

echo "🚀 LiqUIdify S-tier Performance Validation"
echo "==========================================="

# Build the project
echo "📦 Building project..."
bun run build

# Run performance validation  
echo "⚡ Validating performance..."
if node scripts/performance-status.js; then
    echo "✅ S-tier performance requirements MET"
    echo "📊 Performance status report generated"
    exit 0
else
    echo "❌ S-tier performance requirements NOT MET"
    echo "📋 Check PERFORMANCE_STATUS.md for details"
    exit 1
fi
