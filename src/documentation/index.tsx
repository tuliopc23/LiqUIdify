'use client';

import React from 'react';
import { GlassUIProvider } from '../providers';
import { GlassButton } from '../components/glass-button';
import { GlassInput } from '../components/glass-input';
import { GlassCard } from '../components/glass-card';
import { GlassModal } from '../components/glass-modal';
import {
  GlassTooltip,
  type GlassTooltipProps,
} from '../components/glass-tooltip';
import { GlassTabs } from '../components/glass-tabs';
import type {
  GlassButtonProps,
  GlassInputProps,
  GlassCardProps,
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

export const DocumentationModal = (props: any) => (
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
