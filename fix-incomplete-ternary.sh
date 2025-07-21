#!/bin/bash

# Fix incomplete ternary operators
echo "Fixing incomplete ternary operators..."

# Pattern: typeof window !== "undefined" ? window.something without the false case
# Replace with: typeof window !== "undefined" ? window.something : 0 (for numbers)
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/typeof window !== "undefined" \? window\.(scrollX|scrollY|pageXOffset|pageYOffset|innerWidth|innerHeight)(?!\s*:)(?=\s*[,;})])/typeof window !== "undefined" ? window.$1 : 0/g'

# Pattern: typeof window !== "undefined" ? window.localStorage without the false case
# Replace with: typeof window !== "undefined" ? window.localStorage : null
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/typeof window !== "undefined" \? window\.(localStorage|sessionStorage)(?!\s*:)(?=\s*[,;})])/typeof window !== "undefined" ? window.$1 : null/g'

# Pattern: typeof document !== "undefined" ? document.something without the false case  
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/typeof document !== "undefined" \? document\.(\w+)(?!\s*:)(?=\s*[,;})])/typeof document !== "undefined" ? document.$1 : null/g'

# Pattern: isClient ? something without the false case
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/(\w+)\s*\?\s*window\.(\w+)(?!\s*:)(?=\s*[,;})])/$1 ? window.$2 : 0/g'

echo "Done fixing incomplete ternary operators"