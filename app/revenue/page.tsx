"use client";

import { DollarSign, Scissors, ShoppingBag, TrendingUp, AlertCircle } from "lucide-react";

import { PageHeader } from "@/components/AppShell";
import { Card, CardHeader } from "@/components/ui/Card";
import { MonthlyRevenueChart } from "@/components/charts";
import { useConfig } from "@/lib/useConfig";
import { useI18n } from "@/lib/i18n";
import { currency } from "@/lib/format";
import {
  revenueMonthly,
  revenueDaily,
  servicesBreakdown,
  retailProducts,
  clients,
} from "@/lib/data";

const SERVICES_COLOR = "#C9A96E";
const RETAIL_COLOR = "#A6766A";

export default function RevenuePage() {
  const { t, loc } = useI18n();
  const config = useConfig();

  const june = revenueMonthly[revenueMonthly.length - 1];
  const monthTotal = june.services + june.retail;
  const dailySum = revenueDaily.reduce((acc, d) => acc + d.revenue, 0);
  const avgDaily = Math.round(dailySum / 7);

  const kpis = [
    { label: t("rv.thisMonth"), value: currency(monthTotal), icon: DollarSign },
    { label: t("rv.serviceRev"), value: currency(june.services), icon: Scissors },
    { label: t("rv.retail"), value: currency(june.retail), icon: ShoppingBag },
    { label: t("rv.avgDaily"), value: currency(avgDaily), icon: TrendingUp },
  ];

  const maxService = Math.max(...servicesBreakdown.map((s) => s.value));

  const stylists = [...config.stylists].sort(
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
      <PageHeader title={t("rv.title")} subtitle={t("rv.subtitle")} />

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
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-200 bg-gold-50 text-gold-600">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Monthly chart */}
      <Card className="mt-6">
        <CardHeader title={t("rv.monthly")} subtitle={t("rv.servicesVsRetail")} />
        <div className="p-4">
          <MonthlyRevenueChart
            data={revenueMonthly}
            servicesLabel={t("rv.services")}
            retailLabel={t("rv.retailLegend")}
          />
          <div className="mt-3 flex items-center justify-center gap-6 text-xs text-charcoal-light">
            <span className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: SERVICES_COLOR }}
              />
              {t("rv.services")}
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: RETAIL_COLOR }}
              />
              {t("rv.retailLegend")}
            </span>
          </div>
        </div>
      </Card>

      {/* Service type + stylist */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title={t("rv.byService")} subtitle={t("rv.whereFrom")} />
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
                      {t(`cat.${s.category}`)}
                    </span>
                    <span className="text-end text-sm font-medium text-charcoal">
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
          <CardHeader title={t("rv.byStylist")} subtitle={t("rv.topEarners")} />
          <div className="space-y-4 px-5 py-4">
            {stylists.map((st) => {
              const pctNum = (st.revenueThisMonth / maxStylist) * 100;
              return (
                <div key={st.id}>
                  <div className="mb-1.5 flex items-end justify-between gap-3">
                    <span>
                      <span className="block text-sm text-charcoal">
                        {loc(st.name, st.nameAr)}
                      </span>
                      <span className="text-xs text-charcoal-muted">
                        {t(`role.${st.role}`)}
                      </span>
                    </span>
                    <span className="text-end text-sm font-medium text-charcoal">
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
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title={t("rv.topProducts")} subtitle={t("rv.bestSellers")} />
          <div className="px-5 py-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-charcoal-muted">
                  <th className="pb-2 text-start font-medium">{t("rv.product")}</th>
                  <th className="pb-2 text-end font-medium">{t("rv.units")}</th>
                  <th className="pb-2 text-end font-medium">{t("rv.revenueCol")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-100">
                {retailProducts.map((p) => (
                  <tr key={p.name}>
                    <td className="py-2.5 text-charcoal">{loc(p.name, p.nameAr)}</td>
                    <td className="py-2.5 text-end text-charcoal-light">{p.units}</td>
                    <td className="py-2.5 text-end font-medium text-charcoal">
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
            title={t("rv.outstanding")}
            subtitle={t("rv.unpaid")}
            action={
              <span className="serif text-lg font-semibold text-rose-600">
                {currency(outstandingTotal)}
              </span>
            }
          />
          <div className="px-5 py-4">
            {outstanding.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-200 bg-gold-50 text-gold-600">
                  <AlertCircle className="h-5 w-5" />
                </span>
                <p className="text-sm text-charcoal-muted">
                  {t("rv.noOutstanding")}
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
                        {loc(c.name, c.nameAr)}
                      </span>
                      <span className="text-xs text-charcoal-muted">
                        {t("rv.lastVisit", { d: c.lastVisit })}
                      </span>
                    </span>
                    <span className="text-end text-sm font-semibold text-rose-600">
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
