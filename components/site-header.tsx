'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';
import { ContentLockerModal } from './content-locker-modal';

interface SiteHeaderProps {
  onOpenLocker?: () => void;
}

const NAV_ITEMS = [
  { href: '/', label: 'Digital Keys' },
  { href: '/keys', label: 'Keys Directory' },
  { href: '/official-media', label: '4K Gallery' },
  { href: '/mods', label: 'Mods' },
  { href: '/gameplay', label: 'Gameplay' },
  { href: '/credits', label: 'Credits' },
];

export function SiteHeader({ onOpenLocker }: SiteHeaderProps) {
  const pathname = usePathname() || '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [internalLockerOpen, setInternalLockerOpen] = useState(false);

  const handleOpenClaim = () => {
    if (onOpenLocker) {
      onOpenLocker();
    } else {
      setInternalLockerOpen(true);
    }
  };

  const isRouteActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname === '';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0A0A0A] border-b border-[#262626]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="inline-flex items-center justify-center w-7 h-7 bg-[#E11D48] text-white font-bold text-xs tracking-tight">
              VI
            </span>
            <span className="text-base font-bold tracking-tight text-[#F5F5F5]">
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
                      ? 'text-[#F5F5F5] bg-[#181818] border-[#404040] font-bold'
                      : 'text-[#A3A3A3] hover:text-[#F5F5F5] border-transparent'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action & Mobile Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleOpenClaim}
              className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#E11D48] hover:bg-[#BE123C] border border-[#E11D48] transition-colors cursor-pointer whitespace-nowrap"
            >
              Claim Code
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden inline-flex items-center justify-center w-9 h-9 bg-[#121212] border border-[#262626] text-[#F5F5F5] cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Menu className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Flat Mobile Navigation */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="lg:hidden border-t border-[#262626] bg-[#0A0A0A]"
          >
            <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 divide-x divide-y divide-[#262626]">
              {NAV_ITEMS.map((item) => {
                const active = isRouteActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 text-sm ${
                      active
                        ? 'bg-[#181818] text-[#F5F5F5] font-bold'
                        : 'text-[#A3A3A3] hover:text-[#F5F5F5]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      {!onOpenLocker && (
        <ContentLockerModal
          isOpen={internalLockerOpen}
          onClose={() => setInternalLockerOpen(false)}
          packageTitle="Grand Theft Auto VI — Digital Code Allocation"
        />
      )}
    </>
  );
}