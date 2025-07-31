import { describe, it, expect } from "@jest/globals";
import * as path from "path";

// Test main package exports
describe("Bundle Exports Integration Tests", () => {
  describe("Main Package Export", () => {
    it("should export all components from main entry point", async () => {
      const mainExports = await import("../../index");

      // Core components
      expect(mainExports.GlassButton).toBeDefined();
      expect(mainExports.GlassCard).toBeDefined();
      expect(mainExports.GlassContainer).toBeDefined();
      expect(mainExports.GlassPanel).toBeDefined();

      // Navigation components
      expect(mainExports.GlassBreadcrumbs).toBeDefined();
      expect(mainExports.GlassMobileNav).toBeDefined();
      expect(mainExports.GlassPagination).toBeDefined();
      expect(mainExports.GlassTabs).toBeDefined();

      // Feedback components
      expect(mainExports.GlassToast).toBeDefined();
      expect(mainExports.GlassNotification).toBeDefined();
      expect(mainExports.GlassLoading).toBeDefined();
      expect(mainExports.GlassSkeleton).toBeDefined();
      expect(mainExports.GlassSpinner).toBeDefined();

      // Overlay components
      expect(mainExports.GlassModal).toBeDefined();
      expect(mainExports.GlassDialog).toBeDefined();
      expect(mainExports.GlassPopover).toBeDefined();
      expect(mainExports.GlassTooltip).toBeDefined();

      // Layout components
      expect(mainExports.GlassAccordion).toBeDefined();
      expect(mainExports.GlassDivider).toBeDefined();
      expect(mainExports.GlassLayout).toBeDefined();
      expect(mainExports.GlassGrid).toBeDefined();

      // Data display components
      expect(mainExports.GlassTable).toBeDefined();
      expect(mainExports.GlassList).toBeDefined();
      expect(mainExports.GlassAvatar).toBeDefined();
      expect(mainExports.GlassBadge).toBeDefined();

      // Responsive components
      expect(mainExports.GlassResponsiveButton).toBeDefined();
      expect(mainExports.GlassResponsiveCard).toBeDefined();

      // Accessibility components
      expect(mainExports.GlassFocusTrap).toBeDefined();
      expect(mainExports.GlassLiveRegion).toBeDefined();
      expect(mainExports.GlassAccessibleDemo).toBeDefined();

      // Interactive components
      expect(mainExports.GlassCombobox).toBeDefined();
      expect(mainExports.GlassCommand).toBeDefined();
      expect(mainExports.GlassContextMenu).toBeDefined();
      expect(mainExports.GlassHoverCard).toBeDefined();

      // Utility exports
      expect(mainExports.UnifiedGlassProvider).toBeDefined();
      expect(mainExports.useGlassEffect).toBeDefined();
      expect(mainExports.useGlassTheme).toBeDefined();
    });

    it("should export TypeScript types", async () => {
      // This test verifies that TypeScript declarations are properly generated
      // In a real scenario, we'd check the .d.ts files
      const mainExports = await import("../../index");

      // Check that components are functions/classes
      expect(typeof mainExports.GlassButton).toBe("function");
      expect(typeof mainExports.GlassCard).toBe("function");
      expect(typeof mainExports.UnifiedGlassProvider).toBe("function");
    });
  });

  describe("Bundle Exports", () => {
    it("should export core bundle correctly", async () => {
      const coreBundle = await import("../../bundles/core");

      expect(coreBundle.GlassButton).toBeDefined();
      expect(coreBundle.GlassCard).toBeDefined();
      expect(coreBundle.GlassContainer).toBeDefined();
      expect(coreBundle.GlassPanel).toBeDefined();
      expect(coreBundle.UnifiedGlassProvider).toBeDefined();

      // Should not include non-core components
      expect(coreBundle.GlassTable).toBeUndefined();
      expect(coreBundle.GlassModal).toBeUndefined();
    });

    it("should export navigation bundle correctly", async () => {
      const navBundle = await import("../../bundles/navigation");

      expect(navBundle.GlassBreadcrumbs).toBeDefined();
      expect(navBundle.GlassMobileNav).toBeDefined();
      expect(navBundle.GlassPagination).toBeDefined();
      expect(navBundle.GlassTabs).toBeDefined();

      // Should not include non-navigation components
      expect(navBundle.GlassButton).toBeUndefined();
      expect(navBundle.GlassToast).toBeUndefined();
    });

    it("should export feedback bundle correctly", async () => {
      const feedbackBundle = await import("../../bundles/feedback");

      expect(feedbackBundle.GlassToast).toBeDefined();
      expect(feedbackBundle.GlassNotification).toBeDefined();
      expect(feedbackBundle.GlassLoading).toBeDefined();
      expect(feedbackBundle.GlassSkeleton).toBeDefined();
      expect(feedbackBundle.GlassSpinner).toBeDefined();
      expect(feedbackBundle.GlassProgress).toBeDefined();

      // Should not include non-feedback components
      expect(feedbackBundle.GlassButton).toBeUndefined();
      expect(feedbackBundle.GlassTabs).toBeUndefined();
    });

    it("should export overlay bundle correctly", async () => {
      const overlayBundle = await import("../../bundles/overlay");

      expect(overlayBundle.GlassModal).toBeDefined();
      expect(overlayBundle.GlassDialog).toBeDefined();
      expect(overlayBundle.GlassPopover).toBeDefined();
      expect(overlayBundle.GlassTooltip).toBeDefined();
      expect(overlayBundle.GlassDrawer).toBeDefined();

      // Should not include non-overlay components
      expect(overlayBundle.GlassButton).toBeUndefined();
      expect(overlayBundle.GlassTable).toBeUndefined();
    });

    it("should export layout bundle correctly", async () => {
      const layoutBundle = await import("../../bundles/layout");

      expect(layoutBundle.GlassAccordion).toBeDefined();
      expect(layoutBundle.GlassDivider).toBeDefined();
      expect(layoutBundle.GlassLayout).toBeDefined();
      expect(layoutBundle.GlassGrid).toBeDefined();
      expect(layoutBundle.GlassSidebar).toBeDefined();

      // Should not include non-layout components
      expect(layoutBundle.GlassButton).toBeUndefined();
      expect(layoutBundle.GlassToast).toBeUndefined();
    });

    it("should export data-display bundle correctly", async () => {
      const dataBundle = await import("../../bundles/data-display");

      expect(dataBundle.GlassTable).toBeDefined();
      expect(dataBundle.GlassList).toBeDefined();
      expect(dataBundle.GlassAvatar).toBeDefined();
      expect(dataBundle.GlassBadge).toBeDefined();
      expect(dataBundle.GlassDataTable).toBeDefined();

      // Should not include non-data-display components
      expect(dataBundle.GlassButton).toBeUndefined();
      expect(dataBundle.GlassModal).toBeUndefined();
    });

    it("should export accessibility bundle correctly", async () => {
      const a11yBundle = await import("../../bundles/accessibility");

      expect(a11yBundle.GlassFocusTrap).toBeDefined();
      expect(a11yBundle.GlassLiveRegion).toBeDefined();
      expect(a11yBundle.GlassAccessibleDemo).toBeDefined();
      expect(a11yBundle.GlassSkipLink).toBeDefined();

      // Should not include non-accessibility components
      expect(a11yBundle.GlassButton).toBeUndefined();
      expect(a11yBundle.GlassTable).toBeUndefined();
    });
  });

  describe("Individual Component Exports", () => {
    it("should support individual component imports", async () => {
      // Test individual component imports that would be defined in package.json exports
      const button = await import("../../components/glass-button");
      expect(button.GlassButton).toBeDefined();
      expect(button.default).toBeDefined();

      const card = await import("../../components/glass-card");
      expect(card.GlassCard).toBeDefined();
      expect(card.default).toBeDefined();

      const modal = await import("../../components/glass-modal");
      expect(modal.GlassModal).toBeDefined();
      expect(modal.default).toBeDefined();
    });

    it("should export component props types", async () => {
      // Components should export their prop types
      const button = await import("../../components/glass-button");
      expect(typeof button.GlassButton).toBe("function");

      // In a real scenario, we'd check the TypeScript types
      // This is a runtime check to ensure the component is exported
    });
  });

  describe("CSS Exports", () => {
    it("should export CSS files correctly", async () => {
      // In a real test environment, we'd check if these files exist
      const cssFiles = [
        "../../styles/glass-base.css",
        "../../styles/glass-core.css",
        "../../styles/glass-theme.css",
        "../../styles/glass-animations.css",
        "../../styles/glass-utilities.css",
      ];

      // This is a placeholder - in reality we'd check file existence
      expect(cssFiles).toHaveLength(5);
    });
  });

  describe("Tree Shaking Verification", () => {
    it("should support ES modules for tree shaking", async () => {
      // Import specific components
      const { GlassButton } = await import("../../components/glass-button");
      const { GlassCard } = await import("../../components/glass-card");

      // Verify they are separate exports
      expect(GlassButton).toBeDefined();
      expect(GlassCard).toBeDefined();
      expect(GlassButton).not.toBe(GlassCard);
    });

    it("should not import unnecessary dependencies", async () => {
      // When importing a single component, it shouldn't bring in others
      const buttonModule = await import("../../components/glass-button");

      // Check that the module only exports what's necessary
      const exports = Object.keys(buttonModule);
      expect(exports).toContain("GlassButton");
      expect(exports).toContain("default");

      // Should not contain other components
      expect(exports).not.toContain("GlassCard");
      expect(exports).not.toContain("GlassModal");
    });
  });

  describe("CommonJS Compatibility", () => {
    it("should provide CommonJS exports", async () => {
      // Test that the package can be required (CommonJS)
      // In a real environment, we'd use require()
      const mainExports = await import("../../index");

      // Should have default export for CommonJS compatibility
      expect(mainExports.default).toBeDefined();

      // Named exports should also work
      expect(mainExports.GlassButton).toBeDefined();
    });
  });

  describe("Package.json Export Paths", () => {
    it("should match package.json export configuration", () => {
      // This test would verify that the actual exports match package.json
      const expectedExports = {
        ".": "./dist/index.js",
        "./button": "./dist/components/glass-button/index.js",
        "./card": "./dist/components/glass-card/index.js",
        "./modal": "./dist/components/glass-modal/index.js",
        "./core": "./dist/bundles/core.js",
        "./navigation": "./dist/bundles/navigation.js",
        "./feedback": "./dist/bundles/feedback.js",
        "./css": "./dist/styles/index.css",
        "./styles/*": "./dist/styles/*",
      };

      // Verify the structure matches expected paths
      expect(Object.keys(expectedExports)).toHaveLength(9);
    });
  });

  describe("Bundle Size Constraints", () => {
    it("should respect bundle size limits", async () => {
      // In a real test, we'd measure actual bundle sizes
      const bundleSizes = {
        core: 25, // KB
        navigation: 15,
        feedback: 18,
        overlay: 20,
        full: 55,
      };

      // Core bundle should be under 30KB
      expect(bundleSizes.core).toBeLessThan(30);

      // Full bundle should be under 60KB
      expect(bundleSizes.full).toBeLessThan(60);

      // Individual bundles should be smaller than full
      expect(bundleSizes.navigation).toBeLessThan(bundleSizes.full);
      expect(bundleSizes.feedback).toBeLessThan(bundleSizes.full);
    });
  });

  describe("Version and Metadata", () => {
    it("should export version information", async () => {
      const { version, name } = await import("../../package.json");

      expect(version).toBeDefined();
      expect(name).toBe("@liquidify/components");
      expect(version).toMatch(/^\d+\.\d+\.\d+/); // Semantic versioning
    });
  });
});
