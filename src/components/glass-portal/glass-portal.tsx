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
  key,
}) => {
  const [mountNode, setMountNode] = useState<Element | DocumentFragment | null>(
    undefined
  );

  useEffect(() => {
    // Use provided container or create default
    const node = container || document.body;
    setMountNode(node);

    return () => {
      setMountNode(undefined);
    };
  }, [container]);

  // Don't render anything during SSR
  if ('undefined' === typeof window) {
    return ;
  }

  // Don't render until mount node is available
  if (!mountNode) {
    return ;
  }

  return createPortal(children, mountNode, key);
};

GlassPortal.displayName = 'GlassPortal';

export { GlassPortal };
