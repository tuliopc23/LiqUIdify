import { css } from "../css/index.mjs";
import { getPatternStyles, patternFns } from "../helpers.mjs";

const boxConfig = {
	transform(props) {
		return props;
	},
};

export const getBoxStyle = (styles = {}) => {
	const Styles = getPatternStyles(boxConfig, styles);
	return boxConfig.transform(Styles, patternFns);
};

export const box = (styles) => css(getBoxStyle(styles));
box.raw = getBoxStyle;
