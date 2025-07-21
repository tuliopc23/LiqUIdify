#!/bin/bash

# Final comprehensive fix for all ternary operators
echo "Applying comprehensive ternary operator fixes..."

# Fix pattern: const/let/var x = typeof ... ? ... (missing : null)
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/(const|let|var)\s+(\w+)\s*=\s*typeof\s+(window|document)\s*!==\s*"undefined"\s*\?\s*([^:;]+)(?!\s*:)(\s*;)/$1 $2 = typeof $3 !== "undefined" ? $4 : null$5/g'

# Fix pattern: property: typeof ... ? ... (missing : null) in object literals
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/(\w+):\s*typeof\s+(window|document)\s*!==\s*"undefined"\s*\?\s*([^:,}]+)(?!\s*:)(\s*[,}])/$1: typeof $2 !== "undefined" ? $3 : null$4/g'

# Fix pattern: return typeof ... ? ... (missing : null)
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/return\s+typeof\s+(window|document)\s*!==\s*"undefined"\s*\?\s*([^:;]+)(?!\s*:)(\s*;)/return typeof $1 !== "undefined" ? $2 : null$3/g'

# Fix pattern: expressions with typeof ... ? ... in arithmetic/logical operations
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/(\w+\s*[-+*\/])\s*typeof\s+(window|document)\s*!==\s*"undefined"\s*\?\s*([^:;]+)(?!\s*:)/$1 (typeof $2 !== "undefined" ? $3 : 0)/g'

# Fix pattern: assignments in if/while/for conditions
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/(if|while|for)\s*\(\s*typeof\s+(window|document)\s*!==\s*"undefined"\s*\?\s*([^:)]+)(?!\s*:)\s*\)/$1 (typeof $2 !== "undefined" && $3)/g'

# Fix pattern: function arguments with typeof
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/\(\s*typeof\s+(window|document)\s*!==\s*"undefined"\s*\?\s*([^:,)]+)(?!\s*:)(\s*[,)])/(typeof $1 !== "undefined" ? $2 : null$3/g'

# Fix pattern: array elements with typeof
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/\[\s*typeof\s+(window|document)\s*!==\s*"undefined"\s*\?\s*([^:\]]+)(?!\s*:)(\s*[\],])/[typeof $1 !== "undefined" ? $2 : null$3/g'

# Fix pattern: JSX props with typeof
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/(\w+)=\{typeof\s+(window|document)\s*!==\s*"undefined"\s*\?\s*([^:}]+)(?!\s*:)\}/$1={typeof $2 !== "undefined" ? $3 : null}/g'

# Fix pattern: template literals with typeof
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/\$\{typeof\s+(window|document)\s*!==\s*"undefined"\s*\?\s*([^:}]+)(?!\s*:)\}/\${typeof $1 !== "undefined" ? $2 : ""}/g'

echo "Done applying comprehensive fixes"