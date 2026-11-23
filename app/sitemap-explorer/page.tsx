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
  title: 'Multi-Shard XML Sitemap.xml Inspector',
  description:
    'Inspect gta6keys canonical routes, multi-shard XML sitemaps with hreflang tags (en/es/fr/pt), crawler directives, and live XML payloads.',
  alternates: {
    canonical: buildCanonicalUrl('/sitemap-explorer/'),
    languages: buildLanguageAlternates('/sitemap-explorer/'),
  },
  other: {
    'article:published_time': SITE_CONFIG.publishedAtIso,
    'article:modified_time': SITE_CONFIG.modifiedAtIso,
  },
};

export default function SitemapExplorerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <CreditsAndSitemapSection showCredits={false} showSitemap />
      </main>
    </div>
  );
}