"use client";

import Link from "next/link";
import {
  DollarSign,
  CalendarCheck,
  Users,
  UserPlus,
  Receipt,
  Repeat,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/AppShell";
import { KpiCard } from "@/components/KpiCard";
import { Card, CardHeader } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import AskAIButton from "@/components/AskAIButton";
import { RevenueAreaChart, ServicesPie, StylistRevenueBars } from "@/components/charts";
import { useConfig } from "@/lib/useConfig";
import { useI18n } from "@/lib/i18n";
import { dashboard, revenueByWeek, servicesBreakdown, appointments } from "@/lib/data";
import { currency, pct } from "@/lib/format";

export default function DashboardPage() {
  const config = useConfig();
  const { t, loc, lang } = useI18n();

  const stylistById = Object.fromEntries(config.stylists.map((s) => [s.id, s]));

  const topStylists = [...config.stylists]
    .sort((a, b) => b.revenueThisMonth - a.revenueThisMonth)
    .slice(0, 5)
    .map((s) => ({
      name: lang === "ar" ? s.nameAr.split(" ")[0] : s.name.split(" ")[0],
      revenue: s.revenueThisMonth,
      color: s.color,
    }));

  const pieData = servicesBreakdown.map((d) => ({ ...d, label: t(`cat.${d.category}`) }));
  const todays = appointments.filter((a) => a.day === 3);

  return (
    <>
      <PageHeader title={t("dash.greeting")} subtitle={t("dash.subtitle", { salon: config.name })}>
        <Link
          href="/appointments"
          className="inline-flex items-center gap-2 rounded-xl bg-charcoal px-4 py-2.5 text-sm font-medium text-cream-50 transition-colors hover:bg-espresso-600"
        >
          {t("c.viewSchedule")}
          <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
        </Link>
      </PageHeader>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard label={t("dash.revenueToday")} value={currency(dashboard.revenueToday)} delta={dashboard.revenueTodayDelta} icon={DollarSign} />
        <KpiCard label={t("dash.appointmentsToday")} value={String(dashboard.appointmentsToday)} delta={dashboard.appointmentsTodayDelta} icon={CalendarCheck} />
        <KpiCard label={t("dash.clientsMonth")} value={String(dashboard.clientsThisMonth)} delta={dashboard.clientsThisMonthDelta} icon={Users} />
        <KpiCard label={t("dash.newClients")} value={String(dashboard.newClientsThisMonth)} delta={dashboard.newClientsDelta} icon={UserPlus} />
        <KpiCard label={t("dash.avgTicket")} value={currency(dashboard.avgTicket)} delta={dashboard.avgTicketDelta} icon={Receipt} />
        <KpiCard label={t("dash.rebooking")} value={pct(dashboard.rebookingRate)} delta={dashboard.rebookingDelta} icon={Repeat} />
      </div>

      {/* Charts */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title={t("dash.revenueByWeek")} subtitle={t("dash.last8weeks")} />
          <div className="p-4">
            <RevenueAreaChart data={revenueByWeek} />
          </div>
        </Card>
        <Card>
          <CardHeader title={t("dash.servicesBreakdown")} subtitle={t("dash.revenueShare")} />
          <div className="p-5">
            <ServicesPie data={pieData} />
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title={t("dash.topStylists")} subtitle={t("dash.byRevenue")} />
          <div className="p-4">
            <StylistRevenueBars data={topStylists} />
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader
            title={t("dash.todays")}
            subtitle={t("dash.bookedCount", { n: todays.length })}
            action={
              <Link href="/appointments" className="text-sm font-medium text-gold-600 hover:text-gold-700">
                {t("c.seeAll")}
              </Link>
            }
          />
          <div className="divide-y divide-gold-100">
            {todays.slice(0, 6).map((a) => {
              const stylist = stylistById[a.stylistId];
              return (
                <div key={a.id} className="flex items-center gap-3 px-5 py-3">
                  <span className="w-14 shrink-0 text-sm font-medium text-charcoal-light">{a.start}</span>
                  <span className="h-8 w-1 shrink-0 rounded-full" style={{ backgroundColor: stylist?.color }} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-charcoal">
                      {loc(a.clientName, a.clientNameAr)}
                    </p>
                    <p className="truncate text-xs text-charcoal-muted">
                      {(lang === "ar" ? a.servicesAr : a.services).join("، ")} ·{" "}
                      {loc(stylist?.name.split(" ")[0] ?? "", stylist?.nameAr.split(" ")[0] ?? "")}
                    </p>
                  </div>
                  <span className="hidden shrink-0 text-sm font-medium text-charcoal sm:block">
                    {currency(a.price)}
                  </span>
                  <StatusBadge status={a.status} />
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <AskAIButton />
    </>
  );
}
