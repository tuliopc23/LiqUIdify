// Simple dev-only logger that is tree-shaken from prod bundles
export const devLog: typeof console.log = (...arguments_) => {
  if ('production' !== process.env.NODE_ENV) {
    // biome-ignore lint/suspicious/noConsole: Development logger intentionally uses console
    console.log('[LiquidUI]', ...arguments_);
  }
};
