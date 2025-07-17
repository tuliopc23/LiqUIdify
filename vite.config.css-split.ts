import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// Custom plugin to split CSS into chunks
function cssChunkSplitterPlugin() {
  return {
    name: 'css-chunk-splitter',
    
    generateBundle(options, bundle) {
      // Find all CSS assets
      const cssAssets = Object.entries(bundle).filter(([name]) => name.endsWith('.css'));
      
      cssAssets.forEach(([name, asset]) => {
        if (asset.type === 'asset' && typeof asset.source === 'string') {
          const css = asset.source;
          
          // Split CSS into chunks
          const chunks = {
            core: [],
            animations: [],
            utilities: [],
            themes: []
          };
          
          // Parse CSS and categorize rules
          const lines = css.split('\n');
          let currentChunk = 'core';
          
          lines.forEach(line => {
            // Detect chunk type based on content
            if (line.includes('@keyframes') || line.includes('animation') || line.includes('transition')) {
              currentChunk = 'animations';
            } else if (line.includes('[data-theme]') || line.includes(':root')) {
              currentChunk = 'themes';
            } else if (line.match(/\.(glass-[a-z]+-[a-z]+)/)) {
              currentChunk = 'utilities';
            }
            
            chunks[currentChunk].push(line);
          });
          
          // Create separate files for each chunk
          Object.entries(chunks).forEach(([chunkName, chunkLines]) => {
            if (chunkLines.length > 0) {
              const chunkContent = chunkLines.join('\n');
              const chunkFileName = name.replace('.css', `-${chunkName}.css`);
              
              // Add chunk as new asset
              bundle[chunkFileName] = {
                type: 'asset',
                fileName: chunkFileName,
                source: chunkContent,
                name: chunkFileName,
                needsCodeReference: false,
                isAsset: true
              };
            }
          });
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src'],
      exclude: ['src/**/*.test.tsx', 'src/**/*.stories.tsx'],
    }),
    cssChunkSplitterPlugin()
  ],
  
  css: {
    modules: false,
    postcss: './postcss.config.optimized.js',
    preprocessorOptions: {
      css: {
        // Enable CSS custom properties
        customProperties: true
      }
    },
    // Extract CSS into separate files
    extract: {
      filename: (assetInfo) => {
        // Custom naming for CSS chunks
        if (assetInfo.name?.includes('core')) return 'glass-core.css';
        if (assetInfo.name?.includes('animations')) return 'glass-animations.css';
        if (assetInfo.name?.includes('utilities')) return 'glass-utilities.css';
        if (assetInfo.name?.includes('themes')) return 'glass-themes.css';
        return 'glass-[name].css';
      }
    }
  },
  
  build: {
    lib: {
      entry: {
        'glass-core': resolve(__dirname, 'src/styles/glass-core.css'),
        'glass-animations': resolve(__dirname, 'src/styles/glass-animations.css'),
        'glass-utilities': resolve(__dirname, 'src/styles/glass-utilities.css'),
        'glass-themes': resolve(__dirname, 'src/styles/glass-themes.css'),
        'glass-critical': resolve(__dirname, 'src/styles/glass-critical.css'),
      },
      formats: ['es'],
    },
    
    cssCodeSplit: true,
    
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return `css/${assetInfo.name}`;
          }
          return assetInfo.name || '';
        },
        
        // Manual chunks for CSS
        manualChunks: {
          'css-core': ['src/styles/glass-core.css'],
          'css-animations': ['src/styles/glass-animations.css'],
          'css-utilities': ['src/styles/glass-utilities.css'],
          'css-themes': ['src/styles/glass-themes.css'],
        }
      }
    },
    
    // Optimize CSS output
    cssMinify: true,
    
    // Set reasonable chunk size limits
    chunkSizeWarningLimit: 10, // 10KB per CSS chunk
  },
  
  experimental: {
    renderBuiltUrl(filename) {
      // Custom URL handling for CSS chunks
      if (filename.includes('.css')) {
        const chunk = filename.match(/glass-(.*?)\.css/)?.[1];
        if (chunk) {
          // Allow lazy loading of non-critical CSS
          return `./css/glass-${chunk}.css`;
        }
      }
      return filename;
    }
  }
});