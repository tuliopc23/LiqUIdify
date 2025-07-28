import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { type BundleOptions, bundle } from 'lightningcss';

const inputFile = join(process.cwd(), 'libs/components/src/styles/glass.css');
const outputFile = join(process.cwd(), 'dist/liquidui.css');

// Ensure output directory exists
mkdirSync(dirname(outputFile), { recursive: true });

const options: BundleOptions<{ [key: string]: number }> = {
  filename: inputFile,
  minify: process.env.NODE_ENV === 'production',
  sourceMap: true,
  targets: {
    chrome: 95 << 16,
    firefox: 91 << 16,
    safari: 15 << 16,
    edge: 95 << 16,
  },
  drafts: {
    customMedia: true,
  },
  // Features are controlled via the Features enum in Lightning CSS
  // include: Features.Nesting | Features.CustomProperties,
  // exclude: Features.LogicalProperties,
};

async function buildCSS() {
  try {
    const { code, map } = bundle(options);

    writeFileSync(outputFile, code);
    if (map) {
      writeFileSync(`${outputFile}.map`, map.toString());
    }

    console.log('✨ CSS built successfully with Lightning CSS!');
    console.log(`📦 Output: ${outputFile}`);
  } catch (error) {
    console.error('Error building CSS:', error);
    process.exit(1);
  }
}

// Run the build
buildCSS();
