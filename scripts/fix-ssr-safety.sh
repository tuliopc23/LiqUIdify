#!/bin/bash
# fix-ssr-safety.sh - Enhanced version

echo "🛡️ Making components SSR-safe..."

# 1. Fix malformed ternary operators first
echo "✓ Fixing malformed ternary operators..."
find src -name "*.tsx" -o -name "*.ts" | while read file; do
  # Fix incomplete ternary operators that end with semicolon
  sed -i '' 's/typeof window !== "undefined" ? window\.\([^;]*\);/typeof window !== "undefined" ? window.\1 : null;/g' "$file"
  sed -i '' 's/typeof document !== "undefined" ? document\.\([^;]*\);/typeof document !== "undefined" ? document.\1 : null;/g' "$file"

  # Fix incomplete ternary operators that end with comma
  sed -i '' 's/typeof window !== "undefined" ? window\.\([^,]*\),/typeof window !== "undefined" ? window.\1 : null,/g' "$file"
  sed -i '' 's/typeof document !== "undefined" ? document\.\([^,]*\),/typeof document !== "undefined" ? document.\1 : null,/g' "$file"

  # Fix incomplete ternary operators that end with closing parenthesis
  sed -i '' 's/typeof window !== "undefined" ? window\.\([^)]*\))/typeof window !== "undefined" ? window.\1 : null)/g' "$file"
  sed -i '' 's/typeof document !== "undefined" ? document\.\([^)]*\))/typeof document !== "undefined" ? document.\1 : null)/g' "$file"
done

# 2. Replace remaining direct window/document access with proper ternary
echo "✓ Fixing remaining window/document access..."
find src -name "*.tsx" -o -name "*.ts" | while read file; do
  # Only replace direct access that isn't already wrapped
  sed -i '' 's/\([^"]\)window\./\1typeof window !== "undefined" ? window. : null/g' "$file"
  sed -i '' 's/\([^"]\)document\./\1typeof document !== "undefined" ? document. : null/g' "$file"
done

# 3. Add cleanup to event listeners
echo "✓ Adding event listener cleanup..."
# This requires manual review - log files that need attention
grep -r "addEventListener" src/ --include="*.tsx" --include="*.ts" | \
  cut -d: -f1 | sort -u > needs-event-cleanup.txt

echo "✅ SSR safety fixes applied!"
echo "📋 Files needing manual event listener cleanup saved to: needs-event-cleanup.txt"