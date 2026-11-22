import React from 'react';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { RockstarOfficialGallerySection } from '@/components/rockstar-official-gallery-section';
import { buildCanonicalUrl } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Official 4K Launch Gallery & Lore Archive',
  description:
    'Explore 4K GTA 6 Vice City reference captures, edition details, artwork, and Leonida lore in this independent archive.',
  alternates: {
    canonical: buildCanonicalUrl('/official-media/'),
  },
};

export default function OfficialMediaPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <RockstarOfficialGallerySection />
      </main>
      <SiteFooter />
    </div>
  );
}