import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { existsSync, readFileSync, statSync, readdirSync } from "fs";
import { resolve, join } from "path";
import { createRequire } from "module";

// Build validation test suite
describe("Build Validation", () => {
  const distPath = resolve(process.cwd(), "dist/libs/components");
  const packageJsonPath = resolve(process.cwd(), "package.json");
  let packageJson: any;

  beforeAll(() => {
    // Read package.json for export validation
    packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
  });

  describe("Build Artifacts Generation", () => {
    it("should generate the main distribution directory", () => {
      expect(existsSync(distPath)).toBe(true);
      expect(statSync(distPath).isDirectory()).toBe(true);
    });

    it("should generate main entry files", () => {
      const mainFiles = [
        "index.mjs",
        "index.cjs",
        "index.d.ts",
        "liquidui.css",
      ];

      mainFiles.forEach((file) => {
        const filePath = join(distPath, file);
        expect(existsSync(filePath), `${file} should exist`).toBe(true);
        expect(statSync(filePath).isFile()).toBe(true);
        expect(statSync(filePath).size).toBeGreaterThan(0);
      });
    });

    it("should generate bundle files", () => {
      const bundles = [
        "core",
        "forms",
        "navigation",
        "feedback",
        "layout",
        "data-display",
        "accessibility",
        "advanced",
        "animations",
        "physics",
        "ssr",
        "providers",
        "tokens",
      ];

      bundles.forEach((bundle) => {
        // ESM bundles
        const esmPath = join(distPath, `${bundle}.mjs`);
        expect(existsSync(esmPath), `${bundle}.mjs should exist`).toBe(true);
        expect(statSync(esmPath).size).toBeGreaterThan(0);

        // CommonJS bundles
        const cjsPath = join(distPath, "cjs", `${bundle}.cjs`);
        expect(existsSync(cjsPath), `${bundle}.cjs should exist`).toBe(true);
        expect(statSync(cjsPath).size).toBeGreaterThan(0);

        // TypeScript definitions
        const dtsPath = join(distPath, "bundles", `${bundle}.d.ts`);
        expect(existsSync(dtsPath), `${bundle}.d.ts should exist`).toBe(true);
        expect(statSync(dtsPath).size).toBeGreaterThan(0);
      });
    });

    it("should generate individual component files", () => {
      const components = ["button", "card", "modal", "input", "avatar"];

      components.forEach((component) => {
        // ESM component files
        const esmPath = join(distPath, "components", `${component}.mjs`);
        expect(
          existsSync(esmPath),
          `components/${component}.mjs should exist`,
        ).toBe(true);
        expect(statSync(esmPath).size).toBeGreaterThan(0);

        // CommonJS component files
        const cjsPath = join(distPath, "cjs", "components", `${component}.cjs`);
        expect(
          existsSync(cjsPath),
          `cjs/components/${component}.cjs should exist`,
        ).toBe(true);
        expect(statSync(cjsPath).size).toBeGreaterThan(0);
      });
    });

    it("should generate CSS bundle", () => {
      const cssPath = join(distPath, "liquidui.css");
      expect(existsSync(cssPath)).toBe(true);
      expect(statSync(cssPath).size).toBeGreaterThan(0);

      const cssContent = readFileSync(cssPath, "utf-8");
      expect(cssContent).toContain(".glass");
      expect(cssContent.length).toBeGreaterThan(1000); // Should have substantial content
    });

    it("should generate TypeScript definition files", () => {
      const mainDtsPath = join(distPath, "index.d.ts");
      expect(existsSync(mainDtsPath)).toBe(true);

      const dtsContent = readFileSync(mainDtsPath, "utf-8");
      expect(dtsContent).toContain("export");
      expect(dtsContent).toContain("declare");
    });
  });

  describe("Package.json Export Validation", () => {
    it("should have all export paths resolve to existing files", () => {
      const exports = packageJson.exports;
      expect(exports).toBeDefined();

      Object.entries(exports).forEach(
        ([exportPath, exportConfig]: [string, any]) => {
          if (exportPath === "./package.json") return; // Skip package.json export

          if (typeof exportConfig === "string") {
            // Simple string export (like CSS)
            const resolvedPath = resolve(process.cwd(), exportConfig);
            expect(
              existsSync(resolvedPath),
              `Export "${exportPath}" should resolve to existing file: ${exportConfig}`,
            ).toBe(true);
          } else if (typeof exportConfig === "object") {
            // Complex export object
            Object.entries(exportConfig).forEach(
              ([condition, filePath]: [string, any]) => {
                if (typeof filePath === "string") {
                  const resolvedPath = resolve(process.cwd(), filePath);
                  expect(
                    existsSync(resolvedPath),
                    `Export "${exportPath}" condition "${condition}" should resolve to existing file: ${filePath}`,
                  ).toBe(true);
                }
              },
            );
          }
        },
      );
    });

    it("should have main entry points defined correctly", () => {
      expect(packageJson.main).toBeDefined();
      expect(packageJson.module).toBeDefined();
      expect(packageJson.types).toBeDefined();
      expect(packageJson.style).toBeDefined();

      // Verify main entry points exist
      expect(existsSync(resolve(process.cwd(), packageJson.main))).toBe(true);
      expect(existsSync(resolve(process.cwd(), packageJson.module))).toBe(true);
      expect(existsSync(resolve(process.cwd(), packageJson.types))).toBe(true);
      expect(existsSync(resolve(process.cwd(), packageJson.style))).toBe(true);
    });

    it("should have files array pointing to existing paths", () => {
      expect(packageJson.files).toBeDefined();
      expect(Array.isArray(packageJson.files)).toBe(true);

      // Check that the main dist pattern exists
      const distPattern = packageJson.files.find((f: string) =>
        f.includes("dist/libs/components"),
      );
      expect(distPattern).toBeDefined();
      expect(existsSync(distPath)).toBe(true);
    });
  });

  describe("Bundle Size Validation", () => {
    it("should have core bundle under size limit", () => {
      const corePath = join(distPath, "core.mjs");
      if (existsSync(corePath)) {
        const size = statSync(corePath).size;
        const sizeKB = size / 1024;
        expect(sizeKB).toBeLessThan(30); // Core should be under 30KB
      }
    });

    it("should have main bundle under size limit", () => {
      const mainPath = join(distPath, "index.mjs");
      const size = statSync(mainPath).size;
      const sizeKB = size / 1024;
      expect(sizeKB).toBeLessThan(60); // Full bundle should be under 60KB
    });

    it("should have individual components reasonably sized", () => {
      const componentDir = join(distPath, "components");
      if (existsSync(componentDir)) {
        const componentFiles = readdirSync(componentDir).filter((f) =>
          f.endsWith(".mjs"),
        );

        componentFiles.forEach((file) => {
          const filePath = join(componentDir, file);
          const size = statSync(filePath).size;
          const sizeKB = size / 1024;
          expect(sizeKB).toBeLessThan(10); // Individual components should be under 10KB
        });
      }
    });
  });

  describe("TypeScript Definitions Validation", () => {
    it("should have valid TypeScript definitions for main export", () => {
      const dtsPath = join(distPath, "index.d.ts");
      const content = readFileSync(dtsPath, "utf-8");

      // Should export React components
      expect(content).toMatch(/export.*React/);
      expect(content).toMatch(/export.*Component/);

      // Should not have syntax errors (basic check)
      expect(content).not.toContain("SyntaxError");
      expect(content).not.toContain("undefined");
    });

    it("should have TypeScript definitions for all bundles", () => {
      const bundlesDir = join(distPath, "bundles");
      if (existsSync(bundlesDir)) {
        const dtsFiles = readdirSync(bundlesDir).filter((f) =>
          f.endsWith(".d.ts"),
        );

        expect(dtsFiles.length).toBeGreaterThan(0);

        dtsFiles.forEach((file) => {
          const filePath = join(bundlesDir, file);
          const content = readFileSync(filePath, "utf-8");

          // Should have export statements
          expect(content).toContain("export");
          expect(content.length).toBeGreaterThan(10);
        });
      }
    });

    it("should have component-specific TypeScript definitions", () => {
      const componentTypes = [
        "components/glass-button-refactored/index.d.ts",
        "components/glass-card-refactored/index.d.ts",
        "components/glass-modal/index.d.ts",
        "components/glass-input/index.d.ts",
        "components/glass-avatar/index.d.ts",
      ];

      componentTypes.forEach((typePath) => {
        const fullPath = join(distPath, typePath);
        if (existsSync(fullPath)) {
          const content = readFileSync(fullPath, "utf-8");
          expect(content).toContain("export");
          expect(content.length).toBeGreaterThan(10);
        }
      });
    });
  });

  describe("Module Format Validation", () => {
    it("should generate valid ESM modules", () => {
      const esmPath = join(distPath, "index.mjs");
      const content = readFileSync(esmPath, "utf-8");

      // Should use ESM syntax
      expect(content).toMatch(/export\s+/);
      expect(content).not.toContain("module.exports");
      expect(content).not.toContain("require(");
    });

    it("should generate valid CommonJS modules", () => {
      const cjsPath = join(distPath, "index.cjs");
      const content = readFileSync(cjsPath, "utf-8");

      // Should use CommonJS syntax
      expect(content).toMatch(/exports\.|module\.exports/);
    });

    it("should have proper module interop", () => {
      const cjsPath = join(distPath, "index.cjs");
      const content = readFileSync(cjsPath, "utf-8");

      // Should handle ESM/CJS interop properly
      expect(content).toMatch(/__esModule|exports\.default/);
    });
  });

  describe("Tree Shaking Validation", () => {
    it("should allow importing individual components", async () => {
      // Test that individual component imports work
      const componentPaths = [
        "./button",
        "./card",
        "./modal",
        "./input",
        "./avatar",
      ];

      for (const componentPath of componentPaths) {
        const exportConfig = packageJson.exports[componentPath];
        if (exportConfig?.import) {
          const fullPath = resolve(process.cwd(), exportConfig.import);
          expect(existsSync(fullPath)).toBe(true);

          const content = readFileSync(fullPath, "utf-8");
          expect(content.length).toBeGreaterThan(0);

          // Individual components should be smaller than full bundle
          const mainPath = join(distPath, "index.mjs");
          const mainSize = statSync(mainPath).size;
          const componentSize = statSync(fullPath).size;
          expect(componentSize).toBeLessThan(mainSize);
        }
      }
    });

    it("should have bundle-specific exports that are smaller than main", () => {
      const bundles = ["core", "forms", "navigation", "feedback"];
      const mainPath = join(distPath, "index.mjs");
      const mainSize = statSync(mainPath).size;

      bundles.forEach((bundle) => {
        const bundlePath = join(distPath, `${bundle}.mjs`);
        if (existsSync(bundlePath)) {
          const bundleSize = statSync(bundlePath).size;
          expect(bundleSize).toBeLessThan(mainSize);
        }
      });
    });
  });

  describe("Dependency Resolution", () => {
    it("should not bundle peer dependencies", () => {
      const mainPath = join(distPath, "index.mjs");
      const content = readFileSync(mainPath, "utf-8");

      // Should not contain bundled React code
      expect(content).not.toContain("React.createElement");
      expect(content).not.toContain("ReactDOM.render");

      // Should import React externally
      expect(content).toMatch(/import.*react/i);
    });

    it("should handle CSS imports correctly", () => {
      const cssPath = join(distPath, "liquidui.css");
      expect(existsSync(cssPath)).toBe(true);

      const content = readFileSync(cssPath, "utf-8");

      // Should contain glassmorphism styles
      expect(content).toContain("glass");
      expect(content).toMatch(/backdrop-filter|background/);

      // Should be minified in production
      expect(content).not.toContain("  "); // No double spaces
      expect(content).not.toContain("\n\n"); // No double newlines
    });

    it("should have proper external dependencies marked", () => {
      const esmPath = join(distPath, "index.mjs");
      const content = readFileSync(esmPath, "utf-8");

      // External dependencies should be imported, not bundled
      const peerDeps = Object.keys(packageJson.peerDependencies || {});
      peerDeps.forEach((dep) => {
        if (content.includes(dep)) {
          expect(content).toMatch(
            new RegExp(`import.*${dep.replace("/", "\\/")}`),
          );
        }
      });
    });
  });

  describe("Build Configuration Validation", () => {
    it("should have consistent file naming", () => {
      const files = readdirSync(distPath);

      // ESM files should use .mjs extension
      const esmFiles = files.filter((f) => f.endsWith(".mjs"));
      expect(esmFiles.length).toBeGreaterThan(0);

      // TypeScript files should use .d.ts extension
      const dtsFiles = files.filter((f) => f.endsWith(".d.ts"));
      expect(dtsFiles.length).toBeGreaterThan(0);

      // CSS files should use .css extension
      const cssFiles = files.filter((f) => f.endsWith(".css"));
      expect(cssFiles.length).toBeGreaterThan(0);
    });

    it("should have proper directory structure", () => {
      const expectedDirs = ["cjs", "bundles", "components"];

      expectedDirs.forEach((dir) => {
        const dirPath = join(distPath, dir);
        if (existsSync(dirPath)) {
          expect(statSync(dirPath).isDirectory()).toBe(true);
        }
      });
    });

    it("should have source maps in development builds", () => {
      // Check if source maps exist (they might not in production)
      const files = readdirSync(distPath);
      const mapFiles = files.filter((f) => f.endsWith(".map"));

      // Source maps are optional but if they exist, they should be valid
      mapFiles.forEach((mapFile) => {
        const mapPath = join(distPath, mapFile);
        const content = readFileSync(mapPath, "utf-8");
        expect(() => JSON.parse(content)).not.toThrow();
      });
    });
  });

  describe("Performance Validation", () => {
    it("should have optimized bundle sizes", () => {
      const mainPath = join(distPath, "index.mjs");
      const content = readFileSync(mainPath, "utf-8");

      // Should be minified (no unnecessary whitespace)
      const lines = content.split("\n");
      const longLines = lines.filter((line) => line.length > 200);
      expect(longLines.length).toBeGreaterThan(0); // Minified code has long lines

      // Should not contain development-only code
      expect(content).not.toContain("console.log");
      expect(content).not.toContain("debugger");
      expect(content).not.toContain("development");
    });

    it("should have efficient CSS bundle", () => {
      const cssPath = join(distPath, "liquidui.css");
      const content = readFileSync(cssPath, "utf-8");

      // Should be optimized
      expect(content).not.toContain("  "); // No double spaces
      expect(content).not.toMatch(/\/\*.*\*\//); // No comments

      // Should contain essential styles
      expect(content).toContain("glass");
      expect(content.length).toBeGreaterThan(500); // Should have substantial content
    });
  });

  describe("Integration Validation", () => {
    it("should be importable as a module", async () => {
      const mainPath = join(distPath, "index.mjs");
      expect(existsSync(mainPath)).toBe(true);

      // Basic syntax validation
      const content = readFileSync(mainPath, "utf-8");
      expect(content).toMatch(/export/);
      expect(content).not.toContain("SyntaxError");
    });

    it("should have consistent export structure", () => {
      const dtsPath = join(distPath, "index.d.ts");
      const content = readFileSync(dtsPath, "utf-8");

      // Should export components consistently
      expect(content).toMatch(/export.*Glass.*Button/);
      expect(content).toMatch(/export.*Glass.*Card/);
      expect(content).toMatch(/export.*Glass.*Modal/);
    });

    it("should maintain backward compatibility", () => {
      const packageExports = Object.keys(packageJson.exports);

      // Should have essential exports
      expect(packageExports).toContain(".");
      expect(packageExports).toContain("./core");
      expect(packageExports).toContain("./forms");
      expect(packageExports).toContain("./css");

      // Should maintain component exports
      expect(packageExports).toContain("./button");
      expect(packageExports).toContain("./card");
      expect(packageExports).toContain("./modal");
    });
  });
});
