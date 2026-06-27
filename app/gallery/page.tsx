import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Gallery | Studio Luxe",
  description:
    "Real transformations from Studio Luxe — balayage, color, cuts, bridal styling and more.",
};

type Item = {
  title: string;
  tag: string;
  from: string;
  to: string;
};

const items: Item[] = [
  { title: "Sun-Kissed Balayage", tag: "Balayage", from: "from-amber-200", to: "to-orange-300" },
  { title: "Rose Gold Melt", tag: "Color", from: "from-rose-200", to: "to-pink-300" },
  { title: "Soft Curtain Bangs", tag: "Haircut", from: "from-stone-200", to: "to-amber-200" },
  { title: "Platinum Blonde", tag: "Color", from: "from-yellow-100", to: "to-amber-200" },
  { title: "Bridal Updo", tag: "Bridal", from: "from-pink-100", to: "to-rose-200" },
  { title: "Glass Hair Blowout", tag: "Blowout", from: "from-neutral-200", to: "to-stone-300" },
  { title: "Caramel Dimension", tag: "Highlights", from: "from-orange-200", to: "to-amber-300" },
  { title: "Keratin Smooth", tag: "Keratin", from: "from-stone-100", to: "to-neutral-300" },
  { title: "Copper Glow", tag: "Color", from: "from-orange-300", to: "to-red-300" },
  { title: "Volume Lash Set", tag: "Lashes", from: "from-rose-100", to: "to-fuchsia-200" },
  { title: "Lived-In Brunette", tag: "Balayage", from: "from-amber-300", to: "to-stone-400" },
  { title: "Almond Gel Mani", tag: "Nails", from: "from-pink-200", to: "to-rose-300" },
];

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold-600">
          Gallery
        </p>
        <h1 className="serif mt-3 text-4xl font-semibold text-charcoal sm:text-5xl">
          Real results, real radiance
        </h1>
        <p className="mt-4 text-charcoal-light">
          A glimpse of the transformations our artists create every day. Hover a
          card to reveal the after.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <div
            key={item.title}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-gold-100 shadow-sm transition-all duration-500 hover:shadow-soft"
          >
            {/* "Before" layer */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.from} ${item.to} transition-opacity duration-500 group-hover:opacity-0`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.5),transparent_55%)]" />
              <span className="absolute left-4 top-4 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-charcoal backdrop-blur">
                Before
              </span>
            </div>

            {/* "After" layer (brighter, revealed on hover) */}
            <div
              className={`absolute inset-0 bg-gradient-to-tr ${item.to} ${item.from} opacity-0 brightness-110 saturate-150 transition-opacity duration-500 group-hover:opacity-100`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.6),transparent_55%)]" />
              <span className="absolute left-4 top-4 rounded-full bg-charcoal/80 px-3 py-1 text-xs font-medium text-cream-50 backdrop-blur">
                After
              </span>
            </div>

            {/* Caption */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent p-5">
              <span className="inline-block rounded-full bg-white/85 px-2.5 py-0.5 text-[11px] font-medium text-charcoal">
                {item.tag}
              </span>
              <h3 className="serif mt-2 text-xl text-white drop-shadow">
                {item.title}
              </h3>
            </div>

            <span className="pointer-events-none absolute right-4 top-4 text-xs font-medium text-white/70">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl border border-gold-100 bg-cream-100/50 px-6 py-12 text-center">
        <h2 className="serif text-3xl text-charcoal">Your turn to glow</h2>
        <p className="max-w-md text-charcoal-light">
          Bring us your inspiration — or let Luna help you find it. Either way,
          you&apos;re about to love your reflection.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button href="/book" variant="primary">
            Book your visit
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Link
            href="/advisor"
            className="inline-flex items-center text-sm font-medium text-charcoal-light underline-offset-4 hover:text-blush-500 hover:underline"
          >
            Or chat with Luna first
          </Link>
        </div>
      </div>
    </div>
  );
}
