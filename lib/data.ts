/* ----------------------------------------------------------------
   Studio Luxe — realistic dummy CRM data
   Stylist & service references use ids from salon.ts config.
------------------------------------------------------------------ */

export type ApptStatus =
  | "Booked"
  | "Confirmed"
  | "In Chair"
  | "Completed"
  | "No Show"
  | "Cancelled";

export const STATUS_META: Record<
  ApptStatus,
  { label: string; bg: string; text: string; dot: string }
> = {
  Booked: { label: "Booked", bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  Confirmed: { label: "Confirmed", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  "In Chair": { label: "In Chair", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  Completed: { label: "Completed", bg: "bg-stone-100", text: "text-stone-600", dot: "bg-stone-400" },
  "No Show": { label: "No Show", bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-500" },
  Cancelled: { label: "Cancelled", bg: "bg-stone-50", text: "text-stone-400", dot: "bg-stone-300" },
};

export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export type Appointment = {
  id: string;
  day: number; // 0 = Mon … 5 = Sat
  start: string; // "HH:MM" 24h
  durationMin: number;
  clientId: string;
  clientName: string;
  stylistId: string;
  services: string[]; // display names
  price: number;
  status: ApptStatus;
};

export type Formula = { name: string; formula: string };
export type HistoryItem = {
  date: string;
  service: string;
  stylistId: string;
  price: number;
  notes?: string;
};
export type CommItem = { date: string; type: "SMS" | "Email" | "Call" | "Note"; summary: string };
export type LoyaltyItem = { date: string; change: number; reason: string };

export type Client = {
  id: string;
  name: string;
  phone: string;
  email: string;
  joined: string;
  birthday: string;
  lastVisit: string;
  daysSince: number;
  nextAppointment: string | null;
  totalVisits: number;
  totalSpent: number;
  preferredStylistId: string;
  loyaltyPoints: number;
  tags: string[];
  notes: string;
  outstanding?: number;
  formulas: Formula[];
  history: HistoryItem[];
  communications: CommItem[];
  loyaltyLog: LoyaltyItem[];
};

export const clients: Client[] = [
  {
    id: "olivia-hartman",
    name: "Olivia Hartman",
    phone: "(310) 555-0184",
    email: "olivia.hartman@gmail.com",
    joined: "Mar 2022",
    birthday: "April 9",
    lastVisit: "Jun 14, 2026",
    daysSince: 13,
    nextAppointment: "Jul 5, 2026",
    totalVisits: 41,
    totalSpent: 8940,
    preferredStylistId: "mia",
    loyaltyPoints: 1240,
    tags: ["VIP", "Color Client"],
    notes: "Cool-toned blonde, hates brass. Books every 6 weeks like clockwork.",
    formulas: [
      { name: "Highlights", formula: "Wella Blondor + 20vol, 35 min · foils" },
      { name: "Toner", formula: "Wella T18 + T11 (3:1) + 6vol, 8 min" },
    ],
    history: [
      { date: "Jun 14, 2026", service: "Full Highlights + Gloss", stylistId: "mia", price: 245, notes: "Added Olaplex No.1 in lightener" },
      { date: "May 2, 2026", service: "Root Touch-Up", stylistId: "mia", price: 95 },
      { date: "Mar 21, 2026", service: "Full Highlights + Haircut", stylistId: "mia", price: 290 },
      { date: "Feb 7, 2026", service: "Balayage Refresh", stylistId: "mia", price: 240 },
    ],
    communications: [
      { date: "Jun 28, 2026", type: "SMS", summary: "Rebooking reminder sent — replied 'yes!'" },
      { date: "Jun 14, 2026", type: "Note", summary: "Loved the brighter face-frame. Wants to go lighter next visit." },
      { date: "Jun 12, 2026", type: "Email", summary: "Appointment confirmation + aftercare tips" },
    ],
    loyaltyLog: [
      { date: "Jun 14, 2026", change: 245, reason: "Visit — Full Highlights" },
      { date: "May 2, 2026", change: 95, reason: "Visit — Root Touch-Up" },
      { date: "Apr 9, 2026", change: 100, reason: "Birthday bonus" },
    ],
  },
  {
    id: "sophia-bennett",
    name: "Sophia Bennett",
    phone: "(323) 555-0119",
    email: "sbennett@outlook.com",
    joined: "Jan 2021",
    birthday: "Nov 22",
    lastVisit: "Jun 20, 2026",
    daysSince: 7,
    nextAppointment: "Jul 18, 2026",
    totalVisits: 63,
    totalSpent: 14310,
    preferredStylistId: "sophia",
    loyaltyPoints: 2080,
    tags: ["VIP", "Bridal"],
    notes: "Getting married Sept 2026 — booked bridal trial. Allergic to PPD (uses ammonia-free line).",
    formulas: [
      { name: "Base Color", formula: "Redken Shades EQ 6N + 7N (1:1), 5vol processing solution" },
    ],
    history: [
      { date: "Jun 20, 2026", service: "Balayage + Haircut", stylistId: "sophia", price: 305 },
      { date: "May 16, 2026", service: "Gloss + Blowout", stylistId: "sophia", price: 110 },
      { date: "Apr 4, 2026", service: "Bridal Trial", stylistId: "sophia", price: 150 },
      { date: "Mar 1, 2026", service: "Balayage", stylistId: "sophia", price: 280 },
    ],
    communications: [
      { date: "Jun 21, 2026", type: "Call", summary: "Discussed bridal timeline + bridesmaid bookings" },
      { date: "Jun 20, 2026", type: "Note", summary: "Wants soft, lived-in dimension for wedding — no harsh contrast." },
    ],
    loyaltyLog: [
      { date: "Jun 20, 2026", change: 305, reason: "Visit — Balayage + Cut" },
      { date: "May 16, 2026", change: 110, reason: "Visit — Gloss + Blowout" },
    ],
  },
  {
    id: "amara-johnson",
    name: "Amara Johnson",
    phone: "(310) 555-0177",
    email: "amara.j@gmail.com",
    joined: "Aug 2023",
    birthday: "June 30",
    lastVisit: "Apr 3, 2026",
    daysSince: 85,
    nextAppointment: null,
    totalVisits: 12,
    totalSpent: 2640,
    preferredStylistId: "jade",
    loyaltyPoints: 410,
    tags: ["Overdue", "Curly Specialist"],
    notes: "Type 3C curls — DevaCut method only. Overdue for rebooking, send win-back offer.",
    formulas: [{ name: "Treatment", formula: "K18 + leave-in, no sulfates" }],
    history: [
      { date: "Apr 3, 2026", service: "Curly Cut + Deep Condition", stylistId: "jade", price: 130 },
      { date: "Jan 18, 2026", service: "Curly Cut", stylistId: "jade", price: 95 },
      { date: "Oct 9, 2025", service: "Keratin Treatment", stylistId: "jade", price: 220 },
    ],
    communications: [
      { date: "Jun 1, 2026", type: "SMS", summary: "Win-back offer (15% off) — no reply yet" },
      { date: "Apr 3, 2026", type: "Note", summary: "Mentioned moving offices — busier schedule." },
    ],
    loyaltyLog: [
      { date: "Apr 3, 2026", change: 130, reason: "Visit — Curly Cut" },
    ],
  },
  {
    id: "isabella-marino",
    name: "Isabella Marino",
    phone: "(424) 555-0163",
    email: "bella.marino@icloud.com",
    joined: "Jun 2020",
    birthday: "Feb 14",
    lastVisit: "Jun 24, 2026",
    daysSince: 3,
    nextAppointment: "Jul 22, 2026",
    totalVisits: 78,
    totalSpent: 11920,
    preferredStylistId: "bella",
    loyaltyPoints: 1760,
    tags: ["VIP", "Nails"],
    notes: "Bi-weekly gel mani, almond shape. Loves chrome + french combos.",
    formulas: [],
    history: [
      { date: "Jun 24, 2026", service: "Gel Manicure + Nail Art", stylistId: "bella", price: 85 },
      { date: "Jun 10, 2026", service: "Gel Manicure", stylistId: "bella", price: 50 },
      { date: "May 27, 2026", service: "Gel Mani + Spa Pedicure", stylistId: "bella", price: 115 },
    ],
    communications: [
      { date: "Jun 24, 2026", type: "Note", summary: "Pre-booked next 3 appointments. Referral: her sister." },
    ],
    loyaltyLog: [
      { date: "Jun 24, 2026", change: 85, reason: "Visit — Gel + Art" },
      { date: "Jun 10, 2026", change: 50, reason: "Visit — Gel Manicure" },
    ],
  },
  {
    id: "grace-kim",
    name: "Grace Kim",
    phone: "(213) 555-0148",
    email: "grace.kim@gmail.com",
    joined: "Feb 2024",
    birthday: "Sep 3",
    lastVisit: "Jun 22, 2026",
    daysSince: 5,
    nextAppointment: "Aug 1, 2026",
    totalVisits: 9,
    totalSpent: 1480,
    preferredStylistId: "aria",
    loyaltyPoints: 320,
    tags: ["Lashes"],
    notes: "Volume lash sets, fills every 2.5 weeks. Sensitive eyes — use sensitive adhesive.",
    formulas: [],
    history: [
      { date: "Jun 22, 2026", service: "Volume Lash Fill", stylistId: "aria", price: 85 },
      { date: "May 30, 2026", service: "Volume Lash Set", stylistId: "aria", price: 180 },
      { date: "May 8, 2026", service: "Brow Lamination", stylistId: "aria", price: 90 },
    ],
    communications: [
      { date: "Jun 22, 2026", type: "Email", summary: "Aftercare + fill reminder scheduled" },
    ],
    loyaltyLog: [
      { date: "Jun 22, 2026", change: 85, reason: "Visit — Lash Fill" },
    ],
  },
  {
    id: "emma-thompson",
    name: "Emma Thompson",
    phone: "(310) 555-0192",
    email: "emma.t@yahoo.com",
    joined: "Nov 2022",
    birthday: "Jul 11",
    lastVisit: "May 9, 2026",
    daysSince: 49,
    nextAppointment: null,
    totalVisits: 22,
    totalSpent: 4180,
    preferredStylistId: "carlos",
    loyaltyPoints: 680,
    tags: ["Overdue"],
    notes: "Lob + curtain bangs. Usually every 8 weeks — slightly overdue.",
    formulas: [{ name: "Gloss", formula: "Shades EQ 09V + clear (1:2)" }],
    history: [
      { date: "May 9, 2026", service: "Haircut + Blowout", stylistId: "carlos", price: 120 },
      { date: "Mar 14, 2026", service: "Haircut + Gloss", stylistId: "carlos", price: 135 },
      { date: "Jan 22, 2026", service: "Women's Haircut & Style", stylistId: "carlos", price: 85 },
    ],
    communications: [
      { date: "Jun 20, 2026", type: "SMS", summary: "Rebooking nudge — opened, no reply" },
    ],
    loyaltyLog: [
      { date: "May 9, 2026", change: 120, reason: "Visit — Haircut + Blowout" },
    ],
  },
  {
    id: "natalie-foster",
    name: "Natalie Foster",
    phone: "(818) 555-0136",
    email: "natalie.foster@gmail.com",
    joined: "Apr 2019",
    birthday: "Dec 1",
    lastVisit: "Jun 18, 2026",
    daysSince: 9,
    nextAppointment: "Jul 30, 2026",
    totalVisits: 95,
    totalSpent: 17650,
    preferredStylistId: "sophia",
    loyaltyPoints: 2640,
    tags: ["VIP", "Top Spender"],
    notes: "Longest-standing client. Full foil + cut + treatment every visit. Always books retail.",
    formulas: [
      { name: "Highlights", formula: "Blondor Freelights + 30vol, 40 min" },
      { name: "Lowlights", formula: "Shades EQ 6NA woven through" },
    ],
    history: [
      { date: "Jun 18, 2026", service: "Full Highlights + Cut + Olaplex", stylistId: "sophia", price: 335 },
      { date: "May 7, 2026", service: "Root Touch-Up + Gloss", stylistId: "sophia", price: 150 },
      { date: "Mar 26, 2026", service: "Full Highlights + Cut", stylistId: "sophia", price: 290 },
    ],
    communications: [
      { date: "Jun 18, 2026", type: "Note", summary: "Bought K18 + Olaplex No.7 retail ($96)." },
    ],
    loyaltyLog: [
      { date: "Jun 18, 2026", change: 335, reason: "Visit — Foils + Cut" },
      { date: "Jun 18, 2026", change: 96, reason: "Retail purchase" },
    ],
  },
  {
    id: "chloe-martinez",
    name: "Chloe Martinez",
    phone: "(323) 555-0150",
    email: "chloem@gmail.com",
    joined: "Sep 2023",
    birthday: "Mar 18",
    lastVisit: "Jun 26, 2026",
    daysSince: 1,
    nextAppointment: "Jul 24, 2026",
    totalVisits: 15,
    totalSpent: 3120,
    preferredStylistId: "mia",
    loyaltyPoints: 540,
    tags: ["Color Client"],
    notes: "Currently going copper. Loves vivid fashion tones for fall.",
    formulas: [{ name: "Copper", formula: "Pravana Copper + 7CG, 20vol" }],
    history: [
      { date: "Jun 26, 2026", service: "All-Over Color + Gloss", stylistId: "mia", price: 165 },
      { date: "May 15, 2026", service: "Color Correction", stylistId: "mia", price: 380 },
    ],
    communications: [
      { date: "Jun 26, 2026", type: "Note", summary: "Patch test clear. Wants to try a vivid red next." },
    ],
    loyaltyLog: [
      { date: "Jun 26, 2026", change: 165, reason: "Visit — Color + Gloss" },
    ],
  },
  {
    id: "ava-robinson",
    name: "Ava Robinson",
    phone: "(310) 555-0128",
    email: "ava.robinson@icloud.com",
    joined: "Jul 2024",
    birthday: "Aug 25",
    lastVisit: "Jun 11, 2026",
    daysSince: 16,
    nextAppointment: "Jul 9, 2026",
    totalVisits: 7,
    totalSpent: 980,
    preferredStylistId: "carlos",
    loyaltyPoints: 210,
    tags: ["New-ish"],
    notes: "Prefers low-maintenance styling. Open to product recommendations.",
    formulas: [],
    history: [
      { date: "Jun 11, 2026", service: "Women's Haircut & Style", stylistId: "carlos", price: 85 },
      { date: "Apr 30, 2026", service: "Blowout", stylistId: "carlos", price: 55 },
    ],
    communications: [
      { date: "Jun 11, 2026", type: "Email", summary: "Sent styling product recs (round brush + heat protect)." },
    ],
    loyaltyLog: [{ date: "Jun 11, 2026", change: 85, reason: "Visit — Haircut" }],
  },
  {
    id: "mila-davis",
    name: "Mila Davis",
    phone: "(424) 555-0171",
    email: "mila.davis@gmail.com",
    joined: "Oct 2021",
    birthday: "Jan 7",
    lastVisit: "Mar 28, 2026",
    daysSince: 91,
    nextAppointment: null,
    totalVisits: 28,
    totalSpent: 5240,
    preferredStylistId: "jade",
    loyaltyPoints: 760,
    tags: ["Overdue", "At-Risk"],
    notes: "Keratin every 12 weeks. 3 months out — high priority win-back.",
    formulas: [{ name: "Keratin", formula: "Brazilian Blowout original, flat iron 450°F" }],
    history: [
      { date: "Mar 28, 2026", service: "Keratin Treatment + Cut", stylistId: "jade", price: 280 },
      { date: "Jan 4, 2026", service: "Keratin Treatment", stylistId: "jade", price: 220 },
    ],
    communications: [
      { date: "Jun 15, 2026", type: "SMS", summary: "Win-back: 'We miss you' + 20% off — delivered" },
    ],
    loyaltyLog: [{ date: "Mar 28, 2026", change: 280, reason: "Visit — Keratin + Cut" }],
  },
  {
    id: "harper-lewis",
    name: "Harper Lewis",
    phone: "(213) 555-0145",
    email: "harper.lewis@outlook.com",
    joined: "May 2023",
    birthday: "Oct 14",
    lastVisit: "Jun 25, 2026",
    daysSince: 2,
    nextAppointment: "Jul 16, 2026",
    totalVisits: 19,
    totalSpent: 3680,
    preferredStylistId: "bella",
    loyaltyPoints: 590,
    tags: ["Nails", "Lashes"],
    notes: "Combo nail + lash appointments. Books on Saturdays.",
    formulas: [],
    history: [
      { date: "Jun 25, 2026", service: "Gel Manicure + Lash Fill", stylistId: "bella", price: 135 },
      { date: "Jun 4, 2026", service: "Spa Pedicure", stylistId: "bella", price: 65 },
    ],
    communications: [
      { date: "Jun 25, 2026", type: "Note", summary: "Prefers Saturday mornings — pre-booked." },
    ],
    loyaltyLog: [{ date: "Jun 25, 2026", change: 135, reason: "Visit — Mani + Lash" }],
  },
  {
    id: "zoe-anderson",
    name: "Zoe Anderson",
    phone: "(818) 555-0159",
    email: "zoe.anderson@gmail.com",
    joined: "Dec 2022",
    birthday: "May 29",
    lastVisit: "Jun 16, 2026",
    daysSince: 11,
    nextAppointment: "Jul 11, 2026",
    totalVisits: 24,
    totalSpent: 4920,
    preferredStylistId: "mia",
    loyaltyPoints: 720,
    tags: ["Color Client"],
    outstanding: 45,
    notes: "Brunette balayage. Has a $45 outstanding balance from last gloss add-on.",
    formulas: [{ name: "Balayage", formula: "Blondor freehand + 20vol, open air" }],
    history: [
      { date: "Jun 16, 2026", service: "Balayage + Gloss", stylistId: "mia", price: 285, notes: "Gloss add-on billed to balance" },
      { date: "Apr 25, 2026", service: "Partial Highlights", stylistId: "mia", price: 140 },
    ],
    communications: [
      { date: "Jun 17, 2026", type: "Email", summary: "Invoice for $45 balance sent." },
    ],
    loyaltyLog: [{ date: "Jun 16, 2026", change: 285, reason: "Visit — Balayage" }],
  },
  {
    id: "lily-nguyen",
    name: "Lily Nguyen",
    phone: "(310) 555-0133",
    email: "lily.nguyen@icloud.com",
    joined: "Mar 2025",
    birthday: "Jul 2",
    lastVisit: "Jun 27, 2026",
    daysSince: 0,
    nextAppointment: "Jul 25, 2026",
    totalVisits: 5,
    totalSpent: 720,
    preferredStylistId: "aria",
    loyaltyPoints: 150,
    tags: ["New", "Lashes"],
    notes: "New client — first volume set today. Referred by Grace Kim.",
    formulas: [],
    history: [
      { date: "Jun 27, 2026", service: "Volume Lash Set", stylistId: "aria", price: 180 },
      { date: "May 20, 2026", service: "Classic Lash Set", stylistId: "aria", price: 120 },
    ],
    communications: [
      { date: "Jun 27, 2026", type: "Note", summary: "Loved the volume set. Booked a fill in 3 weeks." },
    ],
    loyaltyLog: [
      { date: "Jun 27, 2026", change: 180, reason: "Visit — Volume Lash Set" },
      { date: "Mar 4, 2026", change: 50, reason: "New client welcome bonus" },
    ],
  },
  {
    id: "mateo-garcia",
    name: "Mateo Garcia",
    phone: "(323) 555-0188",
    email: "mateo.garcia@gmail.com",
    joined: "Jan 2023",
    birthday: "Apr 21",
    lastVisit: "Jun 19, 2026",
    daysSince: 8,
    nextAppointment: "Jul 17, 2026",
    totalVisits: 31,
    totalSpent: 2480,
    preferredStylistId: "carlos",
    loyaltyPoints: 380,
    tags: ["Men's Grooming"],
    notes: "Men's cut + beard every 3 weeks. Skin fade, scissor on top.",
    formulas: [],
    history: [
      { date: "Jun 19, 2026", service: "Men's Cut + Beard", stylistId: "carlos", price: 60 },
      { date: "May 29, 2026", service: "Men's Cut", stylistId: "carlos", price: 48 },
    ],
    communications: [
      { date: "Jun 19, 2026", type: "Note", summary: "Standing 3-week appointment set." },
    ],
    loyaltyLog: [{ date: "Jun 19, 2026", change: 60, reason: "Visit — Men's Cut + Beard" }],
  },
];

export function getClient(id: string): Client | undefined {
  return clients.find((c) => c.id === id);
}

/* ---------------- Appointments (current week) ---------------- */

export const appointments: Appointment[] = [
  // Mon
  { id: "a1", day: 0, start: "09:30", durationMin: 60, clientId: "ava-robinson", clientName: "Ava Robinson", stylistId: "carlos", services: ["Women's Haircut & Style"], price: 85, status: "Completed" },
  { id: "a2", day: 0, start: "10:00", durationMin: 105, clientId: "chloe-martinez", clientName: "Chloe Martinez", stylistId: "mia", services: ["All-Over Color", "Gloss"], price: 165, status: "Completed" },
  { id: "a3", day: 0, start: "11:00", durationMin: 60, clientId: "isabella-marino", clientName: "Isabella Marino", stylistId: "bella", services: ["Gel Manicure"], price: 50, status: "Completed" },
  { id: "a4", day: 0, start: "13:00", durationMin: 90, clientId: "grace-kim", clientName: "Grace Kim", stylistId: "aria", services: ["Volume Lash Fill"], price: 85, status: "No Show" },
  // Tue
  { id: "a5", day: 1, start: "09:00", durationMin: 150, clientId: "natalie-foster", clientName: "Natalie Foster", stylistId: "sophia", services: ["Full Highlights", "Haircut"], price: 290, status: "Completed" },
  { id: "a6", day: 1, start: "10:30", durationMin: 60, clientId: "mateo-garcia", clientName: "Mateo Garcia", stylistId: "carlos", services: ["Men's Cut", "Beard"], price: 60, status: "Completed" },
  { id: "a7", day: 1, start: "14:00", durationMin: 120, clientId: "zoe-anderson", clientName: "Zoe Anderson", stylistId: "mia", services: ["Partial Highlights"], price: 140, status: "Completed" },
  // Wed
  { id: "a8", day: 2, start: "10:00", durationMin: 180, clientId: "sophia-bennett", clientName: "Sophia Bennett", stylistId: "sophia", services: ["Balayage", "Haircut"], price: 305, status: "Completed" },
  { id: "a9", day: 2, start: "11:30", durationMin: 90, clientId: "lily-nguyen", clientName: "Lily Nguyen", stylistId: "aria", services: ["Classic Lash Set"], price: 120, status: "Cancelled" },
  { id: "a10", day: 2, start: "15:00", durationMin: 150, clientId: "mila-davis", clientName: "Mila Davis", stylistId: "jade", services: ["Keratin Treatment"], price: 220, status: "Completed" },
  // Thu (busy "today" view)
  { id: "a11", day: 3, start: "09:00", durationMin: 150, clientId: "olivia-hartman", clientName: "Olivia Hartman", stylistId: "mia", services: ["Full Highlights", "Gloss"], price: 245, status: "In Chair" },
  { id: "a12", day: 3, start: "09:30", durationMin: 60, clientId: "harper-lewis", clientName: "Harper Lewis", stylistId: "bella", services: ["Gel Manicure"], price: 50, status: "In Chair" },
  { id: "a13", day: 3, start: "10:00", durationMin: 60, clientId: "ava-robinson", clientName: "Ava Robinson", stylistId: "carlos", services: ["Blowout"], price: 55, status: "Confirmed" },
  { id: "a14", day: 3, start: "11:00", durationMin: 90, clientId: "grace-kim", clientName: "Grace Kim", stylistId: "aria", services: ["Volume Lash Fill"], price: 85, status: "Confirmed" },
  { id: "a15", day: 3, start: "12:30", durationMin: 180, clientId: "natalie-foster", clientName: "Natalie Foster", stylistId: "sophia", services: ["Full Highlights", "Cut", "Olaplex"], price: 335, status: "Booked" },
  { id: "a16", day: 3, start: "13:00", durationMin: 105, clientId: "chloe-martinez", clientName: "Chloe Martinez", stylistId: "mia", services: ["All-Over Color"], price: 120, status: "Booked" },
  { id: "a17", day: 3, start: "14:00", durationMin: 60, clientId: "mateo-garcia", clientName: "Mateo Garcia", stylistId: "carlos", services: ["Men's Cut"], price: 48, status: "Booked" },
  { id: "a18", day: 3, start: "15:30", durationMin: 60, clientId: "isabella-marino", clientName: "Isabella Marino", stylistId: "bella", services: ["Spa Pedicure"], price: 65, status: "Booked" },
  { id: "a19", day: 3, start: "16:00", durationMin: 120, clientId: "zoe-anderson", clientName: "Zoe Anderson", stylistId: "mia", services: ["Balayage", "Gloss"], price: 285, status: "Booked" },
  // Fri
  { id: "a20", day: 4, start: "09:30", durationMin: 60, clientId: "emma-thompson", clientName: "Emma Thompson", stylistId: "carlos", services: ["Haircut", "Blowout"], price: 120, status: "Booked" },
  { id: "a21", day: 4, start: "10:00", durationMin: 90, clientId: "lily-nguyen", clientName: "Lily Nguyen", stylistId: "aria", services: ["Volume Lash Set"], price: 180, status: "Confirmed" },
  { id: "a22", day: 4, start: "11:00", durationMin: 75, clientId: "olivia-hartman", clientName: "Olivia Hartman", stylistId: "mia", services: ["Root Touch-Up"], price: 95, status: "Booked" },
  { id: "a23", day: 4, start: "14:00", durationMin: 60, clientId: "harper-lewis", clientName: "Harper Lewis", stylistId: "bella", services: ["Gel Manicure", "Nail Art"], price: 85, status: "Booked" },
  // Sat
  { id: "a24", day: 5, start: "08:30", durationMin: 180, clientId: "sophia-bennett", clientName: "Sophia Bennett", stylistId: "sophia", services: ["Bridal Trial"], price: 150, status: "Confirmed" },
  { id: "a25", day: 5, start: "09:00", durationMin: 60, clientId: "isabella-marino", clientName: "Isabella Marino", stylistId: "bella", services: ["Gel Manicure", "Nail Art"], price: 85, status: "Confirmed" },
  { id: "a26", day: 5, start: "10:00", durationMin: 60, clientId: "harper-lewis", clientName: "Harper Lewis", stylistId: "aria", services: ["Lash Fill"], price: 75, status: "Booked" },
  { id: "a27", day: 5, start: "11:00", durationMin: 105, clientId: "chloe-martinez", clientName: "Chloe Martinez", stylistId: "mia", services: ["All-Over Color", "Gloss"], price: 165, status: "Booked" },
  { id: "a28", day: 5, start: "12:00", durationMin: 60, clientId: "mateo-garcia", clientName: "Mateo Garcia", stylistId: "carlos", services: ["Men's Cut", "Beard"], price: 60, status: "Booked" },
];

/* ---------------- Dashboard metrics ---------------- */

export const dashboard = {
  revenueToday: 1685,
  revenueTodayDelta: 0.12,
  appointmentsToday: 9,
  appointmentsTodayDelta: 0.0,
  clientsThisMonth: 449,
  clientsThisMonthDelta: 0.08,
  newClientsThisMonth: 37,
  newClientsDelta: 0.15,
  avgTicket: 127,
  avgTicketDelta: 0.04,
  rebookingRate: 0.72,
  rebookingDelta: 0.03,
};

export const revenueByWeek = [
  { week: "May 5", revenue: 18420 },
  { week: "May 12", revenue: 21050 },
  { week: "May 19", revenue: 19880 },
  { week: "May 26", revenue: 23410 },
  { week: "Jun 2", revenue: 22180 },
  { week: "Jun 9", revenue: 24960 },
  { week: "Jun 16", revenue: 26340 },
  { week: "Jun 23", revenue: 19720 },
];

export const servicesBreakdown = [
  { category: "Color", value: 41200, color: "#c8902f" },
  { category: "Cut", value: 18600, color: "#d76a55" },
  { category: "Treatments", value: 9800, color: "#b76e79" },
  { category: "Nails", value: 8400, color: "#9c6b8f" },
  { category: "Lashes", value: 9300, color: "#7a9c6b" },
];

export const revenueDaily = [
  { day: "Jun 21", revenue: 2240 },
  { day: "Jun 22", revenue: 1980 },
  { day: "Jun 23", revenue: 2670 },
  { day: "Jun 24", revenue: 3120 },
  { day: "Jun 25", revenue: 2890 },
  { day: "Jun 26", revenue: 3340 },
  { day: "Jun 27", revenue: 1685 },
];

export const revenueMonthly = [
  { month: "Jan", services: 58200, retail: 6400 },
  { month: "Feb", services: 61800, retail: 7100 },
  { month: "Mar", services: 67400, retail: 8200 },
  { month: "Apr", services: 64900, retail: 7600 },
  { month: "May", services: 72300, retail: 9100 },
  { month: "Jun", services: 69820, retail: 8740 },
];

export const retailProducts = [
  { name: "K18 Leave-In Mask", units: 42, revenue: 1680 },
  { name: "Olaplex No. 7 Oil", units: 38, revenue: 1102 },
  { name: "Moroccanoil Treatment", units: 31, revenue: 1085 },
  { name: "Kerastase Shampoo", units: 29, revenue: 928 },
  { name: "Wet Brush + Accessories", units: 54, revenue: 756 },
];
