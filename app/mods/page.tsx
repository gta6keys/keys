import React from 'react';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ModsDirectorySection } from '@/components/mods-directory-section';
import {
  SITE_CONFIG,
  buildCanonicalUrl,
  buildLanguageAlternates,
} from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'GTA 6 Vice City Mods Directory & Shaders',
  description:
    'Browse verified GTA 6 Vice City mods, RTGI graphics shaders, custom vehicle packs, Leonida map expansions, character outfits, and scripts.',
  alternates: {
    canonical: buildCanonicalUrl('/mods/'),
    languages: buildLanguageAlternates('/mods/'),
  },
  other: {
    'article:published_time': SITE_CONFIG.publishedAtIso,
    'article:modified_time': SITE_CONFIG.modifiedAtIso,
  },
};

export default function ModsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <ModsDirectorySection />
      </main>
      <SiteFooter />
    </div>
  );
}