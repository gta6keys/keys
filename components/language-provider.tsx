'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import {
  ACTIVE_LOCALE_STORAGE_KEY,
  DEFAULT_LANGUAGES,
  DEFAULT_TRANSLATIONS,
  I18N_STORAGE_KEY,
} from '@/lib/i18n-store';
import {
  LocaleMachineState,
  resolveInitialLocale,
  transitionLocaleMachine,
} from '@/lib/state-machines';
import { LanguageConfig, LocaleCode, TranslationDictionary } from '@/lib/types';

interface I18nContextValue {
  status: LocaleMachineState['status'];
  locale: LocaleCode;
  languages: LanguageConfig[];
  translations: Record<LocaleCode, TranslationDictionary>;
  setLocale: (code: LocaleCode) => void;
  t: (key: string) => string;
  toggleLanguageEnabled: (code: LocaleCode) => void;
  setDefaultLanguage: (code: LocaleCode) => void;
  updateTranslationKey: (
    locale: LocaleCode,
    key: string,
    value: string
  ) => void;
  resetAllTranslations: () => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const INITIAL_MACHINE_STATE: LocaleMachineState = {
  status: 'hydrating',
  locale: 'en',
  languages: DEFAULT_LANGUAGES,
  translations: DEFAULT_TRANSLATIONS,
};

function syncDocumentAndUrl(code: LocaleCode, updateQueryParam: boolean) {
  try {
    document.documentElement.lang = code;
    localStorage.setItem(ACTIVE_LOCALE_STORAGE_KEY, code);

    if (updateQueryParam && typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (code === 'en') {
        url.searchParams.delete('lang');
      } else {
        url.searchParams.set('lang', code);
      }
      window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    }
  } catch {
    // Ignore storage or history errors in restricted browser contexts
  }
}

function persistConfig(
  nextLanguages: LanguageConfig[],
  nextTranslations: Record<LocaleCode, TranslationDictionary>
) {
  try {
    localStorage.setItem(
      I18N_STORAGE_KEY,
      JSON.stringify({
        languages: nextLanguages,
        translations: nextTranslations,
      })
    );
  } catch {
    // Ignore storage write errors
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    transitionLocaleMachine,
    INITIAL_MACHINE_STATE
  );

  useEffect(() => {
    try {
      let loadedLanguages = DEFAULT_LANGUAGES;
      let loadedTranslations = DEFAULT_TRANSLATIONS;

      const savedConfigRaw = localStorage.getItem(I18N_STORAGE_KEY);
      if (savedConfigRaw) {
        const parsed = JSON.parse(savedConfigRaw) as {
          languages?: LanguageConfig[];
          translations?: Record<LocaleCode, TranslationDictionary>;
        };
        if (Array.isArray(parsed.languages) && parsed.languages.length === 4) {
          loadedLanguages = parsed.languages;
        }
        if (parsed.translations) {
          loadedTranslations = {
            en: { ...DEFAULT_TRANSLATIONS.en, ...(parsed.translations.en || {}) },
            es: { ...DEFAULT_TRANSLATIONS.es, ...(parsed.translations.es || {}) },
            fr: { ...DEFAULT_TRANSLATIONS.fr, ...(parsed.translations.fr || {}) },
            pt: { ...DEFAULT_TRANSLATIONS.pt, ...(parsed.translations.pt || {}) },
          };
        }
      }

      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      const storedLocale = localStorage.getItem(ACTIVE_LOCALE_STORAGE_KEY);

      const resolvedLocale = resolveInitialLocale({
        urlLang,
        storedLocale,
        languages: loadedLanguages,
      });

      document.documentElement.lang = resolvedLocale;
      dispatch({
        type: 'HYDRATE',
        locale: resolvedLocale,
        languages: loadedLanguages,
        translations: loadedTranslations,
      });
    } catch {
      dispatch({
        type: 'HYDRATE',
        locale: 'en',
        languages: DEFAULT_LANGUAGES,
        translations: DEFAULT_TRANSLATIONS,
      });
    }
  }, []);

  const setLocale = useCallback(
    (code: LocaleCode) => {
      const target = state.languages.find((l) => l.code === code);
      if (!target || !target.enabled) return;
      dispatch({ type: 'SET_LOCALE', code });
      syncDocumentAndUrl(code, true);
    },
    [state.languages]
  );

  const toggleLanguageEnabled = useCallback(
    (code: LocaleCode) => {
      const next = transitionLocaleMachine(state, {
        type: 'TOGGLE_LANGUAGE',
        code,
      });
      dispatch({ type: 'TOGGLE_LANGUAGE', code });
      persistConfig(next.languages, next.translations);
      syncDocumentAndUrl(next.locale, false);
    },
    [state]
  );

  const setDefaultLanguage = useCallback(
    (code: LocaleCode) => {
      const next = transitionLocaleMachine(state, {
        type: 'SET_DEFAULT_LANGUAGE',
        code,
      });
      dispatch({ type: 'SET_DEFAULT_LANGUAGE', code });
      persistConfig(next.languages, next.translations);
      syncDocumentAndUrl(next.locale, true);
    },
    [state]
  );

  const updateTranslationKey = useCallback(
    (targetLocale: LocaleCode, key: string, value: string) => {
      const next = transitionLocaleMachine(state, {
        type: 'UPDATE_TRANSLATION',
        locale: targetLocale,
        key,
        value,
      });
      dispatch({
        type: 'UPDATE_TRANSLATION',
        locale: targetLocale,
        key,
        value,
      });
      persistConfig(next.languages, next.translations);
    },
    [state]
  );

  const resetAllTranslations = useCallback(() => {
    dispatch({
      type: 'RESET_ALL',
      defaultLanguages: DEFAULT_LANGUAGES,
      defaultTranslations: DEFAULT_TRANSLATIONS,
    });
    try {
      localStorage.removeItem(I18N_STORAGE_KEY);
      syncDocumentAndUrl('en', true);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      return (
        state.translations[state.locale]?.[key] ??
        DEFAULT_TRANSLATIONS[state.locale]?.[key] ??
        DEFAULT_TRANSLATIONS.en[key] ??
        key
      );
    },
    [state.locale, state.translations]
  );

  return (
    <I18nContext.Provider
      value={{
        status: state.status,
        locale: state.locale,
        languages: state.languages,
        translations: state.translations,
        setLocale,
        t,
        toggleLanguageEnabled,
        setDefaultLanguage,
        updateTranslationKey,
        resetAllTranslations,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return {
      status: 'ready',
      locale: 'en',
      languages: DEFAULT_LANGUAGES,
      translations: DEFAULT_TRANSLATIONS,
      setLocale: () => {},
      t: (key: string) => DEFAULT_TRANSLATIONS.en[key] ?? key,
      toggleLanguageEnabled: () => {},
      setDefaultLanguage: () => {},
      updateTranslationKey: () => {},
      resetAllTranslations: () => {},
    };
  }
  return ctx;
}