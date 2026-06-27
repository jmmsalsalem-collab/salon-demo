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
import {
  RevenueAreaChart,
  ServicesPie,
  StylistRevenueBars,
} from "@/components/charts";
import { DEFAULT_CONFIG } from "@/lib/salon";
import {
  dashboard,
  revenueByWeek,
  servicesBreakdown,
  appointments,
} from "@/lib/data";
import { currency, pct } from "@/lib/format";

const topStylists = [...DEFAULT_CONFIG.stylists]
  .sort((a, b) => b.revenueThisMonth - a.revenueThisMonth)
  .slice(0, 5)
  .map((s) => ({
    name: s.name.split(" ")[0],
    revenue: s.revenueThisMonth,
    color: s.color,
  }));

const todays = appointments.filter((a) => a.day === 3).slice(0, 6);

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Good morning, Jasem"
        subtitle="Here's how Studio Luxe is performing today — Thursday, June 27."
      >
        <Link
          href="/appointments"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blush-500 to-blush-400 px-4 py-2.5 text-sm font-medium text-white shadow-soft transition-shadow hover:shadow-glow"
        >
          View schedule
          <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHeader>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="Revenue Today" value={currency(dashboard.revenueToday)} delta={dashboard.revenueTodayDelta} icon={DollarSign} />
        <KpiCard label="Appointments Today" value={String(dashboard.appointmentsToday)} delta={dashboard.appointmentsTodayDelta} icon={CalendarCheck} />
        <KpiCard label="Clients This Month" value={String(dashboard.clientsThisMonth)} delta={dashboard.clientsThisMonthDelta} icon={Users} />
        <KpiCard label="New Clients" value={String(dashboard.newClientsThisMonth)} delta={dashboard.newClientsDelta} icon={UserPlus} />
        <KpiCard label="Avg Ticket Value" value={currency(dashboard.avgTicket)} delta={dashboard.avgTicketDelta} icon={Receipt} />
        <KpiCard label="Rebooking Rate" value={pct(dashboard.rebookingRate)} delta={dashboard.rebookingDelta} icon={Repeat} />
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Revenue by week" subtitle="Last 8 weeks" />
          <div className="p-4">
            <RevenueAreaChart data={revenueByWeek} />
          </div>
        </Card>
        <Card>
          <CardHeader title="Services breakdown" subtitle="Revenue share this month" />
          <div className="p-5">
            <ServicesPie data={servicesBreakdown} />
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title="Top stylists" subtitle="By revenue this month" />
          <div className="p-4">
            <StylistRevenueBars data={topStylists} />
          </div>
        </Card>

        {/* Today's appointments */}
        <Card className="lg:col-span-2">
          <CardHeader
            title="Today's appointments"
            subtitle={`${appointments.filter((a) => a.day === 3).length} booked`}
            action={
              <Link
                href="/appointments"
                className="text-sm font-medium text-blush-500 hover:text-blush-600"
              >
                See all
              </Link>
            }
          />
          <div className="divide-y divide-gold-100">
            {todays.map((a) => {
              const stylist = DEFAULT_CONFIG.stylists.find((s) => s.id === a.stylistId);
              return (
                <div key={a.id} className="flex items-center gap-3 px-5 py-3">
                  <span className="w-14 shrink-0 text-sm font-medium text-charcoal-light">
                    {a.start}
                  </span>
                  <span
                    className="h-8 w-1 shrink-0 rounded-full"
                    style={{ backgroundColor: stylist?.color }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-charcoal">
                      {a.clientName}
                    </p>
                    <p className="truncate text-xs text-charcoal-muted">
                      {a.services.join(", ")} · {stylist?.name.split(" ")[0]}
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
