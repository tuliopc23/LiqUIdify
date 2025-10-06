import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.js';
import { createRecipe } from './create-recipe.js';

const datePickerDefaultVariants = {}
const datePickerCompoundVariants = []

const datePickerSlotNames = [
  [
    "root",
    "date-picker__root"
  ],
  [
    "trigger",
    "date-picker__trigger"
  ],
  [
    "input",
    "date-picker__input"
  ],
  [
    "positioner",
    "date-picker__positioner"
  ],
  [
    "content",
    "date-picker__content"
  ],
  [
    "table",
    "date-picker__table"
  ],
  [
    "tableHead",
    "date-picker__tableHead"
  ],
  [
    "tableBody",
    "date-picker__tableBody"
  ],
  [
    "tableRow",
    "date-picker__tableRow"
  ],
  [
    "tableCell",
    "date-picker__tableCell"
  ]
]
const datePickerSlotFns = /* @__PURE__ */ datePickerSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, datePickerDefaultVariants, getSlotCompoundVariant(datePickerCompoundVariants, slotName))])

const datePickerFn = memo((props = {}) => {
  return Object.fromEntries(datePickerSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const datePickerVariantKeys = []
const getVariantProps = (variants) => ({ ...datePickerDefaultVariants, ...compact(variants) })

export const datePicker = /* @__PURE__ */ Object.assign(datePickerFn, {
  __recipe__: false,
  __name__: 'datePicker',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: datePickerVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, datePickerVariantKeys)
  },
  getVariantProps
})