import { css } from "../css/index.mjs";
import { getPatternStyles, patternFns } from "../helpers.mjs";

const vstackConfig = {
	transform(props) {
		const { justify, gap, ...rest } = props;
		return {
			display: "flex",
			alignItems: "center",
			justifyContent: justify,
			gap,
			flexDirection: "column",
			...rest,
		};
	},
	defaultValues: { gap: "10px" },
};

export const getVstackStyle = (styles = {}) => {
	const Styles = getPatternStyles(vstackConfig, styles);
	return vstackConfig.transform(Styles, patternFns);
};

export const vstack = (styles) => css(getVstackStyle(styles));
vstack.raw = getVstackStyle;
