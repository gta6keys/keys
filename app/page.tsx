import React from 'react';
import type { Metadata } from 'next';
import { Gta6modPortal } from '@/components/gta6mod-portal';
import { SITE_CONFIG, buildCanonicalUrl } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'GTA 6 Digital Keys – PS5 & Xbox Series X|S Storefront Codes | gta6keys',
  description: SITE_CONFIG.description,
  alternates: {
    canonical: buildCanonicalUrl('/'),
  },
};

export default function HomePage() {
  return <Gta6modPortal />;
}