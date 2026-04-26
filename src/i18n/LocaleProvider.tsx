"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import enMessages, { type MessageKey } from "./messages/en";
import esMessages from "./messages/es";

export type Locale = "en" | "es";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
  t: (key: MessageKey) => string;
};

const STORAGE_KEY = "owen95.locale";

const dictionaries: Record<Locale, Record<MessageKey, string>> = {
  en: enMessages,
  es: esMessages,
};

export const LocaleContext = createContext<LocaleContextValue | null>(null);

function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "es") return stored;
  } catch {
    // localStorage may be unavailable (private mode, SSR sandbox); fall back.
  }
  const nav = window.navigator?.language ?? "en";
  return nav.toLowerCase().startsWith("es") ? "es" : "en";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    setLocaleState(detectInitialLocale());
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Ignore persistence errors; in-memory locale still works.
      }
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((curr) => {
      const next: Locale = curr === "en" ? "es" : "en";
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(STORAGE_KEY, next);
        } catch {
          // ignore
        }
      }
      return next;
    });
  }, []);

  const t = useCallback(
    (key: MessageKey) => {
      return dictionaries[locale][key] ?? dictionaries.en[key] ?? key;
    },
    [locale],
  );

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, toggleLocale, t }),
    [locale, setLocale, toggleLocale, t],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used inside <LocaleProvider>");
  }
  return ctx;
}

export function useTranslations() {
  return useLocale().t;
}
