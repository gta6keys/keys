'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface FaqAccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqAccordionItem[];
  defaultOpenId?: string | null;
}

export function FaqAccordion({ items, defaultOpenId }: FaqAccordionProps) {
  const initialId =
    defaultOpenId !== undefined ? defaultOpenId : (items[0]?.id ?? null);
  const [openId, setOpenId] = useState<string | null>(initialId);

  return (
    <div className="border border-[#262626] bg-[#121212] divide-y divide-[#262626]">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <article key={item.id}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${item.id}-content`}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-[#181818] cursor-pointer"
              >
                <span className="text-sm sm:text-base font-bold text-[#F5F5F5] leading-snug">
                  {item.question}
                </span>
                {isOpen ? (
                  <ChevronUp
                    aria-hidden="true"
                    className="w-4 h-4 text-[#E11D48] shrink-0"
                  />
                ) : (
                  <ChevronDown
                    aria-hidden="true"
                    className="w-4 h-4 text-[#A3A3A3] shrink-0"
                  />
                )}
              </button>
            </h3>

            {/* Full answer stays in static HTML DOM for search engine crawlers */}
            <div
              id={`${item.id}-content`}
              className={
                isOpen
                  ? 'px-5 pb-5 pt-3 text-sm text-[#A3A3A3] leading-relaxed bg-[#0A0A0A] border-t border-[#262626]'
                  : 'sr-only'
              }
            >
              <p>{item.answer}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}