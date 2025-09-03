import { compact, getSlotCompoundVariant, memo, splitProps } from "../helpers.js";
import { createRecipe } from "./create-recipe.js";

const menuDefaultVariants = {};
const menuCompoundVariants = [];

const menuSlotNames = [
  ["trigger", "menu__trigger"],
  ["positioner", "menu__positioner"],
  ["content", "menu__content"],
  ["item", "menu__item"],
  ["itemText", "menu__itemText"],
  ["separator", "menu__separator"],
];
const menuSlotFns = /* @__PURE__ */ menuSlotNames.map(([slotName, slotKey]) => [
  slotName,
  createRecipe(
    slotKey,
    menuDefaultVariants,
    getSlotCompoundVariant(menuCompoundVariants, slotName)
  ),
]);

const menuFn = memo((props = {}) => {
  return Object.fromEntries(
    menuSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)])
  );
});

const menuVariantKeys = [];
const getVariantProps = (variants) => ({ ...menuDefaultVariants, ...compact(variants) });

export const menu = /* @__PURE__ */ Object.assign(menuFn, {
  __recipe__: false,
  __name__: "menu",
  raw: (props) => props,
  classNameMap: {},
  variantKeys: menuVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, menuVariantKeys);
  },
  getVariantProps,
});
