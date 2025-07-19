/**
 * Glass UI - Modular Entry Point
 * 
 * This is the new modular entry point that enables tree-shaking
 * and dynamic imports for optimal bundle sizes
 */

// Always export core bundle (synchronous)
export * from './bundles/core-bundle';

// Lazy-loaded bundles with dynamic imports
export const loadAnimations = () => import('./bundles/animations-bundle');
export const loadAdvanced = () => import('./bundles/advanced-bundle');
export const loadAccessibility = () => import('./bundles/accessibility');
export const loadForms = () => import('./bundles/forms');
export const loadFeedback = () => import('./bundles/feedback');
export const loadLayout = () => import('./bundles/layout');
export const loadNavigation = () => import('./bundles/navigation');

// Feature flags for conditional loading
export const FEATURES = {
  animations: false,
  advanced: false,
  accessibility: false,
  physics: false,
  ssr: 'undefined' === typeof window,
} as const;

// Bundle loader utility
export async function loadBundle(bundleName: keyof typeof bundleLoaders) {
  const loader = bundleLoaders[bundleName];
  if (!loader) {
    throw new Error(`Unknown bundle: ${bundleName}`);
  }
  return loader();
}

const bundleLoaders = {
  animations: loadAnimations,
  advanced: loadAdvanced,
  accessibility: loadAccessibility,
  forms: loadForms,
  feedback: loadFeedback,
  layout: loadLayout,
  navigation: loadNavigation,
} as const;

// Auto-load bundles based on feature flags
export async function autoLoadBundles() {
  const promises = [];
  
  if (FEATURES.animations) {
    promises.push(loadAnimations());
  }
  
  if (FEATURES.advanced) {
    promises.push(loadAdvanced());
  }
  
  if (FEATURES.accessibility) {
    promises.push(loadAccessibility());
  }
  
  return Promise.all(promises);
}

// Tree-shakeable component imports
export { GlassButton } from './components/glass-button';
export { GlassCard } from './components/glass-card';
export { GlassInput } from './components/glass-input';
export { ThemeProvider } from './components/theme-provider';

// Lazy component factory for code-splitting
export async function lazyGlassComponent<T extends keyof typeof componentMap>(
  componentName: T
) {
  const loader = componentMap[componentName];
  return await loader();
}

const componentMap = {
  GlassModal: () => import('./components/glass-modal').then(m => m.GlassModal),
  GlassTooltip: () => import('./components/glass-tooltip').then(m => m.GlassTooltip),
  GlassDropdown: () => import('./components/glass-dropdown').then(m => m.GlassDropdown),
  GlassAccordion: () => import('./components/glass-accordion').then(m => m.GlassAccordion),
  GlassTabs: () => import('./components/glass-tabs').then(m => m.GlassTabs),
  LineChart: () => import('./components/glass-chart').then(m => m.LineChart),
  BarChart: () => import('./components/glass-chart').then(m => m.BarChart),
  DonutChart: () => import('./components/glass-chart').then(m => m.DonutChart),
  CommandPalette: () => import('./components/glass-command').then(m => m.CommandPalette),
} as const;

// Bundle size helpers
export const BUNDLE_SIZES = {
  core: '14.2KB', // Current estimate
  animations: '9.8KB',
  advanced: '7.6KB',
  accessibility: '11.3KB',
  forms: '18.7KB',
  feedback: '8.9KB',
  layout: '12.4KB',
  navigation: '9.2KB',
} as const;

export function getBundleSize(bundleName: keyof typeof BUNDLE_SIZES): string {
  return BUNDLE_SIZES[bundleName];
}

// Performance marks for bundle loading
export function markBundleStart(bundleName: string) {
  if ('undefined' !== typeof window && window.performance) {
    performance.mark(`glass-ui-${bundleName}-start`);
  }
}

export function markBundleEnd(bundleName: string) {
  if ('undefined' !== typeof window && window.performance) {
    performance.mark(`glass-ui-${bundleName}-end`);
    performance.measure(
      `glass-ui-${bundleName}-load`,
      `glass-ui-${bundleName}-start`,
      `glass-ui-${bundleName}-end`
    );
  }
}