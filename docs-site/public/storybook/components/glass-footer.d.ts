export interface GlassFooterLink {
    label: string;
    href: string;
}
export interface GlassFooterProps extends React.HTMLAttributes<HTMLElement> {
    links?: GlassFooterLink[];
}
export declare function GlassFooter({ links, className, ...props }: GlassFooterProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=glass-footer.d.ts.map