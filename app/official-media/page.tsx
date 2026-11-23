import React from 'react';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { RockstarOfficialGallerySection } from '@/components/rockstar-official-gallery-section';
import {
  SITE_CONFIG,
  buildCanonicalUrl,
  buildLanguageAlternates,
} from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'GTA 6 Official 4K Gallery & Lore Archive',
  description:
    'Explore uncompressed 4K GTA 6 Vice City reference captures, official edition packages, Leonida lore details, and artwork in this archive.',
  alternates: {
    canonical: buildCanonicalUrl('/official-media/'),
    languages: buildLanguageAlternates('/official-media/'),
  },
  other: {
    'article:published_time': SITE_CONFIG.publishedAtIso,
    'article:modified_time': SITE_CONFIG.modifiedAtIso,
  },
};

export default function OfficialMediaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <RockstarOfficialGallerySection />
      </main>
      <SiteFooter />
    </div>
  );
}