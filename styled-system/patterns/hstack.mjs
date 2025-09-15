import { css } from "../css/index.mjs";
import { getPatternStyles, patternFns } from "../helpers.mjs";

const hstackConfig = {
  transform(props) {
    const { justify, gap, ...rest } = props;
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: justify,
      gap,
      flexDirection: "row",
      ...rest,
    };
  },
  defaultValues: { gap: "10px" },
};

export const getHstackStyle = (styles = {}) => {
  const Styles = getPatternStyles(hstackConfig, styles);
  return hstackConfig.transform(Styles, patternFns);
};

export const hstack = (styles) => css(getHstackStyle(styles));
hstack.raw = getHstackStyle;
