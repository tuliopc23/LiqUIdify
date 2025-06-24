import { default as React } from '../../node_modules/react';
export interface FeatureItem {
    icon: React.ReactNode;
    title: string;
    description: string;
    link?: {
        label: string;
        href: string;
        onClick?: () => void;
    };
    image?: string;
    badge?: string;
}
export interface GlassFeatureShowcaseProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    subtitle?: string;
    description?: string;
    features: FeatureItem[];
    layout?: 'grid' | 'masonry' | 'carousel' | 'stacked';
    columns?: 1 | 2 | 3 | 4;
    variant?: 'default' | 'minimal' | 'cards' | 'floating';
    enableMagnetic?: boolean;
    enableParallax?: boolean;
}
declare const GlassFeatureShowcase: React.ForwardRefExoticComponent<GlassFeatureShowcaseProps & React.RefAttributes<HTMLDivElement>>;
export { GlassFeatureShowcase };
//# sourceMappingURL=glass-feature-showcase.d.ts.map