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
import { buildCanonicalUrl } from '@/lib/site-config';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { KeysDirectoryBrowser } from '@/components/keys-directory-browser';

const TOTAL_KEY_PAGES = getPseoTotalCount();
const CANONICAL_URL = buildCanonicalUrl('/keys/');

export const metadata: Metadata = {
  title: 'GTA 6 Regional Digital Keys Directory (PS5 & Xbox Series X|S)',
  description: `Browse ${TOTAL_KEY_PAGES.toLocaleString()} Grand Theft Auto VI digital key guides across PlayStation 5, PS5 Pro, Xbox Series X, and Xbox Series S spanning 20 regional storefronts and 5 game editions.`,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: 'GTA 6 Regional Digital Keys Directory | gta6keys',
    description: `Explore ${TOTAL_KEY_PAGES.toLocaleString()} PS5 and Xbox Series X|S digital key pages organized by country storefront, currency, and edition.`,
    url: CANONICAL_URL,
    type: 'website',
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
        description: `Complete directory of ${TOTAL_KEY_PAGES.toLocaleString()} PlayStation 5 and Xbox Series X|S regional digital key pages.`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <SiteHeader />

      <main className="flex-1">
        {/* Directory Header */}
        <section className="py-10 sm:py-12 px-4 sm:px-6 border-b border-[#262626]">
          <div className="max-w-6xl mx-auto space-y-5">
            <div className="flex items-center gap-2 text-xs text-[#737373]">
              <Link href="/" className="hover:text-[#F5F5F5]">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#A3A3A3]">Keys Directory</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <Globe className="w-6 h-6 text-[#E11D48] mb-3" aria-hidden="true" />
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5]">
                  GTA 6 Regional Digital Keys Directory
                </h1>
                <p className="text-sm sm:text-base text-[#A3A3A3] mt-2 leading-relaxed">
                  Filter {TOTAL_KEY_PAGES.toLocaleString()} indexed digital key pages
                  across {PSEO_PLATFORMS.length} console platforms, {PSEO_REGIONS.length}{' '}
                  regional storefronts, {PSEO_EDITIONS.length} editions, and{' '}
                  {PSEO_INTENTS.length} guide formats.
                </p>
              </div>

              <div className="grid grid-cols-3 border border-[#262626] bg-[#121212] divide-x divide-[#262626] shrink-0 text-center">
                <div className="px-4 py-3">
                  <div className="text-base font-bold font-mono text-[#F5F5F5]">
                    {TOTAL_KEY_PAGES.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-[#737373] mt-0.5">Pages</div>
                </div>
                <div className="px-4 py-3">
                  <div className="text-base font-bold font-mono text-[#F5F5F5]">
                    {PSEO_REGIONS.length}
                  </div>
                  <div className="text-[11px] text-[#737373] mt-0.5">Regions</div>
                </div>
                <div className="px-4 py-3">
                  <div className="text-base font-bold font-mono text-[#F5F5F5]">
                    {PSEO_PLATFORMS.length}
                  </div>
                  <div className="text-[11px] text-[#737373] mt-0.5">Consoles</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Filter Browser */}
        <section aria-label="Filter Digital Keys" className="py-10 px-4 sm:px-6 border-b border-[#262626]">
          <div className="max-w-6xl mx-auto">
            <KeysDirectoryBrowser />
          </div>
        </section>

        {/* Static HTML Storefront Matrix (Crawl Backbone) */}
        <section
          aria-labelledby="matrix-heading"
          className="py-14 px-4 sm:px-6"
        >
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="pb-4 border-b border-[#262626]">
              <h2
                id="matrix-heading"
                className="text-2xl font-bold text-[#F5F5F5]"
              >
                Browse by Platform &amp; Storefront Country
              </h2>
              <p className="text-sm text-[#A3A3A3] mt-1">
                Direct regional hub routes connecting all editions and redemption guides.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PSEO_PLATFORMS.map((platform) => (
                <div
                  key={platform.id}
                  className="bg-[#121212] border border-[#262626] p-5 space-y-4"
                >
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#262626]">
                    <div>
                      <h3 className="text-base font-bold text-[#F5F5F5]">
                        {platform.name}
                      </h3>
                      <p className="text-xs text-[#A3A3A3]">
                        {platform.storefront} · {platform.keyFormatLabel}
                      </p>
                    </div>
                    <Globe className="w-4 h-4 text-[#E11D48] shrink-0" aria-hidden="true" />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {PSEO_REGIONS.map((region) => {
                      const slug = buildPseoSlug(platform.id, region.code, 'standard');
                      return (
                        <Link
                          key={slug}
                          href={`/keys/${slug}`}
                          className="inline-flex items-center justify-between gap-1 px-3 py-2 bg-[#0A0A0A] hover:bg-[#181818] border border-[#262626] hover:border-[#404040] text-xs text-[#F5F5F5]"
                        >
                          <span className="truncate">{region.shortLabel}</span>
                          <span className="font-mono text-[10px] text-[#737373] shrink-0">
                            {region.currency === 'Multi-Currency' ? 'ALL' : region.currency}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Edition Index Strip */}
            <div className="bg-[#121212] border border-[#262626] p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#262626]">
                <h3 className="text-base font-bold text-[#F5F5F5]">
                  Browse by Game Edition
                </h3>
                <span className="text-xs text-[#737373]">
                  Available across all 20 regional storefronts
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {PSEO_EDITIONS.map((edition) => (
                  <Link
                    key={edition.id}
                    href={`/keys/${buildPseoSlug('ps5', 'us', edition.id)}`}
                    className="bg-[#0A0A0A] hover:bg-[#181818] border border-[#262626] hover:border-[#404040] p-3.5 flex flex-col justify-between gap-2"
                  >
                    <div>
                      <span className="text-[11px] font-mono text-[#737373]">
                        {edition.badge}
                      </span>
                      <div className="text-sm font-bold text-[#F5F5F5] mt-0.5">
                        {edition.name}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#E11D48]">Open →</span>
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