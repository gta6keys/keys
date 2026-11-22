import React from 'react';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';
import { withBasePath } from '@/lib/utils';

export function SiteFooter() {
  return (
    <footer className="border-t border-[#262626] bg-[#0A0A0A] text-[#A3A3A3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#262626]">
          <div className="md:col-span-5 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-[#E11D48] text-white font-bold text-xs">
                VI
              </span>
              <span className="text-base font-bold text-[#F5F5F5]">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="text-sm text-[#A3A3A3] leading-relaxed max-w-sm">
              Independent Grand Theft Auto VI digital key directory, regional console
              redemption specifications, and media archive for PlayStation 5 and Xbox
              Series X|S.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#F5F5F5]">
              Digital Keys
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/keys" className="hover:text-[#F5F5F5]">
                  All Regional Keys
                </Link>
              </li>
              <li>
                <Link href="/keys/ps5-us-standard" className="hover:text-[#F5F5F5]">
                  PlayStation 5 Keys
                </Link>
              </li>
              <li>
                <Link
                  href="/keys/xbox-series-x-us-standard"
                  className="hover:text-[#F5F5F5]"
                >
                  Xbox Series X|S Keys
                </Link>
              </li>
              <li>
                <Link href="/keys/ps5-global-preload" className="hover:text-[#F5F5F5]">
                  Pre-Load Access
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#F5F5F5]">
              Archive
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/official-media" className="hover:text-[#F5F5F5]">
                  4K Gallery
                </Link>
              </li>
              <li>
                <Link href="/mods" className="hover:text-[#F5F5F5]">
                  Mods Directory
                </Link>
              </li>
              <li>
                <Link href="/gameplay" className="hover:text-[#F5F5F5]">
                  Gameplay
                </Link>
              </li>
              <li>
                <Link href="/credits" className="hover:text-[#F5F5F5]">
                  Credits
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#F5F5F5]">
              Crawlers
            </div>
            <ul className="space-y-2 text-sm font-mono">
              <li>
                <Link href="/sitemap-explorer" className="hover:text-[#F5F5F5]">
                  Inspector
                </Link>
              </li>
              <li>
                <a
                  href={withBasePath('/sitemap.xml')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E11D48] hover:underline"
                >
                  /sitemap.xml
                </a>
              </li>
              <li>
                <a
                  href={withBasePath('/robots.txt')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F5F5F5]"
                >
                  /robots.txt
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#737373]">
          <div className="flex items-start gap-2.5 max-w-3xl">
            <ShieldAlert
              className="w-4 h-4 text-[#A3A3A3] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <p className="leading-relaxed">
              Independent community directory. Not affiliated with, endorsed by, or
              connected to Rockstar Games, Take-Two Interactive, Sony Interactive
              Entertainment, or Microsoft Xbox.
            </p>
          </div>
          <span className="font-mono shrink-0">© 2026 {SITE_CONFIG.name}</span>
        </div>
      </div>
    </footer>
  );
}