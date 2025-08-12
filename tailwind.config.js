export default {
  theme: {
    extend: {
      colors: {
        glass: {
          bg: "rgba(255,255,255,0.25)",
          hl: "rgba(255,255,255,0.75)",
          text: "#ffffff",
          accent: "#fb4268",
          grey: "#444739",
        },
      },
      borderRadius: {
        // HIG-compliant
        "lg-s": "0.75rem", // 12 pt
        "lg-m": "1rem", // 16 pt
        "lg-l": "1.5rem", // 24 pt
      },
      keyframes: {
        "bg-move": {
          "0%": { backgroundPosition: "center center" },
          "100%": { backgroundPosition: "center top" },
        },
      },
      animation: {
        "bg-move": "bg-move 5s ease-in-out infinite alternate",
      },
      boxShadow: {
        glass: "0 6px 6px rgba(0,0,0,.2), 0 0 20px rgba(0,0,0,.1)",
        spec: "inset 1px 1px 0 rgba(255,255,255,.75), inset 0 0 5px rgba(255,255,255,.75)",
      },
      backdropBlur: {
        glass: "4px",
      },
    },
  },
  plugins: [
    // 👉 custom utilities replicating your `.glass-*` helpers
    function glassUtilities({ matchUtilities, theme, addComponents }) {
      addComponents({
        ".glass": {
          "@apply relative flex items-center rounded-lg-m overflow-hidden shadow-glass text-glass-text transition-all duration-400 ease-[cubic-bezier(.175,.885,.32,2.2)] bg-transparent":
            {},
        },
        ".glass-filter": {
          "@apply absolute inset-0 backdrop-blur-glass z-0 saturate-120 brightness-115 rounded-inherit":
            {},
        },
        ".glass-overlay": {
          "@apply absolute inset-0 z-1 bg-[rgba(255,255,255,.25)] rounded-inherit":
            {},
        },
        ".glass-specular": {
          "@apply absolute inset-0 z-2 shadow-spec rounded-inherit": {},
        },
        ".glass-content": {
          "@apply relative z-3 flex flex-wrap items-center justify-around gap-4 py-3 px-7":
            {},
        },
        ".glass-link": {
          "@apply transition-transform duration-200 motion-safe:hover:scale-110 motion-safe:active:scale-95":
            {},
        },
        ".glass-liquid": {
          "@apply glass": {},
          "&::before": {
            content: '""',
            "@apply absolute inset-0 z-1 bg-gradient-to-br from-white/20 to-transparent rounded-inherit":
              {},
          },
          "&::after": {
            content: '""',
            "@apply absolute inset-0 z-2 bg-gradient-to-tl from-white/10 to-transparent rounded-inherit":
              {},
          },
        },
      });

      matchUtilities(
        { radius: (val) => ({ borderRadius: val }) },
        { values: theme("borderRadius") },
      );
    },
  ],
  content: [
    "./libs/components/src/**/*.{js,ts,jsx,tsx,mdx}",
    "./apps/storybook/**/*.{js,ts,jsx,tsx,mdx}",
    "./apps/docs/**/*.{js,ts,jsx,tsx,mdx}",
    "./examples/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
