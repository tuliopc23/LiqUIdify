"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidCommandVariants = cva("flex h-full w-full flex-col overflow-hidden rounded-lg", {
  variants: {
    variant: {
      default: "bg-white/10 backdrop-blur-md border border-white/20",
      glass: "bg-white/5 backdrop-blur-lg border border-white/10",
      solid: "bg-white/20 backdrop-blur-sm border border-white/30",
      ghost: "bg-white/5 backdrop-blur-xl border border-white/5",
    },
    size: {
      sm: "max-h-[300px]",
      md: "max-h-[400px]",
      lg: "max-h-[500px]",
      xl: "max-h-[600px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const commandInputVariants = cva(
  "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-white/50 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "px-3 border-b border-white/20",
        ghost: "px-3",
        underline: "px-3 border-b border-white/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const commandListVariants = cva("max-h-[300px] overflow-y-auto overflow-x-hidden p-1", {
  variants: {
    variant: {
      default: "",
      scrollable: "scrollbar-thin scrollbar-track-white/10 scrollbar-thumb-white/30",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const commandItemVariants = cva(
  "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
  {
    variants: {
      variant: {
        default: "text-white hover:bg-white/10 aria-selected:bg-white/20 aria-selected:text-white",
        ghost: "text-white/80 hover:bg-white/5 aria-selected:bg-white/10 aria-selected:text-white",
      },
      disabled: {
        true: "pointer-events-none opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      disabled: false,
    },
  }
);

interface CommandContextValue {
  search: string;
  setSearch: (search: string) => void;
  filtered: { id: string; value: string; keywords?: string[] }[];
  onSelect: (value: string) => void;
}

const CommandContext = React.createContext<CommandContextValue | undefined>(undefined);

const useCommand = () => {
  const context = React.useContext(CommandContext);
  if (!context) {
    throw new Error("useCommand must be used within a LiquidCommand");
  }
  return context;
};

interface LiquidCommandProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liquidCommandVariants> {
  value?: string;
  onValueChange?: (value: string) => void;
  filter?: (value: string, search: string, keywords?: string[]) => number;
  defaultValue?: string;
  loop?: boolean;
  onSelect?: (value: string) => void;
}

export const LiquidCommand = React.forwardRef<HTMLDivElement, LiquidCommandProps>(
  (
    {
      className,
      variant,
      size,
      value,
      onValueChange,
      filter,
      defaultValue,
      loop = false,
      onSelect,
      children,
      ...props
    },
    ref
  ) => {
    const [search, setSearch] = React.useState("");
    const [items, setItems] = React.useState<{ id: string; value: string; keywords?: string[] }[]>(
      []
    );

    // Default filter function
    const defaultFilter = React.useCallback(
      (value: string, search: string, keywords?: string[]) => {
        const searchLower = search.toLowerCase();
        const valueLower = value.toLowerCase();

        if (valueLower.includes(searchLower)) return 1;

        if (keywords) {
          for (const keyword of keywords) {
            if (keyword.toLowerCase().includes(searchLower)) return 0.8;
          }
        }

        return 0;
      },
      []
    );

    const filterFn = filter || defaultFilter;

    // Filter items based on search
    const filtered = React.useMemo(() => {
      if (!search) return items;

      return items
        .map((item) => ({ ...item, score: filterFn(item.value, search, item.keywords) }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score);
    }, [items, search, filterFn]);

    const handleSelect = React.useCallback(
      (value: string) => {
        onValueChange?.(value);
        onSelect?.(value);
      },
      [onValueChange, onSelect]
    );

    const contextValue = React.useMemo(
      () => ({
        search,
        setSearch,
        filtered,
        onSelect: handleSelect,
      }),
      [search, filtered, handleSelect]
    );

    // Register items from children
    const registerItem = React.useCallback(
      (item: { id: string; value: string; keywords?: string[] }) => {
        setItems((prev) => {
          const exists = prev.find((p) => p.id === item.id);
          if (exists) return prev;
          return [...prev, item];
        });
      },
      []
    );

    const unregisterItem = React.useCallback((id: string) => {
      setItems((prev) => prev.filter((p) => p.id !== id));
    }, []);

    return (
      <CommandContext.Provider value={contextValue}>
        <LiquidGlass
          ref={ref}
          variant="card"
          intensity="medium"
          className={cn(liquidCommandVariants({ variant, size }), className)}
          cmdk-root=""
          {...props}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { registerItem, unregisterItem } as any);
            }
            return child;
          })}
        </LiquidGlass>
      </CommandContext.Provider>
    );
  }
);

LiquidCommand.displayName = "LiquidCommand";

interface LiquidCommandInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof commandInputVariants> {
  icon?: React.ReactNode;
}

export const LiquidCommandInput = React.forwardRef<HTMLInputElement, LiquidCommandInputProps>(
  ({ className, variant, icon, ...props }, ref) => {
    const { search, setSearch } = useCommand();

    return (
      <div className="flex items-center border-b border-white/20 px-3">
        {icon && <div className="mr-2 h-4 w-4 shrink-0 opacity-50">{icon}</div>}
        <input
          ref={ref}
          className={cn(commandInputVariants({ variant }), "flex-1 text-white", className)}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          cmdk-input=""
          {...props}
        />
      </div>
    );
  }
);

LiquidCommandInput.displayName = "LiquidCommandInput";

interface LiquidCommandListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof commandListVariants> {
  registerItem?: (item: { id: string; value: string; keywords?: string[] }) => void;
  unregisterItem?: (id: string) => void;
}

export const LiquidCommandList = React.forwardRef<HTMLDivElement, LiquidCommandListProps>(
  ({ className, variant, children, registerItem, unregisterItem, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(commandListVariants({ variant }), className)}
        cmdk-list=""
        role="listbox"
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { registerItem, unregisterItem } as any);
          }
          return child;
        })}
      </div>
    );
  }
);

LiquidCommandList.displayName = "LiquidCommandList";

interface LiquidCommandEmptyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LiquidCommandEmpty = React.forwardRef<HTMLDivElement, LiquidCommandEmptyProps>(
  ({ className, ...props }, ref) => {
    const { filtered } = useCommand();

    if (filtered.length > 0) return null;

    return (
      <div
        ref={ref}
        className={cn("py-6 text-center text-sm text-white/60", className)}
        cmdk-empty=""
        {...props}
      />
    );
  }
);

LiquidCommandEmpty.displayName = "LiquidCommandEmpty";

interface LiquidCommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: React.ReactNode;
  registerItem?: (item: { id: string; value: string; keywords?: string[] }) => void;
  unregisterItem?: (id: string) => void;
}

export const LiquidCommandGroup = React.forwardRef<HTMLDivElement, LiquidCommandGroupProps>(
  ({ className, heading, children, registerItem, unregisterItem, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("overflow-hidden p-1 text-white", className)}
        cmdk-group=""
        role="group"
        {...props}
      >
        {heading && (
          <div className="px-2 py-1.5 text-xs font-medium text-white/60" cmdk-group-heading="">
            {heading}
          </div>
        )}
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { registerItem, unregisterItem } as any);
          }
          return child;
        })}
      </div>
    );
  }
);

LiquidCommandGroup.displayName = "LiquidCommandGroup";

interface LiquidCommandSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LiquidCommandSeparator = React.forwardRef<HTMLDivElement, LiquidCommandSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("-mx-1 h-px bg-white/20", className)}
        cmdk-separator=""
        {...props}
      />
    );
  }
);

LiquidCommandSeparator.displayName = "LiquidCommandSeparator";

interface LiquidCommandItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof commandItemVariants> {
  value: string;
  keywords?: string[];
  disabled?: boolean;
  onSelect?: (value: string) => void;
  registerItem?: (item: { id: string; value: string; keywords?: string[] }) => void;
  unregisterItem?: (id: string) => void;
}

export const LiquidCommandItem = React.forwardRef<HTMLDivElement, LiquidCommandItemProps>(
  (
    {
      className,
      variant,
      value,
      keywords,
      disabled,
      onSelect: onItemSelect,
      registerItem,
      unregisterItem,
      children,
      ...props
    },
    ref
  ) => {
    const { onSelect } = useCommand();
    const id = React.useId();

    React.useEffect(() => {
      registerItem?.({ id, value, keywords });
      return () => unregisterItem?.(id);
    }, [id, value, keywords, registerItem, unregisterItem]);

    const handleSelect = React.useCallback(() => {
      if (disabled) return;
      onItemSelect?.(value);
      onSelect(value);
    }, [disabled, value, onItemSelect, onSelect]);

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSelect();
        }
      },
      [handleSelect]
    );

    return (
      <div
        ref={ref}
        className={cn(commandItemVariants({ variant, disabled }), className)}
        cmdk-item=""
        role="option"
        aria-disabled={disabled}
        data-value={value}
        onClick={handleSelect}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  }
);

LiquidCommandItem.displayName = "LiquidCommandItem";

interface LiquidCommandShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const LiquidCommandShortcut = React.forwardRef<HTMLSpanElement, LiquidCommandShortcutProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("ml-auto text-xs tracking-widest text-white/60", className)}
        {...props}
      />
    );
  }
);

LiquidCommandShortcut.displayName = "LiquidCommandShortcut";

// Command Dialog wrapper
interface LiquidCommandDialogProps extends LiquidCommandProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export const LiquidCommandDialog = React.forwardRef<HTMLDivElement, LiquidCommandDialogProps>(
  ({ open, onOpenChange, trigger, children, ...commandProps }, ref) => {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;

    const setOpen = React.useCallback(
      (newOpen: boolean) => {
        if (!isControlled) {
          setInternalOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [isControlled, onOpenChange]
    );

    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen(!isOpen);
        }
        if (e.key === "Escape" && isOpen) {
          setOpen(false);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, setOpen]);

    if (!isOpen) {
      return trigger ? <div onClick={() => setOpen(true)}>{trigger}</div> : null;
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        {/* Command */}
        <div className="relative z-50 w-full max-w-lg mx-4">
          <LiquidCommand ref={ref} className="mx-auto" {...commandProps}>
            {children}
          </LiquidCommand>
        </div>
      </div>
    );
  }
);

LiquidCommandDialog.displayName = "LiquidCommandDialog";

export {
  liquidCommandVariants,
  commandInputVariants,
  commandListVariants,
  commandItemVariants,
  type LiquidCommandProps,
};
