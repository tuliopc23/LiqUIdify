/**
 * Quality Assurance System - Main Entry Point
 * Exports all quality assurance modules for production deployment
 */

// Quality Gates System
export { QualityGateSystem, qualityGateSystem } from './quality-gates';
export type { QualityGateResult, QualityGateConfig } from './quality-gates';

// Production Deployment Optimizer
export {
  ProductionDeploymentOptimizer,
  productionDeploymentOptimizer,
  createOptimizedBuild,
  generateDeploymentReport,
  validateDeploymentReadiness,
} from './production-deployment';
export type {
  ProductionConfig,
  BuildMetrics,
  DeploymentReport,
} from './production-deployment';

// S-tier Validation
export {
  STierValidator,
  sTierValidator,
  runValidation,
  generateValidationReport,
  createDeploymentChecklist,
  createSignOffDocument,
} from './s-tier-validation';
export type {
  ValidationChecklist,
  ValidationResult,
} from './s-tier-validation';

// Convenience exports for easy access
export const runFullQualityAssurance = async () => {
  console.log('🚀 Running full quality assurance pipeline...');

  // Run quality gates
  const gates = await import('./quality-gates');
  const gatesResult = await gates.qualityGateSystem.runQualityGates();

  // Validate deployment readiness
  const deployment = await import('./production-deployment');
  const deploymentReady = await deployment.validateDeploymentReadiness();

  // Run S-tier validation
  const validation = await import('./s-tier-validation');
  const validationResults = await validation.runValidation();
  const validationReport =
    validation.generateValidationReport(validationResults);

  return {
    qualityGates: gatesResult,
    deploymentReady,
    validationResults,
    validationReport,
  };
};

// Default export for easy import
export default {
  runFullQualityAssurance,
};
