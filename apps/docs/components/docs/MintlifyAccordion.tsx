import React, { useState } from "react";
import SFIcon from "./SFIcon";

interface MintlifyAccordionProps {
  items: Array<{
    title: string;
    content: React.ReactNode;
    icon?: string;
    defaultOpen?: boolean;
  }>;
  className?: string;
}

export default function MintlifyAccordion({
  items,
  className = "",
}: MintlifyAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(
    new Set(
      items
        .map((item, index) => (item.defaultOpen ? index : -1))
        .filter((i) => i >= 0),
    ),
  );

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className={`mintlify-accordion ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="mintlify-accordion-item">
          <button
            className="mintlify-accordion-trigger"
            onClick={() => toggleItem(index)}
            aria-expanded={openItems.has(index)}
          >
            <span className="sf-icon-text">
              {item.icon && <SFIcon name={item.icon} size="sm" />}
              {item.title}
            </span>
            <SFIcon
              name={openItems.has(index) ? "chevron-up" : "chevron-down"}
              size="sm"
              weight="medium"
            />
          </button>
          {openItems.has(index) && (
            <div className="mintlify-accordion-content">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}
