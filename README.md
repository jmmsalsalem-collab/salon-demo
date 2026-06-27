# Studio Luxe — Salon CRM & Management

A polished, fully-responsive **salon management dashboard** template — the day-to-day operating system a real salon owner or manager would use. Built with realistic demo data and an integrated (demo) AI Assistant.

## ✨ Pages

| Page | What's inside |
| --- | --- |
| **Dashboard** | KPIs (revenue today, appointments, clients, new clients, avg ticket, rebooking rate), revenue-by-week area chart, services pie, top-stylist bars, today's schedule. |
| **Appointments** | Day / week calendar toggle, color-coded by stylist, status pills (Booked → Completed → No Show…), "New Appointment" modal. |
| **Clients** | Searchable + filterable CRM table (VIP / overdue / new), last visit, next appointment, total spent, loyalty points. |
| **Client Detail** | Demographics, appointment history, saved color formulas, communication log, loyalty history. |
| **Staff** | Stylist roster with role, monthly clients & revenue, commission, schedule, specialties. |
| **Services & Pricing** | All services grouped by category with price, duration and commission. |
| **Revenue** | Service / stylist / retail breakdowns, monthly chart, top products, outstanding balances. |
| **AI Assistant** | "Studio Luxe AI Agent" — a chat-style interface with example salon-intelligence answers. Activates when an API key is saved. |
| **Settings** | Salon profile, brand color, stylists, services, hours, and the **AI Integration** panel (API key, model, enable toggle). Saved to `localStorage`. |

## 🛠 Tech Stack

- [Next.js 14](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) — custom blush / gold / cream theme
- [Recharts](https://recharts.org) for charts
- [lucide-react](https://lucide.dev) icons
- Cormorant Garamond + Jost typography

No backend required — all data is realistic demo data, and salon settings persist to `localStorage`.

## 🤖 AI Assistant (demo)

The AI Assistant page ships in a **locked demo state** with a convincing pre-populated conversation (overdue clients, top spenders, popular Saturday services, no-show rates). Adding an Anthropic API key under **Settings → AI Integration** flips the visual state to **Active** (green badge, enabled composer). The key is stored locally and only toggles UI state — no live API call is made in this demo.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📁 Structure

```
app/
  page.tsx            # Dashboard
  appointments/       # Calendar + list
  clients/            # CRM table
  clients/[id]/       # Client profile
  staff/  services/  revenue/
  ai-assistant/       # AI Agent (demo)
  settings/           # Template + AI integration
components/            # Sidebar, AppShell, charts, KpiCard, ui/
lib/                   # config (salon.ts), demo data (data.ts), helpers
```

---

A demo template, built for showcase purposes.
