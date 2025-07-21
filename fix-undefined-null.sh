#!/bin/bash
# Fix undefined vs null usage in TypeScript files

echo "🔧 Fixing undefined vs null usage..."

# Fix glass-chart
sed -i '' 's/useState<number>(undefined)/useState<number | null>(null)/g' src/components/glass-chart/glass-chart.tsx
sed -i '' 's/setHoveredIndex(undefined)/setHoveredIndex(null)/g' src/components/glass-chart/glass-chart.tsx

# Fix glass-devtools
sed -i '' 's/setFloatingEl(undefined)/setFloatingEl(null)/g' src/components/glass-devtools/glass-devtools.tsx
sed -i '' 's/setSelectedComponent(undefined)/setSelectedComponent(null)/g' src/components/glass-devtools/glass-devtools.tsx
sed -i '' 's/useState<PerformanceReport>(undefined)/useState<PerformanceReport | null>(null)/g' src/components/glass-devtools/glass-devtools.tsx

# Fix glass-error-boundary
sed -i '' 's/this\.resetTimeoutId = undefined/this.resetTimeoutId = null/g' src/components/glass-error-boundary/glass-error-boundary.tsx
sed -i '' 's/error: undefined/error: null/g' src/components/glass-error-boundary/glass-error-boundary.tsx

# Fix other common patterns
find src -name "*.tsx" -o -name "*.ts" | while read file; do
  # Fix createContext undefined
  sed -i '' 's/createContext<\([^>]*\)>(undefined)/createContext<\1>(null)/g' "$file"
  
  # Fix useState undefined
  sed -i '' 's/useState<\([^>]*\)>(undefined)/useState<\1 | null>(null)/g' "$file"
  
  # Fix direct undefined assignments
  sed -i '' 's/= undefined;/= null;/g' "$file"
  
  # Fix return undefined
  sed -i '' 's/return undefined/return null/g' "$file"
done

echo "✅ Undefined to null fixes applied!"