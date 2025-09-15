/* eslint-disable */
import type { ConditionalValue } from "../types/index";
import type { DistributiveOmit, Pretty } from "../types/system-types";

type PasswordInputVariant = {};

type PasswordInputVariantMap = {
	[key in keyof PasswordInputVariant]: Array<PasswordInputVariant[key]>;
};

export type PasswordInputVariantProps = {
	[key in keyof PasswordInputVariant]?:
		| ConditionalValue<PasswordInputVariant[key]>
		| undefined;
};

export interface PasswordInputRecipe {
	__type: PasswordInputVariantProps;
	(props?: PasswordInputVariantProps): string;
	raw: (props?: PasswordInputVariantProps) => PasswordInputVariantProps;
	variantMap: PasswordInputVariantMap;
	variantKeys: Array<keyof PasswordInputVariant>;
	splitVariantProps<Props extends PasswordInputVariantProps>(
		props: Props,
	): [
		PasswordInputVariantProps,
		Pretty<DistributiveOmit<Props, keyof PasswordInputVariantProps>>,
	];
	getVariantProps: (
		props?: PasswordInputVariantProps,
	) => PasswordInputVariantProps;
}

export declare const passwordInput: PasswordInputRecipe;
