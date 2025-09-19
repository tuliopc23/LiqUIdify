/* eslint-disable */
import type { ConditionalValue } from "../types/index";
import type { DistributiveOmit, Pretty } from "../types/system-types";

interface ColorPickerVariant {
	/**
	 * @default "md"
	 */
	size: "sm" | "md" | "lg";
}

type ColorPickerVariantMap = {
	[key in keyof ColorPickerVariant]: Array<ColorPickerVariant[key]>;
};

export type ColorPickerVariantProps = {
	[key in keyof ColorPickerVariant]?:
		| ConditionalValue<ColorPickerVariant[key]>
		| undefined;
};

export interface ColorPickerRecipe {
	__type: ColorPickerVariantProps;
	(props?: ColorPickerVariantProps): string;
	raw: (props?: ColorPickerVariantProps) => ColorPickerVariantProps;
	variantMap: ColorPickerVariantMap;
	variantKeys: Array<keyof ColorPickerVariant>;
	splitVariantProps<Props extends ColorPickerVariantProps>(
		props: Props,
	): [
		ColorPickerVariantProps,
		Pretty<DistributiveOmit<Props, keyof ColorPickerVariantProps>>,
	];
	getVariantProps: (props?: ColorPickerVariantProps) => ColorPickerVariantProps;
}

export declare const colorPicker: ColorPickerRecipe;
