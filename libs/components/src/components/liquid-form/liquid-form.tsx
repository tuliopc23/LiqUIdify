"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { LiquidLabel } from "../liquid-label";

const liquidFormVariants = cva("space-y-6", {
  variants: {
    variant: {
      default: "",
      card: "p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/20",
      glass: "p-6 rounded-lg bg-white/10 backdrop-blur-md border border-white/30",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const formFieldVariants = cva("space-y-2", {
  variants: {
    variant: {
      default: "",
      inline: "flex items-center space-x-4 space-y-0",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const formMessageVariants = cva("text-sm font-medium", {
  variants: {
    variant: {
      default: "text-white/80",
      error: "text-red-400",
      success: "text-green-400",
      warning: "text-yellow-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// Form validation types
interface ValidationRule {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  min?: number | { value: number; message: string };
  max?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  validate?: (value: any) => boolean | string;
  custom?: (value: any) => Promise<boolean | string> | boolean | string;
}

interface FieldError {
  type: string;
  message: string;
}

interface FormState {
  values: Record<string, any>;
  errors: Record<string, FieldError>;
  touched: Record<string, boolean>;
  isDirty: boolean;
  isValid: boolean;
  isSubmitting: boolean;
}

interface FormContextValue extends FormState {
  register: (
    name: string,
    rules?: ValidationRule
  ) => {
    name: string;
    onChange: (e: React.ChangeEvent<any>) => void;
    onBlur: (e: React.FocusEvent<any>) => void;
    value: any;
    error?: FieldError;
  };
  setValue: (name: string, value: any) => void;
  setError: (name: string, error: FieldError) => void;
  clearErrors: (name?: string) => void;
  handleSubmit: (
    onSubmit: (data: Record<string, any>) => void | Promise<void>
  ) => (e: React.FormEvent) => Promise<void>;
  reset: (values?: Record<string, any>) => void;
  watch: (name?: string) => any;
}

const FormContext = React.createContext<FormContextValue | undefined>(undefined);

const useFormContext = () => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a LiquidForm");
  }
  return context;
};

interface LiquidFormProps
  extends React.FormHTMLAttributes<HTMLFormElement>,
    VariantProps<typeof liquidFormVariants> {
  defaultValues?: Record<string, any>;
  onSubmit?: (data: Record<string, any>) => void | Promise<void>;
  onError?: (errors: Record<string, FieldError>) => void;
  mode?: "onChange" | "onBlur" | "onSubmit";
}

export const LiquidForm = React.forwardRef<HTMLFormElement, LiquidFormProps>(
  (
    {
      className,
      variant,
      defaultValues = {},
      onSubmit,
      onError,
      mode = "onBlur",
      children,
      ...props
    },
    ref
  ) => {
    const [formState, setFormState] = React.useState<FormState>({
      values: defaultValues,
      errors: {},
      touched: {},
      isDirty: false,
      isValid: true,
      isSubmitting: false,
    });

    const [fieldRules, setFieldRules] = React.useState<Record<string, ValidationRule>>({});

    // Validation function
    const validateField = React.useCallback(
      async (name: string, value: any, rules: ValidationRule) => {
        const errors: FieldError[] = [];

        // Required validation
        if (rules.required) {
          const isEmpty =
            value === undefined ||
            value === null ||
            value === "" ||
            (Array.isArray(value) && value.length === 0);
          if (isEmpty) {
            const message =
              typeof rules.required === "string" ? rules.required : `${name} is required`;
            errors.push({ type: "required", message });
          }
        }

        if (value !== undefined && value !== null && value !== "") {
          // MinLength validation
          if (rules.minLength) {
            const minLength =
              typeof rules.minLength === "number" ? rules.minLength : rules.minLength.value;
            const message =
              typeof rules.minLength === "object"
                ? rules.minLength.message
                : `${name} must be at least ${minLength} characters`;
            if (String(value).length < minLength) {
              errors.push({ type: "minLength", message });
            }
          }

          // MaxLength validation
          if (rules.maxLength) {
            const maxLength =
              typeof rules.maxLength === "number" ? rules.maxLength : rules.maxLength.value;
            const message =
              typeof rules.maxLength === "object"
                ? rules.maxLength.message
                : `${name} must be no more than ${maxLength} characters`;
            if (String(value).length > maxLength) {
              errors.push({ type: "maxLength", message });
            }
          }

          // Min validation
          if (rules.min) {
            const min = typeof rules.min === "number" ? rules.min : rules.min.value;
            const message =
              typeof rules.min === "object" ? rules.min.message : `${name} must be at least ${min}`;
            if (Number(value) < min) {
              errors.push({ type: "min", message });
            }
          }

          // Max validation
          if (rules.max) {
            const max = typeof rules.max === "number" ? rules.max : rules.max.value;
            const message =
              typeof rules.max === "object"
                ? rules.max.message
                : `${name} must be no more than ${max}`;
            if (Number(value) > max) {
              errors.push({ type: "max", message });
            }
          }

          // Pattern validation
          if (rules.pattern) {
            const pattern =
              typeof rules.pattern === "object" && "value" in rules.pattern
                ? rules.pattern.value
                : rules.pattern;
            const message =
              typeof rules.pattern === "object" && "message" in rules.pattern
                ? rules.pattern.message
                : `${name} format is invalid`;
            if (!pattern.test(String(value))) {
              errors.push({ type: "pattern", message });
            }
          }

          // Custom validation
          if (rules.validate) {
            const result = rules.validate(value);
            if (result !== true) {
              errors.push({
                type: "validate",
                message: typeof result === "string" ? result : `${name} is invalid`,
              });
            }
          }

          // Async custom validation
          if (rules.custom) {
            try {
              const result = await rules.custom(value);
              if (result !== true) {
                errors.push({
                  type: "custom",
                  message: typeof result === "string" ? result : `${name} is invalid`,
                });
              }
            } catch (_error) {
              errors.push({ type: "custom", message: `${name} validation failed` });
            }
          }
        }

        return errors[0] || null;
      },
      []
    );

    // Register field
    const register = React.useCallback(
      (name: string, rules: ValidationRule = {}) => {
        // Store rules for this field
        setFieldRules((prev) => ({ ...prev, [name]: rules }));

        return {
          name,
          value: formState.values[name] || "",
          error: formState.errors[name],
          onChange: async (e: React.ChangeEvent<any>) => {
            const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

            setFormState((prev) => ({
              ...prev,
              values: { ...prev.values, [name]: value },
              isDirty: true,
            }));

            if (mode === "onChange") {
              const error = await validateField(name, value, rules);
              setFormState((prev) => ({
                ...prev,
                errors: error
                  ? { ...prev.errors, [name]: error }
                  : { ...prev.errors, [name]: undefined },
              }));
            }
          },
          onBlur: async (_e: React.FocusEvent<any>) => {
            setFormState((prev) => ({
              ...prev,
              touched: { ...prev.touched, [name]: true },
            }));

            if (mode === "onBlur" || mode === "onChange") {
              const value = formState.values[name];
              const error = await validateField(name, value, rules);
              setFormState((prev) => ({
                ...prev,
                errors: error
                  ? { ...prev.errors, [name]: error }
                  : { ...prev.errors, [name]: undefined },
              }));
            }
          },
        };
      },
      [formState.values, formState.errors, mode, validateField]
    );

    // Set field value
    const setValue = React.useCallback((name: string, value: any) => {
      setFormState((prev) => ({
        ...prev,
        values: { ...prev.values, [name]: value },
        isDirty: true,
      }));
    }, []);

    // Set field error
    const setError = React.useCallback((name: string, error: FieldError) => {
      setFormState((prev) => ({
        ...prev,
        errors: { ...prev.errors, [name]: error },
      }));
    }, []);

    // Clear errors
    const clearErrors = React.useCallback((name?: string) => {
      setFormState((prev) => ({
        ...prev,
        errors: name ? { ...prev.errors, [name]: undefined } : {},
      }));
    }, []);

    // Handle form submission
    const handleSubmit = React.useCallback(
      (onSubmitCallback: (data: Record<string, any>) => void | Promise<void>) => {
        return async (e: React.FormEvent) => {
          e.preventDefault();

          setFormState((prev) => ({ ...prev, isSubmitting: true }));

          try {
            // Validate all fields
            const errors: Record<string, FieldError> = {};

            for (const [fieldName, rules] of Object.entries(fieldRules)) {
              const value = formState.values[fieldName];
              const error = await validateField(fieldName, value, rules);
              if (error) {
                errors[fieldName] = error;
              }
            }

            if (Object.keys(errors).length > 0) {
              setFormState((prev) => ({
                ...prev,
                errors,
                isValid: false,
                isSubmitting: false,
              }));
              onError?.(errors);
              return;
            }

            // Submit form
            setFormState((prev) => ({ ...prev, isValid: true, errors: {} }));
            await onSubmitCallback(formState.values);
          } catch (error) {
            console.error("Form submission error:", error);
          } finally {
            setFormState((prev) => ({ ...prev, isSubmitting: false }));
          }
        };
      },
      [formState.values, fieldRules, validateField, onError]
    );

    // Reset form
    const reset = React.useCallback(
      (values?: Record<string, any>) => {
        setFormState({
          values: values || defaultValues,
          errors: {},
          touched: {},
          isDirty: false,
          isValid: true,
          isSubmitting: false,
        });
      },
      [defaultValues]
    );

    // Watch field values
    const watch = React.useCallback(
      (name?: string) => {
        return name ? formState.values[name] : formState.values;
      },
      [formState.values]
    );

    // Update isValid when errors change
    React.useEffect(() => {
      const hasErrors = Object.values(formState.errors).some((error) => error);
      setFormState((prev) => ({ ...prev, isValid: !hasErrors }));
    }, [formState.errors]);

    const contextValue = React.useMemo(
      () => ({
        ...formState,
        register,
        setValue,
        setError,
        clearErrors,
        handleSubmit,
        reset,
        watch,
      }),
      [formState, register, setValue, setError, clearErrors, handleSubmit, reset, watch]
    );

    return (
      <FormContext.Provider value={contextValue}>
        <form
          ref={ref}
          className={cn(liquidFormVariants({ variant }), className)}
          onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}
          {...props}
        >
          {children}
        </form>
      </FormContext.Provider>
    );
  }
);

LiquidForm.displayName = "LiquidForm";

// Form Field Component
interface LiquidFormFieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formFieldVariants> {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const LiquidFormField = React.forwardRef<HTMLDivElement, LiquidFormFieldProps>(
  ({ className, variant, name, label, description, required, children, ...props }, ref) => {
    const { errors } = useFormContext();
    const error = errors[name];

    return (
      <div ref={ref} className={cn(formFieldVariants({ variant }), className)} {...props}>
        {label && (
          <LiquidLabel htmlFor={name} required={required} error={!!error} description={description}>
            {label}
          </LiquidLabel>
        )}

        <div className="relative">{children}</div>

        {error && <LiquidFormMessage variant="error">{error.message}</LiquidFormMessage>}
      </div>
    );
  }
);

LiquidFormField.displayName = "LiquidFormField";

// Form Message Component
interface LiquidFormMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof formMessageVariants> {}

export const LiquidFormMessage = React.forwardRef<HTMLParagraphElement, LiquidFormMessageProps>(
  ({ className, variant, children, ...props }, ref) => {
    if (!children) return null;

    return (
      <p ref={ref} className={cn(formMessageVariants({ variant }), className)} {...props}>
        {children}
      </p>
    );
  }
);

LiquidFormMessage.displayName = "LiquidFormMessage";

// Form Description Component
interface LiquidFormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const LiquidFormDescription = React.forwardRef<
  HTMLParagraphElement,
  LiquidFormDescriptionProps
>(({ className, ...props }, ref) => {
  return <p ref={ref} className={cn("text-sm text-white/60", className)} {...props} />;
});

LiquidFormDescription.displayName = "LiquidFormDescription";

// Form Control Component (wraps form inputs)
interface LiquidFormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LiquidFormControl = React.forwardRef<HTMLDivElement, LiquidFormControlProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {children}
      </div>
    );
  }
);

LiquidFormControl.displayName = "LiquidFormControl";

// Hook for using form outside of components
export const useForm = (defaultValues: Record<string, any> = {}) => {
  const [formState, _setFormState] = React.useState<FormState>({
    values: defaultValues,
    errors: {},
    touched: {},
    isDirty: false,
    isValid: true,
    isSubmitting: false,
  });

  // Implementation would mirror the context logic above
  return {
    ...formState,
    register: () => ({}), // Simplified for brevity
    handleSubmit: () => () => {},
    reset: () => {},
    setValue: () => {},
    watch: () => {},
  };
};

export {
  liquidFormVariants,
  formFieldVariants,
  formMessageVariants,
  useFormContext,
  type LiquidFormProps,
  type ValidationRule,
  type FieldError,
};
