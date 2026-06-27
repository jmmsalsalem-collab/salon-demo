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
} from "lucide-react";
import { PageHeader } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
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

const PRESET_COLORS = ["#d76a55", "#c2503c", "#d8a948", "#b07225", "#b76e79", "#9c6b8f", "#6b7f9c", "#2e2a2a"];
const ROLES: StaffRole[] = ["Senior Stylist", "Colorist", "Nail Tech", "Lash Artist", "Assistant"];

export default function SettingsPage() {
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

  /* stylists */
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
      { id: `stylist-${Date.now()}`, name: "New Stylist", role: "Senior Stylist", initials: "NS", color: "#d76a55", commission: 0.4, clientsThisMonth: 0, revenueThisMonth: 0, specialties: [], schedule: "Tue–Sat" },
    ]);
  }

  /* services */
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
      { id: `service-${Date.now()}`, name: "New Service", category: "Cut", price: "$0", priceValue: 0, duration: 60, commission: 0.4 },
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
      <PageHeader title="Settings" subtitle="Customize this template for any salon. Saved to your browser." />

      <div className="space-y-6 pb-24">
        {/* Salon profile */}
        <Section icon={Building2} title="Salon profile">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Salon name" value={config.name} onChange={(v) => update("name", v)} />
            <Field label="Phone" value={config.phone} onChange={(v) => update("phone", v)} />
            <Field label="Email" value={config.email} onChange={(v) => update("email", v)} />
            <Field label="Instagram" value={config.instagram} onChange={(v) => update("instagram", v)} />
            <div className="sm:col-span-2">
              <Field label="Address" value={config.address} onChange={(v) => update("address", v)} />
            </div>
          </div>
        </Section>

        {/* Theme */}
        <Section icon={Palette} title="Brand color">
          <div className="flex flex-wrap items-center gap-2.5">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => update("themeColor", c)}
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 transition-transform hover:scale-110"
                style={{ backgroundColor: c, borderColor: config.themeColor === c ? "#2e2a2a" : "transparent" }}
                aria-label={`Color ${c}`}
              >
                {config.themeColor === c && <Check className="h-4 w-4 text-white" />}
              </button>
            ))}
            <input
              type="color"
              value={config.themeColor}
              onChange={(e) => update("themeColor", e.target.value)}
              className="h-9 w-12 cursor-pointer rounded-lg border border-gold-200 bg-white"
              aria-label="Custom color"
            />
          </div>
        </Section>

        {/* AI Integration */}
        <Card className="overflow-hidden border-charcoal/10">
          <div className="flex items-center justify-between gap-3 border-b border-gold-100 bg-gradient-to-r from-cream-100 to-blush-50 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-charcoal to-charcoal-light text-gold-300">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <h2 className="serif text-xl text-charcoal">AI Integration</h2>
                <p className="text-xs text-charcoal-muted">Power the Studio Luxe AI Agent</p>
              </div>
            </div>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                aiActive ? "bg-emerald-100 text-emerald-700" : "bg-gold-100 text-gold-700"
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", aiActive ? "bg-emerald-500" : "bg-gold-500")} />
              {aiActive ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="space-y-5 p-5">
            {/* API key */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-charcoal">Anthropic API Key</label>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-muted" />
                <input
                  type={showKey ? "text" : "password"}
                  value={config.ai.apiKey}
                  onChange={(e) => updateAI("apiKey", e.target.value)}
                  placeholder="sk-ant-api03-••••••••••••••••"
                  className="w-full rounded-xl border border-gold-200 bg-white py-2.5 pl-9 pr-11 text-sm text-charcoal outline-none focus:border-gold-400 focus:shadow-glow"
                />
                <button
                  type="button"
                  onClick={() => setShowKey((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal"
                  aria-label="Toggle key visibility"
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="mt-1.5 text-xs text-charcoal-muted">
                Your key is stored locally and never sent to our servers. Get a key at{" "}
                <span className="font-medium text-blush-500">console.anthropic.com</span>.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Model */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">AI Model</label>
                <select
                  value={config.ai.model}
                  onChange={(e) => updateAI("model", e.target.value)}
                  className="w-full rounded-xl border border-gold-200 bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none focus:border-gold-400"
                >
                  {AI_MODELS.map((m) => (
                    <option key={m.id} value={m.id}>{m.label}</option>
                  ))}
                </select>
              </div>

              {/* Enable toggle */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">Enable AI Assistant</label>
                <button
                  onClick={() => updateAI("enabled", !config.ai.enabled)}
                  className={cn(
                    "flex h-[42px] w-full items-center justify-between rounded-xl border px-4 text-sm transition-colors",
                    config.ai.enabled ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-gold-200 bg-white text-charcoal-light"
                  )}
                >
                  {config.ai.enabled ? "Enabled" : "Disabled"}
                  <span className={cn("relative h-6 w-11 rounded-full transition-colors", config.ai.enabled ? "bg-emerald-500" : "bg-stone-300")}>
                    <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform", config.ai.enabled ? "translate-x-[22px]" : "translate-x-0.5")} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Stylists */}
        <Section icon={Users} title="Stylists">
          <div className="space-y-3">
            {config.stylists.map((s, i) => (
              <div key={s.id} className="flex flex-wrap items-center gap-2.5 rounded-xl border border-gold-100 bg-cream-50 p-3">
                <input type="color" value={s.color} onChange={(e) => updateStylist(i, { color: e.target.value })} className="h-9 w-9 shrink-0 cursor-pointer rounded-full border border-gold-200" aria-label="Stylist color" />
                <input value={s.name} onChange={(e) => updateStylist(i, { name: e.target.value })} className={cn(inputSm, "w-36")} placeholder="Name" />
                <select value={s.role} onChange={(e) => updateStylist(i, { role: e.target.value as StaffRole })} className={cn(inputSm, "w-36")}>
                  {ROLES.map((r) => <option key={r}>{r}</option>)}
                </select>
                <input value={s.schedule} onChange={(e) => updateStylist(i, { schedule: e.target.value })} className={cn(inputSm, "min-w-0 flex-1")} placeholder="Schedule" />
                <button onClick={() => removeStylist(i)} className="rounded-lg p-2 text-charcoal-muted hover:bg-blush-50 hover:text-blush-500" aria-label="Remove">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <AddButton onClick={addStylist} label="Add stylist" />
        </Section>

        {/* Services */}
        <Section icon={Tag} title="Services & pricing">
          <div className="space-y-3">
            {config.services.map((s, i) => (
              <div key={s.id} className="flex flex-wrap items-center gap-2.5 rounded-xl border border-gold-100 bg-cream-50 p-3">
                <input value={s.name} onChange={(e) => updateService(i, { name: e.target.value })} className={cn(inputSm, "min-w-0 flex-1")} placeholder="Service name" />
                <select value={s.category} onChange={(e) => updateService(i, { category: e.target.value as ServiceCategory })} className={cn(inputSm, "w-32")}>
                  {CATEGORY_ORDER.map((c) => <option key={c}>{c}</option>)}
                </select>
                <input value={s.price} onChange={(e) => updateService(i, { price: e.target.value })} className={cn(inputSm, "w-28")} placeholder="$ price" />
                <input value={s.duration} onChange={(e) => updateService(i, { duration: Number(e.target.value) || 0 })} type="number" className={cn(inputSm, "w-20")} placeholder="min" />
                <button onClick={() => removeService(i)} className="rounded-lg p-2 text-charcoal-muted hover:bg-blush-50 hover:text-blush-500" aria-label="Remove">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <AddButton onClick={addService} label="Add service" />
        </Section>

        {/* Hours */}
        <Section icon={Clock} title="Opening hours">
          <div className="space-y-2.5">
            {config.hours.map((h, i) => (
              <div key={i} className="flex flex-wrap items-center gap-2.5">
                <input value={h.day} onChange={(e) => updateHour(i, { day: e.target.value })} className={cn(inputSm, "w-32")} />
                <input value={h.time} onChange={(e) => updateHour(i, { time: e.target.value })} className={cn(inputSm, "min-w-0 flex-1")} />
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Sticky action bar */}
      <div className="sticky bottom-4 z-20 flex items-center justify-between gap-3 rounded-2xl border border-gold-100 bg-white/90 px-5 py-3 shadow-soft backdrop-blur">
        <button onClick={handleReset} className="inline-flex items-center gap-1.5 text-sm text-charcoal-light hover:text-charcoal">
          <RotateCcw className="h-4 w-4" />
          Reset to defaults
        </button>
        <Button onClick={handleSave} variant={saved ? "gold" : "primary"}>
          {saved ? (<><Check className="h-4 w-4" /> Saved</>) : (<><Save className="h-4 w-4" /> Save changes</>)}
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
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blush-100 text-blush-500">
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
      <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-gold-200 bg-white px-4 py-2.5 text-sm text-charcoal outline-none focus:border-gold-400 focus:shadow-glow" />
    </div>
  );
}

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-blush-500 hover:text-blush-600">
      <Plus className="h-4 w-4" />
      {label}
    </button>
  );
}
