/**
 * React Server Components and SSR Compatibility Tests
 * Tests to ensure components work correctly in server environments
 */

import { describe, it, expect, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import React from 'react';

// Import components to test
import { GlassButton } from '../../components/glass-button';
import { GlassCard } from '../../components/glass-card';
import { GlassInput } from '../../components/glass-input';

// Mock window and browser APIs for SSR environment
const mockWindow = {
  matchMedia: vi.fn(() => ({
    matches: false,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
  requestAnimationFrame: vi.fn(),
  cancelAnimationFrame: vi.fn(),
};

// Mock GSAP for server environment
vi.mock('gsap', () => ({
  default: {
    timeline: vi.fn(() => ({
      to: vi.fn(() => ({ to: vi.fn() })),
      from: vi.fn(() => ({ to: vi.fn() })),
      set: vi.fn(() => ({ to: vi.fn() })),
    })),
    to: vi.fn(),
    from: vi.fn(),
    set: vi.fn(),
  },
}));

// Mock framer-motion for server environment
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    button: 'button',
    input: 'input',
    span: 'span',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  useAnimation: () => ({}),
  useMotionValue: () => ({ set: vi.fn(), get: vi.fn() }),
}));

describe('Server-Side Rendering Compatibility', () => {
  beforeEach(() => {
    // Setup server environment
    Object.defineProperty(globalThis, 'window', {
      value: undefined,
      writable: true,
    });

    Object.defineProperty(globalThis, 'document', {
      value: undefined,
      writable: true,
    });

    Object.defineProperty(globalThis, 'navigator', {
      value: undefined,
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('GlassButton SSR', () => {
    it('should render without errors on server', () => {
      expect(() => {
        const html = renderToString(
          <GlassButton variant="default">Test Button</GlassButton>
        );
        expect(html).toContain('Test Button');
      }).not.toThrow();
    });

    it('should render with all variants on server', () => {
      const variants = ['default', 'primary', 'secondary', 'ghost'] as const;

      variants.forEach(variant => {
        expect(() => {
          const html = renderToString(
            <GlassButton variant={variant}>Button {variant}</GlassButton>
          );
          expect(html).toContain(`Button ${variant}`);
        }).not.toThrow();
      });
    });

    it('should handle disabled state on server', () => {
      expect(() => {
        const html = renderToString(
          <GlassButton disabled>Disabled Button</GlassButton>
        );
        expect(html).toContain('Disabled Button');
      }).not.toThrow();
    });
  });

  describe('GlassCard SSR', () => {
    it('should render without errors on server', () => {
      expect(() => {
        const html = renderToString(
          <GlassCard>
            <div>Card Content</div>
          </GlassCard>
        );
        expect(html).toContain('Card Content');
      }).not.toThrow();
    });

    it('should render with blur variants on server', () => {
      const blurVariants = ['light', 'medium', 'heavy'] as const;

      blurVariants.forEach(blur => {
        expect(() => {
          const html = renderToString(
            <GlassCard blur={blur}>Card with {blur} blur</GlassCard>
          );
          expect(html).toContain(`Card with ${blur} blur`);
        }).not.toThrow();
      });
    });
  });

  describe('GlassInput SSR', () => {
    it('should render without errors on server', () => {
      expect(() => {
        const html = renderToString(
          <GlassInput placeholder="Test input" />
        );
        expect(html).toContain('placeholder="Test input"');
      }).not.toThrow();
    });

    it('should handle controlled input on server', () => {
      expect(() => {
        const html = renderToString(
          <GlassInput value="Test value" onChange={() => {}} />
        );
        expect(html).toContain('value="Test value"');
      }).not.toThrow();
    });
  });

  describe('Hydration Safety', () => {
    it('should not use browser-only APIs during SSR', () => {
      // Test that components don't call browser APIs during SSR
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      renderToString(
        <div>
          <GlassButton>Button</GlassButton>
          <GlassCard>Card</GlassCard>
          <GlassInput placeholder="Input" />
        </div>
      );

      // Should not have warnings or errors about browser APIs
      expect(consoleWarnSpy).not.toHaveBeenCalled();
      expect(consoleErrorSpy).not.toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });

    it('should generate consistent HTML structure', () => {
      const component = (
        <GlassCard>
          <GlassButton>Click me</GlassButton>
        </GlassCard>
      );

      const html1 = renderToString(component);
      const html2 = renderToString(component);

      expect(html1).toBe(html2);
    });
  });

  describe('CSS Variables SSR', () => {
    it('should work with CSS variables in SSR environment', () => {
      expect(() => {
        const html = renderToString(
          <div style={{ 
            backgroundColor: 'var(--liquid-glass-primary)',
            borderRadius: 'var(--liquid-radius-md)'
          }}>
            CSS Variables Test
          </div>
        );
        expect(html).toContain('--liquid-glass-primary');
        expect(html).toContain('--liquid-radius-md');
      }).not.toThrow();
    });
  });
});

describe('Next.js App Router Compatibility', () => {
  it('should work as React Server Component', async () => {
    // Test that components can be used as RSCs
    const ServerComponent = () => {
      return (
        <div>
          <GlassCard>
            <h1>Server Rendered Card</h1>
            <p>This is rendered on the server</p>
          </GlassCard>
        </div>
      );
    };

    expect(() => {
      const html = renderToString(<ServerComponent />);
      expect(html).toContain('Server Rendered Card');
      expect(html).toContain('This is rendered on the server');
    }).not.toThrow();
  });

  it('should support static rendering', () => {
    const StaticComponent = () => (
      <GlassButton variant="primary">
        Static Button
      </GlassButton>
    );

    const html = renderToString(<StaticComponent />);
    expect(html).toContain('Static Button');
    expect(html).not.toContain('undefined');
  });
});

describe('Progressive Enhancement', () => {
  it('should provide fallback for JavaScript-disabled environments', () => {
    const html = renderToString(
      <GlassButton>Works without JS</GlassButton>
    );

    // Should render as a basic button that works without JavaScript
    expect(html).toContain('Works without JS');
    expect(html).toMatch(/<button[^>]*>/);
  });

  it('should maintain accessibility without JavaScript', () => {
    const html = renderToString(
      <GlassButton aria-label="Accessible button">
        Accessible
      </GlassButton>
    );

    expect(html).toContain('aria-label="Accessible button"');
  });
});
