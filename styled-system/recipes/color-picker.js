import { memo, splitProps } from '../helpers.js';
import { createRecipe, mergeRecipes } from './create-recipe.js';

const colorPickerFn = /* @__PURE__ */ createRecipe('color-picker', {
  "size": "md"
}, [])

const colorPickerVariantMap = {
  "size": [
    "sm",
    "md",
    "lg"
  ]
}

const colorPickerVariantKeys = Object.keys(colorPickerVariantMap)

export const colorPicker = /* @__PURE__ */ Object.assign(memo(colorPickerFn.recipeFn), {
  __recipe__: true,
  __name__: 'colorPicker',
  __getCompoundVariantCss__: colorPickerFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: colorPickerVariantKeys,
  variantMap: colorPickerVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, colorPickerVariantKeys)
  },
  getVariantProps: colorPickerFn.getVariantProps,
})