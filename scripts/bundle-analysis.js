#!/usr/bin/env node

import { statSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { join, relative, extname } from "path";
import { gzipSync } from "zlib";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// Configuration
const CONFIG = {
  distPath: "dist/libs/components",
  reportPath: "reports/bundle",
  sizeLimits: {
    "core.js": 30 * 1024, // 30KB
    "index.js": 60 * 1024, // 60KB
    "bundles/navigation.js": 15 * 1024, // 15KB
    "bundles/feedback.js": 18 * 1024, // 18KB
    "bundles/overlay.js": 20 * 1024, // 20KB
    "bundles/layout.js": 15 * 1024, // 15KB
    "bundles/data-display.js": 25 * 1024, // 25KB
    "bundles/accessibility.js": 10 * 1024, // 10KB
  },
  criticalFiles: ["index.js", "bundles/core.js", "index.d.ts"],
};

// Helper functions
function formatBytes(bytes) {
  const sizes = ["B", "KB", "MB", "GB"];
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

function getFileSize(filePath) {
  try {
    return statSync(filePath).size;
  } catch {
    return 0;
  }
}

function getGzipSize(filePath) {
  try {
    const content = readFileSync(filePath);
    return gzipSync(content).length;
  } catch {
    return 0;
  }
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = join(dirPath, file);
    if (statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

async function analyzeBundle(filePath) {
  const size = getFileSize(filePath);
  const gzipSize = getGzipSize(filePath);
  const relativePath = relative(CONFIG.distPath, filePath);

  const analysis = {
    path: relativePath,
    size,
    gzipSize,
    sizeFormatted: formatBytes(size),
    gzipSizeFormatted: formatBytes(gzipSize),
    compressionRatio: size > 0 ? ((1 - gzipSize / size) * 100).toFixed(1) : 0,
  };

  // Check if file has a size limit
  const limit = CONFIG.sizeLimits[relativePath];
  if (limit) {
    analysis.limit = limit;
    analysis.limitFormatted = formatBytes(limit);
    analysis.withinLimit = size <= limit;
    analysis.overBy = size > limit ? size - limit : 0;
    analysis.overByFormatted = formatBytes(analysis.overBy);
    analysis.overByPercentage =
      size > limit ? ((size / limit - 1) * 100).toFixed(1) : 0;
  }

  return analysis;
}

async function analyzeExports() {
  console.log("🔍 Analyzing bundle exports...\n");

  try {
    const allFiles = getAllFiles(CONFIG.distPath);
    const jsFiles = allFiles.filter((f) => extname(f) === ".js");
    const cssFiles = allFiles.filter((f) => extname(f) === ".css");
    const dtsFiles = allFiles.filter((f) => f.endsWith(".d.ts"));

    const analyses = [];

    // Analyze JS bundles
    for (const file of jsFiles) {
      const analysis = await analyzeBundle(file);
      analyses.push(analysis);
    }

    // Sort by size descending
    analyses.sort((a, b) => b.size - a.size);

    return {
      timestamp: new Date().toISOString(),
      totalFiles: allFiles.length,
      jsFiles: jsFiles.length,
      cssFiles: cssFiles.length,
      typeDefinitions: dtsFiles.length,
      analyses,
      summary: generateSummary(analyses),
    };
  } catch (error) {
    console.warn("⚠️ Could not find built files, returning empty analysis");
    return {
      timestamp: new Date().toISOString(),
      totalFiles: 0,
      jsFiles: 0,
      cssFiles: 0,
      typeDefinitions: 0,
      analyses: [],
      summary: {
        totalSize: 0,
        totalGzipSize: 0,
        totalSizeFormatted: "0 B",
        totalGzipSizeFormatted: "0 B",
        averageCompressionRatio: "0",
        violations: 0,
        criticalViolations: 0,
        largestBundle: null,
        status: "pending",
      },
    };
  }
}

function generateSummary(analyses) {
  const totalSize = analyses.reduce((sum, a) => sum + a.size, 0);
  const totalGzipSize = analyses.reduce((sum, a) => sum + a.gzipSize, 0);

  const violations = analyses.filter((a) => a.limit && !a.withinLimit);
  const criticalViolations = violations.filter((v) =>
    CONFIG.criticalFiles.includes(v.path),
  );

  return {
    totalSize,
    totalGzipSize,
    totalSizeFormatted: formatBytes(totalSize),
    totalGzipSizeFormatted: formatBytes(totalGzipSize),
    averageCompressionRatio: (
      analyses.reduce((sum, a) => sum + parseFloat(a.compressionRatio), 0) /
      analyses.length
    ).toFixed(1),
    violations: violations.length,
    criticalViolations: criticalViolations.length,
    largestBundle: analyses[0],
    status: criticalViolations.length === 0 ? "pass" : "fail",
  };
}

function generateReport(data) {
  const { analyses, summary } = data;

  let report = `# Bundle Analysis Report

Generated: ${new Date().toLocaleString()}

## Summary

- **Total Size**: ${summary.totalSizeFormatted} (${summary.totalGzipSizeFormatted} gzipped)
- **Average Compression**: ${summary.averageCompressionRatio}%
- **Status**: ${summary.status === "pass" ? "✅ PASS" : "❌ FAIL"}
- **Size Limit Violations**: ${summary.violations}
- **Critical Violations**: ${summary.criticalViolations}

## Bundle Sizes

| Bundle | Size | Gzip | Compression | Limit | Status |
|--------|------|------|-------------|-------|--------|
`;

  analyses.forEach((analysis) => {
    const status = analysis.limit
      ? analysis.withinLimit
        ? "✅"
        : `❌ (+${analysis.overByPercentage}%)`
      : "—";

    report += `| ${analysis.path} | ${analysis.sizeFormatted} | ${analysis.gzipSizeFormatted} | ${analysis.compressionRatio}% | ${analysis.limitFormatted || "—"} | ${status} |\n`;
  });

  if (summary.violations > 0) {
    report += `\n## ⚠️ Size Limit Violations\n\n`;

    analyses
      .filter((a) => a.limit && !a.withinLimit)
      .forEach((analysis) => {
        report += `### ${analysis.path}\n`;
        report += `- Current: ${analysis.sizeFormatted}\n`;
        report += `- Limit: ${analysis.limitFormatted}\n`;
        report += `- Over by: ${analysis.overByFormatted} (${analysis.overByPercentage}%)\n\n`;
      });
  }

  report += `\n## Largest Bundles\n\n`;
  analyses.slice(0, 10).forEach((analysis, i) => {
    report += `${i + 1}. **${analysis.path}**: ${analysis.sizeFormatted} (${analysis.gzipSizeFormatted} gzipped)\n`;
  });

  return report;
}

async function generateVisualization(data) {
  const { analyses } = data;

  // Create treemap data
  const treemapData = {
    name: "liquidify",
    children: [],
  };

  // Group by directory
  const groups = {};
  analyses.forEach((analysis) => {
    const parts = analysis.path.split("/");
    const group = parts.length > 1 ? parts[0] : "root";

    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push({
      name: analysis.path,
      value: analysis.size,
      gzipValue: analysis.gzipSize,
    });
  });

  Object.entries(groups).forEach(([group, files]) => {
    treemapData.children.push({
      name: group,
      children: files,
    });
  });

  // Generate HTML visualization
  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Bundle Analysis - LiqUIdify</title>
  <script src="https://d3js.org/d3.v7.min.js"></script>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 20px;
      background: #f5f5f5;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 {
      margin-top: 0;
      color: #333;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .stat {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 4px;
      text-align: center;
    }
    .stat-value {
      font-size: 24px;
      font-weight: bold;
      color: #2563eb;
    }
    .stat-label {
      font-size: 14px;
      color: #666;
      margin-top: 5px;
    }
    #treemap {
      width: 100%;
      height: 600px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .tooltip {
      position: absolute;
      text-align: center;
      padding: 8px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      border-radius: 4px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Bundle Analysis Report</h1>

    <div class="stats">
      <div class="stat">
        <div class="stat-value">${data.summary.totalSizeFormatted}</div>
        <div class="stat-label">Total Size</div>
      </div>
      <div class="stat">
        <div class="stat-value">${data.summary.totalGzipSizeFormatted}</div>
        <div class="stat-label">Gzipped Size</div>
      </div>
      <div class="stat">
        <div class="stat-value">${data.summary.averageCompressionRatio}%</div>
        <div class="stat-label">Avg Compression</div>
      </div>
      <div class="stat">
        <div class="stat-value">${data.summary.violations}</div>
        <div class="stat-label">Size Violations</div>
      </div>
    </div>

    <h2>Bundle Treemap</h2>
    <div id="treemap"></div>

    <div class="tooltip"></div>
  </div>

  <script>
    const data = ${JSON.stringify(treemapData)};

    const width = document.getElementById('treemap').clientWidth;
    const height = 600;

    const color = d3.scaleOrdinal()
      .domain(['bundles', 'components', 'core', 'styles', 'root'])
      .range(['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']);

    const treemap = d3.treemap()
      .size([width, height])
      .padding(2);

    const root = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);

    treemap(root);

    const svg = d3.select('#treemap')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const tooltip = d3.select('.tooltip');

    const leaf = svg.selectAll('g')
      .data(root.leaves())
      .join('g')
      .attr('transform', d => \`translate(\${d.x0},\${d.y0})\`);

    leaf.append('rect')
      .attr('fill', d => color(d.parent.data.name))
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .on('mouseover', (event, d) => {
        tooltip.transition().duration(200).style('opacity', .9);
        tooltip.html(\`<strong>\${d.data.name}</strong><br/>Size: \${formatBytes(d.data.value)}<br/>Gzip: \${formatBytes(d.data.gzipValue)}\`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
        tooltip.transition().duration(500).style('opacity', 0);
      });

    leaf.append('text')
      .attr('x', 4)
      .attr('y', 20)
      .text(d => {
        const width = d.x1 - d.x0;
        const name = d.data.name.split('/').pop();
        return width > 50 ? name : '';
      })
      .attr('font-size', '11px')
      .attr('fill', 'white');

    function formatBytes(bytes) {
      const sizes = ['B', 'KB', 'MB'];
      if (bytes === 0) return '0 B';
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
    }
  </script>
</body>
</html>`;

  return html;
}

async function main() {
  console.log("📦 LiqUIdify Bundle Analysis\n");

  try {
    // Check if dist directory exists
    try {
      if (!statSync(CONFIG.distPath).isDirectory()) {
        console.error(
          "❌ Dist directory not found. Please build the project first.",
        );
        process.exit(1);
      }
    } catch (error) {
      console.error(
        "❌ Dist directory not found. Please build the project first with 'bun run build:lib'",
      );
      process.exit(1);
    }

    // Create report directory
    await execAsync(`mkdir -p ${CONFIG.reportPath}`);

    // Analyze bundles
    const analysisData = await analyzeExports();

    // Generate report
    const report = generateReport(analysisData);
    const reportPath = join(CONFIG.reportPath, "bundle-analysis.md");
    writeFileSync(reportPath, report);
    console.log(`📄 Report saved to: ${reportPath}`);

    // Generate JSON data
    const jsonPath = join(CONFIG.reportPath, "bundle-analysis.json");
    writeFileSync(jsonPath, JSON.stringify(analysisData, null, 2));
    console.log(`📊 JSON data saved to: ${jsonPath}`);

    // Generate visualization
    const visualization = await generateVisualization(analysisData);
    const htmlPath = join(CONFIG.reportPath, "bundle-analysis.html");
    writeFileSync(htmlPath, visualization);
    console.log(`🎨 Visualization saved to: ${htmlPath}`);

    // Print summary
    console.log("\n📈 Summary:");
    console.log(`   Total Size: ${analysisData.summary.totalSizeFormatted}`);
    console.log(`   Gzipped: ${analysisData.summary.totalGzipSizeFormatted}`);
    console.log(
      `   Status: ${analysisData.summary.status === "pass" ? "✅ PASS" : "❌ FAIL"}`,
    );

    if (analysisData.summary.violations > 0) {
      console.log(
        `\n⚠️  Found ${analysisData.summary.violations} size limit violations!`,
      );
      process.exit(1);
    }

    console.log("\n✅ Bundle analysis complete!");
  } catch (error) {
    console.error("❌ Error during bundle analysis:", error.message);
    process.exit(1);
  }
}

// Run the analysis
main();
