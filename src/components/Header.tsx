"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/latest-launches", label: "Latest Launches" },
  { href: "/about", label: "About Us" },
  { href: "/awards", label: "Awards" },
  { href: "/news", label: "In the News" }
];

export default function Header({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const solid = !transparent || scrolled;

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        solid ? "bg-white/95 backdrop-blur border-b border-black/5" : "bg-transparent"
      ].join(" ")}
    >
      <div className="container flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={solid ? "/logos_src/1mini-logo.png" : "/logos_src/1mini-logo.png"}
            alt="Vedant Infra"
            width={140}
            height={40}
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "text-[0.78rem] tracking-[0.18em] uppercase transition-colors",
                solid ? "text-ink-primary hover:text-gold" : "text-white/90 hover:text-white"
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/book-appointment" className="btn-gold !py-3 !px-6 text-[0.72rem]">
            Book Appointment
          </Link>
        </nav>

        <button
          aria-label="Menu"
          className={["lg:hidden p-2", solid ? "text-ink-primary" : "text-white"].join(" ")}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <>
                <path d="M4 7h16" strokeLinecap="round" />
                <path d="M4 12h16" strokeLinecap="round" />
                <path d="M4 17h16" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-black/5">
          <div className="container py-6 flex flex-col gap-5">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.85rem] tracking-[0.18em] uppercase text-ink-primary"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/book-appointment" className="btn-gold w-full mt-2">
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
