#!/usr/bin/env node

import { execSync } from "child_process";
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  statSync,
} from "fs";
import { join, extname } from "path";
import { createHash } from "crypto";

// Configuration
const CONFIG = {
  outputDir: "reports/security",
  packageJsonPath: "package.json",
  lockfilePath: "bun.lockb",
  srcDir: "libs/components/src",
  buildDir: "dist/libs/components",
  allowedLicenses: [
    "MIT",
    "Apache-2.0",
    "BSD-2-Clause",
    "BSD-3-Clause",
    "ISC",
    "Unlicense",
    "CC0-1.0",
  ],
  securityPatterns: {
    secrets: [
      /(['"`])(sk_[a-zA-Z0-9_-]{20,})\1/g, // Stripe secret keys
      /(['"`])(pk_[a-zA-Z0-9_-]{20,})\1/g, // Stripe public keys
      /(['"`])([A-Za-z0-9+/]{40})\1/g, // Generic 40-char tokens
      /(['"`])(ya29\.[a-zA-Z0-9_-]{68})\1/g, // Google OAuth tokens
      /(['"`])(AKIA[0-9A-Z]{16})\1/g, // AWS access key IDs
      /(['"`])([0-9a-f]{32})\1/g, // MD5 hashes (potential secrets)
      /(['"`])(xox[baprs]-[0-9]{12}-[0-9]{12}-[a-zA-Z0-9]{24})\1/g, // Slack tokens
      /(['"`])(ghp_[a-zA-Z0-9]{36})\1/g, // GitHub personal access tokens
    ],
    vulnerablePatterns: [
      /dangerouslySetInnerHTML/g,
      /eval\s*\(/g,
      /new\s+Function\s*\(/g,
      /setTimeout\s*\(\s*["'`][^"'`]*["'`]/g,
      /setInterval\s*\(\s*["'`][^"'`]*["'`]/g,
      /document\.write\s*\(/g,
      /innerHTML\s*=/g,
      /outerHTML\s*=/g,
    ],
    suspiciousImports: [
      /require\s*\(\s*['"`]child_process['"`]\s*\)/g,
      /require\s*\(\s*['"`]fs['"`]\s*\)/g,
      /require\s*\(\s*['"`]path['"`]\s*\)/g,
      /import.*from\s*['"`]child_process['"`]/g,
      /import.*from\s*['"`]fs['"`]/g,
      /import.*from\s*['"`]path['"`]/g,
    ],
  },
};

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Security audit functions
async function runNpmAudit() {
  log("🔍 Running npm audit...", "blue");

  try {
    const output = execSync("npm audit --json", {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    });

    return JSON.parse(output);
  } catch (error) {
    // npm audit returns non-zero exit code when vulnerabilities are found
    if (error.stdout) {
      try {
        return JSON.parse(error.stdout);
      } catch {
        return {
          error: "Failed to parse npm audit output",
          rawOutput: error.stdout,
        };
      }
    }

    return {
      error: "npm audit failed to run",
      message: error.message,
    };
  }
}

async function runSnykScan() {
  log("🔍 Running Snyk security scan...", "blue");

  try {
    // Check if Snyk is available
    execSync("which snyk", { stdio: "ignore" });

    const output = execSync("snyk test --json", {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    });

    return JSON.parse(output);
  } catch (error) {
    if (error.stdout) {
      try {
        return JSON.parse(error.stdout);
      } catch {
        return {
          error: "Failed to parse Snyk output",
          rawOutput: error.stdout,
        };
      }
    }

    return {
      error: "Snyk not available or scan failed",
      message: "Install Snyk CLI: npm install -g snyk",
    };
  }
}

function scanForSecrets(directory) {
  log("🔍 Scanning for exposed secrets...", "blue");

  const findings = [];

  function scanFile(filePath) {
    if (
      !filePath.endsWith(".js") &&
      !filePath.endsWith(".ts") &&
      !filePath.endsWith(".tsx")
    ) {
      return;
    }

    try {
      const content = readFileSync(filePath, "utf8");

      CONFIG.securityPatterns.secrets.forEach((pattern) => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          const lineNumber = content
            .substring(0, match.index)
            .split("\n").length;
          findings.push({
            type: "secret",
            file: filePath,
            line: lineNumber,
            pattern: pattern.source,
            match: match[2], // The actual secret (without quotes)
            severity: "high",
          });
        }
      });
    } catch {
      // Ignore files that can't be read
    }
  }

  function scanDirectory(dir) {
    try {
      const items = readdirSync(dir);
      items.forEach((item) => {
        const fullPath = join(dir, item);
        const stat = statSync(fullPath);

        if (
          stat.isDirectory() &&
          !item.startsWith(".") &&
          item !== "node_modules"
        ) {
          scanDirectory(fullPath);
        } else if (stat.isFile()) {
          scanFile(fullPath);
        }
      });
    } catch {
      // Ignore directories that can't be read
    }
  }

  scanDirectory(directory);
  return findings;
}

function scanForVulnerablePatterns(directory) {
  log("🔍 Scanning for vulnerable code patterns...", "blue");

  const findings = [];

  function scanFile(filePath) {
    if (
      !filePath.endsWith(".js") &&
      !filePath.endsWith(".ts") &&
      !filePath.endsWith(".tsx")
    ) {
      return;
    }

    try {
      const content = readFileSync(filePath, "utf8");

      CONFIG.securityPatterns.vulnerablePatterns.forEach((pattern) => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          const lineNumber = content
            .substring(0, match.index)
            .split("\n").length;
          findings.push({
            type: "vulnerable_pattern",
            file: filePath,
            line: lineNumber,
            pattern: pattern.source,
            match: match[0],
            severity: "medium",
          });
        }
      });

      CONFIG.securityPatterns.suspiciousImports.forEach((pattern) => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          const lineNumber = content
            .substring(0, match.index)
            .split("\n").length;
          findings.push({
            type: "suspicious_import",
            file: filePath,
            line: lineNumber,
            pattern: pattern.source,
            match: match[0],
            severity: "low",
          });
        }
      });
    } catch {
      // Ignore files that can't be read
    }
  }

  function scanDirectory(dir) {
    try {
      const items = readdirSync(dir);
      items.forEach((item) => {
        const fullPath = join(dir, item);
        const stat = statSync(fullPath);

        if (
          stat.isDirectory() &&
          !item.startsWith(".") &&
          item !== "node_modules"
        ) {
          scanDirectory(fullPath);
        } else if (stat.isFile()) {
          scanFile(fullPath);
        }
      });
    } catch {
      // Ignore directories that can't be read
    }
  }

  scanDirectory(directory);
  return findings;
}

function checkLicenseCompliance() {
  log("🔍 Checking license compliance...", "blue");

  try {
    const packageJson = JSON.parse(
      readFileSync(CONFIG.packageJsonPath, "utf8"),
    );

    const licenseIssues = [];

    // Check project license
    if (!packageJson.license) {
      licenseIssues.push({
        type: "missing_license",
        package: packageJson.name,
        issue: "No license specified in package.json",
        severity: "high",
      });
    } else if (!CONFIG.allowedLicenses.includes(packageJson.license)) {
      licenseIssues.push({
        type: "incompatible_license",
        package: packageJson.name,
        license: packageJson.license,
        issue: `License ${packageJson.license} may not be compatible with allowed licenses`,
        severity: "medium",
      });
    }

    // Try to check dependency licenses (requires license-checker if available)
    try {
      const licenseOutput = execSync("npx license-checker --json", {
        encoding: "utf8",
        stdio: ["pipe", "pipe", "pipe"],
      });

      const licenses = JSON.parse(licenseOutput);
      Object.entries(licenses).forEach(([pkg, info]) => {
        if (info.licenses && !CONFIG.allowedLicenses.includes(info.licenses)) {
          licenseIssues.push({
            type: "dependency_license",
            package: pkg,
            license: info.licenses,
            issue: `Dependency has potentially incompatible license: ${info.licenses}`,
            severity: "medium",
          });
        }
      });
    } catch (error) {
      licenseIssues.push({
        type: "license_check_failed",
        issue:
          "Could not check dependency licenses. Install license-checker: npm install license-checker",
        severity: "low",
      });
    }

    return licenseIssues;
  } catch (error) {
    return [
      {
        type: "license_check_error",
        issue: "Failed to check licenses",
        severity: "medium",
      },
    ];
  }
}

function generateSBOM() {
  log("🔍 Generating Software Bill of Materials (SBOM)...", "blue");

  try {
    const packageJson = JSON.parse(
      readFileSync(CONFIG.packageJsonPath, "utf8"),
    );
    const dependencies = packageJson.dependencies || {};
    const devDependencies = packageJson.devDependencies || {};

    const sbom = {
      bomFormat: "CycloneDX",
      specVersion: "1.4",
      serialNumber: `urn:uuid:${createHash("sha256").update(JSON.stringify(packageJson)).digest("hex")}`,
      version: 1,
      metadata: {
        timestamp: new Date().toISOString(),
        tools: [
          {
            name: "liquidify-security-audit",
            version: "1.0.0",
          },
        ],
        component: {
          type: "library",
          name: packageJson.name,
          version: packageJson.version,
          description: packageJson.description,
          licenses: packageJson.license
            ? [{ license: { id: packageJson.license } }]
            : [],
        },
      },
      components: [],
    };

    // Add production dependencies
    Object.entries(dependencies).forEach(([name, version]) => {
      sbom.components.push({
        type: "library",
        name,
        version: version.replace(/^[\^~]/, ""), // Remove version prefixes
        scope: "required",
      });
    });

    // Add development dependencies
    Object.entries(devDependencies).forEach(([name, version]) => {
      sbom.components.push({
        type: "library",
        name,
        version: version.replace(/^[\^~]/, ""), // Remove version prefixes
        scope: "optional",
      });
    });

    return sbom;
  } catch (error) {
    return {
      error: "Failed to generate SBOM",
    };
  }
}

function checkDependencyUpdates() {
  log("🔍 Checking for outdated dependencies...", "blue");

  try {
    const output = execSync("npm outdated --json", {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    });

    return JSON.parse(output);
  } catch (error) {
    if (error.stdout) {
      try {
        const outdated = JSON.parse(error.stdout);
        return outdated;
      } catch {
        return {};
      }
    }
    return {};
  }
}

function generateSecurityReport(auditResults) {
  let report = `# Security Audit Report

Generated: ${new Date().toLocaleString()}

## Executive Summary

`;

  // Calculate severity counts
  const criticalIssues = [];
  const highIssues = [];
  const mediumIssues = [];
  const lowIssues = [];

  // Count npm audit issues
  if (auditResults.npmAudit?.vulnerabilities) {
    Object.values(auditResults.npmAudit.vulnerabilities).forEach((vuln) => {
      const severity = vuln.severity || "unknown";
      switch (severity) {
        case "critical":
          criticalIssues.push(vuln);
          break;
        case "high":
          highIssues.push(vuln);
          break;
        case "moderate":
          mediumIssues.push(vuln);
          break;
        case "low":
          lowIssues.push(vuln);
          break;
      }
    });
  }

  // Count code scan issues
  [...auditResults.secretScan, ...auditResults.patternScan].forEach(
    (finding) => {
      switch (finding.severity) {
        case "critical":
          criticalIssues.push(finding);
          break;
        case "high":
          highIssues.push(finding);
          break;
        case "medium":
          mediumIssues.push(finding);
          break;
        case "low":
          lowIssues.push(finding);
          break;
      }
    },
  );

  const totalIssues =
    criticalIssues.length +
    highIssues.length +
    mediumIssues.length +
    lowIssues.length;
  const riskScore =
    criticalIssues.length * 10 +
    highIssues.length * 7 +
    mediumIssues.length * 4 +
    lowIssues.length * 1;

  report += `| Severity | Count |
|----------|-------|
| 🔴 Critical | ${criticalIssues.length} |
| 🟠 High | ${highIssues.length} |
| 🟡 Medium | ${mediumIssues.length} |
| 🟢 Low | ${lowIssues.length} |
| **Total** | **${totalIssues}** |

**Risk Score**: ${riskScore}/100 ${riskScore === 0 ? "🟢" : riskScore < 20 ? "🟡" : riskScore < 50 ? "🟠" : "🔴"}

**Status**: ${totalIssues === 0 ? "✅ SECURE" : criticalIssues.length > 0 ? "❌ CRITICAL ISSUES FOUND" : highIssues.length > 0 ? "⚠️ HIGH RISK ISSUES FOUND" : "⚠️ ISSUES FOUND"}

`;

  // NPM Audit Results
  report += `## Dependency Vulnerabilities (npm audit)

`;

  if (auditResults.npmAudit?.error) {
    report += `❌ **Error**: ${auditResults.npmAudit.error}

`;
  } else if (auditResults.npmAudit?.vulnerabilities) {
    const vulnCount = Object.keys(auditResults.npmAudit.vulnerabilities).length;
    if (vulnCount === 0) {
      report += `✅ No vulnerabilities found in dependencies.

`;
    } else {
      report += `Found ${vulnCount} vulnerable dependencies:

| Package | Severity | Vulnerability | Patched Version |
|---------|----------|---------------|-----------------|
`;

      Object.entries(auditResults.npmAudit.vulnerabilities).forEach(
        ([pkg, vuln]) => {
          const severity = vuln.severity || "unknown";
          const severityIcon =
            severity === "critical"
              ? "🔴"
              : severity === "high"
                ? "🟠"
                : severity === "moderate"
                  ? "🟡"
                  : "🟢";
          report += `| ${pkg} | ${severityIcon} ${severity} | ${vuln.title || "Unknown"} | ${vuln.patched || "N/A"} |
`;
        },
      );

      report += `
`;
    }
  }

  // Snyk Results
  report += `## Advanced Vulnerability Scan (Snyk)

`;

  if (auditResults.snykScan?.error) {
    report += `⚠️ **Snyk scan not available**: ${auditResults.snykScan.error}

${auditResults.snykScan.message || ""}

`;
  } else if (auditResults.snykScan?.vulnerabilities) {
    const snykVulns = auditResults.snykScan.vulnerabilities || [];
    if (snykVulns.length === 0) {
      report += `✅ No additional vulnerabilities found by Snyk.

`;
    } else {
      report += `Found ${snykVulns.length} additional vulnerabilities:

| Package | Severity | Issue | Upgrade Path |
|---------|----------|-------|-------------|
`;

      snykVulns.forEach((vuln) => {
        const severityIcon =
          vuln.severity === "critical"
            ? "🔴"
            : vuln.severity === "high"
              ? "🟠"
              : vuln.severity === "medium"
                ? "🟡"
                : "🟢";
        report += `| ${vuln.packageName} | ${severityIcon} ${vuln.severity} | ${vuln.title} | ${vuln.upgradePath?.join(" → ") || "No fix available"} |
`;
      });

      report += `
`;
    }
  }

  // Secret Scan Results
  report += `## Exposed Secrets Scan

`;

  if (auditResults.secretScan.length === 0) {
    report += `✅ No exposed secrets found in source code.

`;
  } else {
    report += `⚠️ Found ${auditResults.secretScan.length} potential secrets:

| File | Line | Type | Severity |
|------|------|------|----------|
`;

    auditResults.secretScan.forEach((finding) => {
      const severityIcon =
        finding.severity === "critical"
          ? "🔴"
          : finding.severity === "high"
            ? "🟠"
            : finding.severity === "medium"
              ? "🟡"
              : "🟢";
      report += `| ${finding.file} | ${finding.line} | ${finding.type} | ${severityIcon} ${finding.severity} |
`;
    });

    report += `
`;
  }

  // Vulnerable Patterns Scan
  report += `## Vulnerable Code Patterns

`;

  const vulnPatterns = auditResults.patternScan.filter(
    (f) => f.type === "vulnerable_pattern",
  );
  const suspiciousImports = auditResults.patternScan.filter(
    (f) => f.type === "suspicious_import",
  );

  if (vulnPatterns.length === 0) {
    report += `✅ No vulnerable code patterns found.

`;
  } else {
    report += `⚠️ Found ${vulnPatterns.length} vulnerable code patterns:

| File | Line | Pattern | Severity |
|------|------|---------|----------|
`;

    vulnPatterns.forEach((finding) => {
      const severityIcon =
        finding.severity === "critical"
          ? "🔴"
          : finding.severity === "high"
            ? "🟠"
            : finding.severity === "medium"
              ? "🟡"
              : "🟢";
      report += `| ${finding.file} | ${finding.line} | \`${finding.match}\` | ${severityIcon} ${finding.severity} |
`;
    });

    report += `
`;
  }

  if (suspiciousImports.length > 0) {
    report += `### Suspicious Imports

Found ${suspiciousImports.length} suspicious imports (review for necessity):

| File | Line | Import | Note |
|------|------|--------|------|
`;

    suspiciousImports.forEach((finding) => {
      report += `| ${finding.file} | ${finding.line} | \`${finding.match}\` | Review if necessary for component library |
`;
    });

    report += `
`;
  }

  // License Compliance
  report += `## License Compliance

`;

  if (auditResults.licenseCheck.length === 0) {
    report += `✅ All licenses are compliant with allowed licenses.

**Allowed Licenses**: ${CONFIG.allowedLicenses.join(", ")}

`;
  } else {
    report += `⚠️ Found ${auditResults.licenseCheck.length} license compliance issues:

| Type | Package | License | Issue |
|------|---------|---------|-------|
`;

    auditResults.licenseCheck.forEach((issue) => {
      const severityIcon =
        issue.severity === "high"
          ? "🟠"
          : issue.severity === "medium"
            ? "🟡"
            : "🟢";
      report += `| ${issue.type} | ${issue.package || "N/A"} | ${issue.license || "N/A"} | ${severityIcon} ${issue.issue} |
`;
    });

    report += `
`;
  }

  // Outdated Dependencies
  report += `## Dependency Updates

`;

  const outdatedCount = Object.keys(auditResults.outdatedDeps).length;
  if (outdatedCount === 0) {
    report += `✅ All dependencies are up to date.

`;
  } else {
    report += `Found ${outdatedCount} outdated dependencies:

| Package | Current | Wanted | Latest | Type |
|---------|---------|--------|--------|------|
`;

    Object.entries(auditResults.outdatedDeps).forEach(([pkg, info]) => {
      report += `| ${pkg} | ${info.current} | ${info.wanted} | ${info.latest} | ${info.type || "dependency"} |
`;
    });

    report += `

**Recommendation**: Update dependencies regularly to receive security patches.

`;
  }

  // Software Bill of Materials
  report += `## Software Bill of Materials (SBOM)

Generated SBOM with ${auditResults.sbom.components?.length || 0} components.

**Format**: CycloneDX 1.4
**Components**: ${auditResults.sbom.components?.length || 0}
**Production Dependencies**: ${auditResults.sbom.components?.filter((c) => c.scope === "required").length || 0}
**Development Dependencies**: ${auditResults.sbom.components?.filter((c) => c.scope === "optional").length || 0}

`;

  // Recommendations
  report += `## Security Recommendations

`;

  if (totalIssues === 0) {
    report += `🎉 **Excellent!** No security issues found. Continue following security best practices:

- Regular dependency updates
- Code review processes
- Automated security scanning in CI/CD
- Principle of least privilege
- Regular security audits

`;
  } else {
    report += `### Immediate Actions Required

`;

    if (criticalIssues.length > 0) {
      report += `🔴 **Critical Issues** (${criticalIssues.length}):
- Address immediately before any production deployment
- Consider emergency patches if already in production

`;
    }

    if (highIssues.length > 0) {
      report += `🟠 **High Priority** (${highIssues.length}):
- Address within 48 hours
- Review and test fixes thoroughly

`;
    }

    if (mediumIssues.length > 0) {
      report += `🟡 **Medium Priority** (${mediumIssues.length}):
- Address within 1 week
- Include in next planned release

`;
    }

    if (lowIssues.length > 0) {
      report += `🟢 **Low Priority** (${lowIssues.length}):
- Address in next maintenance cycle
- Good to fix but not blocking

`;
    }

    report += `### General Recommendations

1. **Dependency Management**:
   - Enable automated dependency updates (Dependabot/Renovate)
   - Use exact versions for security-critical dependencies
   - Regularly audit and remove unused dependencies

2. **Code Security**:
   - Use ESLint security plugins
   - Implement Content Security Policy (CSP)
   - Sanitize all user inputs
   - Use TypeScript for better type safety

3. **CI/CD Security**:
   - Run security scans on every PR
   - Use secrets scanning tools
   - Implement SAST/DAST testing
   - Sign and verify builds

4. **Monitoring**:
   - Set up vulnerability monitoring
   - Implement security logging
   - Monitor for unusual patterns
   - Regular penetration testing

`;
  }

  return report;
}

async function main() {
  log("🔒 Starting Comprehensive Security Audit", "bright");

  try {
    // Ensure output directory exists
    mkdirSync(CONFIG.outputDir, { recursive: true });

    log("\n🔍 Running security scans...", "cyan");

    const auditResults = {
      timestamp: new Date().toISOString(),
      npmAudit: await runNpmAudit(),
      snykScan: await runSnykScan(),
      secretScan: scanForSecrets(CONFIG.srcDir),
      patternScan: scanForVulnerablePatterns(CONFIG.srcDir),
      licenseCheck: checkLicenseCompliance(),
      outdatedDeps: checkDependencyUpdates(),
      sbom: generateSBOM(),
    };

    // Generate reports
    const securityReport = generateSecurityReport(auditResults);
    const reportPath = join(CONFIG.outputDir, "security-audit.md");
    writeFileSync(reportPath, securityReport);

    const jsonPath = join(CONFIG.outputDir, "security-audit.json");
    writeFileSync(jsonPath, JSON.stringify(auditResults, null, 2));

    // Save SBOM separately
    const sbomPath = join(CONFIG.outputDir, "sbom.json");
    writeFileSync(sbomPath, JSON.stringify(auditResults.sbom, null, 2));

    log(`📄 Security report saved to: ${reportPath}`, "cyan");
    log(`📊 JSON data saved to: ${jsonPath}`, "cyan");
    log(`📋 SBOM saved to: ${sbomPath}`, "cyan");

    // Calculate summary
    const criticalCount = [
      ...auditResults.secretScan,
      ...auditResults.patternScan,
    ].filter((f) => f.severity === "critical").length;
    const highCount = [
      ...auditResults.secretScan,
      ...auditResults.patternScan,
    ].filter((f) => f.severity === "high").length;
    const totalIssues =
      auditResults.secretScan.length +
      auditResults.patternScan.length +
      (auditResults.npmAudit?.vulnerabilities
        ? Object.keys(auditResults.npmAudit.vulnerabilities).length
        : 0);

    // Print summary
    log("\n🔒 Security Audit Summary:", "bright");
    log(
      `   Total Issues: ${totalIssues}`,
      totalIssues === 0 ? "green" : "yellow",
    );
    log(`   Critical: ${criticalCount}`, criticalCount === 0 ? "green" : "red");
    log(`   High: ${highCount}`, highCount === 0 ? "green" : "red");
    log(
      `   Dependencies Scanned: ${Object.keys(auditResults.outdatedDeps).length + (auditResults.sbom.components?.length || 0)}`,
      "blue",
    );
    log(
      `   License Issues: ${auditResults.licenseCheck.length}`,
      auditResults.licenseCheck.length === 0 ? "green" : "yellow",
    );

    if (totalIssues === 0) {
      log("\n🎉 Security audit passed! No issues found.", "green");
    } else if (criticalCount > 0) {
      log("\n❌ Critical security issues found! Address immediately.", "red");
      process.exit(1);
    } else if (highCount > 0) {
      log("\n⚠️  High-priority security issues found. Address soon.", "yellow");
      process.exit(1);
    } else {
      log("\n⚠️  Security issues found. See report for details.", "yellow");
    }
  } catch (error) {
    log("❌ Error during security audit", "red");
    console.error(error);
    process.exit(1);
  }
}

// Run the security audit
main();
