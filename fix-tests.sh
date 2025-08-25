#!/bin/bash
echo "🧪 Starting Test Fixes - Phase 2"
echo "================================"

echo "1. Running glass-button tests to identify issues..."
bunx vitest run libs/components/src/components/glass-button-refactored/glass-button.test.tsx --reporter=verbose | head -20

echo -e "\n2. Running glass-card tests..."
bunx vitest run libs/components/src/components/glass-card-refactored/glass-card.test.tsx --reporter=verbose | head -10

echo -e "\n3. Test summary:"
bunx vitest run libs/components/src --reporter=basic | tail -5

echo -e "\n✅ Test analysis complete. Check output above for specific failures to fix."
