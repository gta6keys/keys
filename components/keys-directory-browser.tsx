'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Globe, Search, SlidersHorizontal, X } from 'lucide-react';
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
      {/* Filter Control Bar */}
      <div className="bg-[#121212] border border-[#262626] p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-4 relative">
            <label htmlFor="keys-dir-search" className="sr-only">
              Search digital keys by console, country, currency, or edition
            </label>
            <Search
              className="w-4 h-4 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
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
              className="w-full pl-9 pr-3 py-2 text-sm text-[#F5F5F5] bg-[#0A0A0A] border border-[#262626] placeholder:text-[#737373] focus:outline-none focus:border-[#E11D48]"
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
              className="w-full px-3 py-2 text-sm text-[#F5F5F5] bg-[#0A0A0A] border border-[#262626] focus:outline-none focus:border-[#E11D48] cursor-pointer"
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
              className="w-full px-3 py-2 text-sm text-[#F5F5F5] bg-[#0A0A0A] border border-[#262626] focus:outline-none focus:border-[#E11D48] cursor-pointer"
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
              className="w-full px-3 py-2 text-sm text-[#F5F5F5] bg-[#0A0A0A] border border-[#262626] focus:outline-none focus:border-[#E11D48] cursor-pointer"
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
              Filter by guide type
            </label>
            <select
              id="keys-dir-intent"
              value={intentId}
              onChange={(e) => {
                setIntentId(e.target.value);
                setVisibleLimit(PAGE_SIZE);
              }}
              className="w-full px-3 py-2 text-sm text-[#F5F5F5] bg-[#0A0A0A] border border-[#262626] focus:outline-none focus:border-[#E11D48] cursor-pointer"
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

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#262626] text-xs text-[#A3A3A3]">
          <div className="inline-flex items-center gap-2 font-mono">
            <SlidersHorizontal
              className="w-3.5 h-3.5 text-[#E11D48]"
              aria-hidden="true"
            />
            <span>
              Showing <strong className="text-[#F5F5F5]">{displayedItems.length}</strong>{' '}
              of{' '}
              <strong className="text-[#F5F5F5]">
                {filteredItems.length.toLocaleString()}
              </strong>{' '}
              records
            </span>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-[#F5F5F5] hover:text-[#E11D48] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Grid */}
      {displayedItems.length === 0 ? (
        <div className="bg-[#121212] border border-[#262626] p-10 text-center space-y-3">
          <p className="text-sm text-[#F5F5F5]">No records found.</p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#E11D48] hover:bg-[#BE123C] border border-[#E11D48] cursor-pointer"
          >
            <span>Reset Filters</span>
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedItems.map((item) => (
              <Link
                key={item.slug}
                href={`/keys/${item.slug}`}
                className="bg-[#121212] hover:bg-[#181818] border border-[#262626] hover:border-[#404040] p-4 flex flex-col justify-between gap-3.5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#737373] mb-1.5">
                    <span>{item.platformName}</span>
                    <span>{item.intentLabel}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#F5F5F5] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#A3A3A3] mt-1">{item.editionName}</p>
                </div>

                <div className="pt-3 border-t border-[#262626] flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 text-[#A3A3A3] truncate">
                    <Globe className="w-3.5 h-3.5 text-[#737373] shrink-0" aria-hidden="true" />
                    <span className="truncate">
                      {item.regionName} · {item.currency}
                    </span>
                  </span>
                  <span className="text-[#E11D48] font-bold shrink-0 ml-2">
                    Open →
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
                className="px-5 py-2.5 text-sm font-bold text-[#F5F5F5] bg-[#121212] hover:bg-[#181818] border border-[#262626] hover:border-[#404040] cursor-pointer"
              >
                Load More ({(filteredItems.length - visibleLimit).toLocaleString()} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}