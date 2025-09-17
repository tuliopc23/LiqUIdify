import { memo, splitProps } from '../helpers.js';
import { createRecipe, mergeRecipes } from './create-recipe.js';

const navbarFn = /* @__PURE__ */ createRecipe('navbar', {}, [])

const navbarVariantMap = {}

const navbarVariantKeys = Object.keys(navbarVariantMap)

export const navbar = /* @__PURE__ */ Object.assign(memo(navbarFn.recipeFn), {
  __recipe__: true,
  __name__: 'navbar',
  __getCompoundVariantCss__: navbarFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: navbarVariantKeys,
  variantMap: navbarVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, navbarVariantKeys)
  },
  getVariantProps: navbarFn.getVariantProps,
})