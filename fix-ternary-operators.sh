#!/bin/bash
# Fix incomplete ternary operators from auto-modifications

echo "🔧 Fixing incomplete ternary operators..."

# Fix patterns where typeof window !== "undefined" ? window.something appears without : alternative
find src -name "*.tsx" -o -name "*.ts" | while read file; do
  # Fix document operations
  sed -i '' 's/typeof document !== "undefined" ? document\./document\./g' "$file"
  
  # Fix window operations
  sed -i '' 's/typeof window !== "undefined" ? window\./window\./g' "$file"
  
  # Fix specific localStorage/sessionStorage patterns
  sed -i '' 's/isBrowser() && typeof window !== "undefined" ? window\.localStorage ? typeof window !== "undefined" ? window\.localStorage/isBrowser() \&\& window.localStorage ? window.localStorage/g' "$file"
  sed -i '' 's/typeof window !== "undefined" ? window\.sessionStorage/window.sessionStorage/g' "$file"
done

# Fix SSR safety patterns
find src -name "*.tsx" -o -name "*.ts" | while read file; do
  # Wrap document/window access in proper checks
  perl -i -pe 's/(\s+)(document\.(addEventListener|removeEventListener|getElementById|querySelector))/\1if (typeof document !== "undefined") { \2/g' "$file"
  perl -i -pe 's/(\s+)(window\.(addEventListener|removeEventListener|location|innerWidth|innerHeight))/\1if (typeof window !== "undefined") { \2/g' "$file"
done

echo "✅ Ternary operators fixed!"