/**
 * Stable Key Generation Utilities
 *
 * Provides utilities for generating stable, predictable keys for React components
 * to avoid key prop warnings and ensure consistent rendering.
 */

/**
 * Generates a stable key for an item based on its properties and context
 * @param item - The item to generate a key for
 * @param prefix - A prefix to add to the key for context
 * @param index - Fallback index if no stable property is found
 * @returns A stable string key
 */
export function getItemKey<T extends Record<string, unknown>>(
	item: T,
	prefix = "item",
	index = 0,
): string {
	// Try to find a stable identifier property
	const stableProps = ["id", "key", "href", "label", "name", "value"];

	for (const prop of stableProps) {
		if (item[prop] && typeof item[prop] === "string") {
			return `${prefix}-${item[prop]}`;
		}
	}

	// If no stable property found, use index as fallback
	return `${prefix}-${index}`;
}

/**
 * Generates a static key for simple cases where you have a prefix and identifier
 * @param prefix - The prefix for the key
 * @param identifier - The identifier (usually an index or id)
 * @returns A stable string key
 */
export function generateStaticKey(
	prefix: string,
	identifier: string | number,
): string {
	return `${prefix}-${identifier}`;
}

/**
 * Generates a key for nested items with multiple levels
 * @param parts - Array of key parts to join
 * @returns A stable string key
 */
function _generateNestedKey(...parts: Array<string | number>): string {
	return parts.join("-");
}

/**
 * Generates a key with timestamp for unique identification when needed
 * @param prefix - The prefix for the key
 * @param useTimestamp - Whether to include timestamp for uniqueness
 * @returns A stable or unique string key
 */
function _generateTimestampKey(prefix: string, useTimestamp = false): string {
	if (useTimestamp) {
		return `${prefix}-${Date.now()}`;
	}
	return prefix;
}
