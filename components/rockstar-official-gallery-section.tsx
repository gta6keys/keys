'use client';

import React, { useState } from 'react';
import { Camera, Disc3, ExternalLink, Eye, Info, Package, X } from 'lucide-react';
import { OFFICIAL_VI_ASSETS } from '@/lib/mods-repository';
import { LightboxState, transitionLightbox } from '@/lib/state-machines';
import { withBasePath } from '@/lib/utils';
import { useI18n } from './language-provider';
import { ContentLockerModal, StartGameModButton } from './content-locker-modal';

const FALLBACK_IMAGE = OFFICIAL_VI_ASSETS.heroPoster;

function SafeGalleryImage({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const resolvedSrc = failed ? withBasePath(FALLBACK_IMAGE) : withBasePath(src);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolvedSrc}
      alt={alt}
      decoding="sync"
      onError={() => {
        if (!failed) setFailed(true);
      }}
      className={className}
    />
  );
}

export function RockstarOfficialGallerySection() {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxState, setLightboxState] = useState<LightboxState>({
    status: 'closed',
    activeShotId: null,
  });
  const [lockerOpen, setLockerOpen] = useState(false);

  const categories = [
    'All',
    'Vice Beach',
    'Vehicles',
    'Nightlife',
    'Protagonists',
    'Architecture',
    'Skyline',
    'Everglades',
  ];

  const screenshots = OFFICIAL_VI_ASSETS.screenshots4k;
  const filteredShots =
    selectedCategory === 'All'
      ? screenshots
      : screenshots.filter((s) =>
          s.category.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  const activeScreenshot =
    lightboxState.status === 'inspecting'
      ? screenshots.find((s) => s.id === lightboxState.activeShotId) || null
      : null;

  return (
    <section
      id="official-media"
      aria-labelledby="official-heading"
      className="py-12 px-4 sm:px-6 bg-[#0A0A0A] text-[#F5F5F5]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Clean Hierarchy: Semantic Icon, Primary H1 Title, Concise 1-Line Subtitle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-8 border-b border-[#262626]">
          <div>
            <Camera className="w-6 h-6 text-[#E11D48] mb-3" aria-hidden="true" />
            <h1
              id="official-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5]"
            >
              {t('official.title')}
            </h1>
            <p className="text-sm sm:text-base text-[#A3A3A3] max-w-2xl mt-2">
              {t('official.subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <StartGameModButton
              size="sm"
              label="Claim Digital Code"
              onClick={() => setLockerOpen(true)}
            />
            <a
              href="https://www.rockstargames.com/VI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#F5F5F5] bg-[#121212] border border-[#262626] hover:border-[#404040] whitespace-nowrap shrink-0"
            >
              <span>{t('official.visitSite')}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#E11D48]" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Official Synopsis Box */}
        <div className="mb-12 bg-[#121212] border border-[#262626] grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#262626]">
            <div>
              <div className="text-xs font-mono uppercase text-[#A3A3A3] mb-2">
                {t('official.storyMeta')}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] leading-tight mb-4">
                {t('official.storyHeadline')}
              </h2>
              <p className="text-sm text-[#A3A3A3] leading-relaxed bg-[#0A0A0A] p-4 border border-[#262626] mb-6">
                {t('official.storyQuote')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 border border-[#262626] bg-[#0A0A0A] divide-y sm:divide-y-0 sm:divide-x divide-[#262626] text-xs font-mono">
              <div className="p-3 text-[#F5F5F5]">{t('official.protagonists')}</div>
              <div className="p-3 text-[#F5F5F5]">{t('official.platforms')}</div>
              <div className="p-3 text-[#E11D48]">{t('official.ps5Note')}</div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0A0A0A] flex flex-col">
            <div className="aspect-[16/10] lg:flex-1 w-full overflow-hidden bg-[#0A0A0A]">
              <SafeGalleryImage
                src={OFFICIAL_VI_ASSETS.heroPoster}
                alt="Grand Theft Auto VI Official Poster Lucia and Jason"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="bg-[#0A0A0A] border-t border-[#262626] px-4 py-2.5 flex items-center justify-between text-xs font-mono shrink-0">
              <span className="text-[#F5F5F5]">{t('official.posterCaption')}</span>
              <span className="text-[#A3A3A3]">KEY ART 01</span>
            </div>
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#262626]">
          <div
            role="group"
            aria-label="Filter 4K screenshots by sector"
            className="flex flex-wrap items-center bg-[#121212] border border-[#262626]"
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-bold border-r border-[#262626] last:border-r-0 cursor-pointer ${
                    active
                      ? 'bg-[#E11D48] text-white'
                      : 'text-[#A3A3A3] hover:text-[#F5F5F5]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs text-[#A3A3A3] font-mono tabular-nums">
            <Camera className="w-3.5 h-3.5 text-[#E11D48]" aria-hidden="true" />
            <span>
              {filteredShots.length} · {t('official.showingCaptures')}
            </span>
          </div>
        </div>

        {/* 4K Screenshots Grid */}
        {filteredShots.length === 0 ? (
          <div className="bg-[#121212] border border-[#262626] p-10 text-center mb-14">
            <p className="text-sm text-[#A3A3A3]">No records found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {filteredShots.map((shot) => (
              <article
                key={shot.id}
                className="bg-[#121212] border border-[#262626] flex flex-col"
              >
                <div className="relative aspect-video w-full bg-[#0A0A0A] border-b border-[#262626] overflow-hidden shrink-0">
                  <SafeGalleryImage
                    src={shot.url}
                    alt={shot.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#0A0A0A] text-[#F5F5F5] border border-[#262626]">
                    3840x2160 UHD
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between gap-3 flex-1">
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono uppercase text-[#A3A3A3] mb-0.5">
                      {shot.category}
                    </div>
                    <h3 className="text-sm font-bold text-[#F5F5F5] truncate">
                      {shot.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxState((prev) =>
                        transitionLightbox(prev, { type: 'OPEN_SHOT', shotId: shot.id })
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#0A0A0A] border border-[#262626] hover:border-[#404040] text-xs font-bold text-[#F5F5F5] cursor-pointer shrink-0"
                    title={t('official.inspect4k')}
                  >
                    <Eye className="w-3.5 h-3.5 text-[#E11D48]" aria-hidden="true" />
                    <span>Inspect</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Official Editions & Pre-Order Packages */}
        <div className="mb-12">
          <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#262626]">
            <Package className="w-5 h-5 text-[#E11D48]" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-[#F5F5F5]">
              {t('official.editionsTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="bg-[#121212] border border-[#262626] flex flex-col">
              <div className="aspect-[16/10] w-full bg-[#0A0A0A] border-b border-[#262626] overflow-hidden shrink-0">
                <SafeGalleryImage
                  src={OFFICIAL_VI_ASSETS.ultimateEdition}
                  alt="GTA VI Ultimate Edition"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-5 flex-1">
                <span className="text-[11px] font-mono uppercase text-[#E11D48] font-bold">
                  {t('official.ultimateLabel')}
                </span>
                <h3 className="text-lg font-bold text-[#F5F5F5] mt-1 mb-2">
                  {t('official.ultimateTitle')}
                </h3>
                <p className="text-xs text-[#A3A3A3] leading-relaxed">
                  {t('official.ultimateDesc')}
                </p>
              </div>
            </article>

            <article className="bg-[#121212] border border-[#262626] flex flex-col">
              <div className="aspect-[16/10] w-full bg-[#0A0A0A] border-b border-[#262626] overflow-hidden shrink-0">
                <SafeGalleryImage
                  src={OFFICIAL_VI_ASSETS.vintagePack}
                  alt="Vintage Vice City Pack Pre-order Bonus"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-5 flex-1">
                <span className="text-[11px] font-mono uppercase text-[#E11D48] font-bold">
                  {t('official.vintageLabel')}
                </span>
                <h3 className="text-lg font-bold text-[#F5F5F5] mt-1 mb-2">
                  {t('official.vintageTitle')}
                </h3>
                <p className="text-xs text-[#A3A3A3] leading-relaxed">
                  {t('official.vintageDesc')}
                </p>
              </div>
            </article>

            <article className="bg-[#121212] border border-[#262626] flex flex-col">
              <div className="aspect-[16/10] w-full bg-[#0A0A0A] border-b border-[#262626] overflow-hidden shrink-0">
                <SafeGalleryImage
                  src={OFFICIAL_VI_ASSETS.merchBox}
                  alt="Collector's Box The Vice City Collection"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-5 flex-1">
                <span className="text-[11px] font-mono uppercase text-[#E11D48] font-bold">
                  {t('official.merchLabel')}
                </span>
                <h3 className="text-lg font-bold text-[#F5F5F5] mt-1 mb-2">
                  {t('official.merchTitle')}
                </h3>
                <p className="text-xs text-[#A3A3A3] leading-relaxed">
                  {t('official.merchDesc')}
                </p>
              </div>
            </article>
          </div>
        </div>

        {/* Music & Soundtrack */}
        <div className="bg-[#121212] border border-[#262626] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#0A0A0A] border border-[#262626] text-[#E11D48] shrink-0">
              <Disc3 className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-[#A3A3A3] mb-1">
                {t('official.audioLabel')}
              </div>
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-1.5">
                {t('official.audioTitle')}
              </h3>
              <p className="text-xs text-[#A3A3A3] max-w-xl leading-relaxed">
                {t('official.audioDesc')}
              </p>
            </div>
          </div>

          <a
            href="https://www.rockstargames.com/VI"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 text-xs font-bold text-[#F5F5F5] bg-[#0A0A0A] hover:border-[#404040] border border-[#262626] whitespace-nowrap shrink-0"
          >
            {t('official.audioCta')}
          </a>
        </div>

        {/* Copyright Notice */}
        <div className="mt-8 flex items-center gap-2 text-xs text-[#737373]">
          <Info className="w-4 h-4 text-[#A3A3A3] shrink-0" aria-hidden="true" />
          <span>{t('official.copyrightNote')}</span>
        </div>
      </div>

      {/* Fullscreen 4K Lightbox */}
      {activeScreenshot && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col justify-between p-4 sm:p-8"
        >
          <div className="flex items-center justify-between text-[#F5F5F5] pb-3 border-b border-[#262626]">
            <div>
              <span className="text-xs font-mono uppercase text-[#E11D48] mr-2">
                {activeScreenshot.category}
              </span>
              <span className="text-sm font-bold">{activeScreenshot.title}</span>
              <span className="text-xs text-[#737373] ml-3 font-mono">
                3840x2160 UHD
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                setLightboxState((prev) =>
                  transitionLightbox(prev, { type: 'CLOSE_SHOT' })
                )
              }
              aria-label="Close image inspector"
              className="p-2 bg-[#121212] border border-[#262626] hover:border-[#404040] text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center my-4 overflow-hidden bg-[#0A0A0A] border border-[#262626]">
            <SafeGalleryImage
              src={activeScreenshot.url}
              alt={activeScreenshot.title}
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-[#737373] pt-3 border-t border-[#262626]">
            <span className="font-mono">{activeScreenshot.url}</span>
            <button
              type="button"
              onClick={() =>
                setLightboxState((prev) =>
                  transitionLightbox(prev, { type: 'CLOSE_SHOT' })
                )
              }
              className="px-4 py-1.5 bg-[#E11D48] text-white font-bold cursor-pointer"
            >
              {t('official.closeLightbox')}
            </button>
          </div>
        </div>
      )}

      <ContentLockerModal
        isOpen={lockerOpen}
        onClose={() => setLockerOpen(false)}
        packageTitle="Grand Theft Auto VI — Digital Code Allocation"
      />
    </section>
  );
}