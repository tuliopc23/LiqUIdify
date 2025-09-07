import { memo, splitProps } from '../helpers.js';
import { createRecipe, mergeRecipes } from './create-recipe.js';

const listboxFn = /* @__PURE__ */ createRecipe('listbox', {}, [])

const listboxVariantMap = {}

const listboxVariantKeys = Object.keys(listboxVariantMap)

export const listbox = /* @__PURE__ */ Object.assign(memo(listboxFn.recipeFn), {
  __recipe__: true,
  __name__: 'listbox',
  __getCompoundVariantCss__: listboxFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: listboxVariantKeys,
  variantMap: listboxVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, listboxVariantKeys)
  },
  getVariantProps: listboxFn.getVariantProps,
})