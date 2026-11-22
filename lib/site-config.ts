const DEFAULT_SITE_URL = 'https://gta6keys.github.io/gta6keys';

function trimTrailingSlash(url: string): string {
  return url.trim().replace(/\/+$/, '');
}

export const SITE_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL || DEFAULT_SITE_URL
);

export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/+$/, '');

export const SITE_CONFIG = {
  name: 'gta6keys',
  brandTitle: 'GTA 6 Digital Keys',
  tagline: 'PS5 & Xbox Series X|S Digital Code Hub',
  description:
    'Access Grand Theft Auto VI digital key guides, PlayStation 5 and Xbox Series X|S storefront redemption formats, regional edition specs, and verified code claim access.',
  siteUrl: SITE_URL,
  basePath: BASE_PATH,
  lockerUrl: 'https://apptrck.net/cl/i/n6e9jk',
  releaseDateLabel: 'November 19, 2026',
  releaseDateIso: '2026-11-19',
  ogImagePath: '/assets/scraped-vi/high_res_photos/poster_full.0az_iud2g3y4j.jpg',
  sitemapShardSize: 500,
} as const;

const FILE_EXTENSION_REGEX = /\.[a-z0-9]{2,5}$/i;

/**
 * Builds an absolute canonical URL preserving any configured subdirectory
 * (e.g. /gta6keys) and enforcing trailing slashes on HTML routes.
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

  const withTrailingSlash = normalized.endsWith('/') ? normalized : `${normalized}/`;
  return `${SITE_URL}${withTrailingSlash}`;
}

/**
 * Builds an absolute URL for static public assets (OpenGraph, JSON-LD, etc.).
 */
export function buildAssetUrl(assetPath: string): string {
  if (/^https?:\/\//i.test(assetPath)) {
    return assetPath;
  }
  const normalized = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
  return `${SITE_URL}${normalized}`;
}