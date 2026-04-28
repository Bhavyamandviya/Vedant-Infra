"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HERO_PROJECTS } from "./heroProjects";

/**
 * DESIGN 04 · VENETIAN STRIPS
 * ---------------------------
 * Cycles through all 5 projects. The image hides behind 7 vertical
 * black strips that lift up / drop down alternately. On every slide
 * change the strips re-close → image swaps → strips re-open. Image
 * stays at native scale.
 */
const STRIPS = 7;

export default function ReelHero({ intervalMs = 7000 }: { intervalMs?: number }) {
  const images = HERO_PROJECTS;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 350);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setOpen(false);
      window.setTimeout(() => {
        setActive((a) => (a + 1) % images.length);
        setOpen(true);
      }, 1200);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  const current = images[active];

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0805]">
      {/* Photograph — never scaled, kept sharp */}
      <Image
        key={current.image}
        src={current.image}
        alt={current.name}
        fill
        priority
        sizes="120vw"
        className="object-cover"
      />

      {/* Cinematic wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(115deg, rgba(10,8,5,0.55) 0%, rgba(10,8,5,0.10) 45%, rgba(10,8,5,0.55) 100%)",
        }}
      />

      {/* Vertical strips */}
      <div className="absolute inset-0 z-10 flex">
        {Array.from({ length: STRIPS }).map((_, i) => {
          const direction = i % 2 === 0 ? "up" : "down";
          const translate = open
            ? direction === "up"
              ? "translateY(-101%)"
              : "translateY(101%)"
            : "translateY(0)";
          return (
            <div
              key={i}
              className="flex-1 bg-[#0a0805] border-r border-gold/[0.05] last:border-r-0"
              style={{
                transform: translate,
                transition:
                  "transform 1300ms cubic-bezier(0.77, 0, 0.175, 1)",
                transitionDelay: open
                  ? `${i * 80}ms`
                  : `${(STRIPS - 1 - i) * 50}ms`,
              }}
            />
          );
        })}
      </div>

      {/* Project caption — bottom-left, always-light text */}
      <div className="absolute bottom-10 left-10 md:left-12 z-20 max-w-md text-on-photo drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
        <div
          key={`cap-${active}`}
          style={{ animation: open ? "fade-up 900ms ease-out 600ms both" : undefined }}
        >
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="text-[10px] tracking-[0.32em] uppercase text-on-photo-soft">
              Reel · {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
            {current.bookingAvailable && (
              <span className="pill-booking">Booking Open</span>
            )}
          </div>
          <div className="font-serif text-3xl md:text-4xl leading-tight text-on-photo">
            {current.name}
          </div>
          <div className="text-[10px] tracking-[0.30em] uppercase text-on-photo-soft mt-2">
            {current.tagline}
          </div>
        </div>
      </div>

      {/* Side counter — top-right, large issue number */}
      <div className="absolute top-28 right-8 md:right-12 z-20 text-right select-none">
        <div
          key={active}
          className="font-serif text-[5rem] md:text-[7rem] leading-none text-shine"
          style={{ animation: "fade-up 900ms ease-out both" }}
        >
          {String(active + 1).padStart(2, "0")}
        </div>
        <div className="text-[10px] tracking-[0.32em] uppercase text-on-photo-soft mt-2">
          / {String(images.length).padStart(2, "0")} · Vedant
        </div>
      </div>

      {/* Slide pips — bottom-right */}
      <div className="absolute bottom-10 right-10 flex items-center gap-3 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setOpen(false);
              window.setTimeout(() => {
                setActive(i);
                setOpen(true);
              }, 1200);
            }}
            aria-label={`Slide ${i + 1}`}
            className={[
              "h-px transition-all duration-700",
              i === active ? "w-14 bg-gold" : "w-5 bg-white/40 hover:bg-white/80",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
