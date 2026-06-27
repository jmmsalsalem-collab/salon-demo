"use client";

import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function LanguageToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div className="inline-flex items-center rounded-full border border-gold-200 bg-white p-0.5 text-sm">
      <button
        onClick={() => setLang("en")}
        className={cn(
          "rounded-full px-3 py-1 transition-colors",
          lang === "en" ? "bg-charcoal text-cream-50" : "text-charcoal-light hover:text-charcoal"
        )}
      >
        EN
      </button>
      <button
        onClick={() => setLang("ar")}
        className={cn(
          "rounded-full px-3 py-1 font-ar transition-colors",
          lang === "ar" ? "bg-charcoal text-cream-50" : "text-charcoal-light hover:text-charcoal"
        )}
      >
        عربي
      </button>
    </div>
  );
}
