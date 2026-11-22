import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_SITE_URL = 'https://gta6keys.github.io/gta6keys';
const SHARD_SIZE = 500;
const BUILD_DATE = '2026-11-22';

function loadEnvSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.APP_URL) return process.env.APP_URL;

  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const eqIdx = line.indexOf('=');
      if (eqIdx === -1) continue;
      const key = line.slice(0, eqIdx).trim();
      const val = line.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
      if ((key === 'NEXT_PUBLIC_SITE_URL' || key === 'APP_URL') && val) {
        return val;
      }
    }
  }

  return DEFAULT_SITE_URL;
}

const SITE_URL = loadEnvSiteUrl().trim().replace(/\/+$/, '');

function escapeXml(unsafe) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toCanonical(routePath) {
  if (!routePath || routePath === '/') return `${SITE_URL}/`;
  const normalized = routePath.startsWith('/') ? routePath : `/${routePath}`;
  const withTrailing = normalized.endsWith('/') ? normalized : `${normalized}/`;
  return `${SITE_URL}${withTrailing}`;
}

function buildUrlSetXml(urls) {
  const nodes = urls
    .map(
      (item) => `  <url>
    <loc>${escapeXml(item.loc)}</loc>
    <lastmod>${escapeXml(item.lastmod)}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${escapeXml(item.priority)}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${nodes}
</urlset>
`;
}

function buildSitemapIndexXml(shardEndpoints) {
  const nodes = shardEndpoints
    .map(
      (endpoint) => `  <sitemap>
    <loc>${escapeXml(endpoint)}</loc>
    <lastmod>${escapeXml(BUILD_DATE)}</lastmod>
  </sitemap>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${nodes}
</sitemapindex>
`;
}

// Must match app/ static pages & lib/mods-repository.ts INITIAL_MODS
const CORE_URLS = [
  { path: '/', lastmod: BUILD_DATE, changefreq: 'daily', priority: '1.0' },
  { path: '/keys/', lastmod: BUILD_DATE, changefreq: 'daily', priority: '0.95' },
  { path: '/official-media/', lastmod: BUILD_DATE, changefreq: 'weekly', priority: '0.8' },
  { path: '/mods/', lastmod: BUILD_DATE, changefreq: 'weekly', priority: '0.8' },
  { path: '/gameplay/', lastmod: BUILD_DATE, changefreq: 'weekly', priority: '0.8' },
  { path: '/credits/', lastmod: BUILD_DATE, changefreq: 'weekly', priority: '0.7' },
  { path: '/sitemap-explorer/', lastmod: BUILD_DATE, changefreq: 'weekly', priority: '0.6' },
  {
    path: '/mods/shaders/vice-city-sunset-rtgi-path-tracer/',
    lastmod: '2026-11-04',
    changefreq: 'weekly',
    priority: '0.7',
  },
  {
    path: '/mods/vehicles/grotti-cheetah-vice-widebody-custom/',
    lastmod: '2026-11-08',
    changefreq: 'weekly',
    priority: '0.7',
  },
  {
    path: '/mods/map-expansions/starfish-island-syndicate-estate-interior/',
    lastmod: '2026-11-01',
    changefreq: 'weekly',
    priority: '0.7',
  },
  {
    path: '/mods/scripts/grassrivers-wetlands-hydro-physics-overhaul/',
    lastmod: '2026-10-29',
    changefreq: 'weekly',
    priority: '0.7',
  },
  {
    path: '/mods/characters/vice-syndicate-heist-wardrobe-collection/',
    lastmod: '2026-11-06',
    changefreq: 'weekly',
    priority: '0.7',
  },
  {
    path: '/mods/vehicles/declasse-tulip-72-drag-strip-custom/',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.7',
  },
].map((entry) => ({
  ...entry,
  loc: toCanonical(entry.path),
}));

// Must match lib/pseo-catalog.ts dimensions verbatim (4 x 20 x 5 x 5 = 2,000 pages)
const PLATFORMS = ['ps5', 'ps5-pro', 'xbox-series-x', 'xbox-series-s'];
const REGIONS = [
  'us',
  'uk',
  'eu',
  'ca',
  'de',
  'fr',
  'es',
  'it',
  'br',
  'au',
  'jp',
  'mx',
  'ae',
  'pl',
  'nl',
  'se',
  'ch',
  'kr',
  'sa',
  'global',
];
const EDITIONS = ['standard', 'deluxe', 'ultimate', 'preload', 'collector'];
const INTENTS = [
  { suffix: '', priority: '0.9', changefreq: 'weekly' },
  { suffix: 'redeem-code', priority: '0.7', changefreq: 'weekly' },
  { suffix: 'store-voucher', priority: '0.7', changefreq: 'weekly' },
  { suffix: 'download-key', priority: '0.7', changefreq: 'weekly' },
  { suffix: 'gift-code', priority: '0.6', changefreq: 'monthly' },
];

const pseoUrls = [];
let counter = 0;

for (const intent of INTENTS) {
  for (const platform of PLATFORMS) {
    for (const region of REGIONS) {
      for (const edition of EDITIONS) {
        const slug = intent.suffix
          ? `${platform}-${region}-${edition}-${intent.suffix}`
          : `${platform}-${region}-${edition}`;
        const dayNum = String((counter % 20) + 1).padStart(2, '0');
        pseoUrls.push({
          loc: toCanonical(`/keys/${slug}/`),
          lastmod: `2026-11-${dayNum}`,
          changefreq: intent.changefreq,
          priority: intent.priority,
        });
        counter += 1;
      }
    }
  }
}

const publicDir = path.join(process.cwd(), 'public');
const sitemapsDir = path.join(publicDir, 'sitemaps');

fs.mkdirSync(sitemapsDir, { recursive: true });

// Remove any old generated shard XML files
for (const existing of fs.readdirSync(sitemapsDir)) {
  if (existing.endsWith('.xml')) {
    fs.unlinkSync(path.join(sitemapsDir, existing));
  }
}

const shardEndpoints = [];

// 1. Write Core Shard
const coreFileName = 'sitemap-core.xml';
fs.writeFileSync(
  path.join(sitemapsDir, coreFileName),
  buildUrlSetXml(CORE_URLS),
  'utf-8'
);
shardEndpoints.push(`${SITE_URL}/sitemaps/${coreFileName}`);

// 2. Write Chunked pSEO Key Shards (500 URLs each)
const totalKeyShards = Math.ceil(pseoUrls.length / SHARD_SIZE);
for (let i = 0; i < totalKeyShards; i += 1) {
  const chunk = pseoUrls.slice(i * SHARD_SIZE, (i + 1) * SHARD_SIZE);
  const shardFileName = `sitemap-keys-${i + 1}.xml`;
  fs.writeFileSync(
    path.join(sitemapsDir, shardFileName),
    buildUrlSetXml(chunk),
    'utf-8'
  );
  shardEndpoints.push(`${SITE_URL}/sitemaps/${shardFileName}`);
}

// 3. Write Master Sitemap Index at public/sitemap.xml
fs.writeFileSync(
  path.join(publicDir, 'sitemap.xml'),
  buildSitemapIndexXml(shardEndpoints),
  'utf-8'
);

// 4. Write Aligned public/robots.txt
const robotsContent = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent, 'utf-8');

const totalUrls = CORE_URLS.length + pseoUrls.length;
console.log(
  `[sitemaps] Generated ${shardEndpoints.length} static XML shards covering ${totalUrls} canonical URLs -> public/sitemap.xml`
);