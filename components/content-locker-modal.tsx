'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { ExternalLink, Lock, Play, ShieldCheck, X } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';

export const CONTENT_LOCKER_URL = SITE_CONFIG.lockerUrl;

interface ContentLockerModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageTitle?: string;
  theme?: 'default' | 'vice';
}

export function ContentLockerModal({
  isOpen,
  onClose,
  packageTitle = 'Grand Theft Auto VI — Digital Code Allocation',
}: ContentLockerModalProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleClose = useCallback(() => {
    setIframeLoaded(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="locker-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6"
    >
      <div className="w-full max-w-3xl h-[88vh] max-h-[780px] flex flex-col rounded-2xl overflow-hidden bg-[#0E1018] border border-white/10 shadow-[0_32px_90px_-16px_rgba(0,0,0,0.9)]">
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 bg-[#121520] border-b border-white/[0.08]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#F43F7E]/15 border border-[#F43F7E]/30 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4 text-[#F43F7E]" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h2
                id="locker-modal-title"
                className="font-display text-sm sm:text-base font-semibold text-white truncate"
              >
                {packageTitle}
              </h2>
              <p className="text-xs text-slate-400 truncate">
                Complete quick human verification to unlock your console redemption key
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close verification window"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Strip */}
        <div className="px-5 py-2.5 bg-[#0A0C12] border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-medium text-slate-200">
              Allocation Reserved — Ready for Verification
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            <span>Anti-Bot Protection Active</span>
          </div>
        </div>

        {/* Embedded Content Locker Frame */}
        <div className="flex-1 relative bg-[#0A0C12] overflow-hidden">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6">
              <div className="w-8 h-8 rounded-full border-2 border-white/15 border-t-[#F43F7E] animate-spin" />
              <p className="text-xs text-slate-400">
                Connecting to secure verification gateway...
              </p>
            </div>
          )}

          <iframe
            src={CONTENT_LOCKER_URL}
            title="Human Verification Gateway"
            onLoad={() => setIframeLoaded(true)}
            className="relative z-10 w-full h-full border-0 bg-transparent"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>

        {/* Direct Fallback Footer */}
        <div className="px-5 py-3.5 bg-[#121520] border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-slate-400">
            Having trouble viewing the verification step inside this window?
          </p>

          <a
            href={CONTENT_LOCKER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#F43F7E] hover:bg-[#e11d63] transition-colors whitespace-nowrap shrink-0"
          >
            <span>Open in New Tab</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
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
  label = 'Claim Digital Code',
  className = '',
}: StartGameModButtonProps) {
  if (size === 'sm') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F43F7E] hover:bg-[#e11d63] text-white font-display font-semibold text-xs sm:text-sm tracking-tight transition-colors cursor-pointer shrink-0 ${className}`}
      >
        <Lock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center justify-between gap-4 px-6 py-4 rounded-xl bg-gradient-to-r from-[#F43F7E] to-[#E11D63] hover:brightness-110 text-white shadow-[0_12px_36px_-10px_rgba(244,63,126,0.55)] transition-all cursor-pointer text-left ${className}`}
    >
      <span className="flex items-center gap-3.5">
        <span className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
          <Play className="w-4 h-4 fill-current" aria-hidden="true" />
        </span>
        <span className="flex flex-col">
          <span className="font-display text-lg sm:text-xl font-bold tracking-tight leading-tight">
            {label}
          </span>
          <span className="text-xs text-white/85 mt-0.5">
            PlayStation 5 &amp; Xbox Series X|S · Instant Verification
          </span>
        </span>
      </span>
    </button>
  );
}