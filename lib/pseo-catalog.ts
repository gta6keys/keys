import type { KeyPlatformId } from '@/components/key-claim-terminal';
import type { FaqAccordionItem } from '@/components/faq-accordion';
import { OFFICIAL_VI_ASSETS } from './mods-repository';
import { SITE_CONFIG } from './site-config';

export interface PseoPlatformSpec {
  id: KeyPlatformId;
  name: string;
  shortName: string;
  ecosystem: 'playstation' | 'xbox';
  storefront: string;
  accountSystem: string;
  keyFormatLabel: string;
  keyPattern: string;
  hardwareTier: string;
  performanceNote: string;
  storageEstimate: string;
  redeemPortalUrl: string;
  redeemSteps: [string, string, string];
}

export interface PseoRegionSpec {
  code: string;
  name: string;
  shortLabel: string;
  zone: string;
  currency: string;
  storeLocaleNote: string;
  releaseWindowNote: string;
}

export interface PseoEditionSpec {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  summary: string;
  inclusions: string[];
  preloadEligible: boolean;
}

export interface PseoIntentSpec {
  id: string;
  slugSuffix: string;
  label: string;
  headlineSuffix: string;
  descriptionAngle: string;
  guidanceTitle: string;
  guidanceBody: string;
  sitemapPriority: string;
}

export interface PseoKeyPage {
  slug: string;
  path: string;
  platform: PseoPlatformSpec;
  region: PseoRegionSpec;
  edition: PseoEditionSpec;
  intent: PseoIntentSpec;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  imageUrl: string;
  lastmod: string;
  priority: string;
  shardIndex: number;
  faqs: FaqAccordionItem[];
}

export const PSEO_PLATFORMS: PseoPlatformSpec[] = [
  {
    id: 'ps5',
    name: 'PlayStation 5',
    shortName: 'PS5',
    ecosystem: 'playstation',
    storefront: 'PlayStation Store',
    accountSystem: 'PlayStation Network (PSN)',
    keyFormatLabel: '12-Character PSN Voucher',
    keyPattern: 'XXXX-XXXX-XXXX',
    hardwareTier: '4K HDR · DualSense Haptics & Adaptive Triggers',
    performanceNote:
      'Engineered for ultra-fast NVMe SSD streaming across Leonida with Tempest 3D AudioTech and DualSense tactile feedback.',
    storageEstimate: '150+ GB SSD space recommended',
    redeemPortalUrl: 'store.playstation.com',
    redeemSteps: [
      'Sign in to your matching regional PlayStation Network account on your PS5 console or PlayStation App.',
      'Navigate to PlayStation Store, select the top-right More (...) menu, and open Redeem Code.',
      'Enter your 12-character PSN voucher, confirm license activation, and queue Grand Theft Auto VI in your Game Library.',
    ],
  },
  {
    id: 'ps5-pro',
    name: 'PS5 Pro',
    shortName: 'PS5 Pro',
    ecosystem: 'playstation',
    storefront: 'PlayStation Store',
    accountSystem: 'PlayStation Network (PSN)',
    keyFormatLabel: '12-Character PSN Voucher',
    keyPattern: 'XXXX-XXXX-XXXX',
    hardwareTier: 'PSSR 4K Upscaling · Enhanced Ray Tracing',
    performanceNote:
      'Unlocks upgraded ray-traced Vice City reflections, higher frame stability, and PlayStation Spectral Super Resolution fidelity.',
    storageEstimate: '150+ GB Gen4 NVMe SSD recommended',
    redeemPortalUrl: 'store.playstation.com',
    redeemSteps: [
      'Open the PlayStation Store on your PS5 Pro using an account registered to your selected storefront region.',
      'Select Redeem Code from the Store navigation menu and type the 12-character alphanumeric voucher.',
      'Activate the digital entitlement to trigger automatic PS5 Pro Enhanced asset downloads in your console library.',
    ],
  },
  {
    id: 'xbox-series-x',
    name: 'Xbox Series X',
    shortName: 'Xbox Series X',
    ecosystem: 'xbox',
    storefront: 'Microsoft Store',
    accountSystem: 'Xbox Network / Microsoft Account',
    keyFormatLabel: '25-Character Microsoft Store Key',
    keyPattern: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX',
    hardwareTier: 'Native 4K · Quick Resume & Dolby Atmos',
    performanceNote:
      'Delivers native 4K resolution, Xbox Velocity Architecture streaming, Quick Resume state saving, and Spatial Sound support.',
    storageEstimate: '150+ GB internal SSD or Storage Expansion Card',
    redeemPortalUrl: 'redeem.microsoft.com',
    redeemSteps: [
      'Press the Xbox button on your controller to open the guide, then launch the Microsoft Store app.',
      'Open the side navigation drawer, select Redeem, and enter your 25-character digital product key.',
      'Confirm ownership to bind the permanent Grand Theft Auto VI license to My Games & Apps with Smart Delivery.',
    ],
  },
  {
    id: 'xbox-series-s',
    name: 'Xbox Series S',
    shortName: 'Xbox Series S',
    ecosystem: 'xbox',
    storefront: 'Microsoft Store',
    accountSystem: 'Xbox Network / Microsoft Account',
    keyFormatLabel: '25-Character Microsoft Store Key',
    keyPattern: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX',
    hardwareTier: 'All-Digital Optimized · 1440p Target & Quick Resume',
    performanceNote:
      'Tailored for the all-digital Xbox Series S console with streamlined texture streaming, fast NVMe loading, and Quick Resume.',
    storageEstimate: '140+ GB internal SSD recommended',
    redeemPortalUrl: 'redeem.microsoft.com',
    redeemSteps: [
      'Sign in to your Microsoft account on your all-digital Xbox Series S or via redeem.microsoft.com.',
      'Open the Microsoft Store sidebar, choose Redeem, and enter all 25 characters of your digital key.',
      'Confirm redemption to install Grand Theft Auto VI directly to your console storage—no physical disc required.',
    ],
  },
];

export const PSEO_REGIONS: PseoRegionSpec[] = [
  {
    code: 'us',
    name: 'United States',
    shortLabel: 'USA',
    zone: 'North America',
    currency: 'USD',
    storeLocaleNote: 'Valid on United States (US) storefront accounts configured in USD.',
    releaseWindowNote: 'Unlocks at 12:00 AM Eastern Time on launch day.',
  },
  {
    code: 'uk',
    name: 'United Kingdom',
    shortLabel: 'UK',
    zone: 'United Kingdom',
    currency: 'GBP',
    storeLocaleNote: 'Formatted for United Kingdom (GB) storefront accounts billed in GBP.',
    releaseWindowNote: 'Unlocks at 12:00 AM GMT for UK console accounts.',
  },
  {
    code: 'eu',
    name: 'Europe (EU)',
    shortLabel: 'Europe',
    zone: 'European Union',
    currency: 'EUR',
    storeLocaleNote: 'Compatible with Eurozone EU storefront accounts across member states.',
    releaseWindowNote: 'Unlocks at midnight local European storefront time.',
  },
  {
    code: 'ca',
    name: 'Canada',
    shortLabel: 'Canada',
    zone: 'North America',
    currency: 'CAD',
    storeLocaleNote: 'Matched to Canadian console accounts with CAD store billing.',
    releaseWindowNote: 'Follows North American 12:00 AM ET synchronized digital unlock.',
  },
  {
    code: 'de',
    name: 'Germany',
    shortLabel: 'Germany',
    zone: 'DACH / Europe',
    currency: 'EUR',
    storeLocaleNote: 'Designed for German (DE) storefront accounts with USK regional compliance.',
    releaseWindowNote: 'Unlocks at 12:00 AM CET across Germany.',
  },
  {
    code: 'fr',
    name: 'France',
    shortLabel: 'France',
    zone: 'Western Europe',
    currency: 'EUR',
    storeLocaleNote: 'Configured for French (FR) storefront accounts billed in EUR.',
    releaseWindowNote: 'Unlocks at 12:00 AM CET for France digital libraries.',
  },
  {
    code: 'es',
    name: 'Spain',
    shortLabel: 'Spain',
    zone: 'Western Europe',
    currency: 'EUR',
    storeLocaleNote: 'Matches Spanish (ES) regional storefront policies and EUR currency.',
    releaseWindowNote: 'Unlocks at 12:00 AM CET in mainland Spain.',
  },
  {
    code: 'it',
    name: 'Italy',
    shortLabel: 'Italy',
    zone: 'Southern Europe',
    currency: 'EUR',
    storeLocaleNote: 'Matched to Italian (IT) regional PlayStation and Xbox Store accounts.',
    releaseWindowNote: 'Unlocks at 12:00 AM CET for Italian console accounts.',
  },
  {
    code: 'br',
    name: 'Brazil',
    shortLabel: 'Brazil',
    zone: 'Latin America',
    currency: 'BRL',
    storeLocaleNote: 'Formatted for Brazilian (BR) console accounts operating in BRL.',
    releaseWindowNote: 'Unlocks at 12:00 AM BRT across Brazil.',
  },
  {
    code: 'au',
    name: 'Australia',
    shortLabel: 'Australia',
    zone: 'Oceania',
    currency: 'AUD',
    storeLocaleNote: 'Configured for Australian (AU) digital storefront accounts in AUD.',
    releaseWindowNote: 'Early timezone rolling unlock at 12:00 AM AEDT.',
  },
  {
    code: 'jp',
    name: 'Japan',
    shortLabel: 'Japan',
    zone: 'Asia-Pacific',
    currency: 'JPY',
    storeLocaleNote: 'Compatible with Japanese (JP) regional storefront accounts billed in JPY.',
    releaseWindowNote: 'Unlocks at 12:00 AM JST for Japan console libraries.',
  },
  {
    code: 'mx',
    name: 'Mexico',
    shortLabel: 'Mexico',
    zone: 'Latin America',
    currency: 'MXN',
    storeLocaleNote: 'Valid for Mexican (MX) storefront accounts configured in MXN.',
    releaseWindowNote: 'Unlocks at 12:00 AM CST/ET regional launch schedule.',
  },
  {
    code: 'ae',
    name: 'United Arab Emirates',
    shortLabel: 'UAE',
    zone: 'MENA',
    currency: 'AED',
    storeLocaleNote: 'Matched to UAE (AE) regional console accounts billed in AED.',
    releaseWindowNote: 'Unlocks at 12:00 AM GST across the UAE storefront.',
  },
  {
    code: 'pl',
    name: 'Poland',
    shortLabel: 'Poland',
    zone: 'Central Europe',
    currency: 'PLN',
    storeLocaleNote: 'Configured for Polish (PL) regional storefront accounts using PLN.',
    releaseWindowNote: 'Unlocks at 12:00 AM CET across Poland.',
  },
  {
    code: 'nl',
    name: 'Netherlands',
    shortLabel: 'Netherlands',
    zone: 'Benelux',
    currency: 'EUR',
    storeLocaleNote: 'Valid on Netherlands (NL) storefront accounts using EUR billing.',
    releaseWindowNote: 'Unlocks at 12:00 AM CET in the Netherlands.',
  },
  {
    code: 'se',
    name: 'Sweden',
    shortLabel: 'Sweden',
    zone: 'Nordics',
    currency: 'SEK',
    storeLocaleNote: 'Matched to Swedish (SE) storefront accounts configured in SEK.',
    releaseWindowNote: 'Unlocks at 12:00 AM CET across Nordic storefronts.',
  },
  {
    code: 'ch',
    name: 'Switzerland',
    shortLabel: 'Switzerland',
    zone: 'DACH / Europe',
    currency: 'CHF',
    storeLocaleNote: 'Valid for Swiss (CH) storefront accounts operating in CHF.',
    releaseWindowNote: 'Unlocks at 12:00 AM CET across Switzerland.',
  },
  {
    code: 'kr',
    name: 'South Korea',
    shortLabel: 'South Korea',
    zone: 'Asia-Pacific',
    currency: 'KRW',
    storeLocaleNote: 'Configured for South Korean (KR) console accounts billed in KRW.',
    releaseWindowNote: 'Unlocks at 12:00 AM KST in South Korea.',
  },
  {
    code: 'sa',
    name: 'Saudi Arabia',
    shortLabel: 'Saudi Arabia',
    zone: 'MENA',
    currency: 'SAR',
    storeLocaleNote: 'Compatible with Saudi Arabia (SA) regional accounts configured in SAR.',
    releaseWindowNote: 'Unlocks at 12:00 AM AST across Saudi Arabia.',
  },
  {
    code: 'global',
    name: 'Global / Worldwide',
    shortLabel: 'Global',
    zone: 'Worldwide',
    currency: 'Multi-Currency',
    storeLocaleNote:
      'Designed for international console storefronts with region-verification routing.',
    releaseWindowNote: 'Follows your console account local midnight unlock window.',
  },
];

export const PSEO_EDITIONS: PseoEditionSpec[] = [
  {
    id: 'standard',
    name: 'Standard Edition',
    shortName: 'Standard',
    badge: 'Base Game',
    summary:
      'Full Grand Theft Auto VI base game digital license covering Vice City and the entire State of Leonida.',
    inclusions: [
      'Complete Lucia & Jason story campaign across Vice City and Leonida',
      'Permanent digital library ownership with cloud save sync',
      'Day-one patch and pre-load eligibility prior to launch',
    ],
    preloadEligible: true,
  },
  {
    id: 'deluxe',
    name: 'Vice City Deluxe Edition',
    shortName: 'Deluxe',
    badge: 'Popular Tier',
    summary:
      'Upgraded digital package combining the base game with Vintage Vice City custom vehicles, wardrobe sets, and early starter gear.',
    inclusions: [
      'Full Grand Theft Auto VI digital game license',
      'Vintage Vice City Pack: retro vehicles, apparel, and weapon finishes',
      'Day-one bonus currency & priority pre-load access',
    ],
    preloadEligible: true,
  },
  {
    id: 'ultimate',
    name: 'Leonida Ultimate Edition',
    shortName: 'Ultimate',
    badge: 'Complete Pack',
    summary:
      'Comprehensive digital tier featuring all Deluxe content, exclusive Leonida outfits, custom performance cars, and launch bonuses.',
    inclusions: [
      'Full Grand Theft Auto VI base game + all Vice City Deluxe items',
      'Exclusive Leonida Syndicate vehicle liveries and safe-house perks',
      'Priority pre-load access and post-launch digital bonus drops',
    ],
    preloadEligible: true,
  },
  {
    id: 'preload',
    name: 'Pre-Load Digital Key',
    shortName: 'Pre-Load',
    badge: 'Early Download',
    summary:
      'Early digital entitlement allowing players to download encrypted console installation files days ahead of release.',
    inclusions: [
      'Instant storefront library attachment upon code redemption',
      'Pre-release full-game SSD installation ahead of November 19, 2026',
      'Zero-wait automatic unlock at regional midnight release',
    ],
    preloadEligible: true,
  },
  {
    id: 'collector',
    name: "Collector's Digital Key",
    shortName: "Collector's",
    badge: 'Archive Tier',
    summary:
      'Full digital collector package pairing the Ultimate Edition game license with digital soundtrack and Vice City artwork perks.',
    inclusions: [
      'Full Grand Theft Auto VI Ultimate digital edition entitlement',
      'Digital Leonida Radio Soundtrack & Art Book companion download',
      'Exclusive collector profile cosmetics and launch-day pre-load',
    ],
    preloadEligible: true,
  },
];

export const PSEO_INTENTS: PseoIntentSpec[] = [
  {
    id: 'core',
    slugSuffix: '',
    label: 'Digital Key',
    headlineSuffix: 'Digital Key',
    descriptionAngle:
      'Direct digital key specs, storefront redemption walkthrough, and verification claim terminal',
    guidanceTitle: 'Regional Storefront Compatibility & Activation',
    guidanceBody:
      'Verify your console account region before claiming so your digital license binds smoothly without storefront currency mismatches. Once redeemed, the title remains tied to your account library permanently.',
    sitemapPriority: '0.9',
  },
  {
    id: 'redeem-code',
    slugSuffix: 'redeem-code',
    label: 'Redeem Code',
    headlineSuffix: 'Redeem Code Guide',
    descriptionAngle:
      'Step-by-step console and web store code redemption instructions plus verified code claim access',
    guidanceTitle: 'Fast Console & Web Redemption Checklist',
    guidanceBody:
      'Redeem codes can be entered directly through your console storefront menu or through the official mobile/web portal while signed in. Keep auto-downloads enabled in console rest mode to begin pre-loading automatically.',
    sitemapPriority: '0.7',
  },
  {
    id: 'store-voucher',
    slugSuffix: 'store-voucher',
    label: 'Store Voucher',
    headlineSuffix: 'Store Voucher',
    descriptionAngle:
      'Official digital store voucher character format, account validation rules, and instant unlock access',
    guidanceTitle: 'Voucher Format & Validation Details',
    guidanceBody:
      'First-party console vouchers follow strict character groupings and exclude ambiguous characters. Double-check your storefront country settings before applying the voucher so regional digital rights activate cleanly.',
    sitemapPriority: '0.7',
  },
  {
    id: 'download-key',
    slugSuffix: 'download-key',
    label: 'Download Key',
    headlineSuffix: 'Digital Download Key',
    descriptionAngle:
      'Full SSD storage preparation, digital download license details, and pre-load key claim access',
    guidanceTitle: 'SSD Storage & Digital Download Preparation',
    guidanceBody:
      'Grand Theft Auto VI utilizes high-speed NVMe asset streaming across Vice City and the Leonida Keys. Ensure sufficient internal SSD capacity is free prior to activating your digital download key for smooth installation.',
    sitemapPriority: '0.7',
  },
  {
    id: 'gift-code',
    slugSuffix: 'gift-code',
    label: 'Gift Code',
    headlineSuffix: 'Digital Gift Code',
    descriptionAngle:
      'Digital gift code compatibility, recipient account region checklist, and instant verification claim',
    guidanceTitle: 'Sharing & Gifting Region Rules',
    guidanceBody:
      'When claiming a digital gift code for a friend or family member, confirm their console account matches the chosen storefront region and currency. Once delivered, the recipient redeems the code directly into their own library.',
    sitemapPriority: '0.6',
  },
];

export function buildPseoSlug(
  platformId: string,
  regionCode: string,
  editionId: string,
  intentSuffix = ''
): string {
  const base = `${platformId}-${regionCode}-${editionId}`;
  return intentSuffix ? `${base}-${intentSuffix}` : base;
}

function buildPageFaqs(
  platform: PseoPlatformSpec,
  region: PseoRegionSpec,
  edition: PseoEditionSpec,
  intent: PseoIntentSpec
): FaqAccordionItem[] {
  return [
    {
      id: 'faq-format',
      question: `What format is the GTA 6 ${platform.name} ${edition.shortName} ${intent.label.toLowerCase()} for ${region.name}?`,
      answer: `Allocations for ${platform.name} (${region.name}) use the official ${platform.keyFormatLabel} (${platform.keyPattern}) compatible with ${platform.storefront} accounts configured for ${region.currency}.`,
    },
    {
      id: 'faq-region-lock',
      question: `Will this ${region.shortLabel} GTA 6 ${platform.shortName} key work on my account?`,
      answer: `${region.storeLocaleNote} Make sure your ${platform.accountSystem} country setting matches ${region.name} before redeeming to avoid storefront currency errors.`,
    },
    {
      id: 'faq-edition-included',
      question: `What is included in the ${edition.name} on ${platform.name}?`,
      answer: `${edition.summary} Key highlights include: ${edition.inclusions.join('; ')}.`,
    },
    {
      id: 'faq-preload-timing',
      question: `When does ${region.shortLabel} pre-load and launch unlock begin on ${platform.shortName}?`,
      answer: `Grand Theft Auto VI launches on ${SITE_CONFIG.releaseDateLabel}. ${region.releaseWindowNote} Reserve at least ${platform.storageEstimate} for pre-load files.`,
    },
  ];
}

let cachedPages: PseoKeyPage[] | null = null;
let cachedPageMap: Map<string, PseoKeyPage> | null = null;

function ensureCatalogBuilt(): {
  pages: PseoKeyPage[];
  map: Map<string, PseoKeyPage>;
} {
  if (cachedPages && cachedPageMap) {
    return { pages: cachedPages, map: cachedPageMap };
  }

  const pages: PseoKeyPage[] = [];
  const map = new Map<string, PseoKeyPage>();
  const shots = OFFICIAL_VI_ASSETS.screenshots4k;
  let counter = 0;

  // Generate core tier first (400 highest-priority pages) then intent variants (1,600 pages)
  for (const intent of PSEO_INTENTS) {
    for (const platform of PSEO_PLATFORMS) {
      for (const region of PSEO_REGIONS) {
        for (const edition of PSEO_EDITIONS) {
          const slug = buildPseoSlug(
            platform.id,
            region.code,
            edition.id,
            intent.slugSuffix
          );
          const path = `/keys/${slug}`;
          const shardIndex =
            Math.floor(counter / SITE_CONFIG.sitemapShardSize) + 1;
          const shot = shots[counter % shots.length];
          const dayNum = String((counter % 20) + 1).padStart(2, '0');

          const title = `GTA 6 ${platform.name} ${edition.name} — ${region.name} ${intent.headlineSuffix}`;
          const metaTitle = `GTA 6 ${platform.shortName} ${edition.shortName} ${intent.label} (${region.shortLabel})`;
          const metaDescription = `${intent.descriptionAngle} for Grand Theft Auto VI ${edition.name} on ${platform.name} (${region.name} · ${platform.keyFormatLabel}).`;
          const heroSubtitle = `Claim and redeem your Grand Theft Auto VI ${edition.name} on ${platform.name} for the ${region.name} ${platform.storefront} (${region.currency}). ${platform.hardwareTier}.`;

          const entry: PseoKeyPage = {
            slug,
            path,
            platform,
            region,
            edition,
            intent,
            title,
            metaTitle,
            metaDescription,
            heroSubtitle,
            imageUrl: shot.url,
            lastmod: `2026-11-${dayNum}`,
            priority: intent.sitemapPriority,
            shardIndex,
            faqs: buildPageFaqs(platform, region, edition, intent),
          };

          pages.push(entry);
          map.set(slug, entry);
          counter += 1;
        }
      }
    }
  }

  cachedPages = pages;
  cachedPageMap = map;
  return { pages, map };
}

export function getAllPseoKeyPages(): PseoKeyPage[] {
  return ensureCatalogBuilt().pages;
}

export function getAllPseoSlugs(): string[] {
  return ensureCatalogBuilt().pages.map((p) => p.slug);
}

export function getPseoKeyPageBySlug(slug: string): PseoKeyPage | undefined {
  return ensureCatalogBuilt().map.get(slug);
}

export function getPseoTotalCount(): number {
  return (
    PSEO_PLATFORMS.length *
    PSEO_REGIONS.length *
    PSEO_EDITIONS.length *
    PSEO_INTENTS.length
  );
}

export interface RelatedPseoLinkGroup {
  sameRegionPlatforms: PseoKeyPage[];
  samePlatformEditions: PseoKeyPage[];
  intentVariants: PseoKeyPage[];
  nearbyRegions: PseoKeyPage[];
}

/**
 * O(1) deterministic internal linking graph so all 2,000 pages are interconnected
 * with zero orphan URLs and fast static generation.
 */
export function getRelatedPseoPages(page: PseoKeyPage): RelatedPseoLinkGroup {
  const { map } = ensureCatalogBuilt();

  const sameRegionPlatforms: PseoKeyPage[] = [];
  for (const p of PSEO_PLATFORMS) {
    if (p.id === page.platform.id) continue;
    const target = map.get(
      buildPseoSlug(p.id, page.region.code, page.edition.id, page.intent.slugSuffix)
    );
    if (target) sameRegionPlatforms.push(target);
  }

  const samePlatformEditions: PseoKeyPage[] = [];
  for (const ed of PSEO_EDITIONS) {
    if (ed.id === page.edition.id) continue;
    const target = map.get(
      buildPseoSlug(page.platform.id, page.region.code, ed.id, page.intent.slugSuffix)
    );
    if (target) samePlatformEditions.push(target);
  }

  const intentVariants: PseoKeyPage[] = [];
  for (const intent of PSEO_INTENTS) {
    if (intent.id === page.intent.id) continue;
    const target = map.get(
      buildPseoSlug(page.platform.id, page.region.code, page.edition.id, intent.slugSuffix)
    );
    if (target) intentVariants.push(target);
  }

  const nearbyRegions: PseoKeyPage[] = [];
  const currentRegionIndex = PSEO_REGIONS.findIndex(
    (r) => r.code === page.region.code
  );
  const regionCount = PSEO_REGIONS.length;
  for (let offset = 1; offset <= 6; offset += 1) {
    const nextRegion = PSEO_REGIONS[(currentRegionIndex + offset) % regionCount];
    const target = map.get(
      buildPseoSlug(
        page.platform.id,
        nextRegion.code,
        page.edition.id,
        page.intent.slugSuffix
      )
    );
    if (target) nearbyRegions.push(target);
  }

  return {
    sameRegionPlatforms,
    samePlatformEditions,
    intentVariants,
    nearbyRegions,
  };
}