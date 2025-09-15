"use client";

import { Pagination as ArkPagination } from "@ark-ui/react";
import { createStyleContext } from "../../../../../../styled-system/jsx";
import { pagination } from "../../../../../../styled-system/recipes/pagination";

const { withRootProvider, withContext } = createStyleContext(pagination);

// Auto-styled Ark UI Pagination components with liquid glass
export const PaginationRoot = withRootProvider(ArkPagination.Root);
export const PaginationItem = withContext(ArkPagination.Item, "item");
export const PaginationEllipsis = withContext(
	ArkPagination.Ellipsis,
	"ellipsis",
);
export const PaginationPrevTrigger = withContext(
	ArkPagination.PrevTrigger,
	"prevTrigger",
);
export const PaginationNextTrigger = withContext(
	ArkPagination.NextTrigger,
	"nextTrigger",
);

// Compound component API
export const Pagination = {
	Root: PaginationRoot,
	Item: PaginationItem,
	Ellipsis: PaginationEllipsis,
	PrevTrigger: PaginationPrevTrigger,
	NextTrigger: PaginationNextTrigger,
};
