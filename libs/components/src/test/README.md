# Test Setup Guide

This directory contains the test setup and utilities for the LiqUIdify component library.

## Quick Start

### For React Component Tests

```typescript
import { render } from "@testing-library/react";
import { vi, expect, test, beforeAll } from "vitest";
import { setupDOM } from "./test-setup";

// Set up DOM environment (required for React tests)
beforeAll(() => {
  setupDOM();
});

test("my component test", () => {
  const { container } = render(<MyComponent />);
  const element = container.querySelector("div");
  expect(element?.textContent).toBe("expected text");
});
```

### For Unit Tests (no DOM required)

```typescript
import { vi, expect, test } from "vitest";

test("my unit test", () => {
  const result = myFunction();
  expect(result).toBe("expected value");
});

test("mock example", () => {
  const mockFn = vi.fn();
  mockFn("test");
  expect(mockFn).toHaveBeenCalledWith("test");
});
```

## Available Utilities

### `setupDOM()`

Sets up the DOM environment required for React Testing Library tests. Call this in `beforeAll()`.

### `testUtils`

Contains helper functions for common testing patterns:

```typescript
import { testUtils } from "./test-setup";

// Quick setup for test environment
testUtils.setupTestEnvironment();

// Create hook mocks
const mockHook = testUtils.createHookMock({ data: "test" });

// Mock modules
testUtils.mockModule("./my-module", { default: MockComponent });
```

## File Structure

- `test-setup.ts` - Core test utilities and DOM setup
- `test-utils.ts` - React Testing Library utilities
- `README.md` - This guide

## Running Tests

```bash
# Run all tests
bun test

# Run specific test file
bun test libs/components/src/test/example-component.test.tsx

# Run with coverage
bun test --coverage
```

## Best Practices

1. **Always call `setupDOM()`** in `beforeAll()` for React component tests
2. **Use container queries** instead of `screen` for more reliable tests
3. **Mock external dependencies** using `vi.mock()`
4. **Clean up mocks** between tests using `vi.clearAllMocks()`

## Example Test Patterns

### Component with Props

```typescript
test("renders with custom text", () => {
  const { container } = render(<Button text="Click me" />);
  expect(container.textContent).toContain("Click me");
});
```

### Component with User Interaction

```typescript
test("handles click", () => {
  const mockClick = vi.fn();
  const { container } = render(<Button onClick={mockClick} />);

  const button = container.querySelector("button");
  button?.click();

  expect(mockClick).toHaveBeenCalled();
});
```

### Mocking Hooks

```typescript
vi.mock("../../hooks/use-device-capabilities", () => ({
  useDeviceCapabilities: vi.fn(() => ({
    hasBackdropFilter: true,
    hasSVGFilters: true,
    // ... other mock values
  })),
}));
```
