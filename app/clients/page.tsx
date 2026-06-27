"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Star, AlertTriangle } from "lucide-react";
import { PageHeader, SearchBox } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useConfig } from "@/lib/useConfig";
import { clients } from "@/lib/data";
import { currency } from "@/lib/format";
import { cn } from "@/lib/utils";

type Filter = "all" | "vip" | "overdue" | "new";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All clients" },
  { id: "vip", label: "VIP" },
  { id: "overdue", label: "Overdue" },
  { id: "new", label: "New" },
];

export default function ClientsPage() {
  const config = useConfig();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const stylistName = (id: string) =>
    config.stylists.find((s) => s.id === id)?.name ?? "—";

  const filtered = useMemo(() => {
    return clients
      .filter((c) => {
        if (filter === "vip") return c.tags.includes("VIP");
        if (filter === "overdue") return c.daysSince > 45 && !c.nextAppointment;
        if (filter === "new") return c.tags.some((t) => t.startsWith("New"));
        return true;
      })
      .filter((c) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.includes(q)
        );
      })
      .sort((a, b) => b.totalSpent - a.totalSpent);
  }, [query, filter]);

  return (
    <>
      <PageHeader
        title="Clients"
        subtitle={`${clients.length} clients · ${clients.filter((c) => c.tags.includes("VIP")).length} VIPs · ${clients.filter((c) => c.daysSince > 45 && !c.nextAppointment).length} overdue`}
      >
        <Button variant="primary" size="sm">
          Add client
        </Button>
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
        <SearchBox value={query} onChange={setQuery} placeholder="Search name, email, phone…" />
      </div>

      <Card className="overflow-hidden">
        {/* Desktop table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold-100 text-left text-xs uppercase tracking-wide text-charcoal-muted">
                <th className="px-5 py-3 font-medium">Client</th>
                <th className="px-3 py-3 font-medium">Last Visit</th>
                <th className="px-3 py-3 font-medium">Next Appt</th>
                <th className="px-3 py-3 font-medium">Visits</th>
                <th className="px-3 py-3 font-medium">Total Spent</th>
                <th className="px-3 py-3 font-medium">Stylist</th>
                <th className="px-3 py-3 font-medium">Points</th>
                <th className="px-3 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-100">
              {filtered.map((c) => (
                <tr key={c.id} className="group transition-colors hover:bg-cream-50">
                  <td className="px-5 py-3">
                    <Link href={`/clients/${c.id}`} className="flex items-center gap-3">
                      <Avatar name={c.name} vip={c.tags.includes("VIP")} />
                      <div className="min-w-0">
                        <p className="flex items-center gap-1.5 font-medium text-charcoal">
                          {c.name}
                          {c.tags.includes("VIP") && (
                            <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                          )}
                        </p>
                        <p className="truncate text-xs text-charcoal-muted">{c.email}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-charcoal-light">{c.lastVisit}</span>
                    <span
                      className={cn(
                        "ml-1.5 text-xs",
                        c.daysSince > 45 ? "text-rose-500" : "text-charcoal-muted"
                      )}
                    >
                      ({c.daysSince}d)
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    {c.nextAppointment ? (
                      <span className="text-charcoal-light">{c.nextAppointment}</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-rose-500">
                        <AlertTriangle className="h-3 w-3" /> none
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-charcoal-light">{c.totalVisits}</td>
                  <td className="px-3 py-3 font-medium text-charcoal">{currency(c.totalSpent)}</td>
                  <td className="px-3 py-3 text-charcoal-light">{stylistName(c.preferredStylistId).split(" ")[0]}</td>
                  <td className="px-3 py-3">
                    <span className="rounded-full bg-gold-50 px-2 py-0.5 text-xs font-medium text-gold-700">
                      {c.loyaltyPoints}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <Link
                      href={`/clients/${c.id}`}
                      className="inline-flex items-center text-charcoal-muted opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="divide-y divide-gold-100 lg:hidden">
          {filtered.map((c) => (
            <Link
              key={c.id}
              href={`/clients/${c.id}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-cream-50"
            >
              <Avatar name={c.name} vip={c.tags.includes("VIP")} />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 font-medium text-charcoal">
                  {c.name}
                  {c.tags.includes("VIP") && (
                    <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                  )}
                </p>
                <p className="text-xs text-charcoal-muted">
                  {c.totalVisits} visits · {currency(c.totalSpent)} · {c.lastVisit}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-charcoal-muted" />
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-charcoal-muted">
            No clients match your search.
          </p>
        )}
      </Card>
    </>
  );
}

function Avatar({ name, vip }: { name: string; vip?: boolean }) {
  const inits = name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  return (
    <span
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white",
        vip
          ? "bg-gradient-to-br from-gold-400 to-blush-400"
          : "bg-gradient-to-br from-blush-300 to-blush-400"
      )}
    >
      {inits}
    </span>
  );
}
