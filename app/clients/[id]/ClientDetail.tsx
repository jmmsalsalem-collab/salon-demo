"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
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
import { useConfig } from "@/lib/useConfig";
import { useI18n } from "@/lib/i18n";
import { COMM_TYPE } from "@/lib/translations";
import { getClient } from "@/lib/data";
import { currency } from "@/lib/format";

export default function ClientDetail({ id }: { id: string }) {
  const config = useConfig();
  const { t, loc, lang, dir } = useI18n();
  const client = getClient(id);
  const Back = dir === "rtl" ? ArrowRight : ArrowLeft;

  if (!client) return null;

  const stylistName = (sid: string) => {
    const s = config.stylists.find((x) => x.id === sid);
    return s ? loc(s.name, s.nameAr) : "—";
  };
  const inits = client.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  const isVip = client.tags.includes("VIP");

  return (
    <>
      <Link href="/clients" className="mb-4 inline-flex items-center gap-1.5 text-sm text-charcoal-light hover:text-charcoal">
        <Back className="h-4 w-4" />
        {t("cd.back")}
      </Link>

      {/* Header */}
      <Card className="mb-6 overflow-hidden">
        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
          <span
            className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-2xl font-semibold ${
              isVip ? "bg-gold-400 text-espresso" : "border border-gold-200 bg-gold-50 text-gold-700"
            }`}
          >
            {inits}
          </span>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="serif text-3xl text-charcoal">{loc(client.name, client.nameAr)}</h1>
              {client.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-gold-50 px-2.5 py-0.5 text-xs font-medium text-gold-700">
                  {tag === "VIP" && <Star className="h-3 w-3 fill-gold-500 text-gold-500" />}
                  {t(`tag.${tag}`)}
                </span>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-charcoal-light">
              <span className="flex items-center gap-1.5" dir="ltr"><Phone className="h-3.5 w-3.5 text-gold-500" />{client.phone}</span>
              <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-gold-500" />{client.email}</span>
              <span className="flex items-center gap-1.5"><Cake className="h-3.5 w-3.5 text-gold-500" />{client.birthday}</span>
              <span className="flex items-center gap-1.5"><Scissors className="h-3.5 w-3.5 text-gold-500" />{stylistName(client.preferredStylistId)}</span>
            </div>
          </div>
          <div className="flex gap-2 sm:flex-col">
            <Button variant="primary" size="sm">{t("cd.book")}</Button>
            <Button variant="outline" size="sm">{t("cd.message")}</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 divide-gold-100 border-t border-gold-100 sm:grid-cols-4 sm:divide-x rtl:sm:divide-x-reverse">
          <Stat label={t("cd.totalVisits")} value={String(client.totalVisits)} />
          <Stat label={t("cd.totalSpent")} value={currency(client.totalSpent)} />
          <Stat label={t("cd.loyalty")} value={client.loyaltyPoints.toLocaleString("en-US")} />
          <Stat label={t("cd.memberSince")} value={client.joined} />
        </div>
      </Card>

      {client.outstanding ? (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <AlertTriangle className="h-4 w-4" />
          {t("cd.outstanding", { amt: currency(client.outstanding) })}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader title={t("cd.history")} subtitle={t("cd.recentVisits", { n: client.history.length })} />
            <div className="divide-y divide-gold-100">
              {client.history.map((h, i) => (
                <div key={i} className="flex items-start gap-4 px-5 py-3.5">
                  <div className="w-24 shrink-0 text-xs text-charcoal-muted">{h.date}</div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-charcoal">{loc(h.service, h.serviceAr)}</p>
                    <p className="text-xs text-charcoal-muted">{t("c.with")} {stylistName(h.stylistId)}</p>
                    {h.notes && (
                      <p className="mt-1 rounded-lg bg-cream-100 px-2.5 py-1.5 text-xs text-charcoal-light">
                        {loc(h.notes, h.notesAr ?? h.notes)}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 font-medium text-charcoal">{currency(h.price)}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title={t("cd.commLog")} />
            <div className="space-y-1 p-3">
              {client.communications.map((c, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-cream-50">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold-200 bg-gold-50 text-gold-600">
                    <MessageSquare className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-charcoal">{loc(c.summary, c.summaryAr)}</p>
                    <p className="text-xs text-charcoal-muted">
                      {lang === "ar" ? COMM_TYPE[c.type].ar : COMM_TYPE[c.type].en} · {c.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader title={t("cd.notes")} />
            <div className="p-5">
              <p className="rounded-xl bg-cream-100 px-4 py-3 text-sm leading-relaxed text-charcoal-light">
                {loc(client.notes, client.notesAr)}
              </p>
            </div>
          </Card>

          <Card>
            <CardHeader title={t("cd.formulas")} subtitle={t("cd.recipes")} />
            <div className="space-y-3 p-5">
              {client.formulas.length === 0 ? (
                <p className="text-sm text-charcoal-muted">{t("cd.noFormulas")}</p>
              ) : (
                client.formulas.map((f, i) => (
                  <div key={i} className="rounded-xl border border-gold-100 bg-white p-3.5">
                    <p className="flex items-center gap-1.5 text-sm font-medium text-charcoal">
                      <FlaskConical className="h-3.5 w-3.5 text-gold-600" />
                      {loc(f.name, f.nameAr)}
                    </p>
                    <p className="mt-1 font-mono text-xs leading-relaxed text-charcoal-light" dir="ltr">{f.formula}</p>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card>
            <CardHeader title={t("cd.loyaltyHist")} />
            <div className="space-y-1 p-3">
              {client.loyaltyLog.map((l, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-cream-50">
                  <Gift className="h-4 w-4 shrink-0 text-gold-500" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-charcoal">{loc(l.reason, l.reasonAr)}</p>
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
