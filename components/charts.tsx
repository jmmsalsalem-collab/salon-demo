"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { compactCurrency, currency } from "@/lib/format";

const axisStyle = { fontSize: 11, fill: "#9A8C86" };
const GRID = "#ECE7DB";
const GOLD = "#C9A96E";
const TAUPE = "#A6766A";

function TooltipBox({ active, payload, label, formatter }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-gold-100 bg-white px-3 py-2 text-xs shadow-soft">
      {label && <p className="mb-1 font-medium text-charcoal">{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-charcoal-light">
          <span
            className="me-1.5 inline-block h-2 w-2 rounded-full align-middle"
            style={{ backgroundColor: p.color || p.fill }}
          />
          {p.name}: {formatter ? formatter(p.value) : p.value}
        </p>
      ))}
    </div>
  );
}

export function RevenueAreaChart({ data }: { data: { week: string; revenue: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={GOLD} stopOpacity={0.3} />
            <stop offset="100%" stopColor={GOLD} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
        <XAxis dataKey="week" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={(v) => compactCurrency(v)} />
        <Tooltip content={<TooltipBox formatter={(v: number) => currency(v)} />} />
        <Area type="monotone" dataKey="revenue" name="KWD" stroke={GOLD} strokeWidth={2.5} fill="url(#revFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function ServicesPie({ data }: { data: { category: string; value: number; color: string; label?: string }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <ResponsiveContainer width="100%" height={200} className="max-w-[200px]">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="category" innerRadius={52} outerRadius={82} paddingAngle={2} stroke="none">
            {data.map((d) => (
              <Cell key={d.category} fill={d.color} />
            ))}
          </Pie>
          <Tooltip content={<TooltipBox formatter={(v: number) => currency(v)} />} />
        </PieChart>
      </ResponsiveContainer>
      <ul className="flex-1 space-y-2">
        {data.map((d) => (
          <li key={d.category} className="flex items-center gap-2 text-sm">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="text-charcoal-light">{d.label ?? d.category}</span>
            <span className="font-medium text-charcoal ltr:ml-auto rtl:mr-auto">
              {Math.round((d.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StylistRevenueBars({ data }: { data: { name: string; revenue: number; color: string }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID} horizontal={false} />
        <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={(v) => compactCurrency(v)} />
        <YAxis type="category" dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} width={84} />
        <Tooltip cursor={{ fill: "rgba(201,169,110,0.06)" }} content={<TooltipBox formatter={(v: number) => currency(v)} />} />
        <Bar dataKey="revenue" name="KWD" radius={[0, 6, 6, 0]} barSize={16}>
          {data.map((d) => (
            <Cell key={d.name} fill={d.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MonthlyRevenueChart({
  data,
  servicesLabel = "Services",
  retailLabel = "Retail",
}: {
  data: { month: string; services: number; retail: number }[];
  servicesLabel?: string;
  retailLabel?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
        <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={(v) => compactCurrency(v)} />
        <Tooltip cursor={{ fill: "rgba(201,169,110,0.06)" }} content={<TooltipBox formatter={(v: number) => currency(v)} />} />
        <Bar dataKey="services" name={servicesLabel} stackId="a" fill={GOLD} barSize={26} />
        <Bar dataKey="retail" name={retailLabel} stackId="a" fill={TAUPE} radius={[6, 6, 0, 0]} barSize={26} />
      </BarChart>
    </ResponsiveContainer>
  );
}
