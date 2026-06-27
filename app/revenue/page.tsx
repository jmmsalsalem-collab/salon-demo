import { DollarSign, Scissors, ShoppingBag, TrendingUp, AlertCircle } from "lucide-react";

import { PageHeader } from "@/components/AppShell";
import { Card, CardHeader } from "@/components/ui/Card";
import { MonthlyRevenueChart } from "@/components/charts";
import { currency } from "@/lib/format";
import { DEFAULT_CONFIG } from "@/lib/salon";
import {
  revenueMonthly,
  revenueDaily,
  servicesBreakdown,
  retailProducts,
  clients,
} from "@/lib/data";

const SERVICES_COLOR = "#d76a55";
const RETAIL_COLOR = "#d8a948";

export default function RevenuePage() {
  const current = revenueMonthly[revenueMonthly.length - 1];
  const monthTotal = current.services + current.retail;
  const dailySum = revenueDaily.reduce((acc, d) => acc + d.revenue, 0);
  const avgDaily = Math.round(dailySum / 7);

  const kpis = [
    {
      label: "Revenue This Month",
      value: currency(monthTotal),
      icon: DollarSign,
      tint: "bg-blush-50 text-blush-600",
    },
    {
      label: "Service Revenue",
      value: currency(current.services),
      icon: Scissors,
      tint: "bg-gold-50 text-gold-700",
    },
    {
      label: "Retail Sales",
      value: currency(current.retail),
      icon: ShoppingBag,
      tint: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Avg Daily (7d)",
      value: currency(avgDaily),
      icon: TrendingUp,
      tint: "bg-cream-100 text-charcoal-light",
    },
  ];

  const maxService = Math.max(...servicesBreakdown.map((s) => s.value));

  const stylists = [...DEFAULT_CONFIG.stylists].sort(
    (a, b) => b.revenueThisMonth - a.revenueThisMonth
  );
  const maxStylist = Math.max(...stylists.map((s) => s.revenueThisMonth));

  const outstanding = clients.filter((c) => c.outstanding);
  const outstandingTotal = outstanding.reduce(
    (acc, c) => acc + (c.outstanding ?? 0),
    0
  );

  return (
    <div>
      <PageHeader
        title="Revenue"
        subtitle="Breakdown by service, stylist and retail"
      />

      {/* KPI row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-charcoal-muted">
                    {kpi.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-charcoal">
                    {kpi.value}
                  </p>
                </div>
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${kpi.tint}`}
                >
                  <Icon className="h-4 w-4" />
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Monthly chart */}
      <Card className="mt-6">
        <CardHeader
          title="Monthly revenue"
          subtitle="Services vs. retail · last 6 months"
        />
        <div className="p-4">
          <MonthlyRevenueChart data={revenueMonthly} />
          <div className="mt-3 flex items-center justify-center gap-6 text-xs text-charcoal-light">
            <span className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: SERVICES_COLOR }}
              />
              Services
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: RETAIL_COLOR }}
              />
              Retail
            </span>
          </div>
        </div>
      </Card>

      {/* Service type + stylist */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="Revenue by service type"
            subtitle="Where the money comes from"
          />
          <div className="space-y-4 px-5 py-4">
            {servicesBreakdown.map((s) => {
              const pctNum = (s.value / maxService) * 100;
              return (
                <div key={s.category}>
                  <div className="mb-1.5 flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-sm text-charcoal">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      {s.category}
                    </span>
                    <span className="text-sm font-medium text-charcoal">
                      {currency(s.value)}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-cream-100">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${pctNum}%`, backgroundColor: s.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Revenue by stylist"
            subtitle="Top earners this month"
          />
          <div className="space-y-4 px-5 py-4">
            {stylists.map((st) => {
              const pctNum = (st.revenueThisMonth / maxStylist) * 100;
              return (
                <div key={st.id}>
                  <div className="mb-1.5 flex items-end justify-between gap-3">
                    <span>
                      <span className="block text-sm text-charcoal">
                        {st.name}
                      </span>
                      <span className="text-xs text-charcoal-muted">
                        {st.role}
                      </span>
                    </span>
                    <span className="text-sm font-medium text-charcoal">
                      {currency(st.revenueThisMonth)}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-cream-100">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${pctNum}%`, backgroundColor: st.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Retail + outstanding */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="Top retail products"
            subtitle="Best sellers this month"
          />
          <div className="px-5 py-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-charcoal-muted">
                  <th className="pb-2 text-left font-medium">Product</th>
                  <th className="pb-2 text-right font-medium">Units</th>
                  <th className="pb-2 text-right font-medium">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-100">
                {retailProducts.map((p) => (
                  <tr key={p.name}>
                    <td className="py-2.5 text-charcoal">{p.name}</td>
                    <td className="py-2.5 text-right text-charcoal-light">
                      {p.units}
                    </td>
                    <td className="py-2.5 text-right font-medium text-emerald-600">
                      {currency(p.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Outstanding balances"
            subtitle="Unpaid client balances"
            action={
              <span className="serif text-lg font-semibold text-rose-600">
                {currency(outstandingTotal)}
              </span>
            }
          />
          <div className="px-5 py-4">
            {outstanding.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <AlertCircle className="h-5 w-5" />
                </span>
                <p className="text-sm text-charcoal">All balances settled</p>
                <p className="text-xs text-charcoal-muted">
                  No clients have an outstanding balance.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gold-100">
                {outstanding.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-center justify-between gap-3 py-3"
                  >
                    <span>
                      <span className="block text-sm text-charcoal">
                        {c.name}
                      </span>
                      <span className="text-xs text-charcoal-muted">
                        last visit {c.lastVisit}
                      </span>
                    </span>
                    <span className="text-sm font-semibold text-rose-600">
                      {currency(c.outstanding ?? 0)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
