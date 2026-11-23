import React from 'react';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { CreditsAndSitemapSection } from '@/components/credits-and-sitemap-section';
import {
  SITE_CONFIG,
  buildCanonicalUrl,
  buildLanguageAlternates,
} from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Creator Credits & Attribution Ledger',
  description:
    'Browse verified creator credits and attribution for GTA 6 Vice City vehicle mods, graphics shaders, physics scripts, and 4K media analysis.',
  alternates: {
    canonical: buildCanonicalUrl('/credits/'),
    languages: buildLanguageAlternates('/credits/'),
  },
  other: {
    'article:published_time': SITE_CONFIG.publishedAtIso,
    'article:modified_time': SITE_CONFIG.modifiedAtIso,
  },
};

export default function CreditsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <CreditsAndSitemapSection showCredits showSitemap={false} />
      </main>
    </div>
  );
}