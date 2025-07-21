import React from 'react';
import { renderToString } from 'react-dom/server';
import { GlassModal } from './index';

describe('GlassModal SSR Safety', () => {
  it('renders safely on server without throwing when closed', () => {
    expect(() => {
      renderToString(
        <GlassModal isOpen={false} onClose={() => {}}>
          Modal Content
        </GlassModal>
      );
    }).not.toThrow();
  });

  it('renders safely on server without throwing when open', () => {
    expect(() => {
      renderToString(
        <GlassModal isOpen={true} onClose={() => {}}>
          Modal Content
        </GlassModal>
      );
    }).not.toThrow();
  });

  it('renders with title safely on server', () => {
    expect(() => {
      renderToString(
        <GlassModal isOpen={true} onClose={() => {}} title="Test Modal">
          Modal with Title
        </GlassModal>
      );
    }).not.toThrow();
  });

  it('renders with custom className safely on server', () => {
    expect(() => {
      renderToString(
        <GlassModal 
          isOpen={true} 
          onClose={() => {}} 
          className="custom-modal"
          titleClassName="custom-title"
          contentClassName="custom-content"
        >
          Modal with Custom Classes
        </GlassModal>
      );
    }).not.toThrow();
  });
});