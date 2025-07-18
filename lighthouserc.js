module.exports = {
  ci: {
    collect: {
      // Dynamic URL collection based on environment variable
      url: process.env.PAGE_PATH
        ? [`http://localhost:3000${process.env.PAGE_PATH}`]
        : [
            'http://localhost:3000/',
            'http://localhost:3000/?path=/story/components-button--default',
            'http://localhost:3000/?path=/story/components-card--default',
            'http://localhost:3000/?path=/story/components-input--default',
            'http://localhost:3000/?path=/story/components-modal--default',
            'http://localhost:3000/?path=/story/forms-glassinput--default',
            'http://localhost:3000/?path=/story/navigation-glassnav--default',
          ],
      numberOfRuns: 3,
      settings: {
        // Enhanced settings for comprehensive accessibility testing
        preset: 'desktop',
        throttling: {
          cpuSlowdownMultiplier: 1,
          rttMs: 40,
          throughputKbps: 10240,
        },
        screenEmulation: {
          mobile: false,
          width: 1920,
          height: 1080,
          deviceScaleFactor: 1,
          disabled: false,
        },
        // Enable all accessibility audits
        onlyAudits: [
          // Core Web Vitals
          'first-contentful-paint',
          'largest-contentful-paint',
          'cumulative-layout-shift',
          'total-blocking-time',
          'speed-index',

          // Accessibility audits
          'accesskeys',
          'aria-allowed-attr',
          'aria-command-name',
          'aria-hidden-body',
          'aria-hidden-focus',
          'aria-input-field-name',
          'aria-meter-name',
          'aria-progressbar-name',
          'aria-required-attr',
          'aria-required-children',
          'aria-required-parent',
          'aria-roles',
          'aria-toggle-field-name',
          'aria-tooltip-name',
          'aria-treeitem-name',
          'aria-valid-attr-value',
          'aria-valid-attr',
          'button-name',
          'bypass',
          'color-contrast',
          'definition-list',
          'dlitem',
          'document-title',
          'duplicate-id-active',
          'duplicate-id-aria',
          'form-field-multiple-labels',
          'frame-title',
          'heading-order',
          'html-has-lang',
          'html-lang-valid',
          'image-alt',
          'image-redundant-alt',
          'input-image-alt',
          'label',
          'landmark-one-main',
          'link-name',
          'list',
          'listitem',
          'meta-refresh',
          'meta-viewport',
          'object-alt',
          'select-name',
          'skip-link',
          'tabindex',
          'table-fake-caption',
          'td-headers-attr',
          'th-has-data-cells',
          'valid-lang',
          'video-caption',

          // Performance audits
          'total-byte-weight',
          'unused-javascript',
          'unused-css-rules',
          'modern-image-formats',
          'efficient-animated-content',
          'preload-lcp-image',
          'uses-optimized-images',
          'uses-text-compression',
          'uses-responsive-images',

          // Best practices
          'is-on-https',
          'uses-http2',
          'no-vulnerable-libraries',
          'errors-in-console',
          'image-aspect-ratio',
          'image-size-responsive',
          'preload-fonts',

          // SEO
          'document-title',
          'meta-description',
          'http-status-code',
          'link-text',
          'is-crawlable',
          'robots-txt',
          'hreflang',
          'canonical',
        ],
        // Emulate different devices for comprehensive testing
        emulatedFormFactor: 'desktop',
        locale: 'en-US',
        // Disable storage reset to test persistent states
        disableStorageReset: false,
        // Enable Chrome DevTools Protocol for enhanced debugging
        channel: 'cli',
        chromePath: undefined,
        chromeFlags: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-extensions',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding',
          '--disable-features=VizDisplayCompositor',
          '--force-color-profile=srgb',
          '--enable-logging',
          '--log-level=0',
        ],
      },
    },
    assert: {
      assertions: {
        // S-tier requirements - STRICT enforcement
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.95 }],
        'categories:seo': ['warn', { minScore: 0.9 }],

        // Critical accessibility checks - ZERO tolerance
        'color-contrast': ['error', { minScore: 1.0 }],
        'aria-valid-attr': ['error', { minScore: 1.0 }],
        'aria-roles': ['error', { minScore: 1.0 }],
        'button-name': ['error', { minScore: 1.0 }],
        'duplicate-id': ['error', { minScore: 1.0 }],
        'image-alt': ['error', { minScore: 1.0 }],
        label: ['error', { minScore: 1.0 }],
        'link-name': ['error', { minScore: 1.0 }],
        tabindex: ['error', { minScore: 1.0 }],
        'aria-hidden-focus': ['error', { minScore: 1.0 }],
        'aria-required-attr': ['error', { minScore: 1.0 }],
        'aria-valid-attr-value': ['error', { minScore: 1.0 }],

        // High priority accessibility checks
        'heading-order': ['warn', { minScore: 0.9 }],
        'landmark-one-main': ['warn', { minScore: 1.0 }],
        bypass: ['warn', { minScore: 1.0 }],
        'document-title': ['error', { minScore: 1.0 }],
        'html-has-lang': ['error', { minScore: 1.0 }],
        'meta-viewport': ['warn', { minScore: 1.0 }],

        // Performance checks for S-tier bundle requirements
        'first-contentful-paint': ['warn', { maxNumericValue: 1800 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
        'speed-index': ['warn', { maxNumericValue: 3000 }],

        // Bundle size check - 30KB S-tier target
        'total-byte-weight': ['error', { maxNumericValue: 30720 }],
        'unused-javascript': ['warn', { maxNumericValue: 20000 }],
        'unused-css-rules': ['warn', { maxNumericValue: 5000 }],

        // Modern web standards
        'uses-http2': ['warn', { minScore: 1.0 }],
        'uses-text-compression': ['warn', { minScore: 1.0 }],
        'modern-image-formats': ['warn', { minScore: 0.9 }],
        'efficient-animated-content': ['warn', { minScore: 0.9 }],

        // Security and best practices
        'is-on-https': ['warn', { minScore: 1.0 }],
        'no-vulnerable-libraries': ['error', { minScore: 1.0 }],
        'errors-in-console': ['warn', { maxNumericValue: 0 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
      // Enhanced reporting
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    },
    server: {
      port: 9001,
      storage: {
        sqlDatabasePath: '.lighthouseci/lhci.db',
      },
    },
    wizard: {
      // Configuration for setup wizard
      chromeFlags: '--no-sandbox --disable-setuid-sandbox',
    },
  },
  // Enhanced configuration for different environments
  environments: {
    development: {
      collect: {
        numberOfRuns: 1,
        settings: {
          throttling: {
            cpuSlowdownMultiplier: 1,
          },
        },
      },
      assert: {
        preset: 'lighthouse:recommended',
        assertions: {
          'categories:accessibility': ['error', { minScore: 0.95 }],
        },
      },
    },
    production: {
      collect: {
        numberOfRuns: 5,
        settings: {
          throttling: {
            cpuSlowdownMultiplier: 4,
            rttMs: 150,
            throughputKbps: 1638.4,
          },
        },
      },
      assert: {
        assertions: {
          'categories:accessibility': ['error', { minScore: 0.95 }],
          'categories:performance': ['error', { minScore: 0.9 }],
        },
      },
    },
  },
};
