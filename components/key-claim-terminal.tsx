'use client';

import React, { useMemo, useState } from 'react';
import { ArrowRight, Globe, KeyRound, Layers, Lock } from 'lucide-react';
import { ContentLockerModal } from './content-locker-modal';

export type KeyPlatformId =
  | 'ps5'
  | 'ps5-pro'
  | 'xbox-series-x'
  | 'xbox-series-s';

export interface TerminalPlatformOption {
  id: KeyPlatformId;
  name: string;
  shortLabel: string;
  ecosystem: 'playstation' | 'xbox';
  storefront: string;
  codeFormatLabel: string;
  maskedKeySample: string;
  deliverySpec: string;
}

export interface TerminalRegionOption {
  code: string;
  name: string;
  storeRegion: string;
}

export interface TerminalEditionOption {
  id: string;
  name: string;
  badge: string;
  highlights: string;
}

export const TERMINAL_PLATFORMS: TerminalPlatformOption[] = [
  {
    id: 'ps5',
    name: 'PlayStation 5',
    shortLabel: 'PS5',
    ecosystem: 'playstation',
    storefront: 'PlayStation Store',
    codeFormatLabel: '12-Digit PSN Voucher',
    maskedKeySample: '7K9M-XXXX-XXXX',
    deliverySpec: '4K / DualSense Haptics',
  },
  {
    id: 'ps5-pro',
    name: 'PS5 Pro Enhanced',
    shortLabel: 'PS5 Pro',
    ecosystem: 'playstation',
    storefront: 'PlayStation Store',
    codeFormatLabel: '12-Digit PSN Voucher',
    maskedKeySample: '9P4X-XXXX-XXXX',
    deliverySpec: 'PSSR 4K / Ray Tracing',
  },
  {
    id: 'xbox-series-x',
    name: 'Xbox Series X',
    shortLabel: 'Series X',
    ecosystem: 'xbox',
    storefront: 'Microsoft Store',
    codeFormatLabel: '25-Character Xbox Key',
    maskedKeySample: 'Q4N8P-XXXXX-XXXXX-XXXXX-XXXXX',
    deliverySpec: 'Native 4K / Quick Resume',
  },
  {
    id: 'xbox-series-s',
    name: 'Xbox Series S',
    shortLabel: 'Series S',
    ecosystem: 'xbox',
    storefront: 'Microsoft Store',
    codeFormatLabel: '25-Character Xbox Key',
    maskedKeySample: 'M7V2K-XXXXX-XXXXX-XXXXX-XXXXX',
    deliverySpec: 'Digital-Only Console',
  },
];

export const TERMINAL_REGIONS: TerminalRegionOption[] = [
  { code: 'us', name: 'United States', storeRegion: 'North America (USD)' },
  { code: 'uk', name: 'United Kingdom', storeRegion: 'UK Storefront (GBP)' },
  { code: 'eu', name: 'Europe (EU)', storeRegion: 'European Union (EUR)' },
  { code: 'ca', name: 'Canada', storeRegion: 'North America (CAD)' },
  { code: 'de', name: 'Germany', storeRegion: 'Europe DE (EUR)' },
  { code: 'fr', name: 'France', storeRegion: 'Europe FR (EUR)' },
  { code: 'es', name: 'Spain', storeRegion: 'Europe ES (EUR)' },
  { code: 'it', name: 'Italy', storeRegion: 'Europe IT (EUR)' },
  { code: 'br', name: 'Brazil', storeRegion: 'LATAM BR (BRL)' },
  { code: 'au', name: 'Australia', storeRegion: 'Oceania AU (AUD)' },
  { code: 'jp', name: 'Japan', storeRegion: 'Asia JP (JPY)' },
  { code: 'mx', name: 'Mexico', storeRegion: 'LATAM MX (MXN)' },
  { code: 'ae', name: 'United Arab Emirates', storeRegion: 'MENA AE (AED)' },
  { code: 'pl', name: 'Poland', storeRegion: 'Europe PL (PLN)' },
  { code: 'nl', name: 'Netherlands', storeRegion: 'Europe NL (EUR)' },
  { code: 'global', name: 'Global / Worldwide', storeRegion: 'Multi-Region' },
];

export const TERMINAL_EDITIONS: TerminalEditionOption[] = [
  {
    id: 'standard',
    name: 'Standard Edition',
    badge: 'Base Game',
    highlights: 'Full Grand Theft Auto VI base game license with pre-load support.',
  },
  {
    id: 'deluxe',
    name: 'Vice City Deluxe Edition',
    badge: 'Deluxe',
    highlights: 'Base game with Vintage Vice City vehicle and wardrobe bundle.',
  },
  {
    id: 'ultimate',
    name: 'Leonida Ultimate Edition',
    badge: 'Ultimate',
    highlights: 'Base game, Deluxe content, and Leonida launch expansion perks.',
  },
  {
    id: 'preload',
    name: 'Pre-Load Digital Key',
    badge: 'Pre-Load',
    highlights: 'Storefront library license enabling pre-launch console download.',
  },
  {
    id: 'collector',
    name: "Collector's Digital Key",
    badge: 'Collector',
    highlights: 'Complete digital archive including soundtrack and bonus gear.',
  },
];

export function PlayStationEmblem({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M9.5 3.2v15.4l3.1 1.1V7.1c0-.7.3-1.1.8-1 .6.1.9.6.9 1.4v4.7c2.4 1.1 4.2.1 4.2-2.7 0-2.6-1.4-4-4.1-4.9L9.5 3.2zm-1.4 11.9-4.9 1.7c-1.4.5-2.2 1.3-2 2.2.3 1.1 1.7 1.6 3.7 1.1l3.2-1.1v-2.1l-2.3.8c-.7.2-1.3.1-1.4-.2-.1-.3.3-.6 1-.8l2.7-1v-.6zm11.2-.8c-1.6-.4-3.4-.2-5.1.4l-.6.2v2.1l1.9-.7c.8-.3 1.6-.3 2.1-.1.5.2.5.6-.2.9l-3.8 1.4v2.1l5.5-2c1.8-.6 2.8-1.5 2.5-2.5-.2-.9-1-1.5-2.3-1.8z" />
    </svg>
  );
}

export function XboxEmblem({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm4.8 3.6a8.2 8.2 0 0 1 2.9 4.5c-1-1.7-2.8-3.3-5.2-4.7a7.8 7.8 0 0 1 2.3.2zM7.2 5.6a7.8 7.8 0 0 1 2.3-.2c-2.4 1.4-4.2 3-5.2 4.7a8.2 8.2 0 0 1 2.9-4.5zM12 10.6c2.6 2 5 4.9 5.5 7.4a8.2 8.2 0 0 1-11 0c.5-2.5 2.9-5.4 5.5-7.4zm6.9 5.9c-.4-2.5-2.4-5.4-4.9-7.4 1.5-1 3.1-1.6 4.4-1.7a8.2 8.2 0 0 1 .5 9.1zm-13.8 0a8.2 8.2 0 0 1 .5-9.1c1.3.1 2.9.7 4.4 1.7-2.5 2-4.5 4.9-4.9 7.4z" />
    </svg>
  );
}

export interface KeyClaimTerminalProps {
  defaultPlatform?: KeyPlatformId;
  defaultRegionCode?: string;
  defaultEditionId?: string;
  regionLabelOverride?: string;
  editionLabelOverride?: string;
  ctaLabel?: string;
}

export function KeyClaimTerminal({
  defaultPlatform = 'ps5',
  defaultRegionCode = 'us',
  defaultEditionId = 'standard',
  regionLabelOverride,
  editionLabelOverride,
  ctaLabel = 'Claim Digital Code',
}: KeyClaimTerminalProps) {
  const [selectedPlatform, setSelectedPlatform] =
    useState<KeyPlatformId>(defaultPlatform);
  const [selectedRegion, setSelectedRegion] = useState<string>(defaultRegionCode);
  const [selectedEdition, setSelectedEdition] = useState<string>(defaultEditionId);
  const [lockerOpen, setLockerOpen] = useState(false);

  const activePlatform = useMemo(
    () =>
      TERMINAL_PLATFORMS.find((p) => p.id === selectedPlatform) ||
      TERMINAL_PLATFORMS[0],
    [selectedPlatform]
  );

  const activeRegion = useMemo(() => {
    const matched = TERMINAL_REGIONS.find(
      (r) => r.code === selectedRegion.toLowerCase()
    );
    if (matched) return matched;
    return {
      code: selectedRegion,
      name: regionLabelOverride || selectedRegion.toUpperCase(),
      storeRegion: 'Regional Storefront',
    };
  }, [selectedRegion, regionLabelOverride]);

  const activeEdition = useMemo(() => {
    const matched = TERMINAL_EDITIONS.find((e) => e.id === selectedEdition);
    if (matched) return matched;
    return {
      id: selectedEdition,
      name: editionLabelOverride || 'Standard Edition',
      badge: 'Digital Key',
      highlights: 'Direct console storefront redemption license.',
    };
  }, [selectedEdition, editionLabelOverride]);

  const packageTitle = `GTA VI — ${activePlatform.name} · ${activeEdition.name} (${activeRegion.name})`;

  return (
    <div className="space-y-5">
      {/* Platform Selector */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A3A3A3]">
            Console Platform
          </span>
          <span className="text-xs font-mono text-[#737373]">
            {activePlatform.storefront}
          </span>
        </div>

        <div
          role="radiogroup"
          aria-label="Select console platform"
          className="grid grid-cols-1 sm:grid-cols-2 border border-[#262626] bg-[#0A0A0A] divide-y sm:divide-y-0 sm:gap-px sm:bg-[#262626]"
        >
          {TERMINAL_PLATFORMS.map((platform) => {
            const isSelected = platform.id === selectedPlatform;
            const isPlayStation = platform.ecosystem === 'playstation';

            return (
              <button
                key={platform.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`flex items-center gap-3 px-4 py-3 text-left cursor-pointer ${
                  isSelected
                    ? 'bg-[#181818] text-[#F5F5F5]'
                    : 'bg-[#0A0A0A] text-[#A3A3A3] hover:text-[#F5F5F5]'
                }`}
              >
                <span
                  className={`w-8 h-8 border flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-[#E11D48] border-[#E11D48] text-white'
                      : 'bg-[#121212] border-[#262626] text-[#A3A3A3]'
                  }`}
                >
                  {isPlayStation ? (
                    <PlayStationEmblem className="w-4 h-4" />
                  ) : (
                    <XboxEmblem className="w-4 h-4" />
                  )}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-[#F5F5F5] truncate">
                    {platform.name}
                  </span>
                  <span className="block text-xs text-[#A3A3A3] truncate">
                    {platform.deliverySpec}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Region & Edition Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="terminal-region-select"
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#A3A3A3] mb-2"
          >
            <Globe className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Storefront Region</span>
          </label>
          <select
            id="terminal-region-select"
            value={activeRegion.code}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full px-3 py-2.5 text-sm text-[#F5F5F5] bg-[#0A0A0A] border border-[#262626] focus:outline-none focus:border-[#E11D48] cursor-pointer"
          >
            {!TERMINAL_REGIONS.some((r) => r.code === activeRegion.code) && (
              <option value={activeRegion.code}>{activeRegion.name}</option>
            )}
            {TERMINAL_REGIONS.map((region) => (
              <option key={region.code} value={region.code}>
                {region.name} — {region.storeRegion}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="terminal-edition-select"
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#A3A3A3] mb-2"
          >
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Game Edition</span>
          </label>
          <select
            id="terminal-edition-select"
            value={activeEdition.id}
            onChange={(e) => setSelectedEdition(e.target.value)}
            className="w-full px-3 py-2.5 text-sm text-[#F5F5F5] bg-[#0A0A0A] border border-[#262626] focus:outline-none focus:border-[#E11D48] cursor-pointer"
          >
            {!TERMINAL_EDITIONS.some((e) => e.id === activeEdition.id) && (
              <option value={activeEdition.id}>{activeEdition.name}</option>
            )}
            {TERMINAL_EDITIONS.map((edition) => (
              <option key={edition.id} value={edition.id}>
                {edition.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Key Format Summary */}
      <div className="bg-[#0A0A0A] border border-[#262626] p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#262626]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#F5F5F5]">
            <KeyRound className="w-3.5 h-3.5 text-[#E11D48]" aria-hidden="true" />
            <span>{activePlatform.codeFormatLabel}</span>
          </div>
          <span className="text-xs font-mono text-[#A3A3A3]">
            Status: Available
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-sm tracking-wider text-[#F5F5F5] bg-[#121212] border border-[#262626] px-3 py-2 select-none">
            {activePlatform.maskedKeySample}
          </div>
          <div className="text-xs text-[#A3A3A3] sm:text-right">
            <div className="text-[#F5F5F5] font-bold">{activeRegion.name}</div>
            <div>{activeEdition.name}</div>
          </div>
        </div>
      </div>

      {/* Primary Action */}
      <div className="space-y-2.5">
        <button
          type="button"
          onClick={() => setLockerOpen(true)}
          className="w-full flex items-center justify-between gap-4 px-5 py-4 bg-[#E11D48] hover:bg-[#BE123C] text-white border border-[#E11D48] cursor-pointer text-left"
        >
          <span className="flex items-center gap-3">
            <Lock className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>
              <span className="block text-base sm:text-lg font-bold leading-tight">
                {ctaLabel}
              </span>
              <span className="block text-xs text-white/85 mt-0.5">
                {activePlatform.shortLabel} · {activeEdition.name} · {activeRegion.name}
              </span>
            </span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0A0A0A] text-[#F5F5F5] text-xs font-bold shrink-0">
            <span>Unlock</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </button>

        <p className="text-xs text-[#A3A3A3]">{activeEdition.highlights}</p>
      </div>

      <ContentLockerModal
        isOpen={lockerOpen}
        onClose={() => setLockerOpen(false)}
        packageTitle={packageTitle}
      />
    </div>
  );
}