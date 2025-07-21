import React from 'react';
import { renderToString } from 'react-dom/server';
import { GlassButton } from './index';

describe('GlassButton SSR Safety', () => {
  it('renders safely on server without throwing', () => {
    expect(() => {
      renderToString(<GlassButton>Test Button</GlassButton>);
    }).not.toThrow();
  });

  it('renders with all variants safely on server', () => {
    const variants = ['primary', 'secondary', 'ghost'];
    const sizes = ['sm', 'md', 'lg'];

    variants.forEach(variant => {
      sizes.forEach(size => {
        expect(() => {
          renderToString(
            <GlassButton variant={variant as any} size={size as any}>
              {variant} {size}
            </GlassButton>
          );
        }).not.toThrow();
      });
    });
  });

  it('renders with custom className safely on server', () => {
    expect(() => {
      renderToString(
        <GlassButton className="custom-class">
          Custom Class Button
        </GlassButton>
      );
    }).not.toThrow();
  });
});