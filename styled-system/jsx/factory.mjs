import { createElement, forwardRef, useMemo } from "react";
import { css, cva, cx } from "../css/index.mjs";
import { normalizeHTMLProps, splitProps } from "../helpers.mjs";
import {
	composeCvaFn,
	composeShouldForwardProps,
	defaultShouldForwardProp,
	getDisplayName,
} from "./factory-helper.mjs";
import { isCssProperty } from "./is-valid-prop.mjs";

function styledFn(Dynamic, configOrCva = {}, options = {}) {
	const cvaFn =
		configOrCva.__cva__ || configOrCva.__recipe__
			? configOrCva
			: cva(configOrCva);

	const forwardFn = options.shouldForwardProp || defaultShouldForwardProp;
	const shouldForwardProp = (prop) => {
		if (options.forwardProps?.includes(prop)) return true;
		return forwardFn(prop, cvaFn.variantKeys);
	};

	const defaultProps = Object.assign(
		options.dataAttr && configOrCva.__name__
			? { "data-recipe": configOrCva.__name__ }
			: {},
		options.defaultProps,
	);

	const CvaFn = composeCvaFn(Dynamic.__cva__, cvaFn);
	const ShouldForwardProps = composeShouldForwardProps(
		Dynamic,
		shouldForwardProp,
	);
	const Base = Dynamic.__base__ || Dynamic;

	const StyledComponent = /* @__PURE__ */ forwardRef(
		function StyledComponent(props, ref) {
			const { as: Element = Base, unstyled, children, ...restProps } = props;

			const combinedProps = useMemo(
				() => Object.assign({}, defaultProps, restProps),
				[restProps],
			);

			const [
				htmlProps,
				forwardedProps,
				variantProps,
				styleProps,
				elementProps,
			] = useMemo(() => {
				return splitProps(
					combinedProps,
					normalizeHTMLProps.keys,
					ShouldForwardProps,
					CvaFn.variantKeys,
					isCssProperty,
				);
			}, [combinedProps]);

			function recipeClass() {
				const { css: cssStyles, ...propStyles } = styleProps;
				const compoundVariantStyles =
					CvaFn.__getCompoundVariantCss__?.(variantProps);
				return cx(
					CvaFn(variantProps, false),
					css(compoundVariantStyles, propStyles, cssStyles),
					combinedProps.className,
				);
			}

			function cvaClass() {
				const { css: cssStyles, ...propStyles } = styleProps;
				const cvaStyles = CvaFn.raw(variantProps);
				return cx(
					css(cvaStyles, propStyles, cssStyles),
					combinedProps.className,
				);
			}

			const classes = () => {
				if (unstyled) {
					const { css: cssStyles, ...propStyles } = styleProps;
					return cx(css(propStyles, cssStyles), combinedProps.className);
				}
				return configOrCva.__recipe__ ? recipeClass() : cvaClass();
			};

			return createElement(
				Element,
				{
					ref,
					...forwardedProps,
					...elementProps,
					...normalizeHTMLProps(htmlProps),
					className: classes(),
				},
				combinedProps.children ?? children,
			);
		},
	);

	const name = getDisplayName(Base);

	StyledComponent.displayName = `styled.${name}`;
	StyledComponent.__cva__ = CvaFn;
	StyledComponent.__base__ = Base;
	StyledComponent.__shouldForwardProps__ = shouldForwardProp;

	return StyledComponent;
}

function createJsxFactory() {
	const cache = new Map();

	return new Proxy(styledFn, {
		apply(_, __, args) {
			return styledFn(...args);
		},
		get(_, el) {
			if (!cache.has(el)) {
				cache.set(el, styledFn(el));
			}
			return cache.get(el);
		},
	});
}

export const styled = /* @__PURE__ */ createJsxFactory();
