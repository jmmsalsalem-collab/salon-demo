"use client";

import { useMemo, useState } from "react";
import { Plus, X, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { useConfig } from "@/lib/useConfig";
import { useI18n } from "@/lib/i18n";
import { WEEKDAY_LABELS } from "@/lib/translations";
import { appointments, ApptStatus } from "@/lib/data";
import { currency } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function AppointmentsPage() {
  const config = useConfig();
  const { t, loc, lang, dir } = useI18n();
  const [view, setView] = useState<"day" | "week">("week");
  const [activeDay, setActiveDay] = useState(3);
  const [showNew, setShowNew] = useState(false);

  const Prev = dir === "rtl" ? ChevronRight : ChevronLeft;
  const Next = dir === "rtl" ? ChevronLeft : ChevronRight;

  const stylistById = useMemo(
    () => Object.fromEntries(config.stylists.map((s) => [s.id, s])),
    [config.stylists]
  );
  const wd = (i: number) => (lang === "ar" ? WEEKDAY_LABELS[i].ar : WEEKDAY_LABELS[i].en);
  const svc = (s: { services: string[]; servicesAr: string[] }) =>
    (lang === "ar" ? s.servicesAr : s.services).join(lang === "ar" ? "، " : ", ");

  const dayAppts = appointments
    .filter((a) => a.day === activeDay)
    .sort((a, b) => a.start.localeCompare(b.start));

  return (
    <>
      <PageHeader title={t("appt.title")} subtitle={t("appt.subtitle")}>
        <div className="inline-flex rounded-xl border border-gold-200 bg-white p-1">
          {(["day", "week"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "rounded-lg px-4 py-1.5 text-sm font-medium transition-colors",
                view === v ? "bg-charcoal text-cream-50" : "text-charcoal-light hover:text-charcoal"
              )}
            >
              {t(`appt.${v}`)}
            </button>
          ))}
        </div>
        <Button onClick={() => setShowNew(true)} variant="gold" size="sm">
          <Plus className="h-4 w-4" />
          {t("appt.new")}
        </Button>
      </PageHeader>

      {/* Stylist legend */}
      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        {config.stylists.map((s) => (
          <span key={s.id} className="flex items-center gap-1.5 text-xs text-charcoal-light">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
            {loc(s.name.split(" ")[0], s.nameAr.split(" ")[0])}
          </span>
        ))}
      </div>

      {view === "week" ? (
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          {WEEKDAY_LABELS.map((_, dayIdx) => {
            const list = appointments
              .filter((a) => a.day === dayIdx)
              .sort((a, b) => a.start.localeCompare(b.start));
            const total = list.reduce((s, a) => s + a.price, 0);
            return (
              <Card key={dayIdx} className="flex flex-col">
                <div className="flex items-center justify-between border-b border-gold-100 px-3 py-2.5">
                  <span className="text-sm font-semibold text-charcoal">{wd(dayIdx)}</span>
                  <span className="text-xs text-charcoal-muted">{list.length}</span>
                </div>
                <div className="flex-1 space-y-1.5 p-2">
                  {list.length === 0 && (
                    <p className="px-2 py-6 text-center text-xs text-charcoal-muted">{t("appt.noBookings")}</p>
                  )}
                  {list.map((a) => {
                    const st = stylistById[a.stylistId];
                    const faded = a.status === "Cancelled" || a.status === "No Show";
                    return (
                      <div
                        key={a.id}
                        className={cn(
                          "rounded-md bg-cream-50 px-2.5 py-1.5 transition-colors hover:bg-cream-100 ltr:border-l-2 rtl:border-r-2",
                          faded && "opacity-50"
                        )}
                        style={{ borderColor: st?.color }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-medium text-charcoal-light">{a.start}</span>
                          <span className="text-[11px] font-medium text-charcoal">{currency(a.price)}</span>
                        </div>
                        <p className="truncate text-[13px] font-medium text-charcoal">
                          {loc(a.clientName, a.clientNameAr)}
                        </p>
                        <p className="truncate text-[11px] text-charcoal-muted">{svc(a)}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-gold-100 px-3 py-2 text-xs font-medium text-charcoal-light ltr:text-right rtl:text-left">
                  {currency(total)}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <div className="flex items-center justify-between border-b border-gold-100 px-3 py-3 sm:px-5">
            <button
              onClick={() => setActiveDay((d) => Math.max(0, d - 1))}
              disabled={activeDay === 0}
              className="rounded-lg p-1.5 text-charcoal-light hover:bg-cream-100 disabled:opacity-30"
            >
              <Prev className="h-4 w-4" />
            </button>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {WEEKDAY_LABELS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-sm transition-colors",
                    activeDay === i ? "bg-charcoal text-cream-50" : "text-charcoal-light hover:bg-cream-100"
                  )}
                >
                  {wd(i)}
                </button>
              ))}
            </div>
            <button
              onClick={() => setActiveDay((d) => Math.min(5, d + 1))}
              disabled={activeDay === 5}
              className="rounded-lg p-1.5 text-charcoal-light hover:bg-cream-100 disabled:opacity-30"
            >
              <Next className="h-4 w-4" />
            </button>
          </div>

          <div className="p-3 sm:p-5">
            <p className="mb-4 text-sm text-charcoal-light">
              {t("appt.summary", {
                n: dayAppts.length,
                sum: currency(dayAppts.reduce((s, a) => s + a.price, 0)),
              })}
            </p>
            {dayAppts.length === 0 ? (
              <p className="py-12 text-center text-sm text-charcoal-muted">{t("appt.none")}</p>
            ) : (
              <div className="space-y-2">
                {dayAppts.map((a) => {
                  const st = stylistById[a.stylistId];
                  return (
                    <div
                      key={a.id}
                      className="flex items-center gap-4 rounded-xl border border-gold-100 bg-white p-3 transition-shadow hover:shadow-card"
                    >
                      <div className="flex w-20 shrink-0 flex-col items-center justify-center rounded-lg bg-cream-100 py-2">
                        <span className="text-sm font-semibold text-charcoal">{a.start}</span>
                        <span className="flex items-center gap-1 text-[11px] text-charcoal-muted">
                          <Clock className="h-3 w-3" />
                          {a.durationMin}m
                        </span>
                      </div>
                      <span className="h-12 w-1 shrink-0 rounded-full" style={{ backgroundColor: st?.color }} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-charcoal">{loc(a.clientName, a.clientNameAr)}</p>
                        <p className="truncate text-sm text-charcoal-muted">{svc(a)}</p>
                        <p className="mt-0.5 text-xs text-charcoal-light">
                          {t("c.with")} {loc(st?.name ?? "", st?.nameAr ?? "")} · {t(`role.${st?.role}`)}
                        </p>
                      </div>
                      <div className="hidden ltr:text-right rtl:text-left sm:block">
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
  const { t, loc } = useI18n();
  const statuses: ApptStatus[] = ["Booked", "Confirmed", "In Chair"];
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-espresso/40 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-t-3xl bg-white shadow-soft sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-gold-100 bg-cream-50 px-6 py-4">
          <h3 className="serif text-xl text-charcoal">{t("appt.new")}</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-charcoal-light hover:bg-cream-200">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="grid gap-4 p-6 sm:grid-cols-2">
          <ModalField label={t("appt.client")}>
            <input placeholder={t("appt.searchClient")} className={inputCls} />
          </ModalField>
          <ModalField label={t("appt.stylist")}>
            <select className={inputCls}>
              {config.stylists.map((s) => (
                <option key={s.id}>{loc(s.name, s.nameAr)}</option>
              ))}
            </select>
          </ModalField>
          <ModalField label={t("appt.service")} full>
            <select className={inputCls}>
              {config.services.slice(0, 8).map((s) => (
                <option key={s.id}>{loc(s.name, s.nameAr)} — {s.price}</option>
              ))}
            </select>
          </ModalField>
          <ModalField label={t("appt.date")}>
            <input type="date" className={inputCls} />
          </ModalField>
          <ModalField label={t("appt.time")}>
            <input type="time" className={inputCls} />
          </ModalField>
          <ModalField label={t("appt.status")} full>
            <div className="flex flex-wrap gap-2">
              {statuses.map((s) => (
                <StatusBadge key={s} status={s} />
              ))}
            </div>
          </ModalField>
        </div>
        <div className="flex justify-end gap-3 border-t border-gold-100 bg-cream-50 px-6 py-4">
          <Button onClick={onClose} variant="outline" size="sm">{t("c.cancel")}</Button>
          <Button onClick={onClose} variant="primary" size="sm">{t("appt.create")}</Button>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-gold-200 bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none focus:border-gold-400";

function ModalField({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="mb-1.5 block text-sm font-medium text-charcoal">{label}</label>
      {children}
    </div>
  );
}
