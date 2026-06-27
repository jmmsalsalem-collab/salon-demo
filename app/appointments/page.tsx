"use client";

import { useMemo, useState } from "react";
import { Plus, X, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { useConfig } from "@/lib/useConfig";
import { appointments, WEEKDAYS, ApptStatus } from "@/lib/data";
import { currency } from "@/lib/format";
import { cn } from "@/lib/utils";

const FULL_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function AppointmentsPage() {
  const config = useConfig();
  const [view, setView] = useState<"day" | "week">("week");
  const [activeDay, setActiveDay] = useState(3); // Thursday
  const [showNew, setShowNew] = useState(false);

  const stylistById = useMemo(
    () => Object.fromEntries(config.stylists.map((s) => [s.id, s])),
    [config.stylists]
  );

  const dayAppts = appointments
    .filter((a) => a.day === activeDay)
    .sort((a, b) => a.start.localeCompare(b.start));

  return (
    <>
      <PageHeader
        title="Appointments"
        subtitle="Manage your salon's daily and weekly schedule."
      >
        <div className="inline-flex rounded-xl border border-gold-200 bg-white p-1">
          {(["day", "week"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "rounded-lg px-4 py-1.5 text-sm font-medium capitalize transition-colors",
                view === v
                  ? "bg-blush-500 text-white shadow-sm"
                  : "text-charcoal-light hover:text-charcoal"
              )}
            >
              {v}
            </button>
          ))}
        </div>
        <Button onClick={() => setShowNew(true)} variant="primary" size="sm">
          <Plus className="h-4 w-4" />
          New Appointment
        </Button>
      </PageHeader>

      {/* Stylist legend */}
      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        {config.stylists.map((s) => (
          <span key={s.id} className="flex items-center gap-1.5 text-xs text-charcoal-light">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
            {s.name.split(" ")[0]}
          </span>
        ))}
      </div>

      {view === "week" ? (
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          {WEEKDAYS.map((label, dayIdx) => {
            const list = appointments
              .filter((a) => a.day === dayIdx)
              .sort((a, b) => a.start.localeCompare(b.start));
            const total = list.reduce((s, a) => s + a.price, 0);
            return (
              <Card key={label} className="flex flex-col">
                <div className="flex items-center justify-between border-b border-gold-100 px-3 py-2.5">
                  <span className="text-sm font-semibold text-charcoal">{label}</span>
                  <span className="text-xs text-charcoal-muted">{list.length}</span>
                </div>
                <div className="flex-1 space-y-2 p-2">
                  {list.length === 0 && (
                    <p className="px-2 py-6 text-center text-xs text-charcoal-muted">
                      No bookings
                    </p>
                  )}
                  {list.map((a) => {
                    const st = stylistById[a.stylistId];
                    return (
                      <div
                        key={a.id}
                        className="rounded-lg border-l-[3px] bg-cream-50 p-2.5 transition-colors hover:bg-cream-100"
                        style={{ borderColor: st?.color }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-charcoal-light">{a.start}</span>
                          <span className="text-xs font-medium text-charcoal">{currency(a.price)}</span>
                        </div>
                        <p className="mt-1 truncate text-sm font-medium text-charcoal">{a.clientName}</p>
                        <p className="truncate text-xs text-charcoal-muted">{a.services.join(", ")}</p>
                        <div className="mt-1.5">
                          <StatusBadge status={a.status} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-gold-100 px-3 py-2 text-right text-xs font-medium text-charcoal-light">
                  {currency(total)}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          {/* Day navigator */}
          <div className="flex items-center justify-between border-b border-gold-100 px-5 py-3">
            <button
              onClick={() => setActiveDay((d) => Math.max(0, d - 1))}
              disabled={activeDay === 0}
              className="rounded-lg p-1.5 text-charcoal-light hover:bg-blush-50 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {WEEKDAYS.map((d, i) => (
                <button
                  key={d}
                  onClick={() => setActiveDay(i)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-sm transition-colors",
                    activeDay === i
                      ? "bg-blush-500 text-white"
                      : "text-charcoal-light hover:bg-blush-50"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
            <button
              onClick={() => setActiveDay((d) => Math.min(5, d + 1))}
              disabled={activeDay === 5}
              className="rounded-lg p-1.5 text-charcoal-light hover:bg-blush-50 disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="p-3 sm:p-5">
            <p className="mb-4 text-sm text-charcoal-light">
              <span className="font-medium text-charcoal">{FULL_DAYS[activeDay]}</span> ·{" "}
              {dayAppts.length} appointments ·{" "}
              {currency(dayAppts.reduce((s, a) => s + a.price, 0))} expected
            </p>
            {dayAppts.length === 0 ? (
              <p className="py-12 text-center text-sm text-charcoal-muted">
                No appointments scheduled.
              </p>
            ) : (
              <div className="space-y-2">
                {dayAppts.map((a) => {
                  const st = stylistById[a.stylistId];
                  return (
                    <div
                      key={a.id}
                      className="flex items-center gap-4 rounded-xl border border-gold-100 bg-white p-3 transition-shadow hover:shadow-sm"
                    >
                      <div className="flex w-20 shrink-0 flex-col items-center justify-center rounded-lg bg-cream-100 py-2">
                        <span className="text-sm font-semibold text-charcoal">{a.start}</span>
                        <span className="flex items-center gap-1 text-[11px] text-charcoal-muted">
                          <Clock className="h-3 w-3" />
                          {a.durationMin}m
                        </span>
                      </div>
                      <span
                        className="h-12 w-1 shrink-0 rounded-full"
                        style={{ backgroundColor: st?.color }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-charcoal">{a.clientName}</p>
                        <p className="truncate text-sm text-charcoal-muted">
                          {a.services.join(", ")}
                        </p>
                        <p className="mt-0.5 text-xs text-charcoal-light">
                          with {st?.name} · {st?.role}
                        </p>
                      </div>
                      <div className="hidden text-right sm:block">
                        <p className="font-medium text-charcoal">{currency(a.price)}</p>
                      </div>
                      <StatusBadge status={a.status} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Card>
      )}

      {showNew && <NewAppointmentModal onClose={() => setShowNew(false)} />}
    </>
  );
}

function NewAppointmentModal({ onClose }: { onClose: () => void }) {
  const config = useConfig();
  const statuses: ApptStatus[] = ["Booked", "Confirmed", "In Chair"];
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-charcoal/30 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-t-3xl bg-white shadow-soft sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-gold-100 bg-cream-50 px-6 py-4">
          <h3 className="serif text-xl text-charcoal">New Appointment</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-charcoal-light hover:bg-blush-50">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="grid gap-4 p-6 sm:grid-cols-2">
          <ModalField label="Client">
            <input placeholder="Search or add client…" className={inputCls} />
          </ModalField>
          <ModalField label="Stylist">
            <select className={inputCls}>
              {config.stylists.map((s) => (
                <option key={s.id}>{s.name}</option>
              ))}
            </select>
          </ModalField>
          <ModalField label="Service" full>
            <select className={inputCls}>
              {config.services.slice(0, 8).map((s) => (
                <option key={s.id}>{s.name} — {s.price}</option>
              ))}
            </select>
          </ModalField>
          <ModalField label="Date">
            <input type="date" className={inputCls} />
          </ModalField>
          <ModalField label="Time">
            <input type="time" className={inputCls} />
          </ModalField>
          <ModalField label="Status" full>
            <div className="flex gap-2">
              {statuses.map((s) => (
                <span key={s} className="cursor-default">
                  <StatusBadge status={s} />
                </span>
              ))}
            </div>
          </ModalField>
        </div>
        <div className="flex justify-end gap-3 border-t border-gold-100 bg-cream-50 px-6 py-4">
          <Button onClick={onClose} variant="outline" size="sm">
            Cancel
          </Button>
          <Button onClick={onClose} variant="primary" size="sm">
            Create appointment
          </Button>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-gold-200 bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none focus:border-gold-400";

function ModalField({
  label,
  full,
  children,
}: {
  label: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="mb-1.5 block text-sm font-medium text-charcoal">{label}</label>
      {children}
    </div>
  );
}
