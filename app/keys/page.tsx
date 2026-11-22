import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, FileCode, Globe, ShieldCheck } from 'lucide-react';
import {
  PSEO_EDITIONS,
  PSEO_INTENTS,
  PSEO_PLATFORMS,
  PSEO_REGIONS,
  buildPseoSlug,
  getPseoTotalCount,
} from '@/lib/pseo-catalog';
import { SITE_CONFIG, buildCanonicalUrl } from '@/lib/site-config';
import { withBasePath } from '@/lib/utils';
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
    <div className="min-h-screen site-ambient-bg text-[#f3f4f6] flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      {/* Sticky Navigation */}
      <header className="sticky top-0 z-40 bg-[#08090D]/80 backdrop-blur-xl border-b border-white/[0.07]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#F43F7E] to-[#F59E0B] text-white font-display font-bold text-sm">
              VI
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              {SITE_CONFIG.name}
            </span>
          </Link>

          <nav
            aria-label="Directory Navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/keys" className="text-white">
              Keys Directory
            </Link>
            <Link href="/official-media" className="hover:text-white transition-colors">
              4K Gallery
            </Link>
            <Link href="/mods" className="hover:text-white transition-colors">
              Mods Archive
            </Link>
          </nav>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.09] transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Claim Hub</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Directory Hero */}
        <section className="pt-10 pb-10 sm:pt-14 sm:pb-12 px-4 sm:px-6 border-b border-white/[0.06]">
          <div className="max-w-6xl mx-auto space-y-5">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-200">Keys Directory</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl space-y-3">
                <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.08]">
                  GTA 6 Digital Keys{' '}
                  <span className="vice-text-gradient">Regional Directory</span>
                </h1>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Filter all {TOTAL_KEY_PAGES.toLocaleString()} indexed Grand Theft Auto VI
                  digital key pages across {PSEO_PLATFORMS.length} console hardware tiers,{' '}
                  {PSEO_REGIONS.length} regional storefronts, {PSEO_EDITIONS.length} editions,
                  and {PSEO_INTENTS.length} redemption guide formats.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5 shrink-0 text-center">
                <div className="rounded-xl bg-[#10121A] border border-white/[0.08] px-4 py-2.5">
                  <div className="font-display text-lg font-bold text-white">
                    {TOTAL_KEY_PAGES.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-400">Indexed Pages</div>
                </div>
                <div className="rounded-xl bg-[#10121A] border border-white/[0.08] px-4 py-2.5">
                  <div className="font-display text-lg font-bold text-white">
                    {PSEO_REGIONS.length}
                  </div>
                  <div className="text-[11px] text-slate-400">Regions</div>
                </div>
                <div className="rounded-xl bg-[#10121A] border border-white/[0.08] px-4 py-2.5">
                  <div className="font-display text-lg font-bold text-white">
                    {PSEO_PLATFORMS.length}
                  </div>
                  <div className="text-[11px] text-slate-400">Consoles</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Filter & Search Explorer */}
        <section
          aria-label="Filter Digital Keys"
          className="py-10 sm:py-12 px-4 sm:px-6"
        >
          <div className="max-w-6xl mx-auto">
            <KeysDirectoryBrowser />
          </div>
        </section>

        {/* Crawl-Friendly Static HTML Regional Matrix (Zero-Orphan SEO Backbone) */}
        <section
          aria-labelledby="matrix-heading"
          className="py-14 px-4 sm:px-6 border-t border-white/[0.06] bg-[#0B0D14]/60"
        >
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#F59E0B] mb-2">
                Full Storefront Matrix
              </p>
              <h2
                id="matrix-heading"
                className="font-display text-2xl sm:text-3xl font-bold text-white"
              >
                Browse by Console Platform &amp; Storefront Country
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Direct links to every regional console hub. Each page connects to all
                5 editions and all 4 redemption guide variants.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PSEO_PLATFORMS.map((platform) => (
                <div
                  key={platform.id}
                  className="rounded-2xl bg-[#10121A] border border-white/[0.08] p-5 sm:p-6 space-y-4"
                >
                  <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-white/[0.07]">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">
                        {platform.name} Regional Keys
                      </h3>
                      <p className="text-xs text-slate-400">
                        {platform.storefront} · {platform.keyFormatLabel}
                      </p>
                    </div>
                    <Globe className="w-4 h-4 text-[#F43F7E] shrink-0" aria-hidden="true" />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {PSEO_REGIONS.map((region) => {
                      const slug = buildPseoSlug(platform.id, region.code, 'standard');
                      return (
                        <Link
                          key={slug}
                          href={`/keys/${slug}`}
                          className="inline-flex items-center justify-between gap-1 px-3 py-2 rounded-lg bg-[#0A0C12] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.16] text-xs text-slate-300 hover:text-white transition-colors"
                        >
                          <span className="truncate">{region.shortLabel}</span>
                          <span className="font-mono text-[10px] text-slate-500 shrink-0">
                            {region.currency === 'Multi-Currency' ? 'ALL' : region.currency}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Edition Quick-Access Strip */}
            <div className="rounded-2xl bg-[#10121A] border border-white/[0.08] p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-white/[0.07]">
                <h3 className="font-display text-lg font-bold text-white">
                  Browse by Grand Theft Auto VI Edition
                </h3>
                <span className="text-xs text-slate-400">
                  Available across all 20 regional storefronts
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {PSEO_EDITIONS.map((edition) => (
                  <Link
                    key={edition.id}
                    href={`/keys/${buildPseoSlug('ps5', 'us', edition.id)}`}
                    className="group rounded-xl bg-[#0A0C12] hover:bg-white/[0.05] border border-white/[0.07] p-3.5 transition-colors flex flex-col justify-between gap-2"
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#F59E0B]">
                        {edition.badge}
                      </span>
                      <div className="font-display text-sm font-semibold text-white group-hover:text-[#F43F7E] transition-colors mt-0.5">
                        {edition.name}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400 group-hover:text-white">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.07] bg-[#07080C] py-8 px-4 sm:px-6 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
            <span>
              Independent digital key guide directory. Not affiliated with Rockstar Games,
              Sony PlayStation, or Microsoft Xbox.
            </span>
          </div>
          <div className="flex items-center gap-4 font-mono shrink-0">
            <a
              href={withBasePath('/sitemap.xml')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#F43F7E] hover:underline"
            >
              <FileCode className="w-3.5 h-3.5" aria-hidden="true" />
              <span>/sitemap.xml</span>
            </a>
            <Link href="/" className="hover:text-white">
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}