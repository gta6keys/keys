import React from 'react';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ModsDirectorySection } from '@/components/mods-directory-section';
import { buildCanonicalUrl } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Mods Directory & Technical Packages',
  description:
    'Browse GTA 6 Vice City mods, graphics shaders, vehicle packs, map expansions, characters, and gameplay scripts.',
  alternates: {
    canonical: buildCanonicalUrl('/mods/'),
  },
};

export default function ModsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <ModsDirectorySection />
      </main>
      <SiteFooter />
    </div>
  );
}