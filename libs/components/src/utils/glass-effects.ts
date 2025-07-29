export const glassEffect = {
  base: 'backdrop-blur-xl bg-white/10 border border-white/20',
  hover: 'hover:bg-white/20 hover:border-white/30',
  active: 'active:bg-white/30',
};

export const applyGlassEffect = (intensity = 1) => ({
  backdropFilter: `blur(${12 * intensity}px)`,
  backgroundColor: `rgba(255, 255, 255, ${0.1 * intensity})`,
  border: `1px solid rgba(255, 255, 255, ${0.2 * intensity})`,
});
