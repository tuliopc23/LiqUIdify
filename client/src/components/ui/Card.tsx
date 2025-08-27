import React from "react";
import { GlassCard } from "liquidify";

interface CardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}

export const Card: React.FC<CardProps> = ({ icon, title, description, href }) => {
  const content = (
    <div style={{ padding: "var(--space-6)" }}>
      {icon && <div aria-hidden style={{ marginBottom: "var(--space-4)" }}>{icon}</div>}
      <h3 style={{ marginBottom: "var(--space-2)", fontSize: "var(--font-size-h3)" }}>{title}</h3>
      <p style={{ margin: 0 }}>{description}</p>
      {href && (
        <div style={{ marginTop: "var(--space-4)" }}>
          <span style={{ color: "var(--color-accent)" }}>Learn more ›</span>
        </div>
      )}
    </div>
  );

  return (
    <GlassCard asChild className="glass-surface">
      {href ? (
        <a href={href} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
          {content}
        </a>
      ) : (
        <div>{content}</div>
      )}
    </GlassCard>
  );
};

export default Card;
