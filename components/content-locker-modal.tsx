'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { ExternalLink, Lock, X } from 'lucide-react';
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-6"
    >
      <div className="w-full max-w-3xl h-[88vh] max-h-[760px] flex flex-col bg-[#0A0A0A] border border-[#262626]">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 bg-[#121212] border-b border-[#262626]">
          <div className="flex items-center gap-3 min-w-0">
            <Lock className="w-4 h-4 text-[#E11D48] shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <h2
                id="locker-modal-title"
                className="text-sm sm:text-base font-bold text-[#F5F5F5] truncate"
              >
                {packageTitle}
              </h2>
              <p className="text-xs text-[#A3A3A3] truncate">
                Complete verification to release the selected console code.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close verification window"
            className="inline-flex items-center justify-center w-8 h-8 text-[#A3A3A3] hover:text-[#F5F5F5] bg-[#0A0A0A] border border-[#262626] hover:border-[#404040] cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Bar */}
        <div className="px-5 py-2 bg-[#0A0A0A] border-b border-[#262626] flex flex-wrap items-center justify-between gap-2 text-xs text-[#A3A3A3]">
          <span className="text-[#F5F5F5]">Status: Verification Required</span>
          <span className="font-mono text-[11px]">Automated Protection Active</span>
        </div>

        {/* Verification Frame */}
        <div className="flex-1 relative bg-[#0A0A0A] overflow-hidden">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
              <p className="text-xs font-mono text-[#A3A3A3]">
                Loading verification interface...
              </p>
            </div>
          )}

          <iframe
            src={CONTENT_LOCKER_URL}
            title="Verification Gateway"
            onLoad={() => setIframeLoaded(true)}
            className="relative z-10 w-full h-full border-0 bg-transparent"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>

        {/* Fallback Footer */}
        <div className="px-5 py-3 bg-[#121212] border-t border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-[#A3A3A3]">
            If the verification panel does not load in this frame, open it directly.
          </p>

          <a
            href={CONTENT_LOCKER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#E11D48] hover:bg-[#BE123C] border border-[#E11D48] whitespace-nowrap shrink-0"
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
        className={`inline-flex items-center gap-2 px-4 py-2 bg-[#E11D48] hover:bg-[#BE123C] text-white border border-[#E11D48] font-bold text-xs cursor-pointer shrink-0 ${className}`}
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
      className={`inline-flex items-center justify-between gap-4 px-5 py-3.5 bg-[#E11D48] hover:bg-[#BE123C] text-white border border-[#E11D48] cursor-pointer text-left ${className}`}
    >
      <span className="flex items-center gap-3">
        <Lock className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span className="flex flex-col">
          <span className="text-base font-bold leading-tight">{label}</span>
          <span className="text-xs text-white/85 mt-0.5">
            PlayStation 5 &amp; Xbox Series X|S
          </span>
        </span>
      </span>
    </button>
  );
}