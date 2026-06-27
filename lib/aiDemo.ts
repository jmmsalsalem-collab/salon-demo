/* Hardcoded demo conversation for the AI Assistant page.
   Purely presentational — no API call. */

export type AIBlock =
  | { type: "text"; text: string }
  | { type: "list"; items: { primary: string; secondary?: string; trailing?: string; tone?: "rose" | "gold" | "emerald" | "neutral" }[] }
  | { type: "bars"; items: { label: string; value: number; display: string }[] };

export type AITurn = {
  role: "user" | "assistant";
  content: string; // for user
  blocks?: AIBlock[]; // for assistant
};

export const AI_SUGGESTIONS = [
  "Which clients are overdue for a rebooking?",
  "Who are our top 5 clients by spend this year?",
  "What services are most popular on Saturdays?",
  "Which stylist has the highest no-show rate?",
];

export const AI_CONVERSATION: AITurn[] = [
  {
    role: "user",
    content: "Which clients are overdue for a rebooking?",
  },
  {
    role: "assistant",
    content: "",
    blocks: [
      {
        type: "text",
        text: "You have 3 clients past their usual rebooking window. I'd prioritize Mila — she's a high-value keratin regular and 3 months out:",
      },
      {
        type: "list",
        items: [
          { primary: "Mila Davis", secondary: "Keratin every ~12 wks · $5,240 lifetime", trailing: "91 days", tone: "rose" },
          { primary: "Amara Johnson", secondary: "Curly cut client · win-back SMS sent", trailing: "85 days", tone: "rose" },
          { primary: "Emma Thompson", secondary: "Lob + bangs, usually every 8 wks", trailing: "49 days", tone: "gold" },
        ],
      },
      {
        type: "text",
        text: "Want me to draft a personalized win-back text for each? Mila already has a 20% offer pending with no reply.",
      },
    ],
  },
  {
    role: "user",
    content: "Who are our top 5 clients by spend this year?",
  },
  {
    role: "assistant",
    content: "",
    blocks: [
      {
        type: "text",
        text: "Here are your top 5 by lifetime spend — all five are VIPs and account for a meaningful share of color revenue:",
      },
      {
        type: "list",
        items: [
          { primary: "1. Natalie Foster", secondary: "95 visits · Sophia", trailing: "$17,650", tone: "gold" },
          { primary: "2. Sophia Bennett", secondary: "63 visits · Sophia · Bridal", trailing: "$14,310", tone: "gold" },
          { primary: "3. Isabella Marino", secondary: "78 visits · Bella · Nails", trailing: "$11,920", tone: "neutral" },
          { primary: "4. Olivia Hartman", secondary: "41 visits · Mia · Color", trailing: "$8,940", tone: "neutral" },
          { primary: "5. Mila Davis", secondary: "28 visits · Jade · ⚠ at-risk", trailing: "$5,240", tone: "rose" },
        ],
      },
    ],
  },
  {
    role: "user",
    content: "What services are most popular on Saturdays?",
  },
  {
    role: "assistant",
    content: "",
    blocks: [
      {
        type: "text",
        text: "Saturdays skew toward quick, high-volume services and bridal. Here's the breakdown by booked share over the last 8 Saturdays:",
      },
      {
        type: "bars",
        items: [
          { label: "Gel Manicure & Nail Art", value: 100, display: "28%" },
          { label: "Lash Sets & Fills", value: 78, display: "22%" },
          { label: "Blowouts & Quick Styles", value: 64, display: "18%" },
          { label: "Color & Highlights", value: 57, display: "16%" },
          { label: "Bridal & Special Occasion", value: 50, display: "14%" },
        ],
      },
      {
        type: "text",
        text: "Tip: Saturday color slots are under-booked vs. weekdays — consider a Saturday color promo to balance the chair time.",
      },
    ],
  },
  {
    role: "user",
    content: "Which stylist has the highest no-show rate?",
  },
  {
    role: "assistant",
    content: "",
    blocks: [
      {
        type: "text",
        text: "No-show rates are low overall, but Aria's lash appointments see the most drop-off — likely because fills are short-notice bookings:",
      },
      {
        type: "list",
        items: [
          { primary: "Aria Kim", secondary: "Lash Artist · 58 clients/mo", trailing: "6.8%", tone: "rose" },
          { primary: "Bella Rossi", secondary: "Nail Tech · 92 clients/mo", trailing: "4.1%", tone: "gold" },
          { primary: "Mia Chen", secondary: "Colorist · 76 clients/mo", trailing: "2.3%", tone: "emerald" },
          { primary: "Sophia Laurent", secondary: "Senior Stylist · 84 clients/mo", trailing: "1.4%", tone: "emerald" },
        ],
      },
      {
        type: "text",
        text: "Aria's slots could benefit from a 24-hour confirmation text + a small deposit on first-time lash sets. Want me to enable auto-confirmations for her bookings?",
      },
    ],
  },
];
