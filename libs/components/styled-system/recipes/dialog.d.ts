/* eslint-disable */
import type { ConditionalValue } from "../types/index";
import type { DistributiveOmit, Pretty } from "../types/system-types";

type DialogVariant = {}

type DialogVariantMap = {
	[key in keyof DialogVariant]: Array<DialogVariant[key]>;
};

type DialogSlot =
	| "backdrop"
	| "positioner"
	| "content"
	| "title"
	| "description"
	| "trigger"
	| "closeTrigger";

export type DialogVariantProps = {
	[key in keyof DialogVariant]?:
		| ConditionalValue<DialogVariant[key]>
		| undefined;
};

export interface DialogRecipe {
	__slot: DialogSlot;
	__type: DialogVariantProps;
	(props?: DialogVariantProps): Pretty<Record<DialogSlot, string>>;
	raw: (props?: DialogVariantProps) => DialogVariantProps;
	variantMap: DialogVariantMap;
	variantKeys: Array<keyof DialogVariant>;
	splitVariantProps<Props extends DialogVariantProps>(
		props: Props,
	): [
		DialogVariantProps,
		Pretty<DistributiveOmit<Props, keyof DialogVariantProps>>,
	];
	getVariantProps: (props?: DialogVariantProps) => DialogVariantProps;
}

export declare const dialog: DialogRecipe;
