'use client';

import React, { useState } from 'react';
import { ExternalLink, Film, Play, ShieldAlert, Tv, Video } from 'lucide-react';
import { YOUTUBE_GAMEPLAY_VIDEOS } from '@/lib/mods-repository';
import { VideoTheaterState, transitionVideoTheater } from '@/lib/state-machines';
import { useI18n } from './language-provider';
import { ViceArtworkCanvas } from './vice-artwork-canvas';
import { ContentLockerModal, StartGameModButton } from './content-locker-modal';

const ANGLED_MOD_SLICES = [
  {
    id: 'slice-1',
    title: 'Ocean Drive RTGI',
    subtitle: 'Volumetric Neon & Wet Asphalt',
    theme: 'ocean-drive' as const,
    metric: '4K LUTs',
  },
  {
    id: 'slice-2',
    title: 'Vice Beach Crowd & Cloth',
    subtitle: 'Physics-Driven Streetwear',
    theme: 'vice-beach' as const,
    metric: '80+ Outfits',
  },
  {
    id: 'slice-3',
    title: '1986 Widebody Customs',
    subtitle: 'Twin-Turbo Wedge Supercars',
    theme: 'muscle-car' as const,
    metric: '140k Poly',
  },
  {
    id: 'slice-4',
    title: 'Starfish Island Estates',
    subtitle: 'Open-Interior Mansions & Docks',
    theme: 'penthouse' as const,
    metric: 'Zero-Load MLO',
  },
  {
    id: 'slice-5',
    title: 'Grassrivers Hydro Hook',
    subtitle: 'Airboat Thrust & Swamp Physics',
    theme: 'everglades' as const,
    metric: 'C# ScriptHook',
  },
];

export function GameplayYoutubeSection() {
  const { t } = useI18n();
  const [theaterState, setTheaterState] = useState<VideoTheaterState>({
    mode: 'interactive-preview',
    activeVideoId: YOUTUBE_GAMEPLAY_VIDEOS[0].id,
    selectedHighlightIdx: 0,
  });
  const [lockerOpen, setLockerOpen] = useState(false);

  const activeVideo =
    YOUTUBE_GAMEPLAY_VIDEOS.find((v) => v.id === theaterState.activeVideoId) ||
    YOUTUBE_GAMEPLAY_VIDEOS[0];

  return (
    <section
      id="gameplay"
      aria-labelledby="gameplay-heading"
      className="py-12 px-4 sm:px-6 bg-[#0A0A0A] text-[#F5F5F5]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Clean Hierarchy: Semantic Icon, Primary H1 Title, Concise 1-Line Subtitle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-8 border-b border-[#262626]">
          <div>
            <Film className="w-6 h-6 text-[#E11D48] mb-3" aria-hidden="true" />
            <h1
              id="gameplay-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5]"
            >
              {t('gameplay.title')}
            </h1>
            <p className="text-sm sm:text-base text-[#A3A3A3] max-w-2xl mt-2">
              {t('gameplay.subtitle')}
            </p>
          </div>

          <div className="shrink-0">
            <StartGameModButton
              size="sm"
              label="Claim Digital Code"
              onClick={() => setLockerOpen(true)}
            />
          </div>
        </div>

        {/* Video Switcher Tabs */}
        <div
          role="group"
          aria-label="Select YouTube gameplay video"
          className="grid grid-cols-1 md:grid-cols-3 border border-[#262626] bg-[#121212] divide-y md:divide-y-0 md:divide-x divide-[#262626] mb-8"
        >
          {YOUTUBE_GAMEPLAY_VIDEOS.map((video, idx) => {
            const isSelected = video.id === activeVideo.id;
            return (
              <button
                key={video.id}
                type="button"
                onClick={() =>
                  setTheaterState((prev) =>
                    transitionVideoTheater(prev, {
                      type: 'SELECT_VIDEO',
                      videoId: video.id,
                    })
                  )
                }
                className={`text-left p-5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#181818] text-[#F5F5F5]'
                    : 'bg-[#121212] text-[#A3A3A3] hover:text-[#F5F5F5]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono tabular-nums mb-1.5">
                  <span className={isSelected ? 'text-[#E11D48] font-bold' : 'text-[#737373]'}>
                    0{idx + 1} · {video.category}
                  </span>
                  <span className="text-[#737373]">{video.duration}</span>
                </div>
                <div className="text-base font-bold text-[#F5F5F5] line-clamp-1 mb-1">
                  {video.title}
                </div>
                <div className="text-xs font-mono text-[#737373]">
                  {video.channelName} · {video.viewsLabel}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Split Theater */}
        <div className="bg-[#121212] border border-[#262626] grid grid-cols-1 lg:grid-cols-12 mb-14">
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#262626]">
            <div className="relative overflow-hidden bg-[#0A0A0A] aspect-video border border-[#262626]">
              {theaterState.mode === 'youtube-iframe' ? (
                <iframe
                  title={activeVideo.title}
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?rel=0`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="relative w-full h-full">
                  <ViceArtworkCanvas
                    theme={
                      activeVideo.id === 'yt-rockstar-trailer-1'
                        ? 'hero-vista'
                        : activeVideo.id === 'yt-vice-graphics-concept'
                          ? 'neon-skyline'
                          : 'ocean-drive'
                    }
                    className="w-full h-full"
                    label={activeVideo.title}
                  />
                  <div className="absolute inset-0 bg-black/55 flex flex-col justify-between p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono tabular-nums text-[#F5F5F5] bg-[#0A0A0A] px-3 py-1.5 border border-[#262626]">
                        ID: {activeVideo.youtubeId} · {activeVideo.duration}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setTheaterState((prev) =>
                            transitionVideoTheater(prev, {
                              type: 'SET_MODE',
                              mode: 'youtube-iframe',
                            })
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#E11D48] hover:bg-[#BE123C] whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                        <span>{t('gameplay.loadEmbed')}</span>
                      </button>
                    </div>

                    <div className="bg-[#0A0A0A] border border-[#262626] p-4">
                      <div className="text-xs text-[#E11D48] font-mono tabular-nums mb-1">
                        {t('gameplay.activeHighlight')} #{theaterState.selectedHighlightIdx + 1}
                      </div>
                      <div className="text-sm text-[#F5F5F5]">
                        {activeVideo.highlights[theaterState.selectedHighlightIdx]}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Player Mode Controls */}
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#262626]">
              <div className="flex items-center border border-[#262626] bg-[#0A0A0A]">
                <button
                  type="button"
                  onClick={() =>
                    setTheaterState((prev) =>
                      transitionVideoTheater(prev, {
                        type: 'SET_MODE',
                        mode: 'interactive-preview',
                      })
                    )
                  }
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold border-r border-[#262626] whitespace-nowrap cursor-pointer ${
                    theaterState.mode === 'interactive-preview'
                      ? 'bg-[#E11D48] text-white'
                      : 'text-[#A3A3A3] hover:text-[#F5F5F5]'
                  }`}
                >
                  <Tv className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t('gameplay.frameCanvas')}</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setTheaterState((prev) =>
                      transitionVideoTheater(prev, {
                        type: 'SET_MODE',
                        mode: 'youtube-iframe',
                      })
                    )
                  }
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold whitespace-nowrap cursor-pointer ${
                    theaterState.mode === 'youtube-iframe'
                      ? 'bg-[#E11D48] text-white'
                      : 'text-[#A3A3A3] hover:text-[#F5F5F5]'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t('gameplay.iframePlayer')}</span>
                </button>
              </div>

              <a
                href={activeVideo.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E11D48] hover:underline whitespace-nowrap shrink-0"
              >
                <span>
                  {t('gameplay.openYoutube')} ({activeVideo.viewsLabel})
                </span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#A3A3A3] font-mono tabular-nums mb-2">
                <span className="text-[#E11D48]">{activeVideo.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeVideo.publishedDate}</span>
                <span aria-hidden="true">·</span>
                <span>{activeVideo.duration}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#F5F5F5] mb-3">
                {activeVideo.title}
              </h2>

              <p className="text-sm text-[#A3A3A3] leading-relaxed mb-5">
                {activeVideo.summary}
              </p>

              <div className="mb-6">
                <div className="text-xs font-bold text-[#F5F5F5] mb-2.5">
                  {t('gameplay.timestampsTitle')}
                </div>
                <div className="space-y-2">
                  {activeVideo.highlights.map((hl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        setTheaterState((prev) =>
                          transitionVideoTheater(prev, {
                            type: 'SELECT_HIGHLIGHT',
                            index: idx,
                          })
                        )
                      }
                      className={`w-full border px-3.5 py-2.5 text-left text-xs cursor-pointer ${
                        theaterState.selectedHighlightIdx === idx
                          ? 'bg-[#181818] border-[#E11D48] text-[#F5F5F5] font-bold'
                          : 'bg-[#0A0A0A] border-[#262626] text-[#A3A3A3] hover:text-[#F5F5F5]'
                      }`}
                    >
                      {hl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <StartGameModButton
                size="lg"
                label="Claim Digital Code"
                onClick={() => setLockerOpen(true)}
                className="w-full"
              />

              <div className="bg-[#0A0A0A] border border-[#262626] p-4 text-xs text-[#A3A3A3] leading-relaxed">
                <div className="flex items-center gap-2 font-bold text-[#F5F5F5] mb-1">
                  <ShieldAlert className="w-4 h-4 text-[#E11D48] shrink-0" aria-hidden="true" />
                  <span>{t('gameplay.disclaimerTitle')}</span>
                </div>
                <p>
                  {activeVideo.nonAffiliationNote} All trademarks and game footage
                  belong to their respective owners.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Sector Architecture Grid */}
        <div>
          <div className="pb-4 mb-6 border-b border-[#262626]">
            <h2 className="text-2xl font-bold text-[#F5F5F5]">
              {t('gameplay.sectorsTitle')}
            </h2>
            <p className="text-xs text-[#A3A3A3] mt-1">
              {t('gameplay.sectorsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-[#262626] divide-y sm:divide-y-0 sm:divide-x divide-[#262626]">
            {ANGLED_MOD_SLICES.map((slice, idx) => (
              <div key={slice.id} className="bg-[#121212] flex flex-col justify-between">
                <div className="h-44 relative border-b border-[#262626]">
                  <ViceArtworkCanvas
                    theme={slice.theme}
                    className="w-full h-full"
                    label={slice.title}
                  />
                </div>
                <div className="p-4 bg-[#0A0A0A]">
                  <div className="text-[11px] font-mono tabular-nums text-[#E11D48] mb-1">
                    0{idx + 1} · {slice.metric}
                  </div>
                  <div className="text-sm font-bold text-[#F5F5F5] leading-snug">
                    {slice.title}
                  </div>
                  <div className="text-xs text-[#A3A3A3] mt-1">{slice.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ContentLockerModal
        isOpen={lockerOpen}
        onClose={() => setLockerOpen(false)}
        packageTitle={`Grand Theft Auto VI — ${activeVideo.title}`}
      />
    </section>
  );
}