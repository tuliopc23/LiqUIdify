import { memo, splitProps } from '../helpers.js';
import { createRecipe, mergeRecipes } from './create-recipe.js';

const progressLinearFn = /* @__PURE__ */ createRecipe('progress-linear', {
  "size": "md"
}, [])

const progressLinearVariantMap = {
  "size": [
    "sm",
    "md",
    "lg"
  ]
}

const progressLinearVariantKeys = Object.keys(progressLinearVariantMap)

export const progressLinear = /* @__PURE__ */ Object.assign(memo(progressLinearFn.recipeFn), {
  __recipe__: true,
  __name__: 'progressLinear',
  __getCompoundVariantCss__: progressLinearFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: progressLinearVariantKeys,
  variantMap: progressLinearVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, progressLinearVariantKeys)
  },
  getVariantProps: progressLinearFn.getVariantProps,
})