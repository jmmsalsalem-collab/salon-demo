"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConfig } from "@/lib/useConfig";
import { Button } from "./ui/Button";

const links = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/advisor", label: "AI Advisor" },
  { href: "/settings", label: "Settings" },
];

export default function Navbar() {
  const pathname = usePathname();
  const config = useConfig();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-cream-50/85 backdrop-blur-md border-b border-gold-100 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blush-400 to-gold-300 text-sm font-semibold text-white shadow-soft">
            {config.name.charAt(0)}
          </span>
          <span className="serif text-2xl font-semibold leading-none tracking-tight text-charcoal">
            {config.name}
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : pathname.startsWith(l.href.replace("/#", "/"));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative text-sm tracking-wide transition-colors hover:text-blush-500",
                  active ? "text-blush-500" : "text-charcoal-light"
                )}
              >
                {l.label}
              </Link>
            );
          })}
          <Button href="/book" variant="primary" size="sm">
            Book Now
          </Button>
        </div>

        <button
          className="md:hidden text-charcoal"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-gold-100 bg-cream-50/95 backdrop-blur-md">
          <div className="flex flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-charcoal-light hover:bg-blush-50"
              >
                {l.label}
              </Link>
            ))}
            <Button
              href="/book"
              variant="primary"
              size="sm"
              className="mt-2"
            >
              Book Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
