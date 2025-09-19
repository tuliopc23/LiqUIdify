/* eslint-disable */
import type { ConditionalValue } from "../types/index";
import type { DistributiveOmit, Pretty } from "../types/system-types";

interface SymbolTileVariant {
	/**
	 * @default "gray"
	 */
	tint: "gray" | "blue" | "indigo" | "teal";
}

type SymbolTileVariantMap = {
	[key in keyof SymbolTileVariant]: Array<SymbolTileVariant[key]>;
};

export type SymbolTileVariantProps = {
	[key in keyof SymbolTileVariant]?:
		| ConditionalValue<SymbolTileVariant[key]>
		| undefined;
};

export interface SymbolTileRecipe {
	__type: SymbolTileVariantProps;
	(props?: SymbolTileVariantProps): string;
	raw: (props?: SymbolTileVariantProps) => SymbolTileVariantProps;
	variantMap: SymbolTileVariantMap;
	variantKeys: Array<keyof SymbolTileVariant>;
	splitVariantProps<Props extends SymbolTileVariantProps>(
		props: Props,
	): [
		SymbolTileVariantProps,
		Pretty<DistributiveOmit<Props, keyof SymbolTileVariantProps>>,
	];
	getVariantProps: (props?: SymbolTileVariantProps) => SymbolTileVariantProps;
}

export declare const symbolTile: SymbolTileRecipe;
