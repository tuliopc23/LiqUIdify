import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { Button } from '../components/button';

describe('SSR smoke', () => {
  it('renders Button on the server', () => {
    const html = renderToString(<Button>Test</Button>);
    expect(html).toContain('Test');
  });
});
