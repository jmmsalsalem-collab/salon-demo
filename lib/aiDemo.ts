/* Hardcoded bilingual demo conversation for the AI Assistant page. */

export type AIBlock =
  | { type: "text"; text: string; textAr: string }
  | {
      type: "list";
      items: {
        primary: string;
        primaryAr: string;
        secondary?: string;
        secondaryAr?: string;
        trailing?: string;
        trailingAr?: string;
        tone?: "rose" | "gold" | "emerald" | "neutral";
      }[];
    }
  | {
      type: "bars";
      items: { label: string; labelAr: string; value: number; display: string }[];
    };

export type AITurn = {
  role: "user" | "assistant";
  content: string;
  contentAr: string;
  blocks?: AIBlock[];
};

export const AI_SUGGESTIONS: { en: string; ar: string }[] = [
  { en: "Which clients are overdue for a rebooking?", ar: "من العملاء المتأخرون عن إعادة الحجز؟" },
  { en: "Who are our top 5 clients by spend this year?", ar: "من أفضل ٥ عملاء إنفاقاً هذا العام؟" },
  { en: "What services are most popular on Saturdays?", ar: "ما أكثر الخدمات طلباً أيام السبت؟" },
  { en: "Which stylist has the highest no-show rate?", ar: "أي موظفة لديها أعلى نسبة عدم حضور؟" },
];

export const AI_CONVERSATION: AITurn[] = [
  {
    role: "user",
    content: "Which clients are overdue for a rebooking?",
    contentAr: "من العملاء المتأخرون عن إعادة الحجز؟",
  },
  {
    role: "assistant",
    content: "",
    contentAr: "",
    blocks: [
      {
        type: "text",
        text: "You have 3 clients past their usual rebooking window. I'd prioritize Fatima — a high-value keratin regular, now 3 months out:",
        textAr: "لديك ٣ عميلات تجاوزن موعد الحجز المعتاد. أنصح بأولوية فاطمة — عميلة كيراتين عالية القيمة ومضى عليها ٣ أشهر:",
      },
      {
        type: "list",
        items: [
          { primary: "Fatima Al-Kandari", primaryAr: "فاطمة الكندري", secondary: "Keratin every ~12 wks · 1,260 KD lifetime", secondaryAr: "كيراتين كل ١٢ أسبوعاً · ١٬٢٦٠ د.ك إجمالاً", trailing: "91 days", trailingAr: "٩١ يوماً", tone: "rose" },
          { primary: "Amira Haddad", primaryAr: "أميرة حداد", secondary: "Curly-cut client · win-back SMS sent", secondaryAr: "عميلة قص مجعّد · أُرسلت رسالة استرجاع", trailing: "85 days", trailingAr: "٨٥ يوماً", tone: "rose" },
          { primary: "Emma Thompson", primaryAr: "إيما طومسون", secondary: "Lob + bangs, usually every 8 wks", secondaryAr: "لوب + غرة، عادةً كل ٨ أسابيع", trailing: "49 days", trailingAr: "٤٩ يوماً", tone: "gold" },
        ],
      },
      {
        type: "text",
        text: "Want me to draft a personalized win-back text for each? Fatima already has a 20% offer pending with no reply.",
        textAr: "أصيغ رسالة استرجاع مخصّصة لكل واحدة؟ فاطمة لديها عرض ٢٠٪ معلّق بلا رد.",
      },
    ],
  },
  {
    role: "user",
    content: "Who are our top 5 clients by spend this year?",
    contentAr: "من أفضل ٥ عملاء إنفاقاً هذا العام؟",
  },
  {
    role: "assistant",
    content: "",
    contentAr: "",
    blocks: [
      {
        type: "text",
        text: "Here are your top 5 by lifetime spend — all five are VIPs and drive much of your color revenue:",
        textAr: "إليك أفضل ٥ عميلات حسب إجمالي الإنفاق — جميعهنّ مميّزات ويشكّلن جزءاً كبيراً من إيراد الصبغ:",
      },
      {
        type: "list",
        items: [
          { primary: "1. Noura Al-Ajmi", primaryAr: "١. نورة العجمي", secondary: "95 visits · Latifa", secondaryAr: "٩٥ زيارة · لطيفة", trailing: "4,260 KD", trailingAr: "٤٬٢٦٠ د.ك", tone: "gold" },
          { primary: "2. Sara Al-Mutairi", primaryAr: "٢. سارة المطيري", secondary: "63 visits · Latifa · Bridal", secondaryAr: "٦٣ زيارة · لطيفة · عرائس", trailing: "3,420 KD", trailingAr: "٣٬٤٢٠ د.ك", tone: "gold" },
          { primary: "3. Dana Al-Rashidi", primaryAr: "٣. دانة الرشيدي", secondary: "41 visits · Maryam · Color", secondaryAr: "٤١ زيارة · مريم · صبغ", trailing: "2,180 KD", trailingAr: "٢٬١٨٠ د.ك", tone: "neutral" },
          { primary: "4. Hessa Al-Sabah", primaryAr: "٤. حصة الصباح", secondary: "78 visits · Reem · Nails", secondaryAr: "٧٨ زيارة · ريم · أظافر", trailing: "1,960 KD", trailingAr: "١٬٩٦٠ د.ك", tone: "neutral" },
          { primary: "5. Fatima Al-Kandari", primaryAr: "٥. فاطمة الكندري", secondary: "28 visits · Shahad · ⚠ at-risk", secondaryAr: "٢٨ زيارة · شهد · ⚠ معرّضة للفقد", trailing: "1,260 KD", trailingAr: "١٬٢٦٠ د.ك", tone: "rose" },
        ],
      },
    ],
  },
  {
    role: "user",
    content: "What services are most popular on Saturdays?",
    contentAr: "ما أكثر الخدمات طلباً أيام السبت؟",
  },
  {
    role: "assistant",
    content: "",
    contentAr: "",
    blocks: [
      {
        type: "text",
        text: "Saturdays skew toward quick, high-volume services and bridal. Here's the booked share over the last 8 Saturdays:",
        textAr: "السبت يميل للخدمات السريعة كثيفة الطلب والعرائس. إليك توزيع الحجوزات لآخر ٨ سبتات:",
      },
      {
        type: "bars",
        items: [
          { label: "Gel Manicure & Nail Art", labelAr: "مانيكير جل ورسم أظافر", value: 100, display: "28%" },
          { label: "Lash Sets & Fills", labelAr: "رموش وتعبئة", value: 78, display: "22%" },
          { label: "Blowouts & Quick Styles", labelAr: "سيشوار وتصفيف سريع", value: 64, display: "18%" },
          { label: "Color & Highlights", labelAr: "صبغ وهايلايت", value: 57, display: "16%" },
          { label: "Bridal & Special Occasion", labelAr: "عرائس ومناسبات", value: 50, display: "14%" },
        ],
      },
      {
        type: "text",
        text: "Tip: Saturday color slots are under-booked vs. weekdays — a Saturday color promo could balance chair time.",
        textAr: "نصيحة: مواعيد الصبغ يوم السبت أقل حجزاً من أيام الأسبوع — عرض صبغ للسبت قد يوازن استغلال الكراسي.",
      },
    ],
  },
  {
    role: "user",
    content: "Which stylist has the highest no-show rate?",
    contentAr: "أي موظفة لديها أعلى نسبة عدم حضور؟",
  },
  {
    role: "assistant",
    content: "",
    contentAr: "",
    blocks: [
      {
        type: "text",
        text: "No-show rates are low overall, but Noor's lash appointments see the most drop-off — fills are often short-notice bookings:",
        textAr: "نسب عدم الحضور منخفضة عموماً، لكن مواعيد رموش نور تشهد أعلى نسبة — التعبئة غالباً حجوزات بإشعار قصير:",
      },
      {
        type: "list",
        items: [
          { primary: "Noor Abdullah", primaryAr: "نور عبدالله", secondary: "Lash Artist · 58 clients/mo", secondaryAr: "فنية رموش · ٥٨ عميلة/شهر", trailing: "6.8%", trailingAr: "٦٫٨٪", tone: "rose" },
          { primary: "Reem Al-Najjar", primaryAr: "ريم النجار", secondary: "Nail Tech · 92 clients/mo", secondaryAr: "فنية أظافر · ٩٢ عميلة/شهر", trailing: "4.1%", trailingAr: "٤٫١٪", tone: "gold" },
          { primary: "Maryam Haidar", primaryAr: "مريم حيدر", secondary: "Colorist · 76 clients/mo", secondaryAr: "خبيرة صبغ · ٧٦ عميلة/شهر", trailing: "2.3%", trailingAr: "٢٫٣٪", tone: "emerald" },
          { primary: "Latifa Al-Qadiri", primaryAr: "لطيفة القادري", secondary: "Senior Stylist · 84 clients/mo", secondaryAr: "مصففة أولى · ٨٤ عميلة/شهر", trailing: "1.4%", trailingAr: "١٫٤٪", tone: "emerald" },
        ],
      },
      {
        type: "text",
        text: "Noor's slots could benefit from a 24-hour confirmation text + a small deposit on first-time lash sets. Enable auto-confirmations for her bookings?",
        textAr: "قد تستفيد مواعيد نور من رسالة تأكيد قبل ٢٤ ساعة + عربون بسيط لأول جلسة رموش. أفعّل التأكيد التلقائي لحجوزاتها؟",
      },
    ],
  },
];
