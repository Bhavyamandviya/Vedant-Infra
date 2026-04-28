"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "vi-first-visit-seen";

export default function FirstVisitPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : "1";
    if (!seen) {
      const t = setTimeout(() => setOpen(true), 1400);
      return () => clearTimeout(t);
    }
  }, []);

  function close() {
    setOpen(false);
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-5">
      <div className="absolute inset-0 bg-black/60" onClick={close} />
      <div className="relative max-w-lg w-full bg-bg-elev border border-gold/25 p-10 md:p-14 text-center">
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 text-ink-muted hover:text-ink-primary"
        >
          ✕
        </button>
        <div className="eyebrow mb-5">By Invitation</div>
        <h2 className="text-3xl md:text-4xl leading-tight mb-5">
          A private preview of Vedant Infra
        </h2>
        <p className="text-ink-secondary text-sm leading-relaxed mb-8">
          Schedule a private consultation and discover our latest luxury
          residences in Vadodara.
        </p>
        <Link href="/book-appointment" onClick={close} className="btn-gold">
          Book Appointment
        </Link>
      </div>
    </div>
  );
}
