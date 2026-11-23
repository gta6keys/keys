import type { Metadata, Viewport } from 'next';
import { LanguageProvider } from '@/components/language-provider';
import {
  SITE_CONFIG,
  buildAssetUrl,
  buildCanonicalUrl,
  buildLanguageAlternates,
} from '@/lib/site-config';
import { withBasePath } from '@/lib/utils';
import './globals.css';

const CANONICAL_HOME = buildCanonicalUrl('/');
const OG_IMAGE_URL = buildAssetUrl(SITE_CONFIG.ogImagePath);
const LOGO_ASSET_URL = buildAssetUrl(SITE_CONFIG.logoPath);
const FAVICON_HREF = withBasePath(SITE_CONFIG.faviconPath);
const BACKDROP_SRC = withBasePath(SITE_CONFIG.ogImagePath);

export const viewport: Viewport = {
  themeColor: '#090514',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_CONFIG.siteUrl}/`),
  title: {
    default: SITE_CONFIG.homeTitle,
    template: '%s | gta6keys',
  },
  description: SITE_CONFIG.description,
  keywords: [
    'GTA 6 digital key',
    'GTA 6 PS5 code',
    'GTA 6 Xbox Series X code',
    'Grand Theft Auto VI voucher',
    'GTA 6 pre-load key',
    'Vice City digital edition',
    'gta6keys',
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  icons: {
    icon: [{ url: FAVICON_HREF, type: 'image/png' }],
    shortcut: [FAVICON_HREF],
    apple: [{ url: FAVICON_HREF, type: 'image/png' }],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: SITE_CONFIG.homeTitle,
    description: SITE_CONFIG.description,
    type: 'website',
    siteName: SITE_CONFIG.name,
    url: CANONICAL_HOME,
    locale: 'en_US',
    alternateLocale: ['es_ES', 'fr_FR', 'pt_BR'],
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 1600,
        alt: 'Grand Theft Auto VI Vice City Digital Edition Cover Art',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.homeTitle,
    description: SITE_CONFIG.description,
    images: [OG_IMAGE_URL],
  },
  alternates: {
    canonical: CANONICAL_HOME,
    languages: buildLanguageAlternates('/'),
  },
  other: {
    'article:published_time': SITE_CONFIG.publishedAtIso,
    'article:modified_time': SITE_CONFIG.modifiedAtIso,
    'og:updated_time': SITE_CONFIG.modifiedAtIso,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${CANONICAL_HOME}#website`,
        name: SITE_CONFIG.name,
        alternateName: SITE_CONFIG.brandTitle,
        description: SITE_CONFIG.description,
        url: CANONICAL_HOME,
        inLanguage: [...SITE_CONFIG.supportedLocales],
        datePublished: SITE_CONFIG.publishedAtIso,
        dateModified: SITE_CONFIG.modifiedAtIso,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${buildCanonicalUrl('/keys/')}?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${CANONICAL_HOME}#organization`,
        name: SITE_CONFIG.name,
        url: CANONICAL_HOME,
        logo: LOGO_ASSET_URL,
      },
      {
        '@type': 'WebPage',
        '@id': `${CANONICAL_HOME}#webpage`,
        url: CANONICAL_HOME,
        name: SITE_CONFIG.homeTitle,
        description: SITE_CONFIG.description,
        inLanguage: [...SITE_CONFIG.supportedLocales],
        datePublished: SITE_CONFIG.publishedAtIso,
        dateModified: SITE_CONFIG.modifiedAtIso,
        isPartOf: { '@id': `${CANONICAL_HOME}#website` },
      },
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.cdnfonts.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/pricedown"
        />
        <link rel="icon" type="image/png" href={FAVICON_HREF} />
        <link rel="apple-touch-icon" href={FAVICON_HREF} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen antialiased text-[#F8F5FF] selection:bg-[#FF2A85] selection:text-white">
        {/* Global Full-Bleed GTA VI Vice City Atmospheric Background */}
        <div aria-hidden="true" className="vice-backdrop-layer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={BACKDROP_SRC}
                    alt=""
                    className="w-full h-full object-cover object-center opacity-40 scale-105"
                  />
                  <div className="vice-backdrop-scrim" />
                </div>

        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}