#!/bin/bash

# LiquidiUI Migration Script
# Automates migration from glass-ui to liquidui (v1.0.0)
# Usage: ./liquidui-migration.sh

set -e

echo "🚀 LiquidiUI Migration Script v1.0.0"
echo "=====================================  "
echo ""
echo "This script will migrate your project from 'glass-ui' to '@tuliopc23/liquidui'"
echo "⚠️  Please ensure you have a backup before proceeding!"
echo ""

# Confirmation prompt
read -p "Do you want to continue? (y/N): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Migration cancelled"
    exit 0
fi

echo ""
echo "🔄 Starting migration from glass-ui to liquidui..."
echo ""

# Backup current state
echo "📦 Creating backup files..."
if [ -f "package.json" ]; then
    cp package.json package.json.backup
    echo "   ✅ package.json backed up"
fi

if [ -f "package-lock.json" ]; then
    cp package-lock.json package-lock.json.backup
    echo "   ✅ package-lock.json backed up"
fi

if [ -f "yarn.lock" ]; then
    cp yarn.lock yarn.lock.backup
    echo "   ✅ yarn.lock backed up"
fi

if [ -f "pnpm-lock.yaml" ]; then
    cp pnpm-lock.yaml pnpm-lock.yaml.backup
    echo "   ✅ pnpm-lock.yaml backed up"
fi

echo ""

# Check for package.json and update dependencies
if [ -f "package.json" ]; then
    echo "📝 Updating package.json dependencies..."
    
    # Update package names
    sed -i.bak 's/"glass-ui"/"@tuliopc23\/liquidui"/g' package.json
    sed -i.bak 's/"@tuliopc23\/glass-ui"/"@tuliopc23\/liquidui"/g' package.json
    
    echo "   ✅ Updated package.json dependencies"
else
    echo "   ⚠️  No package.json found in current directory"
fi

echo ""

# Update import statements in code files
echo "🔍 Updating import statements in code files..."

# Count files to be updated
files_count=$(find . -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | grep -v node_modules | grep -v dist | grep -v build | wc -l)

if [ $files_count -gt 0 ]; then
    echo "   Found $files_count files to update..."
    
    # Update TypeScript/JavaScript import statements
    find . -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | \
      grep -v node_modules | grep -v dist | grep -v build | \
      xargs sed -i.bak 's/from ["'"'"']glass-ui["'"'"']/from "@tuliopc23\/liquidui"/g'
    
    find . -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | \
      grep -v node_modules | grep -v dist | grep -v build | \
      xargs sed -i.bak 's/from ["'"'"']@tuliopc23\/glass-ui["'"'"']/from "@tuliopc23\/liquidui"/g'
    
    echo "   ✅ Updated import statements"
else
    echo "   ℹ️  No TypeScript/JavaScript files found to update"
fi

echo ""

# Update CSS imports
echo "🎨 Updating CSS imports..."

css_files_count=$(find . -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.css" | grep -v node_modules | grep -v dist | grep -v build | wc -l)

if [ $css_files_count -gt 0 ]; then
    find . -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.css" | \
      grep -v node_modules | grep -v dist | grep -v build | \
      xargs sed -i.bak 's/@tuliopc23\/glass-ui\/dist\/glass.css/@tuliopc23\/liquidui\/dist\/liquidui.css/g'
    
    find . -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.css" | \
      grep -v node_modules | grep -v dist | grep -v build | \
      xargs sed -i.bak 's/glass-ui\/dist\/glass.css/@tuliopc23\/liquidui\/dist\/liquidui.css/g'
    
    echo "   ✅ Updated CSS imports"
else
    echo "   ℹ️  No CSS files found to update"
fi

echo ""

# Update HTML files
echo "🌐 Updating HTML CDN links..."

html_files_count=$(find . -name "*.html" | grep -v node_modules | wc -l)

if [ $html_files_count -gt 0 ]; then
    find . -name "*.html" | grep -v node_modules | \
      xargs sed -i.bak 's/unpkg.com\/glass-ui/unpkg.com\/@tuliopc23\/liquidui/g'
    
    find . -name "*.html" | grep -v node_modules | \
      xargs sed -i.bak 's/unpkg.com\/@tuliopc23\/glass-ui/unpkg.com\/@tuliopc23\/liquidui/g'
    
    echo "   ✅ Updated HTML CDN links"
else
    echo "   ℹ️  No HTML files found to update"
fi

echo ""

# Clean up backup files
echo "🧹 Cleaning up temporary backup files..."
find . -name "*.bak" -delete
echo "   ✅ Cleaned up temporary files"

echo ""
echo "✅ Migration complete!"
echo ""
echo "📋 Next Steps:"
echo "   1. Remove old package:"
echo "      npm uninstall glass-ui @tuliopc23/glass-ui"
echo "      # OR"
echo "      yarn remove glass-ui @tuliopc23/glass-ui"
echo "      # OR"
echo "      pnpm remove glass-ui @tuliopc23/glass-ui"
echo ""
echo "   2. Install new package:"
echo "      npm install @tuliopc23/liquidui"
echo "      # OR"
echo "      yarn add @tuliopc23/liquidui"
echo "      # OR"
echo "      pnpm add @tuliopc23/liquidui"
echo ""
echo "   3. Test your application:"
echo "      npm start  # or your dev command"
echo ""
echo "   4. Verify imports work correctly"
echo "   5. Check that all components render properly"
echo ""
echo "🎉 Welcome to LiquidiUI v1.0.0!"
echo ""
echo "📚 Resources:"
echo "   • Documentation: https://liquidui.dev"
echo "   • Storybook: https://storybook-liquidui.vercel.app"
echo "   • GitHub: https://github.com/tuliopc23/liquidui"
echo "   • Issues: https://github.com/tuliopc23/liquidui/issues"
echo ""
echo "💡 If you encounter any issues:"
echo "   1. Check the CHANGELOG.md for detailed migration notes"
echo "   2. Restore from backup files (.backup extension)"
echo "   3. Create an issue on GitHub for support"
echo ""
