// Export production-safe version by default
export * from './accessibility-manager-prod';

// Re-export specific items that may be needed
export type {
  AccessibilityReport,
  Violation,
  ViolationNode,
  Warning,
  Suggestion,
  ComponentInfo,
  ContrastResult,
  FocusOptions,
  ARIAValidation,
  ARIAError,
  ARIASuggestion,
  ARIACorrection
} from './accessibility-manager-prod';

export { AccessibilityManager, accessibilityManager } from './accessibility-manager-prod';