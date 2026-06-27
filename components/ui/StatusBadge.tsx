"use client";

import { ApptStatus, STATUS_META } from "@/lib/data";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: ApptStatus }) {
  const m = STATUS_META[status];
  const { t } = useI18n();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        m.bg,
        m.text
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", m.dot)} />
      {t(`st.${status}`)}
    </span>
  );
}
