// server/app.ts
import { Elysia, Context } from 'elysia';
import { api } from './routes/api';

// Security utilities
function applySecurityHeaders(context: Context) {
  context.set.headers = {
    ...context.set.headers,
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  };
}

// Simple rate limiting implementation
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const defaultRateLimitOptions = {
  maxRequests: 100,
  windowMs: 15 * 60 * 1000, // 15 minutes
};

function rateLimit(options: typeof defaultRateLimitOptions) {
  return (context: Context) => {
    const clientId = context.request.headers.get('x-forwarded-for') || 
                     context.request.headers.get('x-real-ip') || 
                     'unknown';
    
    const now = Date.now();
    const clientData = requestCounts.get(clientId);
    
    if (!clientData || now > clientData.resetTime) {
      requestCounts.set(clientId, {
        count: 1,
        resetTime: now + options.windowMs,
      });
      return true;
    }
    
    if (clientData.count >= options.maxRequests) {
      return false;
    }
    
    clientData.count++;
    return true;
  };
}

// Fixed security middleware - using onRequest instead of derive
const securityMiddleware = (context: Context) => {
  applySecurityHeaders(context);
  const ok = rateLimit(defaultRateLimitOptions)(context);
  if (!ok) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: { 
          code: 'RATE_LIMIT_EXCEEDED', 
          message: 'Too many requests' 
        } 
      }),
      { 
        status: 429, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
};

const app = new Elysia()
  .onRequest(securityMiddleware) // Fixed: Using onRequest instead of derive
  .use(api)
  .get('/', () => ({ message: 'HackerFolio API Server' }))
  .get('*', ({ request, set }) => {
    // Fixed: SSR route header assignment without out-of-scope context reference
    set.headers = {
      ...set.headers,
      'Content-Type': 'text/html; charset=utf-8'
    };
    
    // SSR implementation would go here
    try {
      // This would be replaced with actual SSR implementation
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>HackerFolio</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
          </head>
          <body>
            <div id="root">Loading...</div>
            <script type="module" src="/assets/index.js"></script>
          </body>
        </html>
      `;
      return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    } catch (error) {
      console.error('SSR Error:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  });

export { app };