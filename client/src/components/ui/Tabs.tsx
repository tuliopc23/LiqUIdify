import React from "react";

export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ items, value, onChange }) => {
  return (
    <div>
      <div
        role="tablist"
        aria-label="Showcase categories"
        style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
      >
        {items.map((item) => {
          const selected = value === item.id;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${item.id}`}
              id={`tab-${item.id}`}
              onClick={() => onChange(item.id)}
              className="button-lg"
              style={{
                padding: "8px 12px",
                borderRadius: 12,
                border: "1px solid var(--color-accent)",
                background: selected ? "var(--color-accent)" : "transparent",
                color: selected ? "#fff" : "var(--color-accent)",
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
