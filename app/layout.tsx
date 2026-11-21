import type { Metadata } from 'next';
import { LanguageProvider } from '@/components/language-provider';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://gta6keys.github.io/keys/'),
  title: 'GTA 6 Digital Code Access – PS5 & Xbox Series X|S | gta6keys',
  description:
    'Claim GTA 6 digital codes for PlayStation 5 and Xbox Series X|S. Includes Vice City edition details, verification Q&A, and XML sitemap index.',
  keywords: [
    'GTA 6 code',
    'GTA 6 PS5 code',
    'GTA 6 Xbox Series X code',
    'Grand Theft Auto VI digital code',
    'GTA 6 Vice City',
    'gta6keys',
  ],
  authors: [{ name: 'gta6keys' }],
  creator: 'gta6keys',
  publisher: 'gta6keys',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'GTA 6 Digital Code Access – PS5 & Xbox Series X|S | gta6keys',
    description:
      'Claim GTA 6 digital codes for PlayStation 5 and Xbox Series X|S with Vice City cover preview, SEO Q&A, and crawler-ready XML sitemap.',
    type: 'website',
    siteName: 'gta6keys',
    url: 'https://gta6keys.github.io/keys/',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GTA 6 Digital Code Access – PS5 & Xbox Series X|S | gta6keys',
    description:
      'Claim GTA 6 digital codes for PlayStation 5 and Xbox Series X|S with verification Q&A and XML sitemap.',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'gta6keys',
    description:
      'Community modding directory, YouTube GTA 6 gameplay index, and creator credits repository. Independent platform not affiliated with Rockstar Games or Grand Theft Auto VI.',
    url: process.env.APP_URL || 'https://gta6keys.github.io/keys/',
    potentialAction: {
      '@type': 'SearchAction',
      target: '{search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html
      lang="en"
      className="dark scroll-smooth"
    >
      <head>
        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="/gta6keys/sitemap.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-[#160726] text-[#F9F2FF] font-sans antialiased selection:bg-[#FF2E88] selection:text-[#160726] min-h-screen"
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
