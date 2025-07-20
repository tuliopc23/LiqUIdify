# 🦀 OXC Tools Configuration Guide

This guide explains how to properly configure and use OXC tools in your LiqUIdify project, replacing ESLint with the faster, Rust-based OXC linter.

## 📋 Overview

OXC (Oxidation Compiler) is a collection of JavaScript tools written in Rust, providing:
- **oxlint**: Ultra-fast linter (100x faster than ESLint)
- **oxc**: Parser and transformer
- **oxc_resolver**: Module resolution

## 🔧 Configuration Files

### 1. `oxc.config.json` - Main OXC Configuration

```json
{
  "$schema": "https://raw.githubusercontent.com/oxc-project/oxc/main/schemas/oxc.json",
  "env": {
    "bun": true,
    "browser": true,
    "es6": true,
    "es2020": true,
    "es2022": true
  },
  "parser": {
    "sourceType": "module",
    "typescript": {
      "jsx": {
        "runtime": "automatic",
        "importSource": "react"
      }
    }
  },
  "transform": {
    "jsx": {
      "runtime": "automatic",
      "importSource": "react"
    }
  },
  "resolver": {
    "alias": {
      "@": "./src",
      "@/tokens": "./src/tokens/index",
      "@/design-tokens": "./src/tokens/design-tokens"
    }
  }
}
```

### 2. `.oxlintrc.json` - Linting Configuration

```json
{
  "plugins": [
    "react",
    "jsx-a11y", 
    "typescript",
    "import",
    "unicorn",
    "oxc"
  ],
  "categories": {
    "correctness": "error",
    "suspicious": "warn",
    "style": "warn"
  },
  "env": {
    "bun": true,
    "browser": true,
    "es2020": true
  }
}
```

## 🚀 Usage Commands

### Basic Linting
```bash
# Lint all source files
bun run lint

# Lint with auto-fix
bun run lint:fix

# Lint for CI (no auto-fix)
bun run lint:ci
```

### Advanced OXC Commands
```bash
# Test OXC resolution
bun run oxc:test

# Run all OXC checks
bun run oxc:all

# Build with OXC validation
bun run build:oxc

# Quality assurance with OXC
bun run qa:oxc
```

## 📊 Performance Comparison

| Tool | Speed | Features |
|------|-------|----------|
| ESLint | 1x | Full ecosystem |
| oxlint | 100x | Core rules + plugins |

## 🔍 Supported Rules

### Core Categories
- **Correctness**: Catches actual bugs
- **Suspicious**: Catches likely bugs
- **Style**: Code style issues
- **Pedantic**: Nitpicky rules (disabled by default)

### Plugin Support
- ✅ **React**: JSX and React-specific rules
- ✅ **TypeScript**: Type-aware linting
- ✅ **JSX A11y**: Accessibility rules
- ✅ **Import**: Import/export validation
- ✅ **Unicorn**: Additional quality rules

## 🛠️ Migration from ESLint

### 1. Remove ESLint Dependencies
```bash
bun remove eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### 2. Update Scripts
```json
{
  "scripts": {
    "lint": "bunx oxlint src",
    "lint:fix": "bunx oxlint src --fix"
  }
}
```

### 3. Update lint-staged
```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "bunx oxlint --fix",
      "prettier --write"
    ]
  }
}
```

## 🎯 Best Practices

### 1. Configuration Organization
- Keep `oxc.config.json` for parser/transformer settings
- Use `.oxlintrc.json` for linting rules
- Separate concerns between files

### 2. Rule Selection
- Start with `correctness: "error"`
- Add `suspicious: "warn"` for likely bugs
- Enable `style: "warn"` for consistency
- Avoid `pedantic` unless needed

### 3. Performance Optimization
- Use `ignorePatterns` to exclude unnecessary files
- Focus on source files, exclude build artifacts
- Leverage OXC's speed for large codebases

### 4. Integration with Bun
- Use `bunx oxlint` instead of `npx oxlint`
- Leverage Bun's speed for script execution
- Combine with Bun's built-in TypeScript support

## 🔧 Troubleshooting

### Common Issues

#### 1. TypeScript Errors
```bash
# Ensure TypeScript is properly configured
bun run type-check
```

#### 2. Import Resolution
```json
// Add to oxc.config.json
{
  "resolver": {
    "alias": {
      "@": "./src"
    }
  }
}
```

#### 3. React JSX Issues
```json
// Ensure JSX runtime is configured
{
  "parser": {
    "typescript": {
      "jsx": {
        "runtime": "automatic",
        "importSource": "react"
      }
    }
  }
}
```

### Performance Issues
- Check `ignorePatterns` in `.oxlintrc.json`
- Exclude `node_modules`, `dist`, `build` directories
- Use specific file patterns instead of wildcards

## 📈 Monitoring and Metrics

### Linting Performance
```bash
# Time the linting process
time bun run lint

# Compare with previous ESLint setup
# ESLint: ~30s for large codebase
# oxlint: ~0.3s for same codebase
```

### Rule Coverage
- Monitor rule violations over time
- Track fix rates for different rule categories
- Adjust rule severity based on team feedback

## 🔄 Continuous Integration

### GitHub Actions Integration
```yaml
- name: Lint code with OXC
  run: bun run lint:ci
```

### Pre-commit Hooks
```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "bunx oxlint --fix",
      "prettier --write"
    ]
  }
}
```

## 📚 Additional Resources

- [OXC Documentation](https://oxc-project.github.io/)
- [oxlint Rules Reference](https://oxc-project.github.io/docs/guide/usage/linter.html)
- [Bun Documentation](https://bun.sh/docs)

## 🎉 Benefits Summary

1. **Speed**: 100x faster than ESLint
2. **Memory**: Lower memory usage
3. **Accuracy**: Rust-based parsing
4. **Modern**: Built for modern JavaScript/TypeScript
5. **Integration**: Works seamlessly with Bun
6. **Maintenance**: Less configuration overhead

---

*This configuration is optimized for the LiqUIdify component library using Bun and OXC tools.*