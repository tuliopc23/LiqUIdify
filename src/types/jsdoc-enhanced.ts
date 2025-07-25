/**
 * Enhanced JSDoc Templates
 *
 * This file provides standardized JSDoc templates for consistent documentation
 * across the LiqUIdify codebase.
 */

/**
 * JSDoc template for component documentation
 */
export const COMPONENT_JSDOC_TEMPLATE = `
/**
 * ComponentName
 * 
 * Description of the component and its purpose.
 * 
 * @example Basic Usage
 * \`\`\`tsx
 * <ComponentName>Content</ComponentName>
 * \`\`\`
 * 
 * @example With Props
 * \`\`\`tsx
 * <ComponentName variant="primary" size="md">Content</ComponentName>
 * \`\`\`
 * 
 * @see {@link ComponentNameProps} - Component props
 */
`;

/**
 * JSDoc template for props documentation
 */
export const PROPS_JSDOC_TEMPLATE = `
/**
 * Props for ComponentName
 */
export interface ComponentNameProps {
  /**
   * Description of the prop
   * @default defaultValue
   */
  propName?: PropType;
}
`;

/**
 * JSDoc template for hook documentation
 */
export const HOOK_JSDOC_TEMPLATE = `
/**
 * useHookName
 * 
 * Description of the hook and its purpose.
 * 
 * @example Basic Usage
 * \`\`\`tsx
 * const result = useHookName(param);
 * \`\`\`
 * 
 * @param param - Description of the parameter
 * @returns Description of the return value
 */
`;

/**
 * JSDoc template for utility function documentation
 */
export const UTILITY_JSDOC_TEMPLATE = `
/**
 * utilityName
 * 
 * Description of the utility function and its purpose.
 * 
 * @example Basic Usage
 * \`\`\`tsx
 * const result = utilityName(param);
 * \`\`\`
 * 
 * @param param - Description of the parameter
 * @returns Description of the return value
 */
`;

/**
 * JSDoc template for type documentation
 */
export const TYPE_JSDOC_TEMPLATE = `
/**
 * TypeName
 * 
 * Description of the type and its purpose.
 * 
 * @example
 * \`\`\`tsx
 * const value: TypeName = { ... };
 * \`\`\`
 */
`;

export default {
	COMPONENT_JSDOC_TEMPLATE,
	PROPS_JSDOC_TEMPLATE,
	HOOK_JSDOC_TEMPLATE,
	UTILITY_JSDOC_TEMPLATE,
	TYPE_JSDOC_TEMPLATE,
};
