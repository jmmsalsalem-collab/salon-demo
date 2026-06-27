import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  delta,
  icon: Icon,
  hint,
}: {
  label: string;
  value: string;
  delta?: number;
  icon: LucideIcon;
  hint?: string;
}) {
  const up = (delta ?? 0) >= 0;
  return (
    <div className="rounded-2xl border border-gold-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-soft">
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blush-100 to-gold-100 text-blush-600">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        {delta !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium",
              up ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
            )}
          >
            {up ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {Math.abs(Math.round(delta * 100))}%
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-semibold text-charcoal">{value}</p>
      <p className="mt-0.5 text-sm text-charcoal-light">{label}</p>
      {hint && <p className="mt-1 text-xs text-charcoal-muted">{hint}</p>}
    </div>
  );
}
