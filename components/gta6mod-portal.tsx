import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileCode, KeyRound } from 'lucide-react';
import { OFFICIAL_VI_ASSETS } from '@/lib/mods-repository';
import { SITE_CONFIG } from '@/lib/site-config';
import { withBasePath } from '@/lib/utils';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';
import {
  KeyClaimTerminal,
  PlayStationEmblem,
  XboxEmblem,
} from './key-claim-terminal';
import { FaqAccordion, type FaqAccordionItem } from './faq-accordion';

const HOME_FAQ_ITEMS: FaqAccordionItem[] = [
  {
    id: 'faq-claim-process',
    question: 'How do I claim a GTA 6 digital key for PS5 or Xbox Series X|S?',
    answer:
      'Select your console platform (PlayStation 5, PS5 Pro, Xbox Series X, or Xbox Series S), pick your storefront region and game edition in the claim terminal, then click "Claim Digital Code" to open the verification step.',
  },
  {
    id: 'faq-supported-platforms',
    question: 'Which console storefronts and code formats are supported?',
    answer:
      'PlayStation 5 and PS5 Pro allocations follow the 12-character PlayStation Store voucher format (XXXX-XXXX-XXXX). Xbox Series X and Xbox Series S allocations follow the 25-character Microsoft Store key format (XXXXX-XXXXX-XXXXX-XXXXX-XXXXX).',
  },
  {
    id: 'faq-verification-step',
    question: 'Why is verification required before displaying the code?',
    answer:
      'Verification blocks automated scraping scripts and protects active PS5 and Xbox digital key allocations for individual users.',
  },
  {
    id: 'faq-region-compatibility',
    question: 'Does the digital key need to match my console account region?',
    answer:
      'Yes. PlayStation Store and Microsoft Store enforce regional currency rules. Select the region matching your console account or browse the regional directory at /keys/.',
  },
  {
    id: 'faq-preload-redemption',
    question: 'When do pre-load and digital launch licenses activate?',
    answer:
      `Grand Theft Auto VI launches on ${SITE_CONFIG.releaseDateLabel}. Redeeming a code binds the license to your PlayStation or Xbox library and enables console pre-load ahead of release.`,
  },
  {
    id: 'faq-crawlers-sitemap',
    question: 'Where are the regional key pages and XML sitemap located?',
    answer:
      'All 2,000 regional and edition pages are browsable at /keys/ and indexed across static XML shards referenced in /sitemap.xml and /robots.txt.',
  },
];

const FEATURED_KEY_ROUTES = [
  {
    slug: 'ps5-us-standard',
    title: 'PS5 Standard Edition — USA',
    platform: 'PlayStation 5',
    format: '12-Digit PSN',
    region: 'United States',
  },
  {
    slug: 'xbox-series-x-us-standard',
    title: 'Xbox Series X Standard — USA',
    platform: 'Xbox Series X',
    format: '25-Char Key',
    region: 'United States',
  },
  {
    slug: 'ps5-uk-deluxe',
    title: 'PS5 Vice City Deluxe — UK',
    platform: 'PlayStation 5',
    format: '12-Digit PSN',
    region: 'United Kingdom',
  },
  {
    slug: 'ps5-eu-ultimate',
    title: 'PS5 Leonida Ultimate — Europe',
    platform: 'PlayStation 5',
    format: '12-Digit PSN',
    region: 'Europe (EU)',
  },
  {
    slug: 'ps5-pro-us-ultimate',
    title: 'PS5 Pro Ultimate Edition — USA',
    platform: 'PS5 Pro',
    format: '12-Digit PSN',
    region: 'United States',
  },
  {
    slug: 'xbox-series-s-global-standard',
    title: 'Xbox Series S Standard — Global',
    platform: 'Xbox Series S',
    format: '25-Char Key',
    region: 'Global',
  },
  {
    slug: 'ps5-ca-standard',
    title: 'PS5 Standard Edition — Canada',
    platform: 'PlayStation 5',
    format: '12-Digit PSN',
    region: 'Canada',
  },
  {
    slug: 'xbox-series-x-uk-ultimate',
    title: 'Xbox Series X Ultimate — UK',
    platform: 'Xbox Series X',
    format: '25-Char Key',
    region: 'United Kingdom',
  },
  {
    slug: 'ps5-de-standard',
    title: 'PS5 Standard Edition — Germany',
    platform: 'PlayStation 5',
    format: '12-Digit PSN',
    region: 'Germany',
  },
  {
    slug: 'ps5-fr-standard',
    title: 'PS5 Standard Edition — France',
    platform: 'PlayStation 5',
    format: '12-Digit PSN',
    region: 'France',
  },
  {
    slug: 'ps5-br-standard',
    title: 'PS5 Standard Edition — Brazil',
    platform: 'PlayStation 5',
    format: '12-Digit PSN',
    region: 'Brazil',
  },
  {
    slug: 'ps5-global-preload',
    title: 'PS5 Pre-Load Digital Key — Global',
    platform: 'PlayStation 5',
    format: '12-Digit PSN',
    region: 'Global',
  },
];

const SHOWCASE_CAPTURES = [
  OFFICIAL_VI_ASSETS.screenshots4k[0],
  OFFICIAL_VI_ASSETS.screenshots4k[2],
  OFFICIAL_VI_ASSETS.screenshots4k[4],
];

export function Gta6modPortal() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-transparent text-[#F8F5FF] flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <SiteHeader />

      <main className="flex-1">
        {/* SECTION 1: DIGITAL KEY CLAIM TERMINAL + COVER ART */}
        <section
          id="claim-code"
          aria-labelledby="hero-heading"
          className="py-10 sm:py-16 px-4 sm:px-6 border-b border-[#262626]"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left 7 Columns: Clean Hierarchy + Terminal */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <KeyRound
                  className="w-6 h-6 text-[#E11D48] mb-3"
                  aria-hidden="true"
                />
                <h1
                  id="hero-heading"
                  className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F5F5] leading-tight"
                >
                  Grand Theft Auto VI Digital Keys
                </h1>
                <p className="text-sm sm:text-base text-[#A3A3A3] mt-2 leading-relaxed">
                  Select PlayStation 5 or Xbox Series X|S, match your storefront region,
                  and verify your digital code allocation.
                </p>
              </div>

              <div className="editorial-surface border-[#FF2A85]/30 p-5 sm:p-6">
                <KeyClaimTerminal
                  defaultPlatform="ps5"
                  defaultRegionCode="us"
                  defaultEditionId="standard"
                />
              </div>
            </div>

            {/* Right 5 Columns: Flat Framed Cover Presentation */}
            <div className="lg:col-span-5">
              <div className="vice-card border-[#FF2A85]/30">
                <div className="px-4 py-3 border-b border-[#2F1F4D] flex items-center justify-between text-xs font-mono text-[#C4B5FD]">
                  <span>CONSOLE DIGITAL EDITION</span>
                  <span className="text-[#F5F5F5]">PS5 / XBOX</span>
                </div>

                <div className="relative aspect-[3/4] bg-[#0A0A0A] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={withBasePath(OFFICIAL_VI_ASSETS.heroPoster)}
                    alt="Grand Theft Auto VI Official Cover Art"
                    width={600}
                    height={800}
                    fetchPriority="high"
                    className="w-full h-full object-cover object-center"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-black/25 pointer-events-none"
                  />

                  <div className="absolute inset-0 flex items-center justify-center p-10 pointer-events-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={withBasePath(OFFICIAL_VI_ASSETS.logoVi)}
                      alt="Grand Theft Auto VI Emblem"
                      className="w-3/4 h-auto object-contain"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 border-t border-[#262626] divide-x divide-[#262626] text-center">
                  <div className="p-3">
                    <div className="text-[11px] font-mono uppercase text-[#737373]">
                      Release
                    </div>
                    <div className="text-xs font-bold text-[#F5F5F5] mt-1">
                      Nov 19, 2026
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-[11px] font-mono uppercase text-[#737373]">
                      Format
                    </div>
                    <div className="text-xs font-bold text-[#F5F5F5] mt-1">
                      Digital Key
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-[11px] font-mono uppercase text-[#737373]">
                      Storefronts
                    </div>
                    <div className="text-xs font-bold text-[#E11D48] mt-1">
                      20 Regions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: STOREFRONT REDEMPTION SPECIFICATIONS */}
        <section
          id="how-to-redeem"
          aria-labelledby="redeem-heading"
          className="py-14 px-4 sm:px-6 border-b border-[#262626]"
        >
          <div className="max-w-6xl mx-auto">
            <div className="pb-6 mb-8 border-b border-[#262626]">
              <h2
                id="redeem-heading"
                className="text-2xl sm:text-3xl font-bold text-[#F5F5F5]"
              >
                Console Storefront Redemption
              </h2>
              <p className="text-sm text-[#A3A3A3] mt-1.5">
                Standard redemption procedures for PlayStation Store and Microsoft Store
                digital codes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PS5 */}
              <div className="bg-[#121212] border border-[#262626] p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-[#262626]">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 bg-[#0A0A0A] border border-[#262626] text-[#F5F5F5] flex items-center justify-center shrink-0">
                        <PlayStationEmblem className="w-4 h-4" />
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-[#F5F5F5]">
                          PlayStation 5 &amp; PS5 Pro
                        </h3>
                        <p className="text-xs text-[#A3A3A3]">
                          PlayStation Store · 12-Character Voucher
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#A3A3A3] bg-[#0A0A0A] border border-[#262626] px-2.5 py-1">
                      XXXX-XXXX-XXXX
                    </span>
                  </div>

                  <ol className="space-y-3 text-sm text-[#A3A3A3]">
                    <li>
                      <strong className="text-[#F5F5F5]">1.</strong> Open PlayStation
                      Store on PS5 and select the top-right More menu.
                    </li>
                    <li>
                      <strong className="text-[#F5F5F5]">2.</strong> Select Redeem Code
                      and enter the 12-character regional voucher.
                    </li>
                    <li>
                      <strong className="text-[#F5F5F5]">3.</strong> Confirm activation
                      to add Grand Theft Auto VI to your PSN Game Library.
                    </li>
                  </ol>
                </div>

                <div className="mt-6 pt-4 border-t border-[#262626] flex items-center justify-between text-xs">
                  <span className="text-[#737373]">PSN Regional Account Match Required</span>
                  <Link
                    href="/keys/ps5-us-standard"
                    className="text-[#E11D48] font-bold hover:underline"
                  >
                    PS5 Specifications →
                  </Link>
                </div>
              </div>

              {/* Xbox */}
              <div className="bg-[#121212] border border-[#262626] p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-[#262626]">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 bg-[#0A0A0A] border border-[#262626] text-[#F5F5F5] flex items-center justify-center shrink-0">
                        <XboxEmblem className="w-4 h-4" />
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-[#F5F5F5]">
                          Xbox Series X &amp; Series S
                        </h3>
                        <p className="text-xs text-[#A3A3A3]">
                          Microsoft Store · 25-Character Key
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#A3A3A3] bg-[#0A0A0A] border border-[#262626] px-2.5 py-1">
                      5x5 Key
                    </span>
                  </div>

                  <ol className="space-y-3 text-sm text-[#A3A3A3]">
                    <li>
                      <strong className="text-[#F5F5F5]">1.</strong> Open the Microsoft
                      Store app on Xbox or visit redeem.microsoft.com.
                    </li>
                    <li>
                      <strong className="text-[#F5F5F5]">2.</strong> Choose Redeem from
                      the side menu and enter all 25 characters.
                    </li>
                    <li>
                      <strong className="text-[#F5F5F5]">3.</strong> Confirm redemption
                      to bind the license to My Games &amp; Apps.
                    </li>
                  </ol>
                </div>

                <div className="mt-6 pt-4 border-t border-[#262626] flex items-center justify-between text-xs">
                  <span className="text-[#737373]">Series X &amp; All-Digital Series S</span>
                  <Link
                    href="/keys/xbox-series-x-us-standard"
                    className="text-[#E11D48] font-bold hover:underline"
                  >
                    Xbox Specifications →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: REGIONAL & EDITION KEYS DIRECTORY */}
        <section
          aria-labelledby="directory-heading"
          className="py-14 px-4 sm:px-6 border-b border-[#262626]"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#262626]">
              <div>
                <h2
                  id="directory-heading"
                  className="text-2xl sm:text-3xl font-bold text-[#F5F5F5]"
                >
                  Regional Digital Keys Index
                </h2>
                <p className="text-sm text-[#A3A3A3] mt-1.5">
                  Direct links to country-specific PlayStation 5 and Xbox Series X|S
                  editions.
                </p>
              </div>

              <Link
                href="/keys"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#F5F5F5] bg-[#121212] hover:bg-[#181818] border border-[#262626] hover:border-[#404040] shrink-0"
              >
                <span>Browse All 2,000 Keys</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E11D48]" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURED_KEY_ROUTES.map((item) => (
                <Link
                  key={item.slug}
                  href={`/keys/${item.slug}`}
                  className="bg-[#121212] hover:bg-[#181818] border border-[#262626] hover:border-[#404040] p-4 flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#737373] mb-1.5">
                      <span>{item.platform}</span>
                      <span>{item.format}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#F5F5F5]">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#262626] text-xs">
                    <span className="text-[#A3A3A3]">{item.region}</span>
                    <span className="text-[#E11D48] font-bold">Open →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: 4K REFERENCE GALLERY PREVIEW */}
        <section
          aria-labelledby="media-heading"
          className="py-14 px-4 sm:px-6 border-b border-[#262626]"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#262626]">
              <div>
                <h2
                  id="media-heading"
                  className="text-2xl sm:text-3xl font-bold text-[#F5F5F5]"
                >
                  Official 4K Gallery &amp; Archive
                </h2>
                <p className="text-sm text-[#A3A3A3] mt-1.5">
                  High-resolution Leonida reference captures, mods index, and engine
                  analysis.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold">
                <Link href="/official-media" className="text-[#E11D48] hover:underline">
                  4K Gallery →
                </Link>
                <Link href="/mods" className="text-[#A3A3A3] hover:text-[#F5F5F5]">
                  Mods Directory →
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SHOWCASE_CAPTURES.map((shot) => (
                <Link
                  key={shot.id}
                  href="/official-media"
                  className="bg-[#121212] border border-[#262626] hover:border-[#404040] block"
                >
                  <div className="aspect-video bg-[#0A0A0A] border-b border-[#262626] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={withBasePath(shot.url)}
                      alt={shot.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xs font-mono text-[#A3A3A3]">
                      {shot.category}
                    </div>
                    <div className="text-sm font-bold text-[#F5F5F5] mt-1 truncate">
                      {shot.title}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: FAQ */}
        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="py-14 px-4 sm:px-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#262626]">
              <div>
                <h2
                  id="faq-heading"
                  className="text-2xl sm:text-3xl font-bold text-[#F5F5F5]"
                >
                  Frequently Asked Questions
                </h2>
                <p className="text-sm text-[#A3A3A3] mt-1.5">
                  Direct answers on PS5 and Xbox Series X|S key formats, regions, and
                  redemption.
                </p>
              </div>

              <a
                href={withBasePath('/sitemap.xml')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#E11D48] hover:underline shrink-0"
              >
                <FileCode className="w-3.5 h-3.5" aria-hidden="true" />
                <span>/sitemap.xml</span>
              </a>
            </div>

            <FaqAccordion items={HOME_FAQ_ITEMS} defaultOpenId={HOME_FAQ_ITEMS[0].id} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

export const Gta6keysPortal = Gta6modPortal;
export default Gta6modPortal;