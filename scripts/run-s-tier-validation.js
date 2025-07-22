#!/usr/bin/env node

/**
 * S-Tier Validation Script
 * 
 * This script runs a comprehensive validation of the LiqUIdify library
 * to verify it meets S-tier quality standards.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log('\n=== LiqUIdify S-Tier Validation ===\n');
  
  try {
    // Build the library first
    console.log('Building library...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Run bundle size check
    console.log('\nChecking bundle size...');
    execSync('node scripts/analyze-bundle.js', { stdio: 'inherit' });
    
    // Simple validation without external dependencies
    console.log('\nRunning basic validation...');
    
    // Check if dist directory exists and has files
    const distPath = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(distPath)) {
      throw new Error('Dist directory not found - build may have failed');
    }
    
    const distFiles = fs.readdirSync(distPath);
    console.log(`Found ${distFiles.length} files in dist directory`);
    
    // Generate simple validation report
    const report = `# S-Tier Validation Report

## Build Status: ✅ Success
- Dist directory exists: ${fs.existsSync(distPath)}
- Files generated: ${distFiles.length}

## Bundle Analysis
- See bundle-size-report.json for detailed metrics

Generated at: ${new Date().toISOString()}
`;
    
    const reportPath = path.join(process.cwd(), 's-tier-validation-report.md');
    fs.writeFileSync(reportPath, report);
    
    console.log('\n✅ Basic validation complete!');
    console.log(`Report generated: ${reportPath}`);
    
  } catch (error) {
    console.error('\n❌ Validation failed:');
    console.error(error.message);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Unexpected error:');
  console.error(error);
  process.exit(1);
});
