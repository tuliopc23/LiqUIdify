import { memo, splitProps } from '../helpers.js';
import { createRecipe, mergeRecipes } from './create-recipe.js';

const inputFn = /* @__PURE__ */ createRecipe('field-input', {
  "variant": "solid",
  "size": "md"
}, [])

const inputVariantMap = {
  "variant": [
    "solid",
    "glass"
  ],
  "size": [
    "sm",
    "md",
    "lg"
  ]
}

const inputVariantKeys = Object.keys(inputVariantMap)

export const input = /* @__PURE__ */ Object.assign(memo(inputFn.recipeFn), {
  __recipe__: true,
  __name__: 'input',
  __getCompoundVariantCss__: inputFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: inputVariantKeys,
  variantMap: inputVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, inputVariantKeys)
  },
  getVariantProps: inputFn.getVariantProps,
})