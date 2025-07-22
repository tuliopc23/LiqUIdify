import * as React from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    if ('undefined' === typeof window) {
      return undefined;
    }

    let mounted = true;
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    const onChange = () => {
      if (mounted) {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      }
    };
    
    // Add listener and set initial value
    mql.addEventListener('change', onChange);
    if (mounted) {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    }
    
    return () => {
      mounted = false;
      mql.removeEventListener('change', onChange);
    };
  }, []);

  return !!isMobile;
}
