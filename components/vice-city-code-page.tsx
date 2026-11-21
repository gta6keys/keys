'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  FileCode,
  HelpCircle,
  KeyRound,
  Lock,
  ShieldAlert,
} from 'lucide-react';
import { OFFICIAL_VI_ASSETS } from '@/lib/mods-repository';
import { withBasePath } from '@/lib/utils';
import { ContentLockerModal } from './content-locker-modal';

type ConsolePlatform = 'ps5' | 'xbox';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const SEO_FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-claim-process',
    question: 'How do I claim a GTA 6 digital code for PS5 or Xbox Series X|S?',
    answer:
      'Select PlayStation 5 or Xbox Series X|S in the code terminal above and click "Claim The Code". Complete the verification step inside the content locker modal to unlock your console digital key.',
  },
  {
    id: 'faq-supported-platforms',
    question: 'Which consoles are supported for Grand Theft Auto VI code redemption?',
    answer:
      'Digital codes are formatted exclusively for PlayStation 5 (12-character PlayStation Store voucher) and Xbox Series X|S (25-character Microsoft Store key). Previous console generations are not supported.',
  },
  {
    id: 'faq-content-locker',
    question: 'Why does clicking Claim The Code open a verification content locker?',
    answer:
      'The content locker filters automated bot requests and prevents bulk code scraping. Completing a single verification check confirms a real user session before releasing an available PS5 or Xbox Series X|S code.',
  },
  {
    id: 'faq-region-support',
    question: 'Are the GTA 6 PS5 and Xbox codes valid across regions?',
    answer:
      'Allocated digital keys support standard PlayStation Network and Xbox Live store redemption across North America, Europe, the United Kingdom, and international regions.',
  },
  {
    id: 'faq-release-preload',
    question: 'How do I redeem the GTA 6 code on PlayStation Store or Microsoft Store?',
    answer:
      'On PlayStation 5, open PlayStation Store, select Redeem Code, and enter your 12-character voucher. On Xbox Series X|S, open the Microsoft Store, choose Redeem, and enter your 25-character digital code.',
  },
  {
    id: 'faq-sitemap-seo',
    question: 'Where can search engines access the XML sitemap and crawler directives?',
    answer:
      'The canonical XML sitemap is served at /sitemap.xml with crawler rules at /robots.txt. Full FAQPage structured data is embedded directly in the static HTML document.',
  },
];

function PlayStationIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M9.5 3.5v16.1l3.6 1.2V7.2c0-.6.3-1 .8-.9.6.2.7.7.7 1.4v5.4c2.3 1.1 4.1 0 4.1-2.9 0-2.9-1.1-4.3-4.2-5.4-1.2-.4-3.4-1.1-5-1.3zM13.8 18.4l5.9-2.1c.7-.2.8-.6.2-.8-.6-.2-1.5-.1-2.2.1l-3.9 1.4v-2.2l.2-.1s1.2-.4 2.8-.6c1.6-.2 3.6 0 5.1.6 1.7.6 1.9 1.4 1.5 1.9-.4.5-1.5 1-1.5 1l-8.1 2.9v-2.1zM2.6 18.2c-1.8-.5-2.1-1.5-1.3-2.1.7-.6 2-.9 2-.9l5.3-1.9v2.1l-3.8 1.4c-.7.2-.8.6-.2.8.5.2 1.5.1 2.2-.1l1.8-.6v1.9c-.1 0-.2.1-.4.1-1.8.3-3.7.2-5.6-.7z" />
    </svg>
  );
}

function XboxIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.86 3.03c-.11-.02-.25-.02-.42.02-1.22.25-2.85 1.18-4.44 2.38-1.59-1.2-3.22-2.13-4.44-2.38-.17-.04-.31-.04-.42-.02A8.45 8.45 0 0 1 12 3.5c1.82 0 3.51.57 4.86 1.53zM5.23 6.72c.69-.18 2.4.77 4.44 2.82C7.42 12.2 5.47 15.65 5.42 17.6A8.45 8.45 0 0 1 3.5 12c0-2.01.69-3.85 1.73-5.28zm1.73 12.25c.72-1.86 2.87-4.97 5.04-6.95 2.17 1.98 4.32 5.09 5.04 6.95A8.43 8.43 0 0 1 12 20.5a8.43 8.43 0 0 1-5.04-1.53zm11.62-1.37c-.05-1.95-2-5.4-4.25-8.06 2.04-2.05 3.75-3 4.44-2.82A8.45 8.45 0 0 1 20.5 12c0 2.13-.79 4.08-1.92 5.6z" />
    </svg>
  );
}

export function ViceCityCodePage() {
  const [selectedPlatform, setSelectedPlatform] = useState<ConsolePlatform>('ps5');
  const [lockerOpen, setLockerOpen] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>(SEO_FAQ_ITEMS[0].id);

  const platformLabel =
    selectedPlatform === 'ps5' ? 'PLAYSTATION 5 (PS5)' : 'XBOX SERIES X|S';

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SEO_FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col justify-between vice-city-canvas text-[#F9F2FF]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="sticky top-0 z-40 bg-[#160726] border-b border-[#FF2E88]">
        <div className="max-w-[1200px] mx-auto flex items-stretch justify-between min-h-[56px]">
          <a
            href="#claim-code"
            className="flex items-center gap-3 px-5 border-r border-[#4D1F6E] shrink-0"
          >
            <span className="px-2 py-0.5 bg-[#FF2E88] text-[#160726] font-mono text-xs font-bold leading-none">
              VI
            </span>
            <span className="font-display text-2xl font-bold uppercase tracking-wider text-[#F9F2FF]">
              gta6keys
            </span>
          </a>

          <nav
            aria-label="Static Page Sections"
            className="hidden sm:flex items-stretch"
          >
            <a
              href="#claim-code"
              className="flex items-center px-5 border-l border-[#4D1F6E] font-mono text-xs uppercase tracking-wider text-[#F9F2FF] hover:bg-[#2A0E47]"
            >
              CLAIM CODE
            </a>
            <a
              href="#faq"
              className="flex items-center px-5 border-l border-[#4D1F6E] font-mono text-xs uppercase tracking-wider text-[#F9F2FF] hover:bg-[#2A0E47]"
            >
              Q&amp;A
            </a>
            <a
              href={withBasePath('/sitemap.xml')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-5 border-l border-[#4D1F6E] font-mono text-xs uppercase tracking-wider text-[#FF2E88] hover:bg-[#2A0E47]"
            >
              <FileCode className="w-3.5 h-3.5" aria-hidden="true" />
              <span>SITEMAP.XML</span>
            </a>
          </nav>

          <div className="flex items-center px-3 border-l border-[#4D1F6E]">
            <button
              type="button"
              onClick={() => setLockerOpen(true)}
              className="px-4 py-2 bg-[#FF2E88] text-[#160726] border border-[#FF2E88] font-display font-bold uppercase tracking-wider text-sm cursor-pointer whitespace-nowrap"
            >
              CLAIM THE CODE
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section
          id="claim-code"
          aria-labelledby="hero-heading"
          className="py-12 sm:py-20 px-4 sm:px-6 lg:px-10 border-b border-[#4D1F6E]"
        >
          <div className="max-w-[1200px] mx-auto bg-[#160726] border border-[#FF2E88] grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#4D1F6E]">
              <div>
                <KeyRound className="w-7 h-7 text-[#FF2E88] mb-4" aria-hidden="true" />

                <h1
                  id="hero-heading"
                  className="font-display font-bold uppercase text-[#F9F2FF] tracking-tight mb-3"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                    lineHeight: 1.0,
                  }}
                >
                  GRAND THEFT AUTO VI DIGITAL CODE
                </h1>

                <p className="text-sm sm:text-base text-[#E3CEF5] leading-relaxed mb-8">
                  Available for PlayStation 5 and Xbox Series X|S with direct verification release.
                </p>

                <div className="mb-8">
                  <div className="font-mono text-xs uppercase tracking-wider text-[#FF5CA8] mb-3">
                    01 {'//'} SELECT CONSOLE PLATFORM
                  </div>

                  <div
                    role="radiogroup"
                    aria-label="Select console platform"
                    className="grid grid-cols-1 sm:grid-cols-2 border border-[#4D1F6E] bg-[#1F0A36] divide-y sm:divide-y-0 sm:divide-x divide-[#4D1F6E]"
                  >
                    <button
                      type="button"
                      role="radio"
                      aria-checked={selectedPlatform === 'ps5'}
                      onClick={() => setSelectedPlatform('ps5')}
                      className={`flex items-center justify-between gap-3 px-5 py-4 text-left cursor-pointer ${selectedPlatform === 'ps5'
                          ? 'bg-[#FF2E88] text-[#160726]'
                          : 'bg-[#1F0A36] text-[#F9F2FF]'
                        }`}
                    >
                      <span className="flex items-center gap-3">
                        <PlayStationIcon className="w-5 h-5 shrink-0" />
                        <span className="font-display text-xl font-bold uppercase tracking-wide">
                          PLAYSTATION 5
                        </span>
                      </span>
                      <span
                        className={`font-mono text-[11px] uppercase px-2 py-0.5 border ${selectedPlatform === 'ps5'
                            ? 'border-[#160726] bg-[#160726] text-[#FF2E88]'
                            : 'border-[#4D1F6E] text-[#E3CEF5]'
                          }`}
                      >
                        PS5
                      </span>
                    </button>

                    <button
                      type="button"
                      role="radio"
                      aria-checked={selectedPlatform === 'xbox'}
                      onClick={() => setSelectedPlatform('xbox')}
                      className={`flex items-center justify-between gap-3 px-5 py-4 text-left cursor-pointer ${selectedPlatform === 'xbox'
                          ? 'bg-[#FF2E88] text-[#160726]'
                          : 'bg-[#1F0A36] text-[#F9F2FF]'
                        }`}
                    >
                      <span className="flex items-center gap-3">
                        <XboxIcon className="w-5 h-5 shrink-0" />
                        <span className="font-display text-xl font-bold uppercase tracking-wide">
                          XBOX SERIES X|S
                        </span>
                      </span>
                      <span
                        className={`font-mono text-[11px] uppercase px-2 py-0.5 border ${selectedPlatform === 'xbox'
                            ? 'border-[#160726] bg-[#160726] text-[#FF2E88]'
                            : 'border-[#4D1F6E] text-[#E3CEF5]'
                          }`}
                      >
                        XBOX
                      </span>
                    </button>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="font-mono text-xs uppercase tracking-wider text-[#FF5CA8] mb-3">
                    02 {'//'} INITIATE CODE RELEASE
                  </div>

                  <button
                    type="button"
                    onClick={() => setLockerOpen(true)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 bg-[#FF2E88] text-[#160726] border border-[#FF2E88] cursor-pointer text-left"
                  >
                    <span className="flex items-center gap-4">
                      <Lock className="w-6 h-6 shrink-0" aria-hidden="true" />
                      <span className="flex flex-col">
                        <span className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wide leading-none">
                          CLAIM THE CODE
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-widest mt-1.5 font-bold">
                          SELECTED: {platformLabel} {'//'} OPENS CONTENT LOCKER
                        </span>
                      </span>
                    </span>

                    <span className="hidden sm:inline-block px-3 py-1.5 bg-[#160726] text-[#FF2E88] font-mono text-xs uppercase font-bold shrink-0">
                      UNLOCK →
                    </span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 border border-[#4D1F6E] bg-[#1F0A36] divide-x divide-[#4D1F6E] font-mono text-xs">
                <div className="p-3.5">
                  <div className="text-[10px] uppercase text-[#D6BBE9]">PLATFORMS</div>
                  <div className="text-[#F9F2FF] font-semibold mt-1">PS5 / XBOX</div>
                </div>
                <div className="p-3.5">
                  <div className="text-[10px] uppercase text-[#D6BBE9]">FORMAT</div>
                  <div className="text-[#F9F2FF] font-semibold mt-1">DIGITAL KEY</div>
                </div>
                <div className="p-3.5">
                  <div className="text-[10px] uppercase text-[#D6BBE9]">STATUS</div>
                  <div className="text-[#FF2E88] font-semibold mt-1">AVAILABLE</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#230B3B] p-6 sm:p-10 flex flex-col items-center justify-between gap-6">
              <div className="w-full flex items-center justify-between font-mono text-[11px] uppercase text-[#E3CEF5] pb-3 border-b border-[#4D1F6E]">
                <span>VICE CITY {'//'} LEONIDA EDITION</span>
                <span className="text-[#FF2E88]">PS5 · XBOX</span>
              </div>

              <div className="w-full max-w-[330px] py-4 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setLockerOpen(true)}
                  aria-label="Claim Grand Theft Auto VI Code — Open Content Locker"
                  className="gta-cover-animate relative w-full aspect-[3/4] bg-[#160726] border-2 border-[#FF2E88] overflow-hidden cursor-pointer block text-left"
                >
                  <div className="absolute top-0 inset-x-0 z-20 bg-[#160726] border-b border-[#FF2E88] px-3 py-2 flex items-center justify-between text-[10px] font-mono font-bold uppercase text-[#F9F2FF]">
                    <span className="flex items-center gap-1.5">
                      <PlayStationIcon className="w-3.5 h-3.5 text-[#FF2E88]" />
                      <span>PS5</span>
                    </span>
                    <span className="text-[#FF2E88]">DIGITAL EDITION</span>
                    <span className="flex items-center gap-1.5">
                      <XboxIcon className="w-3.5 h-3.5 text-[#FF2E88]" />
                      <span>XBOX</span>
                    </span>
                  </div>

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={withBasePath(OFFICIAL_VI_ASSETS.heroPoster)}
                    alt="Grand Theft Auto VI Vice City Official Cover Art"
                    className="w-full h-full object-cover object-center"
                  />

                  <div
                    className="absolute inset-0 pointer-events-none bg-[#240A3E]/30"
                    aria-hidden="true"
                  />

                  <div
                    className="gta-cover-scanline absolute inset-x-0 top-0 h-16 pointer-events-none bg-[#FF2E88]/20 border-y border-[#FF2E88]/50"
                    aria-hidden="true"
                  />

                  <div className="absolute inset-0 z-10 flex items-center justify-center p-8 pointer-events-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={withBasePath(OFFICIAL_VI_ASSETS.logoVi)}
                      alt="Grand Theft Auto VI Emblem"
                      className="w-3/4 h-auto object-contain"
                    />
                  </div>

                  <div className="absolute bottom-0 inset-x-0 z-20 bg-[#160726] border-t border-[#FF2E88] px-3 py-2.5 flex items-center justify-between">
                    <span className="font-display text-sm font-bold uppercase tracking-wider text-[#F9F2FF]">
                      GRAND THEFT AUTO VI
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 bg-[#FF2E88] text-[#160726]">
                      CLAIM
                    </span>
                  </div>
                </button>
              </div>

              <div className="w-full border border-[#4D1F6E] bg-[#160726] p-3.5 flex items-center justify-between gap-3 text-xs font-mono">
                <span className="text-[#E3CEF5]">AVAILABLE PLATFORMS</span>
                <span className="flex items-center gap-3 text-[#FF2E88] font-bold">
                  <span className="inline-flex items-center gap-1">
                    <PlayStationIcon className="w-3.5 h-3.5" />
                    <span>PS5</span>
                  </span>
                  <span aria-hidden="true">/</span>
                  <span className="inline-flex items-center gap-1">
                    <XboxIcon className="w-3.5 h-3.5" />
                    <span>XBOX</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="py-14 sm:py-20 px-4 sm:px-6 lg:px-10 border-b border-[#4D1F6E] bg-[#160726]"
        >
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-8 border-b border-[#4D1F6E]">
              <div>
                <HelpCircle className="w-6 h-6 text-[#FF2E88] mb-3" aria-hidden="true" />
                <h2
                  id="faq-heading"
                  className="font-display text-3xl sm:text-5xl font-bold uppercase text-[#F9F2FF] tracking-tight"
                >
                  FREQUENTLY ASKED QUESTIONS
                </h2>
                <p className="text-sm text-[#D6BBE9] max-w-2xl mt-2">
                  Direct answers regarding GTA 6 PS5 and Xbox Series X|S code access, verification, and XML sitemap indexing.
                </p>
              </div>

              <a
                href={withBasePath('/sitemap.xml')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 font-mono text-xs uppercase font-semibold text-[#160726] bg-[#FF2E88] border border-[#FF2E88] whitespace-nowrap shrink-0"
              >
                <FileCode className="w-4 h-4" aria-hidden="true" />
                <span>INSPECT SITEMAP.XML</span>
              </a>
            </div>

            <div className="border border-[#4D1F6E] divide-y divide-[#4D1F6E] bg-[#1F0A36]">
              {SEO_FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaqId === item.id;
                return (
                  <article key={item.id} className="bg-[#1F0A36]">
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`${item.id}-panel`}
                        onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                        className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#2A0E47]"
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="font-mono text-xs text-[#FF2E88] shrink-0">
                            0{idx + 1}
                          </span>
                          <span className="font-display text-xl sm:text-2xl font-bold uppercase text-[#F9F2FF] tracking-wide">
                            {item.question}
                          </span>
                        </span>

                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-[#FF2E88] shrink-0" aria-hidden="true" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[#E3CEF5] shrink-0" aria-hidden="true" />
                        )}
                      </button>
                    </h3>

                    <div
                      id={`${item.id}-panel`}
                      className={
                        isOpen
                          ? 'px-5 sm:px-6 pb-5 pt-3 pl-12 sm:pl-14 text-sm text-[#E3CEF5] leading-relaxed border-t border-[#4D1F6E]/60 bg-[#160726]'
                          : 'sr-only'
                      }
                    >
                      <p>{item.answer}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 px-4 sm:px-6 lg:px-10 bg-[#12051F] text-[#D6BBE9]">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#4D1F6E]">
            <div>
              <div className="font-display text-2xl font-bold uppercase tracking-wider text-[#F9F2FF]">
                gta6keys
              </div>
              <p className="text-xs font-mono text-[#D6BBE9] mt-1">
                Static Vice City Code Portal &amp; Search Engine Index
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-mono uppercase">
              <a href="#claim-code" className="text-[#F9F2FF] hover:text-[#FF2E88]">
                CLAIM CODE
              </a>
              <a href="#faq" className="text-[#F9F2FF] hover:text-[#FF2E88]">
                Q&amp;A
              </a>
              <a
                href={withBasePath('/sitemap.xml')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF2E88] hover:underline"
              >
                /SITEMAP.XML
              </a>
              <a
                href={withBasePath('/robots.txt')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF2E88] hover:underline"
              >
                /ROBOTS.TXT
              </a>
            </div>
          </div>

          <div className="bg-[#1F0A36] border border-[#4D1F6E] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-[#FF2E88] shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-xs text-[#E3CEF5] leading-relaxed">
                Independent community portal. Not affiliated with, endorsed by, or connected to Rockstar Games, Take-Two Interactive, Sony PlayStation, or Microsoft Xbox.
              </p>
            </div>
            <div className="text-xs font-mono text-[#D6BBE9] shrink-0">© 2026 gta6keys</div>
          </div>
        </div>
      </footer>

      <ContentLockerModal
        isOpen={lockerOpen}
        onClose={() => setLockerOpen(false)}
        packageTitle={`GTA VI DIGITAL CODE — ${platformLabel}`}
        theme="vice"
      />
    </div>
  );
}

export const Gta6modPortal = ViceCityCodePage;
export default ViceCityCodePage;
