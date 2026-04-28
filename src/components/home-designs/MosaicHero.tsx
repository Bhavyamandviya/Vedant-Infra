"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HERO_PROJECTS } from "./heroProjects";

/**
 * DESIGN 02 · IRIS LENS REVEAL
 * ----------------------------
 * Full-bleed photograph, full screen height — no grid, no shrinkage.
 *
 *   • Image emerges through a clip-path circle that expands from a
 *     single gold-ringed dot at centre to fill the viewport.
 *   • A second gold ring "chases" the iris outward, fading as it
 *     overshoots the frame.
 *   • Once revealed, two diagonal lens-flares sweep across on a
 *     continuous loop, suggesting cinema light.
 *   • Each slide change re-closes the iris, swaps the image, and
 *     re-opens.
 *   • Images stay at native scale (clip-path doesn't blur them).
 */
const REVEAL_MS = 2400;
const SLIDE_INTERVAL = 7000;

export default function MosaicHero() {
  const images = HERO_PROJECTS;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [ringKey, setRingKey] = useState(0);

  // Initial mount — open the iris
  useEffect(() => {
    const t = setTimeout(() => {
      setOpen(true);
      setRingKey((k) => k + 1);
    }, 350);
    return () => clearTimeout(t);
  }, []);

  // Slideshow cycle: close iris → swap → re-open
  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setOpen(false);
      window.setTimeout(() => {
        setActive((a) => (a + 1) % images.length);
        setOpen(true);
        setRingKey((k) => k + 1);
      }, REVEAL_MS - 400);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [images.length]);

  const current = images[active];

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050402]">
      {/* The photograph, full bleed, behind the iris mask */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: open ? "circle(140% at 50% 50%)" : "circle(0% at 50% 50%)",
          transition: `clip-path ${REVEAL_MS}ms cubic-bezier(0.77, 0, 0.175, 1)`,
        }}
      >
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

      {/* Cinematic wash — sits OUTSIDE the iris, so it appears with the image */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          clipPath: open ? "circle(140% at 50% 50%)" : "circle(0% at 50% 50%)",
          transition: `clip-path ${REVEAL_MS}ms cubic-bezier(0.77, 0, 0.175, 1)`,
          background:
            "linear-gradient(to bottom, rgba(5,4,2,0.30) 0%, rgba(5,4,2,0.05) 38%, rgba(5,4,2,0.75) 100%)",
        }}
      />

      {/* The chasing gold ring — re-keyed on each open */}
      <div
        key={`ring-${ringKey}`}
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 z-20 iris-ring"
        style={{
          width: "min(70vw, 70vh)",
          height: "min(70vw, 70vh)",
          border: "2px solid rgba(244,210,124,0.85)",
          borderRadius: "9999px",
          boxShadow:
            "0 0 40px rgba(244,210,124,0.55), inset 0 0 30px rgba(244,210,124,0.30)",
        }}
      />

      {/* Inner ring — slightly smaller, immediate burst */}
      <div
        key={`ring2-${ringKey}`}
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 z-20 iris-ring"
        style={{
          width: "min(40vw, 40vh)",
          height: "min(40vw, 40vh)",
          border: "1px solid rgba(255,255,255,0.6)",
          borderRadius: "9999px",
          animationDuration: "2200ms",
        }}
      />

      {/* Diagonal lens flare — full-page beam sweeps corner to corner */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none overflow-hidden z-10 transition-opacity duration-700"
        style={{ opacity: open ? 1 : 0 }}
      >
        {/* Wide primary beam — covers the entire screen edge-to-edge */}
        <div
          className="absolute -top-1/2 -left-1/2 lens-flare"
          style={{
            width: "200%",
            height: "200%",
            background:
              "linear-gradient(115deg, transparent 38%, rgba(244,210,124,0.25) 47%, rgba(255,255,255,0.55) 50%, rgba(244,210,124,0.25) 53%, transparent 62%)",
            mixBlendMode: "screen",
          }}
        />
        {/* Sharper secondary beam, offset cycle */}
        <div
          className="absolute -top-1/2 -left-1/2 lens-flare"
          style={{
            width: "200%",
            height: "200%",
            background:
              "linear-gradient(115deg, transparent 44%, rgba(244,210,124,0.35) 49%, rgba(255,255,255,0.7) 50%, rgba(244,210,124,0.35) 51%, transparent 56%)",
            mixBlendMode: "screen",
            animationDelay: "3.5s",
            animationDuration: "9s",
          }}
        />
      </div>

      {/* Subtle vignette pulse */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none vignette-pulse"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Project caption — bottom-left, always-light text */}
      <div
        className="absolute bottom-28 left-8 md:left-14 z-30 max-w-md transition-opacity duration-700"
        style={{ opacity: open ? 1 : 0 }}
      >
        <div
          key={`cap-${active}`}
          className="text-on-photo drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
          style={{ animation: open ? "fade-up 1000ms ease-out 600ms both" : undefined }}
        >
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="text-gold-soft font-serif text-2xl leading-none">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="block w-8 h-px bg-gold/60" />
            <span className="text-[10px] tracking-[0.32em] uppercase text-on-photo-soft">
              {String(images.length).padStart(2, "0")} · Portfolio
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
              setOpen(false);
              window.setTimeout(() => {
                setActive(i);
                setOpen(true);
                setRingKey((k) => k + 1);
              }, REVEAL_MS - 400);
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
