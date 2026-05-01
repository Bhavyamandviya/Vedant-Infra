"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/motion/Reveal";
import { TROPHIES, FOUNDER_AWARDS } from "@/lib/company";

const HONOURS = [
  { year: "2024", title: "Luxury Villa Project of the Year", body: "Royal Heritage Villa recognised for architectural excellence." },
  { year: "2023", title: "Excellence in Residential Design", body: "Royal Mansions awarded for ultra-luxury residential design." },
  { year: "2022", title: "Emerging Developer of the Year", body: "Gujarat region — for consistent quality and delivery." },
  { year: "2021", title: "Design Leadership", body: "Park Royal — for community planning and landscape design." },
  { year: "2020", title: "Quality Construction", body: "Royal Crest — recognised for construction standards and finish." },
  { year: "2019", title: "Resident Satisfaction", body: "Across the Vedant Infra portfolio — for after-sales stewardship." },
];

// ── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({
  images,
  index,
  onClose,
}: {
  images: string[];
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      {/* Image container */}
      <div
        className="relative w-full h-full max-w-5xl max-h-[90vh] mx-4 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={current}
          src={images[current]}
          alt={`Award ${current + 1}`}
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-all text-xl"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full border border-white/20 text-white/70 hover:text-white hover:border-gold transition-all text-lg"
        aria-label="Previous"
      >
        ←
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full border border-white/20 text-white/70 hover:text-white hover:border-gold transition-all text-lg"
        aria-label="Next"
      >
        →
      </button>

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest font-sans uppercase">
        {current + 1} / {images.length}
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function AwardsPage() {
  const allTrophies = [...TROPHIES, ...FOUNDER_AWARDS.slice(2).map((a) => a.src)];
  const eventAndNews = FOUNDER_AWARDS.slice(2).map((a) => a.src);

  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  return (
    <main>
      <Header />

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}

      {/* ── HERO ── */}
      <section className="relative pt-40 pb-24 bg-bg overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-16 font-serif text-[22vw] leading-none text-gold/[0.04] select-none"
        >
          XX
        </div>
        <div className="container max-w-5xl relative">
          <Reveal>
            <div className="eyebrow mb-6">Recognition</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.03] max-w-4xl">
              A trophy cabinet built,{" "}
              <em className="not-italic text-gold">quietly</em>, over two
              decades.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-ink-secondary text-lg mt-8 max-w-2xl leading-relaxed">
              We rarely talk about awards. But every honour received reflects
              the standards our team holds itself to — quietly, consistently,
              and on every project we build.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-14 h-px w-24 bg-gold/40" />
          </Reveal>
        </div>
      </section>

      {/* ── TROPHIES & PLAQUES ── */}
      <section className="bg-bg-elev">
        <div className="container py-28 md:py-36">
          <Reveal>
            <div className="eyebrow mb-5">The Cabinet</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-16 max-w-2xl">
              Every piece, earned.
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {allTrophies.map((src, i) => (
              <Reveal key={src + i} delay={(i % 6) * 55} direction="scale">
                <button
                  onClick={() => setLightbox({ images: allTrophies, index: i })}
                  className="group relative w-full aspect-[3/4] overflow-hidden bg-bg rounded-2xl border border-gold/8 hover:border-gold/30 transition-colors duration-500 cursor-zoom-in"
                  aria-label={`View award ${i + 1}`}
                >
                  <Image
                    src={src}
                    alt={`Award ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 32vw, 48vw"
                    className="object-contain p-3 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/0 group-hover:ring-gold/20 transition-all duration-500" />
                  {/* Zoom hint */}
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white/80 text-xs">⤢</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                    <div className="h-px w-6 bg-gold mb-2" />
                    <div className="text-white/80 text-[10px] tracking-widest uppercase font-sans">
                      Vedant Infra
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRESS & MOMENTS ── */}
      <section className="bg-bg">
        <div className="container py-28 md:py-36">
          <Reveal>
            <div className="eyebrow mb-5">Press & Moments</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] mb-16 max-w-xl">
              In the news & on the stage.
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {eventAndNews.map((src, i) => (
              <Reveal key={src + i} delay={(i % 4) * 70}>
                <button
                  onClick={() => setLightbox({ images: eventAndNews, index: i })}
                  className="group relative w-full aspect-[4/3] overflow-hidden bg-bg-elev rounded-2xl border border-gold/8 hover:border-gold/30 transition-colors duration-500 cursor-zoom-in"
                  aria-label={`View press moment ${i + 1}`}
                >
                  <Image
                    src={src}
                    alt={`Press moment ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 92vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Zoom hint */}
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white/80 text-xs">⤢</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                    <div className="h-px w-6 bg-gold mb-2" />
                    <div className="text-white/85 text-xs tracking-widest uppercase font-sans">
                      Vedant Infra Archive
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HONOURS LIST ── */}
      <section className="bg-bg-elev relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-8 top-1/2 -translate-y-1/2 font-serif text-[18vw] leading-none text-gold/[0.035] select-none rotate-90 whitespace-nowrap"
        >
          AWARDS
        </div>
        <div className="container py-28 md:py-36 relative">
          <Reveal>
            <div className="eyebrow mb-5">Selected Honours</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-20 max-w-xl">
              Selected recognition.
            </h2>
          </Reveal>

          <div className="space-y-0">
            {HONOURS.map((a, i) => (
              <Reveal key={a.title} delay={(i % 4) * 70}>
                <div className="group grid md:grid-cols-[100px_1fr_1fr] gap-6 md:gap-12 items-start py-10 border-t border-gold/15 hover:border-gold/40 transition-colors duration-300">
                  <div className="font-serif text-gold text-3xl">{a.year}</div>
                  <h3 className="font-serif text-2xl md:text-3xl leading-tight group-hover:text-gold transition-colors duration-300">
                    {a.title}
                  </h3>
                  <p className="text-ink-secondary text-sm leading-relaxed md:pt-1">
                    {a.body}
                  </p>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-gold/15" />
          </div>
        </div>
      </section>

      <CTASection
        title="Be part of the next chapter."
        description="Schedule a private consultation with our relationship team."
      />
    </main>
  );
}