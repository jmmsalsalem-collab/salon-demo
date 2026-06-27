"use client";

import { PageHeader } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useConfig } from "@/lib/useConfig";
import { useI18n } from "@/lib/i18n";
import { currency, pct } from "@/lib/format";
import { cn } from "@/lib/utils";
import { TrendingUp, Users, Percent } from "lucide-react";

export default function StaffPage() {
  const config = useConfig();
  const { t, loc, lang } = useI18n();
  const stylists = config.stylists;

  const totalRevenue = stylists.reduce((sum, s) => sum + s.revenueThisMonth, 0);
  const totalClients = stylists.reduce((sum, s) => sum + s.clientsThisMonth, 0);
  const avgCommission =
    stylists.length > 0
      ? stylists.reduce((sum, s) => sum + s.commission, 0) / stylists.length
      : 0;
  const maxRevenue = stylists.reduce(
    (max, s) => Math.max(max, s.revenueThisMonth),
    0
  );

  const stats = [
    {
      label: t("stf.teamRevenue"),
      value: currency(totalRevenue),
      icon: TrendingUp,
    },
    {
      label: t("stf.clients"),
      value: totalClients.toLocaleString(),
      icon: Users,
    },
    {
      label: t("stf.avgCommission"),
      value: pct(avgCommission),
      icon: Percent,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("stf.title")}
        subtitle={t("stf.subtitle", { n: stylists.length })}
      >
        <Button variant="primary" size="sm">
          {t("c.addStylist")}
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gold-200 bg-gold-50 text-gold-600">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-charcoal-muted">{stat.label}</p>
                  <p className="text-2xl font-semibold text-charcoal">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stylists.map((s) => {
          const revenuePct =
            maxRevenue > 0 ? (s.revenueThisMonth / maxRevenue) * 100 : 0;
          const specialties = lang === "ar" ? s.specialtiesAr : s.specialties;
          return (
            <Card key={s.id} className="p-5">
              <div className="flex items-start gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-semibold text-white"
                  style={{ backgroundColor: s.color }}
                >
                  {s.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="serif text-xl text-charcoal">
                    {loc(s.name, s.nameAr)}
                  </h3>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span
                      className="inline-block h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                    <p className="text-sm text-charcoal-muted">
                      {t(`role.${s.role}`)}
                    </p>
                  </div>
                </div>
              </div>

              {specialties.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {specialties.map((sp) => (
                    <span
                      key={sp}
                      className="rounded-full bg-cream-100 px-2.5 py-0.5 text-xs text-charcoal-light"
                    >
                      {sp}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
                <div>
                  <p className="text-xs text-charcoal-muted">
                    {t("stf.clients")}
                  </p>
                  <p className="font-medium text-charcoal">
                    {s.clientsThisMonth}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-charcoal-muted">
                    {t("stf.revenue")}
                  </p>
                  <p className="font-medium text-charcoal">
                    {currency(s.revenueThisMonth)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-charcoal-muted">
                    {t("stf.commission")}
                  </p>
                  <p className="font-medium text-charcoal">
                    {pct(s.commission)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-charcoal-muted">
                    {t("stf.schedule")}
                  </p>
                  <p className="font-medium text-charcoal">
                    {loc(s.schedule, s.scheduleAr)}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <div
                  className={cn(
                    "h-2 w-full overflow-hidden rounded-full bg-cream-100"
                  )}
                >
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${revenuePct}%`,
                      backgroundColor: s.color,
                    }}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
