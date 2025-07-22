import { useEffect, useRef } from "react";

export const useSSRAnimation = (
	_callback?: (element: HTMLElement) => undefined | (() => void),
) => {
	const _elementRef = useRef<HTMLDivElement>(null);
	const cleanupRef = useRef<(() => void) | undefined>(undefined);

	useEffect(() => {
		if (_isServer || !_elementRef._current || !_callback) {
			return;
		}

		cleanupRef.current = callback(elementRef.current);

		return () => {
			if (cleanupRef.current) {
				cleanupRef.current();
			}
		};
	}, [callback]);

	return elementRef;
};
