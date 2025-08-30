// filepath: snippets/preview/ProviderWrapper.jsx
import React from "react";
// Import library styles (exported via "liquidify/styles")
import "liquidify/styles";

export default function ProviderWrapper({ children }) {
  // Enhanced provider with theme context and Apple design tokens
  return (
    <div className="liquidify-provider apple-hig-theme">
      <style jsx global>{`
        .liquidify-provider {
          --liquid-glass-opacity: 0.8;
          --liquid-glass-blur: 20px;
          --liquid-border-opacity: 0.2;
          --liquid-shadow-color: rgba(0, 0, 0, 0.1);
          --liquid-accent: #007AFF;
          --liquid-accent-hover: #0051D5;
          --liquid-surface: rgba(255, 255, 255, 0.1);
          --liquid-surface-elevated: rgba(255, 255, 255, 0.2);
          --liquid-text-primary: #1D1D1F;
          --liquid-text-secondary: #6E6E73;
          --liquid-border: rgba(0, 0, 0, 0.1);
        }
        
        .liquidify-provider.dark {
          --liquid-surface: rgba(0, 0, 0, 0.1);
          --liquid-surface-elevated: rgba(0, 0, 0, 0.2);
          --liquid-text-primary: #F5F5F7;
          --liquid-text-secondary: #8E8E93;
          --liquid-border: rgba(255, 255, 255, 0.1);
          --liquid-shadow-color: rgba(0, 0, 0, 0.3);
        }
        
        .apple-hig-theme {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        @media (prefers-color-scheme: dark) {
          .liquidify-provider {
            --liquid-surface: rgba(0, 0, 0, 0.1);
            --liquid-surface-elevated: rgba(0, 0, 0, 0.2);
            --liquid-text-primary: #F5F5F7;
            --liquid-text-secondary: #8E8E93;
            --liquid-border: rgba(255, 255, 255, 0.1);
            --liquid-shadow-color: rgba(0, 0, 0, 0.3);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .liquidify-provider * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      {children}
    </div>
  );
}
