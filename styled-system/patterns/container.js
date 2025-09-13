import { css } from "../css/index.js";
import { getPatternStyles, patternFns } from "../helpers.js";

const containerConfig = {
  transform(props) {
    return {
      position: "relative",
      maxWidth: "8xl",
      mx: "auto",
      px: { base: "4", md: "6", lg: "8" },
      ...props,
    };
  },
};

export const getContainerStyle = (styles = {}) => {
  const Styles = getPatternStyles(containerConfig, styles);
  return containerConfig.transform(Styles, patternFns);
};

export const container = (styles) => css(getContainerStyle(styles));
container.raw = getContainerStyle;
