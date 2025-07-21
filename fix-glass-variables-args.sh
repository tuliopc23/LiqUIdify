#!/bin/bash

# Fix generateGlassVariables function calls to use object parameter

echo "Fixing generateGlassVariables function calls..."

# Pattern: generateGlassVariables with 2 parameters (intensity, config)
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/generateGlassVariables\s*\(\s*(\w+(?:\?\.\w+)?),\s*\{/generateGlassVariables({ intensity: $1, config: {/g'

# Fix closing bracket to match new structure
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/generateGlassVariables\(\{ intensity: ([^,]+), config: \{([^}]+)\}\s*\)/generateGlassVariables({ intensity: $1, $2 })/g'

echo "Done fixing generateGlassVariables calls"