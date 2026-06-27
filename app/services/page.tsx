"use client";

import { useMemo, useState } from "react";
import {
  Scissors,
  Palette,
  Sparkles,
  Hand,
  Eye,
  Clock,
  Tag,
  type LucideIcon,
} from "lucide-react";

import { PageHeader } from "@/components/AppShell";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useConfig } from "@/lib/useConfig";
import { useI18n } from "@/lib/i18n";
import { pct } from "@/lib/format";
import { CATEGORY_ORDER } from "@/lib/salon";
import type { ServiceCategory } from "@/lib/salon";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS: Record<ServiceCategory, LucideIcon> = {
  Cut: Scissors,
  Color: Palette,
  Treatments: Sparkles,
  Nails: Hand,
  Lashes: Eye,
};

const FALLBACK_ICON: LucideIcon = Tag;

export default function ServicesPage() {
  const config = useConfig();
  const { t, loc } = useI18n();
  const services = config.services;
  const [selected, setSelected] = useState<string>("All");

  const filters: string[] = ["All", ...CATEGORY_ORDER];

  const visible = useMemo(
    () =>
      selected === "All"
        ? services
        : services.filter((s) => s.category === selected),
    [services, selected],
  );

  const groups = useMemo(
    () =>
      CATEGORY_ORDER.map((category) => ({
        category,
        items: visible.filter((s) => s.category === category),
      })).filter((g) => g.items.length > 0),
    [visible],
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title={t("sv.title")}
        subtitle={t("sv.subtitle", {
          n: services.length,
          m: new Set(services.map((s) => s.category)).size,
        })}
      >
        <Button href="/settings" variant="outline" size="sm">
          {t("c.editInSettings")}
        </Button>
      </PageHeader>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const active = selected === filter;
          const label = filter === "All" ? t("c.all") : t(`cat.${filter}`);
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setSelected(filter)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm transition-colors",
                active
                  ? "bg-charcoal text-cream-50"
                  : "border border-gold-200 bg-white text-charcoal-light hover:border-gold-400",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Grouped service cards */}
      <div className="space-y-6">
        {groups.map(({ category, items }) => {
          const Icon = CATEGORY_ICONS[category] ?? FALLBACK_ICON;
          return (
            <Card key={category} className="overflow-hidden">
              <CardHeader
                title={t(`cat.${category}`)}
                subtitle={`${items.length} ${t("sv.services")}`}
              />

              {/* Desktop table */}
              <div className="hidden lg:block">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gold-100 text-start text-xs uppercase tracking-wide text-charcoal-muted">
                      <th className="pb-3 ps-1 text-start font-normal">
                        {t("sv.service")}
                      </th>
                      <th className="pb-3 text-start font-normal">
                        {t("sv.duration")}
                      </th>
                      <th className="pb-3 text-start font-normal">
                        {t("sv.commission")}
                      </th>
                      <th className="pb-3 pe-1 text-end font-normal">
                        {t("sv.price")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold-100">
                    {items.map((s) => (
                      <tr key={s.id} className="align-middle">
                        <td className="py-3.5 ps-1">
                          <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold-200 bg-gold-50 text-gold-600">
                              <Icon className="h-5 w-5" />
                            </span>
                            <span className="font-medium text-charcoal">
                              {loc(s.name, s.nameAr)}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5">
                          <span className="inline-flex items-center gap-1.5 text-charcoal-light">
                            <Clock className="h-4 w-4 text-charcoal-muted" />
                            {`${s.duration} ${t("sv.min")}`}
                          </span>
                        </td>
                        <td className="py-3.5">
                          <span className="inline-flex items-center rounded-full bg-gold-50 px-2 py-0.5 text-xs text-gold-700">
                            {`${pct(s.commission)} ${t("sv.commissionLabel")}`}
                          </span>
                        </td>
                        <td className="py-3.5 pe-1 text-end font-medium text-charcoal">
                          {s.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile stacked rows */}
              <ul className="divide-y divide-gold-100 lg:hidden">
                {items.map((s) => (
                  <li key={s.id} className="flex items-center gap-3 py-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold-200 bg-gold-50 text-gold-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="truncate font-medium text-charcoal">
                          {loc(s.name, s.nameAr)}
                        </p>
                        <span className="shrink-0 font-medium text-charcoal">
                          {s.price}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                        <span className="inline-flex items-center gap-1 text-charcoal-light">
                          <Clock className="h-3.5 w-3.5 text-charcoal-muted" />
                          {`${s.duration} ${t("sv.min")}`}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-gold-50 px-2 py-0.5 text-gold-700">
                          {`${pct(s.commission)} ${t("sv.commissionLabel")}`}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
