"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Chat from "./Chat";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // The /advisor page already shows a full chat — hide the floating widget there.
  if (pathname === "/advisor") return null;

  return (
    <>
      {/* Panel */}
      <div
        className={cn(
          "fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-[400px] origin-bottom-right transition-all duration-300 sm:right-6",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        )}
      >
        <div className="flex h-[min(560px,70vh)] flex-col overflow-hidden rounded-3xl border border-gold-100 bg-white shadow-glow">
          <div className="flex items-center justify-between bg-gradient-to-r from-blush-500 to-blush-400 px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                <Sparkles className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="serif text-lg leading-none">Luna</p>
                <p className="text-xs text-white/80">AI Style Advisor</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-1.5 transition-colors hover:bg-white/20"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="min-h-0 flex-1 bg-cream-50">
            <Chat variant="widget" />
          </div>
        </div>
      </div>

      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed bottom-5 right-4 z-50 flex h-15 items-center gap-2.5 rounded-full bg-gradient-to-r from-blush-500 to-blush-400 px-5 py-4 text-white shadow-glow transition-transform hover:scale-105 sm:right-6",
          open && "scale-90"
        )}
        aria-label="Open AI style advisor"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        {!open && (
          <span className="hidden text-sm font-medium sm:inline">
            Ask Luna
          </span>
        )}
      </button>
    </>
  );
}
