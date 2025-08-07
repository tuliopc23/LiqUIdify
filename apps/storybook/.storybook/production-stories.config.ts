/**
 * Production Components Configuration
 * Only showcase stable, production-ready components
 */

export const PRODUCTION_COMPONENTS = {
  // Core UI Components
  core: [
    'glass-button-refactored',
    'glass-card-refactored',
    'glass-input',
    'glass-modal',
    'glass-badge',
    'glass-avatar'
  ],
  
  // Form Components
  forms: [
    'glass-checkbox',
    'glass-radio-group',
    'glass-select',
    'glass-textarea',
    'glass-switch',
    'glass-form-field'
  ],
  
  // Layout Components
  layout: [
    'glass-accordion',
    'glass-tabs',
    'glass-drawer',
    'glass-breadcrumbs'
  ],
  
  // Feedback Components
  feedback: [
    'glass-alert',
    'glass-toast',
    'glass-notification',
    'glass-loading',
    'glass-progress',
    'glass-spinner'
  ],
  
  // Navigation Components
  navigation: [
    'glass-dropdown',
    'glass-pagination',
    'glass-mobile-nav'
  ],
  
  // Data Display
  dataDisplay: [
    'glass-table',
    'glass-chart',
    'glass-badge',
    'glass-tooltip'
  ]
};

// Components to exclude from Storybook (experimental/demo)
export const EXCLUDED_COMPONENTS = [
  'glass-playground',
  'glass-demo',
  'glass-accessible-demo',
  'glass-focus-demo',
  'glass-performance-dashboard',
  'glass-visually-hidden'
];

// Design system configuration
export const DESIGN_SYSTEM = {
  colors: {
    primary: {
      glass: 'rgba(255, 255, 255, 0.1)',
      glassBorder: 'rgba(255, 255, 255, 0.2)',
      glassHover: 'rgba(255, 255, 255, 0.15)',
      accent: '#007AFF',
      accentHover: '#0051D5'
    },
    semantic: {
      success: '#34C759',
      warning: '#FF9500',
      error: '#FF3B30',
      info: '#5AC8FA'
    }
  },
  
  effects: {
    blur: {
      sm: '8px',
      md: '12px',
      lg: '20px',
      xl: '40px'
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px'
    }
  },
  
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif',
    sizes: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px'
    }
  }
};
