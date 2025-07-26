// Export production-safe version by default

// Re-export specific items that may be needed
export type {
  AccessibilityReport,
  ARIACorrection,
  ARIAError,
  ARIASuggestion,
  ARIAValidation,
  ComponentInfo,
  ContrastResult,
  FocusOptions,
  Suggestion,
  Violation,
  ViolationNode,
  Warning,
} from './accessibility-manager-prod';
export * from './accessibility-manager-prod';

export {
  AccessibilityManager,
  accessibilityManager,
} from './accessibility-manager-prod';
