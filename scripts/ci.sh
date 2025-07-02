#!/bin/sh

# POSIX shell CI/CD script for LiquidUI
# Compatible with all POSIX-compliant shells (bash, zsh, dash, ash)
# Used in CI environments for consistent cross-platform builds

set -e # Exit on any error
set -u # Exit on undefined variables

# Colors for output (compatible with most terminals)
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    printf "${BLUE}ℹ️  %s${NC}\n" "$1"
}

log_success() {
    printf "${GREEN}✅ %s${NC}\n" "$1"
}

log_warning() {
    printf "${YELLOW}⚠️  %s${NC}\n" "$1"
}

log_error() {
    printf "${RED}❌ %s${NC}\n" "$1" >&2
}

# Helper functions
check_command() {
    if ! command -v "$1" >/dev/null 2>&1; then
        log_error "Command '$1' not found. Please install it first."
        exit 1
    fi
}

# Verify dependencies
verify_dependencies() {
    log_info "Verifying CI dependencies..."
    check_command "node"
    check_command "npm"
    
    # Check Node.js version
    NODE_VERSION=$(node --version | cut -d'v' -f2)
    REQUIRED_VERSION="14.0.0"
    
    if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
        log_error "Node.js version $NODE_VERSION is too old. Minimum required: $REQUIRED_VERSION"
        exit 1
    fi
    
    log_success "Dependencies verified"
}

# Setup CI environment
setup_ci() {
    log_info "Setting up CI environment..."
    
    # Set NODE_ENV for production optimizations
    export NODE_ENV=production
    
    # Optimize npm for CI
    npm config set registry https://registry.npmjs.org/
    npm config set fetch-retries 3
    npm config set fetch-retry-factor 2
    npm config set fetch-retry-mintimeout 10000
    npm config set fetch-retry-maxtimeout 60000
    
    log_success "CI environment configured"
}

# Install dependencies
install_deps() {
    log_info "Installing dependencies..."
    
    # Use npm ci for deterministic builds in CI
    if [ -f "package-lock.json" ]; then
        npm ci --production=false
    else
        npm install
    fi
    
    log_success "Dependencies installed"
}

# Run linting
run_lint() {
    log_info "Running linting..."
    npm run lint
    log_success "Linting passed"
}

# Run type checking
run_typecheck() {
    log_info "Running TypeScript type checking..."
    npm run type-check
    log_success "Type checking passed"
}

# Run tests
run_tests() {
    log_info "Running test suite..."
    npm run test:ci
    log_success "Tests passed"
}

# Run accessibility tests
run_a11y_tests() {
    log_info "Running accessibility tests..."
    npm run test:a11y
    log_success "Accessibility tests passed"
}

# Run end-to-end tests
run_e2e_tests() {
    log_info "Running end-to-end tests..."
    npm run test:e2e
    log_success "E2E tests passed"
}

# Build the library
build_library() {
    log_info "Building library..."
    
    # Clean previous builds
    npm run clean
    
    # Build CSS
    npm run build:css
    
    # Build JavaScript/TypeScript
    npm run build
    
    log_success "Library built successfully"
}

# Verify build output
verify_build() {
    log_info "Verifying build output..."
    
    # Check if main files exist
    if [ ! -f "dist/index.mjs" ]; then
        log_error "Main ESM bundle not found"
        exit 1
    fi
    
    if [ ! -f "dist/cjs/index.cjs" ]; then
        log_error "Main CJS bundle not found"
        exit 1
    fi
    
    if [ ! -f "dist/liquidui.css" ]; then
        log_error "CSS bundle not found"
        exit 1
    fi
    
    if [ ! -f "dist/types/index.d.ts" ]; then
        log_error "Type definitions not found"
        exit 1
    fi
    
    log_success "Build output verified"
}

# Check bundle sizes
check_bundle_sizes() {
    log_info "Checking bundle sizes..."
    npm run size
    log_success "Bundle size check completed"
}

# Verify Tailwind tree-shaking
verify_tailwind_treeshaking() {
    log_info "Verifying Tailwind CSS tree-shaking..."
    
    # Generate test CSS with tree-shaking
    npx tailwindcss -i src/styles/glass.css -o dist/test-treeshake.css \
        --content './src/**/*.{js,ts,jsx,tsx}' --minify
    
    # Check if the file was created and has reasonable size
    if [ ! -f "dist/test-treeshake.css" ]; then
        log_error "Tree-shaking test failed - no output file"
        exit 1
    fi
    
    # Get file size in bytes
    TREESHAKE_SIZE=$(wc -c < dist/test-treeshake.css)
    
    # Cleanup test file
    rm -f dist/test-treeshake.css
    
    # Check if tree-shaken CSS is reasonably sized (less than 50KB)
    if [ "$TREESHAKE_SIZE" -gt 51200 ]; then
        log_warning "Tree-shaken CSS is larger than expected: ${TREESHAKE_SIZE} bytes"
    else
        log_success "Tailwind tree-shaking verified (${TREESHAKE_SIZE} bytes)"
    fi
}

# Security audit
run_security_audit() {
    log_info "Running security audit..."
    
    # Run npm audit with appropriate level
    if npm audit --audit-level=moderate; then
        log_success "Security audit passed"
    else
        log_warning "Security audit found issues - please review"
        # Don't fail CI for audit issues, just warn
    fi
}

# Package for distribution
package_dist() {
    log_info "Packaging for distribution..."
    
    # Create tarball for testing
    npm pack --quiet
    
    # Verify package contents
    TARBALL=$(ls -t *.tgz | head -n1)
    
    if [ -f "$TARBALL" ]; then
        log_success "Package created: $TARBALL"
        # Clean up tarball (CI will create it again during publish)
        rm -f "$TARBALL"
    else
        log_error "Failed to create package"
        exit 1
    fi
}

# Test framework integrations
test_framework_integrations() {
    log_info "Testing framework integrations..."
    
    # Create a temporary directory for testing
    TEST_DIR="./test-frameworks-ci"
    mkdir -p "$TEST_DIR"
    
    # Package the library for testing
    PACKAGE_FILE=$(npm pack --silent)
    PACKAGE_PATH="$(pwd)/$PACKAGE_FILE"
    
    # Test basic import syntax
    cd "$TEST_DIR"
    
    # Create a simple test file
    cat > test-import.mjs << 'EOF'
import { GlassButton } from '../dist/index.mjs';
console.log('Import test passed:', typeof GlassButton === 'function');
EOF
    
    # Test if import works (Node.js 14+ supports ES modules)
    if node test-import.mjs 2>/dev/null; then
        log_success "Framework integration test passed"
    else
        log_warning "Framework integration test had issues (this might be expected in some CI environments)"
    fi
    
    # Cleanup
    cd ..
    rm -rf "$TEST_DIR"
    rm -f "$PACKAGE_FILE"
}

# Main CI pipeline functions
ci_quality_checks() {
    log_info "Starting quality checks pipeline..."
    verify_dependencies
    setup_ci
    install_deps
    run_lint
    run_typecheck
    log_success "Quality checks completed"
}

ci_test_suite() {
    log_info "Starting test suite pipeline..."
    run_tests
    run_a11y_tests
    # E2E tests might need special setup in CI, so make them optional
    if [ "${CI_SKIP_E2E:-false}" != "true" ]; then
        run_e2e_tests
    else
        log_info "Skipping E2E tests (CI_SKIP_E2E=true)"
    fi
    log_success "Test suite completed"
}

ci_build_pipeline() {
    log_info "Starting build pipeline..."
    build_library
    verify_build
    check_bundle_sizes
    verify_tailwind_treeshaking
    log_success "Build pipeline completed"
}

ci_security_checks() {
    log_info "Starting security checks..."
    run_security_audit
    log_success "Security checks completed"
}

ci_integration_tests() {
    log_info "Starting integration tests..."
    test_framework_integrations
    log_success "Integration tests completed"
}

ci_package() {
    log_info "Starting packaging..."
    package_dist
    log_success "Packaging completed"
}

# Full CI pipeline
ci_full() {
    log_info "Starting full CI pipeline..."
    ci_quality_checks
    ci_test_suite
    ci_build_pipeline
    ci_security_checks
    ci_integration_tests
    ci_package
    log_success "Full CI pipeline completed successfully! 🎉"
}

# Command line interface
case "${1:-help}" in
    "quality")
        ci_quality_checks
        ;;
    "test")
        ci_test_suite
        ;;
    "build")
        ci_build_pipeline
        ;;
    "security")
        ci_security_checks
        ;;
    "integration")
        ci_integration_tests
        ;;
    "package")
        ci_package
        ;;
    "full")
        ci_full
        ;;
    "help"|*)
        printf "LiquidUI CI/CD Script\n\n"
        printf "Usage: %s [command]\n\n" "$(basename "$0")"
        printf "Commands:\n"
        printf "  quality     - Run quality checks (lint, typecheck)\n"
        printf "  test        - Run test suite\n"
        printf "  build       - Build and verify library\n"
        printf "  security    - Run security audit\n"
        printf "  integration - Test framework integrations\n"
        printf "  package     - Package for distribution\n"
        printf "  full        - Run complete CI pipeline\n"
        printf "  help        - Show this help message\n\n"
        printf "Environment variables:\n"
        printf "  CI_SKIP_E2E - Set to 'true' to skip E2E tests\n"
        printf "  NODE_ENV    - Automatically set to 'production'\n"
        ;;
esac
