#!/bin/bash

# Fix ternary operators inside if conditions
echo "Fixing ternary operators in conditional statements..."

# Pattern: if (typeof document !== "undefined" ? document.activeElement === element)
# Should be: if (typeof document !== "undefined" && document.activeElement === element)
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/if\s*\(\s*typeof\s+(document|window)\s*!==\s*"undefined"\s*\?\s*(\1\.[^)]+)\s*\)/if (typeof $1 !== "undefined" && $2)/g'

# Pattern: typeof window !== "undefined" ? window.scrollTo(...) - statement, not expression
# Should be: if (typeof window !== "undefined") window.scrollTo(...)
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/^\s*typeof\s+(window|document)\s*!==\s*"undefined"\s*\?\s*(\1\.\w+\([^)]*\))\s*;?$/if (typeof $1 !== "undefined") $2;/gm'

# Pattern: const something = typeof document !== "undefined" ? document.readyState
# Should be: const something = typeof document !== "undefined" ? document.readyState : null
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/=\s*typeof\s+(document|window)\s*!==\s*"undefined"\s*\?\s*(\1\.\w+)\s*(?!:)(?=\s*[,;})])/= typeof $1 !== "undefined" ? $2 : null/g'

echo "Done fixing ternary operators in conditional statements"