import { cn } from '@/core/utils/classname';

export interface GlassFooterLink {
  label: string;
  href: string;
}

export interface GlassFooterProps extends React.HTMLAttributes<HTMLElement> {
  links?: GlassFooterLink[];
}

export function GlassFooter({ links, className, ...props }: GlassFooterProps) {
  return (
    <footer
      className={cn(
        'glass-effect border-t border-[var(--glass-border)] mt-12',
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 py-8 text-sm text-secondary flex flex-col md:flex-row items-center justify-between gap-4">
        <span>&copy; {new Date().getFullYear()} Liquid Glass UI</span>
        {links && (
          <nav className="flex flex-wrap gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
}
