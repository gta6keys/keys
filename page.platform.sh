import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Cpu,
  FileCode,
  Globe,
  HardDrive,
  KeyRound,
  ShieldCheck,
} from 'lucide-react';
import {
  getAllPseoSlugs,
  getPseoKeyPageBySlug,
  getRelatedPseoPages,
} from '@/lib/pseo-catalog';
import {
  SITE_CONFIG,
  buildAssetUrl,
  buildCanonicalUrl,
} from '@/lib/site-config';
import { withBasePath } from '@/lib/utils';
import { KeyClaimTerminal } from '@/components/key-claim-terminal';
import { FaqAccordion } from '@/components/faq-accordion';

export const dynamicParams = false;

interface KeyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPseoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: KeyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPseoKeyPageBySlug(slug);

  if (!page) {
    return {
      title: 'Digital Key Not Found',
      robots: { index: false, follow: false },
    };
  }

  const canonical = buildCanonicalUrl(page.path);
  const ogImage = buildAssetUrl(page.imageUrl);

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: [
      `GTA 6 ${page.platform.shortName} ${page.region.shortLabel}`,
      `GTA 6 ${page.edition.name} ${page.platform.name}`,
      `Grand Theft Auto VI ${page.intent.label} ${page.region.name}`,
      `${page.platform.storefront} ${page.region.currency} GTA 6`,
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${page.metaTitle} | ${SITE_CONFIG.name}`,
      description: page.metaDescription,
      url: canonical,
      type: 'article',
      images: [
        {
          url: ogImage,
          width: 1920,
          height: 1080,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.metaTitle} | ${SITE_CONFIG.name}`,
      description: page.metaDescription,
      images: [ogImage],
    },
  };
}

export default async function KeyDetailPage({ params }: KeyDetailPageProps) {
  const { slug } = await params;
  const page = getPseoKeyPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const related = getRelatedPseoPages(page);
  const canonicalUrl = buildCanonicalUrl(page.path);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: buildCanonicalUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'GTA 6 Digital Keys',
            item: buildCanonicalUrl('/keys/'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: page.metaTitle,
            item: canonicalUrl,
          },
        ],
      },
      {
        '@type': 'VideoGame',
        name: `Grand Theft Auto VI — ${page.edition.name}`,
        gamePlatform: page.platform.name,
        applicationCategory: 'Game',
        operatingSystem: page.platform.name,
        datePublished: SITE_CONFIG.releaseDateIso,
        url: canonicalUrl,
        image: buildAssetUrl(page.imageUrl),
        description: page.metaDescription,
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen site-ambient-bg text-[#f3f4f6] flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#08090D]/80 backdrop-blur-xl border-b border-white/[0.07]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#F43F7E] to-[#F59E0B] text-white font-display font-bold text-sm">
              VI
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              {SITE_CONFIG.name}
            </span>
          </Link>

          <nav
            aria-label="Key Page Navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/keys" className="hover:text-white transition-colors">
              Keys Directory
            </Link>
            <a href="#redemption-steps" className="hover:text-white transition-colors">
              Redeem Steps
            </a>
            <a href="#key-faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          <Link
            href="/keys"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.09] transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>All Keys</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Breadcrumb & Hero Section */}
        <section className="pt-8 pb-14 sm:pt-12 sm:pb-16 px-4 sm:px-6 border-b border-white/[0.06]">
          <div className="max-w-6xl mx-auto space-y-8">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400"
            >
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
              <Link href="/keys" className="hover:text-white transition-colors">
                Keys Directory
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
              <span className="text-slate-200 truncate">{page.metaTitle}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left 7 Cols: Title + Pre-Configured Claim Terminal */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-[#F43F7E]/15 border border-[#F43F7E]/30 text-[#FBCFE8] font-medium">
                      {page.platform.name}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.09] text-slate-200 font-medium">
                      {page.region.name} ({page.region.currency})
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.09] text-[#F59E0B] font-medium">
                      {page.edition.badge}
                    </span>
                  </div>

                  <h1 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-[1.1]">
                    {page.title}
                  </h1>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {page.heroSubtitle}
                  </p>
                </div>

                <div className="editorial-surface rounded-2xl p-5 sm:p-6">
                  <KeyClaimTerminal
                    defaultPlatform={page.platform.id}
                    defaultRegionCode={page.region.code}
                    defaultEditionId={page.edition.id}
                    regionLabelOverride={page.region.name}
                    editionLabelOverride={page.edition.name}
                    ctaLabel={`Claim ${page.platform.shortName} ${page.intent.label}`}
                  />
                </div>
              </div>

              {/* Right 5 Cols: Visual & Technical Specification Card */}
              <aside className="lg:col-span-5 rounded-2xl overflow-hidden bg-[#10121A] border border-white/[0.08]">
                <div className="relative aspect-[16/10] bg-[#08090D]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={withBasePath(page.imageUrl)}
                    alt={`${page.title} preview visual`}
                    fetchPriority="high"
                    className="w-full h-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#10121A] via-transparent to-black/30"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[11px] text-white">
                    {page.platform.keyFormatLabel}
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-5">
                  <div>
                    <h2 className="font-display text-lg font-bold text-white">
                      Storefront &amp; Technical Specifications
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Verified allocation specs for {page.region.name} ({page.region.zone})
                    </p>
                  </div>

                  <dl className="divide-y divide-white/[0.06] text-xs sm:text-sm">
                    <div className="py-2.5 flex items-center justify-between gap-3">
                      <dt className="text-slate-400 inline-flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                        <span>Storefront</span>
                      </dt>
                      <dd className="text-white font-medium text-right">
                        {page.platform.storefront} ({page.region.shortLabel})
                      </dd>
                    </div>
                    <div className="py-2.5 flex items-center justify-between gap-3">
                      <dt className="text-slate-400 inline-flex items-center gap-2">
                        <KeyRound className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                        <span>Key Format</span>
                      </dt>
                      <dd className="font-mono text-xs text-slate-200 text-right">
                        {page.platform.keyPattern}
                      </dd>
                    </div>
                    <div className="py-2.5 flex items-center justify-between gap-3">
                      <dt className="text-slate-400 inline-flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                        <span>Optimization</span>
                      </dt>
                      <dd className="text-slate-200 text-right">
                        {page.platform.hardwareTier}
                      </dd>
                    </div>
                    <div className="py-2.5 flex items-center justify-between gap-3">
                      <dt className="text-slate-400 inline-flex items-center gap-2">
                        <HardDrive className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                        <span>Storage</span>
                      </dt>
                      <dd className="text-slate-200 text-right">
                        {page.platform.storageEstimate}
                      </dd>
                    </div>
                  </dl>

                  <div className="rounded-xl bg-[#0A0C12] border border-white/[0.06] p-4 space-y-2">
                    <div className="text-xs font-semibold text-white">
                      {page.edition.name} Includes:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {page.edition.inclusions.map((inc, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2
                            className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Tailored Redemption & Regional Guide */}
        <section
          id="redemption-steps"
          className="py-14 px-4 sm:px-6 border-b border-white/[0.06] bg-[#0B0D14]/60"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 rounded-2xl bg-[#10121A] border border-white/[0.08] p-6 sm:p-7 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#F43F7E] mb-1.5">
                  {page.platform.storefront} Walkthrough
                </p>
                <h2 className="font-display text-2xl font-bold text-white">
                  How to Activate GTA 6 on {page.platform.name} ({page.region.shortLabel})
                </h2>
              </div>

              <ol className="space-y-4 text-sm text-slate-300">
                {page.platform.redeemSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3.5">
                    <span className="w-6 h-6 rounded-full bg-white/[0.07] text-xs font-semibold text-white flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>

              <p className="text-xs text-slate-400 pt-3 border-t border-white/[0.06]">
                Official web portal: <span className="font-mono text-slate-200">{page.platform.redeemPortalUrl}</span> ·{' '}
                {page.region.releaseWindowNote}
              </p>
            </div>

            <div className="lg:col-span-5 rounded-2xl bg-[#10121A] border border-white/[0.08] p-6 sm:p-7 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#F59E0B] mb-1.5">
                  {page.intent.label} Notes
                </p>
                <h2 className="font-display text-2xl font-bold text-white">
                  {page.intent.guidanceTitle}
                </h2>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {page.intent.guidanceBody}
              </p>

              <div className="rounded-xl bg-[#0A0C12] border border-white/[0.06] p-4 space-y-2 text-xs text-slate-300">
                <div className="font-semibold text-white">
                  {page.platform.name} Hardware Notes
                </div>
                <p className="leading-relaxed">{page.platform.performanceNote}</p>
                <p className="text-slate-400 pt-1">{page.region.storeLocaleNote}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Per-Page FAQ */}
        <section id="key-faq" className="py-14 px-4 sm:px-6 border-b border-white/[0.06]">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#F43F7E] mb-1.5">
                {page.region.shortLabel} · {page.platform.shortName} FAQ
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Questions About This Digital Key
              </h2>
            </div>

            <FaqAccordion items={page.faqs} defaultOpenId={page.faqs[0].id} />
          </div>
        </section>

        {/* Smart Internal Link Mesh (Crawl Connectivity Across Platforms, Editions, Intents & Regions) */}
        <section
          aria-labelledby="related-heading"
          className="py-14 px-4 sm:px-6 bg-[#0B0D14]/60"
        >
          <div className="max-w-6xl mx-auto space-y-8">
            <h2
              id="related-heading"
              className="font-display text-2xl font-bold text-white"
            >
              Related GTA 6 Digital Keys &amp; Regional Options
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Switch Platform */}
              <div className="rounded-2xl bg-[#10121A] border border-white/[0.08] p-5 space-y-3">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-300">
                  Other Consoles ({page.region.shortLabel})
                </h3>
                <ul className="space-y-2">
                  {related.sameRegionPlatforms.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={item.path}
                        className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg bg-[#0A0C12] hover:bg-white/[0.06] border border-white/[0.06] text-xs sm:text-sm text-slate-200 hover:text-white transition-colors"
                      >
                        <span className="truncate">
                          {item.platform.name} · {item.edition.shortName}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#F43F7E] shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Other Editions & Key Guide Types */}
              <div className="rounded-2xl bg-[#10121A] border border-white/[0.08] p-5 space-y-3">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-300">
                  Other Editions &amp; Key Formats
                </h3>
                <ul className="space-y-2">
                  {related.samePlatformEditions.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={item.path}
                        className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg bg-[#0A0C12] hover:bg-white/[0.06] border border-white/[0.06] text-xs sm:text-sm text-slate-200 hover:text-white transition-colors"
                      >
                        <span className="truncate">{item.edition.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                      </Link>
                    </li>
                  ))}
                  {related.intentVariants.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={item.path}
                        className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg bg-[#0A0C12] hover:bg-white/[0.06] border border-white/[0.06] text-xs text-slate-300 hover:text-white transition-colors"
                      >
                        <span className="truncate">
                          {item.platform.shortName} {item.region.shortLabel} {item.intent.label}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nearby Storefront Regions */}
              <div className="rounded-2xl bg-[#10121A] border border-white/[0.08] p-5 space-y-3">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-300">
                  More Regional Storefronts
                </h3>
                <ul className="space-y-2">
                  {related.nearbyRegions.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={item.path}
                        className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg bg-[#0A0C12] hover:bg-white/[0.06] border border-white/[0.06] text-xs sm:text-sm text-slate-200 hover:text-white transition-colors"
                      >
                        <span className="truncate">
                          {item.region.name} ({item.region.currency})
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#F43F7E] shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.07] bg-[#07080C] py-8 px-4 sm:px-6 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
            <span>
              Independent platform not affiliated with Rockstar Games, Take-Two
              Interactive, Sony PlayStation, or Microsoft Xbox.
            </span>
          </div>
          <div className="flex items-center gap-4 font-mono shrink-0">
            <Link href="/keys" className="hover:text-white">
              /keys
            </Link>
            <a
              href={withBasePath('/sitemap.xml')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#F43F7E] hover:underline"
            >
              <FileCode className="w-3.5 h-3.5" aria-hidden="true" />
              <span>/sitemap.xml</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}