import React, { Component, ReactNode } from "react";
import { Button } from "liquidify";
import { css } from "../../../../styled-system/css";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const containerClass = css({
        minH: "calc(100dvh - 80px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgGradient: "linear(to-b, #0b0f1a, #0e1016)",
        px: 4,
      });

      const cardClass = css({
        w: "full",
        maxW: "md",
        p: 8,
        borderRadius: "xl",
        color: "token(colors.text.glass.primary)",
        textAlign: "center",
        background: "token(colors.glass.bg)",
        backdropFilter: "blur(token(blurs.glass.md))",
        border: "1px solid token(colors.glass.border)",
        boxShadow: "token(shadows.glass.base)",
        // Fallback & accessibility
        '@supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none))': {
          backgroundColor: "rgba(20,20,20,0.7)",
        },
        '[data-reduced-transparency="true"] &': {
          backdropFilter: "none",
          backgroundColor: "rgba(20,20,20,0.85)",
        },
      });

      const iconClass = css({ 
        fontSize: "4xl", 
        mb: 4, 
        color: "token(colors.text.glass.muted)" 
      });
      
      const titleClass = css({ 
        fontSize: "2xl", 
        fontWeight: "semibold", 
        lineHeight: 1.2, 
        mb: 4, 
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif" 
      });
      
      const bodyClass = css({ 
        fontSize: "md", 
        color: "token(colors.text.glass.secondary)", 
        mb: 6 
      });
      
      const actionsClass = css({ 
        display: "flex", 
        gap: 4, 
        justifyContent: "center", 
        flexWrap: "wrap" 
      });

      return (
        <main className={containerClass}>
          <div className={cardClass}>
            <div className={iconClass}>⚠️</div>
            <h1 className={titleClass}>Something went wrong</h1>
            <p className={bodyClass}>
              An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
            </p>
            <div className={actionsClass}>
              <Button onClick={this.handleReset}>Try Again</Button>
              <Button 
                variant="secondary" 
                onClick={() => window.location.href = "/"}
              >
                Go Home
              </Button>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
