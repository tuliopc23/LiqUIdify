import { css } from "../css/index.js";
import { getPatternStyles, patternFns } from "../helpers.js";

const centerConfig = {
  transform(props) {
    const { inline, ...rest } = props;
    return {
      display: inline ? "inline-flex" : "flex",
      alignItems: "center",
      justifyContent: "center",
      ...rest,
    };
  },
};

export const getCenterStyle = (styles = {}) => {
  const Styles = getPatternStyles(centerConfig, styles);
  return centerConfig.transform(Styles, patternFns);
};

export const center = (styles) => css(getCenterStyle(styles));
center.raw = getCenterStyle;
