import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio Luxe — AI-Powered Style, Effortlessly Beautiful",
  description:
    "Studio Luxe is a high-end hair & beauty salon offering haircuts, balayage, color, keratin, bridal styling, lashes and nails — with an AI style advisor to help you book the perfect look.",
  metadataBase: new URL("https://studio-luxe.vercel.app"),
  openGraph: {
    title: "Studio Luxe — AI-Powered Style",
    description: "Effortlessly beautiful. Book your transformation today.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${jost.variable} bg-wash min-h-screen`}>
        <Navbar />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
