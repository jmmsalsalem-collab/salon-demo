"use client";

import { useEffect, useState } from "react";
import { Save, RotateCcw, Plus, Trash2, Check, Settings2 } from "lucide-react";
import {
  DEFAULT_CONFIG,
  loadConfig,
  saveConfig,
  SalonConfig,
  Service,
  Stylist,
} from "@/lib/salon";
import { Button } from "@/components/ui/Button";

const PRESET_COLORS = [
  "#d76a55",
  "#c2503c",
  "#d8a948",
  "#b07225",
  "#b76e79",
  "#9c6b8f",
  "#6b7f9c",
  "#2e2a2a",
];

export default function SettingsPage() {
  const [config, setConfig] = useState<SalonConfig>(DEFAULT_CONFIG);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setConfig(loadConfig());
  }, []);

  function update<K extends keyof SalonConfig>(key: K, value: SalonConfig[K]) {
    setConfig((c) => ({ ...c, [key]: value }));
    setSaved(false);
  }

  function handleSave() {
    saveConfig(config);
    setSaved(true);
    window.dispatchEvent(new Event("studio-luxe:config"));
    setTimeout(() => setSaved(false), 2500);
  }

  function handleReset() {
    setConfig(DEFAULT_CONFIG);
    saveConfig(DEFAULT_CONFIG);
    window.dispatchEvent(new Event("studio-luxe:config"));
    setSaved(false);
  }

  /* ---- service helpers ---- */
  function updateService(i: number, patch: Partial<Service>) {
    const services = [...config.services];
    services[i] = { ...services[i], ...patch };
    update("services", services);
  }
  function removeService(i: number) {
    update(
      "services",
      config.services.filter((_, idx) => idx !== i)
    );
  }
  function addService() {
    update("services", [
      ...config.services,
      {
        id: `service-${Date.now()}`,
        name: "New Service",
        icon: "Sparkles",
        description: "Describe this service.",
        price: "$0 – $0",
        duration: "60 min",
      },
    ]);
  }

  /* ---- stylist helpers ---- */
  function updateStylist(i: number, patch: Partial<Stylist>) {
    const stylists = [...config.stylists];
    stylists[i] = { ...stylists[i], ...patch };
    if (patch.name) {
      stylists[i].initials = patch.name.slice(0, 2).toUpperCase();
    }
    update("stylists", stylists);
  }
  function removeStylist(i: number) {
    update(
      "stylists",
      config.stylists.filter((_, idx) => idx !== i)
    );
  }
  function addStylist() {
    update("stylists", [
      ...config.stylists,
      {
        id: `stylist-${Date.now()}`,
        name: "New Stylist",
        specialty: "Specialty",
        initials: "NS",
        accent: "from-blush-300 to-gold-300",
      },
    ]);
  }

  /* ---- hours helpers ---- */
  function updateHour(i: number, patch: { day?: string; time?: string }) {
    const hours = [...config.hours];
    hours[i] = { ...hours[i], ...patch };
    update("hours", hours);
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <div className="flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold-200 bg-cream-50 px-4 py-1.5 text-xs tracking-wide text-charcoal-light">
          <Settings2 className="h-3.5 w-3.5 text-gold-500" />
          Template Settings
        </span>
        <h1 className="serif mt-5 text-4xl font-semibold text-charcoal sm:text-5xl">
          Make it yours
        </h1>
        <p className="mt-3 max-w-lg text-charcoal-light">
          Customize this demo for any salon — name, brand color, team, services
          and hours. Everything saves to your browser instantly.
        </p>
      </div>

      <div className="mt-10 space-y-6">
        {/* Brand */}
        <Card title="Brand & contact">
          <div className="grid gap-4 sm:grid-cols-2">
            <LabeledInput
              label="Salon name"
              value={config.name}
              onChange={(v) => update("name", v)}
            />
            <LabeledInput
              label="Tagline"
              value={config.tagline}
              onChange={(v) => update("tagline", v)}
            />
            <LabeledInput
              label="Phone"
              value={config.phone}
              onChange={(v) => update("phone", v)}
            />
            <LabeledInput
              label="Instagram handle"
              value={config.instagram}
              onChange={(v) => update("instagram", v)}
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-charcoal">
              Primary color
            </label>
            <div className="flex flex-wrap items-center gap-2.5">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => update("primaryColor", c)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 transition-transform hover:scale-110"
                  style={{
                    backgroundColor: c,
                    borderColor:
                      config.primaryColor === c ? "#2e2a2a" : "transparent",
                  }}
                  aria-label={`Use color ${c}`}
                >
                  {config.primaryColor === c && (
                    <Check className="h-4 w-4 text-white" />
                  )}
                </button>
              ))}
              <input
                type="color"
                value={config.primaryColor}
                onChange={(e) => update("primaryColor", e.target.value)}
                className="h-9 w-12 cursor-pointer rounded-lg border border-gold-200 bg-white"
                aria-label="Custom color"
              />
            </div>
          </div>
        </Card>

        {/* Stylists */}
        <Card title="Stylists">
          <div className="space-y-3">
            {config.stylists.map((s, i) => (
              <div
                key={s.id}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-gold-100 bg-cream-50 p-3"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${s.accent} text-xs font-semibold text-white`}
                >
                  {s.initials}
                </span>
                <input
                  value={s.name}
                  onChange={(e) => updateStylist(i, { name: e.target.value })}
                  className="w-32 rounded-lg border border-gold-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold-400"
                  placeholder="Name"
                />
                <input
                  value={s.specialty}
                  onChange={(e) =>
                    updateStylist(i, { specialty: e.target.value })
                  }
                  className="min-w-0 flex-1 rounded-lg border border-gold-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold-400"
                  placeholder="Specialty"
                />
                <button
                  onClick={() => removeStylist(i)}
                  className="rounded-lg p-2 text-charcoal-muted hover:bg-blush-50 hover:text-blush-500"
                  aria-label="Remove stylist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addStylist}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-blush-500 hover:text-blush-600"
          >
            <Plus className="h-4 w-4" />
            Add stylist
          </button>
        </Card>

        {/* Services */}
        <Card title="Services & pricing">
          <div className="space-y-3">
            {config.services.map((s, i) => (
              <div
                key={s.id}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-gold-100 bg-cream-50 p-3"
              >
                <input
                  value={s.name}
                  onChange={(e) => updateService(i, { name: e.target.value })}
                  className="min-w-0 flex-1 rounded-lg border border-gold-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold-400"
                  placeholder="Service name"
                />
                <input
                  value={s.price}
                  onChange={(e) => updateService(i, { price: e.target.value })}
                  className="w-28 rounded-lg border border-gold-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold-400"
                  placeholder="$ price"
                />
                <input
                  value={s.duration}
                  onChange={(e) =>
                    updateService(i, { duration: e.target.value })
                  }
                  className="w-24 rounded-lg border border-gold-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold-400"
                  placeholder="Duration"
                />
                <button
                  onClick={() => removeService(i)}
                  className="rounded-lg p-2 text-charcoal-muted hover:bg-blush-50 hover:text-blush-500"
                  aria-label="Remove service"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addService}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-blush-500 hover:text-blush-600"
          >
            <Plus className="h-4 w-4" />
            Add service
          </button>
        </Card>

        {/* Hours */}
        <Card title="Opening hours">
          <div className="space-y-3">
            {config.hours.map((h, i) => (
              <div key={i} className="flex flex-wrap items-center gap-3">
                <input
                  value={h.day}
                  onChange={(e) => updateHour(i, { day: e.target.value })}
                  className="w-32 rounded-lg border border-gold-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold-400"
                />
                <input
                  value={h.time}
                  onChange={(e) => updateHour(i, { time: e.target.value })}
                  className="min-w-0 flex-1 rounded-lg border border-gold-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold-400"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Sticky action bar */}
      <div className="sticky bottom-4 mt-8 flex items-center justify-between gap-3 rounded-2xl border border-gold-100 bg-white/90 px-5 py-3 shadow-soft backdrop-blur">
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 text-sm text-charcoal-light hover:text-charcoal"
        >
          <RotateCcw className="h-4 w-4" />
          Reset to defaults
        </button>
        <Button onClick={handleSave} variant={saved ? "gold" : "primary"}>
          {saved ? (
            <>
              <Check className="h-4 w-4" /> Saved
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Save changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-gold-100 bg-white/70 p-6 shadow-sm sm:p-7">
      <h2 className="serif mb-5 text-2xl text-charcoal">{title}</h2>
      {children}
    </section>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-charcoal">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gold-200 bg-white px-4 py-2.5 text-sm text-charcoal outline-none focus:border-gold-400 focus:shadow-glow"
      />
    </div>
  );
}
