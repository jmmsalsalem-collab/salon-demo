/* ----------------------------------------------------------------
   Studio Luxe — bilingual (EN/AR), KWD demo CRM data
------------------------------------------------------------------ */

export type ApptStatus =
  | "Booked"
  | "Confirmed"
  | "In Chair"
  | "Completed"
  | "No Show"
  | "Cancelled";

// Refined, minimal status palette
export const STATUS_META: Record<
  ApptStatus,
  { bg: string; text: string; dot: string }
> = {
  Booked: { bg: "bg-slate-50", text: "text-slate-600", dot: "bg-slate-400" },
  Confirmed: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  "In Chair": { bg: "bg-gold-100", text: "text-gold-700", dot: "bg-gold-500" },
  Completed: { bg: "bg-cream-200", text: "text-charcoal-light", dot: "bg-charcoal-muted" },
  "No Show": { bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-500" },
  Cancelled: { bg: "bg-cream-100", text: "text-charcoal-muted", dot: "bg-cream-300" },
};

export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export type Appointment = {
  id: string;
  day: number; // 0 = Mon … 5 = Sat
  start: string; // "HH:MM"
  durationMin: number;
  clientId: string;
  clientName: string;
  clientNameAr: string;
  stylistId: string;
  services: string[];
  servicesAr: string[];
  price: number;
  status: ApptStatus;
};

export type Formula = { name: string; nameAr: string; formula: string };
export type HistoryItem = {
  date: string;
  service: string;
  serviceAr: string;
  stylistId: string;
  price: number;
  notes?: string;
  notesAr?: string;
};
export type CommItem = {
  date: string;
  type: "SMS" | "Email" | "Call" | "Note";
  summary: string;
  summaryAr: string;
};
export type LoyaltyItem = { date: string; change: number; reason: string; reasonAr: string };

export type Client = {
  id: string;
  name: string;
  nameAr: string;
  phone: string;
  email: string;
  joined: string;
  birthday: string;
  lastVisit: string;
  daysSince: number;
  nextAppointment: string | null;
  totalVisits: number;
  totalSpent: number; // KWD
  preferredStylistId: string;
  loyaltyPoints: number;
  tags: string[];
  notes: string;
  notesAr: string;
  outstanding?: number;
  formulas: Formula[];
  history: HistoryItem[];
  communications: CommItem[];
  loyaltyLog: LoyaltyItem[];
};

export const clients: Client[] = [
  {
    id: "noura-al-ajmi",
    name: "Noura Al-Ajmi",
    nameAr: "نورة العجمي",
    phone: "+965 9912 0184",
    email: "noura.alajmi@gmail.com",
    joined: "Apr 2019",
    birthday: "Dec 1",
    lastVisit: "Jun 18, 2026",
    daysSince: 9,
    nextAppointment: "Jul 30, 2026",
    totalVisits: 95,
    totalSpent: 4260,
    preferredStylistId: "sophia",
    loyaltyPoints: 2640,
    tags: ["VIP", "Top Spender"],
    notes: "Longest-standing client. Full foil + cut + treatment every visit. Always buys retail.",
    notesAr: "أقدم عميلة لدينا. هايلايت كامل + قص + علاج كل زيارة. تشتري المنتجات دائماً.",
    formulas: [
      { name: "Highlights", nameAr: "هايلايت", formula: "Blondor Freelights + 30vol, 40 min" },
      { name: "Lowlights", nameAr: "لو لايت", formula: "Shades EQ 6NA woven through" },
    ],
    history: [
      { date: "Jun 18, 2026", service: "Full Highlights + Cut + Olaplex", serviceAr: "هايلايت كامل + قص + أولابلكس", stylistId: "sophia", price: 96, notes: "Bought K18 + Olaplex retail", notesAr: "اشترت منتجات K18 + أولابلكس" },
      { date: "May 7, 2026", service: "Root Touch-Up + Gloss", serviceAr: "صبغ الجذور + غلوس", stylistId: "sophia", price: 48 },
      { date: "Mar 26, 2026", service: "Full Highlights + Cut", serviceAr: "هايلايت كامل + قص", stylistId: "sophia", price: 82 },
    ],
    communications: [
      { date: "Jun 18, 2026", type: "Note", summary: "Bought K18 + Olaplex No.7 retail (28 KD).", summaryAr: "اشترت K18 + أولابلكس رقم ٧ (٢٨ د.ك)." },
    ],
    loyaltyLog: [
      { date: "Jun 18, 2026", change: 96, reason: "Visit — Foils + Cut", reasonAr: "زيارة — هايلايت + قص" },
      { date: "Dec 1, 2025", change: 100, reason: "Birthday bonus", reasonAr: "مكافأة عيد ميلاد" },
    ],
  },
  {
    id: "sara-al-mutairi",
    name: "Sara Al-Mutairi",
    nameAr: "سارة المطيري",
    phone: "+965 6650 0119",
    email: "sara.mutairi@outlook.com",
    joined: "Jan 2021",
    birthday: "Nov 22",
    lastVisit: "Jun 20, 2026",
    daysSince: 7,
    nextAppointment: "Jul 18, 2026",
    totalVisits: 63,
    totalSpent: 3420,
    preferredStylistId: "sophia",
    loyaltyPoints: 2080,
    tags: ["VIP", "Bridal"],
    notes: "Getting married Sept 2026 — booked bridal trial. Allergic to PPD (uses ammonia-free line).",
    notesAr: "ستتزوّج في سبتمبر ٢٠٢٦ — حجزت بروفة عروس. حساسية من PPD (تستخدم خط خالٍ من الأمونيا).",
    formulas: [{ name: "Base Color", nameAr: "اللون الأساسي", formula: "Redken Shades EQ 6N + 7N (1:1)" }],
    history: [
      { date: "Jun 20, 2026", service: "Balayage + Haircut", serviceAr: "بالياج + قص", stylistId: "sophia", price: 105 },
      { date: "May 16, 2026", service: "Gloss + Blowout", serviceAr: "غلوس + سيشوار", stylistId: "sophia", price: 38 },
      { date: "Apr 4, 2026", service: "Bridal Trial", serviceAr: "بروفة عروس", stylistId: "sophia", price: 55 },
    ],
    communications: [
      { date: "Jun 21, 2026", type: "Call", summary: "Discussed bridal timeline + bridesmaid bookings.", summaryAr: "ناقشنا جدول العرس وحجوزات الوصيفات." },
      { date: "Jun 20, 2026", type: "Note", summary: "Wants soft, lived-in dimension for the wedding.", summaryAr: "ترغب بتدرّج ناعم وطبيعي لحفل الزفاف." },
    ],
    loyaltyLog: [{ date: "Jun 20, 2026", change: 105, reason: "Visit — Balayage + Cut", reasonAr: "زيارة — بالياج + قص" }],
  },
  {
    id: "hessa-al-sabah",
    name: "Hessa Al-Sabah",
    nameAr: "حصة الصباح",
    phone: "+965 9963 0177",
    email: "hessa.alsabah@icloud.com",
    joined: "Jun 2020",
    birthday: "Feb 14",
    lastVisit: "Jun 24, 2026",
    daysSince: 3,
    nextAppointment: "Jul 22, 2026",
    totalVisits: 78,
    totalSpent: 1960,
    preferredStylistId: "bella",
    loyaltyPoints: 1760,
    tags: ["VIP", "Nails"],
    notes: "Bi-weekly gel mani, almond shape. Loves chrome + french combos.",
    notesAr: "مانيكير جل كل أسبوعين، شكل لوز. تحب الكروم والفرنش معاً.",
    formulas: [],
    history: [
      { date: "Jun 24, 2026", service: "Gel Manicure + Nail Art", serviceAr: "مانيكير جل + رسم", stylistId: "bella", price: 22 },
      { date: "Jun 10, 2026", service: "Gel Manicure", serviceAr: "مانيكير جل", stylistId: "bella", price: 15 },
      { date: "May 27, 2026", service: "Gel Mani + Spa Pedicure", serviceAr: "مانيكير جل + بديكير سبا", stylistId: "bella", price: 35 },
    ],
    communications: [
      { date: "Jun 24, 2026", type: "Note", summary: "Pre-booked next 3 appointments. Referral: her sister.", summaryAr: "حجزت ٣ مواعيد قادمة. أوصت بأختها." },
    ],
    loyaltyLog: [{ date: "Jun 24, 2026", change: 22, reason: "Visit — Gel + Art", reasonAr: "زيارة — جل + رسم" }],
  },
  {
    id: "dana-al-rashidi",
    name: "Dana Al-Rashidi",
    nameAr: "دانة الرشيدي",
    phone: "+965 5512 0184",
    email: "dana.rashidi@gmail.com",
    joined: "Mar 2022",
    birthday: "April 9",
    lastVisit: "Jun 14, 2026",
    daysSince: 13,
    nextAppointment: "Jul 5, 2026",
    totalVisits: 41,
    totalSpent: 2180,
    preferredStylistId: "mia",
    loyaltyPoints: 1240,
    tags: ["VIP", "Color Client"],
    notes: "Cool-toned blonde, hates brass. Books every 6 weeks like clockwork.",
    notesAr: "أشقر بارد، تكره الاصفرار. تحجز كل ٦ أسابيع بانتظام.",
    formulas: [
      { name: "Highlights", nameAr: "هايلايت", formula: "Wella Blondor + 20vol, 35 min · foils" },
      { name: "Toner", nameAr: "تونر", formula: "Wella T18 + T11 (3:1) + 6vol, 8 min" },
    ],
    history: [
      { date: "Jun 14, 2026", service: "Full Highlights + Gloss", serviceAr: "هايلايت كامل + غلوس", stylistId: "mia", price: 78, notes: "Added Olaplex in lightener", notesAr: "أضفنا أولابلكس مع السحب" },
      { date: "May 2, 2026", service: "Root Touch-Up", serviceAr: "صبغ الجذور", stylistId: "mia", price: 30 },
      { date: "Mar 21, 2026", service: "Full Highlights + Haircut", serviceAr: "هايلايت كامل + قص", stylistId: "mia", price: 84 },
    ],
    communications: [
      { date: "Jun 28, 2026", type: "SMS", summary: "Rebooking reminder sent — replied 'yes!'", summaryAr: "تذكير بإعادة الحجز — ردّت بالموافقة!" },
      { date: "Jun 14, 2026", type: "Note", summary: "Loved the brighter face-frame. Wants to go lighter.", summaryAr: "أحبّت إطار الوجه الأفتح. تريد التفتيح أكثر." },
    ],
    loyaltyLog: [{ date: "Jun 14, 2026", change: 78, reason: "Visit — Full Highlights", reasonAr: "زيارة — هايلايت كامل" }],
  },
  {
    id: "ghala-al-ajmi",
    name: "Ghala Al-Enezi",
    nameAr: "غلا العنزي",
    phone: "+965 5048 0148",
    email: "ghala.enezi@gmail.com",
    joined: "Feb 2024",
    birthday: "Sep 3",
    lastVisit: "Jun 22, 2026",
    daysSince: 5,
    nextAppointment: "Aug 1, 2026",
    totalVisits: 9,
    totalSpent: 360,
    preferredStylistId: "aria",
    loyaltyPoints: 320,
    tags: ["Lashes"],
    notes: "Volume lash sets, fills every 2.5 weeks. Sensitive eyes — use sensitive adhesive.",
    notesAr: "رموش فوليوم، تعبئة كل أسبوعين ونصف. عيون حساسة — استخدمي لاصق حساس.",
    formulas: [],
    history: [
      { date: "Jun 22, 2026", service: "Volume Lash Fill", serviceAr: "تعبئة رموش فوليوم", stylistId: "aria", price: 22 },
      { date: "May 30, 2026", service: "Volume Lash Set", serviceAr: "رموش فوليوم", stylistId: "aria", price: 40 },
      { date: "May 8, 2026", service: "Brow Lamination", serviceAr: "تصفيف حواجب", stylistId: "aria", price: 25 },
    ],
    communications: [
      { date: "Jun 22, 2026", type: "Email", summary: "Aftercare + fill reminder scheduled.", summaryAr: "إرشادات العناية وتذكير بالتعبئة." },
    ],
    loyaltyLog: [{ date: "Jun 22, 2026", change: 22, reason: "Visit — Lash Fill", reasonAr: "زيارة — تعبئة رموش" }],
  },
  {
    id: "emma-thompson",
    name: "Emma Thompson",
    nameAr: "إيما طومسون",
    phone: "+965 9919 0192",
    email: "emma.t@yahoo.com",
    joined: "Nov 2022",
    birthday: "Jul 11",
    lastVisit: "May 9, 2026",
    daysSince: 49,
    nextAppointment: null,
    totalVisits: 22,
    totalSpent: 980,
    preferredStylistId: "carlos",
    loyaltyPoints: 680,
    tags: ["Overdue"],
    notes: "Lob + curtain bangs. Usually every 8 weeks — slightly overdue.",
    notesAr: "لوب + غرة ستارة. عادةً كل ٨ أسابيع — متأخرة قليلاً.",
    formulas: [{ name: "Gloss", nameAr: "غلوس", formula: "Shades EQ 09V + clear (1:2)" }],
    history: [
      { date: "May 9, 2026", service: "Haircut + Blowout", serviceAr: "قص + سيشوار", stylistId: "carlos", price: 28 },
      { date: "Mar 14, 2026", service: "Haircut + Gloss", serviceAr: "قص + غلوس", stylistId: "carlos", price: 34 },
      { date: "Jan 22, 2026", service: "Women's Haircut & Style", serviceAr: "قص وتصفيف", stylistId: "carlos", price: 16 },
    ],
    communications: [
      { date: "Jun 20, 2026", type: "SMS", summary: "Rebooking nudge — opened, no reply.", summaryAr: "تذكير بالحجز — فُتح بلا رد." },
    ],
    loyaltyLog: [{ date: "May 9, 2026", change: 28, reason: "Visit — Haircut + Blowout", reasonAr: "زيارة — قص + سيشوار" }],
  },
  {
    id: "amira-haddad",
    name: "Amira Haddad",
    nameAr: "أميرة حداد",
    phone: "+965 5517 0177",
    email: "amira.haddad@gmail.com",
    joined: "Aug 2023",
    birthday: "June 30",
    lastVisit: "Apr 3, 2026",
    daysSince: 85,
    nextAppointment: null,
    totalVisits: 12,
    totalSpent: 640,
    preferredStylistId: "jade",
    loyaltyPoints: 410,
    tags: ["Overdue", "Curly Specialist"],
    notes: "Type 3C curls — diffuse only, no brush. Overdue for rebooking, send win-back offer.",
    notesAr: "تموجات 3C — تجفيف بالديفيوزر فقط. متأخرة عن الحجز، أرسلي عرض استرجاع.",
    formulas: [{ name: "Treatment", nameAr: "علاج", formula: "K18 + leave-in, no sulfates" }],
    history: [
      { date: "Apr 3, 2026", service: "Curly Cut + Deep Condition", serviceAr: "قص مجعّد + ترطيب عميق", stylistId: "jade", price: 26 },
      { date: "Jan 18, 2026", service: "Curly Cut", serviceAr: "قص مجعّد", stylistId: "jade", price: 18 },
      { date: "Oct 9, 2025", service: "Keratin Treatment", serviceAr: "علاج كيراتين", stylistId: "jade", price: 75 },
    ],
    communications: [
      { date: "Jun 1, 2026", type: "SMS", summary: "Win-back offer (15% off) — no reply yet.", summaryAr: "عرض استرجاع (خصم ١٥٪) — بلا رد." },
    ],
    loyaltyLog: [{ date: "Apr 3, 2026", change: 26, reason: "Visit — Curly Cut", reasonAr: "زيارة — قص مجعّد" }],
  },
  {
    id: "lulwa-al-saleh",
    name: "Lulwa Al-Saleh",
    nameAr: "لولوة الصالح",
    phone: "+965 6650 0150",
    email: "lulwa.saleh@gmail.com",
    joined: "Sep 2023",
    birthday: "Mar 18",
    lastVisit: "Jun 26, 2026",
    daysSince: 1,
    nextAppointment: "Jul 24, 2026",
    totalVisits: 15,
    totalSpent: 740,
    preferredStylistId: "mia",
    loyaltyPoints: 540,
    tags: ["Color Client"],
    notes: "Currently going copper. Loves vivid fashion tones for fall.",
    notesAr: "تتجه للنحاسي حالياً. تحب الألوان الجريئة للخريف.",
    formulas: [{ name: "Copper", nameAr: "نحاسي", formula: "Pravana Copper + 7CG, 20vol" }],
    history: [
      { date: "Jun 26, 2026", service: "All-Over Color + Gloss", serviceAr: "صبغ كامل + غلوس", stylistId: "mia", price: 58 },
      { date: "May 15, 2026", service: "Color Correction", serviceAr: "تصحيح اللون", stylistId: "mia", price: 140 },
    ],
    communications: [
      { date: "Jun 26, 2026", type: "Note", summary: "Patch test clear. Wants a vivid red next.", summaryAr: "اختبار الحساسية سليم. تريد أحمر جريء لاحقاً." },
    ],
    loyaltyLog: [{ date: "Jun 26, 2026", change: 58, reason: "Visit — Color + Gloss", reasonAr: "زيارة — صبغ + غلوس" }],
  },
  {
    id: "yasmeen-darwish",
    name: "Yasmeen Darwish",
    nameAr: "ياسمين درويش",
    phone: "+965 5017 0171",
    email: "yasmeen.darwish@gmail.com",
    joined: "Dec 2022",
    birthday: "May 29",
    lastVisit: "Jun 16, 2026",
    daysSince: 11,
    nextAppointment: "Jul 11, 2026",
    totalVisits: 24,
    totalSpent: 1180,
    preferredStylistId: "mia",
    loyaltyPoints: 720,
    tags: ["Color Client"],
    outstanding: 12,
    notes: "Brunette balayage. Has a 12 KD outstanding balance from last gloss add-on.",
    notesAr: "بالياج بنّي. عليها رصيد مستحق ١٢ د.ك من إضافة الغلوس السابقة.",
    formulas: [{ name: "Balayage", nameAr: "بالياج", formula: "Blondor freehand + 20vol, open air" }],
    history: [
      { date: "Jun 16, 2026", service: "Balayage + Gloss", serviceAr: "بالياج + غلوس", stylistId: "mia", price: 102, notes: "Gloss add-on billed to balance", notesAr: "أُضيف الغلوس للرصيد المستحق" },
      { date: "Apr 25, 2026", service: "Partial Highlights", serviceAr: "هايلايت جزئي", stylistId: "mia", price: 50 },
    ],
    communications: [
      { date: "Jun 17, 2026", type: "Email", summary: "Invoice for 12 KD balance sent.", summaryAr: "أُرسلت فاتورة الرصيد ١٢ د.ك." },
    ],
    loyaltyLog: [{ date: "Jun 16, 2026", change: 102, reason: "Visit — Balayage", reasonAr: "زيارة — بالياج" }],
  },
  {
    id: "maryam-khalifa",
    name: "Maryam Khalifa",
    nameAr: "مريم خليفة",
    phone: "+965 5512 0128",
    email: "maryam.khalifa@icloud.com",
    joined: "Jul 2024",
    birthday: "Aug 25",
    lastVisit: "Jun 11, 2026",
    daysSince: 16,
    nextAppointment: "Jul 9, 2026",
    totalVisits: 7,
    totalSpent: 240,
    preferredStylistId: "carlos",
    loyaltyPoints: 210,
    tags: ["New-ish"],
    notes: "Prefers low-maintenance styling. Open to product recommendations.",
    notesAr: "تفضّل تصفيفاً سهل العناية. منفتحة على ترشيحات المنتجات.",
    formulas: [],
    history: [
      { date: "Jun 11, 2026", service: "Women's Haircut & Style", serviceAr: "قص وتصفيف", stylistId: "carlos", price: 16 },
      { date: "Apr 30, 2026", service: "Blowout", serviceAr: "سيشوار", stylistId: "carlos", price: 15 },
    ],
    communications: [
      { date: "Jun 11, 2026", type: "Email", summary: "Sent styling product recs (round brush + heat protect).", summaryAr: "أرسلنا ترشيحات منتجات (فرشاة + واقٍ حراري)." },
    ],
    loyaltyLog: [{ date: "Jun 11, 2026", change: 16, reason: "Visit — Haircut", reasonAr: "زيارة — قص" }],
  },
  {
    id: "fatima-al-kandari",
    name: "Fatima Al-Kandari",
    nameAr: "فاطمة الكندري",
    phone: "+965 5017 0133",
    email: "fatima.kandari@gmail.com",
    joined: "Oct 2021",
    birthday: "Jan 7",
    lastVisit: "Mar 28, 2026",
    daysSince: 91,
    nextAppointment: null,
    totalVisits: 28,
    totalSpent: 1260,
    preferredStylistId: "jade",
    loyaltyPoints: 760,
    tags: ["Overdue", "At-Risk"],
    notes: "Keratin every 12 weeks. 3 months out — high priority win-back.",
    notesAr: "كيراتين كل ١٢ أسبوعاً. مضى ٣ أشهر — أولوية استرجاع عالية.",
    formulas: [{ name: "Keratin", nameAr: "كيراتين", formula: "Brazilian Blowout original, flat iron 230°C" }],
    history: [
      { date: "Mar 28, 2026", service: "Keratin Treatment + Cut", serviceAr: "علاج كيراتين + قص", stylistId: "jade", price: 90 },
      { date: "Jan 4, 2026", service: "Keratin Treatment", serviceAr: "علاج كيراتين", stylistId: "jade", price: 75 },
    ],
    communications: [
      { date: "Jun 15, 2026", type: "SMS", summary: "Win-back: 'We miss you' + 20% off — delivered.", summaryAr: "استرجاع: 'اشتقنا لك' + خصم ٢٠٪ — تم الإرسال." },
    ],
    loyaltyLog: [{ date: "Mar 28, 2026", change: 90, reason: "Visit — Keratin + Cut", reasonAr: "زيارة — كيراتين + قص" }],
  },
  {
    id: "shaikha-al-roumi",
    name: "Shaikha Al-Roumi",
    nameAr: "شيخة الرومي",
    phone: "+965 5514 0145",
    email: "shaikha.roumi@outlook.com",
    joined: "May 2023",
    birthday: "Oct 14",
    lastVisit: "Jun 25, 2026",
    daysSince: 2,
    nextAppointment: "Jul 16, 2026",
    totalVisits: 19,
    totalSpent: 880,
    preferredStylistId: "bella",
    loyaltyPoints: 590,
    tags: ["Nails", "Lashes"],
    notes: "Combo nail + lash appointments. Books on Saturdays.",
    notesAr: "مواعيد أظافر ورموش معاً. تحجز أيام السبت.",
    formulas: [],
    history: [
      { date: "Jun 25, 2026", service: "Gel Manicure + Lash Fill", serviceAr: "مانيكير جل + تعبئة رموش", stylistId: "bella", price: 37 },
      { date: "Jun 4, 2026", service: "Spa Pedicure", serviceAr: "بديكير سبا", stylistId: "bella", price: 20 },
    ],
    communications: [
      { date: "Jun 25, 2026", type: "Note", summary: "Prefers Saturday mornings — pre-booked.", summaryAr: "تفضّل صباح السبت — حجزت مسبقاً." },
    ],
    loyaltyLog: [{ date: "Jun 25, 2026", change: 37, reason: "Visit — Mani + Lash", reasonAr: "زيارة — مانيكير + رموش" }],
  },
  {
    id: "rawan-al-khalid",
    name: "Rawan Al-Khalid",
    nameAr: "روان الخالد",
    phone: "+965 5513 0133",
    email: "rawan.khalid@icloud.com",
    joined: "Mar 2025",
    birthday: "Jul 2",
    lastVisit: "Jun 27, 2026",
    daysSince: 0,
    nextAppointment: "Jul 25, 2026",
    totalVisits: 5,
    totalSpent: 180,
    preferredStylistId: "aria",
    loyaltyPoints: 150,
    tags: ["New", "Lashes"],
    notes: "New client — first volume set today. Referred by Ghala.",
    notesAr: "عميلة جديدة — أول رموش فوليوم اليوم. أوصت بها غلا.",
    formulas: [],
    history: [
      { date: "Jun 27, 2026", service: "Volume Lash Set", serviceAr: "رموش فوليوم", stylistId: "aria", price: 40 },
      { date: "May 20, 2026", service: "Classic Lash Set", serviceAr: "رموش كلاسيك", stylistId: "aria", price: 25 },
    ],
    communications: [
      { date: "Jun 27, 2026", type: "Note", summary: "Loved the volume set. Booked a fill in 3 weeks.", summaryAr: "أحبّت الرموش. حجزت تعبئة بعد ٣ أسابيع." },
    ],
    loyaltyLog: [
      { date: "Jun 27, 2026", change: 40, reason: "Visit — Volume Lash Set", reasonAr: "زيارة — رموش فوليوم" },
      { date: "Mar 4, 2026", change: 50, reason: "New client welcome bonus", reasonAr: "مكافأة ترحيب بعميلة جديدة" },
    ],
  },
  {
    id: "abdullah-al-failakawi",
    name: "Abdullah Al-Failakawi",
    nameAr: "عبدالله الفيلكاوي",
    phone: "+965 6688 0188",
    email: "abdullah.f@gmail.com",
    joined: "Jan 2023",
    birthday: "Apr 21",
    lastVisit: "Jun 19, 2026",
    daysSince: 8,
    nextAppointment: "Jul 17, 2026",
    totalVisits: 31,
    totalSpent: 590,
    preferredStylistId: "carlos",
    loyaltyPoints: 380,
    tags: ["Men's Grooming"],
    notes: "Men's cut + beard every 3 weeks. Skin fade, scissor on top.",
    notesAr: "قص رجالي + لحية كل ٣ أسابيع. تدرّج ناعم، مقص من الأعلى.",
    formulas: [],
    history: [
      { date: "Jun 19, 2026", service: "Men's Cut + Beard", serviceAr: "قص رجالي + لحية", stylistId: "carlos", price: 12 },
      { date: "May 29, 2026", service: "Men's Cut", serviceAr: "قص رجالي", stylistId: "carlos", price: 8 },
    ],
    communications: [
      { date: "Jun 19, 2026", type: "Note", summary: "Standing 3-week appointment set.", summaryAr: "موعد ثابت كل ٣ أسابيع." },
    ],
    loyaltyLog: [{ date: "Jun 19, 2026", change: 12, reason: "Visit — Men's Cut + Beard", reasonAr: "زيارة — قص رجالي + لحية" }],
  },
];

export function getClient(id: string): Client | undefined {
  return clients.find((c) => c.id === id);
}

/* ---------------- Appointments (current week) ---------------- */

export const appointments: Appointment[] = [
  // Mon
  { id: "a1", day: 0, start: "09:30", durationMin: 60, clientId: "maryam-khalifa", clientName: "Maryam Khalifa", clientNameAr: "مريم خليفة", stylistId: "carlos", services: ["Women's Haircut & Style"], servicesAr: ["قص وتصفيف"], price: 16, status: "Completed" },
  { id: "a2", day: 0, start: "10:00", durationMin: 105, clientId: "lulwa-al-saleh", clientName: "Lulwa Al-Saleh", clientNameAr: "لولوة الصالح", stylistId: "mia", services: ["All-Over Color", "Gloss"], servicesAr: ["صبغ كامل", "غلوس"], price: 58, status: "Completed" },
  { id: "a3", day: 0, start: "11:00", durationMin: 60, clientId: "hessa-al-sabah", clientName: "Hessa Al-Sabah", clientNameAr: "حصة الصباح", stylistId: "bella", services: ["Gel Manicure"], servicesAr: ["مانيكير جل"], price: 15, status: "Completed" },
  { id: "a4", day: 0, start: "13:00", durationMin: 90, clientId: "ghala-al-ajmi", clientName: "Ghala Al-Enezi", clientNameAr: "غلا العنزي", stylistId: "aria", services: ["Volume Lash Fill"], servicesAr: ["تعبئة رموش فوليوم"], price: 22, status: "No Show" },
  // Tue
  { id: "a5", day: 1, start: "09:00", durationMin: 150, clientId: "noura-al-ajmi", clientName: "Noura Al-Ajmi", clientNameAr: "نورة العجمي", stylistId: "sophia", services: ["Full Highlights", "Haircut"], servicesAr: ["هايلايت كامل", "قص"], price: 84, status: "Completed" },
  { id: "a6", day: 1, start: "10:30", durationMin: 60, clientId: "abdullah-al-failakawi", clientName: "Abdullah Al-Failakawi", clientNameAr: "عبدالله الفيلكاوي", stylistId: "carlos", services: ["Men's Cut", "Beard"], servicesAr: ["قص رجالي", "لحية"], price: 12, status: "Completed" },
  { id: "a7", day: 1, start: "14:00", durationMin: 120, clientId: "yasmeen-darwish", clientName: "Yasmeen Darwish", clientNameAr: "ياسمين درويش", stylistId: "mia", services: ["Partial Highlights"], servicesAr: ["هايلايت جزئي"], price: 50, status: "Completed" },
  // Wed
  { id: "a8", day: 2, start: "10:00", durationMin: 180, clientId: "sara-al-mutairi", clientName: "Sara Al-Mutairi", clientNameAr: "سارة المطيري", stylistId: "sophia", services: ["Balayage", "Haircut"], servicesAr: ["بالياج", "قص"], price: 105, status: "Completed" },
  { id: "a9", day: 2, start: "11:30", durationMin: 90, clientId: "rawan-al-khalid", clientName: "Rawan Al-Khalid", clientNameAr: "روان الخالد", stylistId: "aria", services: ["Classic Lash Set"], servicesAr: ["رموش كلاسيك"], price: 25, status: "Cancelled" },
  { id: "a10", day: 2, start: "15:00", durationMin: 150, clientId: "fatima-al-kandari", clientName: "Fatima Al-Kandari", clientNameAr: "فاطمة الكندري", stylistId: "jade", services: ["Keratin Treatment"], servicesAr: ["علاج كيراتين"], price: 75, status: "Completed" },
  // Thu (busy "today")
  { id: "a11", day: 3, start: "09:00", durationMin: 150, clientId: "dana-al-rashidi", clientName: "Dana Al-Rashidi", clientNameAr: "دانة الرشيدي", stylistId: "mia", services: ["Full Highlights", "Gloss"], servicesAr: ["هايلايت كامل", "غلوس"], price: 78, status: "In Chair" },
  { id: "a12", day: 3, start: "09:30", durationMin: 60, clientId: "shaikha-al-roumi", clientName: "Shaikha Al-Roumi", clientNameAr: "شيخة الرومي", stylistId: "bella", services: ["Gel Manicure"], servicesAr: ["مانيكير جل"], price: 15, status: "In Chair" },
  { id: "a13", day: 3, start: "10:00", durationMin: 60, clientId: "maryam-khalifa", clientName: "Maryam Khalifa", clientNameAr: "مريم خليفة", stylistId: "carlos", services: ["Blowout"], servicesAr: ["سيشوار"], price: 15, status: "Confirmed" },
  { id: "a14", day: 3, start: "11:00", durationMin: 90, clientId: "ghala-al-ajmi", clientName: "Ghala Al-Enezi", clientNameAr: "غلا العنزي", stylistId: "aria", services: ["Volume Lash Fill"], servicesAr: ["تعبئة رموش فوليوم"], price: 22, status: "Confirmed" },
  { id: "a15", day: 3, start: "12:30", durationMin: 180, clientId: "noura-al-ajmi", clientName: "Noura Al-Ajmi", clientNameAr: "نورة العجمي", stylistId: "sophia", services: ["Full Highlights", "Cut", "Olaplex"], servicesAr: ["هايلايت كامل", "قص", "أولابلكس"], price: 96, status: "Booked" },
  { id: "a16", day: 3, start: "13:00", durationMin: 105, clientId: "lulwa-al-saleh", clientName: "Lulwa Al-Saleh", clientNameAr: "لولوة الصالح", stylistId: "mia", services: ["All-Over Color"], servicesAr: ["صبغ كامل"], price: 45, status: "Booked" },
  { id: "a17", day: 3, start: "14:00", durationMin: 60, clientId: "abdullah-al-failakawi", clientName: "Abdullah Al-Failakawi", clientNameAr: "عبدالله الفيلكاوي", stylistId: "carlos", services: ["Men's Cut"], servicesAr: ["قص رجالي"], price: 8, status: "Booked" },
  { id: "a18", day: 3, start: "15:30", durationMin: 60, clientId: "hessa-al-sabah", clientName: "Hessa Al-Sabah", clientNameAr: "حصة الصباح", stylistId: "bella", services: ["Spa Pedicure"], servicesAr: ["بديكير سبا"], price: 20, status: "Booked" },
  { id: "a19", day: 3, start: "16:00", durationMin: 120, clientId: "yasmeen-darwish", clientName: "Yasmeen Darwish", clientNameAr: "ياسمين درويش", stylistId: "mia", services: ["Balayage", "Gloss"], servicesAr: ["بالياج", "غلوس"], price: 102, status: "Booked" },
  // Fri
  { id: "a20", day: 4, start: "15:30", durationMin: 60, clientId: "emma-thompson", clientName: "Emma Thompson", clientNameAr: "إيما طومسون", stylistId: "carlos", services: ["Haircut", "Blowout"], servicesAr: ["قص", "سيشوار"], price: 28, status: "Booked" },
  { id: "a21", day: 4, start: "16:00", durationMin: 90, clientId: "rawan-al-khalid", clientName: "Rawan Al-Khalid", clientNameAr: "روان الخالد", stylistId: "aria", services: ["Volume Lash Set"], servicesAr: ["رموش فوليوم"], price: 40, status: "Confirmed" },
  { id: "a22", day: 4, start: "17:00", durationMin: 75, clientId: "dana-al-rashidi", clientName: "Dana Al-Rashidi", clientNameAr: "دانة الرشيدي", stylistId: "mia", services: ["Root Touch-Up"], servicesAr: ["صبغ الجذور"], price: 30, status: "Booked" },
  { id: "a23", day: 4, start: "18:00", durationMin: 60, clientId: "shaikha-al-roumi", clientName: "Shaikha Al-Roumi", clientNameAr: "شيخة الرومي", stylistId: "bella", services: ["Gel Manicure", "Nail Art"], servicesAr: ["مانيكير جل", "رسم أظافر"], price: 22, status: "Booked" },
  // Sat
  { id: "a24", day: 5, start: "10:30", durationMin: 180, clientId: "sara-al-mutairi", clientName: "Sara Al-Mutairi", clientNameAr: "سارة المطيري", stylistId: "sophia", services: ["Bridal Trial"], servicesAr: ["بروفة عروس"], price: 55, status: "Confirmed" },
  { id: "a25", day: 5, start: "11:00", durationMin: 60, clientId: "hessa-al-sabah", clientName: "Hessa Al-Sabah", clientNameAr: "حصة الصباح", stylistId: "bella", services: ["Gel Manicure", "Nail Art"], servicesAr: ["مانيكير جل", "رسم أظافر"], price: 22, status: "Confirmed" },
  { id: "a26", day: 5, start: "12:00", durationMin: 60, clientId: "shaikha-al-roumi", clientName: "Shaikha Al-Roumi", clientNameAr: "شيخة الرومي", stylistId: "aria", services: ["Lash Fill"], servicesAr: ["تعبئة رموش"], price: 22, status: "Booked" },
  { id: "a27", day: 5, start: "13:00", durationMin: 105, clientId: "lulwa-al-saleh", clientName: "Lulwa Al-Saleh", clientNameAr: "لولوة الصالح", stylistId: "mia", services: ["All-Over Color", "Gloss"], servicesAr: ["صبغ كامل", "غلوس"], price: 58, status: "Booked" },
  { id: "a28", day: 5, start: "14:00", durationMin: 60, clientId: "abdullah-al-failakawi", clientName: "Abdullah Al-Failakawi", clientNameAr: "عبدالله الفيلكاوي", stylistId: "carlos", services: ["Men's Cut", "Beard"], servicesAr: ["قص رجالي", "لحية"], price: 12, status: "Booked" },
];

/* ---------------- Dashboard metrics (KWD) ---------------- */

export const dashboard = {
  revenueToday: 412,
  revenueTodayDelta: 0.12,
  appointmentsToday: 9,
  appointmentsTodayDelta: 0.0,
  clientsThisMonth: 449,
  clientsThisMonthDelta: 0.08,
  newClientsThisMonth: 37,
  newClientsDelta: 0.15,
  avgTicket: 26,
  avgTicketDelta: 0.04,
  rebookingRate: 0.72,
  rebookingDelta: 0.03,
};

export const revenueByWeek = [
  { week: "May 5", revenue: 2480 },
  { week: "May 12", revenue: 2860 },
  { week: "May 19", revenue: 2710 },
  { week: "May 26", revenue: 3180 },
  { week: "Jun 2", revenue: 2940 },
  { week: "Jun 9", revenue: 3260 },
  { week: "Jun 16", revenue: 3420 },
  { week: "Jun 23", revenue: 2680 },
];

export const servicesBreakdown = [
  { category: "Color", value: 4120, color: "#C9A96E" },
  { category: "Cut", value: 1860, color: "#A6766A" },
  { category: "Treatments", value: 1180, color: "#8E9B8A" },
  { category: "Nails", value: 1240, color: "#B08A82" },
  { category: "Lashes", value: 1420, color: "#C18C5D" },
];

export const revenueDaily = [
  { day: "Jun 21", revenue: 540 },
  { day: "Jun 22", revenue: 480 },
  { day: "Jun 23", revenue: 620 },
  { day: "Jun 24", revenue: 710 },
  { day: "Jun 25", revenue: 660 },
  { day: "Jun 26", revenue: 740 },
  { day: "Jun 27", revenue: 412 },
];

export const revenueMonthly = [
  { month: "Jan", services: 8200, retail: 720 },
  { month: "Feb", services: 8900, retail: 810 },
  { month: "Mar", services: 10100, retail: 940 },
  { month: "Apr", services: 9600, retail: 870 },
  { month: "May", services: 11200, retail: 1020 },
  { month: "Jun", services: 9820, retail: 980 },
];

export const retailProducts = [
  { name: "K18 Leave-In Mask", nameAr: "ماسك K18", units: 42, revenue: 168 },
  { name: "Olaplex No. 7 Oil", nameAr: "زيت أولابلكس ٧", units: 38, revenue: 110 },
  { name: "Moroccanoil Treatment", nameAr: "زيت مراكش", units: 31, revenue: 109 },
  { name: "Kérastase Shampoo", nameAr: "شامبو كيراستاس", units: 29, revenue: 93 },
  { name: "Wet Brush + Accessories", nameAr: "فرشاة + إكسسوارات", units: 54, revenue: 76 },
];
