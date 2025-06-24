import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
afterEach(() => {
    cleanup();
});
// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));
// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));
// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});
// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn(cb => {
    setTimeout(cb, 0);
    return 1;
});
global.cancelAnimationFrame = jest.fn();
// Mock performance.now
Object.defineProperty(window, 'performance', {
    writable: true,
    value: {
        now: jest.fn(() => Date.now()),
        measure: jest.fn(),
        mark: jest.fn(),
        getEntriesByName: jest.fn(() => []),
        getEntriesByType: jest.fn(() => []),
    },
});
