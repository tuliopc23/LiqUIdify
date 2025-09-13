import { memo, splitProps } from '../helpers.js';
import { createRecipe, mergeRecipes } from './create-recipe.js';

const segmentGroupFn = /* @__PURE__ */ createRecipe('segment-group', {}, [])

const segmentGroupVariantMap = {}

const segmentGroupVariantKeys = Object.keys(segmentGroupVariantMap)

export const segmentGroup = /* @__PURE__ */ Object.assign(memo(segmentGroupFn.recipeFn), {
  __recipe__: true,
  __name__: 'segmentGroup',
  __getCompoundVariantCss__: segmentGroupFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: segmentGroupVariantKeys,
  variantMap: segmentGroupVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, segmentGroupVariantKeys)
  },
  getVariantProps: segmentGroupFn.getVariantProps,
})