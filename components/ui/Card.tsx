import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gold-100 bg-white shadow-card",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-gold-100 px-5 py-4">
      <div>
        <h3 className="serif text-lg text-charcoal">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-charcoal-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
