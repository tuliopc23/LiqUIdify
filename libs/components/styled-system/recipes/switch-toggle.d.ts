/* eslint-disable */
import type { ConditionalValue } from "../types/index";
import type { DistributiveOmit, Pretty } from "../types/system-types";

interface SwitchToggleVariant {
	/**
	 * @default "md"
	 */
	size: "sm" | "md" | "lg";
}

type SwitchToggleVariantMap = {
	[key in keyof SwitchToggleVariant]: Array<SwitchToggleVariant[key]>;
};

export type SwitchToggleVariantProps = {
	[key in keyof SwitchToggleVariant]?:
		| ConditionalValue<SwitchToggleVariant[key]>
		| undefined;
};

export interface SwitchToggleRecipe {
	__type: SwitchToggleVariantProps;
	(props?: SwitchToggleVariantProps): string;
	raw: (props?: SwitchToggleVariantProps) => SwitchToggleVariantProps;
	variantMap: SwitchToggleVariantMap;
	variantKeys: Array<keyof SwitchToggleVariant>;
	splitVariantProps<Props extends SwitchToggleVariantProps>(
		props: Props,
	): [
		SwitchToggleVariantProps,
		Pretty<DistributiveOmit<Props, keyof SwitchToggleVariantProps>>,
	];
	getVariantProps: (
		props?: SwitchToggleVariantProps,
	) => SwitchToggleVariantProps;
}

export declare const switchToggle: SwitchToggleRecipe;
