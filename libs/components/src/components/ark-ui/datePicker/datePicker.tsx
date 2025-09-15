"use client";

import { DatePicker as ArkDatePicker } from "@ark-ui/react";
import { createStyleContext } from "../../../../../../styled-system/jsx";
import { datePicker } from "../../../../../../styled-system/recipes/datePicker";

const { withRootProvider, withContext } = createStyleContext(datePicker);

// Auto-styled Ark UI DatePicker components with liquid glass
export const DatePickerRoot = withRootProvider(ArkDatePicker.Root);
export const DatePickerTrigger = withContext(ArkDatePicker.Trigger, "trigger");
export const DatePickerInput = withContext(ArkDatePicker.Input, "input");
export const DatePickerPositioner = withContext(
	ArkDatePicker.Positioner,
	"positioner",
);
export const DatePickerContent = withContext(ArkDatePicker.Content, "content");
export const DatePickerTable = withContext(ArkDatePicker.Table, "table");
export const DatePickerTableHead = withContext(
	ArkDatePicker.TableHead,
	"tableHead",
);
export const DatePickerTableBody = withContext(
	ArkDatePicker.TableBody,
	"tableBody",
);
export const DatePickerTableRow = withContext(
	ArkDatePicker.TableRow,
	"tableRow",
);
export const DatePickerTableCell = withContext(
	ArkDatePicker.TableCell,
	"tableCell",
);
export const DatePickerClearTrigger = withContext(
	ArkDatePicker.ClearTrigger,
	"trigger",
);

// Compound component API
export const DatePicker = {
	Root: DatePickerRoot,
	Trigger: DatePickerTrigger,
	Input: DatePickerInput,
	Positioner: DatePickerPositioner,
	Content: DatePickerContent,
	Table: DatePickerTable,
	TableHead: DatePickerTableHead,
	TableBody: DatePickerTableBody,
	TableRow: DatePickerTableRow,
	TableCell: DatePickerTableCell,
	ClearTrigger: DatePickerClearTrigger,
};
