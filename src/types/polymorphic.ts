/**
 * Polymorphic Component Types for Glass UI
 * Enables type-safe component polymorphism with 'as' prop
 */

import type {
	ComponentPropsWithoutRef,
	ElementType,
	ReactElement,
} from "react";

/**
 * Utility type to extract ref type from element
 */
type ElementRef<T extends ElementType> = T extends keyof JSX.IntrinsicElements
	? JSX.IntrinsicElements[T] extends { ref?: infer R }
		? R
		: never
	: T extends new (
				...arguments_: any[]
			) => infer Instance
		? Instance
		: never;

/**
 * Props that should be omitted when merging with component props
 */
type PropsToOmit<T extends ElementType, P> = keyof (P &
	ComponentPropsWithoutRef<T>);

/**
 * Polymorphic component props without ref
 * @example
 * type ButtonProps<T extends ElementType = 'button'> = PolymorphicComponentProps<T, {
 *   variant?: 'primary' | 'secondary';
 *   size?: 'sm' | 'md' | 'lg';
 * }>;
 */
export type PolymorphicComponentProps<
	T extends ElementType,
	Props = {},
> = Props &
	Omit<ComponentPropsWithoutRef<T>, PropsToOmit<T, Props>> & {
		as?: T;
	};

/**
 * Polymorphic component props with ref
 * @example
 * type ButtonProps<T extends ElementType = 'button'> = PolymorphicComponentPropsWithRef<T, {
 *   variant?: 'primary' | 'secondary';
 * }>;
 */
export type PolymorphicComponentPropsWithRef<
	T extends ElementType,
	Props = {},
> = PolymorphicComponentProps<T, Props> & {
	ref?: ElementRef<T>;
};

/**
 * Type for the actual polymorphic component
 * @example
 * const Button: PolymorphicComponent<ButtonProps, 'button'> = forwardRef(
 *   ({ as: Component = 'button', ...props }, ref) => {
 *     return <Component ref={ref} {...props} />;
 *   }
 * );
 */
export type PolymorphicComponent<Props, DefaultElement extends ElementType> = <
	T extends ElementType = DefaultElement,
>(
	props: PolymorphicComponentPropsWithRef<T, Props>,
) => ReactElement | null;

/**
 * Helper type for extracting valid HTML attributes
 */
export type ValidHTMLAttributes<T extends ElementType> =
	T extends keyof JSX.IntrinsicElements
		? Omit<JSX.IntrinsicElements[T], "ref" | "key">
		: {};

/**
 * Utility to create type-safe polymorphic components
 * @example
 * const Button = createPolymorphicComponent<ButtonProps, 'button'>({
 *   defaultElement: 'button',
 *   displayName: 'GlassButton',
 * });
 */
export type CreatePolymorphicComponent = <
	Props extends Record<string, any>,
	DefaultElement extends ElementType = "div",
>(config: {
	defaultElement: DefaultElement;
	displayName: string;
}) => PolymorphicComponent<Props, DefaultElement>;

/**
 * Type helper for slot components in compound components
 * @example
 * type CardSlots = {
 *   Root: PolymorphicSlot<{ elevated?: boolean }, 'div'>;
 *   Header: PolymorphicSlot<{ sticky?: boolean }, 'header'>;
 *   Body: PolymorphicSlot<{ padded?: boolean }, 'div'>;
 * };
 */
export type PolymorphicSlot<
	Props = {},
	DefaultElement extends ElementType = "div",
> = PolymorphicComponent<Props, DefaultElement>;

/**
 * Constraint for components that must be interactive
 */
export type InteractiveElement =
	| "button"
	| "a"
	| "input"
	| "select"
	| "textarea"
	| "details"
	| "dialog";

/**
 * Props for interactive polymorphic components
 */
export type InteractivePolymorphicProps<
	T extends ElementType,
	Props = {},
> = T extends InteractiveElement ? PolymorphicComponentProps<T, Props> : never;

/**
 * Type for components that must be semantic HTML
 */
export type SemanticElement =
	| "article"
	| "aside"
	| "footer"
	| "header"
	| "main"
	| "nav"
	| "section";

/**
 * Props for semantic polymorphic components
 */
export type SemanticPolymorphicProps<
	T extends ElementType,
	Props = {},
> = T extends SemanticElement
	? PolymorphicComponentProps<T, Props>
	: PolymorphicComponentProps<"div", Props>;

/**
 * Utility type for extracting component props from polymorphic component
 * @example
 * type ButtonElement = ExtractPolymorphicElement<typeof Button>;
 * type ButtonProps = ExtractPolymorphicProps<typeof Button>;
 */
export type ExtractPolymorphicElement<T> = T extends PolymorphicComponent<
	any,
	infer E
>
	? E
	: never;

export type ExtractPolymorphicProps<T> = T extends PolymorphicComponent<
	infer P,
	any
>
	? P
	: never;

/**
 * Type-safe event handler props for polymorphic components
 */
export type PolymorphicEventHandlers<T extends ElementType> = {
	[K in keyof ComponentPropsWithoutRef<T> as K extends `on${string}`
		? K
		: never]?: ComponentPropsWithoutRef<T>[K];
};

/**
 * Type-safe ARIA props for polymorphic components
 */
export type PolymorphicAriaProps<T extends ElementType> = {
	[K in keyof ComponentPropsWithoutRef<T> as K extends `aria-${string}`
		? K
		: never]?: ComponentPropsWithoutRef<T>[K];
};

/**
 * Type-safe data attributes for polymorphic components
 */
export interface PolymorphicDataProps {
	[key: `data-${string}`]: string | number | boolean | undefined;
}

/**
 * Complete polymorphic props with all attributes
 */
export type CompletePolymorphicProps<
	T extends ElementType,
	Props = {},
> = PolymorphicComponentPropsWithRef<T, Props> &
	PolymorphicEventHandlers<T> &
	PolymorphicAriaProps<T> &
	PolymorphicDataProps;

/**
 * Type guard to check if element is interactive
 */
export function isInteractiveElement(
	element: ElementType,
): element is InteractiveElement {
	const interactiveElements: InteractiveElement[] = [
		"button",
		"a",
		"input",
		"select",
		"textarea",
		"details",
		"dialog",
	];
	return interactiveElements.includes(element as any);
}

/**
 * Type guard to check if element is semantic
 */
export function isSemanticElement(
	element: ElementType,
): element is SemanticElement {
	const semanticElements: SemanticElement[] = [
		"article",
		"aside",
		"footer",
		"header",
		"main",
		"nav",
		"section",
	];
	return semanticElements.includes(element as any);
}
