/* eslint-disable */
import type { ConditionalValue } from "../types/index";
import type { DistributiveOmit, Pretty } from "../types/system-types";

type TimerVariant = {}

type TimerVariantMap = {
	[key in keyof TimerVariant]: Array<TimerVariant[key]>;
};

export type TimerVariantProps = {
	[key in keyof TimerVariant]?: ConditionalValue<TimerVariant[key]> | undefined;
};

export interface TimerRecipe {
	__type: TimerVariantProps;
	(props?: TimerVariantProps): string;
	raw: (props?: TimerVariantProps) => TimerVariantProps;
	variantMap: TimerVariantMap;
	variantKeys: Array<keyof TimerVariant>;
	splitVariantProps<Props extends TimerVariantProps>(
		props: Props,
	): [
		TimerVariantProps,
		Pretty<DistributiveOmit<Props, keyof TimerVariantProps>>,
	];
	getVariantProps: (props?: TimerVariantProps) => TimerVariantProps;
}

export declare const timer: TimerRecipe;
