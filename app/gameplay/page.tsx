import React from 'react';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { GameplayYoutubeSection } from '@/components/gameplay-youtube-section';
import {
  SITE_CONFIG,
  buildCanonicalUrl,
  buildLanguageAlternates,
} from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'GTA 6 Gameplay & RAGE 9 Engine Analysis',
  description:
    'Watch curated GTA 6 Vice City gameplay feeds and frame-by-frame analysis of RAGE 9 shaders, custom vehicles, and Leonida map reconstructions.',
  alternates: {
    canonical: buildCanonicalUrl('/gameplay/'),
    languages: buildLanguageAlternates('/gameplay/'),
  },
  other: {
    'article:published_time': SITE_CONFIG.publishedAtIso,
    'article:modified_time': SITE_CONFIG.modifiedAtIso,
  },
};

export default function GameplayPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <GameplayYoutubeSection />
      </main>
      <SiteFooter />
    </div>
  );
}