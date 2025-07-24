'use client';

import { GlassButton } from '../components/glass-button-refactored';
import { GlassCard } from '../components/glass-card-refactored';
import { GlassInput } from '../components/glass-input';
import { GlassModal } from '../components/glass-modal';
import { GlassTabs } from '../components/glass-tabs';
import {
  GlassTooltip,
  type GlassTooltipProps,
} from '../components/glass-tooltip';
import { GlassUIProvider } from '../providers';
import type {
  GlassButtonProps,
  GlassCardProps,
  GlassInputProps,
  GlassModalProps,
  GlassTabsProps,
} from '../types';

// Pre-wrapped components with context for documentation use
export const DocumentationButton = (props: GlassButtonProps) => (
  <GlassUIProvider>
    <GlassButton {...props} />
  </GlassUIProvider>
);

export const DocumentationInput = (props: GlassInputProps) => (
  <GlassUIProvider>
    <GlassInput {...props} />
  </GlassUIProvider>
);

export const DocumentationCard = (props: GlassCardProps) => (
  <GlassUIProvider>
    <GlassCard {...props} />
  </GlassUIProvider>
);

export const DocumentationModal = (props: GlassModalProps) => (
  <GlassUIProvider>
    <GlassModal {...props} />
  </GlassUIProvider>
);

export const DocumentationTooltip = (props: GlassTooltipProps) => (
  <GlassUIProvider>
    <GlassTooltip {...props} />
  </GlassUIProvider>
);

export const DocumentationTabs = (props: GlassTabsProps) => (
  <GlassUIProvider>
    <GlassTabs {...props} />
  </GlassUIProvider>
);
