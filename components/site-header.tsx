'use client';

import React, { useReducer } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';
import { transitionHeaderOverlay } from '@/lib/state-machines';
import { withBasePath } from '@/lib/utils';
import { useI18n } from './language-provider';
import { ContentLockerModal } from './content-locker-modal';

interface SiteHeaderProps {
  onOpenLocker?: () => void;
}

const NAV_ITEMS = [
  { href: '/', labelKey: 'nav.digitalKeys' },
  { href: '/keys', labelKey: 'nav.keysDirectory' },
  { href: '/official-media', labelKey: 'nav.gallery4k' },
  { href: '/mods', labelKey: 'nav.mods' },
  { href: '/gameplay', labelKey: 'nav.gameplay' },
  { href: '/credits', labelKey: 'nav.credits' },
] as const;

export function SiteHeader({ onOpenLocker }: SiteHeaderProps) {
  const pathname = usePathname() || '/';
  const { locale, languages, setLocale, t } = useI18n();
  const [overlayState, dispatchOverlay] = useReducer(transitionHeaderOverlay, {
    status: 'idle',
  });

  const enabledLanguages = languages.filter((lang) => lang.enabled);

  const handleOpenClaim = () => {
    if (onOpenLocker) {
      dispatchOverlay({ type: 'CLOSE_ALL' });
      onOpenLocker();
    } else {
      dispatchOverlay({ type: 'OPEN_CLAIM_MODAL' });
    }
  };

  const isRouteActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname === '';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const mobileMenuOpen = overlayState.status === 'mobile-menu';
  const internalLockerOpen = overlayState.status === 'claim-modal';

  return (
    <>
      <header
        data-overlay-state={overlayState.status}
        className="sticky top-0 z-40 bg-[#090514]/82 backdrop-blur-xl border-b border-[#FF2A85]/25"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Brand Logo (gta6keys.png) */}
          <Link
            href="/"
            aria-label={`${SITE_CONFIG.name} Home`}
            className="flex items-center gap-2.5 shrink-0 group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBasePath(SITE_CONFIG.logoPath)}
              alt={`${SITE_CONFIG.name} Vice City Logo`}
              width={40}
              height={40}
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
              className="h-9 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,42,133,0.45)] group-hover:scale-105 transition-transform"
            />
            <span className="font-display text-2xl tracking-wider vice-text-gradient leading-none">
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Primary Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1"
          >
            {NAV_ITEMS.map((item) => {
              const active = isRouteActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 text-sm border transition-colors whitespace-nowrap ${
                    active
                      ? 'text-[#F8F5FF] bg-[#FF2A85]/20 border-[#FF2A85]/55 font-semibold shadow-[0_0_16px_rgba(255,42,133,0.2)]'
                      : 'text-[#C4B5FD] hover:text-[#F8F5FF] hover:bg-[#1C1133]/70 border-transparent'
                  }`}
                >
                  {t(item.labelKey)}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Language Switcher (en/es/fr/pt), Claim CTA & Mobile Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              role="group"
              aria-label={t('nav.language')}
              className="hidden sm:flex items-center bg-[#130B24]/90 border border-[#2F1F4D] p-0.5"
            >
              <Globe
                className="w-3.5 h-3.5 text-[#22D3EE] mx-1.5 shrink-0"
                aria-hidden="true"
              />
              {enabledLanguages.map((lang) => {
                const isSelected = locale === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    data-locale={lang.code}
                    aria-pressed={isSelected}
                    title={lang.nativeName}
                    onClick={() => setLocale(lang.code)}
                    className={`px-2 py-1 text-[11px] font-mono font-bold transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#FF2A85] to-[#FF8A3D] text-white'
                        : 'text-[#C4B5FD] hover:text-white'
                    }`}
                  >
                    {lang.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleOpenClaim}
              className="vice-btn-primary px-4 py-2 text-xs sm:text-sm font-bold cursor-pointer whitespace-nowrap"
            >
              {t('nav.claimCode')}
            </button>

            <button
              type="button"
              onClick={() => dispatchOverlay({ type: 'TOGGLE_MOBILE_MENU' })}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden inline-flex items-center justify-center w-9 h-9 bg-[#130B24] border border-[#FF2A85]/35 text-[#F8F5FF] cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4 text-[#22D3EE]" aria-hidden="true" />
              ) : (
                <Menu className="w-4 h-4 text-[#FF8A3D]" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation + Language Selector */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="lg:hidden border-t border-[#FF2A85]/25 bg-[#090514]/95 backdrop-blur-xl"
          >
            <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 divide-x divide-y divide-[#2F1F4D]">
              {NAV_ITEMS.map((item) => {
                const active = isRouteActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => dispatchOverlay({ type: 'CLOSE_ALL' })}
                    className={`px-4 py-3 text-sm ${
                      active
                        ? 'bg-[#FF2A85]/20 text-[#F8F5FF] font-semibold'
                        : 'text-[#C4B5FD] hover:text-[#F8F5FF]'
                    }`}
                  >
                    {t(item.labelKey)}
                  </Link>
                );
              })}
            </div>

            <div className="sm:hidden border-t border-[#2F1F4D] px-4 py-3 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#22D3EE]">
                <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t('nav.language')}</span>
              </span>
              <div className="flex items-center gap-1">
                {enabledLanguages.map((lang) => {
                  const isSelected = locale === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      data-locale={lang.code}
                      aria-pressed={isSelected}
                      onClick={() => {
                        setLocale(lang.code);
                        dispatchOverlay({ type: 'CLOSE_ALL' });
                      }}
                      className={`px-2.5 py-1 text-xs font-mono font-bold border cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#FF2A85] to-[#FF8A3D] text-white border-[#FF8A3D]/60'
                          : 'bg-[#130B24] text-[#C4B5FD] border-[#2F1F4D]'
                      }`}
                    >
                      {lang.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        )}
      </header>

      {!onOpenLocker && (
        <ContentLockerModal
          isOpen={internalLockerOpen}
          onClose={() => dispatchOverlay({ type: 'CLOSE_ALL' })}
          packageTitle="Grand Theft Auto VI — Digital Code Allocation"
          theme="vice"
        />
      )}
    </>
  );
}