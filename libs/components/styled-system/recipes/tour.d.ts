/* eslint-disable */
import type { ConditionalValue } from "../types/index";
import type { DistributiveOmit, Pretty } from "../types/system-types";

type TourVariant = {}

type TourVariantMap = {
	[key in keyof TourVariant]: Array<TourVariant[key]>;
};

export type TourVariantProps = {
	[key in keyof TourVariant]?: ConditionalValue<TourVariant[key]> | undefined;
};

export interface TourRecipe {
	__type: TourVariantProps;
	(props?: TourVariantProps): string;
	raw: (props?: TourVariantProps) => TourVariantProps;
	variantMap: TourVariantMap;
	variantKeys: Array<keyof TourVariant>;
	splitVariantProps<Props extends TourVariantProps>(
		props: Props,
	): [
		TourVariantProps,
		Pretty<DistributiveOmit<Props, keyof TourVariantProps>>,
	];
	getVariantProps: (props?: TourVariantProps) => TourVariantProps;
}

export declare const tour: TourRecipe;
