"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { T, Lang } from "./translations";

const LANG_KEY = "studio-luxe-lang";

type Ctx = {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  loc: (en: string, ar: string) => string;
};

const I18nContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      window.localStorage.getItem(LANG_KEY)) as Lang | null;
    if (stored === "ar" || stored === "en") setLangState(stored);
  }, []);

  // Reflect language on <html> (does NOT persist — avoids clobbering stored value on mount)
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(LANG_KEY, l);
    } catch {}
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      let str = T[key]?.[lang] ?? key;
      if (params) {
        for (const [k, v] of Object.entries(params)) {
          str = str.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
        }
      }
      return str;
    },
    [lang]
  );

  const loc = useCallback((en: string, ar: string) => (lang === "ar" ? ar : en), [lang]);

  return (
    <I18nContext.Provider
      value={{ lang, dir: lang === "ar" ? "rtl" : "ltr", setLang, t, loc }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): Ctx {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    // Safe fallback (e.g. during isolated rendering)
    return {
      lang: "en",
      dir: "ltr",
      setLang: () => {},
      t: (k: string) => T[k]?.en ?? k,
      loc: (en: string) => en,
    };
  }
  return ctx;
}
