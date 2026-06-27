import { ApptStatus, STATUS_META } from "@/lib/data";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: ApptStatus }) {
  const m = STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        m.bg,
        m.text
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", m.dot)} />
      {m.label}
    </span>
  );
}
