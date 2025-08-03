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
    require("./tailwind/plugins/liquid-glass").liquidGlassUtilities,
  ],
  content: [
    "./libs/components/src/**/*.{js,ts,jsx,tsx,mdx}",
    "./apps/storybook/**/*.{js,ts,jsx,tsx,mdx}",
    "./apps/docs/**/*.{js,ts,jsx,tsx,mdx}",
    "./examples/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
