import { useEffect, useRef } from 'react';
import { isServer } from '@/utils/ssr-safe';

export const useSSRAnimation = (
  callback?: (element: HTMLElement) => void | (() => void)
) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | void>(undefined);

  useEffect(() => {
    if (isServer || !elementRef.current || !callback) {
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
