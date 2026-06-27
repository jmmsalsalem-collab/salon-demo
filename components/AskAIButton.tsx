"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AskAIButton() {
  return (
    <Link
      href="/ai-assistant"
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full bg-gradient-to-r from-charcoal to-charcoal-light px-5 py-3.5 text-cream-50 shadow-glow transition-transform hover:scale-105"
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        <Sparkles className="h-5 w-5 text-gold-300" />
        <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-gold-400 ring-2 ring-charcoal" />
      </span>
      <span className="text-sm font-medium">Ask AI</span>
    </Link>
  );
}
