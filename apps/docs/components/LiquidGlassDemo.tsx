import React, { useState, useEffect } from "react";

interface LiquidGlassDemoProps {
  variant?: "hero" | "card" | "button" | "floating";
  size?: "sm" | "md" | "lg" | "xl";
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

export function LiquidGlassDemo({
  variant = "card",
  size = "md",
  children,
  className = "",
  interactive = true,
}: LiquidGlassDemoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-32 h-32";
      case "md":
        return "w-48 h-48";
      case "lg":
        return "w-64 h-64";
      case "xl":
        return "w-80 h-80";
      default:
        return "w-48 h-48";
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "hero":
        return "min-h-[60vh] rounded-3xl";
      case "card":
        return "rounded-2xl p-8";
      case "button":
        return "rounded-xl px-6 py-3 cursor-pointer";
      case "floating":
        return "rounded-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
      default:
        return "rounded-2xl p-8";
    }
  };

  return (
    <>
      {/* SVG Filters for Liquid Glass Effect */}
      <svg className="liquid-glass-filters" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="frosted" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>

          <filter
            id="liquid-distortion"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feTurbulence
              baseFrequency="0.02"
              numOctaves="3"
              result="noise"
              seed="1"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
          </filter>

          <filter id="inner-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Liquid Glass Component */}
      <div
        className={`
          liquid-glass
          ${getVariantClasses()}
          ${variant === "floating" ? getSizeClasses() : ""}
          ${className}
          relative overflow-hidden
          transition-all duration-300 ease-out
          ${isHovered ? "scale-105" : "scale-100"}
        `}
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          border: "2px solid transparent",
          boxShadow: `
            0 0 0 2px rgba(255, 255, 255, 0.6),
            0 16px 32px rgba(0, 0, 0, 0.12),
            0 8px 16px rgba(0, 0, 0, 0.08)
          `,
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Liquid Glass Inner Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "inherit",
            backdropFilter: "blur(1px)",
            boxShadow: `
              inset -10px -8px 0px -11px rgba(255, 255, 255, 0.6),
              inset 0px -9px 0px -8px rgba(255, 255, 255, 0.4)
            `,
            opacity: 0.6,
            filter: "blur(1px) brightness(115%)",
            transition: "all 0.3s ease",
            ...(isHovered && {
              opacity: 0.8,
              filter: "blur(0.5px) brightness(125%)",
            }),
          }}
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, 
              rgba(255, 255, 255, 0.2) 0%, 
              rgba(255, 255, 255, 0.05) 50%, 
              rgba(255, 255, 255, 0.1) 100%
            )`,
            borderRadius: "inherit",
            opacity: isHovered ? 1 : 0.7,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Ripple Effects */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute pointer-events-none"
            style={{
              left: ripple.x - 50,
              top: ripple.y - 50,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.3)",
              transform: "scale(0)",
              animation: "liquid-ripple 0.6s ease-out forwards",
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          {children || (
            <div className="text-center">
              {variant === "floating" && (
                <>
                  <div className="w-8 h-2 bg-white rounded-full mb-2 mx-auto" />
                  <div className="w-2 h-8 bg-white rounded-full mx-auto" />
                </>
              )}
              {variant === "hero" && (
                <div>
                  <h1 className="text-4xl font-bold text-white mb-4">
                    Liquid Glass Morphism
                  </h1>
                  <p className="text-xl text-white/80">
                    Experience the future of UI design
                  </p>
                </div>
              )}
              {variant === "card" && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Glass Card
                  </h3>
                  <p className="text-white/70">
                    Beautiful liquid glass effects
                  </p>
                </div>
              )}
              {variant === "button" && (
                <span className="text-white font-medium">Liquid Button</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* CSS Animation Styles */}
      <style jsx>{`
        @keyframes liquid-ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }

        .liquid-glass {
          filter: url(#frosted);
        }

        .liquid-glass:hover {
          filter: url(#frosted) url(#inner-glow);
        }
      `}</style>
    </>
  );
}

// Floating Liquid Glass Background Component
export function LiquidGlassBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="liquid-bg">
      {/* Animated Background Orbs */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 122, 255, 0.4) 0%, transparent 70%)",
          left: `${mousePosition.x * 0.1}%`,
          top: `${mousePosition.y * 0.1}%`,
          transform: "translate(-50%, -50%)",
          transition: "all 2s ease-out",
          filter: "blur(40px)",
        }}
      />

      <div
        className="absolute w-64 h-64 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(175, 82, 222, 0.4) 0%, transparent 70%)",
          right: `${mousePosition.x * 0.05}%`,
          bottom: `${mousePosition.y * 0.05}%`,
          transform: "translate(50%, 50%)",
          transition: "all 3s ease-out",
          filter: "blur(60px)",
        }}
      />

      <div
        className="absolute w-80 h-80 rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(52, 199, 89, 0.3) 0%, transparent 70%)",
          left: `${50 + mousePosition.x * 0.02}%`,
          top: `${50 + mousePosition.y * 0.02}%`,
          transform: "translate(-50%, -50%)",
          transition: "all 4s ease-out",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}

export default LiquidGlassDemo;
