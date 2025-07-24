import type React from "react";

export interface CheckboxGroupProps {
	children: React.ReactNode;
	name: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ children, name }) => (

	<div role="group" aria-labelledby={name}>
		{children}
	</div>
);

export default CheckboxGroup;
