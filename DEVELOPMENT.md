# 🚀 LiqUIdify Development Guide

Welcome to the LiqUIdify development environment! This guide will help you get up and running quickly with the best developer experience possible.

## 🏃‍♂️ Quick Start

### 1. One-Command Setup

```bash
# Clone and setup everything
git clone <repo-url>
cd LiqUIdify
node scripts/setup-dev.mjs
```

### 2. Start Development

```bash
# Start all development servers (recommended)
bun run dev:all

# OR start individual services
bun run storybook      # Storybook only
bun run docs:dev       # Documentation only
```

### 3. Open Your Tools

- 🎨 **Storybook**: http://localhost:6006
- 📚 **Documentation**: http://localhost:3000
- 💻 **VS Code**: Open `liquidify.code-workspace`

## 🛠️ Development Commands

### 🚀 Quick Development

```bash
bun run dev:all        # Start everything (lib watch + storybook + docs)
bun run dev:quick      # Start lib + storybook only (faster)
bun run storybook      # Storybook only
bun run docs:dev       # Documentation only
```

### 🔨 Building

```bash
bun run build:all      # Build everything
bun run build:lib      # Build component library
bun run build:storybook # Build storybook
bun run build:docs     # Build documentation
```

### 🔍 Quality Checks

```bash
bun run type-check     # TypeScript checking
bun run type-check:watch # TypeScript checking (watch mode)
bun run test           # Run tests
bun run test:coverage  # Run tests with coverage
bun run lint           # Lint code
bun run format:fix     # Format code
```

### 📊 Workspace Management

```bash
bun run workspace:info    # Show workspace information
bun run workspace:verify  # Verify workspace setup
```

## 🏗️ Project Structure

```
LiqUIdify/
├── 📦 libs/components/           # Core component library
│   ├── src/                      # Source code
│   ├── dist/                     # Built output
│   └── package.json              # @liquidify/components
├── 🎨 apps/storybook/            # Storybook application
│   ├── src/stories/              # Story files
│   ├── .storybook/               # Storybook config
│   └── package.json              # @liquidify/storybook-app
├── 📚 apps/docs/                 # Documentation site
│   ├── components/               # Component docs
│   ├── guides/                   # Guides and tutorials
│   └── package.json              # @liquidify/docs
├── 🔧 scripts/                   # Development scripts
└── 📋 package.json               # Root workspace config
```

## 🎯 Workspace Filtering

Run commands in specific workspaces:

```bash
# Component library
bun run --filter @liquidify/components build
bun run --filter @liquidify/components type-check
bun run --filter @liquidify/components build:watch

# Storybook
bun run --filter @liquidify/storybook-app dev
bun run --filter @liquidify/storybook-app build

# Documentation
bun run --filter @liquidify/docs dev
bun run --filter @liquidify/docs build:css
```

## 💻 VS Code Setup

### 1. Open Workspace

```bash
code liquidify.code-workspace
```

### 2. Recommended Extensions

The workspace file includes recommended extensions:

- Prettier (code formatting)
- Tailwind CSS IntelliSense
- TypeScript support
- Auto import
- Error lens
- Playwright (for testing)

### 3. Built-in Tasks

Use `Cmd+Shift+P` → "Tasks: Run Task":

- 🚀 Start All Development Servers
- 📦 Build Component Library
- 🎨 Start Storybook
- 📚 Start Documentation
- 🔍 Type Check All
- 🧪 Run Tests
- ✨ Format Code

## 🔄 Development Workflow

### Adding New Components

1. **Create Component**

   ```bash
   # In libs/components/src/components/
   mkdir my-component
   touch my-component/index.ts
   touch my-component/MyComponent.tsx
   ```

2. **Add Story**

   ```bash
   # In apps/storybook/src/stories/
   touch MyComponent.stories.tsx
   ```

3. **Add Documentation**

   ```bash
   # In apps/docs/components/
   touch my-component.mdx
   ```

4. **Test Changes**
   ```bash
   bun run dev:all  # See changes in real-time
   ```

### Making Changes

1. **Component Library Changes**
   - Edit files in `libs/components/src/`
   - Changes auto-rebuild in watch mode
   - Storybook hot-reloads automatically

2. **Storybook Changes**
   - Edit stories in `apps/storybook/src/stories/`
   - Hot-reload is instant

3. **Documentation Changes**
   - Edit files in `apps/docs/`
   - Mintlify auto-reloads

## 🧪 Testing

### Running Tests

```bash
bun run test              # Run all tests
bun run test:coverage     # With coverage report
bun run test:a11y         # Accessibility tests
bun run test:e2e          # End-to-end tests
bun run test:performance  # Performance tests
```

### Test Structure

```
libs/components/src/test/
├── accessibility-integration.test.tsx
├── build-validation.test.ts
├── e2e-workflows.test.tsx
├── integration.test.tsx
└── performance-integration.test.tsx
```

## 🔧 Troubleshooting

### Common Issues

1. **"Cannot find module '@liquidify/components'"**

   ```bash
   bun install  # Reinstall workspace links
   ```

2. **Build Failures**

   ```bash
   bun run clean:all  # Clean everything
   bun install        # Reinstall
   bun run build:lib  # Rebuild library
   ```

3. **TypeScript Errors**

   ```bash
   bun run type-check  # Check all workspaces
   ```

4. **Storybook Won't Start**
   ```bash
   bun run build:lib   # Build library first
   bun run storybook   # Then start storybook
   ```

### Getting Help

1. **Check Workspace Status**

   ```bash
   bun run workspace:verify
   bun run workspace:info
   ```

2. **View Logs**

   ```bash
   bun run dev:all  # Shows all logs in one terminal
   ```

3. **Reset Everything**
   ```bash
   bun run clean:all  # Nuclear option
   ```

## 🎨 Customization

### Environment Variables

Create `.env.local` for local overrides:

```bash
# Storybook port
STORYBOOK_PORT=6006

# Documentation port
DOCS_PORT=3000
```

### VS Code Settings

Customize in `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "typescript.preferences.includePackageJsonAutoImports": "on"
}
```

## 📈 Performance Tips

1. **Use `dev:quick` for faster startup** (skips docs)
2. **Use workspace filtering** for targeted commands
3. **Enable TypeScript watch mode** for continuous checking
4. **Use VS Code workspace** for better IntelliSense

## 🤝 Contributing

1. **Fork & Clone**
2. **Run Setup**: `node scripts/setup-dev.mjs`
3. **Create Branch**: `git checkout -b feature/my-feature`
4. **Make Changes**: Use `bun run dev:all`
5. **Test**: `bun run test:all`
6. **Submit PR**

## 📚 Resources

- [Bun Workspaces](https://bun.com/docs/install/workspaces)
- [Storybook Docs](https://storybook.js.org/docs)
- [Mintlify Docs](https://mintlify.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

Happy coding! 🌊✨
