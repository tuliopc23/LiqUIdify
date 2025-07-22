/**
 * Compound Component Factory
 *
 * This module provides utilities for creating compound components with consistent
 * patterns and proper forwardRef usage throughout the Glass UI library.
 */

import { Slot } from "@radix-ui/react-slot";
import React, { forwardRef, useMemo } from "react";
import { cn } from "@/core/utils/classname";
import type {
	ComponentPropsBuilder,
	CompoundComponentProps,
	UnifiedGlassProps,
} from "./base-component";

// Context for compound components
export interface CompoundComponentContext {
	size?: string;
	variant?: string;
	disabled?: boolean;
	readonly?: boolean;
	[key: string]: any;
}

// Create compound component context
export function createCompoundContext<T extends CompoundComponentContext>(
	displayName: string,
	defaultValue?: T,
) {
	const Context = React.createContext<T | undefined>(defaultValue);

	Context.displayName = `${displayName}Context`;

	const Provider = Context.Provider;

	const useContext = () => {
		const context = React.useContext(Context);
		if (!context) {
			throw new Error(
				`use${displayName} must be used within a ${displayName}Provider`,
			);
		}
		return context;
	};

	return { Provider, useContext, Context };
}

// Compound component factory options
export interface CompoundComponentOptions<T extends HTMLElement> {
	/** Component display name */
	displayName: string;
	/** Default HTML element */
	defaultElement?: keyof JSX.IntrinsicElements;
	/** Default class names */
	defaultClassName?: string;
	/** Default props */
	defaultProps?: Partial<ComponentPropsBuilder<T>>;
	/** Enable asChild prop */
	asChild?: boolean;
	/** Forward ref */
	forwardRef?: boolean;
}

/**
 * Create a compound component with consistent patterns
 */
export function createCompoundComponent<
	T extends HTMLElement = HTMLDivElement,
	P extends Record<string, any> = {},
>(options: CompoundComponentOptions<T>) {
	const {
		displayName,
		defaultElement = "div",
		defaultClassName,
		defaultProps = {},
		asChild = true,
		forwardRef: shouldForwardRef = true,
	} = options;

	type ComponentProps = ComponentPropsBuilder<T> & P & CompoundComponentProps;

	const Component = shouldForwardRef
		? forwardRef<T, ComponentProps>(
				({ className, asChild: asChildProp, children, ...props }, ref) => {
					const Comp = (asChildProp && asChild ? Slot : defaultElement) as any;

					const mergedProps = useMemo(
						() => ({
							...defaultProps,
							...props,
							className: cn(defaultClassName, className),
						}),
						[props, className],
					);

					return (
						<Comp ref={ref} {...mergedProps}>
							{children}
						</Comp>
					);
				},
			)
		: ({
				className,
				asChild: asChildProp,
				children,
				...props
			}: ComponentProps) => {
				const Comp = (asChildProp && asChild ? Slot : defaultElement) as any;

				const mergedProps = useMemo(
					() => ({
						...defaultProps,
						...props,
						className: cn(defaultClassName, className),
					}),
					[props, className],
				);

				return <Comp {...mergedProps}>{children}</Comp>;
			};

	if ("displayName" in Component) {
		Component.displayName = displayName;
	}

	return Component;
}

/**
 * Create a compound component with context
 */
export function createCompoundComponentWithContext<
	T extends HTMLElement = HTMLDivElement,
	P extends Record<string, any> = {},
	C extends CompoundComponentContext = CompoundComponentContext,
>(
	options: CompoundComponentOptions<T> & {
		contextDefaultValue?: C;
	},
) {
	const { contextDefaultValue, ...componentOptions } = options;

	const { Provider, useContext, Context } = createCompoundContext<C>(
		options.displayName,
		contextDefaultValue,
	);

	const Component = createCompoundComponent<T, P>(componentOptions);

	return {
		Component,
		Provider,
		useContext,
		Context,
	};
}

/**
 * Higher-order component for adding glass effects to compound components
 */
export function withGlassEffects<
	T extends HTMLElement,
	P extends Record<string, any>,
>(Component: React.ComponentType<P>, defaultGlassConfig?: UnifiedGlassProps) {
	const WrappedComponent = forwardRef<T, P & UnifiedGlassProps>(
		({ glassEffect, variant, size, ...props }, ref) => {
			const glassProps = useMemo(
				() => ({
					...defaultGlassConfig,
					glassEffect,
					variant,
					size,
				}),
				[glassEffect, variant, size, defaultGlassConfig],
			);

			return <Component ref={ref} {...glassProps} {...(props as any)} />;
		},
	);

	WrappedComponent.displayName = `withGlassEffects(${Component.displayName || "Component"})`;

	return WrappedComponent;
}

/**
 * Utility for creating polymorphic compound components
 */
export function createPolymorphicCompoundComponent<
	T extends React.ElementType = "div",
	P extends Record<string, any> = {},
>(
	options: CompoundComponentOptions<HTMLElement> & {
		/** Default element type */
		defaultAs?: T;
	},
) {
	const { defaultAs = "div" as T, ...componentOptions } = options;

	type PolymorphicProps<As extends React.ElementType> = {
		as?: As;
	} & React.ComponentPropsWithoutRef<As> &
		P;

	const Component = forwardRef<any, PolymorphicProps<T>>(
		({ as, className, children, ...props }, ref) => {
			const Comp = as || defaultAs;

			const mergedProps = useMemo(
				() => ({
					...componentOptions.defaultProps,
					...props,
					className: cn(componentOptions.defaultClassName, className),
				}),
				[props, className],
			);

			return (
				<Comp ref={ref} {...mergedProps}>
					{children}
				</Comp>
			);
		},
	);

	Component.displayName = options.displayName;

	return Component;
}

/**
 * Utility for creating compound component collections
 */
export function createCompoundComponentCollection<
	T extends Record<string, any>,
>(components: T, rootComponent: React.ComponentType<any>) {
	// Attach sub-components to root component
	Object.entries(components).forEach(([key, component]) => {
		(rootComponent as any)[key] = component;
	});

	return rootComponent as React.ComponentType<any> & T;
}

/**
 * Hook for managing compound component state
 */
export function useCompoundComponentState<T extends Record<string, any>>(
	initialState: T,
	context?: React.Context<T | undefined>,
) {
	const [state, setState] = React.useState<T>(initialState);

	// Always call useContext, but use a default context if none provided
	const defaultContext = React.createContext<T | undefined>(undefined);
	const contextToUse = context || defaultContext;
	const contextValue = React.useContext(contextToUse);

	const mergedState = useMemo(
		() => ({
			...initialState,
			...contextValue,
			...state,
		}),
		[initialState, contextValue, state],
	);

	const updateState = React.useCallback((updates: Partial<T>) => {
		setState((prev) => ({ ...prev, ...updates }));
	}, []);

	return { state: mergedState, updateState };
}

/**
 * Utility for creating accessible compound components
 */
export function createAccessibleCompoundComponent<
	T extends HTMLElement = HTMLDivElement,
	P extends Record<string, any> = {},
>(
	options: CompoundComponentOptions<T> & {
		/** Default ARIA role */
		defaultRole?: string;
		/** Default ARIA attributes */
		defaultAriaAttributes?: Record<string, string | boolean>;
	},
) {
	const { defaultRole, defaultAriaAttributes, ...componentOptions } = options;

	const Component = createCompoundComponent<T, P>({
		...componentOptions,
		defaultProps: {
			...componentOptions.defaultProps,
			role: defaultRole,
			...defaultAriaAttributes,
		},
	});

	return Component;
}

/**
 * Utility for creating responsive compound components
 */
export function createResponsiveCompoundComponent<
	T extends HTMLElement = HTMLDivElement,
	P extends Record<string, any> = {},
>(
	options: CompoundComponentOptions<T> & {
		/** Responsive breakpoints */
		breakpoints?: Record<string, string>;
		/** Default responsive props */
		defaultResponsiveProps?: Record<string, any>;
	},
) {
	const { breakpoints, defaultResponsiveProps, ...componentOptions } = options;

	const Component = createCompoundComponent<T, P>({
		...componentOptions,
		defaultProps: {
			...componentOptions.defaultProps,
			...defaultResponsiveProps,
		},
	});

	return Component;
}

// Export main compound component for compatibility
export const CompoundComponent = createCompoundComponent;
