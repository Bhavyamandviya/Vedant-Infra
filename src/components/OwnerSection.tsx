"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import Lightbox from "@/components/Lightbox";

/**
 * Founder + Recognition section.
 * Showcases Darpan Patel and the awards he/Vedant Infra has received from
 * Times of India, IFA and Sitraaj. Three visual moods supported via the
 * `variant` prop so the same content can plug into different home-page designs.
 */

const FOUNDER_AWARDS: { src: string; org: string; title: string; year: string; note: string }[] = [
  {
    src: "/Awards/Time-2 (1).jpg",
    org: "The Times of India",
    title: "Real Estate Icon — Vadodara",
    year: "2024",
    note: "Recognised by The Times Group for sustained excellence in residential development.",
  },
  {
    src: "/Awards/Time-2 (2).jpg",
    org: "The Times of India",
    title: "Editor's Choice Honour",
    year: "2024",
    note: "Featured by The Times Group for craft, integrity and architectural restraint.",
  },
  {
    src: "/Awards/Time-2 (3).jpg",
    org: "The Times of India",
    title: "Builder of the Year — Western India",
    year: "2023",
    note: "Awarded for pioneering bungalow communities across Vadodara.",
  },
  {
    src: "/Awards/IFA.JPG",
    org: "IFA — Indian Real Estate Awards",
    title: "Outstanding Contribution to Luxury Housing",
    year: "2023",
    note: "Honoured at the Indian Real Estate Awards for the Royal Mansions community.",
  },
  {
    src: "/Awards/Award.JPG",
    org: "Sitraaj",
    title: "Most Trusted Developer — Gujarat",
    year: "2022",
    note: "Sitraaj recognises Vedant Infra for transparency, on-time delivery and craft.",
  },
  {
    src: "/Awards/Awards-2.jpg",
    org: "Sitraaj",
    title: "Lifetime Excellence — Darpan Patel",
    year: "2022",
    note: "A lifetime honour to the founder for two decades of considered building.",
  },
  {
    src: "/Awards/Time-2 (4).jpg",
    org: "The Times of India",
    title: "Iconic Brands of India",
    year: "2022",
    note: "Vedant Infra named among the iconic homegrown brands of India.",
  },
];

interface Props {
  /** "light" — for white/cream sections. "dark" — for noir sections. "split" — for editorial side layout. */
  variant?: "light" | "dark" | "split";
  showFullBio?: boolean;
}

export default function OwnerSection({ variant = "light", showFullBio = true }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const dark = variant === "dark";

  return (
    <section
      className={[
        "relative overflow-hidden",
        dark ? "bg-[#0e0c0a] text-white" : "bg-bg",
      ].join(" ")}
    >
      {/* Decorative gold halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 w-[40rem] h-[40rem] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(219,157,35,0.18) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 w-[32rem] h-[32rem] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(244,210,124,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="container relative py-28 md:py-36 pb-20 md:pb-24">
        {/* HEADLINE */}
        <div className="grid lg:grid-cols-12 gap-10 mb-20 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <div
                className={[
                  "eyebrow mb-5 flex items-center gap-3",
                  dark ? "!text-gold" : "",
                ].join(" ")}
              >
                <span className="gold-divider" />
                <span>The Founder &amp; Recognition</span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2
                className={[
                  "text-4xl md:text-5xl lg:text-6xl leading-[1.04] max-w-2xl",
                  dark ? "text-white" : "",
                ].join(" ")}
              >
                Twenty years.{" "}
                <em className="not-italic text-shine">One conviction.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160} className="lg:col-span-5">
            <p
              className={[
                "leading-relaxed text-[15px] md:text-base",
                dark ? "text-white/75" : "text-ink-secondary",
              ].join(" ")}
            >
              Vedant Infra was founded by{" "}
              <strong className={dark ? "text-white" : "text-ink-primary"}>
                Darpan Patel
              </strong>{" "}
              with a single belief — that a home should outlive a generation.
              Two decades on, that belief has built a quiet portfolio of
              landmark residences and earned recognition from{" "}
              <span className="text-gold">The Times of India</span>,{" "}
              <span className="text-gold">IFA</span> and{" "}
              <span className="text-gold">Sitraaj</span>.
            </p>
          </Reveal>
        </div>

        {/* PORTRAIT + STATEMENT */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-stretch mb-24">
          {/* Founder portrait card */}
          <Reveal direction="left" className="lg:col-span-5">
            <div className="relative group">
              <div
                className={[
                  "absolute -top-3 -left-3 w-full h-full transition-transform duration-700 group-hover:-translate-x-2 group-hover:-translate-y-2",
                  dark ? "border border-gold/40" : "border border-gold/60",
                ].join(" ")}
                aria-hidden
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="/Awards/Award.JPG"
                  alt="Darpan Patel — Founder, Vedant Infra"
                  fill
                  sizes="(min-width: 1024px) 35vw, 90vw"
                  className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <div className="eyebrow !text-white/80 mb-2">
                    The Founder
                  </div>
                  <div className="font-serif text-3xl md:text-4xl text-white leading-tight">
                    Darpan Patel
                  </div>
                  <div className="text-white/70 text-sm mt-1.5">
                    Managing Director, Vedant Infra
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Founder statement */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <Reveal delay={120}>
                <svg
                  width="48"
                  height="40"
                  viewBox="0 0 48 40"
                  fill="none"
                  className="mb-8 text-gold"
                >
                  <path
                    d="M0 24c0-13.255 6.5-22 19.5-24v6c-7 2-11 7-11 14h11v20h-19.5V24zm28 0c0-13.255 6.5-22 19.5-24v6c-7 2-11 7-11 14h11v20h-19.5V24z"
                    fill="currentColor"
                    opacity="0.85"
                  />
                </svg>
              </Reveal>
              <Reveal delay={180}>
                <p
                  className={[
                    "font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.3] mb-8",
                    dark ? "text-white/95" : "text-ink-primary",
                  ].join(" ")}
                >
                  We don&apos;t build for the season — we build for the
                  generation that follows. Every column, every grain of
                  travertine, every curve of an arch is a quiet promise to the
                  family that will call it home.
                </p>
              </Reveal>
              {showFullBio && (
                <Reveal delay={240}>
                  <p
                    className={[
                      "leading-relaxed text-[15px] md:text-base max-w-2xl",
                      dark ? "text-white/70" : "text-ink-secondary",
                    ].join(" ")}
                  >
                    Born and raised in Vadodara, Darpan founded Vedant Infra in
                    the early 2000s with a small team and an unfashionable idea
                    — that genuine craft, restraint and patience would matter
                    more than scale. Today the studio has delivered over 150
                    residences across five signature communities, with an
                    architectural language widely recognised as the standard
                    for considered luxury in Western India.
                  </p>
                </Reveal>
              )}
            </div>

            {/* Honours strip */}
            <Reveal delay={300}>
              <div
                className={[
                  "mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 pt-8",
                  dark
                    ? "border-t border-white/10"
                    : "border-t border-gold/15",
                ].join(" ")}
              >
                <div className="eyebrow">Recognised by</div>
                <div className="flex flex-wrap items-center gap-x-7 gap-y-2 font-serif text-lg md:text-xl">
                  <span className={dark ? "text-white/85" : "text-ink-primary"}>
                    The Times of India
                  </span>
                  <span className="text-gold">·</span>
                  <span className={dark ? "text-white/85" : "text-ink-primary"}>
                    IFA Awards
                  </span>
                  <span className="text-gold">·</span>
                  <span className={dark ? "text-white/85" : "text-ink-primary"}>
                    Sitraaj
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* AWARDS GRID */}
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-5 flex items-center gap-3">
                <span className="gold-divider" />
                <span>Selected Honours</span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h3
                className={[
                  "text-3xl md:text-4xl lg:text-5xl leading-[1.08] max-w-md",
                  dark ? "text-white" : "",
                ].join(" ")}
              >
                A trophy cabinet built quietly, over time.
              </h3>
            </Reveal>
            <Reveal delay={160}>
              <p
                className={[
                  "mt-6 leading-relaxed text-[15px] max-w-md",
                  dark ? "text-white/70" : "text-ink-secondary",
                ].join(" ")}
              >
                A selection of recognitions awarded to Darpan Patel and the
                Vedant Infra studio across architectural, residential and
                business excellence categories.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {FOUNDER_AWARDS.slice(0, 4).map((a, i) => (
              <Reveal key={a.src} delay={i * 90} direction="up">
                <button
                  onClick={() => setOpenIndex(i)}
                  className={[
                    "group relative w-full text-left overflow-hidden rounded-2xl block transition-all duration-500",
                    dark
                      ? "bg-white/[0.03] border border-white/10 hover:border-gold/50"
                      : "bg-bg-elev border border-gold/15 hover:border-gold/45",
                    "hover:-translate-y-1",
                  ].join(" ")}
                  style={{
                    boxShadow: dark
                      ? "0 0 0 0 rgba(219,157,35,0)"
                      : "0 1px 2px rgba(0,0,0,0.02)",
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={a.src}
                      alt={`${a.org} — ${a.title}`}
                      fill
                      sizes="(min-width: 1024px) 30vw, 90vw"
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-90" />
                    <div className="absolute top-3 right-3 bg-gold text-[#0a0805] text-[10px] tracking-[0.2em] uppercase px-2.5 py-1">
                      {a.year}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] tracking-[0.22em] uppercase text-gold mb-2">
                      {a.org}
                    </div>
                    <div
                      className={[
                        "font-serif text-lg md:text-xl leading-snug mb-2 group-hover:text-gold transition-colors",
                        dark ? "text-white" : "text-ink-primary",
                      ].join(" ")}
                    >
                      {a.title}
                    </div>
                    <div
                      className={[
                        "text-[13px] leading-relaxed",
                        dark ? "text-white/65" : "text-ink-secondary",
                      ].join(" ")}
                    >
                      {a.note}
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        {/* SECONDARY AWARDS — horizontal cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FOUNDER_AWARDS.slice(4).map((a, i) => {
            const idx = i + 4;
            return (
              <Reveal key={a.src} delay={i * 90} direction="up" className="">
                <button
                  onClick={() => setOpenIndex(idx)}
                  className={[
                    "group relative w-full text-left overflow-hidden block transition-all duration-500 hover:-translate-y-1 rounded-xl",
                    dark
                      ? "bg-white/[0.03] border border-white/10 hover:border-gold/50"
                      : "bg-bg-elev border border-gold/15 hover:border-gold/45",
                  ].join(" ")}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={a.src}
                      alt={`${a.org} — ${a.title}`}
                      fill
                      sizes="(min-width: 1024px) 30vw, 90vw"
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-90" />
                    <div className="absolute top-3 right-3 bg-gold text-[#0a0805] text-[10px] tracking-[0.2em] uppercase px-2.5 py-1">
                      {a.year}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] tracking-[0.22em] uppercase text-gold mb-2">
                      {a.org}
                    </div>
                    <div
                      className={[
                        "font-serif text-lg leading-snug group-hover:text-gold transition-colors",
                        dark ? "text-white" : "text-ink-primary",
                      ].join(" ")}
                    >
                      {a.title}
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* CTA */}
        <Reveal delay={200}>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6">
            <div
              className={[
                "text-sm",
                dark ? "text-white/65" : "text-ink-secondary",
              ].join(" ")}
            >
              Honours awarded to Darpan Patel and Vedant Infra · 2022 — 2024
            </div>
            <Link
              href="/awards"
              className={dark ? "btn-outline-light" : "btn-outline"}
            >
              See All Awards
            </Link>
          </div>
        </Reveal>
      </div>

      {openIndex !== null && (
        <Lightbox
          images={FOUNDER_AWARDS.map((a) => ({
            src: a.src,
            label: `${a.org} · ${a.title} · ${a.year}`,
          }))}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      )}
    </section>
  );
}
