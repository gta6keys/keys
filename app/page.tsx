import React from 'react';
import type { Metadata } from 'next';
import { Gta6modPortal } from '@/components/gta6mod-portal';
import {
  SITE_CONFIG,
  buildCanonicalUrl,
  buildLanguageAlternates,
} from '@/lib/site-config';

export const metadata: Metadata = {
  title: {
    absolute: SITE_CONFIG.homeTitle,
  },
  description: SITE_CONFIG.description,
  alternates: {
    canonical: buildCanonicalUrl('/'),
    languages: buildLanguageAlternates('/'),
  },
  other: {
    'article:published_time': SITE_CONFIG.publishedAtIso,
    'article:modified_time': SITE_CONFIG.modifiedAtIso,
  },
};

export default function HomePage() {
  return <Gta6modPortal />;
}