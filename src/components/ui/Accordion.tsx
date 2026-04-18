"use client";

import { useState } from "react";

type AccordionItem = {
  id: string;
  title: string;
  content: string;
};

type AccordionProps = {
  items: AccordionItem[];
  allowMultiple?: boolean;
};

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOpenItems((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        return (
          <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-foreground hover:bg-gray-50 transition-colors cursor-pointer"
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <svg
                className={`w-5 h-5 text-brand transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`accordion-content ${isOpen ? "open" : ""}`}>
              <div>
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
