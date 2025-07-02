#!/usr/bin/env fish

# Fish shell development script for LiquidUI
# Provides convenient aliases and functions for local development

function liquidui_help
    echo "🚀 LiquidUI Development Scripts (Fish Shell)"
    echo ""
    echo "Available commands:"
    echo "  dev_build      - Build the library and watch for changes"
    echo "  dev_test       - Run tests with watch mode"
    echo "  dev_clean      - Clean all build artifacts"
    echo "  dev_release    - Prepare a release build"
    echo "  dev_storybook  - Start Storybook development server"
    echo "  dev_size       - Check bundle sizes"
    echo "  dev_lint       - Run linting and formatting"
    echo "  dev_typecheck  - Run TypeScript type checking"
    echo "  dev_setup      - Initial project setup"
    echo ""
    echo "Framework Testing:"
    echo "  test_cra       - Test Create React App integration"
    echo "  test_nextjs    - Test Next.js integration"
    echo "  test_vite      - Test Vite integration"
    echo "  test_remix     - Test Remix integration"
    echo "  test_astro     - Test Astro integration"
    echo ""
    echo "Production Testing:"
    echo "  prod_build     - Production build with verification"
    echo "  prod_test      - Full test suite for production"
    echo "  prod_audit     - Security and performance audit"
end

# Development functions
function dev_build
    echo "🔨 Building LiquidUI..."
    npm run clean
    and npm run build
    and echo "✅ Build complete!"
end

function dev_test
    echo "🧪 Running tests in watch mode..."
    npm run test
end

function dev_clean
    echo "🧹 Cleaning build artifacts..."
    rm -rf dist .turbo node_modules/.cache
    and echo "✅ Clean complete!"
end

function dev_release
    echo "📦 Preparing release build..."
    npm run clean
    and npm run build
    and npm run test:ci
    and npm run size
    and echo "✅ Release build ready!"
end

function dev_storybook
    echo "📚 Starting Storybook..."
    npm run storybook
end

function dev_size
    echo "📏 Checking bundle sizes..."
    npm run size
end

function dev_lint
    echo "🎨 Running linter and formatter..."
    npm run lint:fix
    and npm run format
    and echo "✅ Code formatted!"
end

function dev_typecheck
    echo "🔍 Type checking..."
    npm run type-check
end

function dev_setup
    echo "⚙️  Setting up development environment..."
    npm install
    and npm run build
    and echo "✅ Development environment ready!"
end

# Framework testing functions
function test_cra
    echo "⚛️  Testing Create React App integration..."
    set -l test_dir "./test-frameworks/cra-test"
    
    if test -d $test_dir
        rm -rf $test_dir
    end
    
    npx create-react-app $test_dir --template typescript
    and cd $test_dir
    and npm install ../../dist/liquidui.tgz
    and npm install tailwindcss
    and echo "✅ CRA test setup complete!"
    cd ../..
end

function test_nextjs
    echo "▲ Testing Next.js integration..."
    set -l test_dir "./test-frameworks/nextjs-test"
    
    if test -d $test_dir
        rm -rf $test_dir
    end
    
    npx create-next-app@latest $test_dir --typescript --tailwind --app
    and cd $test_dir
    and npm install ../../dist/liquidui.tgz
    and echo "✅ Next.js test setup complete!"
    cd ../..
end

function test_vite
    echo "⚡ Testing Vite integration..."
    set -l test_dir "./test-frameworks/vite-test"
    
    if test -d $test_dir
        rm -rf $test_dir
    end
    
    npm create vite@latest $test_dir -- --template react-ts
    and cd $test_dir
    and npm install
    and npm install ../../dist/liquidui.tgz
    and npm install tailwindcss postcss autoprefixer
    and echo "✅ Vite test setup complete!"
    cd ../..
end

function test_remix
    echo "💿 Testing Remix integration..."
    set -l test_dir "./test-frameworks/remix-test"
    
    if test -d $test_dir
        rm -rf $test_dir
    end
    
    npx create-remix@latest $test_dir --template remix-run/remix/templates/remix
    and cd $test_dir
    and npm install ../../dist/liquidui.tgz
    and echo "✅ Remix test setup complete!"
    cd ../..
end

function test_astro
    echo "🚀 Testing Astro integration..."
    set -l test_dir "./test-frameworks/astro-test"
    
    if test -d $test_dir
        rm -rf $test_dir
    end
    
    npm create astro@latest $test_dir -- --template minimal --yes
    and cd $test_dir
    and npm install @astrojs/react @astrojs/tailwind
    and npm install ../../dist/liquidui.tgz
    and echo "✅ Astro test setup complete!"
    cd ../..
end

# Production testing functions
function prod_build
    echo "🏭 Production build with verification..."
    dev_clean
    and npm run build
    and npm run test:ci
    and npm run size
    and echo "🔍 Verifying Tailwind tree-shaking..."
    and npx tailwindcss -i src/styles/glass.css -o dist/test-treeshake.css --content './src/**/*.{js,ts,jsx,tsx}' --minify
    and echo "✅ Production build verified!"
    and rm -f dist/test-treeshake.css
end

function prod_test
    echo "🎯 Running full production test suite..."
    npm run test:ci
    and npm run test:e2e
    and npm run test:a11y
    and echo "✅ All tests passed!"
end

function prod_audit
    echo "🔍 Running security and performance audit..."
    npm audit
    and npm run size
    and echo "📊 Bundle analysis complete!"
end

# Auto-completion setup
complete -c liquidui_help -d "Show LiquidUI development help"
complete -c dev_build -d "Build the library"
complete -c dev_test -d "Run tests in watch mode"
complete -c dev_clean -d "Clean build artifacts"
complete -c dev_release -d "Prepare release build"
complete -c dev_storybook -d "Start Storybook"
complete -c dev_size -d "Check bundle sizes"
complete -c dev_lint -d "Run linting and formatting"
complete -c dev_typecheck -d "Run type checking"
complete -c dev_setup -d "Setup development environment"

# Load functions on script execution
if test (basename (status --current-filename)) = "dev.fish"
    echo "🌊 LiquidUI Fish Shell development environment loaded!"
    echo "Run 'liquidui_help' to see available commands."
end
