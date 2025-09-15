import { css } from "../css/index.mjs";
import { getPatternStyles, patternFns } from "../helpers.mjs";

const squareConfig = {
	transform(props) {
		const { size, ...rest } = props;
		return {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flex: "0 0 auto",
			width: size,
			height: size,
			...rest,
		};
	},
};

export const getSquareStyle = (styles = {}) => {
	const Styles = getPatternStyles(squareConfig, styles);
	return squareConfig.transform(Styles, patternFns);
};

export const square = (styles) => css(getSquareStyle(styles));
square.raw = getSquareStyle;
