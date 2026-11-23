import { ActiveSectionView } from '@/components/hero-section';
import {
  LanguageConfig,
  LocaleCode,
  ModCategory,
  SitemapEntityType,
  TranslationDictionary,
} from './types';

/**
 * 1. Portal View Navigation State Machine
 */
export interface PortalViewState {
  status: 'viewing_all' | 'viewing_section';
  activeView: ActiveSectionView;
  targetAnchor?: string;
}

export type PortalViewEvent =
  | { type: 'SELECT_VIEW'; view: ActiveSectionView; targetId?: string }
  | { type: 'RESET_VIEW' };

export function transitionPortalView(
  _state: PortalViewState,
  event: PortalViewEvent
): PortalViewState {
  switch (event.type) {
    case 'SELECT_VIEW':
      return {
        status: event.view === 'all' ? 'viewing_all' : 'viewing_section',
        activeView: event.view,
        targetAnchor: event.targetId,
      };
    case 'RESET_VIEW':
      return {
        status: 'viewing_all',
        activeView: 'all',
        targetAnchor: undefined,
      };
  }
}

/**
 * 2. Official Gallery Lightbox State Machine
 */
export type LightboxState =
  | { status: 'closed'; activeShotId: null }
  | { status: 'inspecting'; activeShotId: string };

export type LightboxEvent =
  | { type: 'OPEN_SHOT'; shotId: string }
  | { type: 'CLOSE_SHOT' };

export function transitionLightbox(
  _state: LightboxState,
  event: LightboxEvent
): LightboxState {
  switch (event.type) {
    case 'OPEN_SHOT':
      return { status: 'inspecting', activeShotId: event.shotId };
    case 'CLOSE_SHOT':
      return { status: 'closed', activeShotId: null };
  }
}

/**
 * 3. Gameplay Video Theater State Machine
 */
export interface VideoTheaterState {
  mode: 'interactive-preview' | 'youtube-iframe';
  activeVideoId: string;
  selectedHighlightIdx: number;
}

export type VideoTheaterEvent =
  | { type: 'SELECT_VIDEO'; videoId: string }
  | { type: 'SELECT_HIGHLIGHT'; index: number }
  | { type: 'SET_MODE'; mode: 'interactive-preview' | 'youtube-iframe' };

export function transitionVideoTheater(
  state: VideoTheaterState,
  event: VideoTheaterEvent
): VideoTheaterState {
  switch (event.type) {
    case 'SELECT_VIDEO':
      return {
        ...state,
        activeVideoId: event.videoId,
        selectedHighlightIdx: 0,
      };
    case 'SELECT_HIGHLIGHT':
      return {
        ...state,
        mode: 'interactive-preview',
        selectedHighlightIdx: event.index,
      };
    case 'SET_MODE':
      return {
        ...state,
        mode: event.mode,
      };
  }
}

/**
 * 4. Mod Directory Filter & Inspector State Machine
 */
export interface DirectoryFilterState {
  category: ModCategory;
  searchQuery: string;
  sortBy: 'downloads' | 'rating' | 'newest';
  inspectedModId: string;
}

export type DirectoryFilterEvent =
  | { type: 'SET_CATEGORY'; category: ModCategory }
  | { type: 'SET_QUERY'; query: string }
  | { type: 'SET_SORT'; sortBy: 'downloads' | 'rating' | 'newest' }
  | { type: 'INSPECT_MOD'; modId: string }
  | { type: 'RESET_FILTERS'; defaultModId: string };

export function transitionDirectoryFilter(
  state: DirectoryFilterState,
  event: DirectoryFilterEvent
): DirectoryFilterState {
  switch (event.type) {
    case 'SET_CATEGORY':
      return { ...state, category: event.category };
    case 'SET_QUERY':
      return { ...state, searchQuery: event.query };
    case 'SET_SORT':
      return { ...state, sortBy: event.sortBy };
    case 'INSPECT_MOD':
      return { ...state, inspectedModId: event.modId };
    case 'RESET_FILTERS':
      return {
        category: 'all',
        searchQuery: '',
        sortBy: 'downloads',
        inspectedModId: event.defaultModId,
      };
  }
}

/**
 * 5. Mod Submission Finite State Machine
 */
export type SubmissionMachineState =
  | { status: 'idle'; errors: Record<string, string>; message: null }
  | { status: 'invalid'; errors: Record<string, string>; message: null }
  | { status: 'submitting'; errors: Record<string, string>; message: null }
  | { status: 'published'; errors: Record<string, string>; message: string };

export type SubmissionMachineEvent =
  | { type: 'VALIDATION_FAILED'; errors: Record<string, string> }
  | { type: 'START_SUBMIT' }
  | { type: 'SUBMIT_SUCCESS'; message: string }
  | { type: 'RESET_FORM' };

export function transitionSubmission(
  _state: SubmissionMachineState,
  event: SubmissionMachineEvent
): SubmissionMachineState {
  switch (event.type) {
    case 'VALIDATION_FAILED':
      return { status: 'invalid', errors: event.errors, message: null };
    case 'START_SUBMIT':
      return { status: 'submitting', errors: {}, message: null };
    case 'SUBMIT_SUCCESS':
      return { status: 'published', errors: {}, message: event.message };
    case 'RESET_FORM':
      return { status: 'idle', errors: {}, message: null };
  }
}

/**
 * 6. Sitemap Inspector State Machine
 */
export interface SitemapInspectorState {
  shardId: number | 'all';
  entityType: SitemapEntityType | 'all';
  query: string;
  xmlMode: 'urlset' | 'sitemapindex';
}

export type SitemapInspectorEvent =
  | { type: 'TOGGLE_SHARD'; shardId: number }
  | { type: 'SET_ENTITY_TYPE'; entityType: SitemapEntityType | 'all' }
  | { type: 'SET_QUERY'; query: string }
  | { type: 'SET_XML_MODE'; xmlMode: 'urlset' | 'sitemapindex' };

export function transitionSitemapInspector(
  state: SitemapInspectorState,
  event: SitemapInspectorEvent
): SitemapInspectorState {
  switch (event.type) {
    case 'TOGGLE_SHARD':
      return {
        ...state,
        shardId: state.shardId === event.shardId ? 'all' : event.shardId,
      };
    case 'SET_ENTITY_TYPE':
      return { ...state, entityType: event.entityType };
    case 'SET_QUERY':
      return { ...state, query: event.query };
    case 'SET_XML_MODE':
      return { ...state, xmlMode: event.xmlMode };
  }
}

/**
 * 7. Content Locker Modal Finite State Machine
 */
export type LockerModalState =
  | { status: 'closed' }
  | { status: 'loading' }
  | { status: 'ready' }
  | { status: 'fallback' };

export type LockerModalEvent =
  | { type: 'OPEN' }
  | { type: 'IFRAME_LOADED' }
  | { type: 'TIMEOUT_FALLBACK' }
  | { type: 'CLOSE' };

export function transitionLockerModal(
  state: LockerModalState,
  event: LockerModalEvent
): LockerModalState {
  switch (event.type) {
    case 'OPEN':
      return state.status === 'closed' ? { status: 'loading' } : state;
    case 'IFRAME_LOADED':
      return state.status === 'loading' || state.status === 'fallback'
        ? { status: 'ready' }
        : state;
    case 'TIMEOUT_FALLBACK':
      return state.status === 'loading' ? { status: 'fallback' } : state;
    case 'CLOSE':
      return { status: 'closed' };
  }
}

/**
 * 8. Key Claim Terminal Finite State Machine
 */
export type TerminalPlatformKey =
  | 'ps5'
  | 'ps5-pro'
  | 'xbox-series-x'
  | 'xbox-series-s';

export interface KeyClaimTerminalState {
  status: 'configuring' | 'verifying';
  platform: TerminalPlatformKey;
  regionCode: string;
  editionId: string;
}

export type KeyClaimTerminalEvent =
  | { type: 'SELECT_PLATFORM'; platform: TerminalPlatformKey }
  | { type: 'SELECT_REGION'; regionCode: string }
  | { type: 'SELECT_EDITION'; editionId: string }
  | { type: 'OPEN_VERIFICATION' }
  | { type: 'CLOSE_VERIFICATION' };

export function transitionKeyClaimTerminal(
  state: KeyClaimTerminalState,
  event: KeyClaimTerminalEvent
): KeyClaimTerminalState {
  switch (event.type) {
    case 'SELECT_PLATFORM':
      return { ...state, status: 'configuring', platform: event.platform };
    case 'SELECT_REGION':
      return { ...state, status: 'configuring', regionCode: event.regionCode };
    case 'SELECT_EDITION':
      return { ...state, status: 'configuring', editionId: event.editionId };
    case 'OPEN_VERIFICATION':
      return { ...state, status: 'verifying' };
    case 'CLOSE_VERIFICATION':
      return { ...state, status: 'configuring' };
  }
}

/**
 * 9. Keys Directory Browser Filter & Pagination Finite State Machine
 */
export interface KeysDirectoryState {
  platformId: string;
  regionCode: string;
  editionId: string;
  intentId: string;
  searchQuery: string;
  visibleLimit: number;
  pageSize: number;
}

export type KeysDirectoryEvent =
  | { type: 'SET_PLATFORM'; platformId: string }
  | { type: 'SET_REGION'; regionCode: string }
  | { type: 'SET_EDITION'; editionId: string }
  | { type: 'SET_INTENT'; intentId: string }
  | { type: 'SET_QUERY'; searchQuery: string }
  | { type: 'LOAD_MORE' }
  | { type: 'RESET_FILTERS' };

export function createInitialKeysDirectoryState(
  pageSize = 24
): KeysDirectoryState {
  return {
    platformId: 'all',
    regionCode: 'all',
    editionId: 'all',
    intentId: 'core',
    searchQuery: '',
    visibleLimit: pageSize,
    pageSize,
  };
}

export function transitionKeysDirectory(
  state: KeysDirectoryState,
  event: KeysDirectoryEvent
): KeysDirectoryState {
  switch (event.type) {
    case 'SET_PLATFORM':
      return {
        ...state,
        platformId: event.platformId,
        visibleLimit: state.pageSize,
      };
    case 'SET_REGION':
      return {
        ...state,
        regionCode: event.regionCode,
        visibleLimit: state.pageSize,
      };
    case 'SET_EDITION':
      return {
        ...state,
        editionId: event.editionId,
        visibleLimit: state.pageSize,
      };
    case 'SET_INTENT':
      return {
        ...state,
        intentId: event.intentId,
        visibleLimit: state.pageSize,
      };
    case 'SET_QUERY':
      return {
        ...state,
        searchQuery: event.searchQuery,
        visibleLimit: state.pageSize,
      };
    case 'LOAD_MORE':
      return {
        ...state,
        visibleLimit: state.visibleLimit + state.pageSize,
      };
    case 'RESET_FILTERS':
      return createInitialKeysDirectoryState(state.pageSize);
  }
}

/**
 * 10. Site Header Mutually-Exclusive Overlay Finite State Machine
 */
export type HeaderOverlayState =
  | { status: 'idle' }
  | { status: 'mobile-menu' }
  | { status: 'language-menu' }
  | { status: 'claim-modal' };

export type HeaderOverlayEvent =
  | { type: 'TOGGLE_MOBILE_MENU' }
  | { type: 'TOGGLE_LANGUAGE_MENU' }
  | { type: 'OPEN_CLAIM_MODAL' }
  | { type: 'CLOSE_ALL' };

export function transitionHeaderOverlay(
  state: HeaderOverlayState,
  event: HeaderOverlayEvent
): HeaderOverlayState {
  switch (event.type) {
    case 'TOGGLE_MOBILE_MENU':
      return state.status === 'mobile-menu'
        ? { status: 'idle' }
        : { status: 'mobile-menu' };
    case 'TOGGLE_LANGUAGE_MENU':
      return state.status === 'language-menu'
        ? { status: 'idle' }
        : { status: 'language-menu' };
    case 'OPEN_CLAIM_MODAL':
      return { status: 'claim-modal' };
    case 'CLOSE_ALL':
      return { status: 'idle' };
  }
}

/**
 * 11. FAQ Accordion Finite State Machine
 */
export type AccordionState =
  | { status: 'collapsed'; openId: null }
  | { status: 'expanded'; openId: string };

export type AccordionEvent =
  | { type: 'TOGGLE_ITEM'; id: string }
  | { type: 'COLLAPSE_ALL' };

export function transitionAccordion(
  state: AccordionState,
  event: AccordionEvent
): AccordionState {
  switch (event.type) {
    case 'TOGGLE_ITEM':
      return state.status === 'expanded' && state.openId === event.id
        ? { status: 'collapsed', openId: null }
        : { status: 'expanded', openId: event.id };
    case 'COLLAPSE_ALL':
      return { status: 'collapsed', openId: null };
  }
}

/**
 * 12. Locale & i18n Hydration Finite State Machine
 */
export interface LocaleMachineState {
  status: 'hydrating' | 'ready';
  locale: LocaleCode;
  languages: LanguageConfig[];
  translations: Record<LocaleCode, TranslationDictionary>;
}

export type LocaleMachineEvent =
  | {
      type: 'HYDRATE';
      locale: LocaleCode;
      languages: LanguageConfig[];
      translations: Record<LocaleCode, TranslationDictionary>;
    }
  | { type: 'SET_LOCALE'; code: LocaleCode }
  | { type: 'TOGGLE_LANGUAGE'; code: LocaleCode }
  | { type: 'SET_DEFAULT_LANGUAGE'; code: LocaleCode }
  | {
      type: 'UPDATE_TRANSLATION';
      locale: LocaleCode;
      key: string;
      value: string;
    }
  | {
      type: 'RESET_ALL';
      defaultLanguages: LanguageConfig[];
      defaultTranslations: Record<LocaleCode, TranslationDictionary>;
    };

export function resolveInitialLocale(options: {
  urlLang: string | null;
  storedLocale: string | null;
  languages: LanguageConfig[];
}): LocaleCode {
  const { urlLang, storedLocale, languages } = options;
  const isEnabled = (code: string | null): code is LocaleCode =>
    Boolean(
      code &&
        languages.some(
          (l) => l.code === code.toLowerCase() && l.enabled
        )
    );

  if (isEnabled(urlLang)) return urlLang.toLowerCase() as LocaleCode;
  if (isEnabled(storedLocale)) return storedLocale.toLowerCase() as LocaleCode;
  return languages.find((l) => l.isDefault && l.enabled)?.code || 'en';
}

export function transitionLocaleMachine(
  state: LocaleMachineState,
  event: LocaleMachineEvent
): LocaleMachineState {
  switch (event.type) {
    case 'HYDRATE':
      return {
        status: 'ready',
        locale: event.locale,
        languages: event.languages,
        translations: event.translations,
      };
    case 'SET_LOCALE': {
      const target = state.languages.find((l) => l.code === event.code);
      if (!target || !target.enabled) return state;
      return { ...state, status: 'ready', locale: event.code };
    }
    case 'TOGGLE_LANGUAGE': {
      const enabledCount = state.languages.filter((l) => l.enabled).length;
      const target = state.languages.find((l) => l.code === event.code);
      if (!target || (target.enabled && enabledCount <= 1)) return state;

      const updated = state.languages.map((l) =>
        l.code === event.code ? { ...l, enabled: !l.enabled } : l
      );

      if (!updated.some((l) => l.isDefault && l.enabled)) {
        const firstEnabled = updated.find((l) => l.enabled);
        if (firstEnabled) {
          for (const item of updated) {
            item.isDefault = item.code === firstEnabled.code;
          }
        }
      }

      const activeStillEnabled = updated.some(
        (l) => l.code === state.locale && l.enabled
      );
      const nextLocale = activeStillEnabled
        ? state.locale
        : updated.find((l) => l.isDefault && l.enabled)?.code ||
          updated.find((l) => l.enabled)?.code ||
          'en';

      return { ...state, languages: updated, locale: nextLocale };
    }
    case 'SET_DEFAULT_LANGUAGE': {
      const updated = state.languages.map((l) => ({
        ...l,
        enabled: l.code === event.code ? true : l.enabled,
        isDefault: l.code === event.code,
      }));
      return { ...state, languages: updated, locale: event.code };
    }
    case 'UPDATE_TRANSLATION':
      return {
        ...state,
        translations: {
          ...state.translations,
          [event.locale]: {
            ...state.translations[event.locale],
            [event.key]: event.value,
          },
        },
      };
    case 'RESET_ALL':
      return {
        status: 'ready',
        locale: 'en',
        languages: event.defaultLanguages,
        translations: event.defaultTranslations,
      };
  }
}