import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  delta,
  icon: Icon,
}: {
  label: string;
  value: string;
  delta?: number;
  icon: LucideIcon;
}) {
  const up = (delta ?? 0) >= 0;
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gold-100 bg-white p-5 shadow-card transition-shadow hover:shadow-soft">
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent" />
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold-200 bg-gold-50 text-gold-600">
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </span>
        {delta !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-medium",
              up ? "text-emerald-600" : "text-rose-500"
            )}
          >
            {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(Math.round((delta ?? 0) * 100))}%
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-semibold tracking-luxe text-charcoal">{value}</p>
      <p className="mt-0.5 text-sm text-charcoal-light">{label}</p>
    </div>
  );
}
