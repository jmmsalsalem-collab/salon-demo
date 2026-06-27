"use client";

import Link from "next/link";
import { Instagram, Phone, Clock } from "lucide-react";
import { useConfig } from "@/lib/useConfig";

export default function Footer() {
  const config = useConfig();

  return (
    <footer className="mt-24 border-t border-gold-100 bg-cream-100/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blush-400 to-gold-300 text-sm font-semibold text-white">
              {config.name.charAt(0)}
            </span>
            <span className="serif text-2xl font-semibold text-charcoal">
              {config.name}
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-charcoal-muted">
            {config.tagline}
          </p>
        </div>

        <div>
          <h4 className="serif text-lg text-charcoal">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-charcoal-muted">
            <li><Link href="/#services" className="hover:text-blush-500">Services</Link></li>
            <li><Link href="/book" className="hover:text-blush-500">Book Appointment</Link></li>
            <li><Link href="/gallery" className="hover:text-blush-500">Gallery</Link></li>
            <li><Link href="/advisor" className="hover:text-blush-500">AI Style Advisor</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="serif text-lg text-charcoal">Visit Us</h4>
          <ul className="mt-4 space-y-3 text-sm text-charcoal-muted">
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-gold-500" strokeWidth={1.5} />
              {config.phone}
            </li>
            <li className="flex items-center gap-2.5">
              <Instagram className="h-4 w-4 text-gold-500" strokeWidth={1.5} />
              {config.instagram}
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.5} />
              <span>
                {config.hours[0]?.day}: {config.hours[0]?.time}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="serif text-lg text-charcoal">Hours</h4>
          <ul className="mt-4 space-y-2 text-sm text-charcoal-muted">
            {config.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="text-charcoal-light">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hairline" />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-charcoal-muted sm:flex-row sm:px-8">
        <p>© {config.name}. All rights reserved.</p>
        <p>Crafted with care · A demo experience</p>
      </div>
    </footer>
  );
}
