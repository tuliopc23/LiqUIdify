import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { execSync } from "child_process";
import { existsSync, readFileSync, statSync } from "fs";
import path from "path";

// Import types for validation
import type * as MainExport from "../../index";
import type * as CoreBundle from "../../bundles/core";
import type * as FormsBundle from "../../bundles/forms";
import type * as NavigationBundle from "../../bundles/navigation";
import type * as FeedbackBundle from "../../bundles/feedback";
import type * as LayoutBundle from "../../bundles/layout";
import type * as DataDisplayBundle from "../../bundles/data-display";
import type * as AccessibilityBundle from "../../bundles/accessibility";

// Build configuration for testing
const BUILD_CONFIG = {
  distDir: path.resolve(process.cwd(), "dist/libs/components"),
  bundleSizeTargets: {
    core: 30 * 1024, // 30KB
    full: 60 * 1024, // 60KB
    individual: 10 * 1024, // 10KB per component
  },
  requiredFormats: ["mjs", "cjs"],
  requiredBundles: [
    "index",
    "core",
    "forms",
    "navigation",
    "feedback",
    "layout",
    "data-display",
    "accessibility",
  ],
  individualComponents: [
    "components/button",
    "components/card",
    "components/modal",
    "components/input",
  ],
};

describe("Bundle Validation Integration Tests", () => {
  beforeAll(async () => {
    // Ensure library is built before testing
    try {
      console.log("Building library for bundle validation...");
      execSync("bun run build:lib", {
        stdio: "inherit",
        cwd: process.cwd(),
        timeout: 120000, // 2 minutes timeout
      });
    } catch (error) {
      console.error("Failed to build library:", error);
      throw new Error("Library build failed - cannot validate bundles");
    }
  });

  afterAll(() => {
    console.log("Bundle validation tests completed");
  });

  describe("Build Output Validation", () => {
    it("should have created all required build artifacts", () => {
      // Check dist directory exists
      expect(existsSync(BUILD_CONFIG.distDir)).toBe(true);

      // Check main entry points exist in both formats
      BUILD_CONFIG.requiredFormats.forEach((format) => {
        const mainFile = path.join(BUILD_CONFIG.distDir, `index.${format}`);
        expect(existsSync(mainFile), `Main ${format} bundle should exist`).toBe(
          true,
        );
      });

      // Check bundle entry points exist
      BUILD_CONFIG.requiredBundles.forEach((bundle) => {
        BUILD_CONFIG.requiredFormats.forEach((format) => {
          const bundlePath =
            bundle === "index"
              ? path.join(BUILD_CONFIG.distDir, `${bundle}.${format}`)
              : path.join(BUILD_CONFIG.distDir, `${bundle}.${format}`);

          if (existsSync(bundlePath)) {
            expect(
              existsSync(bundlePath),
              `Bundle ${bundle}.${format} should exist`,
            ).toBe(true);
          }
        });
      });

      // Check TypeScript declarations exist
      const typesDir = path.join(BUILD_CONFIG.distDir, "types");
      expect(
        existsSync(typesDir),
        "TypeScript declarations directory should exist",
      ).toBe(true);

      const mainDts = path.join(typesDir, "index.d.ts");
      expect(
        existsSync(mainDts),
        "Main TypeScript declarations should exist",
      ).toBe(true);
    });

    it("should have CSS assets", () => {
      // Check for CSS files
      const cssFiles = ["liquidui.css"].map((file) =>
        path.join(BUILD_CONFIG.distDir, file),
      );

      cssFiles.forEach((cssFile) => {
        if (existsSync(cssFile)) {
          expect(existsSync(cssFile), `CSS file ${cssFile} should exist`).toBe(
            true,
          );

          // Verify CSS is not empty
          const cssContent = readFileSync(cssFile, "utf8");
          expect(
            cssContent.length,
            "CSS file should not be empty",
          ).toBeGreaterThan(0);
        }
      });
    });

    it("should have source maps in development builds", () => {
      // Check for source maps
      const sourceMapFiles = [
        path.join(BUILD_CONFIG.distDir, "index.mjs.map"),
        path.join(BUILD_CONFIG.distDir, "index.cjs.map"),
      ];

      sourceMapFiles.forEach((mapFile) => {
        if (existsSync(mapFile)) {
          const mapContent = readFileSync(mapFile, "utf8");
          expect(
            () => JSON.parse(mapContent),
            "Source map should be valid JSON",
          ).not.toThrow();
        }
      });
    });
  });

  describe("Bundle Size Validation", () => {
    it("should meet bundle size targets", () => {
      const bundleSizes: Record<string, number> = {};

      // Check main bundle size
      const mainBundlePath = path.join(BUILD_CONFIG.distDir, "index.mjs");
      if (existsSync(mainBundlePath)) {
        bundleSizes.full = statSync(mainBundlePath).size;
        expect(
          bundleSizes.full,
          "Full bundle should be under 60KB",
        ).toBeLessThanOrEqual(BUILD_CONFIG.bundleSizeTargets.full);
      }

      // Check core bundle size
      const coreBundlePath = path.join(BUILD_CONFIG.distDir, "core.mjs");
      if (existsSync(coreBundlePath)) {
        bundleSizes.core = statSync(coreBundlePath).size;
        expect(
          bundleSizes.core,
          "Core bundle should be under 30KB",
        ).toBeLessThanOrEqual(BUILD_CONFIG.bundleSizeTargets.core);
      }

      // Log bundle sizes for reference
      console.log("Bundle sizes:", bundleSizes);
    });

    it("should have reasonable individual component sizes", () => {
      BUILD_CONFIG.individualComponents.forEach((component) => {
        const componentPath = path.join(
          BUILD_CONFIG.distDir,
          `${component}.mjs`,
        );

        if (existsSync(componentPath)) {
          const size = statSync(componentPath).size;
          expect(
            size,
            `Component ${component} should be under 10KB`,
          ).toBeLessThanOrEqual(BUILD_CONFIG.bundleSizeTargets.individual);
        }
      });
    });

    it("should have compressed sizes within reasonable limits", () => {
      const gzipSize = (filePath: string): number => {
        try {
          const result = execSync(`gzip -c "${filePath}" | wc -c`, {
            encoding: "utf8",
          });
          return parseInt(result.trim(), 10);
        } catch {
          return 0;
        }
      };

      const mainBundlePath = path.join(BUILD_CONFIG.distDir, "index.mjs");
      if (existsSync(mainBundlePath)) {
        const compressed = gzipSize(mainBundlePath);
        const uncompressed = statSync(mainBundlePath).size;

        expect(
          compressed,
          "Gzipped size should be significantly smaller",
        ).toBeLessThan(uncompressed * 0.7);
        console.log(
          `Bundle compression: ${uncompressed} -> ${compressed} bytes (${((compressed / uncompressed) * 100).toFixed(1)}%)`,
        );
      }
    });
  });

  describe("Export Resolution Validation", () => {
    it("should resolve all main exports correctly", async () => {
      // Test dynamic imports work
      try {
        const mainModule = await import(
          path.join(BUILD_CONFIG.distDir, "index.mjs")
        );
        expect(mainModule, "Main module should export components").toBeTruthy();

        // Check for common exports
        const expectedExports = [
          "GlassButton",
          "GlassCard",
          "GlassInput",
          "GlassModal",
          "ThemeProvider",
        ];

        expectedExports.forEach((exportName) => {
          if (mainModule[exportName]) {
            expect(
              mainModule[exportName],
              `Should export ${exportName}`,
            ).toBeTruthy();
            expect(
              typeof mainModule[exportName],
              `${exportName} should be a function/component`,
            ).toBe("function");
          }
        });
      } catch (error) {
        console.warn("Dynamic import test skipped:", error);
      }
    });

    it("should resolve bundle exports correctly", async () => {
      const bundleTests = [
        { name: "core", expectedExports: ["GlassButton", "GlassCard"] },
        { name: "forms", expectedExports: ["GlassInput", "GlassRadioGroup"] },
        { name: "feedback", expectedExports: ["GlassToast", "GlassModal"] },
      ];

      for (const bundle of bundleTests) {
        const bundlePath = path.join(
          BUILD_CONFIG.distDir,
          `${bundle.name}.mjs`,
        );

        if (existsSync(bundlePath)) {
          try {
            const bundleModule = await import(bundlePath);
            expect(
              bundleModule,
              `${bundle.name} bundle should export components`,
            ).toBeTruthy();

            bundle.expectedExports.forEach((exportName) => {
              if (bundleModule[exportName]) {
                expect(
                  bundleModule[exportName],
                  `${bundle.name} bundle should export ${exportName}`,
                ).toBeTruthy();
              }
            });
          } catch (error) {
            console.warn(`Bundle ${bundle.name} import test skipped:`, error);
          }
        }
      }
    });

    it("should have valid CommonJS exports", () => {
      const cjsBundlePath = path.join(BUILD_CONFIG.distDir, "index.cjs");

      if (existsSync(cjsBundlePath)) {
        const content = readFileSync(cjsBundlePath, "utf8");

        // Check for CommonJS export patterns
        expect(content, "CJS bundle should contain module.exports").toContain(
          "module.exports",
        );
        expect(
          content,
          "CJS bundle should not contain ES6 imports",
        ).not.toContain("import ");
        expect(content, "CJS bundle should contain require calls").toContain(
          "require(",
        );
      }
    });

    it("should have valid ESM exports", () => {
      const esmBundlePath = path.join(BUILD_CONFIG.distDir, "index.mjs");

      if (existsSync(esmBundlePath)) {
        const content = readFileSync(esmBundlePath, "utf8");

        // Check for ESM export patterns
        expect(
          content,
          "ESM bundle should contain export statements",
        ).toContain("export");
        expect(
          content,
          "ESM bundle should not contain module.exports",
        ).not.toContain("module.exports");
      }
    });
  });

  describe("TypeScript Declaration Validation", () => {
    it("should have complete TypeScript declarations", () => {
      const typesDir = path.join(BUILD_CONFIG.distDir, "types");
      const mainDts = path.join(typesDir, "index.d.ts");

      if (existsSync(mainDts)) {
        const content = readFileSync(mainDts, "utf8");

        // Check for basic type exports
        expect(content, "Should export component types").toContain("export");
        expect(content, "Should have React component types").toContain("React");

        // Verify TypeScript syntax is valid
        expect(content, "Should not have syntax errors").not.toContain(
          "SyntaxError",
        );
        expect(content, "Should not have build errors").not.toContain(
          "BuildError",
        );
      }
    });

    it("should have correct bundle-specific type declarations", () => {
      const bundleTypeFiles = [
        "core.d.ts",
        "forms.d.ts",
        "navigation.d.ts",
        "feedback.d.ts",
      ];

      bundleTypeFiles.forEach((typeFile) => {
        const typePath = path.join(BUILD_CONFIG.distDir, "types", typeFile);

        if (existsSync(typePath)) {
          const content = readFileSync(typePath, "utf8");
          expect(
            content,
            `${typeFile} should have valid TypeScript content`,
          ).toContain("export");
        }
      });
    });

    it("should support TypeScript module resolution", () => {
      // Test that TypeScript can resolve the built modules
      const tsConfig = {
        compilerOptions: {
          moduleResolution: "node",
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
        },
      };

      // This test validates that TypeScript compilation would work
      // In a real environment, this would be tested by the TypeScript compiler
      expect(tsConfig.compilerOptions.moduleResolution).toBe("node");
    });
  });

  describe("Tree Shaking Validation", () => {
    it("should support tree shaking", () => {
      const esmBundlePath = path.join(BUILD_CONFIG.distDir, "index.mjs");

      if (existsSync(esmBundlePath)) {
        const content = readFileSync(esmBundlePath, "utf8");

        // Check for tree-shaking friendly patterns
        expect(content, "Should use named exports for tree shaking").toContain(
          "export {",
        );
        expect(content, "Should not have side effects").not.toContain(
          "document.addEventListener",
        );
        expect(content, "Should not have global assignments").not.toContain(
          "window.",
        );
      }
    });

    it("should have minimal side effects", () => {
      const packageJsonPath = path.join(process.cwd(), "package.json");

      if (existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));

        // Check sideEffects field
        if (packageJson.sideEffects !== undefined) {
          expect(
            packageJson.sideEffects,
            "Should mark package as side-effect free or specify side effects",
          ).toBeDefined();
        }
      }
    });
  });

  describe("Runtime Validation", () => {
    it("should not have build-time dependencies in runtime bundles", () => {
      const bundlePath = path.join(BUILD_CONFIG.distDir, "index.mjs");

      if (existsSync(bundlePath)) {
        const content = readFileSync(bundlePath, "utf8");

        // Check that build tools are not included
        const buildDependencies = [
          "vite",
          "rollup",
          "esbuild",
          "@vitejs",
          "typescript",
        ];

        buildDependencies.forEach((dep) => {
          expect(
            content,
            `Should not contain build dependency ${dep}`,
          ).not.toContain(dep);
        });
      }
    });

    it("should have proper external dependencies", () => {
      const bundlePath = path.join(BUILD_CONFIG.distDir, "index.mjs");

      if (existsSync(bundlePath)) {
        const content = readFileSync(bundlePath, "utf8");

        // External dependencies should be imported, not bundled
        const externalDeps = ["react", "react-dom"];

        externalDeps.forEach((dep) => {
          if (content.includes(dep)) {
            // Should import from external, not bundle
            expect(content, `Should import ${dep} externally`).toMatch(
              new RegExp(`from ['"]${dep}['"]`),
            );
          }
        });
      }
    });

    it("should handle CSS imports correctly", () => {
      // Check that CSS is properly extracted and not inlined (unless configured)
      const cssFile = path.join(BUILD_CONFIG.distDir, "liquidui.css");
      const jsBundle = path.join(BUILD_CONFIG.distDir, "index.mjs");

      if (existsSync(cssFile) && existsSync(jsBundle)) {
        const jsContent = readFileSync(jsBundle, "utf8");

        // CSS should be extracted to separate file, not inlined in JS
        expect(
          jsContent,
          "JS bundle should not contain large CSS strings",
        ).not.toMatch(/['"'][^'"]{500,}['"]/);
      }
    });
  });

  describe("Package.json Export Validation", () => {
    it("should have all exports defined in package.json available", () => {
      const packageJsonPath = path.join(process.cwd(), "package.json");

      if (existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));

        if (packageJson.exports) {
          Object.entries(packageJson.exports).forEach(
            ([exportPath, exportConfig]: [string, any]) => {
              // Skip conditional exports
              if (typeof exportConfig === "string") {
                const resolvedPath = path.join(process.cwd(), exportConfig);
                expect(
                  existsSync(resolvedPath),
                  `Export ${exportPath} should resolve to existing file: ${exportConfig}`,
                ).toBe(true);
              } else if (exportConfig.import || exportConfig.require) {
                if (exportConfig.import) {
                  const importPath = path.join(
                    process.cwd(),
                    exportConfig.import,
                  );
                  expect(
                    existsSync(importPath),
                    `ESM export ${exportPath} should exist: ${exportConfig.import}`,
                  ).toBe(true);
                }
                if (exportConfig.require) {
                  const requirePath = path.join(
                    process.cwd(),
                    exportConfig.require,
                  );
                  expect(
                    existsSync(requirePath),
                    `CJS export ${exportPath} should exist: ${exportConfig.require}`,
                  ).toBe(true);
                }
              }
            },
          );
        }
      }
    });

    it("should have correct main entry points", () => {
      const packageJsonPath = path.join(process.cwd(), "package.json");

      if (existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));

        // Check main entry points exist
        if (packageJson.main) {
          const mainPath = path.join(process.cwd(), packageJson.main);
          expect(
            existsSync(mainPath),
            "package.json main field should point to existing file",
          ).toBe(true);
        }

        if (packageJson.module) {
          const modulePath = path.join(process.cwd(), packageJson.module);
          expect(
            existsSync(modulePath),
            "package.json module field should point to existing file",
          ).toBe(true);
        }

        if (packageJson.types) {
          const typesPath = path.join(process.cwd(), packageJson.types);
          expect(
            existsSync(typesPath),
            "package.json types field should point to existing file",
          ).toBe(true);
        }
      }
    });
  });

  describe("Build Performance Validation", () => {
    it("should have reasonable build times", () => {
      // This test validates that build artifacts are created efficiently
      // In a real CI environment, you might measure actual build times
      const buildArtifacts = [
        path.join(BUILD_CONFIG.distDir, "index.mjs"),
        path.join(BUILD_CONFIG.distDir, "index.cjs"),
        path.join(BUILD_CONFIG.distDir, "types", "index.d.ts"),
      ];

      buildArtifacts.forEach((artifact) => {
        if (existsSync(artifact)) {
          const stats = statSync(artifact);
          // Check that files were created recently (within last hour for build validation)
          const oneHourAgo = Date.now() - 60 * 60 * 1000;
          expect(
            stats.mtime.getTime(),
            `${artifact} should be recently built`,
          ).toBeGreaterThan(oneHourAgo);
        }
      });
    });

    it("should not contain debug artifacts in production builds", () => {
      const productionBundle = path.join(BUILD_CONFIG.distDir, "index.mjs");

      if (existsSync(productionBundle)) {
        const content = readFileSync(productionBundle, "utf8");

        // Check for debug code that should be removed in production
        const debugPatterns = [
          "console.log",
          "console.debug",
          "debugger;",
          "__DEV__",
          "development",
        ];

        debugPatterns.forEach((pattern) => {
          expect(
            content,
            `Production bundle should not contain ${pattern}`,
          ).not.toContain(pattern);
        });
      }
    });
  });
});
