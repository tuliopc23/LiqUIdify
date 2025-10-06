import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.js';
import { createRecipe } from './create-recipe.js';

const carouselDefaultVariants = {}
const carouselCompoundVariants = []

const carouselSlotNames = [
  [
    "root",
    "carousel__root"
  ],
  [
    "viewport",
    "carousel__viewport"
  ],
  [
    "itemGroup",
    "carousel__itemGroup"
  ],
  [
    "item",
    "carousel__item"
  ],
  [
    "nextTrigger",
    "carousel__nextTrigger"
  ],
  [
    "prevTrigger",
    "carousel__prevTrigger"
  ],
  [
    "indicatorGroup",
    "carousel__indicatorGroup"
  ],
  [
    "indicator",
    "carousel__indicator"
  ]
]
const carouselSlotFns = /* @__PURE__ */ carouselSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, carouselDefaultVariants, getSlotCompoundVariant(carouselCompoundVariants, slotName))])

const carouselFn = memo((props = {}) => {
  return Object.fromEntries(carouselSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const carouselVariantKeys = []
const getVariantProps = (variants) => ({ ...carouselDefaultVariants, ...compact(variants) })

export const carousel = /* @__PURE__ */ Object.assign(carouselFn, {
  __recipe__: false,
  __name__: 'carousel',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: carouselVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, carouselVariantKeys)
  },
  getVariantProps
})