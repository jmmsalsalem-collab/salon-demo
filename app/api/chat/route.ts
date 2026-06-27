import { anthropic } from "@ai-sdk/anthropic";
import { streamText, type CoreMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const SYSTEM_PROMPT = `You are Luna, an AI beauty advisor at Studio Luxe salon. Help clients choose the right hair style, color, and treatments for their face shape, lifestyle, and maintenance preferences. Ask about their hair type, current style, inspiration photos they love, budget, and how much time they spend on their hair daily. Recommend specific services and help them book the right appointment.

Studio Luxe services and price ranges:
- Haircut & Style — $65–$95 (60 min)
- Color & Highlights — $120–$220 (120 min)
- Balayage — $180–$300 (180 min)
- Keratin Treatment — $150–$250 (150 min)
- Blowout — $45–$65 (45 min)
- Bridal — $250–$500 (custom)
- Nail Services — $35–$85 (60 min)
- Lash Extensions — $90–$180 (90 min)

Our stylists:
- Sophia — Color & Balayage Specialist
- Mia — Precision Cuts & Bridal
- Jade — Lash, Brow & Keratin Expert
- Carlos — Editorial Styling & Blowouts

Be warm, encouraging, and chic — like a trusted friend with impeccable taste. Keep replies concise and conversational (2–4 short paragraphs max). When a client seems ready, encourage them to book on the Book Appointment page and suggest the best stylist for their goal. Never invent services or prices outside this list.`;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: CoreMessage[] } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({
          error:
            "The AI advisor isn't configured yet. Add an ANTHROPIC_API_KEY to enable Luna.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = await streamText({
      model: anthropic("claude-sonnet-4-6"),
      system: SYSTEM_PROMPT,
      messages,
      temperature: 0.7,
    });

    return result.toDataStreamResponse();
  } catch (err) {
    console.error("[chat] error", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong talking to Luna." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
