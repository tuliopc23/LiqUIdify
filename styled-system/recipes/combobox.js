import { compact, getSlotCompoundVariant, memo, splitProps } from "../helpers.js";
import { createRecipe } from "./create-recipe.js";

const comboboxDefaultVariants = {};
const comboboxCompoundVariants = [];

const comboboxSlotNames = [
  ["root", "combobox__root"],
  ["trigger", "combobox__trigger"],
  ["input", "combobox__input"],
  ["positioner", "combobox__positioner"],
  ["content", "combobox__content"],
  ["item", "combobox__item"],
  ["itemText", "combobox__itemText"],
];
const comboboxSlotFns = /* @__PURE__ */ comboboxSlotNames.map(([slotName, slotKey]) => [
  slotName,
  createRecipe(
    slotKey,
    comboboxDefaultVariants,
    getSlotCompoundVariant(comboboxCompoundVariants, slotName)
  ),
]);

const comboboxFn = memo((props = {}) => {
  return Object.fromEntries(
    comboboxSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)])
  );
});

const comboboxVariantKeys = [];
const getVariantProps = (variants) => ({ ...comboboxDefaultVariants, ...compact(variants) });

export const combobox = /* @__PURE__ */ Object.assign(comboboxFn, {
  __recipe__: false,
  __name__: "combobox",
  raw: (props) => props,
  classNameMap: {},
  variantKeys: comboboxVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, comboboxVariantKeys);
  },
  getVariantProps,
});
