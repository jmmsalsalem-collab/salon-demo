# Studio Luxe — AI-Powered Salon Demo

A polished, mobile-responsive demo for a high-end hair & beauty salon, featuring an **AI Style Advisor** powered by Claude. Built to showcase a modern, elegant salon web experience.

> _AI-Powered Style, Effortlessly Beautiful._

## ✨ Features

- **Landing page** — hero, services gallery (8 services with pricing), team, AI highlight, trust strip.
- **Book Appointment** — a smooth 4-step flow: service → stylist → visual calendar + time → contact details → confirmation screen.
- **AI Style Advisor (Luna)** — a streaming chat advisor (floating widget on every page + a dedicated `/advisor` page) that recommends services, colors and stylists.
- **Gallery** — a styled before/after grid (hover to reveal the "after").
- **Settings / Template panel** (`/settings`) — rebrand the whole demo for any salon: name, primary color, stylists, services + prices, hours, phone, Instagram. Saved to `localStorage`.

## 🛠 Tech Stack

- [Next.js 14](https://nextjs.org) (App Router)
- [Tailwind CSS](https://tailwindcss.com) with a custom blush / gold / cream theme
- [Vercel AI SDK](https://sdk.vercel.ai) (`ai` + `@ai-sdk/anthropic`)
- [Claude](https://www.anthropic.com) (`claude-sonnet-4-6`) for the AI advisor
- [lucide-react](https://lucide.dev) icons

## 🚀 Getting Started

```bash
npm install

# add your Anthropic API key
cp .env.example .env.local
# then edit .env.local and set ANTHROPIC_API_KEY=sk-ant-...

npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🔑 Environment

| Variable            | Description                                   |
| ------------------- | --------------------------------------------- |
| `ANTHROPIC_API_KEY` | Anthropic API key — enables the Luna AI chat. |

The site renders fully without a key; only the AI advisor needs it.

## 📁 Structure

```
app/
  api/chat/route.ts   # streamText AI endpoint (Claude)
  book/               # multi-step booking flow
  advisor/            # full-page AI advisor
  gallery/            # before/after grid
  settings/           # template customization panel
  page.tsx            # landing page
components/            # Navbar, Footer, Chat, ChatWidget, ui/
lib/                   # salon config, hooks, icons, utils
```

---

A demo experience. Built for showcase purposes.
