/**
 * GSAP Dynamic Loader
 * Loads GSAP only when needed for advanced animations
 */

let gsapPromise: Promise<any> | null = null;
let gsapModule: any = null;

export interface GSAPModule {
  gsap: any;
  ScrollTrigger?: any;
  MorphSVGPlugin?: any;
}

/**
 * Dynamically imports GSAP and plugins
 */
export async function loadGSAP(plugins: string[] = []): Promise<GSAPModule> {
  if (gsapModule) {
    return gsapModule;
  }

  if (!gsapPromise) {
    gsapPromise = (async () => {
      try {
        // Dynamic import of GSAP core
        const { gsap } = await import('gsap');
        gsapModule = { gsap };

        // Load requested plugins
        if (plugins.includes('ScrollTrigger')) {
          const { ScrollTrigger } = await import('gsap/ScrollTrigger');
          gsap.registerPlugin(ScrollTrigger);
          gsapModule.ScrollTrigger = ScrollTrigger;
        }

        if (plugins.includes('MorphSVGPlugin')) {
          try {
            const { MorphSVGPlugin } = await import('gsap/MorphSVGPlugin');
            gsap.registerPlugin(MorphSVGPlugin);
            gsapModule.MorphSVGPlugin = MorphSVGPlugin;
          } catch (error) {
            console.warn('MorphSVGPlugin not available. Some animations may be limited.');
          }
        }

        return gsapModule;
      } catch (error) {
        console.error('Failed to load GSAP:', error);
        throw error;
      }
    })();
  }

  return gsapPromise;
}

/**
 * Hook to use GSAP with automatic loading
 */
export function useGSAP(plugins: string[] = []) {
  const [gsap, setGsap] = useState<GSAPModule | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      try {
        const module = await loadGSAP(plugins);
        if (mounted) {
          setGsap(module);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [plugins]);

  return { gsap, loading, error };
}

/**
 * Checks if GSAP is available
 */
export function isGSAPAvailable(): boolean {
  return gsapModule !== null;
}

/**
 * Gets GSAP if already loaded, returns null otherwise
 */
export function getGSAP(): GSAPModule | null {
  return gsapModule;
}

// React import for hooks
import { useState, useEffect } from 'react';