"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Star, AlertTriangle } from "lucide-react";
import { PageHeader, SearchBox } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useConfig } from "@/lib/useConfig";
import { useI18n } from "@/lib/i18n";
import { clients } from "@/lib/data";
import { currency } from "@/lib/format";
import { cn } from "@/lib/utils";

type Filter = "all" | "vip" | "overdue" | "new";

export default function ClientsPage() {
  const config = useConfig();
  const { t, loc, dir } = useI18n();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const Chevron = dir === "rtl" ? ChevronLeft : ChevronRight;

  const FILTERS: { id: Filter; label: string }[] = [
    { id: "all", label: t("cl.allClients") },
    { id: "vip", label: t("cl.vip") },
    { id: "overdue", label: t("cl.overdue") },
    { id: "new", label: t("cl.new") },
  ];

  const stylistName = (id: string) => {
    const s = config.stylists.find((x) => x.id === id);
    return s ? loc(s.name.split(" ")[0], s.nameAr.split(" ")[0]) : "—";
  };

  const vipCount = clients.filter((c) => c.tags.includes("VIP")).length;
  const overdueCount = clients.filter((c) => c.daysSince > 45 && !c.nextAppointment).length;

  const filtered = useMemo(() => {
    return clients
      .filter((c) => {
        if (filter === "vip") return c.tags.includes("VIP");
        if (filter === "overdue") return c.daysSince > 45 && !c.nextAppointment;
        if (filter === "new") return c.tags.some((x) => x.startsWith("New"));
        return true;
      })
      .filter((c) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.nameAr.includes(query.trim()) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.includes(q)
        );
      })
      .sort((a, b) => b.totalSpent - a.totalSpent);
  }, [query, filter]);

  return (
    <>
      <PageHeader
        title={t("cl.title")}
        subtitle={t("cl.summary", { n: clients.length, vip: vipCount, od: overdueCount })}
      >
        <Button variant="gold" size="sm">{t("c.addClient")}</Button>
      </PageHeader>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm transition-colors",
                filter === f.id
                  ? "bg-charcoal text-cream-50"
                  : "border border-gold-200 bg-white text-charcoal-light hover:border-gold-400"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <SearchBox value={query} onChange={setQuery} placeholder={t("cl.searchPh")} />
      </div>

      <Card className="overflow-hidden">
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold-100 text-xs uppercase tracking-wide text-charcoal-muted ltr:text-left rtl:text-right">
                <th className="px-5 py-3 font-medium">{t("cl.client")}</th>
                <th className="px-3 py-3 font-medium">{t("cl.lastVisit")}</th>
                <th className="px-3 py-3 font-medium">{t("cl.nextAppt")}</th>
                <th className="px-3 py-3 font-medium">{t("cl.visits")}</th>
                <th className="px-3 py-3 font-medium">{t("cl.totalSpent")}</th>
                <th className="px-3 py-3 font-medium">{t("cl.stylist")}</th>
                <th className="px-3 py-3 font-medium">{t("cl.points")}</th>
                <th className="px-3 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-100">
              {filtered.map((c) => (
                <tr key={c.id} className="group transition-colors hover:bg-cream-50">
                  <td className="px-5 py-3.5">
                    <Link href={`/clients/${c.id}`} className="flex items-center gap-3">
                      <Avatar en={c.name} vip={c.tags.includes("VIP")} />
                      <div className="min-w-0">
                        <p className="flex items-center gap-1.5 font-medium text-charcoal">
                          {loc(c.name, c.nameAr)}
                          {c.tags.includes("VIP") && <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />}
                        </p>
                        <p className="truncate text-xs text-charcoal-muted">{c.phone}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="text-charcoal-light">{c.lastVisit}</span>
                    <span className={cn("text-xs ltr:ml-1.5 rtl:mr-1.5", c.daysSince > 45 ? "text-rose-500" : "text-charcoal-muted")}>
                      ({c.daysSince}d)
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    {c.nextAppointment ? (
                      <span className="text-charcoal-light">{c.nextAppointment}</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-rose-500">
                        <AlertTriangle className="h-3 w-3" /> {t("c.none")}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3.5 text-charcoal-light">{c.totalVisits}</td>
                  <td className="px-3 py-3.5 font-medium text-charcoal">{currency(c.totalSpent)}</td>
                  <td className="px-3 py-3.5 text-charcoal-light">{stylistName(c.preferredStylistId)}</td>
                  <td className="px-3 py-3.5">
                    <span className="rounded-full bg-gold-50 px-2 py-0.5 text-xs font-medium text-gold-700">
                      {c.loyaltyPoints}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 ltr:text-right rtl:text-left">
                    <Link href={`/clients/${c.id}`} className="inline-flex text-charcoal-muted opacity-0 transition-opacity group-hover:opacity-100">
                      <Chevron className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="divide-y divide-gold-100 lg:hidden">
          {filtered.map((c) => (
            <Link key={c.id} href={`/clients/${c.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-cream-50">
              <Avatar en={c.name} vip={c.tags.includes("VIP")} />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 font-medium text-charcoal">
                  {loc(c.name, c.nameAr)}
                  {c.tags.includes("VIP") && <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />}
                </p>
                <p className="text-xs text-charcoal-muted">
                  {c.totalVisits} · {currency(c.totalSpent)} · {c.lastVisit}
                </p>
              </div>
              <Chevron className="h-4 w-4 shrink-0 text-charcoal-muted" />
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-charcoal-muted">{t("cl.noMatch")}</p>
        )}
      </Card>
    </>
  );
}

function Avatar({ en, vip }: { en: string; vip?: boolean }) {
  const inits = en.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  return (
    <span
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
        vip ? "bg-gold-400 text-espresso" : "border border-gold-200 bg-gold-50 text-gold-700"
      )}
    >
      {inits}
    </span>
  );
}
