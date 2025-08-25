#!/usr/bin/env node
// Codemod: wrap runnable snippet examples with PreviewCodeTabs and ensure absolute imports.
// Scans apps/docs/components/**/*.mdx and wraps usages like <SomethingExample />.
import { glob } from 'glob';
import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const docsDir = path.join(root, 'apps/docs/components');

const ensureImport = (src, importLine) => {
  if (src.includes(importLine)) return src;
  // insert after frontmatter or at top
  const fmEnd = src.indexOf('---', 3);
  if (src.startsWith('---') && fmEnd !== -1) {
    const before = src.slice(0, fmEnd + 3);
    const after = src.slice(fmEnd + 3);
    return `${before}\n\n${importLine}\n${after}`;
  }
  return `${importLine}\n\n${src}`;
};

const wrapUsage = (src, name) => {
  const pattern = new RegExp(`(^|\n)\s*<${name}(\s[^>]*)?>\\s*</${name}>|(^|\n)\s*<${name}(\s*[^>]*)?/?>`, 'g');
  let changed = false;
  src = src.replace(pattern, (m) => {
    changed = true;
    const code = m.trim();
    return `\n<PreviewCodeTabs code={\`${code}\`}>\n  ${code}\n</PreviewCodeTabs>\n`;
  });
  return { src, changed };
};

const run = async () => {
  const files = await glob('apps/docs/components/**/*.mdx');
  let updated = [];

  for (const file of files) {
    let src = await fs.readFile(file, 'utf8');
    let fileChanged = false;

    // Ensure PreviewCodeTabs import absolute
    src = ensureImport(src, "import PreviewCodeTabs from '/snippets/components/PreviewCodeTabs'");

    // Detect any JSX tag ending with Example and wrap it
    const exampleTagRegex = /<([A-Z][A-Za-z0-9]+Example)(\s[^>]*)?(\/)?>(?:\s*<\/\1>)?/g;
    let match;
    const seen = new Set();
    while ((match = exampleTagRegex.exec(src))) {
      const name = match[1];
      if (seen.has(name)) continue;
      seen.add(name);
      const res = wrapUsage(src, name);
      if (res.changed) {
        src = res.src;
        fileChanged = true;
        // ensure import exists for the snippet (idempotent if already there)
        const importLine = `import ${name} from '/snippets/components/${name}.jsx'`;
        src = ensureImport(src, importLine);
      }
    }

    if (fileChanged) {
      await fs.writeFile(file, src, 'utf8');
      updated.push(path.relative(root, file));
    }
  }

  if (updated.length) {
    console.log('Updated MDX files with live previews:');
    for (const f of updated) console.log(' -', f);
  } else {
    console.log('No changes needed.');
  }
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
