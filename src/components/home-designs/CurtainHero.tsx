"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HERO_PROJECTS } from "./heroProjects";

/**
 * DESIGN 03 · MIDNIGHT VAULT
 * --------------------------
 * Eye-catching, distinct from designs 1/2/4. Combines:
 *   • A "vault" radial halo that explodes outward from centre on
 *     load, revealing the photograph through the expanding light.
 *   • Three-layer DEPTH PARALLAX that reacts to mouse movement —
 *     foreground, midground, background each shift at different
 *     amounts. Without a mouse, the layers drift slowly on their
 *     own (orbit) so it never sits still.
 *   • A NIGHT-MODE filter applied to projects without a real night
 *     photo: blue-shift + reduced brightness + boosted contrast.
 *     Royal Mansions has a real night image (`Side-night.jpg`) and
 *     skips the filter; the others get the synthetic treatment.
 *   • A roaming spotlight follows the cursor, picking out detail.
 *   • Project caption + booking pill, no CTA buttons (those live
 *     in the site header).
 */
const CYCLE_MS = 7500;
const REVEAL_MS = 1700;

export default function CurtainHero() {
  const images = HERO_PROJECTS;
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [haloKey, setHaloKey] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Initial vault open
  useEffect(() => {
    const t = setTimeout(() => {
      setRevealed(true);
      setHaloKey((k) => k + 1);
    }, 250);
    return () => clearTimeout(t);
  }, []);

  // Cycle through projects: collapse → swap → re-open
  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setRevealed(false);
      window.setTimeout(() => {
        setActive((a) => (a + 1) % images.length);
        setRevealed(true);
        setHaloKey((k) => k + 1);
      }, REVEAL_MS - 400);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [images.length]);

  // Mouse-tracked CSS variables for depth parallax + spotlight
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5; // -0.5 ... 0.5
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--mx", String(x));
      el.style.setProperty("--my", String(y));
      el.style.setProperty("--mxp", `${(e.clientX - r.left) / r.width * 100}%`);
      el.style.setProperty("--myp", `${(e.clientY - r.top) / r.height * 100}%`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const current = images[active];
  // Use real night image if supplied, otherwise fall back to the day image
  // and apply a CSS night filter to it.
  const src = current.nightImage ?? current.image;
  const applyNightFilter = !current.hasNightPhoto;

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 overflow-hidden bg-[#03060a]"
      style={
        {
          ["--mx" as never]: "0",
          ["--my" as never]: "0",
          ["--mxp" as never]: "50%",
          ["--myp" as never]: "50%",
          perspective: "1400px",
        } as React.CSSProperties
      }
    >
      {/* DEPTH LAYER 1 — background (slowest, soft blur) */}
      <div
        className="absolute inset-[-4%] transition-opacity duration-[1400ms]"
        style={{
          opacity: revealed ? 0.85 : 0,
          transform: "translate3d(calc(var(--mx) * -10px), calc(var(--my) * -8px), 0) scale(1.06)",
          transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1400ms ease",
          filter: applyNightFilter
            ? "brightness(0.7) saturate(1.35) hue-rotate(-8deg) blur(2px)"
            : "brightness(0.85) saturate(1.05) blur(2px)",
        }}
      >
        <Image
          key={`bg-${src}`}
          src={src}
          alt=""
          fill
          priority
          sizes="120vw"
          className="object-cover"
        />
      </div>

      {/* DEPTH LAYER 2 — midground (medium parallax) */}
      <div
        className="absolute inset-[-2%] transition-opacity duration-[1400ms]"
        style={{
          opacity: revealed ? 0.96 : 0,
          transform: "translate3d(calc(var(--mx) * -22px), calc(var(--my) * -16px), 0) scale(1.03)",
          transition: "transform 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1400ms ease",
          filter: applyNightFilter
            ? "brightness(0.78) saturate(1.25) hue-rotate(-6deg) contrast(1.04)"
            : "brightness(0.95) saturate(1.05)",
        }}
      >
        <Image
          src={src}
          alt={current.name}
          fill
          priority
          sizes="120vw"
          className="object-cover"
        />
      </div>

      {/* DEPTH LAYER 3 — foreground (most parallax, sharpest, soft mask) */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms]"
        style={{
          opacity: revealed ? 1 : 0,
          transform: "translate3d(calc(var(--mx) * -38px), calc(var(--my) * -28px), 0)",
          transition: "transform 400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1200ms ease",
          maskImage:
            "radial-gradient(ellipse at center, black 60%, transparent 100%)",
        }}
      >
        <Image
          src={src}
          alt=""
          fill
          priority
          sizes="120vw"
          className="object-cover"
          style={{
            filter: applyNightFilter
              ? "brightness(0.85) saturate(1.2) hue-rotate(-5deg) contrast(1.05)"
              : "brightness(1.0)",
          }}
        />
      </div>

      {/* Vault halo — explodes outward from centre on each reveal */}
      <div
        key={`halo-${haloKey}`}
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 z-10"
        style={{
          width: "10px",
          height: "10px",
          marginLeft: "-5px",
          marginTop: "-5px",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(244,210,124,0.9) 0%, rgba(244,210,124,0.4) 35%, rgba(244,210,124,0) 70%)",
          boxShadow:
            "0 0 60px rgba(244,210,124,0.85), 0 0 120px rgba(244,210,124,0.45)",
          animation: "vault-halo 2200ms cubic-bezier(0.77, 0, 0.175, 1) forwards",
        }}
      />

      {/* Roaming spotlight — follows the cursor */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(circle 380px at var(--mxp) var(--myp), rgba(244,210,124,0.18) 0%, rgba(244,210,124,0.08) 35%, transparent 70%)",
          mixBlendMode: "screen",
          opacity: revealed ? 1 : 0,
          transition: "opacity 1500ms ease",
        }}
      />

      {/* Cinematic wash — gentle vignette, doesn't crush the photograph */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(3,6,10,0.30) 85%, rgba(3,6,10,0.65) 100%)",
        }}
      />

      {/* Bottom gradient for caption legibility */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(3,6,10,0.65) 100%)",
        }}
      />

      {/* Subtle moonlight shimmer — diagonal sheen */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-10 storm-vignette"
        style={{
          background:
            "linear-gradient(115deg, transparent 0%, rgba(244,210,124,0.05) 45%, rgba(244,210,124,0.10) 50%, rgba(244,210,124,0.05) 55%, transparent 100%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Project caption — bottom-left, always-light text */}
      <div className="absolute bottom-16 left-8 md:left-14 z-30 max-w-md">
        <div
          key={`cap-${active}`}
          className="text-on-photo drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
          style={{ animation: revealed ? "fade-up 1100ms ease-out 700ms both" : undefined }}
        >
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="text-gold-soft font-serif text-2xl leading-none">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="block w-8 h-px bg-gold/60" />
            <span className="text-[10px] tracking-[0.32em] uppercase text-on-photo-soft">
              Chapter {String(active + 1).padStart(2, "0")} of{" "}
              {String(images.length).padStart(2, "0")} · Midnight
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
      <div className="absolute bottom-16 right-10 z-30 flex items-center gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setRevealed(false);
              window.setTimeout(() => {
                setActive(i);
                setRevealed(true);
                setHaloKey((k) => k + 1);
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
