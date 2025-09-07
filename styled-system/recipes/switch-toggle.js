import { memo, splitProps } from '../helpers.js';
import { createRecipe, mergeRecipes } from './create-recipe.js';

const switchToggleFn = /* @__PURE__ */ createRecipe('switch', {
  "size": "md"
}, [])

const switchToggleVariantMap = {
  "size": [
    "sm",
    "md",
    "lg"
  ]
}

const switchToggleVariantKeys = Object.keys(switchToggleVariantMap)

export const switchToggle = /* @__PURE__ */ Object.assign(memo(switchToggleFn.recipeFn), {
  __recipe__: true,
  __name__: 'switchToggle',
  __getCompoundVariantCss__: switchToggleFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: switchToggleVariantKeys,
  variantMap: switchToggleVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, switchToggleVariantKeys)
  },
  getVariantProps: switchToggleFn.getVariantProps,
})