import { useState, useId, useRef, useCallback, forwardRef } from "react";
import { cn, getGlassClass, microInteraction } from "@/lib/glass-utils";
import { 
  useRovingTabIndex, 
  useLiveRegion, 
  useKeyboardNavigation,
  useReducedMotion,
  ScreenReaderOnly 
} from "@/lib/accessibility-utils";
import { 
  ComponentSize, 
  validateComponentProps, 
  getFocusRingClasses 
} from "@/lib/component-standards";

export interface GlassTabItem {
  /** Unique identifier for the tab */
  id: string;
  /** Display label for the tab */
  label: string;
  /** Content to display in the tab panel */
  content: React.ReactNode;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Icon to display alongside label */
  icon?: React.ReactNode;
  /** Badge content (e.g., notification count) */
  badge?: React.ReactNode;
  /** Tab description for screen readers */
  description?: string;
}

export interface GlassTabsProps {
  /** Array of tab items */
  tabs: GlassTabItem[];
  /** ID of the default active tab */
  defaultTab?: string;
  /** Controlled active tab ID */
  activeTab?: string;
  /** Callback when tab changes */
  onTabChange?: (tabId: string) => void;
  /** Custom CSS class for container */
  className?: string;
  /** Custom CSS class for tab list */
  tabListClassName?: string;
  /** Custom CSS class for tab buttons */
  tabButtonClassName?: string;
  /** Custom CSS class for active tab button */
  activeTabButtonClassName?: string;
  /** Custom CSS class for inactive tab button */
  inactiveTabButtonClassName?: string;
  /** Custom CSS class for tab panels */
  tabPanelClassName?: string;
  /** Tab orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Tab size variant */
  size?: ComponentSize;
  /** Whether tabs should be justified */
  justify?: boolean;
  /** Whether to lazy load tab content */
  lazy?: boolean;
  /** Whether to keep inactive tab panels in DOM */
  keepMounted?: boolean;
  /** Tab variant style */
  variant?: 'default' | 'pills' | 'underline' | 'cards';
}

export const GlassTabs = forwardRef<HTMLDivElement, GlassTabsProps>(({
  tabs,
  defaultTab,
  activeTab: controlledActiveTab,
  onTabChange,
  className,
  tabListClassName,
  tabButtonClassName,
  activeTabButtonClassName,
  inactiveTabButtonClassName,
  tabPanelClassName,
  orientation = 'horizontal',
  size = 'md',
  justify = false,
  lazy = false,
  keepMounted = false,
  variant = 'default',
}, ref) => {
  // Validate props in development
  validateComponentProps({ size }, 'GlassTabs');
  
  // State management
  const [internalActiveTab, setInternalActiveTab] = useState(
    defaultTab || tabs.find(tab => !tab.disabled)?.id || tabs[0]?.id
  );
  
  const currentActiveTab = controlledActiveTab ?? internalActiveTab;
  const isControlled = controlledActiveTab !== undefined;
  
  // Refs and IDs
  const tabListRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const { announce } = useLiveRegion();
  const prefersReducedMotion = useReducedMotion();
  
  // Roving tabindex for keyboard navigation
  const { activeIndex, setActiveIndex } = useRovingTabIndex(
    tabListRef,
    orientation,
    true
  );
  
  // Handle tab change
  const handleTabChange = useCallback((tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (!tab || tab.disabled) return;
    
    if (!isControlled) {
      setInternalActiveTab(tabId);
    }
    onTabChange?.(tabId);
    announce(`${tab.label} tab selected`, 'polite');
  }, [tabs, isControlled, onTabChange, announce]);
  
  // Keyboard navigation
  const handleKeyDown = useKeyboardNavigation({
    onEnter: () => {
      const currentTab = tabs[activeIndex];
      if (currentTab && !currentTab.disabled) {
        handleTabChange(currentTab.id);
      }
    },
    onSpace: () => {
      const currentTab = tabs[activeIndex];
      if (currentTab && !currentTab.disabled) {
        handleTabChange(currentTab.id);
      }
    },
    onHome: () => {
      const firstEnabledIndex = tabs.findIndex(tab => !tab.disabled);
      if (firstEnabledIndex !== -1) {
        setActiveIndex(firstEnabledIndex);
      }
    },
    onEnd: () => {
      const lastEnabledIndex = tabs.length - 1 - [...tabs].reverse().findIndex(tab => !tab.disabled);
      if (lastEnabledIndex !== -1) {
        setActiveIndex(lastEnabledIndex);
      }
    }
  });
  
  // Size classes
  const sizeClasses = {
    xs: "text-xs px-2 py-1",
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
    xl: "text-lg px-6 py-3",
  };
  
  // Variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'pills':
        return {
          tabList: "bg-[var(--glass-bg)] rounded-full p-1",
          active: "bg-[var(--glass-primary)] text-white shadow-md",
          inactive: "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg-hover)]"
        };
      case 'underline':
        return {
          tabList: "border-b border-[var(--glass-border)]",
          active: "border-b-2 border-[var(--glass-primary)] text-[var(--glass-primary)]",
          inactive: "text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-b-2 border-transparent"
        };
      case 'cards':
        return {
          tabList: "space-x-2",
          active: getGlassClass("elevated") + " text-[var(--text-primary)] shadow-lg",
          inactive: getGlassClass("default") + " text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        };
      default:
        return {
          tabList: getGlassClass("default") + " rounded-lg p-1",
          active: "bg-[var(--glass-primary)] text-white",
          inactive: "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg-hover)]"
        };
    }
  };
  
  const variantClasses = getVariantClasses();
  
  return (
    <div ref={ref} className={cn("w-full", className)}>
      {/* Screen reader instructions */}
      <ScreenReaderOnly>
        Use arrow keys to navigate between tabs, Enter or Space to activate.
      </ScreenReaderOnly>
      
      {/* Tab List */}
      <div
        ref={tabListRef}
        role="tablist"
        aria-orientation={orientation}
        className={cn(
          // Base styles
          "flex mb-6",
          
          // Orientation
          orientation === 'vertical' ? "flex-col space-y-1" : "flex-row space-x-1",
          
          // Justify
          justify && "justify-center",
          
          // Variant styles
          variantClasses.tabList,
          
          tabListClassName
        )}
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab, index) => {
          const isActive = currentActiveTab === tab.id;
          const isFocused = activeIndex === index;
          
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-controls={`${baseId}-panel-${tab.id}`}
              aria-selected={isActive}
              aria-disabled={tab.disabled}
              aria-describedby={tab.description ? `${baseId}-desc-${tab.id}` : undefined}
              tabIndex={isFocused ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                // Base styles
                "relative rounded-md font-medium transition-all duration-200",
                "focus:outline-none",
                getFocusRingClasses(),
                microInteraction.gentle,
                
                // Size
                sizeClasses[size],
                
                // Justify
                justify && "flex-1",
                
                // State styles
                isActive ? variantClasses.active : variantClasses.inactive,
                
                // Disabled styles
                tab.disabled && "opacity-50 cursor-not-allowed",
                
                // Animation
                !prefersReducedMotion && "transform hover:scale-105 active:scale-95",
                
                tabButtonClassName,
                isActive ? activeTabButtonClassName : inactiveTabButtonClassName
              )}
              data-testid={`tab-${tab.id}`}
            >
              <div className="flex items-center justify-center gap-2">
                {/* Icon */}
                {tab.icon && (
                  <span className="flex-shrink-0" aria-hidden="true">
                    {tab.icon}
                  </span>
                )}
                
                {/* Label */}
                <span className="truncate">{tab.label}</span>
                
                {/* Badge */}
                {tab.badge && (
                  <span className="flex-shrink-0 ml-1" aria-hidden="true">
                    {tab.badge}
                  </span>
                )}
              </div>
              
              {/* Screen reader description */}
              {tab.description && (
                <ScreenReaderOnly id={`${baseId}-desc-${tab.id}`}>
                  {tab.description}
                </ScreenReaderOnly>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Tab Panels */}
      {tabs.map((tab) => {
        const isActive = currentActiveTab === tab.id;
        const shouldRender = !lazy || isActive || keepMounted;
        
        if (!shouldRender) return null;
        
        return (
          <div
            key={tab.id}
            id={`${baseId}-panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${tab.id}`}
            hidden={!isActive}
            className={cn(
              "focus:outline-none",
              getFocusRingClasses(),
              tabPanelClassName
            )}
            tabIndex={0}
            data-testid={`panel-${tab.id}`}
          >
            {isActive && (
              <div 
                className={cn(
                  variant === 'cards' ? "" : getGlassClass("default") + " rounded-lg p-6",
                  !prefersReducedMotion && "animate-in fade-in duration-200"
                )}
              >
                {tab.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});

GlassTabs.displayName = "GlassTabs";
