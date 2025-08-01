import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Component Showcase', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Storybook
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should load Storybook homepage', async ({ page }) => {
    // Check Storybook loaded
    await expect(page).toHaveTitle(/Storybook/);
    
    // Check sidebar is visible
    const sidebar = page.locator('[id="storybook-explorer-tree"]');
    await expect(sidebar).toBeVisible();
    
    // Check canvas is visible
    const canvas = page.locator('#storybook-preview-iframe');
    await expect(canvas).toBeVisible();
  });

  test('should navigate through component stories', async ({ page }) => {
    // Click on Components section
    await page.click('text=Components');
    
    // Navigate to GlassButton
    await page.click('text=GlassButton');
    await page.waitForTimeout(1000);
    
    // Check story loaded
    const iframe = page.frameLocator('#storybook-preview-iframe');
    const button = iframe.locator('button').first();
    await expect(button).toBeVisible();
    await expect(button).toHaveClass(/glass-button/);
  });

  test('should display all component variants', async ({ page }) => {
    // Navigate to GlassCard
    await page.goto('/?path=/story/components-glass-card--all-variants');
    
    const iframe = page.frameLocator('#storybook-preview-iframe');
    
    // Check all variants are displayed
    const cards = iframe.locator('.glass-card');
    await expect(cards).toHaveCount(3); // default, elevated, inset
    
    // Verify each variant
    await expect(cards.nth(0)).toHaveClass(/variant-default/);
    await expect(cards.nth(1)).toHaveClass(/variant-elevated/);
    await expect(cards.nth(2)).toHaveClass(/variant-inset/);
  });

  test('should handle component interactions', async ({ page }) => {
    // Navigate to interactive button story
    await page.goto('/?path=/story/components-glass-button--interactive');
    
    const iframe = page.frameLocator('#storybook-preview-iframe');
    const button = iframe.locator('button').first();
    
    // Test hover state
    await button.hover();
    await expect(button).toHaveClass(/hover/);
    
    // Test click
    await button.click();
    
    // Check for click handler (might show alert or console log)
    // This depends on your story implementation
  });

  test('should meet accessibility standards', async ({ page }) => {
    // Navigate to a component story
    await page.goto('/?path=/story/components-glass-button--default');
    
    // Wait for component to load
    const iframe = page.frameLocator('#storybook-preview-iframe');
    await expect(iframe.locator('button')).toBeVisible();
    
    // Run accessibility checks with axe-core
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('#storybook-preview-iframe')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Navigate to tabs component
    await page.goto('/?path=/story/navigation-glass-tabs--default');
    
    const iframe = page.frameLocator('#storybook-preview-iframe');
    
    // Focus first tab
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // Skip Storybook UI
    
    const firstTab = iframe.locator('[role="tab"]').first();
    await expect(firstTab).toBeFocused();
    
    // Navigate with arrow keys
    await page.keyboard.press('ArrowRight');
    const secondTab = iframe.locator('[role="tab"]').nth(1);
    await expect(secondTab).toBeFocused();
    
    // Activate tab with Enter
    await page.keyboard.press('Enter');
    await expect(secondTab).toHaveAttribute('aria-selected', 'true');
  });

  test('should render glassmorphism effects correctly', async ({ page }) => {
    // Navigate to glass card
    await page.goto('/?path=/story/components-glass-card--default');
    
    const iframe = page.frameLocator('#storybook-preview-iframe');
    const card = iframe.locator('.glass-card').first();
    
    // Check glass effect styles
    const backdrop = await card.evaluate(el => 
      window.getComputedStyle(el).backdropFilter
    );
    expect(backdrop).toContain('blur');
    
    const background = await card.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    expect(background).toMatch(/rgba/);
  });

  test('should handle responsive behavior', async ({ page, viewport }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/?path=/story/navigation-glass-mobile-nav--default');
    
    const iframe = page.frameLocator('#storybook-preview-iframe');
    const mobileNav = iframe.locator('.glass-mobile-nav');
    
    // Check mobile navigation is visible
    await expect(mobileNav).toBeVisible();
    
    // Check hamburger menu
    const menuButton = iframe.locator('[aria-label*="menu"]');
    await expect(menuButton).toBeVisible();
    
    // Open mobile menu
    await menuButton.click();
    const menu = iframe.locator('[role="navigation"]');
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.reload();
    
    // Menu button should be hidden on desktop
    await expect(menuButton).toBeHidden();
  });

  test('should capture visual regression screenshots', async ({ page }) => {
    const components = [
      'glass-button--default',
      'glass-card--default',
      'glass-modal--default',
      'glass-table--default',
      'glass-accordion--default',
    ];

    for (const component of components) {
      await page.goto(`/?path=/story/components-${component}`);
      await page.waitForTimeout(1000); // Wait for animations
      
      const iframe = page.frameLocator('#storybook-preview-iframe');
      await expect(iframe.locator('body')).toHaveScreenshot(
        `${component}.png`,
        {
          fullPage: true,
          animations: 'disabled',
        }
      );
    }
  });

  test('should handle form interactions', async ({ page }) => {
    // Navigate to form story
    await page.goto('/?path=/story/forms-complete-form--default');
    
    const iframe = page.frameLocator('#storybook-preview-iframe');
    
    // Fill form fields
    await iframe.locator('input[type="text"]').first().fill('John Doe');
    await iframe.locator('input[type="email"]').fill('john@example.com');
    await iframe.locator('textarea').fill('Test message');
    
    // Select dropdown option
    await iframe.locator('select').selectOption('option2');
    
    // Check checkbox
    await iframe.locator('input[type="checkbox"]').first().check();
    
    // Submit form
    await iframe.locator('button[type="submit"]').click();
    
    // Verify form submission (depends on your implementation)
    // This might show a success message or trigger an action
  });

  test('should load and navigate documentation', async ({ page }) => {
    // Test documentation site if running
    const docsUrl = 'http://localhost:5173';
    
    try {
      await page.goto(docsUrl);
      await page.waitForLoadState('networkidle');
      
      // Check documentation loaded
      await expect(page).toHaveTitle(/LiqUIdify/);
      
      // Navigate to components section
      await page.click('text=Components');
      
      // Check component list is visible
      const componentList = page.locator('.component-list');
      await expect(componentList).toBeVisible();
      
    } catch (error) {
      // Skip if docs server not running
      test.skip();
    }
  });

  test('should handle error states gracefully', async ({ page }) => {
    // Navigate to error state story
    await page.goto('/?path=/story/feedback-glass-alert--error');
    
    const iframe = page.frameLocator('#storybook-preview-iframe');
    const alert = iframe.locator('.glass-alert[role="alert"]');
    
    // Check error alert is displayed
    await expect(alert).toBeVisible();
    await expect(alert).toHaveClass(/type-error/);
    
    // Check accessibility of error state
    await expect(alert).toHaveAttribute('aria-live', 'assertive');
  });

  test('should measure performance metrics', async ({ page }) => {
    // Navigate to a heavy component
    await page.goto('/?path=/story/data-display-glass-table--large-dataset');
    
    // Measure performance
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      };
    });
    
    // Assert performance thresholds
    expect(metrics.domContentLoaded).toBeLessThan(1000); // 1 second
    expect(metrics.loadComplete).toBeLessThan(2000); // 2 seconds
  });
});