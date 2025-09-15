import { css } from "../css/index.mjs";
import { getPatternStyles, patternFns } from "../helpers.mjs";

const visuallyHiddenConfig = {
	transform(props) {
		return {
			srOnly: true,
			...props,
		};
	},
};

export const getVisuallyHiddenStyle = (styles = {}) => {
	const Styles = getPatternStyles(visuallyHiddenConfig, styles);
	return visuallyHiddenConfig.transform(Styles, patternFns);
};

export const visuallyHidden = (styles) => css(getVisuallyHiddenStyle(styles));
visuallyHidden.raw = getVisuallyHiddenStyle;
