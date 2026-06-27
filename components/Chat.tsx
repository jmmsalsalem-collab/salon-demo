"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "What suits a round face shape?",
  "Low-maintenance color ideas?",
  "Balayage or highlights for me?",
  "Help me pick a stylist",
];

const GREETING =
  "Hi, I'm Luna ✨ your personal beauty advisor at Studio Luxe. Tell me about your hair — your current style, how much time you like to spend on it, and the look you're dreaming of — and I'll help you find the perfect service and stylist.";

export default function Chat({ variant = "full" }: { variant?: "full" | "widget" }) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    append,
  } = useChat({ api: "/api/chat" });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const empty = messages.length === 0;

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div
        ref={scrollRef}
        className={cn(
          "thin-scroll flex-1 overflow-y-auto px-4 py-5 sm:px-6",
          variant === "widget" ? "space-y-4" : "space-y-5"
        )}
      >
        {/* Greeting bubble */}
        <Bubble role="assistant">{GREETING}</Bubble>

        {messages.map((m) => (
          <Bubble key={m.id} role={m.role === "user" ? "user" : "assistant"}>
            {m.content}
          </Bubble>
        ))}

        {isLoading &&
          messages[messages.length - 1]?.role === "user" && (
            <div className="flex items-center gap-1.5 pl-1">
              <Avatar />
              <div className="flex gap-1 rounded-2xl rounded-tl-sm bg-cream-100 px-4 py-3">
                <span className="typing-dot h-2 w-2 rounded-full bg-blush-400" />
                <span className="typing-dot h-2 w-2 rounded-full bg-blush-400" />
                <span className="typing-dot h-2 w-2 rounded-full bg-blush-400" />
              </div>
            </div>
          )}

        {error && (
          <div className="rounded-xl border border-blush-200 bg-blush-50 px-4 py-3 text-sm text-blush-700">
            Luna is resting right now. Please make sure the salon&apos;s
            ANTHROPIC_API_KEY is configured, then try again.
          </div>
        )}

        {empty && (
          <div className="flex flex-wrap gap-2 pt-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => append({ role: "user", content: s })}
                className="rounded-full border border-gold-200 bg-cream-50 px-3.5 py-2 text-xs text-charcoal-light transition-colors hover:border-gold-400 hover:bg-gold-50"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-gold-100 bg-cream-50/70 p-3 sm:p-4"
      >
        <div className="flex items-end gap-2 rounded-2xl border border-gold-200 bg-white px-3 py-2 shadow-sm focus-within:border-gold-400 focus-within:shadow-glow">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask Luna about your perfect look…"
            className="flex-1 bg-transparent py-1.5 text-sm text-charcoal outline-none placeholder:text-charcoal-muted"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blush-500 to-blush-400 text-white transition-transform hover:scale-105 disabled:opacity-40"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-charcoal-muted">
          <Sparkles className="mr-1 inline h-3 w-3 text-gold-400" />
          Luna is an AI advisor · responses are suggestions, not appointments
        </p>
      </form>
    </div>
  );
}

function Bubble({
  role,
  children,
}: {
  role: "user" | "assistant";
  children: React.ReactNode;
}) {
  const isUser = role === "user";
  return (
    <div
      className={cn(
        "flex items-end gap-2",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {!isUser && <Avatar />}
      <div
        className={cn(
          "max-w-[82%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "rounded-br-sm bg-gradient-to-br from-blush-500 to-blush-400 text-white"
            : "rounded-tl-sm bg-cream-100 text-charcoal"
        )}
      >
        {children}
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-blush-400 text-[11px] font-semibold text-white">
      L
    </span>
  );
}
