// React 19 compatibility fixes
declare module "react" {
	namespace JSX {
		interface IntrinsicElements {
			[elemName: string]: any;
		}
	}
}

// Fix ReactNode type compatibility
declare global {
	namespace React {
		type ReactNode =
			| ReactElement
			| string
			| number
			| boolean
			| ReactFragment
			| ReactPortal
			| null
			| undefined;
	}
}

export {};
