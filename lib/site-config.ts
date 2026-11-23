import type { LocaleCode } from './types';

const DEFAULT_SITE_URL = 'https://gta6keys.github.io';

function trimTrailingSlash(url: string): string {
  return url.trim().replace(/\/+$/, '');
}

export const SITE_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL || DEFAULT_SITE_URL
);

export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(
  /\/+$/,
  ''
);

export const SUPPORTED_LOCALES: readonly LocaleCode[] = [
  'en',
  'es',
  'fr',
  'pt',
] as const;

export function isSupportedLocale(
  value: string | null | undefined
): value is LocaleCode {
  if (!value) return false;
  return (SUPPORTED_LOCALES as readonly string[]).includes(
    value.toLowerCase()
  );
}

export const SITE_CONFIG = {
  name: 'gta6keys',
  brandTitle: 'GTA 6 Digital Keys',
  homeTitle: 'GTA 6 Digital Keys – PS5 & Xbox Series X|S | gta6keys',
  tagline: 'PS5 & Xbox Series X|S Vice City Digital Code Hub',
  description:
    'Grand Theft Auto VI digital key guides, PS5 & Xbox Series X|S storefront redemption formats, regional edition specs, and verified code access.',
  siteUrl: SITE_URL,
  basePath: BASE_PATH,
  lockerUrl: 'https://apptrck.net/cl/i/n6e9jk',
  releaseDateLabel: 'November 19, 2026',
  releaseDateIso: '2026-11-19',
  publishedAtIso: '2026-01-15T00:00:00Z',
  modifiedAtIso: '2026-11-23T00:00:00Z',
  logoPath: '/gta6keys.png',
  faviconPath: '/gta6keys.png',
  ogImagePath: '/assets/scraped-vi/high_res_photos/poster_full.0az_iud2g3y4j.jpg',
  sitemapShardSize: 500,
  defaultLocale: 'en' as LocaleCode,
  supportedLocales: SUPPORTED_LOCALES,
} as const;

const FILE_EXTENSION_REGEX = /\.[a-z0-9]{2,5}$/i;

/**
 * Builds an absolute canonical URL preserving any configured subdirectory
 * and enforcing trailing slashes on HTML routes.
 */
export function buildCanonicalUrl(routePath = '/'): string {
  const cleanPath = routePath.trim();
  if (!cleanPath || cleanPath === '/') {
    return `${SITE_URL}/`;
  }

  if (/^https?:\/\//i.test(cleanPath)) {
    return cleanPath;
  }

  const normalized = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  if (FILE_EXTENSION_REGEX.test(normalized) || normalized.includes('?')) {
    return `${SITE_URL}${normalized}`;
  }

  const withTrailingSlash = normalized.endsWith('/')
    ? normalized
    : `${normalized}/`;
  return `${SITE_URL}${withTrailingSlash}`;
}

/**
 * Builds hreflang alternate URLs (en/es/fr/pt + x-default) for SEO metadata
 * and multi-language XML sitemaps.
 */
export function buildLanguageAlternates(
  routePath = '/'
): Record<LocaleCode | 'x-default', string> {
  const canonical = buildCanonicalUrl(routePath);
  return {
    en: canonical,
    es: `${canonical}?lang=es`,
    fr: `${canonical}?lang=fr`,
    pt: `${canonical}?lang=pt`,
    'x-default': canonical,
  };
}

/**
 * Builds an absolute URL for static public assets (OpenGraph, JSON-LD, icons).
 */
export function buildAssetUrl(assetPath: string): string {
  if (/^https?:\/\//i.test(assetPath)) {
    return assetPath;
  }
  const normalized = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
  return `${SITE_URL}${normalized}`;
}