import { default as React } from '../../node_modules/react';
export interface GlassHeroProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    subtitle?: string;
    description?: string;
    primaryAction?: {
        label: string;
        onClick: () => void;
        icon?: React.ReactNode;
    };
    secondaryAction?: {
        label: string;
        onClick: () => void;
        icon?: React.ReactNode;
    };
    backgroundImage?: string;
    backgroundVideo?: string;
    variant?: 'default' | 'centered' | 'split' | 'minimal';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    enableParallax?: boolean;
    enableMagnetic?: boolean;
}
declare const GlassHero: React.ForwardRefExoticComponent<GlassHeroProps & React.RefAttributes<HTMLDivElement>>;
export { GlassHero };
//# sourceMappingURL=glass-hero.d.ts.map