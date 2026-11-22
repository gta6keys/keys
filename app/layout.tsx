import type { Metadata, Viewport } from 'next';
import { LanguageProvider } from '@/components/language-provider';
import { SITE_CONFIG, buildAssetUrl, buildCanonicalUrl } from '@/lib/site-config';
import './globals.css';

const CANONICAL_HOME = buildCanonicalUrl('/');
const OG_IMAGE_URL = buildAssetUrl(SITE_CONFIG.ogImagePath);

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_CONFIG.siteUrl}/`),
  title: {
    default: 'GTA 6 Digital Keys – PS5 & Xbox Series X|S Storefront Codes | gta6keys',
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
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'GTA 6 Digital Keys – PS5 & Xbox Series X|S Storefront Codes | gta6keys',
    description: SITE_CONFIG.description,
    type: 'website',
    siteName: SITE_CONFIG.name,
    url: CANONICAL_HOME,
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 1600,
        alt: 'Grand Theft Auto VI Digital Edition Cover Art',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GTA 6 Digital Keys – PS5 & Xbox Series X|S | gta6keys',
    description: SITE_CONFIG.description,
    images: [OG_IMAGE_URL],
  },
  alternates: {
    canonical: CANONICAL_HOME,
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
        inLanguage: 'en',
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
        logo: OG_IMAGE_URL,
      },
    ],
  };

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}