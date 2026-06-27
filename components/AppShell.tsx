"use client";

import { useState } from "react";
import { Menu, Bell, Search } from "lucide-react";
import Sidebar from "./Sidebar";
import { useConfig } from "@/lib/useConfig";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const config = useConfig();

  return (
    <div className="min-h-screen">
      <Sidebar open={open} onClose={() => setOpen(false)} />

      <div className="lg:pl-64">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gold-100 bg-cream-50/85 px-4 py-3 backdrop-blur-md lg:hidden">
          <button
            onClick={() => setOpen(true)}
            className="rounded-lg p-2 text-charcoal hover:bg-blush-50"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="serif text-lg font-semibold text-charcoal">
            {config.name}
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blush-400 to-gold-300 text-xs font-semibold text-white">
            {config.name.charAt(0)}
          </span>
        </header>

        <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </div>
      </div>
    </div>
  );
}

/* Reusable page header used across pages */
export function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="serif text-3xl font-semibold text-charcoal sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-charcoal-light">{subtitle}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

/* Small inline search box */
export function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-muted" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search…"}
        className="w-full rounded-xl border border-gold-200 bg-white py-2.5 pl-9 pr-3 text-sm text-charcoal outline-none placeholder:text-charcoal-muted focus:border-gold-400 focus:shadow-glow sm:w-64"
      />
    </div>
  );
}

export { Bell };
