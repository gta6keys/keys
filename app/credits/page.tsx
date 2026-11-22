import React from 'react';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { CreditsAndSitemapSection } from '@/components/credits-and-sitemap-section';
import { buildCanonicalUrl } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Creator Credits & Attribution Ledger',
  description:
    'Browse creator credits and attribution for GTA 6 Vice City vehicle mods, shaders, scripts, media, and community projects.',
  alternates: {
    canonical: buildCanonicalUrl('/credits/'),
  },
};

export default function CreditsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <CreditsAndSitemapSection showCredits={true} showSitemap={false} />
      </main>
    </div>
  );
}