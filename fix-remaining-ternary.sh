#!/bin/bash

# Fix all remaining ternary operators with missing false case
echo "Fixing remaining ternary operators..."

# Pattern: const x = typeof window !== "undefined" ? window.something followed by cast
# Add parentheses and false case
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/=\s*typeof\s+(window|document)\s*!==\s*"undefined"\s*\?\s*(\1\.[^;]+)\s+as\s+([^;]+);/= (typeof $1 !== "undefined" ? $2 : null) as $3;/g'

# Pattern: typeof document !== "undefined" ? document.something without false case in object properties
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/:\s*typeof\s+(window|document)\s*!==\s*"undefined"\s*\?\s*(\1\.\w+)(?!\s*:)(?=\s*[,}])/: typeof $1 !== "undefined" ? $2 : null/g'

# Pattern: Fix arithmetic operations with ternary (for clientWidth etc)
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/(\w+)\s*-\s*typeof\s+(window|document)\s*!==\s*"undefined"\s*\?\s*(\2\.\w+);/$1 - (typeof $2 !== "undefined" ? $3 : 0);/g'

# Pattern: Fix ternary in variable assignments within objects
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/=\s*typeof\s+(window|document)\s*!==\s*"undefined"\s*\?\s*(\1\.\w+)(?!\s*:)(?=\s*[;}])/= typeof $1 !== "undefined" ? $2 : null/g'

echo "Done fixing remaining ternary operators"