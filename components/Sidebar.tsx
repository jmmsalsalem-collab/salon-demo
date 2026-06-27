"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Scissors,
  Tag,
  TrendingUp,
  Sparkles,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useConfig } from "@/lib/useConfig";
import { useI18n } from "@/lib/i18n";

const nav = [
  { href: "/", key: "nav.dashboard", icon: LayoutDashboard },
  { href: "/appointments", key: "nav.appointments", icon: CalendarDays },
  { href: "/clients", key: "nav.clients", icon: Users },
  { href: "/staff", key: "nav.staff", icon: Scissors },
  { href: "/services", key: "nav.services", icon: Tag },
  { href: "/revenue", key: "nav.revenue", icon: TrendingUp },
];

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const config = useConfig();
  const { t } = useI18n();
  const aiActive = config.ai.enabled && config.ai.apiKey.trim().length > 0;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const item = (href: string, label: string, Icon: any, opts?: { badge?: React.ReactNode; gold?: boolean }) => {
    const active = isActive(href);
    return (
      <Link
        href={href}
        onClick={onClose}
        className={cn(
          "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
          active
            ? "bg-gold-400 font-medium text-espresso shadow-sm"
            : "text-cream-200/75 hover:bg-white/[0.06] hover:text-cream-50"
        )}
      >
        <Icon
          className={cn(
            "h-[18px] w-[18px]",
            active ? "text-espresso" : opts?.gold ? "text-gold-400" : "text-cream-200/60 group-hover:text-gold-300"
          )}
          strokeWidth={1.75}
        />
        {label}
        {opts?.badge && <span className="ms-auto">{opts.badge}</span>}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-espresso/40 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed inset-y-0 z-50 flex w-64 flex-col bg-espresso transition-transform duration-300 lg:!translate-x-0",
          "ltr:left-0 ltr:border-r rtl:right-0 rtl:border-l border-white/5",
          open
            ? "translate-x-0"
            : "ltr:-translate-x-full rtl:translate-x-full"
        )}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 py-5">
          <Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-400 text-sm font-semibold text-espresso">
              {config.name.charAt(0)}
            </span>
            <span className="serif text-xl text-cream-50">{config.name}</span>
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-cream-200/70 hover:bg-white/10 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mx-5 mb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-gold-400/70">
          {t("nav.management")}
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          {nav.map((n) => (
            <div key={n.href}>{item(n.href, t(n.key), n.icon)}</div>
          ))}

          <div className="px-3 pb-1 pt-5 text-[10px] font-medium uppercase tracking-[0.22em] text-gold-400/70">
            {t("nav.intelligence")}
          </div>

          {item("/ai-assistant", t("nav.ai"), Sparkles, {
            gold: true,
            badge: (
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                  aiActive ? "bg-emerald-400/20 text-emerald-300" : "bg-gold-400/20 text-gold-300"
                )}
              >
                {aiActive ? t("state.active") : t("state.setup")}
              </span>
            ),
          })}
        </nav>

        {/* Footer / settings */}
        <div className="border-t border-white/5 p-3">
          {item("/settings", t("nav.settings"), Settings)}
        </div>
      </aside>
    </>
  );
}
