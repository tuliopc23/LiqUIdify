#!/usr/bin/env node

/**
 * Dependency Optimization Script
 * Finds duplicate dependencies and suggests optimizations
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';

function analyzeDependencies() {
  console.log('Analyzing dependencies for duplicates and optimization opportunities...\n');
  
  // Get npm ls output
  let npmList;
  try {
    npmList = execSync('npm ls --json', { encoding: 'utf8' });
  } catch (error) {
    // npm ls returns non-zero exit code if there are issues
    npmList = error.stdout;
  }
  
  const tree = JSON.parse(npmList);
  const dependencies = new Map();
  const duplicates = new Map();
  
  // Traverse dependency tree
  function traverse(deps, path = []) {
    if (!deps) return;
    
    Object.entries(deps).forEach(([name, info]) => {
      const version = info.version;
      const key = `${name}@${version}`;
      
      if (!dependencies.has(name)) {
        dependencies.set(name, new Set());
      }
      
      dependencies.get(name).add({
        version,
        path: [...path, name].join(' > '),
        resolved: info.resolved,
      });
      
      // Recurse into dependencies
      if (info.dependencies) {
        traverse(info.dependencies, [...path, name]);
      }
    });
  }
  
  traverse(tree.dependencies);
  
  // Find duplicates
  dependencies.forEach((versions, name) => {
    if (versions.size > 1) {
      duplicates.set(name, Array.from(versions));
    }
  });
  
  // Report findings
  if (duplicates.size === 0) {
    console.log('✓ No duplicate dependencies found!');
  } else {
    console.log(`Found ${duplicates.size} packages with multiple versions:\n`);
    
    duplicates.forEach((versions, name) => {
      console.log(`📦 ${name}`);
      versions.forEach(({ version, path }) => {
        console.log(`   - ${version} (${path})`);
      });
      console.log('');
    });
    
    console.log('\n📋 Optimization suggestions:');
    console.log('1. Run "npm dedupe" to flatten the dependency tree');
    console.log('2. Check if all dependencies need the same version');
    console.log('3. Consider using "overrides" in package.json for version alignment');
  }
  
  // Check bundle size impact
  console.log('\n📊 Analyzing bundle impact...');
  
  const packageJson = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'));
  const heavyDeps = [
    { name: 'gsap', threshold: 100 },
    { name: 'framer-motion', threshold: 150 },
    { name: '@radix-ui', threshold: 50 },
    { name: 'lucide-react', threshold: 100 },
  ];
  
  console.log('\nHeavy dependencies analysis:');
  heavyDeps.forEach(({ name, threshold }) => {
    const isDep = Object.keys(packageJson.dependencies || {}).some(dep => dep.includes(name));
    const isDevDep = Object.keys(packageJson.devDependencies || {}).some(dep => dep.includes(name));
    
    if (isDep || isDevDep) {
      console.log(`- ${name}: ${isDep ? 'production' : 'dev'} dependency`);
      if (isDep) {
        console.log(`  ⚠️  Consider lazy loading if bundle > ${threshold}KB`);
      }
    }
  });
  
  // Suggest optimizations
  console.log('\n🚀 Additional optimization suggestions:');
  console.log('1. Move large dependencies to peerDependencies if possible');
  console.log('2. Use dynamic imports for heavy components');
  console.log('3. Consider lighter alternatives for heavy dependencies');
  console.log('4. Enable tree-shaking by using ES modules');
  console.log('5. Mark pure functions with /*#__PURE__*/ comments');
}

// Run analysis
analyzeDependencies();
