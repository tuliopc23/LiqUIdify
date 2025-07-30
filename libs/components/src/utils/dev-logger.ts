// Simple dev-only logger that is tree-shaken from prod bundles
export const devLog: typeof console.log = (...arguments_) => {
  if (process.env.NODE_ENV !== "production") {
    console.log("[LiquidUI]", ...arguments_);
  }
};
