"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Send, Lock, KeyRound, Check, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/AppShell";
import { useConfig } from "@/lib/useConfig";
import { AI_CONVERSATION, AI_SUGGESTIONS, AIBlock, AITurn } from "@/lib/aiDemo";
import { cn } from "@/lib/utils";

const toneMap: Record<string, string> = {
  rose: "text-rose-600",
  gold: "text-gold-700",
  emerald: "text-emerald-600",
  neutral: "text-charcoal",
};

export default function AIAssistantPage() {
  const config = useConfig();
  const active = config.ai.enabled && config.ai.apiKey.trim().length > 0;
  const [draft, setDraft] = useState("");

  return (
    <>
      <PageHeader
        title="Studio Luxe AI Agent"
        subtitle="Ask anything about your clients, bookings and revenue — in plain English."
      >
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium",
            active ? "bg-emerald-100 text-emerald-700" : "bg-gold-100 text-gold-700"
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", active ? "bg-emerald-500" : "bg-gold-500 animate-pulse")} />
          {active ? "Active" : "Add API Key to Activate"}
        </span>
      </PageHeader>

      <div className="overflow-hidden rounded-2xl border border-gold-100 bg-white/80 shadow-sm">
        {/* Chat header */}
        <div className="flex items-center gap-3 border-b border-gold-100 bg-gradient-to-r from-charcoal to-charcoal-light px-5 py-4">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-gold-300">
            <Sparkles className="h-5 w-5" />
            <span className={cn("absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-charcoal", active ? "bg-emerald-400" : "bg-gold-400")} />
          </span>
          <div>
            <p className="serif text-lg leading-none text-cream-50">Luna · AI Agent</p>
            <p className="mt-1 text-xs text-cream-100/70">
              {active ? "Connected · " + config.ai.model : "Demo preview · responses are examples"}
            </p>
          </div>
        </div>

        {/* Conversation */}
        <div className="space-y-6 bg-cream-50/40 px-4 py-6 sm:px-8">
          {AI_CONVERSATION.map((turn, i) => (
            <Turn key={i} turn={turn} />
          ))}
        </div>

        {/* Banner */}
        {!active ? (
          <div className="flex flex-col items-start gap-3 border-t border-gold-100 bg-gradient-to-r from-blush-50 to-gold-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gold-600 shadow-sm">
                <KeyRound className="h-4 w-4" />
              </span>
              <p className="text-sm text-charcoal-light">
                <span className="font-medium text-charcoal">Connect your API key in Settings</span> to activate live responses.
              </p>
            </div>
            <Link
              href="/settings"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-charcoal px-4 py-2 text-sm font-medium text-cream-50 transition-colors hover:bg-charcoal-light"
            >
              Add API key
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 border-t border-emerald-100 bg-emerald-50 px-5 py-3 text-sm text-emerald-700">
            <Check className="h-4 w-4" />
            Live AI is connected with {config.ai.model}.
          </div>
        )}

        {/* Composer */}
        <div className="border-t border-gold-100 bg-white p-4">
          {/* Suggestion chips */}
          <div className="mb-3 flex flex-wrap gap-2">
            {AI_SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setDraft(s)}
                disabled={!active}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs transition-colors",
                  active
                    ? "border-gold-200 bg-cream-50 text-charcoal-light hover:border-gold-400 hover:bg-gold-50"
                    : "cursor-not-allowed border-gold-100 bg-cream-50/50 text-charcoal-muted"
                )}
              >
                {s}
              </button>
            ))}
          </div>

          <div
            className={cn(
              "flex items-end gap-2 rounded-2xl border px-3 py-2",
              active ? "border-gold-200 bg-white focus-within:border-gold-400 focus-within:shadow-glow" : "border-gold-100 bg-cream-50/60"
            )}
          >
            {!active && <Lock className="mb-2 ml-1 h-4 w-4 shrink-0 text-charcoal-muted" />}
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              disabled={!active}
              placeholder={active ? "Ask about your salon…" : "Ask about your salon… (add an API key to start)"}
              className="flex-1 bg-transparent py-1.5 text-sm text-charcoal outline-none placeholder:text-charcoal-muted disabled:cursor-not-allowed"
            />
            <button
              disabled={!active || !draft.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blush-500 to-blush-400 text-white transition-transform hover:scale-105 disabled:opacity-40"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-center text-[11px] text-charcoal-muted">
            {active
              ? "Demo template · connect a backend to query live salon data."
              : "Preview mode · the conversation above shows example AI answers."}
          </p>
        </div>
      </div>
    </>
  );
}

function Turn({ turn }: { turn: AITurn }) {
  if (turn.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[78%] rounded-2xl rounded-br-sm bg-gradient-to-br from-blush-500 to-blush-400 px-4 py-2.5 text-sm text-white shadow-sm">
          {turn.content}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-charcoal to-charcoal-light text-gold-300">
        <Sparkles className="h-4 w-4" />
      </span>
      <div className="max-w-[82%] space-y-3 rounded-2xl rounded-tl-sm border border-gold-100 bg-white px-4 py-3.5 shadow-sm">
        {turn.blocks?.map((b, i) => (
          <Block key={i} block={b} />
        ))}
      </div>
    </div>
  );
}

function Block({ block }: { block: AIBlock }) {
  if (block.type === "text") {
    return <p className="text-sm leading-relaxed text-charcoal-light">{block.text}</p>;
  }
  if (block.type === "list") {
    return (
      <div className="overflow-hidden rounded-xl border border-gold-100">
        {block.items.map((item, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-3 px-3.5 py-2.5",
              i % 2 === 0 ? "bg-cream-50/60" : "bg-white"
            )}
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-charcoal">{item.primary}</p>
              {item.secondary && (
                <p className="truncate text-xs text-charcoal-muted">{item.secondary}</p>
              )}
            </div>
            {item.trailing && (
              <span className={cn("shrink-0 text-sm font-semibold", toneMap[item.tone ?? "neutral"])}>
                {item.trailing}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }
  // bars
  return (
    <div className="space-y-2">
      {block.items.map((item, i) => (
        <div key={i}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-charcoal-light">{item.label}</span>
            <span className="font-medium text-charcoal">{item.display}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-cream-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blush-400 to-gold-400"
              style={{ width: `${item.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
