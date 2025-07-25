import { useEffect, useRef } from 'react';

export const useSSRAnimation = (
  _callback?: (element: HTMLElement) => undefined | (() => void)
) => {
  const _elementRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    // @ts-expect-error TS(2304): Cannot find name '_isServer'.
    if (_isServer || !_elementRef._current || !_callback) {
      return;
    }

    // @ts-expect-error TS(2552): Cannot find name 'callback'. Did you mean '_callba... Remove this comment to see the full error message
    cleanupRef.current = callback(elementRef.current);

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
    // @ts-expect-error TS(2552): Cannot find name 'callback'. Did you mean '_callba... Remove this comment to see the full error message
  }, [_callback]);

  // @ts-expect-error TS(2552): Cannot find name 'elementRef'. Did you mean '_elem... Remove this comment to see the full error message
  return elementRef;
};
