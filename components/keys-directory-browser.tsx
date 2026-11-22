'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, Layers, Search, SlidersHorizontal, X } from 'lucide-react';
import {
  PSEO_EDITIONS,
  PSEO_INTENTS,
  PSEO_PLATFORMS,
  PSEO_REGIONS,
  buildPseoSlug,
} from '@/lib/pseo-catalog';

const PAGE_SIZE = 24;

export function KeysDirectoryBrowser() {
  const [platformId, setPlatformId] = useState<string>('all');
  const [regionCode, setRegionCode] = useState<string>('all');
  const [editionId, setEditionId] = useState<string>('all');
  const [intentId, setIntentId] = useState<string>('core');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleLimit, setVisibleLimit] = useState<number>(PAGE_SIZE);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const platforms =
      platformId === 'all'
        ? PSEO_PLATFORMS
        : PSEO_PLATFORMS.filter((p) => p.id === platformId);
    const regions =
      regionCode === 'all'
        ? PSEO_REGIONS
        : PSEO_REGIONS.filter((r) => r.code === regionCode);
    const editions =
      editionId === 'all'
        ? PSEO_EDITIONS
        : PSEO_EDITIONS.filter((e) => e.id === editionId);
    const intents =
      intentId === 'all'
        ? PSEO_INTENTS
        : PSEO_INTENTS.filter((i) => i.id === intentId);

    const results: {
      slug: string;
      title: string;
      platformName: string;
      regionName: string;
      currency: string;
      editionName: string;
      intentLabel: string;
      formatLabel: string;
    }[] = [];

    for (const intent of intents) {
      for (const platform of platforms) {
        for (const region of regions) {
          for (const edition of editions) {
            const title = `GTA 6 ${platform.shortName} ${edition.shortName} — ${region.name}`;
            if (q) {
              const haystack =
                `${title} ${platform.name} ${region.shortLabel} ${region.currency} ${edition.name} ${intent.label}`.toLowerCase();
              if (!haystack.includes(q)) continue;
            }

            results.push({
              slug: buildPseoSlug(
                platform.id,
                region.code,
                edition.id,
                intent.slugSuffix
              ),
              title,
              platformName: platform.name,
              regionName: region.name,
              currency: region.currency,
              editionName: edition.name,
              intentLabel: intent.label,
              formatLabel: platform.keyFormatLabel,
            });
          }
        }
      }
    }

    return results;
  }, [platformId, regionCode, editionId, intentId, searchQuery]);

  const displayedItems = filteredItems.slice(0, visibleLimit);
  const hasFilters =
    platformId !== 'all' ||
    regionCode !== 'all' ||
    editionId !== 'all' ||
    intentId !== 'core' ||
    searchQuery.trim().length > 0;

  const resetFilters = () => {
    setPlatformId('all');
    setRegionCode('all');
    setEditionId('all');
    setIntentId('core');
    setSearchQuery('');
    setVisibleLimit(PAGE_SIZE);
  };

  return (
    <div className="space-y-6">
      {/* Filter Control Panel */}
      <div className="rounded-2xl bg-[#10121A] border border-white/[0.08] p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-4 relative">
            <label htmlFor="keys-dir-search" className="sr-only">
              Search digital keys by console, country, currency, or edition
            </label>
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="keys-dir-search"
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleLimit(PAGE_SIZE);
              }}
              placeholder="Search PS5, Xbox, UK, Deluxe, GBP..."
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm text-white bg-[#0A0C12] border border-white/[0.09] placeholder:text-slate-500 focus:outline-none focus:border-[#F43F7E] transition-colors"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="keys-dir-platform" className="sr-only">
              Filter by platform
            </label>
            <select
              id="keys-dir-platform"
              value={platformId}
              onChange={(e) => {
                setPlatformId(e.target.value);
                setVisibleLimit(PAGE_SIZE);
              }}
              className="w-full px-3 py-2.5 rounded-xl text-sm text-white bg-[#0A0C12] border border-white/[0.09] focus:outline-none focus:border-[#F43F7E] cursor-pointer"
            >
              <option value="all">All Platforms</option>
              {PSEO_PLATFORMS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="keys-dir-region" className="sr-only">
              Filter by region
            </label>
            <select
              id="keys-dir-region"
              value={regionCode}
              onChange={(e) => {
                setRegionCode(e.target.value);
                setVisibleLimit(PAGE_SIZE);
              }}
              className="w-full px-3 py-2.5 rounded-xl text-sm text-white bg-[#0A0C12] border border-white/[0.09] focus:outline-none focus:border-[#F43F7E] cursor-pointer"
            >
              <option value="all">All 20 Regions</option>
              {PSEO_REGIONS.map((r) => (
                <option key={r.code} value={r.code}>
                  {r.name} ({r.currency})
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="keys-dir-edition" className="sr-only">
              Filter by edition
            </label>
            <select
              id="keys-dir-edition"
              value={editionId}
              onChange={(e) => {
                setEditionId(e.target.value);
                setVisibleLimit(PAGE_SIZE);
              }}
              className="w-full px-3 py-2.5 rounded-xl text-sm text-white bg-[#0A0C12] border border-white/[0.09] focus:outline-none focus:border-[#F43F7E] cursor-pointer"
            >
              <option value="all">All Editions</option>
              {PSEO_EDITIONS.map((ed) => (
                <option key={ed.id} value={ed.id}>
                  {ed.shortName}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="keys-dir-intent" className="sr-only">
              Filter by key guide type
            </label>
            <select
              id="keys-dir-intent"
              value={intentId}
              onChange={(e) => {
                setIntentId(e.target.value);
                setVisibleLimit(PAGE_SIZE);
              }}
              className="w-full px-3 py-2.5 rounded-xl text-sm text-white bg-[#0A0C12] border border-white/[0.09] focus:outline-none focus:border-[#F43F7E] cursor-pointer"
            >
              <option value="all">All Key Types (2,000)</option>
              {PSEO_INTENTS.map((intent) => (
                <option key={intent.id} value={intent.id}>
                  {intent.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.06] text-xs text-slate-400">
          <div className="inline-flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#F43F7E]" aria-hidden="true" />
            <span>
              Showing <strong className="text-white">{displayedItems.length}</strong> of{' '}
              <strong className="text-white">
                {filteredItems.length.toLocaleString()}
              </strong>{' '}
              matching digital key routes
            </span>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Grid */}
      {displayedItems.length === 0 ? (
        <div className="rounded-2xl bg-[#10121A] border border-white/[0.08] p-10 text-center space-y-3">
          <p className="text-sm text-slate-300">
            No regional key pages matched your current filter combination.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#F43F7E] hover:bg-[#e11d63] cursor-pointer"
          >
            <span>Show Default Directory</span>
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedItems.map((item) => (
              <Link
                key={item.slug}
                href={`/keys/${item.slug}`}
                className="group rounded-xl bg-[#10121A] hover:bg-[#151824] border border-white/[0.08] hover:border-white/[0.18] p-4 transition-all flex flex-col justify-between gap-3.5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-slate-400 mb-2">
                    <span>{item.platformName}</span>
                    <span className="px-2 py-0.5 rounded bg-white/[0.04] text-slate-300">
                      {item.intentLabel}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-white group-hover:text-[#F43F7E] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{item.editionName}</p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1.5 truncate">
                    <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" aria-hidden="true" />
                    <span className="truncate">
                      {item.regionName} · {item.currency}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-200 font-medium shrink-0 ml-2">
                    <Layers className="w-3 h-3 text-[#F59E0B]" aria-hidden="true" />
                    <ArrowRight className="w-3.5 h-3.5 text-[#F43F7E] group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {visibleLimit < filteredItems.length && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setVisibleLimit((prev) => prev + PAGE_SIZE)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] transition-colors cursor-pointer"
              >
                Load More Keys ({(filteredItems.length - visibleLimit).toLocaleString()} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}