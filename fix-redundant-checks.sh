#!/bin/bash
# Fix redundant typeof checks that are causing syntax errors

echo "🔧 Fixing redundant typeof checks..."

# Fix pattern: if (typeof X !== "undefined") { typeof X !== "undefined" ? X.method() }
# This should just be: if (typeof X !== "undefined") { X.method() }

find src -name "*.tsx" -o -name "*.ts" | while read file; do
  # Fix document patterns
  sed -i '' 's/typeof document !== "undefined" ? document\.addEventListener/document.addEventListener/g' "$file"
  sed -i '' 's/typeof document !== "undefined" ? document\.removeEventListener/document.removeEventListener/g' "$file"
  sed -i '' 's/typeof document !== "undefined" ? document\.getElementById/document.getElementById/g' "$file"
  sed -i '' 's/typeof document !== "undefined" ? document\.querySelector/document.querySelector/g' "$file"
  sed -i '' 's/typeof document !== "undefined" ? document\.body/document.body/g' "$file"
  
  # Fix window patterns
  sed -i '' 's/typeof window !== "undefined" ? window\.addEventListener/window.addEventListener/g' "$file"
  sed -i '' 's/typeof window !== "undefined" ? window\.removeEventListener/window.removeEventListener/g' "$file"
  sed -i '' 's/typeof window !== "undefined" ? window\.location/window.location/g' "$file"
  sed -i '' 's/typeof window !== "undefined" ? window\.localStorage/window.localStorage/g' "$file"
  sed -i '' 's/typeof window !== "undefined" ? window\.sessionStorage/window.sessionStorage/g' "$file"
  sed -i '' 's/typeof window !== "undefined" ? window\.getComputedStyle/window.getComputedStyle/g' "$file"
  sed -i '' 's/typeof window !== "undefined" ? window\.innerWidth/window.innerWidth/g' "$file"
  sed -i '' 's/typeof window !== "undefined" ? window\.innerHeight/window.innerHeight/g' "$file"
  sed -i '' 's/typeof window !== "undefined" ? window\.matchMedia/window.matchMedia/g' "$file"
done

echo "✅ Redundant checks fixed!"