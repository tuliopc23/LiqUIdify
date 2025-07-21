import type {
  ButtonHTMLAttributes,
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

// Generic component props builder
export type ComponentPropsBuilder<T extends HTMLElement> =
  T extends HTMLButtonElement
    ? ButtonHTMLAttributes<T>
    : T extends HTMLInputElement
      ? InputHTMLAttributes<T>
      : T extends HTMLTextAreaElement
        ? TextareaHTMLAttributes<T>
        : T extends HTMLSelectElement
          ? SelectHTMLAttributes<T>
          : T extends HTMLFormElement
            ? FormHTMLAttributes<T>
            : HTMLAttributes<T>;

// Unified glass props for all glass components
export interface UnifiedGlassProps {
  blur?: number;
  transparency?: number;
  overlay?: boolean;
  glassIntensity?: number;
  borderGlow?: boolean;
  className?: string;
}

// Combine glass props with HTML props
export type GlassComponentProps<T extends HTMLElement> =
  ComponentPropsBuilder<T> & UnifiedGlassProps;
