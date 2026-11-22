import React from 'react';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { CreditsAndSitemapSection } from '@/components/credits-and-sitemap-section';
import { buildCanonicalUrl } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Static Multi-Shard sitemap.xml Inspector',
  description:
    'Inspect gta6keys canonical routes, static XML sitemap shards, crawler directives, and live sitemap payloads.',
  alternates: {
    canonical: buildCanonicalUrl('/sitemap-explorer/'),
  },
};

export default function SitemapExplorerPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <CreditsAndSitemapSection showCredits={false} showSitemap={true} />
      </main>
    </div>
  );
}