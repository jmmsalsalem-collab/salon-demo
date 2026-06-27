export type Service = {
  id: string;
  name: string;
  icon: string; // lucide icon name
  description: string;
  price: string;
  duration: string;
};

export type Stylist = {
  id: string;
  name: string;
  specialty: string;
  initials: string;
  accent: string; // tailwind gradient classes
};

export type SalonConfig = {
  name: string;
  tagline: string;
  primaryColor: string;
  phone: string;
  instagram: string;
  hours: { day: string; time: string }[];
  services: Service[];
  stylists: Stylist[];
};

export const DEFAULT_CONFIG: SalonConfig = {
  name: "Studio Luxe",
  tagline: "AI-Powered Style, Effortlessly Beautiful",
  primaryColor: "#d76a55",
  phone: "(310) 555-0142",
  instagram: "@studioluxe",
  hours: [
    { day: "Mon – Tue", time: "9:00 AM – 7:00 PM" },
    { day: "Wed – Fri", time: "9:00 AM – 8:00 PM" },
    { day: "Saturday", time: "8:00 AM – 6:00 PM" },
    { day: "Sunday", time: "10:00 AM – 4:00 PM" },
  ],
  services: [
    {
      id: "haircut",
      name: "Haircut & Style",
      icon: "Scissors",
      description: "A precision cut tailored to your face shape, finished with a runway-ready blow-dry.",
      price: "$65 – $95",
      duration: "60 min",
    },
    {
      id: "color",
      name: "Color & Highlights",
      icon: "Palette",
      description: "Dimensional, glossy color — from subtle root touch-ups to full transformations.",
      price: "$120 – $220",
      duration: "120 min",
    },
    {
      id: "balayage",
      name: "Balayage",
      icon: "Sparkles",
      description: "Hand-painted, sun-kissed dimension that grows out beautifully and naturally.",
      price: "$180 – $300",
      duration: "180 min",
    },
    {
      id: "keratin",
      name: "Keratin Treatment",
      icon: "Wind",
      description: "Smooth, frizz-free hair for up to 12 weeks. Less time styling, more time living.",
      price: "$150 – $250",
      duration: "150 min",
    },
    {
      id: "blowout",
      name: "Blowout",
      icon: "Waves",
      description: "Voluminous, bouncy, picture-perfect hair for any occasion or no occasion at all.",
      price: "$45 – $65",
      duration: "45 min",
    },
    {
      id: "bridal",
      name: "Bridal",
      icon: "Crown",
      description: "Your wedding day, flawless. Trials, on-site styling, and a glam team that gets you.",
      price: "$250 – $500",
      duration: "Custom",
    },
    {
      id: "nails",
      name: "Nail Services",
      icon: "Hand",
      description: "Manicures, gel, and nail art finished to perfection in our serene nail lounge.",
      price: "$35 – $85",
      duration: "60 min",
    },
    {
      id: "lashes",
      name: "Lash Extensions",
      icon: "Eye",
      description: "Wake up gorgeous. Classic to volume lash sets that flatter your eye shape.",
      price: "$90 – $180",
      duration: "90 min",
    },
  ],
  stylists: [
    {
      id: "sophia",
      name: "Sophia",
      specialty: "Color & Balayage Specialist",
      initials: "SO",
      accent: "from-blush-300 to-gold-300",
    },
    {
      id: "mia",
      name: "Mia",
      specialty: "Precision Cuts & Bridal",
      initials: "MI",
      accent: "from-gold-300 to-blush-200",
    },
    {
      id: "jade",
      name: "Jade",
      specialty: "Lash, Brow & Keratin Expert",
      initials: "JA",
      accent: "from-blush-200 to-blush-400",
    },
    {
      id: "carlos",
      name: "Carlos",
      specialty: "Editorial Styling & Blowouts",
      initials: "CA",
      accent: "from-gold-400 to-gold-200",
    },
  ],
};

export const STORAGE_KEY = "studio-luxe-config";

export function loadConfig(): SalonConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveConfig(config: SalonConfig) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}
