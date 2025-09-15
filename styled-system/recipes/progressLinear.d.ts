/* eslint-disable */
import type { ConditionalValue } from "../types/index";
import type { DistributiveOmit, Pretty } from "../types/system-types";

interface ProgressLinearVariant {
	/**
	 * @default "md"
	 */
	size: "sm" | "md" | "lg";
}

type ProgressLinearVariantMap = {
	[key in keyof ProgressLinearVariant]: Array<ProgressLinearVariant[key]>;
};

export type ProgressLinearVariantProps = {
	[key in keyof ProgressLinearVariant]?:
		| ConditionalValue<ProgressLinearVariant[key]>
		| undefined;
};

export interface ProgressLinearRecipe {
	__type: ProgressLinearVariantProps;
	(props?: ProgressLinearVariantProps): string;
	raw: (props?: ProgressLinearVariantProps) => ProgressLinearVariantProps;
	variantMap: ProgressLinearVariantMap;
	variantKeys: Array<keyof ProgressLinearVariant>;
	splitVariantProps<Props extends ProgressLinearVariantProps>(
		props: Props,
	): [
		ProgressLinearVariantProps,
		Pretty<DistributiveOmit<Props, keyof ProgressLinearVariantProps>>,
	];
	getVariantProps: (
		props?: ProgressLinearVariantProps,
	) => ProgressLinearVariantProps;
}

export declare const progressLinear: ProgressLinearRecipe;
