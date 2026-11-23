'use client';

import React, { useCallback, useEffect, useReducer } from 'react';
import { ExternalLink, Lock, X } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';
import { transitionLockerModal } from '@/lib/state-machines';

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
  const [modalState, dispatch] = useReducer(transitionLockerModal, {
    status: isOpen ? 'loading' : 'closed',
  });

  const handleClose = useCallback(() => {
    dispatch({ type: 'CLOSE' });
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      dispatch({ type: 'OPEN' });
    } else {
      dispatch({ type: 'CLOSE' });
    }
  }, [isOpen]);

  useEffect(() => {
    if (modalState.status !== 'loading') return;
    const timer = window.setTimeout(() => {
      dispatch({ type: 'TIMEOUT_FALLBACK' });
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [modalState.status]);

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
      data-state={modalState.status}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#090514]/88 backdrop-blur-md p-3 sm:p-6"
    >
      <div className="w-full max-w-3xl h-[88vh] max-h-[760px] flex flex-col bg-[#0E071D] border border-[#FF2A85]/45 shadow-[0_0_48px_rgba(255,42,133,0.22)]">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 bg-[#130B24] border-b border-[#2F1F4D]">
          <div className="flex items-center gap-3 min-w-0">
            <Lock
              className="w-4 h-4 text-[#22D3EE] shrink-0"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <h2
                id="locker-modal-title"
                className="font-display text-lg sm:text-xl text-[#F8F5FF] truncate leading-tight"
              >
                {packageTitle}
              </h2>
              <p className="text-xs text-[#C4B5FD] truncate mt-0.5">
                Complete verification to release the selected console code.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close verification window"
            className="inline-flex items-center justify-center w-8 h-8 text-[#C4B5FD] hover:text-white bg-[#090514] border border-[#2F1F4D] hover:border-[#FF2A85]/60 cursor-pointer shrink-0 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Bar */}
        <div className="px-5 py-2 bg-[#090514]/90 border-b border-[#2F1F4D] flex flex-wrap items-center justify-between gap-2 text-xs text-[#C4B5FD]">
          <span className="text-[#F8F5FF]">
            Status:{' '}
            <strong className="text-[#FF8A3D]">
              {modalState.status === 'ready'
                ? 'Verification Ready'
                : modalState.status === 'fallback'
                  ? 'Direct Launch Available'
                  : 'Verification Required'}
            </strong>
          </span>
          <span className="font-mono text-[11px] text-[#22D3EE]">
            Vice City Shield Active
          </span>
        </div>

        {/* Verification Frame */}
        <div className="flex-1 relative bg-[#090514] overflow-hidden">
          {modalState.status !== 'ready' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
              <p className="text-xs font-mono text-[#C4B5FD]">
                {modalState.status === 'fallback'
                  ? 'Verification frame is taking longer than expected. You can open it directly below.'
                  : 'Loading verification interface...'}
              </p>
              {modalState.status === 'fallback' && (
                <a
                  href={CONTENT_LOCKER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vice-btn-primary inline-flex items-center gap-2 px-4 py-2 text-xs font-bold"
                >
                  <span>Open Verification Directly</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          )}

          <iframe
            src={CONTENT_LOCKER_URL}
            title="Verification Gateway"
            onLoad={() => dispatch({ type: 'IFRAME_LOADED' })}
            className="relative z-10 w-full h-full border-0 bg-transparent"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>

        {/* Fallback Footer */}
        <div className="px-5 py-3 bg-[#130B24] border-t border-[#2F1F4D] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-[#C4B5FD]">
            If the verification panel does not load in this frame, open it
            directly.
          </p>

          <a
            href={CONTENT_LOCKER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="vice-btn-primary inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold whitespace-nowrap shrink-0"
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
        className={`vice-btn-primary inline-flex items-center gap-2 px-4 py-2 font-bold text-xs cursor-pointer shrink-0 ${className}`}
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
      className={`vice-btn-primary inline-flex items-center justify-between gap-4 px-5 py-3.5 cursor-pointer text-left ${className}`}
    >
      <span className="flex items-center gap-3">
        <Lock className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span className="flex flex-col">
          <span className="text-base font-bold leading-tight">{label}</span>
          <span className="text-xs text-white/90 mt-0.5">
            PlayStation 5 &amp; Xbox Series X|S
          </span>
        </span>
      </span>
    </button>
  );
}
