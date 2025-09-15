/* eslint-disable */
import type { ConditionalValue } from "../types/index";
import type { DistributiveOmit, Pretty } from "../types/system-types";

type TagsInputVariant = {};

type TagsInputVariantMap = {
	[key in keyof TagsInputVariant]: Array<TagsInputVariant[key]>;
};

export type TagsInputVariantProps = {
	[key in keyof TagsInputVariant]?:
		| ConditionalValue<TagsInputVariant[key]>
		| undefined;
};

export interface TagsInputRecipe {
	__type: TagsInputVariantProps;
	(props?: TagsInputVariantProps): string;
	raw: (props?: TagsInputVariantProps) => TagsInputVariantProps;
	variantMap: TagsInputVariantMap;
	variantKeys: Array<keyof TagsInputVariant>;
	splitVariantProps<Props extends TagsInputVariantProps>(
		props: Props,
	): [
		TagsInputVariantProps,
		Pretty<DistributiveOmit<Props, keyof TagsInputVariantProps>>,
	];
	getVariantProps: (props?: TagsInputVariantProps) => TagsInputVariantProps;
}

export declare const tagsInput: TagsInputRecipe;
