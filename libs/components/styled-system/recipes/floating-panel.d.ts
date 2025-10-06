/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface FloatingPanelVariant {
  
}

type FloatingPanelVariantMap = {
  [key in keyof FloatingPanelVariant]: Array<FloatingPanelVariant[key]>
}



export type FloatingPanelVariantProps = {
  [key in keyof FloatingPanelVariant]?: ConditionalValue<FloatingPanelVariant[key]> | undefined
}

export interface FloatingPanelRecipe {
  
  __type: FloatingPanelVariantProps
  (props?: FloatingPanelVariantProps): string
  raw: (props?: FloatingPanelVariantProps) => FloatingPanelVariantProps
  variantMap: FloatingPanelVariantMap
  variantKeys: Array<keyof FloatingPanelVariant>
  splitVariantProps<Props extends FloatingPanelVariantProps>(props: Props): [FloatingPanelVariantProps, Pretty<DistributiveOmit<Props, keyof FloatingPanelVariantProps>>]
  getVariantProps: (props?: FloatingPanelVariantProps) => FloatingPanelVariantProps
}


export declare const floatingPanel: FloatingPanelRecipe