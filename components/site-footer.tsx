'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, ShieldAlert } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';
import { withBasePath } from '@/lib/utils';
import { useI18n } from './language-provider';

export function SiteFooter() {
  const { locale, languages, setLocale, t } = useI18n();
  const enabledLanguages = languages.filter((lang) => lang.enabled);

  return (
    <footer className="border-t border-[#FF2A85]/25 bg-[#090514]/85 backdrop-blur-md text-[#C4B5FD]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#2F1F4D]">
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              aria-label={`${SITE_CONFIG.name} Home`}
              className="inline-flex items-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBasePath(SITE_CONFIG.logoPath)}
                alt={`${SITE_CONFIG.name} Vice City Logo`}
                width={64}
                height={64}
                className="h-12 w-12 object-contain vice-logo-glow"
              />
            </Link>
            <p className="text-sm text-[#C4B5FD]/85 leading-relaxed max-w-sm">
              {t('footer.description')}
            </p>

            {/* Crawlable en / es / fr / pt Locale Switcher */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Globe className="w-3.5 h-3.5 text-[#22D3EE]" aria-hidden="true" />
              {enabledLanguages.map((lang) => {
                const href = lang.code === 'en' ? '/' : `/?lang=${lang.code}`;
                const active = locale === lang.code;
                return (
                  <a
                    key={lang.code}
                    href={withBasePath(href)}
                    hrefLang={lang.code}
                    onClick={(e) => {
                      e.preventDefault();
                      setLocale(lang.code);
                    }}
                    className={`px-2 py-0.5 text-xs font-mono border transition-colors ${
                      active
                        ? 'bg-[#FF2A85]/25 border-[#FF2A85]/70 text-white font-bold'
                        : 'bg-[#130B24]/80 border-[#2F1F4D] text-[#C4B5FD] hover:text-white hover:border-[#22D3EE]/50'
                    }`}
                  >
                    {lang.label} · {lang.nativeName}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#FF8A3D]">
              {t('footer.digitalKeysHeading')}
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/keys" className="hover:text-[#F8F5FF] transition-colors">
                  {t('footer.allRegionalKeys')}
                </Link>
              </li>
              <li>
                <Link
                  href="/keys/ps5-us-standard"
                  className="hover:text-[#F8F5FF] transition-colors"
                >
                  {t('footer.ps5Keys')}
                </Link>
              </li>
              <li>
                <Link
                  href="/keys/xbox-series-x-us-standard"
                  className="hover:text-[#F8F5FF] transition-colors"
                >
                  {t('footer.xboxKeys')}
                </Link>
              </li>
              <li>
                <Link
                  href="/keys/ps5-global-preload"
                  className="hover:text-[#F8F5FF] transition-colors"
                >
                  {t('footer.preloadAccess')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#22D3EE]">
              {t('footer.archiveHeading')}
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/official-media"
                  className="hover:text-[#F8F5FF] transition-colors"
                >
                  {t('nav.gallery4k')}
                </Link>
              </li>
              <li>
                <Link href="/mods" className="hover:text-[#F8F5FF] transition-colors">
                  {t('nav.mods')}
                </Link>
              </li>
              <li>
                <Link
                  href="/gameplay"
                  className="hover:text-[#F8F5FF] transition-colors"
                >
                  {t('nav.gameplay')}
                </Link>
              </li>
              <li>
                <Link
                  href="/credits"
                  className="hover:text-[#F8F5FF] transition-colors"
                >
                  {t('nav.credits')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#FF2A85]">
              {t('footer.crawlersHeading')}
            </div>
            <ul className="space-y-2 text-sm font-mono">
              <li>
                <Link
                  href="/sitemap-explorer"
                  className="hover:text-[#F8F5FF] transition-colors"
                >
                  {t('nav.sitemap')}
                </Link>
              </li>
              <li>
                <a
                  href={withBasePath('/sitemap.xml')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#22D3EE] hover:underline"
                >
                  /sitemap.xml
                </a>
              </li>
              <li>
                <a
                  href={withBasePath('/robots.txt')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F8F5FF] transition-colors"
                >
                  /robots.txt
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#A78BFA]/80">
          <div className="flex items-start gap-2.5 max-w-3xl">
            <ShieldAlert
              className="w-4 h-4 text-[#FF8A3D] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <p className="leading-relaxed">{t('footer.disclaimer')}</p>
          </div>
          <span className="font-mono shrink-0 text-[#C4B5FD]">
            © 2026 {SITE_CONFIG.name}
          </span>
        </div>
      </div>
    </footer>
  );
}