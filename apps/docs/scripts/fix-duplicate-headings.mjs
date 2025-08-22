#!/usr/bin/env node
/**
 * fix-duplicate-headings.mjs
 * 
 * Finds and optionally fixes duplicate headings in MDX files.
 * Usage: node scripts/fix-duplicate-headings.mjs [--fix] [--dry-run]
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const componentsDir = path.resolve(__dirname, '..', 'components');

const args = process.argv.slice(2);
const shouldFix = args.includes('--fix');
const dryRun = args.includes('--dry-run');

async function findMdxFiles(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isFile() && entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    } else if (entry.isDirectory()) {
      files.push(...await findMdxFiles(fullPath));
    }
  }
  
  return files;
}

function extractHeadings(content) {
  const lines = content.split('\n');
  const headings = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('### ')) {
      const text = line.substring(4).trim();
      headings.push({
        line: i,
        text,
        fullLine: line
      });
    }
  }
  
  return headings;
}

function findDuplicates(headings) {
  const seen = new Map();
  const duplicates = [];
  
  for (const heading of headings) {
    if (seen.has(heading.text)) {
      duplicates.push({
        original: seen.get(heading.text),
        duplicate: heading
      });
    } else {
      seen.set(heading.text, heading);
    }
  }
  
  return duplicates;
}

function fixDuplicates(content, duplicates) {
  const lines = content.split('\n');
  let changeCount = 0;
  
  // Sort duplicates by line number (descending) to avoid index shifting
  const sortedDuplicates = duplicates
    .map(d => d.duplicate)
    .sort((a, b) => b.line - a.line);
    
  for (const duplicate of sortedDuplicates) {
    // Remove the duplicate line
    lines.splice(duplicate.line, 1);
    changeCount++;
  }
  
  return { content: lines.join('\n'), changeCount };
}

async function processFile(filePath) {
  const content = await readFile(filePath, 'utf8');
  const headings = extractHeadings(content);
  const duplicates = findDuplicates(headings);
  
  if (duplicates.length === 0) {
    return { duplicates: 0, changed: false };
  }
  
  console.log(`\n📄 ${path.relative(process.cwd(), filePath)}`);
  console.log(`   Found ${duplicates.length} duplicate heading(s):`);
  
  for (const dup of duplicates) {
    console.log(`   - Line ${dup.duplicate.line + 1}: "${dup.duplicate.text}"`);
  }
  
  if (shouldFix && !dryRun) {
    const { content: newContent, changeCount } = fixDuplicates(content, duplicates);
    await writeFile(filePath, newContent, 'utf8');
    console.log(`   ✅ Removed ${changeCount} duplicate heading(s)`);
    return { duplicates: duplicates.length, changed: true };
  } else {
    console.log(`   ${dryRun ? '🔍 Would remove' : '❌ Use --fix to remove'} ${duplicates.length} duplicate(s)`);
    return { duplicates: duplicates.length, changed: false };
  }
}

async function main() {
  console.log('🔍 Scanning for duplicate headings in MDX files...\n');
  
  const mdxFiles = await findMdxFiles(componentsDir);
  console.log(`Found ${mdxFiles.length} MDX files to process`);
  
  let totalDuplicates = 0;
  let filesChanged = 0;
  
  for (const file of mdxFiles) {
    try {
      const result = await processFile(file);
      totalDuplicates += result.duplicates;
      if (result.changed) filesChanged++;
    } catch (error) {
      console.error(`❌ Error processing ${file}: ${error.message}`);
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`   Total duplicate headings found: ${totalDuplicates}`);
  console.log(`   Files with duplicates: ${filesChanged > 0 ? filesChanged : mdxFiles.filter(async f => (await processFile(f)).duplicates > 0).length}`);
  
  if (shouldFix && !dryRun) {
    console.log(`   Files fixed: ${filesChanged}`);
  } else {
    console.log('\n💡 Run with --fix to automatically remove duplicates');
    console.log('💡 Run with --dry-run --fix to preview changes');
  }
}

main().catch(console.error);
