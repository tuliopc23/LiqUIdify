/* eslint-disable */
import type { ConditionalValue } from "../types/index";
import type { DistributiveOmit, Pretty } from "../types/system-types";

interface AngleSliderVariant {
	/**
	 * @default "md"
	 */
	size: "sm" | "md" | "lg";
}

type AngleSliderVariantMap = {
	[key in keyof AngleSliderVariant]: Array<AngleSliderVariant[key]>;
};

export type AngleSliderVariantProps = {
	[key in keyof AngleSliderVariant]?:
		| ConditionalValue<AngleSliderVariant[key]>
		| undefined;
};

export interface AngleSliderRecipe {
	__type: AngleSliderVariantProps;
	(props?: AngleSliderVariantProps): string;
	raw: (props?: AngleSliderVariantProps) => AngleSliderVariantProps;
	variantMap: AngleSliderVariantMap;
	variantKeys: Array<keyof AngleSliderVariant>;
	splitVariantProps<Props extends AngleSliderVariantProps>(
		props: Props,
	): [
		AngleSliderVariantProps,
		Pretty<DistributiveOmit<Props, keyof AngleSliderVariantProps>>,
	];
	getVariantProps: (props?: AngleSliderVariantProps) => AngleSliderVariantProps;
}

export declare const angleSlider: AngleSliderRecipe;
