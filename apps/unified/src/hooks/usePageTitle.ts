import { useEffect } from "react";

/**
 * Custom hook to update the document title
 * @param title - The title to set for the page
 */
export function usePageTitle(title: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    
    // Cleanup function to restore previous title if needed
    return () => {
      // In most cases, we don't need to restore the previous title
      // as navigation will set a new title anyway
    };
  }, [title]);
}
