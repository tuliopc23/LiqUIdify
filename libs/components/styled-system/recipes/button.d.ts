/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface ButtonVariant {
  /**
 * @default "primary"
 */
variant: "primary" | "secondary" | "ghost" | "danger" | "success" | "warning" | "filled" | "tinted" | "plain"
/**
 * @default "accent"
 */
tone: "accent" | "neutral" | "destructive"
/**
 * @default "md"
 */
size: "compact" | "regular" | "large" | "sm" | "md" | "lg" | "xl"
}

type ButtonVariantMap = {
  [key in keyof ButtonVariant]: Array<ButtonVariant[key]>
}



export type ButtonVariantProps = {
  [key in keyof ButtonVariant]?: ButtonVariant[key] | undefined
}

export interface ButtonRecipe {
  
  __type: ButtonVariantProps
  (props?: ButtonVariantProps): string
  raw: (props?: ButtonVariantProps) => ButtonVariantProps
  variantMap: ButtonVariantMap
  variantKeys: Array<keyof ButtonVariant>
  splitVariantProps<Props extends ButtonVariantProps>(props: Props): [ButtonVariantProps, Pretty<DistributiveOmit<Props, keyof ButtonVariantProps>>]
  getVariantProps: (props?: ButtonVariantProps) => ButtonVariantProps
}


export declare const button: ButtonRecipe