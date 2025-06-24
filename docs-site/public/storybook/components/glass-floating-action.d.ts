import { default as React } from '../../node_modules/react';
export interface FloatingAction {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}
export interface GlassFloatingActionProps extends React.HTMLAttributes<HTMLDivElement> {
    mainIcon: React.ReactNode;
    actions?: FloatingAction[];
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center';
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'minimal' | 'glow';
    enableMagnetic?: boolean;
    expandDirection?: 'up' | 'down' | 'left' | 'right' | 'radial';
    tooltip?: string;
}
declare const GlassFloatingAction: React.ForwardRefExoticComponent<GlassFloatingActionProps & React.RefAttributes<HTMLDivElement>>;
export { GlassFloatingAction };
//# sourceMappingURL=glass-floating-action.d.ts.map