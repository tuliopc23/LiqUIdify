/* eslint-disable */
import type { ConditionalValue } from "../types/index";
import type { DistributiveOmit, Pretty } from "../types/system-types";

type StepsVariant = {}

type StepsVariantMap = {
	[key in keyof StepsVariant]: Array<StepsVariant[key]>;
};

export type StepsVariantProps = {
	[key in keyof StepsVariant]?: ConditionalValue<StepsVariant[key]> | undefined;
};

export interface StepsRecipe {
	__type: StepsVariantProps;
	(props?: StepsVariantProps): string;
	raw: (props?: StepsVariantProps) => StepsVariantProps;
	variantMap: StepsVariantMap;
	variantKeys: Array<keyof StepsVariant>;
	splitVariantProps<Props extends StepsVariantProps>(
		props: Props,
	): [
		StepsVariantProps,
		Pretty<DistributiveOmit<Props, keyof StepsVariantProps>>,
	];
	getVariantProps: (props?: StepsVariantProps) => StepsVariantProps;
}

export declare const steps: StepsRecipe;
