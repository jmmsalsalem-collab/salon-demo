"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function AskAIButton() {
  const { t } = useI18n();
  return (
    <Link
      href="/ai-assistant"
      className="group fixed bottom-6 z-40 flex items-center gap-2.5 rounded-full bg-espresso px-5 py-3.5 text-cream-50 shadow-soft ring-1 ring-gold-400/30 transition-all hover:ring-gold-400/60 ltr:right-6 rtl:left-6"
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        <Sparkles className="h-5 w-5 text-gold-400" />
      </span>
      <span className="text-sm font-medium">{t("nav.ai")}</span>
    </Link>
  );
}
