"use client";

import { useEffect, useState } from "react";
import {
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Check,
  KeyRound,
  Eye,
  EyeOff,
  Sparkles,
  Building2,
  Palette,
  Clock,
  Users,
  Tag,
  Languages,
} from "lucide-react";
import { PageHeader } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";
import {
  DEFAULT_CONFIG,
  loadConfig,
  saveConfig,
  SalonConfig,
  Service,
  Stylist,
  StaffRole,
  ServiceCategory,
  AI_MODELS,
  CATEGORY_ORDER,
} from "@/lib/salon";
import { cn } from "@/lib/utils";

const PRESET_COLORS = ["#C9A96E", "#B8945A", "#A6766A", "#8E9B8A", "#7E8AA0", "#B08A82", "#C18C5D", "#2D1B1B"];
const ROLES: StaffRole[] = ["Senior Stylist", "Colorist", "Nail Tech", "Lash Artist", "Assistant"];

export default function SettingsPage() {
  const { t, lang, setLang } = useI18n();
  const [config, setConfig] = useState<SalonConfig>(DEFAULT_CONFIG);
  const [saved, setSaved] = useState(false);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    setConfig(loadConfig());
  }, []);

  function update<K extends keyof SalonConfig>(key: K, value: SalonConfig[K]) {
    setConfig((c) => ({ ...c, [key]: value }));
    setSaved(false);
  }
  function updateAI<K extends keyof SalonConfig["ai"]>(key: K, value: SalonConfig["ai"][K]) {
    setConfig((c) => ({ ...c, ai: { ...c.ai, [key]: value } }));
    setSaved(false);
  }
  function handleSave() {
    saveConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }
  function handleReset() {
    setConfig(DEFAULT_CONFIG);
    saveConfig(DEFAULT_CONFIG);
    setSaved(false);
  }

  function updateStylist(i: number, patch: Partial<Stylist>) {
    const stylists = [...config.stylists];
    stylists[i] = { ...stylists[i], ...patch };
    if (patch.name) stylists[i].initials = patch.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
    update("stylists", stylists);
  }
  function removeStylist(i: number) {
    update("stylists", config.stylists.filter((_, idx) => idx !== i));
  }
  function addStylist() {
    update("stylists", [
      ...config.stylists,
      { id: `stylist-${Date.now()}`, name: "New Stylist", nameAr: "موظف جديد", role: "Senior Stylist", initials: "NS", color: "#C9A96E", commission: 0.4, clientsThisMonth: 0, revenueThisMonth: 0, specialties: [], specialtiesAr: [], schedule: "Sat–Thu", scheduleAr: "السبت–الخميس" },
    ]);
  }
  function updateService(i: number, patch: Partial<Service>) {
    const services = [...config.services];
    services[i] = { ...services[i], ...patch };
    update("services", services);
  }
  function removeService(i: number) {
    update("services", config.services.filter((_, idx) => idx !== i));
  }
  function addService() {
    update("services", [
      ...config.services,
      { id: `service-${Date.now()}`, name: "New Service", nameAr: "خدمة جديدة", category: "Cut", price: "0 KD", priceValue: 0, duration: 60, commission: 0.4 },
    ]);
  }
  function updateHour(i: number, patch: { day?: string; time?: string }) {
    const hours = [...config.hours];
    hours[i] = { ...hours[i], ...patch };
    update("hours", hours);
  }

  const aiActive = config.ai.enabled && config.ai.apiKey.trim().length > 0;

  return (
    <>
      <PageHeader title={t("set.title")} subtitle={t("set.subtitle")} />

      <div className="space-y-6 pb-24">
        {/* Profile */}
        <Section icon={Building2} title={t("set.profile")}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t("set.name")} value={config.name} onChange={(v) => update("name", v)} />
            <Field label={t("set.phone")} value={config.phone} onChange={(v) => update("phone", v)} />
            <Field label={t("set.email")} value={config.email} onChange={(v) => update("email", v)} />
            <Field label={t("set.instagram")} value={config.instagram} onChange={(v) => update("instagram", v)} />
            <div className="sm:col-span-2">
              <Field label={t("set.address")} value={config.address} onChange={(v) => update("address", v)} />
            </div>
          </div>
        </Section>

        {/* Language + Theme */}
        <Section icon={Languages} title={t("set.language")}>
          <div className="flex gap-2">
            {(["en", "ar"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  "rounded-xl border px-5 py-2.5 text-sm transition-colors",
                  lang === l ? "border-charcoal bg-charcoal text-cream-50" : "border-gold-200 bg-white text-charcoal-light hover:border-gold-400",
                  l === "ar" && "font-ar"
                )}
              >
                {l === "en" ? "English" : "العربية"}
              </button>
            ))}
          </div>
        </Section>

        <Section icon={Palette} title={t("set.brandColor")}>
          <div className="flex flex-wrap items-center gap-2.5">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => update("themeColor", c)}
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 transition-transform hover:scale-110"
                style={{ backgroundColor: c, borderColor: config.themeColor === c ? "#241A18" : "transparent" }}
                aria-label={c}
              >
                {config.themeColor === c && <Check className="h-4 w-4 text-white" />}
              </button>
            ))}
            <input type="color" value={config.themeColor} onChange={(e) => update("themeColor", e.target.value)} className="h-9 w-12 cursor-pointer rounded-lg border border-gold-200 bg-white" aria-label="Custom color" />
          </div>
        </Section>

        {/* AI Integration */}
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-gold-100 bg-cream-100 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-espresso text-gold-400">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <h2 className="serif text-xl text-charcoal">{t("set.aiIntegration")}</h2>
                <p className="text-xs text-charcoal-muted">{t("set.powerAgent")}</p>
              </div>
            </div>
            <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium", aiActive ? "bg-emerald-100 text-emerald-700" : "bg-gold-100 text-gold-700")}>
              <span className={cn("h-1.5 w-1.5 rounded-full", aiActive ? "bg-emerald-500" : "bg-gold-500")} />
              {aiActive ? t("state.active") : t("state.inactive")}
            </span>
          </div>

          <div className="space-y-5 p-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-charcoal">{t("set.apiKey")}</label>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-muted ltr:left-3 rtl:right-3" />
                <input
                  type={showKey ? "text" : "password"}
                  value={config.ai.apiKey}
                  onChange={(e) => updateAI("apiKey", e.target.value)}
                  placeholder="sk-ant-api03-••••••••••••••••"
                  dir="ltr"
                  className="w-full rounded-xl border border-gold-200 bg-white py-2.5 text-sm text-charcoal outline-none focus:border-gold-400 ltr:pl-9 ltr:pr-11 rtl:pr-9 rtl:pl-11"
                />
                <button type="button" onClick={() => setShowKey((s) => !s)} className="absolute top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal ltr:right-3 rtl:left-3" aria-label="Toggle">
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="mt-1.5 text-xs text-charcoal-muted">
                {t("set.keyHelper")} <span className="font-medium text-gold-600" dir="ltr">console.anthropic.com</span>
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">{t("set.aiModel")}</label>
                <select value={config.ai.model} onChange={(e) => updateAI("model", e.target.value)} className="w-full rounded-xl border border-gold-200 bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none focus:border-gold-400">
                  {AI_MODELS.map((m) => (
                    <option key={m.id} value={m.id}>{m.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">{t("set.enableAi")}</label>
                <button
                  onClick={() => updateAI("enabled", !config.ai.enabled)}
                  className={cn("flex h-[42px] w-full items-center justify-between rounded-xl border px-4 text-sm transition-colors", config.ai.enabled ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-gold-200 bg-white text-charcoal-light")}
                >
                  {config.ai.enabled ? t("set.enabled") : t("set.disabled")}
                  <span className={cn("relative h-6 w-11 rounded-full transition-colors", config.ai.enabled ? "bg-emerald-500" : "bg-cream-300")}>
                    <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ltr:left-0.5 rtl:right-0.5", config.ai.enabled && "ltr:translate-x-5 rtl:-translate-x-5")} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Stylists */}
        <Section icon={Users} title={t("set.stylists")}>
          <div className="space-y-3">
            {config.stylists.map((s, i) => (
              <div key={s.id} className="flex flex-wrap items-center gap-2.5 rounded-xl border border-gold-100 bg-cream-50 p-3">
                <input type="color" value={s.color} onChange={(e) => updateStylist(i, { color: e.target.value })} className="h-9 w-9 shrink-0 cursor-pointer rounded-full border border-gold-200" aria-label="Color" />
                <input value={lang === "ar" ? s.nameAr : s.name} onChange={(e) => updateStylist(i, lang === "ar" ? { nameAr: e.target.value } : { name: e.target.value })} className={cn(inputSm, "w-40")} placeholder={t("appt.stylist")} />
                <select value={s.role} onChange={(e) => updateStylist(i, { role: e.target.value as StaffRole })} className={cn(inputSm, "w-40")}>
                  {ROLES.map((r) => <option key={r} value={r}>{t(`role.${r}`)}</option>)}
                </select>
                <input value={lang === "ar" ? s.scheduleAr : s.schedule} onChange={(e) => updateStylist(i, lang === "ar" ? { scheduleAr: e.target.value } : { schedule: e.target.value })} className={cn(inputSm, "min-w-0 flex-1")} placeholder={t("stf.schedule")} />
                <button onClick={() => removeStylist(i)} className="rounded-lg p-2 text-charcoal-muted hover:bg-cream-200 hover:text-rose-500" aria-label="Remove">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <AddButton onClick={addStylist} label={t("c.addStylist")} />
        </Section>

        {/* Services */}
        <Section icon={Tag} title={t("set.servicesPricing")}>
          <div className="space-y-3">
            {config.services.map((s, i) => (
              <div key={s.id} className="flex flex-wrap items-center gap-2.5 rounded-xl border border-gold-100 bg-cream-50 p-3">
                <input value={lang === "ar" ? s.nameAr : s.name} onChange={(e) => updateService(i, lang === "ar" ? { nameAr: e.target.value } : { name: e.target.value })} className={cn(inputSm, "min-w-0 flex-1")} placeholder={t("sv.service")} />
                <select value={s.category} onChange={(e) => updateService(i, { category: e.target.value as ServiceCategory })} className={cn(inputSm, "w-32")}>
                  {CATEGORY_ORDER.map((c) => <option key={c} value={c}>{t(`cat.${c}`)}</option>)}
                </select>
                <input value={s.price} onChange={(e) => updateService(i, { price: e.target.value })} className={cn(inputSm, "w-28")} placeholder="0 KD" dir="ltr" />
                <input value={s.duration} onChange={(e) => updateService(i, { duration: Number(e.target.value) || 0 })} type="number" className={cn(inputSm, "w-20")} placeholder={t("sv.min")} />
                <button onClick={() => removeService(i)} className="rounded-lg p-2 text-charcoal-muted hover:bg-cream-200 hover:text-rose-500" aria-label="Remove">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <AddButton onClick={addService} label={t("c.addService")} />
        </Section>

        {/* Hours */}
        <Section icon={Clock} title={t("set.hours")}>
          <div className="space-y-2.5">
            {config.hours.map((h, i) => (
              <div key={i} className="flex flex-wrap items-center gap-2.5">
                <input value={h.day} onChange={(e) => updateHour(i, { day: e.target.value })} className={cn(inputSm, "w-36")} />
                <input value={h.time} onChange={(e) => updateHour(i, { time: e.target.value })} className={cn(inputSm, "min-w-0 flex-1")} dir="ltr" />
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Sticky action bar */}
      <div className="sticky bottom-4 z-20 flex items-center justify-between gap-3 rounded-2xl border border-gold-100 bg-white/95 px-5 py-3 shadow-soft backdrop-blur">
        <button onClick={handleReset} className="inline-flex items-center gap-1.5 text-sm text-charcoal-light hover:text-charcoal">
          <RotateCcw className="h-4 w-4" />
          {t("c.resetDefaults")}
        </button>
        <Button onClick={handleSave} variant={saved ? "gold" : "primary"}>
          {saved ? (<><Check className="h-4 w-4" /> {t("c.saved")}</>) : (<><Save className="h-4 w-4" /> {t("c.save")}</>)}
        </Button>
      </div>
    </>
  );
}

const inputSm = "rounded-lg border border-gold-200 bg-white px-3 py-2 text-sm text-charcoal outline-none focus:border-gold-400";

function Section({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center gap-2.5 border-b border-gold-100 px-5 py-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-gold-200 bg-gold-50 text-gold-600">
          <Icon className="h-4 w-4" />
        </span>
        <h2 className="serif text-xl text-charcoal">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </Card>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-charcoal">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-gold-200 bg-white px-4 py-2.5 text-sm text-charcoal outline-none focus:border-gold-400" />
    </div>
  );
}

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-gold-600 hover:text-gold-700">
      <Plus className="h-4 w-4" />
      {label}
    </button>
  );
}
