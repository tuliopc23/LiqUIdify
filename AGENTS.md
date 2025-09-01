# AGENTS.md

Essential guidance for AI coding agents in LiqUIdify repository.

## Build/Test Commands
```bash
bun run build:lib                    # Build component library
bun run type-check                   # TypeScript checking
bun run lint                         # Lint with Biome
bun run format                       # Format with Biome
bun test                             # Run all tests
bun run test:coverage               # Tests with coverage
vitest run path/to/file.test.tsx     # Run single test
```

## Code Style Guidelines
- **TypeScript**: Strict mode, explicit types, no implicit `any`
- **Components**: Use `forwardRef<Element, Props>` with `displayName`
- **Imports**: External libs → internal utils → type imports
- **Naming**: PascalCase components, camelCase functions, kebab-case files
- **Formatting**: Biome (2 spaces, 100 width, double quotes)
- **Testing**: Vitest + Testing Library, test accessibility & edge cases
- **Accessibility**: WCAG 2.1 AA compliance required
- **Performance**: Use `React.memo`, tree-shaking friendly exports</content>
  </xai:function_call/>
  </xai:function_call name="run">
  <parameter name="command">cat AGENTS.md | wc -l
