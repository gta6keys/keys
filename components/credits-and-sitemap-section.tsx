'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Code2,
  ExternalLink,
  FileCode,
  PlusCircle,
  Search,
  Users,
} from 'lucide-react';
import {
  INITIAL_CREDITS,
  OFFICIAL_VI_ASSETS,
  buildDynamicModAndSitemapObjects,
  validateModSubmission,
} from '@/lib/mods-repository';
import { SITE_CONFIG } from '@/lib/site-config';
import {
  SitemapInspectorState,
  SubmissionMachineState,
  transitionSitemapInspector,
  transitionSubmission,
} from '@/lib/state-machines';
import { useI18n } from './language-provider';
import {
  buildSitemapIndexXml,
  buildUrlSetXml,
  filterSitemapEntries,
  generateCatalogSitemapEntries,
  getSitemapShardsSummary,
} from '@/lib/sitemap-service';
import {
  CreatorCredit,
  ModCategory,
  ModSubmissionInput,
  SitemapEntityType,
  SitemapUrlEntry,
} from '@/lib/types';
import { withBasePath } from '@/lib/utils';
import { SiteFooter } from './site-footer';
import { ContentLockerModal, StartGameModButton } from './content-locker-modal';

interface CreditsAndSitemapSectionProps {
  credits?: CreatorCredit[];
  sitemapEntries?: SitemapUrlEntry[];
  onAddModAndCredit?: (input: ModSubmissionInput) => Promise<void> | void;
  showCredits?: boolean;
  showSitemap?: boolean;
  onJumpToMods?: () => void;
}

const CREDIT_SPECIALTIES: (CreatorCredit['specialty'] | 'All')[] = [
  'All',
  'Shader Architecture',
  'Vehicle Modeling',
  'World & Map Design',
  'Script Hook & API',
  'YouTube Gameplay & Media',
];

const SPECIAL_ACKNOWLEDGMENTS = [
  {
    group: 'RAGE 9 Community Shader Research Group',
    role: 'Volumetric Sky & Path-Traced LUT Calibration',
    note: 'Acknowledged for open documentation of Leonida twilight color-grading curves and wet-asphalt specular response.',
  },
  {
    group: 'Vice City Vehicle Rigging & Physics Collective',
    role: '1980s Supercar & Classic Muscle Chassis Standards',
    note: 'Acknowledged for standardized LOD0–LOD4 deformation meshes and twin-turbo acoustic banks.',
  },
  {
    group: 'Open-Source Sitemap & Crawler Indexing Contributors',
    role: 'Static Multi-Shard XML Sitemap 0.9 Engine',
    note: 'Acknowledged for designing the static 2,000+ page XML shard architecture for Google Search Console.',
  },
  {
    group: 'YouTube GTA 6 Frame-by-Frame Analysis Creators',
    role: '4K 60FPS Trailer & Mod Concept Showcase Feeds',
    note: 'Acknowledged for public gameplay breakdowns, timestamp indexing, and side-by-side shader comparisons.',
  },
];

export function CreditsAndSitemapSection({
  credits: externalCredits,
  sitemapEntries: externalSitemapEntries,
  onAddModAndCredit,
  showCredits = true,
  showSitemap = true,
}: CreditsAndSitemapSectionProps) {
  const { t } = useI18n();
  const [internalCredits, setInternalCredits] =
    useState<CreatorCredit[]>(INITIAL_CREDITS);
  const [internalSitemapEntries, setInternalSitemapEntries] = useState<
    SitemapUrlEntry[]
  >(() => generateCatalogSitemapEntries(SITE_CONFIG.siteUrl, 2000));
  const [lockerOpen, setLockerOpen] = useState(false);

  const credits = externalCredits ?? internalCredits;
  const sitemapEntries = externalSitemapEntries ?? internalSitemapEntries;

  const [selectedSpecialty, setSelectedSpecialty] = useState<
    CreatorCredit['specialty'] | 'All'
  >('All');

  // Mod & Credit Submission Form state
  const [title, setTitle] = useState('');
  const [authorHandle, setAuthorHandle] = useState('');
  const [category, setCategory] =
    useState<Exclude<ModCategory, 'all'>>('vehicles');
  const [version, setVersion] = useState('v1.0.0');
  const [summary, setSummary] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [submissionState, setSubmissionState] =
    useState<SubmissionMachineState>({
      status: 'idle',
      errors: {},
      message: null,
    });

  // Sitemap Inspector State Machine
  const [inspectorState, setInspectorState] = useState<SitemapInspectorState>({
    shardId: 'all',
    entityType: 'all',
    query: '',
    xmlMode: 'urlset',
  });

  const filteredCredits =
    selectedSpecialty === 'All'
      ? credits
      : credits.filter((c) => c.specialty === selectedSpecialty);

  const shardsSummary = getSitemapShardsSummary(
    sitemapEntries,
    SITE_CONFIG.siteUrl
  );

  const visibleSitemapRows = filterSitemapEntries(sitemapEntries, {
    shardId: inspectorState.shardId,
    entityType: inspectorState.entityType,
    query: inspectorState.query,
    limit: 12,
  });

  const sampleXmlOutput =
    inspectorState.xmlMode === 'sitemapindex'
      ? buildSitemapIndexXml(shardsSummary)
      : buildUrlSetXml(visibleSitemapRows.slice(0, 5));

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionState((prev) =>
      transitionSubmission(prev, { type: 'RESET_FORM' })
    );

    const payload: ModSubmissionInput = {
      title,
      authorHandle: authorHandle.startsWith('@')
        ? authorHandle.trim()
        : authorHandle.trim()
          ? `@${authorHandle.trim()}`
          : '',
      category,
      version,
      summary,
      youtubeUrl,
    };

    const validation = validateModSubmission(payload);
    if (!validation.valid) {
      setSubmissionState((prev) =>
        transitionSubmission(prev, {
          type: 'VALIDATION_FAILED',
          errors: validation.errors,
        })
      );
      return;
    }

    setSubmissionState((prev) =>
      transitionSubmission(prev, { type: 'START_SUBMIT' })
    );
    try {
      if (onAddModAndCredit) {
        await onAddModAndCredit(payload);
      } else {
        const { credit, sitemapEntry } = buildDynamicModAndSitemapObjects(
          payload,
          SITE_CONFIG.siteUrl
        );
        setInternalCredits((prev) => [
          credit,
          ...prev.filter((c) => c.id !== credit.id),
        ]);
        setInternalSitemapEntries((prev) => [
          sitemapEntry,
          ...prev.filter((entry) => entry.path !== sitemapEntry.path),
        ]);
      }

      setSubmissionState((prev) =>
        transitionSubmission(prev, {
          type: 'SUBMIT_SUCCESS',
          message: `Published "${payload.title}" (${payload.version}) by ${payload.authorHandle} to Mods Directory, Creator Credits, and Shard 01.`,
        })
      );
      setTitle('');
      setAuthorHandle('');
      setVersion('v1.0.0');
      setSummary('');
      setYoutubeUrl('');
    } catch {
      // Deterministic state preserved
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-[#F5F5F5]">
      {/* SECTION: CREATOR CREDITS */}
      {showCredits && (
        <section
          id="credits"
          aria-labelledby="credits-heading"
          className="py-12 px-4 sm:px-6 border-b border-[#262626]"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-8 border-b border-[#262626]">
              <div>
                <Users className="w-6 h-6 text-[#E11D48] mb-3" aria-hidden="true" />
                <h1
                  id="credits-heading"
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5]"
                >
                  {t('credits.title')}
                </h1>
                <p className="text-sm sm:text-base text-[#A3A3A3] max-w-2xl mt-2">
                  {t('credits.subtitle')}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <StartGameModButton
                  size="sm"
                  label="Claim Digital Code"
                  onClick={() => setLockerOpen(true)}
                />
                <Link
                  href="/mods"
                  className="px-4 py-2 text-xs font-bold text-[#F5F5F5] bg-[#121212] hover:border-[#404040] border border-[#262626] whitespace-nowrap"
                >
                  ← {t('credits.backToMods')}
                </Link>
              </div>
            </div>

            {/* Filter by Specialty */}
            <div
              role="group"
              aria-label="Filter credits by specialty"
              className="flex flex-wrap items-center bg-[#121212] border border-[#262626] mb-8"
            >
              {CREDIT_SPECIALTIES.map((spec) => {
                const active = selectedSpecialty === spec;
                return (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => setSelectedSpecialty(spec)}
                    className={`px-3.5 py-2 text-xs font-bold border-r border-[#262626] last:border-r-0 whitespace-nowrap cursor-pointer ${
                      active
                        ? 'bg-[#E11D48] text-white'
                        : 'text-[#A3A3A3] hover:text-[#F5F5F5]'
                    }`}
                  >
                    {spec}
                  </button>
                );
              })}
            </div>

            {/* Credits Cards */}
            {filteredCredits.length === 0 ? (
              <div className="bg-[#121212] border border-[#262626] p-8 text-center mb-14">
                <p className="text-sm text-[#A3A3A3]">No records found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
                {filteredCredits.map((credit) => (
                  <article
                    key={credit.id}
                    className="bg-[#121212] border border-[#262626] p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#A3A3A3] font-mono tabular-nums mb-2">
                        <span className="text-[#E11D48]">{credit.specialty}</span>
                        <span aria-hidden="true">·</span>
                        <span>{credit.attributionLicense}</span>
                      </div>

                      <h2 className="text-lg font-bold text-[#F5F5F5] mb-1">
                        {credit.displayName}{' '}
                        <span className="text-xs font-mono text-[#A3A3A3]">
                          {credit.handle}
                        </span>
                      </h2>

                      <p className="text-xs text-[#A3A3A3] leading-relaxed mb-4">
                        {credit.primaryContribution}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#262626] flex items-center justify-between text-xs text-[#737373] font-mono tabular-nums">
                      <span>{credit.modsPublished} BUILDS</span>
                      <span aria-hidden="true">·</span>
                      <span>{credit.totalDownloads}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#F5F5F5]">{credit.verifiedBuilds}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Special Acknowledgments */}
            <div className="bg-[#121212] border border-[#262626] p-6 mb-14">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#262626]">
                <h2 className="text-xl font-bold text-[#F5F5F5]">
                  {t('credits.ackTitle')}
                </h2>
                <span className="text-xs font-mono text-[#A3A3A3]">
                  {t('credits.ackStandard')}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SPECIAL_ACKNOWLEDGMENTS.map((ack) => (
                  <div
                    key={ack.group}
                    className="p-4 bg-[#0A0A0A] border border-[#262626]"
                  >
                    <div className="text-xs font-mono text-[#E11D48] mb-1">
                      {ack.role}
                    </div>
                    <div className="text-sm font-bold text-[#F5F5F5] mb-1">
                      {ack.group}
                    </div>
                    <p className="text-xs text-[#A3A3A3] leading-relaxed">
                      {ack.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Mod & Creator Credit Form */}
            <div
              id="submit-mod"
              className="bg-[#121212] border border-[#262626] p-6 lg:p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5">
                  <h2 className="text-2xl font-bold text-[#F5F5F5] mb-3">
                    {t('credits.submitTitle')}
                  </h2>
                  <p className="text-sm text-[#A3A3A3] leading-relaxed mb-5">
                    {t('credits.submitSubtitle')}
                  </p>

                  <div className="bg-[#0A0A0A] border border-[#262626] p-4 flex items-center gap-4">
                    <div className="w-16 h-20 overflow-hidden shrink-0 bg-[#121212] border border-[#262626]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={withBasePath(OFFICIAL_VI_ASSETS.heroPoster)}
                        alt="Grand Theft Auto VI Reference Key Art"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xs text-[#A3A3A3]">
                      <div className="font-mono font-bold text-[#F5F5F5] mb-1">
                        REPOSITORY INDEX PROTOCOL
                      </div>
                      <p className="leading-relaxed">
                        Direct registration to the Mods Directory, Creator Attribution
                        Ledger, and Core XML shard.
                      </p>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={handleFormSubmit}
                  noValidate
                  aria-label="Submit Mod and Creator Credit"
                  className="lg:col-span-7 bg-[#0A0A0A] border border-[#262626] p-6 space-y-4"
                >
                  {submissionState.status === 'published' &&
                    submissionState.message && (
                      <div
                        role="status"
                        className="bg-[#121212] border border-[#E11D48] p-3.5 flex items-start gap-2.5 text-xs text-[#F5F5F5]"
                      >
                        <CheckCircle2
                          className="w-4 h-4 text-[#E11D48] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{submissionState.message}</span>
                      </div>
                    )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="submit-mod-title"
                        className="block text-xs font-bold text-[#F5F5F5] mb-1.5"
                      >
                        {t('credits.formTitle')}
                      </label>
                      <input
                        id="submit-mod-title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Vice Beach Neon Palm Overhaul"
                        className="w-full px-3 py-2 text-xs text-[#F5F5F5] bg-[#121212] border border-[#262626] placeholder:text-[#737373] focus:outline-none focus:border-[#E11D48]"
                      />
                      {submissionState.errors.title && (
                        <p className="text-xs text-[#E11D48] mt-1">
                          {submissionState.errors.title}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="submit-author-handle"
                        className="block text-xs font-bold text-[#F5F5F5] mb-1.5"
                      >
                        {t('credits.formHandle')}
                      </label>
                      <input
                        id="submit-author-handle"
                        type="text"
                        value={authorHandle}
                        onChange={(e) => setAuthorHandle(e.target.value)}
                        placeholder="e.g. @ViceShaderLab"
                        className="w-full px-3 py-2 text-xs text-[#F5F5F5] bg-[#121212] border border-[#262626] placeholder:text-[#737373] focus:outline-none focus:border-[#E11D48]"
                      />
                      {submissionState.errors.authorHandle && (
                        <p className="text-xs text-[#E11D48] mt-1">
                          {submissionState.errors.authorHandle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="submit-mod-category"
                        className="block text-xs font-bold text-[#F5F5F5] mb-1.5"
                      >
                        {t('credits.formCategory')}
                      </label>
                      <select
                        id="submit-mod-category"
                        value={category}
                        onChange={(e) =>
                          setCategory(e.target.value as Exclude<ModCategory, 'all'>)
                        }
                        className="w-full px-3 py-2 text-xs text-[#F5F5F5] bg-[#121212] border border-[#262626] focus:outline-none focus:border-[#E11D48]"
                      >
                        <option value="vehicles">Vehicles &amp; Customs</option>
                        <option value="shaders">Graphics &amp; Shaders</option>
                        <option value="map-expansions">Vice City Map</option>
                        <option value="characters">Character Outfits</option>
                        <option value="scripts">Scripts &amp; Physics</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="submit-mod-version"
                        className="block text-xs font-bold text-[#F5F5F5] mb-1.5"
                      >
                        {t('credits.formVersion')}
                      </label>
                      <input
                        id="submit-mod-version"
                        type="text"
                        value={version}
                        onChange={(e) => setVersion(e.target.value)}
                        placeholder="v1.0.0"
                        className="w-full px-3 py-2 text-xs font-mono text-[#F5F5F5] bg-[#121212] border border-[#262626] placeholder:text-[#737373] focus:outline-none focus:border-[#E11D48]"
                      />
                      {submissionState.errors.version && (
                        <p className="text-xs text-[#E11D48] mt-1">
                          {submissionState.errors.version}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="submit-youtube-url"
                        className="block text-xs font-bold text-[#F5F5F5] mb-1.5"
                      >
                        {t('credits.formYoutube')}
                      </label>
                      <input
                        id="submit-youtube-url"
                        type="url"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                        className="w-full px-3 py-2 text-xs text-[#F5F5F5] bg-[#121212] border border-[#262626] placeholder:text-[#737373] focus:outline-none focus:border-[#E11D48]"
                      />
                      {submissionState.errors.youtubeUrl && (
                        <p className="text-xs text-[#E11D48] mt-1">
                          {submissionState.errors.youtubeUrl}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="submit-mod-summary"
                      className="block text-xs font-bold text-[#F5F5F5] mb-1.5"
                    >
                      {t('credits.formSummary')}
                    </label>
                    <textarea
                      id="submit-mod-summary"
                      rows={3}
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      placeholder="Describe shader parameters, poly-count budget, or gameplay modifications..."
                      className="w-full px-3 py-2 text-xs text-[#F5F5F5] bg-[#121212] border border-[#262626] placeholder:text-[#737373] focus:outline-none focus:border-[#E11D48]"
                    />
                    {submissionState.errors.summary && (
                      <p className="text-xs text-[#E11D48] mt-1">
                        {submissionState.errors.summary}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-2">
                    <span className="text-[11px] font-mono text-[#737373]">
                      {t('credits.formPersistNote')}
                    </span>
                    <button
                      type="submit"
                      disabled={submissionState.status === 'submitting'}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#E11D48] hover:bg-[#BE123C] whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
                    >
                      <PlusCircle className="w-4 h-4" aria-hidden="true" />
                      <span>
                        {submissionState.status === 'submitting'
                          ? t('credits.formIndexing')
                          : t('credits.formSubmit')}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: STATIC MULTI-SHARD SITEMAP.XML INSPECTOR */}
      {showSitemap && (
        <section
          id="sitemap"
          aria-labelledby="sitemap-heading"
          className="py-12 px-4 sm:px-6 border-b border-[#262626]"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-8 border-b border-[#262626]">
              <div>
                <FileCode
                  className="w-6 h-6 text-[#E11D48] mb-3"
                  aria-hidden="true"
                />
                <h1
                  id="sitemap-heading"
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5]"
                >
                  {t('sitemap.title')}
                </h1>
                <p className="text-sm sm:text-base text-[#A3A3A3] max-w-2xl mt-2">
                  {t('sitemap.subtitle')} ({sitemapEntries.length.toLocaleString()}{' '}
                  canonical URLs).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href={withBasePath('/sitemap.xml')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#E11D48] hover:bg-[#BE123C] whitespace-nowrap shrink-0"
                >
                  <FileCode className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {t('sitemap.fetchXml')} ({sitemapEntries.length.toLocaleString()})
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>

                <a
                  href={withBasePath('/sitemaps/sitemap-core.xml')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#F5F5F5] bg-[#121212] hover:border-[#404040] border border-[#262626] whitespace-nowrap shrink-0"
                >
                  <Code2 className="w-4 h-4 text-[#E11D48]" aria-hidden="true" />
                  <span>Core XML Shard</span>
                </a>
              </div>
            </div>

            {/* 5 Static XML Shards Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-[#262626] bg-[#121212] divide-y sm:divide-y-0 sm:divide-x divide-[#262626] mb-8">
              {shardsSummary.map((shard) => {
                const isSelected = inspectorState.shardId === shard.shardId;
                const shortFile = shard.xmlEndpoint.split('/').slice(-2).join('/');
                return (
                  <button
                    key={shard.shardId}
                    type="button"
                    onClick={() =>
                      setInspectorState((prev) =>
                        transitionSitemapInspector(prev, {
                          type: 'TOGGLE_SHARD',
                          shardId: shard.shardId,
                        })
                      )
                    }
                    className={`text-left p-4 cursor-pointer ${
                      isSelected
                        ? 'bg-[#E11D48] text-white'
                        : 'bg-[#121212] text-[#F5F5F5] hover:bg-[#181818]'
                    }`}
                  >
                    <div
                      className={`flex items-center justify-between text-xs font-mono tabular-nums mb-1 ${
                        isSelected ? 'text-white font-bold' : 'text-[#E11D48]'
                      }`}
                    >
                      <span>SHARD 0{shard.shardId}</span>
                      <span>{shard.urlCount} URLS</span>
                    </div>
                    <div className="text-xs font-bold line-clamp-2 mb-2">
                      {shard.label}
                    </div>
                    <div
                      className={`text-[11px] font-mono truncate ${
                        isSelected ? 'text-white/85' : 'text-[#737373]'
                      }`}
                    >
                      /{shortFile}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Filter Controls + Live XML Output */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-7 bg-[#121212] border border-[#262626] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#262626]">
                    <div className="relative flex-1">
                      <label htmlFor="sitemap-search-input" className="sr-only">
                        Search indexed sitemap URLs
                      </label>
                      <Search
                        className="w-4 h-4 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        aria-hidden="true"
                      />
                      <input
                        id="sitemap-search-input"
                        type="search"
                        value={inspectorState.query}
                        onChange={(e) =>
                          setInspectorState((prev) =>
                            transitionSitemapInspector(prev, {
                              type: 'SET_QUERY',
                              query: e.target.value,
                            })
                          )
                        }
                        placeholder={t('sitemap.searchPlaceholder')}
                        className="w-full pl-9 pr-3 py-2 text-xs font-mono text-[#F5F5F5] bg-[#0A0A0A] border border-[#262626] placeholder:text-[#737373] focus:outline-none focus:border-[#E11D48]"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <label htmlFor="sitemap-entity-select" className="sr-only">
                        Filter by entity type
                      </label>
                      <select
                        id="sitemap-entity-select"
                        value={inspectorState.entityType}
                        onChange={(e) =>
                          setInspectorState((prev) =>
                            transitionSitemapInspector(prev, {
                              type: 'SET_ENTITY_TYPE',
                              entityType: e.target.value as
                                | SitemapEntityType
                                | 'all',
                            })
                          )
                        }
                        className="px-3 py-2 text-xs font-mono text-[#F5F5F5] bg-[#0A0A0A] border border-[#262626] focus:outline-none focus:border-[#E11D48]"
                      >
                        <option value="all">All Entity Types</option>
                        <option value="core">Core Pages</option>
                        <option value="key">Digital Keys (2,000)</option>
                        <option value="mod">Mod Pages</option>
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#262626] text-[11px] font-mono uppercase text-[#737373]">
                          <th className="py-2 pr-3">{t('sitemap.colPath')}</th>
                          <th className="py-2 px-2">{t('sitemap.colType')}</th>
                          <th className="py-2 px-2">{t('sitemap.colShard')}</th>
                          <th className="py-2 pl-2 text-right">
                            {t('sitemap.colPriority')}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#262626] text-xs font-mono tabular-nums">
                        {visibleSitemapRows.length === 0 ? (
                          <tr>
                            <td
                              colSpan={4}
                              className="py-6 text-center text-[#737373]"
                            >
                              No records found.
                            </td>
                          </tr>
                        ) : (
                          visibleSitemapRows.map((row) => (
                            <tr key={row.loc} className="hover:bg-[#181818]">
                              <td className="py-2.5 pr-3 text-[#F5F5F5] max-w-[280px] truncate">
                                {row.path}
                              </td>
                              <td className="py-2.5 px-2 text-[#E11D48] uppercase">
                                {row.entityType}
                              </td>
                              <td className="py-2.5 px-2 text-[#A3A3A3]">
                                #{row.shardId}
                              </td>
                              <td className="py-2.5 pl-2 text-right text-[#F5F5F5]">
                                {row.priority}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#262626] flex items-center justify-between text-xs text-[#737373] font-mono tabular-nums">
                  <span>
                    {visibleSitemapRows.length} /{' '}
                    {sitemapEntries.length.toLocaleString()} URLS
                  </span>
                  <span className="text-[#F5F5F5]">XML 0.9</span>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#121212] border border-[#262626] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[#262626]">
                    <span className="text-xs font-mono font-bold text-[#F5F5F5]">
                      {t('sitemap.xmlPreviewTitle')}
                    </span>
                    <div className="flex items-center bg-[#0A0A0A] border border-[#262626]">
                      <button
                        type="button"
                        onClick={() =>
                          setInspectorState((prev) =>
                            transitionSitemapInspector(prev, {
                              type: 'SET_XML_MODE',
                              xmlMode: 'urlset',
                            })
                          )
                        }
                        className={`px-2.5 py-1 text-[11px] font-mono uppercase border-r border-[#262626] cursor-pointer ${
                          inspectorState.xmlMode === 'urlset'
                            ? 'bg-[#E11D48] text-white font-bold'
                            : 'text-[#A3A3A3] hover:text-[#F5F5F5]'
                        }`}
                      >
                        urlset
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setInspectorState((prev) =>
                            transitionSitemapInspector(prev, {
                              type: 'SET_XML_MODE',
                              xmlMode: 'sitemapindex',
                            })
                          )
                        }
                        className={`px-2.5 py-1 text-[11px] font-mono uppercase cursor-pointer ${
                          inspectorState.xmlMode === 'sitemapindex'
                            ? 'bg-[#E11D48] text-white font-bold'
                            : 'text-[#A3A3A3] hover:text-[#F5F5F5]'
                        }`}
                      >
                        sitemapindex
                      </button>
                    </div>
                  </div>

                  <pre className="text-[11px] font-mono text-[#F5F5F5] bg-[#0A0A0A] p-4 border border-[#262626] overflow-x-auto leading-relaxed max-h-[360px]">
                    <code>{sampleXmlOutput}</code>
                  </pre>
                </div>

                <div className="mt-4 pt-3 border-t border-[#262626] text-xs font-mono text-[#A3A3A3] flex items-center justify-between">
                  <span>{t('sitemap.robotsNote')}</span>
                  <a
                    href={withBasePath('/robots.txt')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E11D48] hover:underline"
                  >
                    /robots.txt
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <SiteFooter />

      <ContentLockerModal
        isOpen={lockerOpen}
        onClose={() => setLockerOpen(false)}
        packageTitle="Grand Theft Auto VI — Digital Code Allocation"
      />
    </div>
  );
}