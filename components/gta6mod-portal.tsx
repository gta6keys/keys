import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  FileCode,
  Globe,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { OFFICIAL_VI_ASSETS } from '@/lib/mods-repository';
import { SITE_CONFIG } from '@/lib/site-config';
import { withBasePath } from '@/lib/utils';
import {
  KeyClaimTerminal,
  PlayStationEmblem,
  XboxEmblem,
} from './key-claim-terminal';
import { FaqAccordion, type FaqAccordionItem } from './faq-accordion';

const HOME_FAQ_ITEMS: FaqAccordionItem[] = [
  {
    id: 'faq-claim-process',
    question: 'How do I claim a GTA 6 digital key for PS5 or Xbox Series X|S?',
    answer:
      'Choose your console platform (PlayStation 5, PS5 Pro, Xbox Series X, or Xbox Series S), select your storefront region and preferred edition in the claim terminal above, then click "Claim Digital Code". Completing the short human verification check unlocks your console-formatted digital voucher.',
  },
  {
    id: 'faq-supported-platforms',
    question: 'Which console storefronts and code formats are supported?',
    answer:
      'PlayStation 5 and PS5 Pro allocations are delivered in the official 12-character PlayStation Store voucher format (XXXX-XXXX-XXXX). Xbox Series X and Xbox Series S allocations are delivered in the 25-character Microsoft Store digital key format (XXXXX-XXXXX-XXXXX-XXXXX-XXXXX). Last-generation consoles are not supported.',
  },
  {
    id: 'faq-verification-step',
    question: 'Why is human verification required before revealing the code?',
    answer:
      'Automated scripts and key scrapers continuously target high-demand release pages. A quick single-session verification check confirms you are a real player and protects active PS5 and Xbox key allocations from automated exhaustion.',
  },
  {
    id: 'faq-region-compatibility',
    question: 'Do I need to match my PlayStation or Xbox account region?',
    answer:
      'Yes. Both PlayStation Network and Microsoft Store apply regional currency rules to digital keys. Select the storefront matching your console account—such as United States, United Kingdom, Europe (EU), Canada, Germany, France, Brazil, Australia, or Global—or open our full regional directory for country-specific guides.',
  },
  {
    id: 'faq-preload-redemption',
    question: 'How do pre-load and launch edition digital keys work?',
    answer:
      'Once redeemed in the PlayStation Store or Microsoft Store, the digital license attaches permanently to your console library. Eligible editions support pre-load downloads ahead of the November 19, 2026 launch window so the game files are ready on day one.',
  },
  {
    id: 'faq-crawlers-sitemap',
    question: 'Where can I browse all regional key editions and the XML sitemap?',
    answer:
      'Visit our dedicated Keys Directory at /keys/ to filter all PlayStation 5 and Xbox Series X|S regional editions, or inspect our sharded XML sitemap index at /sitemap.xml alongside crawler directives in /robots.txt.',
  },
];

const FEATURED_KEY_ROUTES = [
  {
    slug: 'ps5-us-standard',
    title: 'PS5 Standard Edition — USA',
    platform: 'PlayStation 5',
    format: '12-Digit PSN',
    region: 'United States',
  },
  {
    slug: 'xbox-series-x-us-standard',
    title: 'Xbox Series X Standard — USA',
    platform: 'Xbox Series X',
    format: '25-Char Key',
    region: 'United States',
  },
  {
    slug: 'ps5-uk-deluxe',
    title: 'PS5 Vice City Deluxe — UK',
    platform: 'PlayStation 5',
    format: '12-Digit PSN',
    region: 'United Kingdom',
  },
  {
    slug: 'ps5-eu-ultimate',
    title: 'PS5 Leonida Ultimate — Europe',
    platform: 'PlayStation 5',
    format: '12-Digit PSN',
    region: 'Europe (EU)',
  },
  {
    slug: 'ps5-pro-us-ultimate',
    title: 'PS5 Pro Ultimate Edition — USA',
    platform: 'PS5 Pro',
    format: '12-Digit PSN',
    region: 'United States',
  },
  {
    slug: 'xbox-series-s-global-standard',
    title: 'Xbox Series S Standard — Global',
    platform: 'Xbox Series S',
    format: '25-Char Key',
    region: 'Global',
  },
  {
    slug: 'ps5-ca-standard',
    title: 'PS5 Standard Edition — Canada',
    platform: 'PlayStation 5',
    format: '12-Digit PSN',
    region: 'Canada',
  },
  {
    slug: 'xbox-series-x-uk-ultimate',
    title: 'Xbox Series X Ultimate — UK',
    platform: 'Xbox Series X',
    format: '25-Char Key',
    region: 'United Kingdom',
  },
  {
    slug: 'ps5-de-standard',
    title: 'PS5 Standard Edition — Germany',
    platform: 'PlayStation 5',
    format: '12-Digit PSN',
    region: 'Germany',
  },
  {
    slug: 'ps5-fr-standard',
    title: 'PS5 Standard Edition — France',
    platform: 'PlayStation 5',
    format: '12-Digit PSN',
    region: 'France',
  },
  {
    slug: 'ps5-br-standard',
    title: 'PS5 Standard Edition — Brazil',
    platform: 'PlayStation 5',
    format: '12-Digit PSN',
    region: 'Brazil',
  },
  {
    slug: 'ps5-global-preload',
    title: 'PS5 Pre-Load Digital Key — Global',
    platform: 'PlayStation 5',
    format: '12-Digit PSN',
    region: 'Global',
  },
];

const SHOWCASE_CAPTURES = [
  OFFICIAL_VI_ASSETS.screenshots4k[0],
  OFFICIAL_VI_ASSETS.screenshots4k[2],
  OFFICIAL_VI_ASSETS.screenshots4k[4],
];

export function Gta6modPortal() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen site-ambient-bg text-[#f3f4f6] flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Refined Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#08090D]/80 backdrop-blur-xl border-b border-white/[0.07]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#F43F7E] to-[#F59E0B] text-white font-display font-bold text-sm tracking-tight shadow-sm">
              VI
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              {SITE_CONFIG.name}
            </span>
          </Link>

          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300"
          >
            <a href="#claim-code" className="hover:text-white transition-colors">
              Claim Key
            </a>
            <Link href="/keys" className="hover:text-white transition-colors">
              Keys Directory
            </Link>
            <a href="#how-to-redeem" className="hover:text-white transition-colors">
              How to Redeem
            </a>
            <Link href="/official-media" className="hover:text-white transition-colors">
              4K Gallery
            </Link>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/keys"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
              <span>All Regions</span>
            </Link>
            <a
              href="#claim-code"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#F43F7E] hover:bg-[#e11d63] transition-colors"
            >
              <span>Claim Code</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO: Editorial Claim Experience + Studio-Lit GTA VI Cover */}
        <section
          id="claim-code"
          aria-labelledby="hero-heading"
          className="pt-10 pb-16 sm:pt-16 sm:pb-24 px-4 sm:px-6"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 7 Columns: Copy + Interactive Claim Terminal */}
            <div className="lg:col-span-7 space-y-7">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.09] text-xs font-medium text-slate-200">
                  <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" aria-hidden="true" />
                  <span>
                    Vice City &amp; Leonida Digital Storefront · {SITE_CONFIG.releaseDateLabel}
                  </span>
                </div>

                <h1
                  id="hero-heading"
                  className="font-display text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.06]"
                >
                  Grand Theft Auto VI{' '}
                  <span className="vice-text-gradient">Digital Keys</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                  Configure your PlayStation 5 or Xbox Series X|S console edition,
                  match your regional storefront format, and unlock your digital
                  redemption code.
                </p>
              </div>

              <div className="editorial-surface rounded-2xl p-5 sm:p-7">
                <KeyClaimTerminal
                  defaultPlatform="ps5"
                  defaultRegionCode="us"
                  defaultEditionId="standard"
                />
              </div>
            </div>

            {/* Right 5 Columns: Studio-Framed Cover Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-[380px] space-y-4">
                <div className="relative">
                  {/* Soft Ambient Studio Backlight */}
                  <div
                    aria-hidden="true"
                    className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#F43F7E]/25 via-[#8B5CF6]/15 to-[#F59E0B]/20 blur-2xl opacity-75 pointer-events-none"
                  />

                  <div className="cover-stage-float relative rounded-2xl overflow-hidden bg-[#10121A] border border-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] aspect-[3/4]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={withBasePath(OFFICIAL_VI_ASSETS.heroPoster)}
                      alt="Grand Theft Auto VI Vice City Digital Edition Cover Art"
                      width={600}
                      height={800}
                      fetchPriority="high"
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Subtle Cinematic Vignette */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-[#08090D]/20 to-black/35"
                    />

                    {/* Minimal Top Console Chips */}
                    <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/10 text-[11px] font-medium text-white">
                        <PlayStationEmblem className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>PS5</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/10 text-[11px] font-medium text-white">
                        <XboxEmblem className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Xbox Series X|S</span>
                      </span>
                    </div>

                    {/* Official VI Emblem */}
                    <div className="absolute inset-0 flex items-center justify-center p-10 pointer-events-none">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={withBasePath(OFFICIAL_VI_ASSETS.logoVi)}
                        alt="Grand Theft Auto VI Official Emblem"
                        className="w-3/4 h-auto object-contain drop-shadow-[0_14px_32px_rgba(0,0,0,0.7)]"
                      />
                    </div>

                    {/* Bottom Clean Caption */}
                    <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between gap-3">
                      <div>
                        <div className="text-[11px] font-medium text-slate-300">
                          Console Digital Edition
                        </div>
                        <div className="font-display text-lg font-bold text-white leading-tight">
                          Grand Theft Auto VI
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15 font-mono text-[11px] text-white">
                        4K UHD
                      </span>
                    </div>
                  </div>
                </div>

                {/* Clean Technical Specs Strip */}
                <div className="grid grid-cols-3 rounded-xl bg-[#10121A] border border-white/[0.08] divide-x divide-white/[0.07] text-center">
                  <div className="py-3 px-2">
                    <div className="text-[11px] text-slate-400">Launch</div>
                    <div className="text-xs font-semibold text-white mt-0.5">
                      Nov 2026
                    </div>
                  </div>
                  <div className="py-3 px-2">
                    <div className="text-[11px] text-slate-400">Delivery</div>
                    <div className="text-xs font-semibold text-white mt-0.5">
                      Digital Key
                    </div>
                  </div>
                  <div className="py-3 px-2">
                    <div className="text-[11px] text-slate-400">Regions</div>
                    <div className="text-xs font-semibold text-emerald-400 mt-0.5">
                      20+ Stores
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Console Redemption Guides */}
        <section
          id="how-to-redeem"
          aria-labelledby="redeem-heading"
          className="py-16 sm:py-20 px-4 sm:px-6 border-t border-white/[0.06] bg-[#0B0D14]/60"
        >
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#F43F7E] mb-2">
                Storefront Activation Guide
              </p>
              <h2
                id="redeem-heading"
                className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white"
              >
                How to Redeem on PS5 &amp; Xbox Series X|S
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-2.5 leading-relaxed">
                Every digital key matches official first-party console store formats
                for permanent library ownership and pre-load eligibility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PlayStation 5 Guide Card */}
              <div className="rounded-2xl bg-[#10121A] border border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 pb-5 mb-5 border-b border-white/[0.07]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#0070D1]/20 border border-[#0070D1]/40 text-[#38BDF8] flex items-center justify-center">
                        <PlayStationEmblem className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-white">
                          PlayStation 5 &amp; PS5 Pro
                        </h3>
                        <p className="text-xs text-slate-400">
                          PlayStation Store · 12-Character Voucher
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-slate-300 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-md">
                      XXXX-XXXX-XXXX
                    </span>
                  </div>

                  <ol className="space-y-3.5 text-sm text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-white/[0.06] text-xs font-semibold text-white flex items-center justify-center shrink-0 mt-0.5">
                        1
                      </span>
                      <span>
                        Open the <strong className="text-white">PlayStation Store</strong> from
                        your PS5 home screen and select the menu icon in the top-right bar.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-white/[0.06] text-xs font-semibold text-white flex items-center justify-center shrink-0 mt-0.5">
                        2
                      </span>
                      <span>
                        Choose <strong className="text-white">Redeem Code</strong> and enter your
                        12-character regional PSN voucher carefully without extra spaces.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-white/[0.06] text-xs font-semibold text-white flex items-center justify-center shrink-0 mt-0.5">
                        3
                      </span>
                      <span>
                        Confirm activation to bind <strong className="text-white">Grand Theft Auto VI</strong>{' '}
                        to your PSN library and enable automatic console pre-load.
                      </span>
                    </li>
                  </ol>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.07] flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8]" aria-hidden="true" />
                    <span>Supports DualSense adaptive triggers &amp; 3D Audio</span>
                  </span>
                  <Link
                    href="/keys/ps5-us-standard"
                    className="text-[#F43F7E] hover:underline font-medium shrink-0 ml-2"
                  >
                    PS5 Guide →
                  </Link>
                </div>
              </div>

              {/* Xbox Series X|S Guide Card */}
              <div className="rounded-2xl bg-[#10121A] border border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 pb-5 mb-5 border-b border-white/[0.07]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#107C10]/20 border border-[#107C10]/40 text-emerald-400 flex items-center justify-center">
                        <XboxEmblem className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-white">
                          Xbox Series X &amp; Series S
                        </h3>
                        <p className="text-xs text-slate-400">
                          Microsoft Store · 25-Character Key
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-slate-300 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-md">
                      5×5 Key Format
                    </span>
                  </div>

                  <ol className="space-y-3.5 text-sm text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-white/[0.06] text-xs font-semibold text-white flex items-center justify-center shrink-0 mt-0.5">
                        1
                      </span>
                      <span>
                        Press the <strong className="text-white">Xbox button</strong> on your
                        controller and launch the <strong className="text-white">Store</strong> app
                        or visit redeem.microsoft.com.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-white/[0.06] text-xs font-semibold text-white flex items-center justify-center shrink-0 mt-0.5">
                        2
                      </span>
                      <span>
                        Open the left sidebar, select <strong className="text-white">Redeem</strong>,
                        and enter your 25-character Microsoft Store key.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-white/[0.06] text-xs font-semibold text-white flex items-center justify-center shrink-0 mt-0.5">
                        3
                      </span>
                      <span>
                        Confirm ownership to add <strong className="text-white">Grand Theft Auto VI</strong>{' '}
                        to My Games &amp; Apps with Smart Delivery optimization.
                      </span>
                    </li>
                  </ol>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.07] flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    <span>Works across Series X &amp; digital-only Series S</span>
                  </span>
                  <Link
                    href="/keys/xbox-series-x-us-standard"
                    className="text-[#F43F7E] hover:underline font-medium shrink-0 ml-2"
                  >
                    Xbox Guide →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Popular Regional & Edition Keys (Crawl Hub for pSEO Pages) */}
        <section
          aria-labelledby="directory-heading"
          className="py-16 sm:py-20 px-4 sm:px-6 border-t border-white/[0.06]"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#F59E0B] mb-2">
                  Regional Storefront Index
                </p>
                <h2
                  id="directory-heading"
                  className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white"
                >
                  Popular Platform &amp; Region Digital Keys
                </h2>
                <p className="text-sm sm:text-base text-slate-300 mt-2.5 leading-relaxed">
                  Jump directly to country-specific PlayStation 5 and Xbox Series X|S
                  edition pages with local currency specs and redemption steps.
                </p>
              </div>

              <Link
                href="/keys"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] transition-colors shrink-0"
              >
                <Compass className="w-4 h-4 text-[#F43F7E]" aria-hidden="true" />
                <span>Browse All 2,000+ Keys</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURED_KEY_ROUTES.map((item) => (
                <Link
                  key={item.slug}
                  href={`/keys/${item.slug}`}
                  className="group rounded-xl bg-[#10121A] hover:bg-[#151824] border border-white/[0.08] hover:border-white/[0.18] p-4 sm:p-5 transition-all flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-slate-400 mb-2">
                      <span>{item.platform}</span>
                      <span className="text-slate-500">{item.format}</span>
                    </div>
                    <h3 className="font-display text-base font-semibold text-white group-hover:text-[#F43F7E] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs text-slate-400">
                    <span>{item.region}</span>
                    <span className="inline-flex items-center gap-1 text-slate-200 font-medium group-hover:translate-x-0.5 transition-transform">
                      <span>Open</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#F43F7E]" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: Official Leonida Media Preview */}
        <section
          aria-labelledby="media-heading"
          className="py-16 sm:py-20 px-4 sm:px-6 border-t border-white/[0.06] bg-[#0B0D14]/60"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  State of Leonida · 4K Reference
                </p>
                <h2
                  id="media-heading"
                  className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white"
                >
                  Vice City Launch Gallery &amp; Community Archive
                </h2>
              </div>

              <div className="flex items-center gap-3 text-xs font-medium">
                <Link
                  href="/official-media"
                  className="text-slate-200 hover:text-white transition-colors"
                >
                  4K Gallery →
                </Link>
                <span className="text-slate-600">·</span>
                <Link
                  href="/mods"
                  className="text-slate-200 hover:text-white transition-colors"
                >
                  Mods Archive →
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SHOWCASE_CAPTURES.map((shot) => (
                <Link
                  key={shot.id}
                  href="/official-media"
                  className="group rounded-2xl overflow-hidden bg-[#10121A] border border-white/[0.08] hover:border-white/[0.18] transition-all"
                >
                  <div className="relative aspect-video overflow-hidden bg-[#08090D]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={withBasePath(shot.url)}
                      alt={shot.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[11px] font-medium text-[#F59E0B]">
                        {shot.category}
                      </div>
                      <div className="text-sm font-semibold text-white truncate mt-0.5">
                        {shot.title}
                      </div>
                    </div>
                    <ArrowUpRight
                      className="w-4 h-4 text-slate-500 group-hover:text-white shrink-0 transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: Structured SEO FAQ */}
        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="py-16 sm:py-20 px-4 sm:px-6 border-t border-white/[0.06]"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#F43F7E] mb-2">
                  Support &amp; Verification
                </p>
                <h2
                  id="faq-heading"
                  className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white"
                >
                  Frequently Asked Questions
                </h2>
              </div>

              <a
                href={withBasePath('/sitemap.xml')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
              >
                <FileCode className="w-3.5 h-3.5 text-[#F43F7E]" aria-hidden="true" />
                <span>sitemap.xml</span>
              </a>
            </div>

            <FaqAccordion items={HOME_FAQ_ITEMS} defaultOpenId={HOME_FAQ_ITEMS[0].id} />
          </div>
        </section>
      </main>

      {/* Clean Multi-Column Institutional Footer */}
      <footer className="border-t border-white/[0.07] bg-[#07080C] text-slate-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/[0.06]">
            <div className="md:col-span-5 space-y-3">
              <Link href="/" className="inline-flex items-center gap-2.5">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-[#F43F7E] to-[#F59E0B] text-white font-display font-bold text-xs">
                  VI
                </span>
                <span className="font-display text-lg font-bold text-white">
                  {SITE_CONFIG.name}
                </span>
              </Link>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                Independent Grand Theft Auto VI digital key directory, regional
                console redemption guides, and community media archive for PS5 and
                Xbox Series X|S.
              </p>
            </div>

            <div className="md:col-span-3 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-white">
                Digital Keys
              </div>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="/keys" className="hover:text-white transition-colors">
                    All Regional Keys
                  </Link>
                </li>
                <li>
                  <Link href="/keys/ps5-us-standard" className="hover:text-white transition-colors">
                    PS5 Digital Keys
                  </Link>
                </li>
                <li>
                  <Link
                    href="/keys/xbox-series-x-us-standard"
                    className="hover:text-white transition-colors"
                  >
                    Xbox Series X|S Keys
                  </Link>
                </li>
                <li>
                  <Link href="/keys/ps5-global-preload" className="hover:text-white transition-colors">
                    Pre-Load Access
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-white">
                Archive
              </div>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="/official-media" className="hover:text-white transition-colors">
                    4K Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/mods" className="hover:text-white transition-colors">
                    Mods Directory
                  </Link>
                </li>
                <li>
                  <Link href="/gameplay" className="hover:text-white transition-colors">
                    Gameplay
                  </Link>
                </li>
                <li>
                  <Link href="/credits" className="hover:text-white transition-colors">
                    Credits
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-white">
                Crawlers
              </div>
              <ul className="space-y-2 text-xs sm:text-sm font-mono">
                <li>
                  <Link href="/sitemap-explorer" className="hover:text-white transition-colors">
                    Inspector
                  </Link>
                </li>
                <li>
                  <a
                    href={withBasePath('/sitemap.xml')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F43F7E] hover:underline"
                  >
                    /sitemap.xml
                  </a>
                </li>
                <li>
                  <a
                    href={withBasePath('/robots.txt')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    /robots.txt
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-start gap-2.5 max-w-3xl">
              <ShieldCheck
                className="w-4 h-4 text-slate-400 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="leading-relaxed">
                Independent fan and digital key guide platform. Not affiliated with,
                endorsed by, or connected to Rockstar Games, Take-Two Interactive,
                Sony Interactive Entertainment, or Microsoft Xbox.
              </p>
            </div>
            <span className="font-mono shrink-0">© 2026 {SITE_CONFIG.name}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const Gta6keysPortal = Gta6modPortal;
export default Gta6modPortal;