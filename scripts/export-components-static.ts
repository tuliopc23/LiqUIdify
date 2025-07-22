#!/usr/bin/env node

/**
 * Static Component Export Script
 *
 * This script exports all LiquidUI components as static HTML files for:
 * - Documentation purposes
 * - Static site generation
 * - Component showcase
 * - Design system documentation
 *
 * Usage: npm run export:static
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

// Component list extracted from the showcase
const COMPONENTS = [
	"button",
	"input",
	"card",
	"modal",
	"tabs",
	"badge",
	"switch",
	"checkbox",
	"data-table",
	"textarea",
	"select",
	"slider",
	"progress",
	"loading",
	"avatar",
	"dropdown",
	"tooltip",
	"popover",
	"toast",
	"form-examples",
	"dashboard",
];

// Component metadata
const COMPONENT_METADATA = {
	button: {
		title: "Button Components",
		description: "Interactive buttons with glass morphism effects",
		category: "Form Controls",
	},
	input: {
		title: "Input Components",
		description: "Text inputs with liquid glass styling",
		category: "Form Controls",
	},
	card: {
		title: "Card Components",
		description: "Container components with glass effects",
		category: "Layout",
	},
	modal: {
		title: "Modal Components",
		description: "Overlay dialogs with backdrop blur",
		category: "Overlays",
	},
	tabs: {
		title: "Tab Components",
		description: "Tabbed navigation with smooth transitions",
		category: "Navigation",
	},
	badge: {
		title: "Badge Components",
		description: "Status indicators and labels",
		category: "Display",
	},
	switch: {
		title: "Switch Components",
		description: "Toggle switches with smooth animations",
		category: "Form Controls",
	},
	checkbox: {
		title: "Checkbox Components",
		description: "Checkboxes with glass styling",
		category: "Form Controls",
	},
	"data-table": {
		title: "Data Table Components",
		description: "Interactive tables with sorting and filtering",
		category: "Data Display",
	},
	textarea: {
		title: "Textarea Components",
		description: "Multi-line text inputs",
		category: "Form Controls",
	},
	select: {
		title: "Select Components",
		description: "Dropdown selections with glass effects",
		category: "Form Controls",
	},
	slider: {
		title: "Slider Components",
		description: "Range controls with smooth interactions",
		category: "Form Controls",
	},
	progress: {
		title: "Progress Components",
		description: "Progress indicators with animations",
		category: "Feedback",
	},
	loading: {
		title: "Loading Components",
		description: "Loading states and spinners",
		category: "Feedback",
	},
	avatar: {
		title: "Avatar Components",
		description: "User profile pictures and initials",
		category: "Display",
	},
	dropdown: {
		title: "Dropdown Components",
		description: "Action menus and dropdowns",
		category: "Navigation",
	},
	tooltip: {
		title: "Tooltip Components",
		description: "Contextual information overlays",
		category: "Overlays",
	},
	popover: {
		title: "Popover Components",
		description: "Rich content overlays",
		category: "Overlays",
	},
	toast: {
		title: "Toast Components",
		description: "Notification messages",
		category: "Feedback",
	},
	"form-examples": {
		title: "Form Examples",
		description: "Complete form implementations",
		category: "Examples",
	},
	dashboard: {
		title: "Dashboard Examples",
		description: "Analytics dashboard layouts",
		category: "Examples",
	},
};

// Base HTML template
const HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - LiquidUI Components</title>
  <meta name="description" content="{{DESCRIPTION}}">
  <meta name="keywords" content="liquidui, glass morphism, react components, ui library">
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- LiquidUI CSS -->
  <link rel="stylesheet" href="../dist/liquidui.css">
  
  <!-- Custom theme styles -->
  <style>
    :root {
      --glass-bg-canvas: #ffffff;
      --glass-text-primary: #1a1a1a;
      --glass-text-secondary: #666666;
      --glass-border-primary: rgba(255, 255, 255, 0.2);
      --glass-shadow-primary: rgba(0, 0, 0, 0.1);
    }
    
    [data-theme="dark"] {
      --glass-bg-canvas: #0a0a0a;
      --glass-text-primary: #ffffff;
      --glass-text-secondary: #cccccc;
      --glass-border-primary: rgba(255, 255, 255, 0.1);
      --glass-shadow-primary: rgba(0, 0, 0, 0.3);
    }
    
    body {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: var(--glass-text-primary);
    }
    
    [data-theme="dark"] body {
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    }
    
    .static-showcase {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .component-section {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border-radius: 16px;
      padding: 2rem;
      margin: 2rem 0;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .theme-toggle {
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      padding: 0.5rem 1rem;
      color: var(--glass-text-primary);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .theme-toggle:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    
    .navigation {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border-radius: 12px;
      padding: 1rem;
      margin-bottom: 2rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .nav-link {
      color: var(--glass-text-primary);
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      transition: all 0.2s ease;
      display: inline-block;
      margin: 0.25rem;
    }
    
    .nav-link:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    
    .component-preview {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 2rem;
      margin: 1rem 0;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .glass-effect {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .text-primary {
      color: var(--glass-text-primary);
    }
    
    .text-secondary {
      color: var(--glass-text-secondary);
    }
  </style>
</head>
<body>
  <button class="theme-toggle" onclick="toggleTheme()">🌓 Toggle Theme</button>
  
  <div class="static-showcase">
    <header class="text-center mb-8">
      <h1 class="text-4xl font-bold text-primary mb-4">{{TITLE}}</h1>
      <p class="text-xl text-secondary">{{DESCRIPTION}}</p>
      <div class="mt-4">
        <span class="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm">{{CATEGORY}}</span>
      </div>
    </header>
    
    <nav class="navigation">
      <div class="text-center">
        <a href="index.html" class="nav-link">← Back to Overview</a>
        <a href="storybook.html" class="nav-link">📖 Storybook</a>
        <a href="https://github.com/tuliopc23/LiqUIdify" class="nav-link" target="_blank">🔗 GitHub</a>
      </div>
    </nav>
    
    <main class="component-section">
      {{CONTENT}}
    </main>
    
    <footer class="text-center mt-8 text-secondary">
      <p>&copy; 2024 LiquidUI Components. Built with React and Tailwind CSS.</p>
      <p class="mt-2">
        <a href="https://liquidify-fw9pi7oj6-tulio-pinheiro-cunha-s-projects.vercel.app" class="text-blue-400 hover:text-blue-300">
          View Live Demo
        </a>
      </p>
    </footer>
  </div>
  
  <script>
    function toggleTheme() {
      const html = document.documentElement;
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    }
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  </script>
</body>
</html>`;

// Index page template
const INDEX_TEMPLATE = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LiquidUI Components - Static Export</title>
  <meta name="description" content="Static export of LiquidUI component library with glass morphism effects">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="dist/liquidui.css">
  <style>
    body {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .hero-section {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      padding: 3rem;
      margin: 2rem auto;
      max-width: 800px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      text-align: center;
    }
    
    .component-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .component-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border-radius: 16px;
      padding: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
      text-decoration: none;
      color: white;
      display: block;
    }
    
    .component-card:hover {
      transform: translateY(-5px);
      background: rgba(255, 255, 255, 0.15);
    }
    
    .category-badge {
      background: rgba(59, 130, 246, 0.7);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.875rem;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="hero-section">
    <h1 class="text-5xl font-bold text-white mb-4">LiquidUI Components</h1>
    <p class="text-xl text-white opacity-90 mb-6">
      Static export of our complete component library with glass morphism effects
    </p>
    <div class="flex justify-center gap-4">
      <a href="https://github.com/tuliopc23/LiqUIdify" class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
        View on GitHub
      </a>
      <a href="https://liquidify-fw9pi7oj6-tulio-pinheiro-cunha-s-projects.vercel.app" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
        Live Demo
      </a>
    </div>
  </div>
  
  <div class="component-grid">
    {{COMPONENT_CARDS}}
  </div>
  
  <div class="text-center py-8 text-white">
    <p>&copy; 2024 LiquidUI Components. Built with React and Tailwind CSS.</p>
  </div>
</body>
</html>`;

// Generate component card HTML
function generateComponentCard(componentId: string) {
	const metadata = COMPONENT_METADATA[componentId];
	return `
    <a href="${componentId}.html" class="component-card">
      <h3 class="text-xl font-semibold mb-2">${metadata.title}</h3>
      <p class="text-sm opacity-80 mb-3">${metadata.description}</p>
      <span class="category-badge">${metadata.category}</span>
    </a>
  `;
}

// Generate static component content (placeholder for actual component rendering)
function generateComponentContent(componentId: string) {
	return `
    <div class="component-preview">
      <h3 class="text-lg font-semibold mb-4 text-primary">Component Preview</h3>
      <div class="bg-gray-100 rounded-lg p-8 text-center">
        <p class="text-gray-600">
          📦 Static HTML preview for <strong>${componentId}</strong> component
        </p>
        <p class="text-sm text-gray-500 mt-2">
          For interactive previews, visit the live demo or Storybook
        </p>
      </div>
    </div>
    
    <div class="mt-6">
      <h4 class="text-lg font-semibold mb-3 text-primary">Usage Example</h4>
      <pre class="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto"><code>import { ${componentId
				.split("-")
				.map((word) => "Glass" + word.charAt(0).toUpperCase() + word.slice(1))
				.join("")} } from '@tuliocunha23/liquidui';

function MyComponent() {
  return (
    &lt;${componentId
			.split("-")
			.map((word) => "Glass" + word.charAt(0).toUpperCase() + word.slice(1))
			.join("")}&gt;
      Example content
    &lt;/${componentId
			.split("-")
			.map((word) => "Glass" + word.charAt(0).toUpperCase() + word.slice(1))
			.join("")}&gt;
  );
}</code></pre>
    </div>
    
    <div class="mt-6">
      <h4 class="text-lg font-semibold mb-3 text-primary">Installation</h4>
      <pre class="bg-gray-800 text-blue-400 p-4 rounded-lg overflow-x-auto"><code>npm install @tuliocunha23/liquidui</code></pre>
    </div>
  `;
}

// Main export function
async function exportStaticComponents() {
	console.log("🚀 Starting static component export...");

	const exportDir = join(rootDir, "static-export");

	// Create export directory
	if (!existsSync(exportDir)) {
		mkdirSync(exportDir, { recursive: true });
	}

	// Generate index page
	console.log("📄 Generating index page...");
	const componentCards = COMPONENTS.map(generateComponentCard).join("");
	const indexContent = INDEX_TEMPLATE.replace(
		"{{COMPONENT_CARDS}}",
		componentCards,
	);
	writeFileSync(join(exportDir, "index.html"), indexContent);

	// Generate individual component pages
	console.log("📦 Generating component pages...");
	for (const componentId of COMPONENTS) {
		const metadata = COMPONENT_METADATA[componentId];
		const content = generateComponentContent(componentId);

		const html = HTML_TEMPLATE.replace(/{{TITLE}}/g, metadata.title)
			.replace(/{{DESCRIPTION}}/g, metadata.description)
			.replace(/{{CATEGORY}}/g, metadata.category)
			.replace("{{CONTENT}}", content);

		writeFileSync(join(exportDir, `${componentId}.html`), html);
		console.log(`  ✅ Generated ${componentId}.html`);
	}

	// Generate README
	console.log("📝 Generating README...");
	const readmeContent = `# LiquidUI Components - Static Export

This directory contains static HTML files for all LiquidUI components.

## Files

- \`index.html\` - Main overview page with all components
${COMPONENTS.map((id) => `- \`${id}.html\` - ${COMPONENT_METADATA[id].title}`).join("\n")}

## Usage

1. Open \`index.html\` in your browser
2. Navigate to individual component pages
3. Use the theme toggle to switch between light and dark modes

## Live Demo

Visit the live demo at: https://liquidify-fw9pi7oj6-tulio-pinheiro-cunha-s-projects.vercel.app

## Development

For interactive component development, use:
- \`npm run storybook\` - Run Storybook
- \`npm run dev\` - Run development server

## Installation

\`\`\`bash
npm install @tuliocunha23/liquidui
\`\`\`

## Documentation

For complete documentation, visit the [GitHub repository](https://github.com/tuliopc23/LiqUIdify).
`;

	writeFileSync(join(exportDir, "README.md"), readmeContent);

	console.log("✅ Static export complete!");
	console.log(`📁 Files exported to: ${exportDir}`);
	console.log(`🌐 Open ${join(exportDir, "index.html")} in your browser`);

	return exportDir;
}

// Run the export
if (import.meta.url === `file://${process.argv[1]}`) {
	exportStaticComponents().catch(console.error);
}

export { exportStaticComponents };
