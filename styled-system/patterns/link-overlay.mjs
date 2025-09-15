import { css } from "../css/index.mjs";
import { getPatternStyles, patternFns } from "../helpers.mjs";

const linkOverlayConfig = {
	transform(props) {
		return {
			_before: {
				content: '""',
				position: "absolute",
				inset: "0",
				zIndex: "0",
				...props._before,
			},
			...props,
		};
	},
};

export const getLinkOverlayStyle = (styles = {}) => {
	const Styles = getPatternStyles(linkOverlayConfig, styles);
	return linkOverlayConfig.transform(Styles, patternFns);
};

export const linkOverlay = (styles) => css(getLinkOverlayStyle(styles));
linkOverlay.raw = getLinkOverlayStyle;
