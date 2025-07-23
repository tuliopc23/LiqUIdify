// Simple dev-only logger that is tree-shaken from prod bundles
export const devLog: typeof console.log = (...args) => {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("[LiquidUI]", ...args);
  }
};