"use client";

import { FileUpload as ArkFileUpload } from "@ark-ui/react";
import { createStyleContext } from "../../../../../../styled-system/jsx";
import { fileUpload } from "../../../../../../styled-system/recipes/fileUpload";

const { withRootProvider, withContext } = createStyleContext(fileUpload);

// Auto-styled Ark UI FileUpload components with liquid glass
export const FileUploadRoot = withRootProvider(ArkFileUpload.Root);
export const FileUploadDropzone = withContext(
	ArkFileUpload.Dropzone,
	"dropzone",
);
export const FileUploadTrigger = withContext(ArkFileUpload.Trigger, "trigger");
export const FileUploadItemGroup = withContext(
	ArkFileUpload.ItemGroup,
	"itemGroup",
);
export const FileUploadItem = withContext(ArkFileUpload.Item, "item");
export const FileUploadItemName = withContext(
	ArkFileUpload.ItemName,
	"itemName",
);
export const FileUploadItemSizeText = withContext(
	ArkFileUpload.ItemSizeText,
	"itemSizeText",
);
export const FileUploadItemDeleteTrigger = withContext(
	ArkFileUpload.ItemDeleteTrigger,
	"trigger",
);

// Compound component API
export const FileUpload = {
	Root: FileUploadRoot,
	Dropzone: FileUploadDropzone,
	Trigger: FileUploadTrigger,
	ItemGroup: FileUploadItemGroup,
	Item: FileUploadItem,
	ItemName: FileUploadItemName,
	ItemSizeText: FileUploadItemSizeText,
	ItemDeleteTrigger: FileUploadItemDeleteTrigger,
};
