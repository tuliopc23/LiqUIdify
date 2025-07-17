import { test, expect } from '@playwright/test';
import { percySnapshot } from '@percy/playwright';

test.describe('GlassButton Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-glass-button--default&viewMode=story');
  });

  test('default state - desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForLoadState('networkidle');
    await percySnapshot(page, 'GlassButton - Default - Desktop');
  });

  test('hover state - desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const button = page.locator('button').first();
    await button.hover();
    await page.waitForTimeout(300);
    await percySnapshot(page, 'GlassButton - Hover - Desktop');
  });

  test('focus state - desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const button = page.locator('button').first();
    await button.focus();
    await page.waitForTimeout(300);
    await percySnapshot(page, 'GlassButton - Focus - Desktop');
  });

  test('mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');
    await percySnapshot(page, 'GlassButton - Mobile Responsive');
  });

  test('tablet responsive', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForLoadState('networkidle');
    await percySnapshot(page, 'GlassButton - Tablet Responsive');
  });

  test('disabled state', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-glass-button--disabled&viewMode=story');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForLoadState('networkidle');
    await percySnapshot(page, 'GlassButton - Disabled State');
  });

  test('loading state', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-glass-button--loading&viewMode=story');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForLoadState('networkidle');
    await percySnapshot(page, 'GlassButton - Loading State');
  });
});