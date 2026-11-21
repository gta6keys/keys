'use client';

import React, { useEffect } from 'react';
import { ExternalLink, Lock, Play, Terminal, X } from 'lucide-react';

export const CONTENT_LOCKER_URL = 'https://apptrck.net/cl/i/n6e9jk';

interface ContentLockerModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageTitle?: string;
  theme?: 'default' | 'vice';
}

export function ContentLockerModal({
  isOpen,
  onClose,
  packageTitle = 'GTA VI — CORE GAME MOD LAUNCHER',
  theme = 'default',
}: ContentLockerModalProps) {
  const isVice = theme === 'vice';
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="locker-modal-title"
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 ${
          isVice ? 'bg-[#10041C]/95' : 'bg-black/95'
        }`}
      >
        <div
          className={`w-full max-w-3xl flex flex-col h-[86vh] max-h-[760px] border ${
            isVice
              ? 'bg-[#160726] border-[#FF2E88]'
              : 'bg-[#0A0A0A] border-[#EAB308]'
          }`}
        >
        {/* Top Institutional Bar */}
                <div
                  className={`flex items-center justify-between px-4 py-3 border-b ${
                    isVice
                      ? 'bg-[#1F0A36] border-[#4D1F6E]'
                      : 'bg-[#0A0A0A] border-[#262626]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Lock
                      className={`w-4 h-4 shrink-0 ${
                        isVice ? 'text-[#FF2E88]' : 'text-[#EAB308]'
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      id="locker-modal-title"
                      className="font-mono text-xs uppercase tracking-wider text-[#F5F5F5] truncate"
                    >
                      {isVice ? 'CODE VERIFICATION GATE' : 'MOD LAUNCH GATE'} // {packageTitle}
                    </span>
                  </div>

          <button
                      type="button"
                      onClick={onClose}
                      aria-label="Close content locker"
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase text-[#F5F5F5] border cursor-pointer shrink-0 ${
                        isVice
                          ? 'bg-[#160726] border-[#4D1F6E] hover:bg-[#FF2E88] hover:text-[#160726]'
                          : 'bg-[#121212] border-[#262626] hover:bg-[#EAB308] hover:text-[#0A0A0A]'
                      }`}
                    >
                      <span>CLOSE</span>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

        <div className="px-4 py-2 bg-[#160726] border-b border-[#4D1F6E] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#E3CEF5]">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-[#FF2E88]" aria-hidden="true" />
            <span>STATUS: COMPLETE VERIFICATION TO RELEASE DIGITAL CODE</span>
          </div>
          <span className="text-[#FF2E88]">REF: N6E9JK</span>
        </div>

{/* Embedded Content Locker Iframe */}
        <div
          className={`flex-1 relative overflow-hidden ${
            isVice ? 'bg-[#12051F]' : 'bg-[#0A0A0A]'
          }`}
        >
          <iframe
            src={CONTENT_LOCKER_URL}
            title="Verification Content Locker"
            className={`w-full h-full border-0 ${
              isVice ? 'bg-[#12051F]' : 'bg-[#0A0A0A]'
            }`}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>

        {/* Direct Fallback Footer */}
                <div
                  className={`px-4 py-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isVice
                      ? 'bg-[#1F0A36] border-[#4D1F6E]'
                      : 'bg-[#0A0A0A] border-[#262626]'
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 text-xs font-mono ${
                      isVice ? 'text-[#D6BBE9]' : 'text-neutral-400'
                    }`}
                  >
                    <Terminal
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isVice ? 'text-[#FF2E88]' : 'text-[#EAB308]'
                      }`}
                    />
                    <span>If the verification panel does not render in your browser, open it directly.</span>
                  </div>

                  <a
                    href={CONTENT_LOCKER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono font-semibold uppercase border whitespace-nowrap shrink-0 ${
                      isVice
                        ? 'text-[#160726] bg-[#FF2E88] border-[#FF2E88]'
                        : 'text-[#0A0A0A] bg-[#EAB308] border-[#EAB308]'
                    }`}
                  >
                    <span>OPEN VERIFICATION IN NEW TAB</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
      </div>
    </div>
  );
}

interface StartGameModButtonProps {
  onClick: () => void;
  size?: 'sm' | 'lg';
  label?: string;
  className?: string;
}

export function StartGameModButton({
  onClick,
  size = 'lg',
  label = 'CLAIM THE CODE',
  className = '',
}: StartGameModButtonProps) {
  if (size === 'sm') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center gap-2.5 px-4 py-2 bg-[#FF2E88] text-[#160726] border border-[#FF2E88] font-display font-bold uppercase tracking-wider text-sm cursor-pointer shrink-0 ${className}`}
      >
        <span className="inline-flex items-center justify-center px-1.5 py-0.5 bg-[#160726] text-[#FF2E88] font-mono text-[10px] font-bold leading-none">
          VI
        </span>
        <span>{label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-stretch bg-[#160726] border border-[#FF2E88] p-1 cursor-pointer text-left ${className}`}
    >
      <span className="flex flex-col items-center justify-center px-4 py-3 bg-[#160726] border-r border-[#4D1F6E] text-[#FF2E88] font-display font-bold">
        <span className="text-2xl leading-none tracking-tighter">VI</span>
        <span className="text-[9px] font-mono uppercase tracking-widest mt-1 text-[#F9F2FF]">
          CODE
        </span>
      </span>

      <span className="flex items-center gap-4 px-6 py-3.5 bg-[#FF2E88] text-[#160726]">
        <Play className="w-5 h-5 fill-current shrink-0" aria-hidden="true" />
        <span className="flex flex-col">
          <span className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide leading-none">
            {label}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest mt-1 font-semibold">
            PS5 &amp; XBOX SERIES X|S // CLICK TO VERIFY
          </span>
        </span>
      </span>
    </button>
  );
}