import { css } from "../css/index.js";
import { getPatternStyles, patternFns } from "../helpers.js";

const stackConfig = {
  transform(props) {
    const { align, justify, direction, gap, ...rest } = props;
    return {
      display: "flex",
      flexDirection: direction,
      alignItems: align,
      justifyContent: justify,
      gap,
      ...rest,
    };
  },
  defaultValues: { direction: "column", gap: "10px" },
};

export const getStackStyle = (styles = {}) => {
  const Styles = getPatternStyles(stackConfig, styles);
  return stackConfig.transform(Styles, patternFns);
};

export const stack = (styles) => css(getStackStyle(styles));
stack.raw = getStackStyle;
