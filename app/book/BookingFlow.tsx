"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  PartyPopper,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useConfig } from "@/lib/useConfig";
import { ServiceIcon } from "@/lib/icons";
import { Button } from "@/components/ui/Button";

const STEPS = ["Service", "Stylist", "Date & Time", "Your Details"] as const;

const TIMES = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "1:30 PM",
  "3:00 PM",
  "4:30 PM",
  "6:00 PM",
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function BookingFlow() {
  const config = useConfig();
  const params = useSearchParams();

  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string | null>(
    params.get("service")
  );
  const [stylistId, setStylistId] = useState<string | null>(
    params.get("stylist")
  );
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [contact, setContact] = useState({ name: "", email: "", phone: "", notes: "" });
  const [confirmed, setConfirmed] = useState(false);

  const service = config.services.find((s) => s.id === serviceId) ?? null;
  const stylist = config.stylists.find((s) => s.id === stylistId) ?? null;

  const canNext = [
    !!serviceId,
    !!stylistId,
    !!date && !!time,
    contact.name.trim() && contact.email.trim() && contact.phone.trim(),
  ][step];

  function next() {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else setConfirmed(true);
  }
  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  if (confirmed && service && stylist && date && time) {
    return (
      <Confirmation
        service={service.name}
        stylist={stylist.name}
        date={date}
        time={time}
        contact={contact}
        onReset={() => {
          setConfirmed(false);
          setStep(0);
          setServiceId(null);
          setStylistId(null);
          setDate(null);
          setTime(null);
          setContact({ name: "", email: "", phone: "", notes: "" });
        }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <div className="text-center">
        <h1 className="serif text-4xl font-semibold text-charcoal sm:text-5xl">
          Book your appointment
        </h1>
        <p className="mt-3 text-charcoal-light">
          Four quick steps to your next great hair day.
        </p>
      </div>

      {/* Stepper */}
      <div className="mt-10 flex items-center justify-between">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium transition-colors",
                  i < step
                    ? "border-blush-400 bg-blush-400 text-white"
                    : i === step
                    ? "border-blush-400 bg-white text-blush-500"
                    : "border-gold-200 bg-white text-charcoal-muted"
                )}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span
                className={cn(
                  "mt-2 hidden text-xs sm:block",
                  i === step ? "text-charcoal" : "text-charcoal-muted"
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-px flex-1 transition-colors",
                  i < step ? "bg-blush-400" : "bg-gold-200"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="mt-10 rounded-3xl border border-gold-100 bg-white/70 p-6 shadow-sm sm:p-8">
        {step === 0 && (
          <Step title="Choose your service">
            <div className="grid gap-3 sm:grid-cols-2">
              {config.services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setServiceId(s.id)}
                  className={cn(
                    "flex items-center gap-4 rounded-2xl border p-4 text-left transition-all",
                    serviceId === s.id
                      ? "border-blush-400 bg-blush-50 shadow-sm"
                      : "border-gold-100 hover:border-gold-300 hover:bg-cream-50"
                  )}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blush-100 to-gold-100 text-blush-600">
                    <ServiceIcon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium text-charcoal">
                      {s.name}
                    </span>
                    <span className="block text-sm text-charcoal-muted">
                      {s.price} · {s.duration}
                    </span>
                  </span>
                  {serviceId === s.id && (
                    <Check className="ml-auto h-5 w-5 shrink-0 text-blush-500" />
                  )}
                </button>
              ))}
            </div>
          </Step>
        )}

        {step === 1 && (
          <Step title="Pick your stylist">
            <div className="grid gap-3 sm:grid-cols-2">
              {config.stylists.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStylistId(s.id)}
                  className={cn(
                    "flex items-center gap-4 rounded-2xl border p-4 text-left transition-all",
                    stylistId === s.id
                      ? "border-blush-400 bg-blush-50 shadow-sm"
                      : "border-gold-100 hover:border-gold-300 hover:bg-cream-50"
                  )}
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${s.accent} text-sm font-semibold text-white`}
                  >
                    {s.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium text-charcoal">
                      {s.name}
                    </span>
                    <span className="block text-sm text-charcoal-muted">
                      {s.specialty}
                    </span>
                  </span>
                  {stylistId === s.id && (
                    <Check className="ml-auto h-5 w-5 shrink-0 text-blush-500" />
                  )}
                </button>
              ))}
            </div>
          </Step>
        )}

        {step === 2 && (
          <Step title="Select date & time">
            <div className="grid gap-8 md:grid-cols-2">
              <CalendarPicker selected={date} onSelect={setDate} />
              <div>
                <p className="mb-3 flex items-center gap-2 text-sm font-medium text-charcoal">
                  <Clock className="h-4 w-4 text-gold-500" />
                  Available times
                </p>
                {!date ? (
                  <p className="rounded-xl border border-dashed border-gold-200 bg-cream-50 px-4 py-8 text-center text-sm text-charcoal-muted">
                    Pick a date to see open slots.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-2.5">
                    {TIMES.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTime(t)}
                        className={cn(
                          "rounded-xl border py-2.5 text-sm transition-all",
                          time === t
                            ? "border-blush-400 bg-blush-500 text-white shadow-sm"
                            : "border-gold-200 text-charcoal hover:border-gold-400 hover:bg-gold-50"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Step>
        )}

        {step === 3 && (
          <Step title="Your details">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Full name"
                value={contact.name}
                onChange={(v) => setContact({ ...contact, name: v })}
                placeholder="Ava Bennett"
              />
              <Field
                label="Phone"
                value={contact.phone}
                onChange={(v) => setContact({ ...contact, phone: v })}
                placeholder="(310) 555-0199"
                type="tel"
              />
              <div className="sm:col-span-2">
                <Field
                  label="Email"
                  value={contact.email}
                  onChange={(v) => setContact({ ...contact, email: v })}
                  placeholder="ava@email.com"
                  type="email"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  Notes for your stylist{" "}
                  <span className="text-charcoal-muted">(optional)</span>
                </label>
                <textarea
                  value={contact.notes}
                  onChange={(e) =>
                    setContact({ ...contact, notes: e.target.value })
                  }
                  rows={3}
                  placeholder="Inspiration, allergies, the vibe you're going for…"
                  className="w-full resize-none rounded-xl border border-gold-200 bg-white px-4 py-3 text-sm text-charcoal outline-none placeholder:text-charcoal-muted focus:border-gold-400 focus:shadow-glow"
                />
              </div>
            </div>

            <Summary
              service={service?.name}
              stylist={stylist?.name}
              date={date}
              time={time}
            />
          </Step>
        )}

        {/* Nav buttons */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center gap-1 text-sm text-charcoal-light transition-colors hover:text-charcoal disabled:opacity-0"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
          <Button onClick={next} disabled={!canNext} variant="primary">
            {step === STEPS.length - 1 ? "Confirm booking" : "Continue"}
            {step !== STEPS.length - 1 && <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Sub-components ---------------- */

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="animate-fade-in">
      <h2 className="serif mb-5 text-2xl text-charcoal">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-charcoal">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gold-200 bg-white px-4 py-3 text-sm text-charcoal outline-none placeholder:text-charcoal-muted focus:border-gold-400 focus:shadow-glow"
      />
    </div>
  );
}

function CalendarPicker({
  selected,
  onSelect,
}: {
  selected: Date | null;
  onSelect: (d: Date) => void;
}) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const [view, setView] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = view.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const sameDay = (a: Date | null, b: Date | null) =>
    !!a && !!b && a.toDateString() === b.toDateString();

  const canGoBack =
    year > today.getFullYear() ||
    (year === today.getFullYear() && month > today.getMonth());

  return (
    <div className="rounded-2xl border border-gold-100 bg-cream-50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-medium text-charcoal">
          <CalendarIcon className="h-4 w-4 text-gold-500" />
          {monthLabel}
        </p>
        <div className="flex gap-1">
          <button
            onClick={() => canGoBack && setView(new Date(year, month - 1, 1))}
            disabled={!canGoBack}
            className="rounded-lg p-1.5 text-charcoal-light hover:bg-blush-50 disabled:opacity-30"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView(new Date(year, month + 1, 1))}
            className="rounded-lg p-1.5 text-charcoal-light hover:bg-blush-50"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((w) => (
          <span key={w} className="py-1 text-[11px] font-medium text-charcoal-muted">
            {w}
          </span>
        ))}
        {cells.map((d, i) => {
          if (!d) return <span key={`e${i}`} />;
          const past = d < today;
          const isSunday = d.getDay() === 0;
          const disabled = past;
          return (
            <button
              key={d.toISOString()}
              disabled={disabled}
              onClick={() => onSelect(d)}
              className={cn(
                "aspect-square rounded-lg text-sm transition-colors",
                sameDay(d, selected)
                  ? "bg-blush-500 font-medium text-white"
                  : disabled
                  ? "text-charcoal-muted/40"
                  : isSunday
                  ? "text-charcoal hover:bg-gold-100"
                  : "text-charcoal hover:bg-blush-100"
              )}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Summary({
  service,
  stylist,
  date,
  time,
}: {
  service?: string;
  stylist?: string;
  date: Date | null;
  time: string | null;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-gold-100 bg-cream-50 p-5">
      <p className="mb-3 flex items-center gap-2 text-sm font-medium text-charcoal">
        <Sparkles className="h-4 w-4 text-gold-500" />
        Your appointment
      </p>
      <dl className="grid gap-2 text-sm sm:grid-cols-2">
        <Row label="Service" value={service} />
        <Row label="Stylist" value={stylist} />
        <Row
          label="Date"
          value={
            date?.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            }) ?? undefined
          }
        />
        <Row label="Time" value={time ?? undefined} />
      </dl>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between gap-3 sm:block">
      <dt className="text-charcoal-muted">{label}</dt>
      <dd className="font-medium text-charcoal">{value ?? "—"}</dd>
    </div>
  );
}

function Confirmation({
  service,
  stylist,
  date,
  time,
  contact,
  onReset,
}: {
  service: string;
  stylist: string;
  date: Date;
  time: string;
  contact: { name: string; email: string; phone: string; notes: string };
  onReset: () => void;
}) {
  return (
    <div className="mx-auto max-w-xl px-5 py-16 sm:px-8">
      <div className="overflow-hidden rounded-3xl border border-gold-100 bg-white shadow-soft">
        <div className="relative bg-gradient-to-br from-blush-400 to-gold-300 px-8 py-12 text-center text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.45),transparent_60%)]" />
          <div className="relative">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/25 backdrop-blur">
              <PartyPopper className="h-8 w-8" />
            </span>
            <h1 className="serif mt-5 text-4xl font-semibold">You&apos;re booked!</h1>
            <p className="mt-2 text-white/90">
              We can&apos;t wait to see you, {contact.name.split(" ")[0] || "gorgeous"}.
            </p>
          </div>
        </div>

        <div className="p-8">
          <dl className="space-y-4">
            <ConfirmRow label="Service" value={service} />
            <ConfirmRow label="Stylist" value={stylist} />
            <ConfirmRow
              label="When"
              value={`${date.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })} · ${time}`}
            />
            <ConfirmRow label="Confirmation sent to" value={contact.email} />
            {contact.notes && <ConfirmRow label="Your notes" value={contact.notes} />}
          </dl>

          <div className="mt-6 rounded-2xl bg-cream-100/70 px-5 py-4 text-sm text-charcoal-light">
            A confirmation and reminder will be sent to your email and phone. Need
            to reschedule? Just reply to that message — we&apos;re flexible.
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/" variant="outline">
              Back to home
            </Button>
            <Button onClick={onReset} variant="primary">
              Book another
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfirmRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-gold-100 pb-4 last:border-0 last:pb-0">
      <dt className="text-sm text-charcoal-muted">{label}</dt>
      <dd className="text-right font-medium text-charcoal">{value}</dd>
    </div>
  );
}
