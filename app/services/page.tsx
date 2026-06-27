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
import { CATEGORY_ORDER } from "@/lib/salon";
import type { ServiceCategory } from "@/lib/salon";
import { pct } from "@/lib/format";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS: Record<ServiceCategory, LucideIcon> = {
  Cut: Scissors,
  Color: Palette,
  Treatments: Sparkles,
  Nails: Hand,
  Lashes: Eye,
};

export default function ServicesPage() {
  const config = useConfig();
  const services = config.services;
  const [selected, setSelected] = useState<string>("All");

  const categoryCount = useMemo(
    () => new Set(services.map((s) => s.category)).size,
    [services],
  );

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
        title="Services & Pricing"
        subtitle={`${services.length} services across ${categoryCount} categories`}
      >
        <Button href="/settings" variant="outline" size="sm">
          Edit in Settings
        </Button>
      </PageHeader>

      {/* Category filter row */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const active = selected === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setSelected(filter)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "bg-charcoal text-cream-50"
                  : "border border-gold-200 bg-white text-charcoal-light hover:border-gold-400",
              )}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Grouped service cards */}
      <div className="space-y-6">
        {groups.map(({ category, items }) => {
          const Icon = CATEGORY_ICONS[category];
          return (
            <Card key={category} className="overflow-hidden">
              <CardHeader
                title={category}
                subtitle={`${items.length} ${
                  items.length === 1 ? "service" : "services"
                }`}
              />

              {/* Desktop table */}
              <div className="hidden md:block">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs font-medium uppercase tracking-wide text-charcoal-muted">
                      <th className="pb-3 pl-1 font-medium">Service</th>
                      <th className="pb-3 font-medium">Duration</th>
                      <th className="pb-3 font-medium">Commission</th>
                      <th className="pb-3 pr-1 text-right font-medium">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold-100">
                    {items.map((service) => (
                      <tr key={service.id} className="align-middle">
                        <td className="py-3 pl-1">
                          <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blush-100 to-gold-100 text-blush-600">
                              <Icon className="h-5 w-5" />
                            </span>
                            <span className="font-medium text-charcoal">
                              {service.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="inline-flex items-center gap-1.5 text-charcoal-light">
                            <Clock className="h-4 w-4 text-charcoal-muted" />
                            {service.duration} min
                          </span>
                        </td>
                        <td className="py-3">
                          <span className="inline-flex items-center gap-1 rounded-full bg-gold-50 px-2 py-0.5 text-xs text-gold-700">
                            <Tag className="h-3 w-3" />
                            {pct(service.commission)} commission
                          </span>
                        </td>
                        <td className="py-3 pr-1 text-right font-medium text-charcoal">
                          {service.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile stacked rows */}
              <ul className="divide-y divide-gold-100 md:hidden">
                {items.map((service) => (
                  <li key={service.id} className="flex items-center gap-3 py-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blush-100 to-gold-100 text-blush-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-charcoal">
                        {service.name}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                        <span className="inline-flex items-center gap-1 text-charcoal-light">
                          <Clock className="h-3.5 w-3.5 text-charcoal-muted" />
                          {service.duration} min
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-gold-50 px-2 py-0.5 text-gold-700">
                          <Tag className="h-3 w-3" />
                          {pct(service.commission)} commission
                        </span>
                      </div>
                    </div>
                    <span className="shrink-0 font-medium text-charcoal">
                      {service.price}
                    </span>
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
