import { memo, splitProps } from '../helpers.js';
import { createRecipe, mergeRecipes } from './create-recipe.js';

const buttonFn = /* @__PURE__ */ createRecipe('liquid-button', {
  "variant": "primary",
  "tone": "accent",
  "size": "md"
}, [
  {
    "variant": "filled",
    "tone": "accent",
    "css": {
      "background": "token(colors.button.hig.filled.accent.default.bg)",
      "borderColor": "token(colors.button.hig.filled.accent.default.border)",
      "color": "token(colors.button.hig.filled.accent.default.text)",
      "_hover": {
        "background": "token(colors.button.hig.filled.accent.hover.bg)",
        "borderColor": "token(colors.button.hig.filled.accent.hover.border)"
      },
      "_active": {
        "background": "token(colors.button.hig.filled.accent.active.bg)",
        "borderColor": "token(colors.button.hig.filled.accent.active.border)"
      },
      "_focusVisible": {
        "background": "token(colors.button.hig.filled.accent.focus.bg)",
        "borderColor": "token(colors.button.hig.filled.accent.focus.border)"
      },
      "&:disabled, &[disabled], &[aria-disabled='true']": {
        "background": "token(colors.button.hig.filled.accent.disabled.bg)",
        "borderColor": "token(colors.button.hig.filled.accent.disabled.border)",
        "color": "token(colors.button.hig.filled.accent.disabled.text)"
      },
      "&[data-loading]": {
        "background": "token(colors.button.hig.filled.accent.loading.bg)",
        "borderColor": "token(colors.button.hig.filled.accent.loading.border)"
      }
    }
  },
  {
    "variant": "filled",
    "tone": "neutral",
    "css": {
      "background": "token(colors.button.hig.filled.neutral.default.bg)",
      "borderColor": "token(colors.button.hig.filled.neutral.default.border)",
      "color": "token(colors.button.hig.filled.neutral.default.text)",
      "_hover": {
        "background": "token(colors.button.hig.filled.neutral.hover.bg)",
        "borderColor": "token(colors.button.hig.filled.neutral.hover.border)"
      },
      "_active": {
        "background": "token(colors.button.hig.filled.neutral.active.bg)",
        "borderColor": "token(colors.button.hig.filled.neutral.active.border)"
      },
      "_focusVisible": {
        "background": "token(colors.button.hig.filled.neutral.focus.bg)",
        "borderColor": "token(colors.button.hig.filled.neutral.focus.border)"
      },
      "&:disabled, &[disabled], &[aria-disabled='true']": {
        "background": "token(colors.button.hig.filled.neutral.disabled.bg)",
        "borderColor": "token(colors.button.hig.filled.neutral.disabled.border)",
        "color": "token(colors.button.hig.filled.neutral.disabled.text)"
      },
      "&[data-loading]": {
        "background": "token(colors.button.hig.filled.neutral.loading.bg)",
        "borderColor": "token(colors.button.hig.filled.neutral.loading.border)"
      }
    }
  },
  {
    "variant": "filled",
    "tone": "destructive",
    "css": {
      "background": "token(colors.button.hig.filled.destructive.default.bg)",
      "borderColor": "token(colors.button.hig.filled.destructive.default.border)",
      "color": "token(colors.button.hig.filled.destructive.default.text)",
      "_hover": {
        "background": "token(colors.button.hig.filled.destructive.hover.bg)",
        "borderColor": "token(colors.button.hig.filled.destructive.hover.border)"
      },
      "_active": {
        "background": "token(colors.button.hig.filled.destructive.active.bg)",
        "borderColor": "token(colors.button.hig.filled.destructive.active.border)"
      },
      "_focusVisible": {
        "background": "token(colors.button.hig.filled.destructive.focus.bg)",
        "borderColor": "token(colors.button.hig.filled.destructive.focus.border)"
      },
      "&:disabled, &[disabled], &[aria-disabled='true']": {
        "background": "token(colors.button.hig.filled.destructive.disabled.bg)",
        "borderColor": "token(colors.button.hig.filled.destructive.disabled.border)",
        "color": "token(colors.button.hig.filled.destructive.disabled.text)"
      },
      "&[data-loading]": {
        "background": "token(colors.button.hig.filled.destructive.loading.bg)",
        "borderColor": "token(colors.button.hig.filled.destructive.loading.border)"
      }
    }
  },
  {
    "variant": "tinted",
    "tone": "accent",
    "css": {
      "background": "token(colors.button.hig.tinted.accent.default.bg)",
      "borderColor": "token(colors.button.hig.tinted.accent.default.border)",
      "color": "token(colors.button.hig.tinted.accent.default.text)",
      "_hover": {
        "background": "token(colors.button.hig.tinted.accent.hover.bg)",
        "borderColor": "token(colors.button.hig.tinted.accent.hover.border)"
      },
      "_active": {
        "background": "token(colors.button.hig.tinted.accent.active.bg)",
        "borderColor": "token(colors.button.hig.tinted.accent.active.border)"
      },
      "_focusVisible": {
        "background": "token(colors.button.hig.tinted.accent.focus.bg)",
        "borderColor": "token(colors.button.hig.tinted.accent.focus.border)"
      },
      "&:disabled, &[disabled], &[aria-disabled='true']": {
        "background": "token(colors.button.hig.tinted.accent.disabled.bg)",
        "borderColor": "token(colors.button.hig.tinted.accent.disabled.border)",
        "color": "token(colors.button.hig.tinted.accent.disabled.text)"
      },
      "&[data-loading]": {
        "background": "token(colors.button.hig.tinted.accent.loading.bg)",
        "borderColor": "token(colors.button.hig.tinted.accent.loading.border)"
      }
    }
  },
  {
    "variant": "tinted",
    "tone": "neutral",
    "css": {
      "background": "token(colors.button.hig.tinted.neutral.default.bg)",
      "borderColor": "token(colors.button.hig.tinted.neutral.default.border)",
      "color": "token(colors.button.hig.tinted.neutral.default.text)",
      "_hover": {
        "background": "token(colors.button.hig.tinted.neutral.hover.bg)",
        "borderColor": "token(colors.button.hig.tinted.neutral.hover.border)"
      },
      "_active": {
        "background": "token(colors.button.hig.tinted.neutral.active.bg)",
        "borderColor": "token(colors.button.hig.tinted.neutral.active.border)"
      },
      "_focusVisible": {
        "background": "token(colors.button.hig.tinted.neutral.focus.bg)",
        "borderColor": "token(colors.button.hig.tinted.neutral.focus.border)"
      },
      "&:disabled, &[disabled], &[aria-disabled='true']": {
        "background": "token(colors.button.hig.tinted.neutral.disabled.bg)",
        "borderColor": "token(colors.button.hig.tinted.neutral.disabled.border)",
        "color": "token(colors.button.hig.tinted.neutral.disabled.text)"
      },
      "&[data-loading]": {
        "background": "token(colors.button.hig.tinted.neutral.loading.bg)",
        "borderColor": "token(colors.button.hig.tinted.neutral.loading.border)"
      }
    }
  },
  {
    "variant": "tinted",
    "tone": "destructive",
    "css": {
      "background": "token(colors.button.hig.tinted.destructive.default.bg)",
      "borderColor": "token(colors.button.hig.tinted.destructive.default.border)",
      "color": "token(colors.button.hig.tinted.destructive.default.text)",
      "_hover": {
        "background": "token(colors.button.hig.tinted.destructive.hover.bg)",
        "borderColor": "token(colors.button.hig.tinted.destructive.hover.border)"
      },
      "_active": {
        "background": "token(colors.button.hig.tinted.destructive.active.bg)",
        "borderColor": "token(colors.button.hig.tinted.destructive.active.border)"
      },
      "_focusVisible": {
        "background": "token(colors.button.hig.tinted.destructive.focus.bg)",
        "borderColor": "token(colors.button.hig.tinted.destructive.focus.border)"
      },
      "&:disabled, &[disabled], &[aria-disabled='true']": {
        "background": "token(colors.button.hig.tinted.destructive.disabled.bg)",
        "borderColor": "token(colors.button.hig.tinted.destructive.disabled.border)",
        "color": "token(colors.button.hig.tinted.destructive.disabled.text)"
      },
      "&[data-loading]": {
        "background": "token(colors.button.hig.tinted.destructive.loading.bg)",
        "borderColor": "token(colors.button.hig.tinted.destructive.loading.border)"
      }
    }
  },
  {
    "variant": "plain",
    "tone": "accent",
    "css": {
      "background": "token(colors.button.hig.plain.accent.default.bg)",
      "borderColor": "token(colors.button.hig.plain.accent.default.border)",
      "color": "token(colors.button.hig.plain.accent.default.text)",
      "_hover": {
        "background": "token(colors.button.hig.plain.accent.hover.bg)",
        "borderColor": "token(colors.button.hig.plain.accent.hover.border)"
      },
      "_active": {
        "background": "token(colors.button.hig.plain.accent.active.bg)",
        "borderColor": "token(colors.button.hig.plain.accent.active.border)"
      },
      "_focusVisible": {
        "background": "token(colors.button.hig.plain.accent.focus.bg)",
        "borderColor": "token(colors.button.hig.plain.accent.focus.border)"
      },
      "&:disabled, &[disabled], &[aria-disabled='true']": {
        "background": "token(colors.button.hig.plain.accent.disabled.bg)",
        "borderColor": "token(colors.button.hig.plain.accent.disabled.border)",
        "color": "token(colors.button.hig.plain.accent.disabled.text)"
      },
      "&[data-loading]": {
        "background": "token(colors.button.hig.plain.accent.loading.bg)",
        "borderColor": "token(colors.button.hig.plain.accent.loading.border)"
      }
    }
  },
  {
    "variant": "plain",
    "tone": "neutral",
    "css": {
      "background": "token(colors.button.hig.plain.neutral.default.bg)",
      "borderColor": "token(colors.button.hig.plain.neutral.default.border)",
      "color": "token(colors.button.hig.plain.neutral.default.text)",
      "_hover": {
        "background": "token(colors.button.hig.plain.neutral.hover.bg)",
        "borderColor": "token(colors.button.hig.plain.neutral.hover.border)"
      },
      "_active": {
        "background": "token(colors.button.hig.plain.neutral.active.bg)",
        "borderColor": "token(colors.button.hig.plain.neutral.active.border)"
      },
      "_focusVisible": {
        "background": "token(colors.button.hig.plain.neutral.focus.bg)",
        "borderColor": "token(colors.button.hig.plain.neutral.focus.border)"
      },
      "&:disabled, &[disabled], &[aria-disabled='true']": {
        "background": "token(colors.button.hig.plain.neutral.disabled.bg)",
        "borderColor": "token(colors.button.hig.plain.neutral.disabled.border)",
        "color": "token(colors.button.hig.plain.neutral.disabled.text)"
      },
      "&[data-loading]": {
        "background": "token(colors.button.hig.plain.neutral.loading.bg)",
        "borderColor": "token(colors.button.hig.plain.neutral.loading.border)"
      }
    }
  },
  {
    "variant": "plain",
    "tone": "destructive",
    "css": {
      "background": "token(colors.button.hig.plain.destructive.default.bg)",
      "borderColor": "token(colors.button.hig.plain.destructive.default.border)",
      "color": "token(colors.button.hig.plain.destructive.default.text)",
      "_hover": {
        "background": "token(colors.button.hig.plain.destructive.hover.bg)",
        "borderColor": "token(colors.button.hig.plain.destructive.hover.border)"
      },
      "_active": {
        "background": "token(colors.button.hig.plain.destructive.active.bg)",
        "borderColor": "token(colors.button.hig.plain.destructive.active.border)"
      },
      "_focusVisible": {
        "background": "token(colors.button.hig.plain.destructive.focus.bg)",
        "borderColor": "token(colors.button.hig.plain.destructive.focus.border)"
      },
      "&:disabled, &[disabled], &[aria-disabled='true']": {
        "background": "token(colors.button.hig.plain.destructive.disabled.bg)",
        "borderColor": "token(colors.button.hig.plain.destructive.disabled.border)",
        "color": "token(colors.button.hig.plain.destructive.disabled.text)"
      },
      "&[data-loading]": {
        "background": "token(colors.button.hig.plain.destructive.loading.bg)",
        "borderColor": "token(colors.button.hig.plain.destructive.loading.border)"
      }
    }
  }
])

const buttonVariantMap = {
  "variant": [
    "primary",
    "secondary",
    "ghost",
    "danger",
    "success",
    "warning",
    "filled",
    "tinted",
    "plain"
  ],
  "tone": [
    "accent",
    "neutral",
    "destructive"
  ],
  "size": [
    "compact",
    "regular",
    "large",
    "sm",
    "md",
    "lg",
    "xl"
  ]
}

const buttonVariantKeys = Object.keys(buttonVariantMap)

export const button = /* @__PURE__ */ Object.assign(memo(buttonFn.recipeFn), {
  __recipe__: true,
  __name__: 'button',
  __getCompoundVariantCss__: buttonFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: buttonVariantKeys,
  variantMap: buttonVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, buttonVariantKeys)
  },
  getVariantProps: buttonFn.getVariantProps,
})