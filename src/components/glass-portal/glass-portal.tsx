import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useIsClient } from '@/hooks/use-ssr-safe';

export interface GlassPortalProps {
  children: React.ReactNode;
  container?: Element | DocumentFragment;
  key?: string;
}

const GlassPortal: React.FC<GlassPortalProps> = ({
  children,
  container,
  key,
}) => {
  const [mountNode, setMountNode] = useState<Element | DocumentFragment | null>(
    undefined
  );
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient) {
      return undefined;
    }

    // Use provided container or create default
    // Check for document.body availability
    if (!container && (!document.body)) {
      console.warn('[GlassPortal] document.body is not available, portal cannot be created');
      return undefined;
    }
    
    const node = container || document.body;
    setMountNode(node);

    return () => {
      setMountNode(undefined);
    };
  }, [isClient, container]);

  // Don't render anything during SSR
  if (!isClient) {
    return undefined;
  }

  // Don't render until mount node is available
  if (!mountNode) {
    return undefined;
  }

  return createPortal(children, mountNode, key);
};

GlassPortal.displayName = 'GlassPortal';

export { GlassPortal };
