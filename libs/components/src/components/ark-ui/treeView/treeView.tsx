"use client";

import { TreeView as ArkTreeView } from "@ark-ui/react";

// Auto-styled Ark UI TreeView components with liquid glass styling
export const TreeViewRoot = ArkTreeView.Root;
export const TreeViewLabel = ArkTreeView.Label;
export const TreeViewTree = ArkTreeView.Tree;
export const TreeViewBranch = ArkTreeView.Branch;
export const TreeViewBranchControl = ArkTreeView.BranchControl;
export const TreeViewBranchContent = ArkTreeView.BranchContent;
export const TreeViewBranchIndicator = ArkTreeView.BranchIndicator;
export const TreeViewBranchText = ArkTreeView.BranchText;
export const TreeViewItem = ArkTreeView.Item;
export const TreeViewItemIndicator = ArkTreeView.ItemIndicator;
export const TreeViewItemText = ArkTreeView.ItemText;

// Compound component API
export const TreeView = {
	Root: TreeViewRoot,
	Label: TreeViewLabel,
	Tree: TreeViewTree,
	Branch: TreeViewBranch,
	BranchControl: TreeViewBranchControl,
	BranchContent: TreeViewBranchContent,
	BranchIndicator: TreeViewBranchIndicator,
	BranchText: TreeViewBranchText,
	Item: TreeViewItem,
	ItemIndicator: TreeViewItemIndicator,
	ItemText: TreeViewItemText,
};
