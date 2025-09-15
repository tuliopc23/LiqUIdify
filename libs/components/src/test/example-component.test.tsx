import { render } from "@testing-library/react";
import { beforeAll, expect, test, vi } from "vitest";
import { setupDOM } from "./test-setup";

// Set up DOM environment
beforeAll(() => {
  setupDOM();
});

// Example component for testing
function ExampleComponent({ text }: { text: string }) {
  return <div data-testid="example">{text}</div>;
}

test("renders component with text", () => {
  const { container } = render(<ExampleComponent text="Hello World" />);
  const element = container.querySelector('[data-testid="example"]');
  expect(element?.textContent).toBe("Hello World");
});

test("mock example", () => {
  const mockFn = vi.fn();
  mockFn("test");
  expect(mockFn).toHaveBeenCalledWith("test");
});
