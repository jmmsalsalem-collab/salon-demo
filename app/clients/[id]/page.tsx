import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  Mail,
  Cake,
  Star,
  FlaskConical,
  MessageSquare,
  Gift,
  Scissors,
  AlertTriangle,
} from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DEFAULT_CONFIG } from "@/lib/salon";
import { getClient, clients } from "@/lib/data";
import { currency } from "@/lib/format";

export function generateStaticParams() {
  return clients.map((c) => ({ id: c.id }));
}

const stylistName = (id: string) =>
  DEFAULT_CONFIG.stylists.find((s) => s.id === id)?.name ?? "—";

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = getClient(params.id);
  if (!client) notFound();

  const inits = client.name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  const isVip = client.tags.includes("VIP");

  return (
    <>
      <Link
        href="/clients"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-charcoal-light hover:text-charcoal"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to clients
      </Link>

      {/* Header card */}
      <Card className="mb-6 overflow-hidden">
        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
          <span
            className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-2xl font-semibold text-white shadow-soft ${
              isVip ? "bg-gradient-to-br from-gold-400 to-blush-400" : "bg-gradient-to-br from-blush-300 to-blush-400"
            }`}
          >
            {inits}
          </span>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="serif text-3xl font-semibold text-charcoal">{client.name}</h1>
              {client.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-full bg-gold-50 px-2.5 py-0.5 text-xs font-medium text-gold-700"
                >
                  {t === "VIP" && <Star className="h-3 w-3 fill-gold-500 text-gold-500" />}
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-charcoal-light">
              <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-gold-500" />{client.phone}</span>
              <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-gold-500" />{client.email}</span>
              <span className="flex items-center gap-1.5"><Cake className="h-3.5 w-3.5 text-gold-500" />{client.birthday}</span>
              <span className="flex items-center gap-1.5"><Scissors className="h-3.5 w-3.5 text-gold-500" />{stylistName(client.preferredStylistId)}</span>
            </div>
          </div>
          <div className="flex gap-2 sm:flex-col">
            <Button variant="primary" size="sm">Book appointment</Button>
            <Button variant="outline" size="sm">Message</Button>
          </div>
        </div>

        {/* Stat strip */}
        <div className="grid grid-cols-2 divide-gold-100 border-t border-gold-100 sm:grid-cols-4 sm:divide-x">
          <Stat label="Total Visits" value={String(client.totalVisits)} />
          <Stat label="Total Spent" value={currency(client.totalSpent)} />
          <Stat label="Loyalty Points" value={client.loyaltyPoints.toLocaleString()} />
          <Stat
            label="Member Since"
            value={client.joined}
          />
        </div>
      </Card>

      {client.outstanding ? (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <AlertTriangle className="h-4 w-4" />
          Outstanding balance of {currency(client.outstanding)} on file.
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Appointment history */}
          <Card>
            <CardHeader title="Appointment history" subtitle={`${client.history.length} recent visits`} />
            <div className="divide-y divide-gold-100">
              {client.history.map((h, i) => (
                <div key={i} className="flex items-start gap-4 px-5 py-3.5">
                  <div className="w-24 shrink-0 text-xs text-charcoal-muted">{h.date}</div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-charcoal">{h.service}</p>
                    <p className="text-xs text-charcoal-muted">with {stylistName(h.stylistId)}</p>
                    {h.notes && (
                      <p className="mt-1 rounded-lg bg-cream-100 px-2.5 py-1.5 text-xs text-charcoal-light">
                        {h.notes}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 font-medium text-charcoal">{currency(h.price)}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Communication log */}
          <Card>
            <CardHeader title="Communication log" />
            <div className="space-y-1 p-3">
              {client.communications.map((c, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-cream-50">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blush-100 text-blush-600">
                    <MessageSquare className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-charcoal">{c.summary}</p>
                    <p className="text-xs text-charcoal-muted">
                      {c.type} · {c.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Service notes / preferences */}
          <Card>
            <CardHeader title="Notes & preferences" />
            <div className="p-5">
              <p className="rounded-xl bg-cream-100 px-4 py-3 text-sm leading-relaxed text-charcoal-light">
                {client.notes}
              </p>
            </div>
          </Card>

          {/* Color formulas */}
          <Card>
            <CardHeader title="Saved formulas" subtitle="Color & treatment recipes" />
            <div className="space-y-3 p-5">
              {client.formulas.length === 0 ? (
                <p className="text-sm text-charcoal-muted">No formulas on file.</p>
              ) : (
                client.formulas.map((f, i) => (
                  <div key={i} className="rounded-xl border border-gold-100 bg-white p-3.5">
                    <p className="flex items-center gap-1.5 text-sm font-medium text-charcoal">
                      <FlaskConical className="h-3.5 w-3.5 text-blush-500" />
                      {f.name}
                    </p>
                    <p className="mt-1 font-mono text-xs leading-relaxed text-charcoal-light">
                      {f.formula}
                    </p>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Loyalty history */}
          <Card>
            <CardHeader title="Loyalty history" />
            <div className="space-y-1 p-3">
              {client.loyaltyLog.map((l, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-cream-50">
                  <Gift className="h-4 w-4 shrink-0 text-gold-500" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-charcoal">{l.reason}</p>
                    <p className="text-xs text-charcoal-muted">{l.date}</p>
                  </div>
                  <span className="shrink-0 text-sm font-medium text-emerald-600">+{l.change}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-5 py-4">
      <p className="text-xl font-semibold text-charcoal">{value}</p>
      <p className="text-xs text-charcoal-muted">{label}</p>
    </div>
  );
}
