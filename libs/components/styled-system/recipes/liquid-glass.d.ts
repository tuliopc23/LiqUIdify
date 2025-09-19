/* eslint-disable */
import type { ConditionalValue } from "../types/index";
import type { DistributiveOmit, Pretty } from "../types/system-types";

interface LiquidGlassVariant {
	/**
	 * @default "medium"
	 */
	intensity: "subtle" | "medium" | "strong";
	/**
	 * @default "md"
	 */
	size: "sm" | "md" | "lg";
}

type LiquidGlassVariantMap = {
	[key in keyof LiquidGlassVariant]: Array<LiquidGlassVariant[key]>;
};

export type LiquidGlassVariantProps = {
	[key in keyof LiquidGlassVariant]?:
		| ConditionalValue<LiquidGlassVariant[key]>
		| undefined;
};

export interface LiquidGlassRecipe {
	__type: LiquidGlassVariantProps;
	(props?: LiquidGlassVariantProps): string;
	raw: (props?: LiquidGlassVariantProps) => LiquidGlassVariantProps;
	variantMap: LiquidGlassVariantMap;
	variantKeys: Array<keyof LiquidGlassVariant>;
	splitVariantProps<Props extends LiquidGlassVariantProps>(
		props: Props,
	): [
		LiquidGlassVariantProps,
		Pretty<DistributiveOmit<Props, keyof LiquidGlassVariantProps>>,
	];
	getVariantProps: (props?: LiquidGlassVariantProps) => LiquidGlassVariantProps;
}

export declare const liquidGlass: LiquidGlassRecipe;
