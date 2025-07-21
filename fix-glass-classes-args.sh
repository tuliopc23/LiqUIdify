#!/bin/bash

# Fix generateGlassClasses function calls to use object parameter

echo "Fixing generateGlassClasses function calls..."

# Pattern 1: generateGlassClasses with 4 parameters
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/generateGlassClasses\s*\(\s*(\w+),\s*(\w+(?:\?\.\w+)?),\s*(\w+),\s*(\w+)\s*\)/generateGlassClasses({ variant: $1, intensity: $2, state: $3, glassEffect: $4 })/g'

# Pattern 2: generateGlassClasses with 2 parameters (variant, intensity)
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/generateGlassClasses\s*\(\s*(\w+),\s*(\w+(?:\?\.\w+)?)\s*\)/generateGlassClasses({ variant: $1, intensity: $2 })/g'

# Pattern 3: generateGlassClasses with 3 parameters (might be variant, intensity, state)
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/generateGlassClasses\s*\(\s*(\w+),\s*(\w+(?:\?\.\w+)?),\s*(\w+)\s*\)/generateGlassClasses({ variant: $1, intensity: $2, state: $3 })/g'

# Pattern 4: Fix specific case with glassEffect?.intensity
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -pe '
s/generateGlassClasses\s*\(\s*variant,\s*glassEffect\?\.\s*intensity,/generateGlassClasses({ variant, intensity: glassEffect?.intensity,/g'

# Pattern 5: Fix multiline calls
find src -name "*.tsx" -o -name "*.ts" | xargs perl -i -0pe '
s/generateGlassClasses\s*\(\s*\n\s*variant,\s*\n\s*glassEffect\?\.\s*intensity,\s*\n\s*currentState,\s*\n\s*glassEffect\s*\n\s*\)/generateGlassClasses({\n      variant,\n      intensity: glassEffect?.intensity,\n      state: currentState,\n      glassEffect\n    })/gs'

echo "Done fixing generateGlassClasses calls"