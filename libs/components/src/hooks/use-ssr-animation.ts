import { useEffect, useRef } from "react";

export const useSSRAnimation = (
  _callback?: (element: HTMLElement) => undefined | (() => void),
) => {
  const _elementRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    const isServer = typeof window === "undefined";
    if (isServer || !_elementRef.current || !_callback) {
      return;
    }

    cleanupRef.current = _callback(_elementRef.current);

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [_callback]);

  return _elementRef;
};
