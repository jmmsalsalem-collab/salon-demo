"use client";

import { useState } from "react";
import { Menu, Search } from "lucide-react";
import Sidebar from "./Sidebar";
import LanguageToggle from "./LanguageToggle";
import { useConfig } from "@/lib/useConfig";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const config = useConfig();

  return (
    <div className="min-h-screen">
      <Sidebar open={open} onClose={() => setOpen(false)} />

      <div className="ltr:lg:pl-64 rtl:lg:pr-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gold-100 bg-cream-50/85 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="rounded-lg p-2 text-charcoal hover:bg-cream-200 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="serif text-lg text-charcoal lg:hidden">{config.name}</span>
          </div>
          <LanguageToggle />
        </header>

        <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </div>
      </div>
    </div>
  );
}

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
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="serif text-3xl text-charcoal sm:text-[2.5rem] sm:leading-tight">
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-charcoal-light">{subtitle}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}

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
      <Search className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-muted ltr:left-3 rtl:right-3" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search…"}
        className="w-full rounded-xl border border-gold-200 bg-white py-2.5 text-sm text-charcoal outline-none placeholder:text-charcoal-muted focus:border-gold-400 ltr:pl-9 ltr:pr-3 rtl:pr-9 rtl:pl-3 sm:w-72"
      />
    </div>
  );
}
