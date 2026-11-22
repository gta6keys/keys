import React from 'react';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { GameplayYoutubeSection } from '@/components/gameplay-youtube-section';
import { buildCanonicalUrl } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'YouTube Gameplay & Engine Analysis',
  description:
    'Watch curated GTA 6 gameplay videos and explore community analysis of shaders, vehicles, maps, and the RAGE engine.',
  alternates: {
    canonical: buildCanonicalUrl('/gameplay/'),
  },
};

export default function GameplayPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <GameplayYoutubeSection />
      </main>
      <SiteFooter />
    </div>
  );
}