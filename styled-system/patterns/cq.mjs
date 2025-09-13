import { css } from "../css/index.mjs";
import { getPatternStyles, patternFns } from "../helpers.mjs";

const cqConfig = {
  transform(props) {
    const { name, type, ...rest } = props;
    return {
      containerType: type,
      containerName: name,
      ...rest,
    };
  },
  defaultValues: { type: "inline-size" },
};

export const getCqStyle = (styles = {}) => {
  const Styles = getPatternStyles(cqConfig, styles);
  return cqConfig.transform(Styles, patternFns);
};

export const cq = (styles) => css(getCqStyle(styles));
cq.raw = getCqStyle;
