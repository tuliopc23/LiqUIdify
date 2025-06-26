import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { vi, afterEach, beforeAll } from 'vitest';
import { JSDOM } from 'jsdom';

// Setup JSDOM
const dom = new JSDOM();
global.window = dom.window as unknown as Window & typeof globalThis;
global.document = dom.window.document;
Object.defineProperty(global.window, 'innerWidth', {
  writable: true,
  value: 1024,
});

// Mock requestIdleCallback
global.requestIdleCallback = vi.fn(cb => {
  const handle = setTimeout(cb, 0);
  return handle as unknown as number;
});
global.cancelIdleCallback = vi.fn(handle => {
  clearTimeout(handle);
});

// Mock window.crypto
Object.defineProperty(global.window, 'crypto', {
  value: {
    getRandomValues: (arr: any) => require('crypto').randomBytes(arr.length)
  }
});

afterEach(() => {
  cleanup();
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
  takeRecords: vi.fn(() => []),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: true, // Always match in tests
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn(cb => {
  setTimeout(cb, 0);
  return 1;
});

global.cancelAnimationFrame = vi.fn();

// Mock performance.now
Object.defineProperty(window, 'performance', {
  writable: true,
  value: {
    now: vi.fn(() => Date.now()),
    measure: vi.fn(),
    mark: vi.fn(),
    getEntriesByName: vi.fn(() => []),
    getEntriesByType: vi.fn(() => []),
  },
});
