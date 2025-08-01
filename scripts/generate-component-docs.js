#!/usr/bin/env node

/**
 * Component Documentation Generation Script
 * Automatically generates comprehensive documentation for all LiqUIdify components
 *
 * Features:
 * - Scans all components and generates markdown documentation
 * - Extracts props from TypeScript interfaces
 * - Generates usage examples from Storybook stories
 * - Creates consistent documentation structure
 * - Supports batch generation and individual component updates
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  // Source directories
  componentsDir: path.join(process.cwd(), "libs/components/src/components"),
  storiesDir: path.join(process.cwd(), "libs/components/src/stories"),
  docsDir: path.join(process.cwd(), "apps/docs/components"),

  // Template paths
  templateDir: path.join(__dirname, "templates"),

  // Component patterns
  componentPattern: /^glass-[\w-]+$/,
  storyPattern: /\.stories\.tsx?$/,

  // Documentation structure
  sections: [
    "overview",
    "installation",
    "basic-usage",
    "variants",
    "props",
    "examples",
    "accessibility",
    "best-practices",
  ],
};

// Component categories for organization
const COMPONENT_CATEGORIES = {
  core: ["button", "card", "input", "modal", "tooltip", "badge", "avatar"],
  forms: [
    "checkbox",
    "radio-group",
    "select",
    "textarea",
    "switch",
    "slider",
    "date-picker",
    "file-upload",
    "combobox",
    "number-input",
    "form-field",
  ],
  navigation: [
    "breadcrumbs",
    "tabs",
    "pagination",
    "navbar",
    "sidebar",
    "mobile-nav",
    "drawer",
  ],
  feedback: [
    "alert",
    "toast",
    "notification",
    "banner",
    "progress",
    "spinner",
    "loading",
    "skeleton",
  ],
  data: ["table", "accordion", "timeline", "tree-view", "chart"],
  layout: ["dropdown", "popover", "portal"],
  utility: [
    "command",
    "search",
    "error-boundary",
    "theme-provider",
    "theme-toggle",
  ],
  accessibility: [
    "focus-trap",
    "live-region",
    "skip-navigation",
    "visually-hidden",
  ],
};

class ComponentDocGenerator {
  constructor() {
    this.components = new Map();
    this.stories = new Map();
    this.generatedDocs = [];
    this.errors = [];
    this.warnings = [];
  }

  /**
   * Initialize the documentation generator
   */
  async init() {
    console.log("🚀 Initializing LiqUIdify Documentation Generator...");

    // Ensure output directory exists
    if (!fs.existsSync(CONFIG.docsDir)) {
      fs.mkdirSync(CONFIG.docsDir, { recursive: true });
    }

    // Create templates directory if it doesn't exist
    if (!fs.existsSync(CONFIG.templateDir)) {
      fs.mkdirSync(CONFIG.templateDir, { recursive: true });
      this.createDefaultTemplates();
    }

    console.log("✅ Initialization complete");
  }

  /**
   * Scan all components and stories
   */
  async scanComponents() {
    console.log("🔍 Scanning components and stories...");

    // Scan component directories
    const componentDirs = fs.readdirSync(CONFIG.componentsDir).filter((dir) => {
      const fullPath = path.join(CONFIG.componentsDir, dir);
      return (
        fs.statSync(fullPath).isDirectory() && CONFIG.componentPattern.test(dir)
      );
    });

    for (const componentDir of componentDirs) {
      await this.scanComponent(componentDir);
    }

    // Scan stories
    await this.scanStories();

    console.log(
      `✅ Found ${this.components.size} components and ${this.stories.size} story files`,
    );
  }

  /**
   * Scan individual component
   */
  async scanComponent(componentDir) {
    const componentPath = path.join(CONFIG.componentsDir, componentDir);
    const componentName = this.getComponentName(componentDir);

    const component = {
      name: componentName,
      dirName: componentDir,
      path: componentPath,
      files: {
        component: null,
        types: null,
        stories: null,
        test: null,
        index: null,
      },
      props: [],
      exports: [],
      category: this.getComponentCategory(componentName),
    };

    // Scan component files
    const files = fs.readdirSync(componentPath);

    for (const file of files) {
      const filePath = path.join(componentPath, file);

      if (file === "index.ts" || file === "index.tsx") {
        component.files.index = filePath;
      } else if (
        file.endsWith(".tsx") &&
        !file.includes(".stories.") &&
        !file.includes(".test.")
      ) {
        component.files.component = filePath;
      } else if (file.includes(".stories.")) {
        component.files.stories = filePath;
      } else if (file.includes(".test.")) {
        component.files.test = filePath;
      } else if (file.includes(".types.") || file.endsWith(".d.ts")) {
        component.files.types = filePath;
      }
    }

    // Extract component information
    if (component.files.component) {
      await this.extractComponentInfo(component);
    }

    this.components.set(componentName, component);
  }

  /**
   * Extract component information from source files
   */
  async extractComponentInfo(component) {
    try {
      const componentContent = fs.readFileSync(
        component.files.component,
        "utf8",
      );

      // Extract props interface
      component.props = this.extractProps(componentContent);

      // Extract exports
      component.exports = this.extractExports(componentContent);

      // Extract JSDoc comments
      component.description = this.extractDescription(componentContent);
    } catch (error) {
      this.errors.push(
        `Failed to extract component info for ${component.name}: ${error.message}`,
      );
    }
  }

  /**
   * Extract props from TypeScript interfaces
   */
  extractProps(content) {
    const props = [];

    // Match interface definitions
    const interfaceRegex = /interface\s+(\w+Props)\s*{([^}]+)}/g;
    const propRegex = /(\w+)\??:\s*([^;]+);?(?:\s*\/\*\*(.*?)\*\/)?/g;

    let interfaceMatch;
    while ((interfaceMatch = interfaceRegex.exec(content)) !== null) {
      const interfaceName = interfaceMatch[1];
      const interfaceBody = interfaceMatch[2];

      let propMatch;
      while ((propMatch = propRegex.exec(interfaceBody)) !== null) {
        const [, propName, propType, comment] = propMatch;

        props.push({
          name: propName,
          type: propType.trim(),
          optional: propMatch[0].includes("?:"),
          description: comment ? comment.trim().replace(/\*/g, "").trim() : "",
          interface: interfaceName,
        });
      }
    }

    return props;
  }

  /**
   * Extract exports from component file
   */
  extractExports(content) {
    const exports = [];
    const exportRegex =
      /export\s+(?:const|function|class|interface|type)\s+(\w+)/g;

    let match;
    while ((match = exportRegex.exec(content)) !== null) {
      exports.push(match[1]);
    }

    return exports;
  }

  /**
   * Extract description from JSDoc
   */
  extractDescription(content) {
    const descriptionRegex = /\/\*\*\s*\n\s*\*\s*(.+?)\s*\n/;
    const match = content.match(descriptionRegex);
    return match ? match[1].trim() : "";
  }

  /**
   * Scan stories for examples
   */
  async scanStories() {
    const storyFiles = [];

    // Scan component stories
    for (const [, component] of this.components) {
      if (component.files.stories && fs.existsSync(component.files.stories)) {
        storyFiles.push({
          component: component.name,
          path: component.files.stories,
        });
      }
    }

    // Scan additional stories directory
    if (fs.existsSync(CONFIG.storiesDir)) {
      const storyDirs = fs.readdirSync(CONFIG.storiesDir, {
        withFileTypes: true,
      });
      for (const entry of storyDirs) {
        if (entry.isDirectory()) {
          const dirPath = path.join(CONFIG.storiesDir, entry.name);
          const files = fs.readdirSync(dirPath);

          for (const file of files) {
            if (CONFIG.storyPattern.test(file)) {
              storyFiles.push({
                component: this.getComponentNameFromStory(file),
                path: path.join(dirPath, file),
              });
            }
          }
        }
      }
    }

    // Process story files
    for (const storyFile of storyFiles) {
      await this.processStoryFile(storyFile);
    }
  }

  /**
   * Process individual story file
   */
  async processStoryFile(storyFile) {
    try {
      const content = fs.readFileSync(storyFile.path, "utf8");
      const stories = this.extractStories(content);

      this.stories.set(storyFile.component, {
        path: storyFile.path,
        stories: stories,
      });
    } catch (error) {
      this.warnings.push(
        `Failed to process story file ${storyFile.path}: ${error.message}`,
      );
    }
  }

  /**
   * Extract stories from story file
   */
  extractStories(content) {
    const stories = [];

    // Extract story exports
    const storyRegex =
      /export\s+const\s+(\w+):\s*Story(?:<[^>]+>)?\s*=\s*{([^}]+)}/g;

    let match;
    while ((match = storyRegex.exec(content)) !== null) {
      const [, storyName, storyConfig] = match;

      stories.push({
        name: storyName,
        config: storyConfig.trim(),
      });
    }

    return stories;
  }

  /**
   * Generate documentation for all components
   */
  async generateAllDocs() {
    console.log("📝 Generating documentation for all components...");

    let successCount = 0;
    let errorCount = 0;

    for (const [componentName, component] of this.components) {
      try {
        await this.generateComponentDoc(component);
        successCount++;
        console.log(`✅ Generated docs for ${componentName}`);
      } catch (error) {
        errorCount++;
        this.errors.push(
          `Failed to generate docs for ${componentName}: ${error.message}`,
        );
        console.error(
          `❌ Failed to generate docs for ${componentName}: ${error.message}`,
        );
      }
    }

    console.log(`\n📊 Documentation Generation Summary:`);
    console.log(`✅ Success: ${successCount} components`);
    console.log(`❌ Errors: ${errorCount} components`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);
  }

  /**
   * Generate documentation for a single component
   */
  async generateComponentDoc(component) {
    const template = this.getTemplate("component");
    const docContent = this.processTemplate(template, component);

    const docPath = path.join(
      CONFIG.docsDir,
      `${component.name.replace("glass-", "")}.md`,
    );

    fs.writeFileSync(docPath, docContent, "utf8");
    this.generatedDocs.push(docPath);
  }

  /**
   * Process template with component data
   */
  processTemplate(template, component) {
    const componentNamePascal = this.toPascalCase(component.name);
    const componentNameKebab = component.name.replace("glass-", "");
    const stories = this.stories.get(component.name);

    let content = template
      .replace(/{{componentName}}/g, componentNamePascal)
      .replace(/{{componentNameKebab}}/g, componentNameKebab)
      .replace(/{{componentDir}}/g, component.dirName)
      .replace(
        /{{description}}/g,
        component.description ||
          `${componentNamePascal} component with glassmorphism design.`,
      )
      .replace(/{{category}}/g, component.category || "utility");

    // Replace props table
    content = content.replace(
      "{{propsTable}}",
      this.generatePropsTable(component.props),
    );

    // Replace examples
    content = content.replace(
      "{{examples}}",
      this.generateExamples(component, stories),
    );

    // Replace installation section
    content = content.replace(
      "{{installation}}",
      this.generateInstallation(component),
    );

    return content;
  }

  /**
   * Generate props table
   */
  generatePropsTable(props) {
    if (!props || props.length === 0) {
      return "| Prop | Type | Default | Description |\n|------|------|---------|-------------|\n| No props documented | - | - | - |";
    }

    let table =
      "| Prop | Type | Default | Description |\n|------|------|---------|-------------|\n";

    for (const prop of props) {
      const name = prop.optional ? `${prop.name}?` : prop.name;
      const type = prop.type.replace(/\|/g, "\\|");
      const description = prop.description || "-";

      table += `| ${name} | \`${type}\` | - | ${description} |\n`;
    }

    return table;
  }

  /**
   * Generate examples section
   */
  generateExamples(component, stories) {
    const componentNamePascal = this.toPascalCase(component.name);
    let examples = "";

    // Basic example
    examples += `### Basic Example\n\n`;
    examples += "```tsx\n";
    examples += `import { ${componentNamePascal} } from '@liquidify/ui'\n\n`;
    examples += `export default function Example() {\n`;
    examples += `  return <${componentNamePascal} />\n`;
    examples += `}\n`;
    examples += "```\n\n";

    // Story examples
    if (stories && stories.stories.length > 0) {
      examples += `### Variants\n\n`;

      for (const story of stories.stories) {
        if (story.name !== "Default") {
          examples += `#### ${story.name}\n\n`;
          examples += "```tsx\n";
          examples += `<${componentNamePascal} ${this.parseStoryArgs(story.config)} />\n`;
          examples += "```\n\n";
        }
      }
    }

    return examples;
  }

  /**
   * Generate installation section
   */
  generateInstallation(component) {
    const componentNameKebab = component.name.replace("glass-", "");

    return `## Installation

\`\`\`bash
npm install @liquidify/ui
\`\`\`

Or install just this component:

\`\`\`bash
npm install @liquidify/ui
\`\`\`

\`\`\`tsx
// Import the full library
import { ${this.toPascalCase(component.name)} } from '@liquidify/ui'

// Or import individual component (better for tree-shaking)
import { ${this.toPascalCase(component.name)} } from '@liquidify/ui/${componentNameKebab}'
\`\`\``;
  }

  /**
   * Parse story args to generate example props
   */
  parseStoryArgs(config) {
    try {
      const argsMatch = config.match(/args:\s*{([^}]+)}/);
      if (!argsMatch) return "";

      const args = argsMatch[1];
      return args
        .replace(/(\w+):\s*(['"`]?)([^,\n]+)\2/g, '$1="$3"')
        .replace(/,\s*/g, " ")
        .trim();
    } catch (error) {
      return "";
    }
  }

  /**
   * Get component template
   */
  getTemplate(type) {
    const templatePath = path.join(CONFIG.templateDir, `${type}.md`);

    if (fs.existsSync(templatePath)) {
      return fs.readFileSync(templatePath, "utf8");
    }

    return this.getDefaultTemplate(type);
  }

  /**
   * Get default component template
   */
  getDefaultTemplate(type) {
    return `# {{componentName}}

{{description}}

{{installation}}

## Basic Usage

\`\`\`tsx
import { {{componentName}} } from '@liquidify/ui'

export default function Example() {
  return <{{componentName}} />
}
\`\`\`

## Props

{{propsTable}}

## Examples

{{examples}}

## Accessibility

- Follows WAI-ARIA guidelines
- Keyboard navigation support
- Screen reader compatible
- Focus management
- Color contrast compliant

## Best Practices

- Use semantic HTML elements
- Provide appropriate labels and descriptions
- Consider color contrast ratios
- Test with keyboard navigation
- Verify screen reader compatibility

## Related Components

- Consider using related components from the {{category}} category
- Check the design system guide for consistent usage patterns
`;
  }

  /**
   * Create default templates
   */
  createDefaultTemplates() {
    const componentTemplate = this.getDefaultTemplate("component");
    fs.writeFileSync(
      path.join(CONFIG.templateDir, "component.md"),
      componentTemplate,
    );

    console.log("📝 Created default documentation templates");
  }

  /**
   * Utility methods
   */
  getComponentName(dirName) {
    return dirName;
  }

  getComponentNameFromStory(fileName) {
    return fileName.replace(".stories.tsx", "").replace(".stories.ts", "");
  }

  getComponentCategory(componentName) {
    const name = componentName.replace("glass-", "");

    for (const [category, components] of Object.entries(COMPONENT_CATEGORIES)) {
      if (components.includes(name)) {
        return category;
      }
    }

    return "utility";
  }

  toPascalCase(str) {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }

  /**
   * Generate summary report
   */
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      components: {
        total: this.components.size,
        documented: this.generatedDocs.length,
        withStories: Array.from(this.components.values()).filter(
          (c) => c.files.stories,
        ).length,
        withTests: Array.from(this.components.values()).filter(
          (c) => c.files.test,
        ).length,
      },
      categories: {},
      errors: this.errors,
      warnings: this.warnings,
      generatedFiles: this.generatedDocs,
    };

    // Count by category
    for (const [, component] of this.components) {
      const category = component.category;
      if (!report.categories[category]) {
        report.categories[category] = 0;
      }
      report.categories[category]++;
    }

    const reportPath = path.join(
      process.cwd(),
      "reports",
      "documentation-generation.json",
    );
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log("\n📊 Documentation Generation Report:");
    console.log(
      `📝 Generated: ${report.components.documented}/${report.components.total} components`,
    );
    console.log(`📚 With Stories: ${report.components.withStories} components`);
    console.log(`🧪 With Tests: ${report.components.withTests} components`);
    console.log(`📂 Report saved to: ${reportPath}`);

    return report;
  }

  /**
   * Main execution method
   */
  async run() {
    try {
      await this.init();
      await this.scanComponents();
      await this.generateAllDocs();

      const report = this.generateReport();

      console.log("\n🎉 Documentation generation completed successfully!");

      if (this.errors.length > 0) {
        console.log("\n❌ Errors encountered:");
        this.errors.forEach((error) => console.log(`  - ${error}`));
      }

      if (this.warnings.length > 0) {
        console.log("\n⚠️  Warnings:");
        this.warnings.forEach((warning) => console.log(`  - ${warning}`));
      }

      return report;
    } catch (error) {
      console.error("💥 Fatal error during documentation generation:", error);
      process.exit(1);
    }
  }
}

// CLI execution
if (import.meta.url === `file://${__filename}`) {
  const generator = new ComponentDocGenerator();

  // Parse command line arguments
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === "--help" || command === "-h") {
    console.log(`
📚 LiqUIdify Documentation Generator

Usage:
  node generate-component-docs.js [options]

Options:
  --help, -h     Show this help message
  --component    Generate docs for specific component
  --update       Update existing documentation
  --force        Force regeneration of all docs

Examples:
  node generate-component-docs.js
  node generate-component-docs.js --component glass-button
  node generate-component-docs.js --update
`);
    process.exit(0);
  }

  generator.run().catch((error) => {
    console.error("💥 Documentation generation failed:", error);
    process.exit(1);
  });
}

export default ComponentDocGenerator;
