"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HERO_PROJECTS } from "./heroProjects";

/**
 * DESIGN 01 · STORM & THUNDER
 * ---------------------------
 * Full-bleed photograph, full screen height, no letterbox.
 *  - Slow heavy ken-burns (storm-zoom)
 *  - Two layered lightning flashes on independent cycles
 *  - Falling rain streaks (CSS, transform-only — GPU cheap)
 *  - Pulsing storm vignette
 *  - On slide change, a single THUNDER STRIKE flashes the screen
 *    while the photograph swaps behind it.
 *
 * Image is rendered with sizes="120vw" and never scaled past 1.10 →
 * stays sharp.
 */
export default function HeroSlideshow({
  intervalMs = 7500,
}: {
  intervalMs?: number;
}) {
  const images = HERO_PROJECTS;
  const [active, setActive] = useState(0);
  const [strikeKey, setStrikeKey] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setStrikeKey((k) => k + 1);
      window.setTimeout(() => {
        setActive((a) => (a + 1) % images.length);
      }, 450);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  const current = images[active];

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050402]">
      {/* The photograph — full bleed, slow heavy ken-burns */}
      <div className="absolute inset-0 storm-zoom">
        <Image
          key={current.image}
          src={current.image}
          alt={current.name}
          fill
          priority
          sizes="120vw"
          className="object-cover"
        />
      </div>

      {/* Storm wash — heavy gradient, mostly bottom for caption legibility */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,4,2,0.45) 0%, rgba(5,4,2,0.10) 35%, rgba(5,4,2,0.85) 100%)",
        }}
      />

      {/* Pulsing storm vignette — corners breathe darker/lighter */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none storm-vignette"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Rain streaks — multiple layered SVG-like lines */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {Array.from({ length: 60 }).map((_, i) => {
          const left = (i * 1.7) % 100;
          const delay = (i * 137) % 1800;
          const duration = 1200 + ((i * 53) % 900);
          const length = 40 + ((i * 31) % 80);
          return (
            <span
              key={i}
              className="absolute rain-fall"
              style={{
                top: 0,
                left: `${left}%`,
                width: "1px",
                height: `${length}px`,
                background:
                  "linear-gradient(to bottom, transparent, rgba(255,255,255,0.55))",
                animationDelay: `-${delay}ms`,
                animationDuration: `${duration}ms`,
              }}
            />
          );
        })}
      </div>

      {/* Lightning layer — full white wash, pulses on its own cycle */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none lightning-flash"
        style={{
          background:
            "radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.80) 0%, rgba(244,210,124,0.30) 30%, transparent 65%)",
          mixBlendMode: "screen",
        }}
      />
      {/* Second lightning layer — different ellipse, offset cycle */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none lightning-late"
        style={{
          background:
            "radial-gradient(ellipse at 75% 20%, rgba(255,255,255,0.85) 0%, rgba(244,210,124,0.20) 35%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Single thunder STRIKE on slide change — keyed for re-trigger */}
      <div
        key={`strike-${strikeKey}`}
        aria-hidden
        className="absolute inset-0 pointer-events-none thunder-strike z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(244,210,124,0.5) 35%, rgba(255,255,255,0.85) 70%, rgba(244,210,124,0.4) 100%)",
          mixBlendMode: "screen",
        }}
      />

      {/* A faint gold horizontal sweep that "thunders" with the strike */}
      <div
        key={`bolt-${strikeKey}`}
        aria-hidden
        className="absolute left-0 right-0 top-1/2 h-[2px] z-10 thunder-strike"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(244,210,124,1) 35%, rgba(255,255,255,1) 50%, rgba(244,210,124,1) 65%, transparent 100%)",
          boxShadow:
            "0 0 30px rgba(244,210,124,0.95), 0 0 60px rgba(244,210,124,0.6)",
        }}
      />

      {/* Project caption — bottom-left, always-light text */}
      <div className="absolute bottom-28 left-8 md:left-14 z-30 max-w-md">
        <div
          key={`cap-${active}`}
          className="text-on-photo drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
          style={{ animation: "fade-up 1100ms ease-out 600ms both" }}
        >
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="text-gold-soft font-serif text-2xl leading-none">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="block w-8 h-px bg-gold/60" />
            <span className="text-[10px] tracking-[0.32em] uppercase text-on-photo-soft">
              {String(images.length).padStart(2, "0")} · Reel
            </span>
            {current.bookingAvailable && (
              <span className="pill-booking">Booking Open</span>
            )}
          </div>
          <div className="font-serif text-4xl md:text-5xl leading-tight text-on-photo">
            {current.name}
          </div>
          <div className="text-[10px] tracking-[0.30em] uppercase text-on-photo-soft mt-2">
            {current.tagline}
          </div>
        </div>
      </div>

      {/* Slide pips — bottom-right */}
      <div className="absolute bottom-12 right-10 z-30 flex items-center gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setStrikeKey((k) => k + 1);
              window.setTimeout(() => setActive(i), 450);
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
