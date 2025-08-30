import React from "react";

// SF Symbols component with proper Apple design integration
interface SFSymbolProps {
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  weight?:
    | "ultralight"
    | "thin"
    | "light"
    | "regular"
    | "medium"
    | "semibold"
    | "bold"
    | "heavy"
    | "black";
  variant?: "monochrome" | "hierarchical" | "palette" | "multicolor";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "danger"
    | "ios-blue"
    | "ios-green"
    | "ios-orange"
    | "ios-red"
    | "ios-purple"
    | "ios-pink"
    | "ios-teal"
    | "ios-indigo"
    | "ios-brown"
    | "ios-gray";
  className?: string;
}

// Map of available SF Symbols from your DesignResources
const SF_SYMBOLS_MAP = {
  // Terminal & Development
  terminal: "apple.terminal.svg",
  "terminal.fill": "apple.terminal.on.rectangle.fill.svg",
  "terminal.rectangle": "apple.terminal.on.rectangle.svg",

  // Arrows & Navigation
  "arrow.down": "arrow.down.to.line.svg",
  "arrow.forward": "arrow.forward.to.line.svg",
  "arrow.left.compact": "arrow.left.to.line.compact.svg",
  "arrow.clockwise": "arrow.trianglehead.clockwise.rotate.90.svg",
  "arrow.counterclockwise": "arrow.trianglehead.counterclockwise.rotate.90.svg",
  "arrow.backward.circle": "arrowshape.backward.circle.svg",
  "arrow.down.circle": "arrowshape.down.circle.svg",
  "arrow.forward.fill": "arrowshape.forward.fill.svg",
  "arrow.right.circle": "arrowshape.right.circle.svg",
  backward: "backward.svg",

  // UI Elements
  capsule: "capsule.svg",
  "checkmark.square": "checkmark.square.svg",
  "checkmark.square.fill": "checkmark.square.fill.svg",
  circle: "circle.svg",
  "circle.fill": "circle.fill.svg",
  square: "square.svg",
  "exclamationmark.square": "exclamationmark.square.svg",
  "questionmark.square": "questionmark.square.svg",

  // Cloud & Storage
  cloud: "cloud.svg",
  "cloud.fill": "cloud.fill.svg",

  // Commands & Actions
  command: "command.svg",
  "command.square": "command.square.svg",

  // Display & Interface
  display: "display.svg",
  house: "house.svg",
  "house.fill": "house.fill.svg",

  // Tools & Utilities
  key: "key.svg",
  keyboard: "keyboard.svg",
  "keyboard.fill": "keyboard.fill.svg",
  "magnifyingglass.minus": "minus.magnifyingglass.svg",
  "magnifyingglass.plus": "plus.magnifyingglass.svg",

  // Media Controls
  "pause.circle": "pause.circle.svg",
  "stop.circle": "stop.circle.svg",
  "stop.circle.fill": "stop.circle.fill.svg",

  // Editing & Documents
  "square.and.pencil.circle": "square.and.pencil.circle.svg",
  "square.and.arrow.up.circle": "square.and.arrow.up.circle.svg",
  "rectangle.and.pencil.and.ellipsis": "rectangle.and.pencil.and.ellipsis.svg",

  // Special Symbols
  "drop.degrees": "drop.degreesign.svg",
  "drop.degrees.fill": "drop.degreesign.fill.svg",
  lessthanequal: "lessthanorequalto.svg",
  "lessthanequal.square.fill": "lessthanorequalto.square.fill.svg",
  "switch.2": "switch.2.svg",
  "switch.programmable": "switch.programmable.svg",
};

// Apple HIG Color System
const APPLE_COLORS = {
  // iOS System Colors
  "ios-blue": "#007AFF",
  "ios-green": "#34C759",
  "ios-indigo": "#5856D6",
  "ios-orange": "#FF9500",
  "ios-pink": "#FF2D92",
  "ios-purple": "#AF52DE",
  "ios-red": "#FF3B30",
  "ios-teal": "#5AC8FA",
  "ios-yellow": "#FFCC00",
  "ios-brown": "#A2845E",
  "ios-gray": "#8E8E93",

  // Semantic Colors
  primary: "#007AFF",
  secondary: "#8E8E93",
  accent: "#5856D6",
  success: "#34C759",
  warning: "#FF9500",
  danger: "#FF3B30",
};

// Size mappings following Apple's type scale
const SIZE_MAP = {
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "20px",
  xl: "24px",
  "2xl": "32px",
};

export function SFSymbol({
  name,
  size = "md",
  weight = "regular",
  variant = "monochrome",
  color = "primary",
  className = "",
}: SFSymbolProps) {
  const symbolFile = SF_SYMBOLS_MAP[name];

  if (!symbolFile) {
    console.warn(
      `SF Symbol "${name}" not found. Available symbols:`,
      Object.keys(SF_SYMBOLS_MAP)
    );
    return null;
  }

  const symbolColor = APPLE_COLORS[color] || color;
  const symbolSize = SIZE_MAP[size] || size;

  return (
    <span
      className={`inline-flex items-center justify-center sf-symbol sf-symbol-${variant} sf-symbol-${weight} ${className}`}
      style={{
        width: symbolSize,
        height: symbolSize,
        color: symbolColor,
        fontSize: symbolSize,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="sf-symbol-svg"
      >
        <use href={`/DesignResources/${symbolFile}#symbol`} />
      </svg>
    </span>
  );
}

// Convenient wrapper for common SF Symbol patterns
export function SFSymbolButton({
  symbol,
  children,
  variant = "ghost",
  size = "md",
  onClick,
  className = "",
}: {
  symbol: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
}) {
  const buttonSizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  const buttonVariants = {
    primary: "bg-ios-blue text-white hover:bg-ios-blue/90",
    secondary:
      "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700",
    ghost: "text-ios-blue hover:bg-ios-blue/10",
    danger: "bg-ios-red text-white hover:bg-ios-red/90",
  };

  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 rounded-lg font-medium transition-all duration-200
        ${buttonSizes[size]}
        ${buttonVariants[variant]}
        ${className}
      `}
    >
      <SFSymbol name={symbol} size={size} />
      {children}
    </button>
  );
}

// SF Symbol icon grid for documentation
export function SFSymbolGrid() {
  const symbolCategories = {
    Navigation: [
      "house",
      "house.fill",
      "arrow.forward",
      "arrow.backward.circle",
      "arrow.down.circle",
    ],
    Actions: [
      "command",
      "command.square",
      "checkmark.square",
      "checkmark.square.fill",
      "square.and.pencil.circle",
    ],
    Interface: ["circle", "circle.fill", "square", "capsule", "display"],
    Development: [
      "terminal",
      "terminal.fill",
      "keyboard",
      "keyboard.fill",
      "key",
    ],
    Cloud: ["cloud", "cloud.fill", "square.and.arrow.up.circle"],
    Media: ["pause.circle", "stop.circle", "stop.circle.fill", "backward"],
    Utilities: [
      "magnifyingglass.plus",
      "magnifyingglass.minus",
      "switch.2",
      "switch.programmable",
    ],
  };

  return (
    <div className="space-y-8">
      {Object.entries(symbolCategories).map(([category, symbols]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-ios-blue rounded-full"></span>
            {category}
          </h3>
          <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-4">
            {symbols.map((symbol) => (
              <div
                key={symbol}
                className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-black/40 transition-all cursor-pointer group"
                title={symbol}
              >
                <SFSymbol
                  name={symbol}
                  size="lg"
                  color="ios-blue"
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="text-xs text-gray-600 dark:text-gray-400 text-center leading-tight">
                  {symbol.replace(/\./g, "\u200B.")}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SFSymbol;
