import { Sparkles } from "lucide-react";
import Chat from "@/components/Chat";

export const metadata = {
  title: "Luna — AI Style Advisor | Studio Luxe",
  description:
    "Chat with Luna, the Studio Luxe AI beauty advisor, for personalized hair, color and treatment recommendations.",
};

export default function AdvisorPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold-200 bg-cream-50 px-4 py-1.5 text-xs tracking-wide text-charcoal-light">
          <Sparkles className="h-3.5 w-3.5 text-gold-500" />
          AI Style Advisor
        </span>
        <h1 className="serif mt-5 text-4xl font-semibold text-charcoal sm:text-5xl">
          Meet <span className="text-gradient-blush">Luna</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-charcoal-light">
          Your personal beauty concierge. Tell Luna about your hair, your
          lifestyle and the look you love — she&apos;ll recommend the perfect
          service, color and stylist.
        </p>
      </div>

      <div className="mt-10 h-[min(640px,72vh)] overflow-hidden rounded-3xl border border-gold-100 bg-white shadow-soft">
        <Chat variant="full" />
      </div>
    </div>
  );
}
