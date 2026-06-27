/* ----------------------------------------------------------------
   Studio Luxe — core types & salon configuration (settings)
   Editable config persists to localStorage.
------------------------------------------------------------------ */

export type ServiceCategory =
  | "Cut"
  | "Color"
  | "Treatments"
  | "Nails"
  | "Lashes";

export type StaffRole =
  | "Senior Stylist"
  | "Colorist"
  | "Nail Tech"
  | "Lash Artist"
  | "Assistant";

export type Service = {
  id: string;
  name: string;
  category: ServiceCategory;
  price: string; // display range, e.g. "$120 – $220"
  priceValue: number; // representative value for calculations
  duration: number; // minutes
  commission: number; // 0–1
};

export type Stylist = {
  id: string;
  name: string;
  role: StaffRole;
  initials: string;
  color: string; // hex — used for calendar colour-coding
  commission: number; // 0–1
  clientsThisMonth: number;
  revenueThisMonth: number;
  specialties: string[];
  schedule: string;
};

export type AISettings = {
  apiKey: string;
  model: string;
  enabled: boolean;
};

export type SalonConfig = {
  name: string;
  address: string;
  phone: string;
  email: string;
  instagram: string;
  themeColor: string;
  hours: { day: string; time: string }[];
  stylists: Stylist[];
  services: Service[];
  ai: AISettings;
};

export const CATEGORY_ORDER: ServiceCategory[] = [
  "Cut",
  "Color",
  "Treatments",
  "Nails",
  "Lashes",
];

export const DEFAULT_CONFIG: SalonConfig = {
  name: "Studio Luxe",
  address: "8423 Melrose Ave, Los Angeles, CA 90069",
  phone: "(310) 555-0142",
  email: "hello@studioluxe.com",
  instagram: "@studioluxe",
  themeColor: "#d76a55",
  hours: [
    { day: "Monday", time: "9:00 AM – 7:00 PM" },
    { day: "Tuesday", time: "9:00 AM – 7:00 PM" },
    { day: "Wednesday", time: "9:00 AM – 8:00 PM" },
    { day: "Thursday", time: "9:00 AM – 8:00 PM" },
    { day: "Friday", time: "9:00 AM – 8:00 PM" },
    { day: "Saturday", time: "8:00 AM – 6:00 PM" },
    { day: "Sunday", time: "10:00 AM – 4:00 PM" },
  ],
  stylists: [
    {
      id: "sophia",
      name: "Sophia Laurent",
      role: "Senior Stylist",
      initials: "SL",
      color: "#d76a55",
      commission: 0.45,
      clientsThisMonth: 84,
      revenueThisMonth: 18420,
      specialties: ["Balayage", "Precision Cuts", "Bridal"],
      schedule: "Tue–Sat · 9a–6p",
    },
    {
      id: "mia",
      name: "Mia Chen",
      role: "Colorist",
      initials: "MC",
      color: "#c8902f",
      commission: 0.42,
      clientsThisMonth: 76,
      revenueThisMonth: 21750,
      specialties: ["Color Correction", "Vivids", "Highlights"],
      schedule: "Mon–Fri · 9a–7p",
    },
    {
      id: "jade",
      name: "Jade Okafor",
      role: "Senior Stylist",
      initials: "JO",
      color: "#b76e79",
      commission: 0.4,
      clientsThisMonth: 68,
      revenueThisMonth: 15980,
      specialties: ["Keratin", "Curly Hair", "Extensions"],
      schedule: "Wed–Sun · 10a–7p",
    },
    {
      id: "carlos",
      name: "Carlos Rivera",
      role: "Senior Stylist",
      initials: "CR",
      color: "#6b7f9c",
      commission: 0.44,
      clientsThisMonth: 71,
      revenueThisMonth: 16240,
      specialties: ["Editorial", "Men's Grooming", "Blowouts"],
      schedule: "Tue–Sat · 10a–8p",
    },
    {
      id: "bella",
      name: "Bella Rossi",
      role: "Nail Tech",
      initials: "BR",
      color: "#9c6b8f",
      commission: 0.35,
      clientsThisMonth: 92,
      revenueThisMonth: 7840,
      specialties: ["Gel", "Nail Art", "Pedicures"],
      schedule: "Mon–Sat · 9a–5p",
    },
    {
      id: "aria",
      name: "Aria Kim",
      role: "Lash Artist",
      initials: "AK",
      color: "#7a9c6b",
      commission: 0.38,
      clientsThisMonth: 58,
      revenueThisMonth: 9120,
      specialties: ["Volume Lashes", "Lash Lifts", "Brow Lamination"],
      schedule: "Wed–Sun · 10a–6p",
    },
  ],
  services: [
    // Cut
    { id: "womens-cut", name: "Women's Haircut & Style", category: "Cut", price: "$65 – $95", priceValue: 80, duration: 60, commission: 0.45 },
    { id: "mens-cut", name: "Men's Cut", category: "Cut", price: "$40 – $55", priceValue: 48, duration: 45, commission: 0.45 },
    { id: "kids-cut", name: "Kids Cut", category: "Cut", price: "$30", priceValue: 30, duration: 30, commission: 0.4 },
    { id: "blowout", name: "Blowout", category: "Cut", price: "$45 – $65", priceValue: 55, duration: 45, commission: 0.4 },
    // Color
    { id: "root-touchup", name: "Root Touch-Up", category: "Color", price: "$75 – $95", priceValue: 85, duration: 75, commission: 0.42 },
    { id: "allover-color", name: "All-Over Color", category: "Color", price: "$95 – $140", priceValue: 120, duration: 105, commission: 0.42 },
    { id: "partial-highlights", name: "Partial Highlights", category: "Color", price: "$120 – $160", priceValue: 140, duration: 120, commission: 0.42 },
    { id: "full-highlights", name: "Full Highlights", category: "Color", price: "$160 – $220", priceValue: 190, duration: 150, commission: 0.42 },
    { id: "balayage", name: "Balayage", category: "Color", price: "$180 – $300", priceValue: 240, duration: 180, commission: 0.42 },
    { id: "color-correction", name: "Color Correction", category: "Color", price: "$250 – $450", priceValue: 350, duration: 240, commission: 0.42 },
    { id: "gloss-toner", name: "Gloss / Toner", category: "Color", price: "$45 – $65", priceValue: 55, duration: 45, commission: 0.42 },
    // Treatments
    { id: "keratin", name: "Keratin Treatment", category: "Treatments", price: "$150 – $250", priceValue: 200, duration: 150, commission: 0.4 },
    { id: "olaplex", name: "Olaplex Treatment", category: "Treatments", price: "$45", priceValue: 45, duration: 30, commission: 0.38 },
    { id: "deep-condition", name: "Deep Conditioning", category: "Treatments", price: "$35", priceValue: 35, duration: 30, commission: 0.38 },
    { id: "scalp-treatment", name: "Scalp Treatment", category: "Treatments", price: "$55", priceValue: 55, duration: 45, commission: 0.38 },
    // Nails
    { id: "classic-mani", name: "Classic Manicure", category: "Nails", price: "$35", priceValue: 35, duration: 45, commission: 0.35 },
    { id: "gel-mani", name: "Gel Manicure", category: "Nails", price: "$50", priceValue: 50, duration: 60, commission: 0.35 },
    { id: "pedicure", name: "Spa Pedicure", category: "Nails", price: "$65", priceValue: 65, duration: 60, commission: 0.35 },
    { id: "nail-art", name: "Nail Art (per set)", category: "Nails", price: "$25 – $85", priceValue: 55, duration: 75, commission: 0.35 },
    // Lashes
    { id: "classic-lash", name: "Classic Lash Set", category: "Lashes", price: "$120", priceValue: 120, duration: 90, commission: 0.38 },
    { id: "volume-lash", name: "Volume Lash Set", category: "Lashes", price: "$160 – $180", priceValue: 170, duration: 120, commission: 0.38 },
    { id: "lash-fill", name: "Lash Fill", category: "Lashes", price: "$65 – $85", priceValue: 75, duration: 60, commission: 0.38 },
    { id: "brow-lam", name: "Brow Lamination", category: "Lashes", price: "$90", priceValue: 90, duration: 60, commission: 0.38 },
  ],
  ai: {
    apiKey: "",
    model: "claude-sonnet-4-6",
    enabled: false,
  },
};

export const AI_MODELS = [
  { id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (recommended)" },
  { id: "claude-opus-4-8", label: "Claude Opus 4.8" },
  { id: "claude-haiku-4-5", label: "Claude Haiku 4.5" },
];

export const STORAGE_KEY = "studio-luxe-crm-config";

export function loadConfig(): SalonConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_CONFIG,
      ...parsed,
      ai: { ...DEFAULT_CONFIG.ai, ...(parsed.ai ?? {}) },
    };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveConfig(config: SalonConfig) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  window.dispatchEvent(new Event("studio-luxe:config"));
}
