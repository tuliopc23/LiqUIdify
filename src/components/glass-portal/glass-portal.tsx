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
    null
  );
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient) {
      return;
    }

    // Use provided container or create default
    // Check for document.body availability
    if (!container && (!document.body)) {
      console.warn('[GlassPortal] document.body is not available, portal cannot be created');
      return;
    }
    
    const node = container || document.body;
    setMountNode(node);

    return () => {
      setMountNode(null);
    };
  }, [isClient, container]);

  // Don't render anything during SSR
  if (!isClient) {
    return null;
  }

  // Don't render until mount node is available
  if (!mountNode) {
    return null;
  }

  return createPortal(children, mountNode, key);
};

GlassPortal.displayName = 'GlassPortal';

export { GlassPortal };
