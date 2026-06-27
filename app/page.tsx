import Link from "next/link";
import {
  Sparkles,
  Star,
  ArrowRight,
  Calendar,
  MessageCircle,
  Award,
  Leaf,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DEFAULT_CONFIG } from "@/lib/salon";
import { ServiceIcon } from "@/lib/icons";

const config = DEFAULT_CONFIG;

export default function Home() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-blush-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-gold-200/40 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 md:grid-cols-2 md:pt-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-200 bg-cream-50 px-4 py-1.5 text-xs tracking-wide text-charcoal-light">
              <Sparkles className="h-3.5 w-3.5 text-gold-500" />
              AI-powered beauty, personalized for you
            </span>
            <h1 className="serif mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-charcoal sm:text-6xl lg:text-7xl">
              AI-Powered Style,
              <br />
              <span className="text-gradient-blush">Effortlessly Beautiful</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-charcoal-light">
              Welcome to {config.name} — where master stylists and a personal AI
              advisor craft the look that&apos;s unmistakably you. Color, cuts,
              balayage, bridal and beyond.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/book" variant="primary" size="lg">
                <Calendar className="h-5 w-5" />
                Book Appointment
              </Button>
              <Button href="/advisor" variant="outline" size="lg">
                <MessageCircle className="h-5 w-5" />
                Ask Luna, our AI advisor
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-3">
                {config.stylists.map((s) => (
                  <span
                    key={s.id}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-cream-50 bg-gradient-to-br ${s.accent} text-xs font-semibold text-white`}
                  >
                    {s.initials}
                  </span>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-1 text-sm text-charcoal-muted">
                  Loved by 2,400+ happy clients
                </p>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative animate-fade-in">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-blush-300 via-blush-200 to-gold-200 shadow-soft">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.5),transparent_55%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="serif text-[7rem] font-semibold text-white/30">
                  {config.name.charAt(0)}
                </span>
              </div>
            </div>
            {/* Floating cards */}
            <div className="absolute -left-4 top-10 animate-float rounded-2xl bg-white/90 px-5 py-4 shadow-soft backdrop-blur sm:-left-8">
              <p className="text-xs text-charcoal-muted">Most booked</p>
              <p className="serif text-lg text-charcoal">Balayage Glow</p>
            </div>
            <div
              className="absolute -right-3 bottom-12 animate-float rounded-2xl bg-white/90 px-5 py-4 shadow-soft backdrop-blur sm:-right-6"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-gold-500" />
                <p className="text-sm font-medium text-charcoal">
                  AI style match
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- TRUST STRIP ---------------- */}
      <section className="border-y border-gold-100 bg-cream-100/50">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:grid-cols-3 sm:px-8">
          {[
            { icon: Award, label: "Master stylists", sub: "Trained, certified, obsessed with detail" },
            { icon: Leaf, label: "Clean, kind products", sub: "Vegan & cruelty-free color lines" },
            { icon: Heart, label: "Personalized care", sub: "AI + human, tailored to your hair" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush-100 text-blush-500">
                <item.icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div>
                <p className="font-medium text-charcoal">{item.label}</p>
                <p className="text-sm text-charcoal-muted">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section id="services" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold-600">
            Our Services
          </p>
          <h2 className="serif mt-3 text-4xl font-semibold text-charcoal sm:text-5xl">
            Everything you need to feel radiant
          </h2>
          <p className="mt-4 text-charcoal-light">
            From a quick blowout to a full transformation, every service is
            customized to your hair, your face, your life.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {config.services.map((s) => (
            <Link
              key={s.id}
              href={`/book?service=${s.id}`}
              className="group relative flex flex-col rounded-2xl border border-gold-100 bg-white/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-soft"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blush-100 to-gold-100 text-blush-600 transition-colors group-hover:from-blush-200 group-hover:to-gold-200">
                <ServiceIcon name={s.icon} className="h-6 w-6" />
              </span>
              <h3 className="serif mt-5 text-xl text-charcoal">{s.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-muted">
                {s.description}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-gold-100 pt-4">
                <div>
                  <p className="font-medium text-charcoal">{s.price}</p>
                  <p className="text-xs text-charcoal-muted">{s.duration}</p>
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream-100 text-charcoal-light transition-all group-hover:bg-blush-500 group-hover:text-white">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- AI ADVISOR HIGHLIGHT ---------------- */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-charcoal to-charcoal-light px-8 py-14 text-cream-50 sm:px-14">
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-blush-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl" />
          <div className="relative grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs tracking-wide backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-gold-300" />
                Meet Luna
              </span>
              <h2 className="serif mt-5 text-4xl font-semibold sm:text-5xl">
                Not sure what you want? <br />
                <span className="text-gradient-gold">Luna does.</span>
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-cream-100/80">
                Our AI style advisor learns your hair type, face shape,
                lifestyle and budget — then recommends the exact services,
                colors and stylist that will make you glow.
              </p>
              <div className="mt-8">
                <Button href="/advisor" variant="gold" size="lg">
                  Chat with Luna
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Mock chat preview */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="space-y-3 text-sm">
                <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-blush-500 px-4 py-2.5 text-white">
                  I want low-maintenance color for curly hair 💁‍♀️
                </div>
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/90 px-4 py-2.5 text-charcoal">
                  Perfect — a hand-painted balayage keeps regrowth soft and
                  natural, so you can stretch 3–4 months between visits. I&apos;d
                  pair it with a gloss for shine. Want me to book you with
                  Sophia, our balayage specialist?
                </div>
                <div className="ml-auto max-w-[60%] rounded-2xl rounded-br-sm bg-blush-500 px-4 py-2.5 text-white">
                  Yes please! ✨
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- STYLISTS ---------------- */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold-600">
            The Team
          </p>
          <h2 className="serif mt-3 text-4xl font-semibold text-charcoal sm:text-5xl">
            Artists who get you
          </h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {config.stylists.map((s) => (
            <div
              key={s.id}
              className="group overflow-hidden rounded-2xl border border-gold-100 bg-white/70 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-soft"
            >
              <div
                className={`relative flex h-48 items-center justify-center bg-gradient-to-br ${s.accent}`}
              >
                <span className="serif text-5xl font-semibold text-white/80">
                  {s.initials}
                </span>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.45),transparent_55%)]" />
              </div>
              <div className="p-5">
                <h3 className="serif text-xl text-charcoal">{s.name}</h3>
                <p className="mt-1 text-sm text-charcoal-muted">{s.specialty}</p>
                <Button
                  href={`/book?stylist=${s.id}`}
                  variant="ghost"
                  size="sm"
                  className="mt-3"
                >
                  Book with {s.name}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- FINAL CTA ---------------- */}
      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blush-400 via-blush-300 to-gold-200 px-8 py-16 text-center shadow-soft sm:px-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.5),transparent_60%)]" />
          <div className="relative">
            <h2 className="serif text-4xl font-semibold text-white sm:text-5xl">
              Ready to fall in love with your hair?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/90">
              Book in under a minute. Your best look is one appointment away.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/book" variant="dark" size="lg">
                <Calendar className="h-5 w-5" />
                Reserve your appointment
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
