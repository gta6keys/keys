'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
    <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#10121A] divide-y divide-white/[0.07]">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <article key={item.id} className="transition-colors">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${item.id}-content`}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full px-5 sm:px-6 py-4.5 flex items-center justify-between gap-4 text-left hover:bg-white/[0.025] transition-colors cursor-pointer"
              >
                <span className="font-display text-base sm:text-lg font-semibold text-white leading-snug">
                  {item.question}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#F43F7E]' : ''
                  }`}
                />
              </button>
            </h3>

            {/* Full answer stays in static HTML DOM for Googlebot while collapsing smoothly */}
            <div
              id={`${item.id}-content`}
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 sm:px-6 pb-5 pt-0.5 text-sm sm:text-[15px] text-slate-300 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}