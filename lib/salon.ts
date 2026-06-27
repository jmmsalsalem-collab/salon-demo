/* ----------------------------------------------------------------
   Studio Luxe — core types & salon configuration (bilingual, KWD)
------------------------------------------------------------------ */

export type ServiceCategory = "Cut" | "Color" | "Treatments" | "Nails" | "Lashes";

export type StaffRole =
  | "Senior Stylist"
  | "Colorist"
  | "Nail Tech"
  | "Lash Artist"
  | "Assistant";

export type Service = {
  id: string;
  name: string;
  nameAr: string;
  category: ServiceCategory;
  price: string; // display range incl. "KD"
  priceValue: number; // KWD representative value
  duration: number; // minutes
  commission: number; // 0–1
};

export type Stylist = {
  id: string;
  name: string;
  nameAr: string;
  role: StaffRole;
  initials: string;
  color: string; // hex — calendar colour-coding
  commission: number;
  clientsThisMonth: number;
  revenueThisMonth: number; // KWD
  specialties: string[];
  specialtiesAr: string[];
  schedule: string;
  scheduleAr: string;
};

export type AISettings = { apiKey: string; model: string; enabled: boolean };

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

export const CATEGORY_ORDER: ServiceCategory[] = ["Cut", "Color", "Treatments", "Nails", "Lashes"];

export const DEFAULT_CONFIG: SalonConfig = {
  name: "Studio Luxe",
  address: "The Avenues Mall, Phase 4, Al-Rai, Kuwait",
  phone: "+965 2225 0142",
  email: "hello@studioluxe.kw",
  instagram: "@studioluxe.kw",
  themeColor: "#C9A96E",
  hours: [
    { day: "Saturday", time: "10:00 AM – 10:00 PM" },
    { day: "Sun – Wed", time: "10:00 AM – 9:00 PM" },
    { day: "Thursday", time: "10:00 AM – 10:00 PM" },
    { day: "Friday", time: "2:00 PM – 10:00 PM" },
  ],
  stylists: [
    {
      id: "sophia",
      name: "Latifa Al-Qadiri",
      nameAr: "لطيفة القادري",
      role: "Senior Stylist",
      initials: "LQ",
      color: "#C9A96E",
      commission: 0.45,
      clientsThisMonth: 84,
      revenueThisMonth: 2450,
      specialties: ["Balayage", "Precision Cuts", "Bridal"],
      specialtiesAr: ["بالياج", "قص دقيق", "عرائس"],
      schedule: "Sat–Wed · 10a–7p",
      scheduleAr: "السبت–الأربعاء · ١٠ص–٧م",
    },
    {
      id: "mia",
      name: "Maryam Haidar",
      nameAr: "مريم حيدر",
      role: "Colorist",
      initials: "MH",
      color: "#A6766A",
      commission: 0.42,
      clientsThisMonth: 76,
      revenueThisMonth: 2980,
      specialties: ["Color Correction", "Vivids", "Highlights"],
      specialtiesAr: ["تصحيح اللون", "ألوان جريئة", "هايلايت"],
      schedule: "Sun–Thu · 10a–9p",
      scheduleAr: "الأحد–الخميس · ١٠ص–٩م",
    },
    {
      id: "jade",
      name: "Shahad Al-Otaibi",
      nameAr: "شهد العتيبي",
      role: "Senior Stylist",
      initials: "SO",
      color: "#8E9B8A",
      commission: 0.4,
      clientsThisMonth: 68,
      revenueThisMonth: 1880,
      specialties: ["Keratin", "Curly Hair", "Extensions"],
      specialtiesAr: ["كيراتين", "شعر مجعّد", "إكستنشن"],
      schedule: "Wed–Sun · 11a–8p",
      scheduleAr: "الأربعاء–الأحد · ١١ص–٨م",
    },
    {
      id: "carlos",
      name: "Yousef Karam",
      nameAr: "يوسف كرم",
      role: "Senior Stylist",
      initials: "YK",
      color: "#7E8AA0",
      commission: 0.44,
      clientsThisMonth: 71,
      revenueThisMonth: 2150,
      specialties: ["Editorial", "Men's Grooming", "Blowouts"],
      specialtiesAr: ["تصوير", "عناية رجالية", "سيشوار"],
      schedule: "Sat–Thu · 11a–10p",
      scheduleAr: "السبت–الخميس · ١١ص–١٠م",
    },
    {
      id: "bella",
      name: "Reem Al-Najjar",
      nameAr: "ريم النجار",
      role: "Nail Tech",
      initials: "RN",
      color: "#B08A82",
      commission: 0.35,
      clientsThisMonth: 92,
      revenueThisMonth: 1320,
      specialties: ["Gel", "Nail Art", "Pedicures"],
      specialtiesAr: ["جل", "رسم أظافر", "بديكير"],
      schedule: "Sat–Thu · 10a–8p",
      scheduleAr: "السبت–الخميس · ١٠ص–٨م",
    },
    {
      id: "aria",
      name: "Noor Abdullah",
      nameAr: "نور عبدالله",
      role: "Lash Artist",
      initials: "NA",
      color: "#C18C5D",
      commission: 0.38,
      clientsThisMonth: 58,
      revenueThisMonth: 1490,
      specialties: ["Volume Lashes", "Lash Lifts", "Brow Lamination"],
      specialtiesAr: ["رموش فوليوم", "رفع رموش", "تصفيف حواجب"],
      schedule: "Wed–Sun · 11a–8p",
      scheduleAr: "الأربعاء–الأحد · ١١ص–٨م",
    },
  ],
  services: [
    { id: "womens-cut", name: "Women's Haircut & Style", nameAr: "قص وتصفيف", category: "Cut", price: "8 – 18 KD", priceValue: 14, duration: 60, commission: 0.45 },
    { id: "mens-cut", name: "Men's Cut", nameAr: "قص رجالي", category: "Cut", price: "6 – 10 KD", priceValue: 8, duration: 45, commission: 0.45 },
    { id: "kids-cut", name: "Kids Cut", nameAr: "قص أطفال", category: "Cut", price: "5 KD", priceValue: 5, duration: 30, commission: 0.4 },
    { id: "blowout", name: "Blowout", nameAr: "سيشوار", category: "Cut", price: "10 – 20 KD", priceValue: 15, duration: 45, commission: 0.4 },
    { id: "root-touchup", name: "Root Touch-Up", nameAr: "صبغ الجذور", category: "Color", price: "25 – 35 KD", priceValue: 30, duration: 75, commission: 0.42 },
    { id: "allover-color", name: "All-Over Color", nameAr: "صبغ كامل", category: "Color", price: "35 – 55 KD", priceValue: 45, duration: 105, commission: 0.42 },
    { id: "partial-highlights", name: "Partial Highlights", nameAr: "هايلايت جزئي", category: "Color", price: "40 – 60 KD", priceValue: 50, duration: 120, commission: 0.42 },
    { id: "full-highlights", name: "Full Highlights", nameAr: "هايلايت كامل", category: "Color", price: "60 – 80 KD", priceValue: 70, duration: 150, commission: 0.42 },
    { id: "balayage", name: "Balayage", nameAr: "بالياج", category: "Color", price: "60 – 120 KD", priceValue: 90, duration: 180, commission: 0.42 },
    { id: "color-correction", name: "Color Correction", nameAr: "تصحيح اللون", category: "Color", price: "100 – 180 KD", priceValue: 140, duration: 240, commission: 0.42 },
    { id: "gloss-toner", name: "Gloss / Toner", nameAr: "غلوس / تونر", category: "Color", price: "18 – 25 KD", priceValue: 22, duration: 45, commission: 0.42 },
    { id: "keratin", name: "Keratin Treatment", nameAr: "علاج كيراتين", category: "Treatments", price: "50 – 100 KD", priceValue: 75, duration: 150, commission: 0.4 },
    { id: "olaplex", name: "Olaplex Treatment", nameAr: "علاج أولابلكس", category: "Treatments", price: "15 KD", priceValue: 15, duration: 30, commission: 0.38 },
    { id: "deep-condition", name: "Deep Conditioning", nameAr: "ترطيب عميق", category: "Treatments", price: "12 KD", priceValue: 12, duration: 30, commission: 0.38 },
    { id: "scalp-treatment", name: "Scalp Treatment", nameAr: "علاج فروة الرأس", category: "Treatments", price: "18 KD", priceValue: 18, duration: 45, commission: 0.38 },
    { id: "classic-mani", name: "Classic Manicure", nameAr: "مانيكير كلاسيكي", category: "Nails", price: "8 KD", priceValue: 8, duration: 45, commission: 0.35 },
    { id: "gel-mani", name: "Gel Manicure", nameAr: "مانيكير جل", category: "Nails", price: "15 KD", priceValue: 15, duration: 60, commission: 0.35 },
    { id: "pedicure", name: "Spa Pedicure", nameAr: "بديكير سبا", category: "Nails", price: "20 KD", priceValue: 20, duration: 60, commission: 0.35 },
    { id: "nail-art", name: "Nail Art (per set)", nameAr: "رسم أظافر", category: "Nails", price: "8 – 25 KD", priceValue: 15, duration: 75, commission: 0.35 },
    { id: "classic-lash", name: "Classic Lash Set", nameAr: "رموش كلاسيك", category: "Lashes", price: "25 KD", priceValue: 25, duration: 90, commission: 0.38 },
    { id: "volume-lash", name: "Volume Lash Set", nameAr: "رموش فوليوم", category: "Lashes", price: "35 – 45 KD", priceValue: 40, duration: 120, commission: 0.38 },
    { id: "lash-fill", name: "Lash Fill", nameAr: "تعبئة رموش", category: "Lashes", price: "20 – 25 KD", priceValue: 22, duration: 60, commission: 0.38 },
    { id: "brow-lam", name: "Brow Lamination", nameAr: "تصفيف حواجب", category: "Lashes", price: "25 KD", priceValue: 25, duration: 60, commission: 0.38 },
  ],
  ai: { apiKey: "", model: "claude-sonnet-4-6", enabled: false },
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
    return { ...DEFAULT_CONFIG, ...parsed, ai: { ...DEFAULT_CONFIG.ai, ...(parsed.ai ?? {}) } };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveConfig(config: SalonConfig) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  window.dispatchEvent(new Event("studio-luxe:config"));
}
