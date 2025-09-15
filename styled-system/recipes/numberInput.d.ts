/* eslint-disable */
import type { ConditionalValue } from "../types/index";
import type { DistributiveOmit, Pretty } from "../types/system-types";

type NumberInputVariant = {};

type NumberInputVariantMap = {
	[key in keyof NumberInputVariant]: Array<NumberInputVariant[key]>;
};

type NumberInputSlot =
	| "root"
	| "field"
	| "incrementTrigger"
	| "decrementTrigger";

export type NumberInputVariantProps = {
	[key in keyof NumberInputVariant]?:
		| ConditionalValue<NumberInputVariant[key]>
		| undefined;
};

export interface NumberInputRecipe {
	__slot: NumberInputSlot;
	__type: NumberInputVariantProps;
	(props?: NumberInputVariantProps): Pretty<Record<NumberInputSlot, string>>;
	raw: (props?: NumberInputVariantProps) => NumberInputVariantProps;
	variantMap: NumberInputVariantMap;
	variantKeys: Array<keyof NumberInputVariant>;
	splitVariantProps<Props extends NumberInputVariantProps>(
		props: Props,
	): [
		NumberInputVariantProps,
		Pretty<DistributiveOmit<Props, keyof NumberInputVariantProps>>,
	];
	getVariantProps: (props?: NumberInputVariantProps) => NumberInputVariantProps;
}

export declare const numberInput: NumberInputRecipe;
