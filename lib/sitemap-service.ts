import { INITIAL_MODS } from './mods-repository';
import { getAllPseoKeyPages } from './pseo-catalog';
import { SITE_CONFIG } from './site-config';
import { SitemapEntityType, SitemapShardInfo, SitemapUrlEntry } from './types';

export function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function normalizeBaseUrl(rawBaseUrl?: string): string {
  const fallback = SITE_CONFIG.siteUrl;
  if (!rawBaseUrl || !rawBaseUrl.trim()) return fallback;
  return rawBaseUrl.trim().replace(/\/+$/, '');
}

function formatTrailingPath(rawPath: string): string {
  if (!rawPath || rawPath === '/') return '/';
  const withLeading = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

/**
 * Generates the exact canonical sitemap catalog matching our static export
 * output: Shard 1 (core routes + mod detail pages) and Shards 2..5 (2,000 pSEO key pages).
 */
export function generateCatalogSitemapEntries(
  baseUrlInput?: string,
  maxPseoKeys = 2000,
  dynamicEntries: SitemapUrlEntry[] = []
): SitemapUrlEntry[] {
  const baseUrl = normalizeBaseUrl(baseUrlInput);
  const entries: SitemapUrlEntry[] = [];

  // 0. Dynamically added pages (Shard 1)
  for (const dyn of dynamicEntries) {
    const cleanPath = formatTrailingPath(dyn.path);
    entries.push({
      ...dyn,
      path: cleanPath,
      loc: `${baseUrl}${cleanPath}`,
      shardId: 1,
    });
  }

  // 1. Core Standalone Routes (Shard 1 -> /sitemaps/sitemap-core.xml)
  const coreRoutes = [
    { path: '/', priority: '1.0', freq: 'daily' as const, title: 'gta6keys — GTA 6 Digital Keys Hub' },
    { path: '/keys/', priority: '0.95', freq: 'daily' as const, title: 'GTA 6 Regional Digital Keys Directory' },
    { path: '/official-media/', priority: '0.8', freq: 'weekly' as const, title: 'Official 4K Media & Lore Archive' },
    { path: '/mods/', priority: '0.8', freq: 'weekly' as const, title: 'Vice City Mods Directory' },
    { path: '/gameplay/', priority: '0.8', freq: 'weekly' as const, title: 'YouTube GTA 6 Gameplay & Engine Analysis' },
    { path: '/credits/', priority: '0.7', freq: 'weekly' as const, title: 'Creator Credits & Attribution Ledger' },
    { path: '/sitemap-explorer/', priority: '0.6', freq: 'weekly' as const, title: 'Static Multi-Shard XML Sitemap Inspector' },
  ];

  for (const route of coreRoutes) {
    entries.push({
      loc: `${baseUrl}${route.path}`,
      path: route.path,
      lastmod: '2026-11-22',
      changefreq: route.freq,
      priority: route.priority,
      entityType: 'core',
      shardId: 1,
      title: route.title,
    });
  }

  // 2. Statically Exported Mod Detail Routes (Shard 1 -> /sitemaps/sitemap-core.xml)
  for (const mod of INITIAL_MODS) {
    const path = formatTrailingPath(`/mods/${mod.category}/${mod.slug}`);
    if (entries.some((e) => e.path === path)) continue;
    entries.push({
      loc: `${baseUrl}${path}`,
      path,
      lastmod: mod.updatedAt,
      changefreq: 'weekly',
      priority: '0.7',
      entityType: 'mod',
      shardId: 1,
      title: `${mod.title} (${mod.version})`,
    });
  }

  // 3. Statically Exported pSEO Key Routes (Shards 2..5 -> /sitemaps/sitemap-keys-1..4.xml)
  const allPseoPages = getAllPseoKeyPages().slice(0, Math.max(0, maxPseoKeys));
  for (const page of allPseoPages) {
    const path = formatTrailingPath(page.path);
    entries.push({
      loc: `${baseUrl}${path}`,
      path,
      lastmod: page.lastmod,
      changefreq: page.intent.id === 'gift-code' ? 'monthly' : 'weekly',
      priority: page.priority,
      entityType: 'key',
      shardId: page.shardIndex + 1,
      title: page.metaTitle,
    });
  }

  return entries;
}

export function getSitemapShardsSummary(
  entries: SitemapUrlEntry[],
  baseUrlInput?: string
): SitemapShardInfo[] {
  const baseUrl = normalizeBaseUrl(baseUrlInput);
  const shardMap = new Map<number, SitemapUrlEntry[]>();

  for (const entry of entries) {
    const list = shardMap.get(entry.shardId) || [];
    list.push(entry);
    shardMap.set(entry.shardId, list);
  }

  const shardLabels: Record<number, string> = {
    1: 'Core Hub, Keys Directory & Mod Pages',
    2: 'Keys Shard 01: Core Regional Editions & Redeem Guides (#1–#500)',
    3: 'Keys Shard 02: Redeem Codes & Store Vouchers (#501–#1000)',
    4: 'Keys Shard 03: Store Vouchers & Download Keys (#1001–#1500)',
    5: 'Keys Shard 04: Download Keys & Gift Codes (#1501–#2000)',
  };

  return Array.from(shardMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([shardId, list]) => {
      const fileName =
        shardId === 1
          ? 'sitemap-core.xml'
          : `sitemap-keys-${shardId - 1}.xml`;

      return {
        shardId,
        label: shardLabels[shardId] || `Keys Shard 0${shardId - 1}`,
        entityType: shardId === 1 ? 'mixed' : 'key',
        urlCount: list.length,
        samplePath: list[0]?.path || '/',
        xmlEndpoint: `${baseUrl}/sitemaps/${fileName}`,
      };
    });
}

export function buildUrlSetXml(entries: SitemapUrlEntry[]): string {
  const urlNodes = entries
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${escapeXml(entry.lastmod)}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${escapeXml(entry.priority)}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlNodes}
</urlset>`;
}

export function buildSitemapIndexXml(
  shards: SitemapShardInfo[],
  lastmod = '2026-11-22'
): string {
  const sitemapNodes = shards
    .map(
      (shard) => `  <sitemap>
    <loc>${escapeXml(shard.xmlEndpoint)}</loc>
    <lastmod>${escapeXml(lastmod)}</lastmod>
  </sitemap>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapNodes}
</sitemapindex>`;
}

export function filterSitemapEntries(
  entries: SitemapUrlEntry[],
  options: {
    shardId?: number | 'all';
    entityType?: SitemapEntityType | 'all';
    query?: string;
    limit?: number;
  }
): SitemapUrlEntry[] {
  const { shardId = 'all', entityType = 'all', query = '', limit = 50 } = options;
  const q = query.trim().toLowerCase();

  const filtered = entries.filter((item) => {
    if (shardId !== 'all' && item.shardId !== shardId) return false;
    if (entityType !== 'all' && item.entityType !== entityType) return false;
    if (!q) return true;
    return (
      item.path.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.entityType.toLowerCase().includes(q)
    );
  });

  return filtered.slice(0, limit);
}