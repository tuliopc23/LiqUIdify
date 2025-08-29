import { render } from "@testing-library/react";
import { vi, expect, test, beforeAll } from "vitest";
import { JSDOM } from "jsdom";

// Set up DOM environment manually
beforeAll(() => {
  const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
    url: "http://localhost",
  });

  global.window = dom.window as any;
  global.document = dom.window.document;
  global.navigator = dom.window.navigator;

  // Mock matchMedia
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

test("working react test", () => {
  const { container } = render(<div>Hello World</div>);
  const element = container.querySelector("div");
  expect(element?.textContent).toBe("Hello World");
});
