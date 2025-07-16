/**
 * Core utilities for Lite components
 * Minimal dependencies
 */

// CSS classes for lite components
export const liteClasses = {
  button: {
    base: 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    ghost: 'bg-transparent hover:bg-gray-100 focus:ring-gray-500',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  },
  card: {
    base: 'rounded-2xl backdrop-blur-md transition-all duration-300 ease-out',
    default: 'bg-white/80 shadow-lg hover:shadow-xl',
    elevated: 'bg-white/90 shadow-xl hover:shadow-2xl',
    outline: 'bg-transparent border-2 border-gray-200',
  },
  modal: {
    backdrop: 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-200',
    content: 'bg-white rounded-2xl p-6 w-full shadow-2xl transition-transform duration-200',
  },
};