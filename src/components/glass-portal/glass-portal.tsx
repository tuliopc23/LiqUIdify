import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface GlassPortalProps {
  children: React.ReactNode;
  container?: Element | DocumentFragment;
  key?: string;
}

const GlassPortal: React.FC<GlassPortalProps> = ({ 
  children, 
  container,
  key 
}) => {
  const [mountNode, setMountNode] = useState<Element | DocumentFragment | null>(null);

  useEffect(() => {
    // Use provided container or create default
    const node = container || document.body;
    setMountNode(node);
    
    return () => {
      setMountNode(null);
    };
  }, [container]);

  // Don't render anything during SSR
  if (typeof window === 'undefined') {
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
