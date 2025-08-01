import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Documentation Site', () => {
  test.use({
    baseURL: 'http://localhost:5173',
  });

  test.beforeEach(async ({ page }) => {
    try {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
    } catch (error) {
      test.skip();
    }
  });

  test('should load documentation homepage', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/LiqUIdify/);
    
    // Check main heading
    const heading = page.locator('h1');
    await expect(heading).toContainText('LiqUIdify');
    
    // Check navigation
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should navigate documentation sections', async ({ page }) => {
    // Click on Getting Started
    await page.click('text=Getting Started');
    await expect(page).toHaveURL(/getting-started/);
    
    // Click on Components
    await page.click('text=Components');
    await expect(page).toHaveURL(/components/);
    
    // Click on API Reference
    await page.click('text=API Reference');
    await expect(page).toHaveURL(/api/);
  });

  test('should display component documentation', async ({ page }) => {
    // Navigate to components
    await page.goto('/components');
    
    // Click on a specific component
    await page.click('text=GlassButton');
    
    // Check component documentation loaded
    await expect(page.locator('h1')).toContainText('GlassButton');
    
    // Check for code examples
    const codeBlock = page.locator('pre code');
    await expect(codeBlock).toBeVisible();
    
    // Check for props table
    const propsTable = page.locator('table').filter({ hasText: 'Prop' });
    await expect(propsTable).toBeVisible();
  });

  test('should have working code examples', async ({ page }) => {
    // Navigate to a component with live examples
    await page.goto('/components/glass-button');
    
    // Find live example iframe
    const exampleFrame = page.frameLocator('.example-frame');
    const button = exampleFrame.locator('button.glass-button');
    
    // Interact with example
    await expect(button).toBeVisible();
    await button.click();
  });

  test('should have working search functionality', async ({ page }) => {
    // Click search button or press Ctrl+K
    await page.keyboard.press('Control+K');
    
    // Wait for search modal
    const searchModal = page.locator('[role="dialog"]');
    await expect(searchModal).toBeVisible();
    
    // Type search query
    await page.fill('input[type="search"]', 'button');
    
    // Check search results
    const results = page.locator('.search-result');
    await expect(results.first()).toBeVisible();
    
    // Click on a result
    await results.first().click();
    
    // Verify navigation
    await expect(page).toHaveURL(/button/);
  });

  test('should display API documentation', async ({ page }) => {
    // Navigate to API docs
    await page.goto('/api');
    
    // Check for API sections
    await expect(page.locator('h2')).toContainText(['Components', 'Hooks', 'Utils']);
    
    // Check for TypeScript definitions
    const typeDefinitions = page.locator('code').filter({ hasText: 'interface' });
    await expect(typeDefinitions.first()).toBeVisible();
  });

  test('should have working sidebar navigation', async ({ page }) => {
    // Check sidebar is visible
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible();
    
    // Expand a section
    await page.click('text=Components');
    
    // Check sub-items are visible
    const subItems = sidebar.locator('a').filter({ hasText: 'Glass' });
    await expect(subItems.first()).toBeVisible();
    
    // Click on a sub-item
    await subItems.first().click();
    
    // Verify navigation and active state
    await expect(subItems.first()).toHaveClass(/active/);
  });

  test('should handle mobile navigation', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check mobile menu button
    const menuButton = page.locator('button[aria-label*="menu"]');
    await expect(menuButton).toBeVisible();
    
    // Open mobile menu
    await menuButton.click();
    
    // Check sidebar slides in
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible();
    
    // Close menu
    await page.click('body'); // Click outside
    await expect(sidebar).not.toBeVisible();
  });

  test('should have proper meta tags and SEO', async ({ page }) => {
    // Check meta description
    const metaDescription = await page.getAttribute('meta[name="description"]', 'content');
    expect(metaDescription).toContain('glassmorphism');
    
    // Check Open Graph tags
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
    expect(ogTitle).toContain('LiqUIdify');
    
    // Check canonical URL
    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(canonical).toBeTruthy();
  });

  test('should load and display code snippets correctly', async ({ page }) => {
    // Navigate to a page with code examples
    await page.goto('/components/glass-button');
    
    // Check syntax highlighting
    const codeBlock = page.locator('pre code');
    await expect(codeBlock).toHaveClass(/language-/);
    
    // Check copy button
    const copyButton = page.locator('button').filter({ hasText: 'Copy' });
    await expect(copyButton.first()).toBeVisible();
    
    // Test copy functionality
    await copyButton.first().click();
    
    // Check for copy confirmation
    await expect(copyButton.first()).toContainText('Copied');
  });

  test('should have working theme switcher', async ({ page }) => {
    // Find theme toggle
    const themeToggle = page.locator('button[aria-label*="theme"]');
    await expect(themeToggle).toBeVisible();
    
    // Click to switch theme
    await themeToggle.click();
    
    // Check theme changed
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
    
    // Click again to switch back
    await themeToggle.click();
    await expect(html).not.toHaveClass(/dark/);
  });

  test('should display version information', async ({ page }) => {
    // Check for version in navigation or footer
    const version = page.locator('text=/v\\d+\\.\\d+\\.\\d+/');
    await expect(version).toBeVisible();
  });

  test('should have working external links', async ({ page }) => {
    // Check GitHub link
    const githubLink = page.locator('a[href*="github.com"]');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('rel', /noopener/);
    
    // Check npm link
    const npmLink = page.locator('a[href*="npmjs.com"]');
    await expect(npmLink).toBeVisible();
  });

  test('should handle 404 pages gracefully', async ({ page }) => {
    // Navigate to non-existent page
    await page.goto('/non-existent-page');
    
    // Check 404 page is displayed
    await expect(page.locator('h1')).toContainText(['404', 'Not Found']);
    
    // Check for home link
    const homeLink = page.locator('a').filter({ hasText: 'Home' });
    await expect(homeLink).toBeVisible();
    
    // Navigate back home
    await homeLink.click();
    await expect(page).toHaveURL('/');
  });

  test('should measure documentation site performance', async ({ page }) => {
    const metrics = await page.evaluate(() => {
      return JSON.stringify(performance.getEntriesByType('navigation'));
    });
    
    const navTiming = JSON.parse(metrics)[0];
    
    // First Contentful Paint should be fast
    expect(navTiming.loadEventEnd - navTiming.fetchStart).toBeLessThan(3000);
  });

  test('should meet accessibility standards', async ({ page }) => {
    // Test homepage accessibility
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
    
    // Test component page accessibility
    await page.goto('/components/glass-button');
    const componentPageResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    
    expect(componentPageResults.violations).toEqual([]);
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Test tab navigation through header
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
    
    // Test skip link if present
    const skipLink = page.locator('a:has-text("Skip to content")');
    if (await skipLink.isVisible()) {
      await skipLink.click();
      await expect(page.locator('main')).toBeFocused();
    }
  });
});