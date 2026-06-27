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

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/staff", label: "Staff", icon: Scissors },
  { href: "/services", label: "Services & Pricing", icon: Tag },
  { href: "/revenue", label: "Revenue", icon: TrendingUp },
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
  const aiActive = config.ai.enabled && config.ai.apiKey.trim().length > 0;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-charcoal/30 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gold-200/70 bg-gradient-to-b from-blush-100 via-cream-100 to-cream-50 transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 py-5">
          <Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blush-400 to-gold-300 text-sm font-semibold text-white shadow-soft">
              {config.name.charAt(0)}
            </span>
            <span className="serif text-xl font-semibold leading-tight text-charcoal">
              {config.name}
            </span>
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-charcoal-light hover:bg-white/60 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mx-5 mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-charcoal-muted">
          Management
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                  active
                    ? "bg-white text-blush-600 shadow-sm"
                    : "text-charcoal-light hover:bg-white/60 hover:text-charcoal"
                )}
              >
                <item.icon
                  className={cn(
                    "h-[18px] w-[18px]",
                    active ? "text-blush-500" : "text-charcoal-muted group-hover:text-blush-500"
                  )}
                  strokeWidth={1.75}
                />
                {item.label}
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gold-400" />
                )}
              </Link>
            );
          })}

          <div className="px-3 pb-1 pt-4 text-[11px] font-medium uppercase tracking-[0.18em] text-charcoal-muted">
            Intelligence
          </div>

          <Link
            href="/ai-assistant"
            onClick={onClose}
            className={cn(
              "group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-sm transition-all",
              isActive("/ai-assistant")
                ? "bg-white text-blush-600 shadow-sm"
                : "text-charcoal-light hover:bg-white/60 hover:text-charcoal"
            )}
          >
            <Sparkles
              className={cn(
                "h-[18px] w-[18px]",
                isActive("/ai-assistant") ? "text-gold-500" : "text-gold-500/80"
              )}
              strokeWidth={1.75}
            />
            AI Assistant
            <span
              className={cn(
                "ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                aiActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-gold-100 text-gold-700"
              )}
            >
              {aiActive ? "Active" : "Setup"}
            </span>
          </Link>
        </nav>

        {/* Footer / settings */}
        <div className="border-t border-gold-200/60 p-3">
          <Link
            href="/settings"
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
              isActive("/settings")
                ? "bg-white text-blush-600 shadow-sm"
                : "text-charcoal-light hover:bg-white/60 hover:text-charcoal"
            )}
          >
            <Settings className="h-[18px] w-[18px] text-charcoal-muted" strokeWidth={1.75} />
            Settings
          </Link>
        </div>
      </aside>
    </>
  );
}
