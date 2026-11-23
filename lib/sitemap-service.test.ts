import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildSitemapIndexXml,
  buildUrlSetXml,
  escapeXml,
  filterSitemapEntries,
  generateCatalogSitemapEntries,
  getSitemapShardsSummary,
} from './sitemap-service';
import {
  INITIAL_MODS,
  buildDynamicModAndSitemapObjects,
  createSlugFromTitle,
  filterAndSortMods,
  validateModSubmission,
} from './mods-repository';
import {
  createInitialKeysDirectoryState,
  resolveInitialLocale,
  transitionAccordion,
  transitionHeaderOverlay,
  transitionKeyClaimTerminal,
  transitionKeysDirectory,
  transitionLockerModal,
} from './state-machines';
import { DEFAULT_LANGUAGES } from './i18n-store';

const TEST_BASE = 'https://gta6keys.github.io';

test('escapeXml properly escapes XML special characters', () => {
  const raw = `${TEST_BASE}/mods?a=1&b="2"&c=<tag>`;
  const escaped = escapeXml(raw);
  assert.equal(
    escaped,
    `${TEST_BASE}/mods?a=1&amp;b=&quot;2&quot;&amp;c=&lt;tag&gt;`
  );
});

test('generateCatalogSitemapEntries generates 2,000+ static crawler URLs across 5 static shards', () => {
  const entries = generateCatalogSitemapEntries(TEST_BASE, 2000);
  assert.ok(entries.length >= 2013, `Expected >= 2013 entries, got ${entries.length}`);

  const shards = getSitemapShardsSummary(entries, TEST_BASE);
  assert.equal(shards.length, 5);
  assert.equal(shards[0].xmlEndpoint, `${TEST_BASE}/sitemaps/sitemap-core.xml`);
  assert.equal(shards[1].xmlEndpoint, `${TEST_BASE}/sitemaps/sitemap-keys-1.xml`);
});

test('dynamically added pages immediately update the generated sitemap entries', () => {
  const { sitemapEntry } = buildDynamicModAndSitemapObjects(
    {
      title: 'Leonida Keys Offshore Speedboat Pack',
      authorHandle: '@MarineModder',
      category: 'vehicles',
      version: 'v1.4.0',
      summary: 'High-speed offshore racing catamarans for the Leonida Keys sector.',
    },
    TEST_BASE
  );

  const entries = generateCatalogSitemapEntries(TEST_BASE, 2000, [sitemapEntry]);
  assert.equal(entries[0].path, '/mods/vehicles/leonida-keys-offshore-speedboat-pack/');

  const xml = buildUrlSetXml(entries.slice(0, 3));
  assert.ok(
    xml.includes(
      `${TEST_BASE}/mods/vehicles/leonida-keys-offshore-speedboat-pack/`
    )
  );
});

test('buildUrlSetXml and buildSitemapIndexXml produce valid Sitemap 0.9 XML with hreflang alternates', () => {
  const entries = generateCatalogSitemapEntries(TEST_BASE, 20);
  const urlsetXml = buildUrlSetXml(entries.slice(0, 5));
  assert.ok(urlsetXml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(
    urlsetXml.includes(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'
    )
  );
  assert.ok(urlsetXml.includes(`<loc>${TEST_BASE}/</loc>`));
  assert.ok(urlsetXml.includes('hreflang="en"'));
  assert.ok(urlsetXml.includes('hreflang="es"'));
  assert.ok(urlsetXml.includes('hreflang="fr"'));
  assert.ok(urlsetXml.includes('hreflang="pt"'));
  assert.ok(urlsetXml.includes('hreflang="x-default"'));

  const shards = getSitemapShardsSummary(entries, TEST_BASE);
  const indexXml = buildSitemapIndexXml(shards);
  assert.ok(indexXml.includes('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'));
  assert.ok(indexXml.includes(`${TEST_BASE}/sitemaps/sitemap-core.xml`));
});

test('filterSitemapEntries filters by shard, entityType, and search query', () => {
  const entries = generateCatalogSitemapEntries(TEST_BASE, 600);
  const keysOnly = filterSitemapEntries(entries, { entityType: 'key', limit: 20 });
  assert.equal(keysOnly.length, 20);
  assert.ok(keysOnly.every((e) => e.entityType === 'key'));

  const shard2Only = filterSitemapEntries(entries, { shardId: 2, limit: 100 });
  assert.ok(shard2Only.length > 0);
  assert.ok(shard2Only.every((e) => e.shardId === 2));
});

test('filterAndSortMods filters by category and search query deterministically', () => {
  const vehicles = filterAndSortMods(INITIAL_MODS, { category: 'vehicles' });
  assert.equal(vehicles.length, 2);
  assert.ok(vehicles.every((m) => m.category === 'vehicles'));

  const queryMatch = filterAndSortMods(INITIAL_MODS, { searchQuery: 'Cheetah' });
  assert.equal(queryMatch.length, 1);
  assert.equal(queryMatch[0].id, 'mod-cheetah-classic-86');
});

test('validateModSubmission enforces required fields and accepts valid input', () => {
  const invalid = validateModSubmission({
    title: 'abc',
    authorHandle: '',
    category: 'vehicles',
    version: 'bad',
    summary: 'too short',
    youtubeUrl: 'https://example.com/not-youtube',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.title);
  assert.ok(invalid.errors.authorHandle);
  assert.ok(invalid.errors.version);
  assert.ok(invalid.errors.summary);
  assert.ok(invalid.errors.youtubeUrl);

  const valid = validateModSubmission({
    title: 'Vice Neon Palm Overhaul',
    authorHandle: '@PalmArtist',
    category: 'shaders',
    version: 'v1.2.0',
    summary: 'High-resolution palm frond subsurface scattering shader for Vice Beach.',
    youtubeUrl: 'https://www.youtube.com/watch?v=QdBZY2fkU-0',
  });
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
  assert.equal(
    createSlugFromTitle('Vice Neon Palm Overhaul!'),
    'vice-neon-palm-overhaul'
  );
});

test('explicit UI finite state machines maintain deterministic invariants', () => {
  // Locker Modal FSM
  let modal = transitionLockerModal({ status: 'closed' }, { type: 'OPEN' });
  assert.equal(modal.status, 'loading');
  modal = transitionLockerModal(modal, { type: 'TIMEOUT_FALLBACK' });
  assert.equal(modal.status, 'fallback');
  modal = transitionLockerModal(modal, { type: 'IFRAME_LOADED' });
  assert.equal(modal.status, 'ready');
  modal = transitionLockerModal(modal, { type: 'CLOSE' });
  assert.equal(modal.status, 'closed');

  // Key Claim Terminal FSM
  let terminal = transitionKeyClaimTerminal(
    { status: 'configuring', platform: 'ps5', regionCode: 'us', editionId: 'standard' },
    { type: 'OPEN_VERIFICATION' }
  );
  assert.equal(terminal.status, 'verifying');
  terminal = transitionKeyClaimTerminal(terminal, {
    type: 'SELECT_PLATFORM',
    platform: 'xbox-series-x',
  });
  assert.equal(terminal.status, 'configuring');
  assert.equal(terminal.platform, 'xbox-series-x');

  // Keys Directory FSM resets pagination on filter change
  let dir = createInitialKeysDirectoryState(24);
  dir = transitionKeysDirectory(dir, { type: 'LOAD_MORE' });
  assert.equal(dir.visibleLimit, 48);
  dir = transitionKeysDirectory(dir, { type: 'SET_REGION', regionCode: 'fr' });
  assert.equal(dir.visibleLimit, 24);
  assert.equal(dir.regionCode, 'fr');

  // Header Overlay FSM enforces mutual exclusivity
  let overlay = transitionHeaderOverlay({ status: 'idle' }, { type: 'TOGGLE_MOBILE_MENU' });
  assert.equal(overlay.status, 'mobile-menu');
  overlay = transitionHeaderOverlay(overlay, { type: 'OPEN_CLAIM_MODAL' });
  assert.equal(overlay.status, 'claim-modal');

  // Accordion FSM
  let acc = transitionAccordion({ status: 'collapsed', openId: null }, { type: 'TOGGLE_ITEM', id: 'q1' });
  assert.equal(acc.status, 'expanded');
  acc = transitionAccordion(acc, { type: 'TOGGLE_ITEM', id: 'q1' });
  assert.equal(acc.status, 'collapsed');

  // Locale resolution prefers URL ?lang over storage
  assert.equal(
    resolveInitialLocale({ urlLang: 'fr', storedLocale: 'es', languages: DEFAULT_LANGUAGES }),
    'fr'
  );
  assert.equal(
    resolveInitialLocale({ urlLang: 'invalid', storedLocale: 'pt', languages: DEFAULT_LANGUAGES }),
    'pt'
  );
});