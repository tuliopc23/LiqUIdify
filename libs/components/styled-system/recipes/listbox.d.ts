/* eslint-disable */
import type { ConditionalValue } from "../types/index";
import type { DistributiveOmit, Pretty } from "../types/system-types";

type ListboxVariant = {}

type ListboxVariantMap = {
	[key in keyof ListboxVariant]: Array<ListboxVariant[key]>;
};

export type ListboxVariantProps = {
	[key in keyof ListboxVariant]?:
		| ConditionalValue<ListboxVariant[key]>
		| undefined;
};

export interface ListboxRecipe {
	__type: ListboxVariantProps;
	(props?: ListboxVariantProps): string;
	raw: (props?: ListboxVariantProps) => ListboxVariantProps;
	variantMap: ListboxVariantMap;
	variantKeys: Array<keyof ListboxVariant>;
	splitVariantProps<Props extends ListboxVariantProps>(
		props: Props,
	): [
		ListboxVariantProps,
		Pretty<DistributiveOmit<Props, keyof ListboxVariantProps>>,
	];
	getVariantProps: (props?: ListboxVariantProps) => ListboxVariantProps;
}

export declare const listbox: ListboxRecipe;
