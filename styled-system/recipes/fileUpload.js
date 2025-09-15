import {
	compact,
	getSlotCompoundVariant,
	memo,
	splitProps,
} from "../helpers.js";
import { createRecipe } from "./create-recipe.js";

const fileUploadDefaultVariants = {};
const fileUploadCompoundVariants = [];

const fileUploadSlotNames = [
	["root", "file-upload__root"],
	["dropzone", "file-upload__dropzone"],
	["trigger", "file-upload__trigger"],
	["itemGroup", "file-upload__itemGroup"],
	["item", "file-upload__item"],
	["itemName", "file-upload__itemName"],
	["itemSizeText", "file-upload__itemSizeText"],
];
const fileUploadSlotFns = /* @__PURE__ */ fileUploadSlotNames.map(
	([slotName, slotKey]) => [
		slotName,
		createRecipe(
			slotKey,
			fileUploadDefaultVariants,
			getSlotCompoundVariant(fileUploadCompoundVariants, slotName),
		),
	],
);

const fileUploadFn = memo((props = {}) => {
	return Object.fromEntries(
		fileUploadSlotFns.map(([slotName, slotFn]) => [
			slotName,
			slotFn.recipeFn(props),
		]),
	);
});

const fileUploadVariantKeys = [];
const getVariantProps = (variants) => ({
	...fileUploadDefaultVariants,
	...compact(variants),
});

export const fileUpload = /* @__PURE__ */ Object.assign(fileUploadFn, {
	__recipe__: false,
	__name__: "fileUpload",
	raw: (props) => props,
	classNameMap: {},
	variantKeys: fileUploadVariantKeys,
	variantMap: {},
	splitVariantProps(props) {
		return splitProps(props, fileUploadVariantKeys);
	},
	getVariantProps,
});
