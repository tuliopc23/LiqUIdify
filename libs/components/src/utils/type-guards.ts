import is from "@sindresorhus/is";
import type {
  Except,
  LiteralUnion,
  Merge,
  PartialDeep,
  RequireAtLeastOne,
  SetOptional,
  SetRequired,
  ValueOf,
} from "type-fest";

// Re-export commonly used is functions for convenience
// Custom type guards for Glass UI components
export const isGlassComponent = (value: unknown): value is HTMLElement => {
  return is.htmlElement(value) && value.classList.contains("glass-");
};

export const isValidOpacity = (value: unknown): value is number => {
  return is.number(value) && is.inRange(value, [0, 1]);
};

export const isValidBlur = (value: unknown): value is number => {
  return is.number(value) && is.inRange(value, [0, 100]);
};

// Type utilities using type-fest
type GlassVariant = LiteralUnion<
  "default" | "subtle" | "intense" | "dark",
  string
>;

type GlassSize = LiteralUnion<"xs" | "sm" | "md" | "lg" | "xl", string>;

// Component props utilities
type WithClassName<T> = Merge<T, { className?: string }>;
type WithChildren<T> = Merge<T, { children?: React.ReactNode }>;
type WithRef<T> = Merge<T, { ref?: React.Ref<Element> }>;

// Make certain props required
type RequireProps<T, K extends keyof T> = SetRequired<T, K>;

// Make certain props optional
type OptionalProps<T, K extends keyof T> = SetOptional<T, K>;

// Omit certain props
type OmitProps<T, K extends keyof T> = Except<T, K>;

// Require at least one of specified props
type RequireOneOf<T, K extends keyof T> = RequireAtLeastOne<T, K>;

// Deep partial for complex state objects
type DeepPartial<T> = PartialDeep<T>;

// Extract values from object types
type Values<T> = ValueOf<T>;

// Validation helpers
export const validateGlassProps = (props: unknown) => {
  is.assert.plainObject(props);

  const glassProp = props as Record<string, unknown>;

  if ("opacity" in glassProp) {
    is.assert.number(glassProp.opacity);
    if (!isValidOpacity(glassProp.opacity)) {
      throw new TypeError("Opacity must be between 0 and 1");
    }
  }

  if ("blur" in glassProp) {
    is.assert.number(glassProp.blur);
    if (!isValidBlur(glassProp.blur)) {
      throw new TypeError("Blur must be between 0 and 100");
    }
  }

  return true;
};

// Type-safe event handler creator
const _createEventHandler = <T extends HTMLElement, E extends Event>(
  handler: (event: E, element: T) => void,
) => {
  return (event: E) => {
    const element = event.currentTarget as T;
    if (!is.htmlElement(element)) {
      throw new TypeError("Event target must be an HTML element");
    }
    handler(event, element);
  };
};
