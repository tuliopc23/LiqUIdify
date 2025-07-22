#!/bin/bash

# Simple Performance Check Script for CI
# Used to replace complex puppeteer-based testing with lighter validation

echo "🚀 Running LiqUIdify Performance Validation..."

# Build the project
echo "📦 Building project..."
if ! bun run build; then
    echo "❌ Build failed"
    exit 1
fi

# Run performance validation
echo "⚡ Validating performance..."
if ! node scripts/performance-validation.cjs; then
    echo "❌ Performance validation failed"
    exit 1
fi

# Run unit performance tests
echo "🧪 Running performance tests..."
if ! bun run vitest run tests/performance/component-performance.test.tsx; then
    echo "❌ Performance tests failed"
    exit 1
fi

# Run bundle size check
echo "📊 Checking bundle sizes..."
if ! bun run bundle:budget:check; then
    echo "❌ Bundle size check failed"
    exit 1
fi

echo "✅ All performance checks passed!"
echo "🎉 S-Tier performance standards achieved!"