import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import {
  PSEO_EDITIONS,
  PSEO_INTENTS,
  PSEO_PLATFORMS,
  PSEO_REGIONS,
  buildPseoSlug,
  getPseoTotalCount,
} from '@/lib/pseo-catalog';
import {
  SITE_CONFIG,
  buildCanonicalUrl,
  buildLanguageAlternates,
} from '@/lib/site-config';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { KeysDirectoryBrowser } from '@/components/keys-directory-browser';

const TOTAL_KEY_PAGES = getPseoTotalCount();
const CANONICAL_URL = buildCanonicalUrl('/keys/');

export const metadata: Metadata = {
  title: 'GTA 6 Digital Keys Directory (PS5 & Xbox)',
  description: `Browse ${TOTAL_KEY_PAGES.toLocaleString()} GTA 6 digital key guides for PS5, PS5 Pro & Xbox Series X|S across 20 regional storefronts, 5 editions, and redemption formats.`,
  alternates: {
    canonical: CANONICAL_URL,
    languages: buildLanguageAlternates('/keys/'),
  },
  openGraph: {
    title: 'GTA 6 Digital Keys Directory (PS5 & Xbox) | gta6keys',
    description: `Browse ${TOTAL_KEY_PAGES.toLocaleString()} PS5 and Xbox Series X|S digital key guides organized by country storefront, currency, and edition.`,
    url: CANONICAL_URL,
    type: 'website',
  },
  other: {
    'article:published_time': SITE_CONFIG.publishedAtIso,
    'article:modified_time': SITE_CONFIG.modifiedAtIso,
  },
};

export default function KeysDirectoryPage() {
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: buildCanonicalUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'GTA 6 Digital Keys Directory',
            item: CANONICAL_URL,
          },
        ],
      },
      {
        '@type': 'CollectionPage',
        name: 'GTA 6 Digital Keys Directory',
        url: CANONICAL_URL,
        inLanguage: [...SITE_CONFIG.supportedLocales],
        datePublished: SITE_CONFIG.publishedAtIso,
        dateModified: SITE_CONFIG.modifiedAtIso,
        description: `Complete directory of ${TOTAL_KEY_PAGES.toLocaleString()} PlayStation 5 and Xbox Series X|S regional digital key pages.`,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <SiteHeader />

      <main className="flex-1">
        {/* Directory Hero Header */}
        <section className="py-12 px-4 sm:px-6 border-b border-[#FF2A85]/20 bg-[#090514]/55">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <Globe
                  className="w-6 h-6 text-[#22D3EE] mb-3"
                  aria-hidden="true"
                />
                <h1 className="font-display text-3xl sm:text-5xl text-[#F8F5FF] leading-none">
                  GTA 6 Regional Digital Keys Directory
                </h1>
                <p className="text-sm sm:text-base text-[#C4B5FD] mt-3 leading-relaxed">
                  Filter {TOTAL_KEY_PAGES.toLocaleString()} indexed digital key
                  pages across {PSEO_PLATFORMS.length} console platforms,{' '}
                  {PSEO_REGIONS.length} regional storefronts,{' '}
                  {PSEO_EDITIONS.length} editions, and {PSEO_INTENTS.length}{' '}
                  guide formats.
                </p>
              </div>

              <div className="grid grid-cols-3 border border-[#FF2A85]/30 bg-[#130B24]/85 backdrop-blur-md divide-x divide-[#2F1F4D] shrink-0 text-center">
                <div className="px-4 py-3">
                  <div className="text-base font-bold font-mono text-[#FF8A3D]">
                    {TOTAL_KEY_PAGES.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-[#C4B5FD] mt-0.5">Pages</div>
                </div>
                <div className="px-4 py-3">
                  <div className="text-base font-bold font-mono text-[#FF2A85]">
                    {PSEO_REGIONS.length}
                  </div>
                  <div className="text-[11px] text-[#C4B5FD] mt-0.5">
                    Regions
                  </div>
                </div>
                <div className="px-4 py-3">
                  <div className="text-base font-bold font-mono text-[#22D3EE]">
                    {PSEO_PLATFORMS.length}
                  </div>
                  <div className="text-[11px] text-[#C4B5FD] mt-0.5">
                    Consoles
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Filter Browser */}
        <section
          aria-label="Filter Digital Keys"
          className="py-10 px-4 sm:px-6 border-b border-[#FF2A85]/20 bg-[#090514]/40"
        >
          <div className="max-w-6xl mx-auto">
            <KeysDirectoryBrowser />
          </div>
        </section>

        {/* Static HTML Storefront Matrix (Crawl Backbone) */}
        <section
          aria-labelledby="matrix-heading"
          className="py-14 px-4 sm:px-6 bg-[#090514]/55"
        >
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="pb-4 border-b border-[#2F1F4D]">
              <h2
                id="matrix-heading"
                className="font-display text-2xl sm:text-3xl text-[#F8F5FF]"
              >
                Browse by Platform &amp; Storefront Country
              </h2>
              <p className="text-sm text-[#C4B5FD] mt-1">
                Direct regional hub routes connecting all editions and
                redemption guides.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PSEO_PLATFORMS.map((platform) => (
                <div
                  key={platform.id}
                  className="bg-[#130B24]/85 backdrop-blur-md border border-[#2F1F4D] p-5 space-y-4"
                >
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#2F1F4D]">
                    <div>
                      <h3 className="text-base font-bold text-[#F8F5FF]">
                        {platform.name}
                      </h3>
                      <p className="text-xs text-[#C4B5FD]">
                        {platform.storefront} · {platform.keyFormatLabel}
                      </p>
                    </div>
                    <Globe
                      className="w-4 h-4 text-[#22D3EE] shrink-0"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {PSEO_REGIONS.map((region) => {
                      const slug = buildPseoSlug(
                        platform.id,
                        region.code,
                        'standard'
                      );
                      return (
                        <Link
                          key={slug}
                          href={`/keys/${slug}`}
                          className="inline-flex items-center justify-between gap-1 px-3 py-2 bg-[#090514]/80 hover:bg-[#1C1133] border border-[#2F1F4D] hover:border-[#FF2A85]/60 text-xs text-[#F8F5FF] transition-colors"
                        >
                          <span className="truncate">{region.shortLabel}</span>
                          <span className="font-mono text-[10px] text-[#22D3EE] shrink-0">
                            {region.currency === 'Multi-Currency'
                              ? 'ALL'
                              : region.currency}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Edition Index Strip */}
            <div className="bg-[#130B24]/85 backdrop-blur-md border border-[#2F1F4D] p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#2F1F4D]">
                <h3 className="text-base font-bold text-[#F8F5FF]">
                  Browse by Game Edition
                </h3>
                <span className="text-xs text-[#C4B5FD]">
                  Available across all 20 regional storefronts
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {PSEO_EDITIONS.map((edition) => (
                  <Link
                    key={edition.id}
                    href={`/keys/${buildPseoSlug('ps5', 'us', edition.id)}`}
                    className="bg-[#090514]/80 hover:bg-[#1C1133] border border-[#2F1F4D] hover:border-[#FF2A85]/60 p-3.5 flex flex-col justify-between gap-2 transition-colors"
                  >
                    <div>
                      <span className="text-[11px] font-mono text-[#FF8A3D]">
                        {edition.badge}
                      </span>
                      <div className="text-sm font-bold text-[#F8F5FF] mt-0.5">
                        {edition.name}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#22D3EE]">
                      Open →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}