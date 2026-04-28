"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import Lightbox from "@/components/Lightbox";

/**
 * Editorial gallery — categorised, captioned, with a hero feature image
 * and a masonry-style grid below. Designed for project detail pages where
 * each image deserves a story.
 */

interface Props {
  images: string[];
  projectName: string;
}

const KEYWORDS: { match: RegExp; category: string; caption: string }[] = [
  { match: /(top.?view|aerial|drone)/i, category: "Aerial", caption: "An aerial study of the community plan." },
  { match: /(elevation|front|facade|banner|home.?front|project.?front)/i, category: "Architecture", caption: "The principal elevation, in soft daylight." },
  { match: /(side|cam_)/i, category: "Architecture", caption: "Side elevation — the play of mass and shadow." },
  { match: /(entrance|gate|colony.?entrance|society.?entrance)/i, category: "Arrival", caption: "The arrival sequence — pillars, light and stone." },
  { match: /(club|society|building)/i, category: "Community", caption: "A community moment — landscape, leisure and gathering." },
  { match: /(swim|pool)/i, category: "Leisure", caption: "Resident leisure — the swimming pavilion." },
  { match: /(terrace|balcony|verand)/i, category: "Outdoor", caption: "Private outdoor — open to the sky." },
  { match: /(bedroom|master|hall|interior|living|kitchen)/i, category: "Interiors", caption: "Inside — light, proportion and material." },
  { match: /(road|night|morning|garden)/i, category: "Atmosphere", caption: "An everyday moment, captured." },
];

function classify(src: string): { category: string; caption: string } {
  const filename = src.split("/").pop() || "";
  for (const k of KEYWORDS) {
    if (k.match.test(filename)) return { category: k.category, caption: k.caption };
  }
  return { category: "Vignette", caption: "A composed vignette from the residence." };
}

function prettyName(src: string) {
  const f = (src.split("/").pop() || "").replace(/\.[^.]+$/, "");
  return f
    .replace(/[_-]+/g, " ")
    .replace(/\bcam_?\d*/i, "Cam")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export default function EnhancedGallery({ images, projectName }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Tag every image once
  const tagged = useMemo(
    () =>
      images.map((src, i) => ({
        src,
        index: i,
        name: prettyName(src),
        ...classify(src),
      })),
    [images]
  );

  const categories = useMemo(() => {
    const set = new Set<string>();
    tagged.forEach((t) => set.add(t.category));
    return ["All", ...Array.from(set)];
  }, [tagged]);

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? tagged
        : tagged.filter((t) => t.category === activeFilter),
    [tagged, activeFilter]
  );

  if (images.length === 0) return null;

  // Featured = first image
  const featured = tagged[0];
  const rest = filtered.filter((t) => t.index !== featured.index);

  // Layout pattern: every 6th image becomes a full-bleed banner, every 3rd a tall
  const sizeFor = (i: number): string => {
    if (i % 7 === 0) return "md:col-span-2 md:row-span-2 aspect-[4/3]";
    if (i % 5 === 0) return "md:col-span-2 aspect-[16/9]";
    if (i % 3 === 0) return "md:row-span-2 aspect-[3/4]";
    return "aspect-[4/3]";
  };

  return (
    <div className="space-y-14">
      {/* Filter chips */}
      <Reveal>
        <div className="flex flex-wrap items-center gap-2.5">
          {categories.map((c) => {
            const count =
              c === "All"
                ? tagged.length
                : tagged.filter((t) => t.category === c).length;
            const active = c === activeFilter;
            return (
              <button
                key={c}
                onClick={() => setActiveFilter(c)}
                className={[
                  "group relative inline-flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.22em] uppercase transition-all duration-300 border",
                  active
                    ? "bg-ink-primary text-white border-ink-primary"
                    : "bg-transparent text-ink-secondary border-black/15 hover:border-gold hover:text-ink-primary",
                ].join(" ")}
              >
                <span>{c}</span>
                <span
                  className={[
                    "text-[9px] tabular-nums",
                    active ? "text-white/70" : "text-ink-muted",
                  ].join(" ")}
                >
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* FEATURED HERO IMAGE */}
      {activeFilter === "All" && (
        <Reveal direction="scale">
          <button
            onClick={() => setOpenIndex(featured.index)}
            className="group relative block w-full overflow-hidden lift-on-hover rounded-3xl"
          >
            <div className="relative aspect-[21/9] w-full overflow-hidden">
              <Image
                src={featured.src}
                alt={`${projectName} — ${featured.name}`}
                fill
                priority
                sizes="100vw"
                className="object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

              {/* Bottom caption block */}
              <div className="absolute bottom-0 left-0 right-0 p-7 md:p-12">
                <div className="flex items-end justify-between gap-8 flex-wrap">
                  <div>
                    <div className="text-[10px] tracking-[0.28em] uppercase text-gold mb-3 flex items-center gap-3">
                      <span className="gold-divider" /> Featured · {featured.category}
                    </div>
                    <div className="font-serif text-3xl md:text-5xl text-white leading-[1.1] max-w-2xl">
                      {featured.caption}
                    </div>
                    <div className="text-white/70 text-sm mt-3 tracking-wide">
                      {featured.name}
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-3 text-white/85 text-[10px] tracking-[0.22em] uppercase translate-y-0 group-hover:-translate-y-1 transition-transform duration-500">
                    <span>View Full Frame</span>
                    <svg width="34" height="14" viewBox="0 0 34 14" fill="none">
                      <path d="M0 7h32M27 2l5 5-5 5" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </Reveal>
      )}

      {/* MASONRY-STYLE GRID */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5"
        style={{ gridAutoRows: "min-content" }}
      >
        {(activeFilter === "All" ? rest : filtered).map((t, i) => (
          <Reveal
            key={`${t.src}-${activeFilter}`}
            delay={Math.min(i * 60, 600)}
            direction="up"
            className={sizeFor(i)}
          >
            <button
              onClick={() => setOpenIndex(t.index)}
              className="relative w-full h-full overflow-hidden group block rounded-2xl"
            >
              <Image
                src={t.src}
                alt={`${projectName} — ${t.name}`}
                fill
                sizes="(min-width: 768px) 30vw, 50vw"
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
              />

              {/* Always-visible micro-tag */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 text-[9px] tracking-[0.22em] uppercase text-ink-primary opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-1 group-hover:translate-y-0">
                {t.category}
              </div>

              {/* Hover gradient + caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="font-serif text-white text-base md:text-lg leading-tight">
                  {t.caption}
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] tracking-[0.22em] uppercase text-white/80">
                  <span>{t.name}</span>
                  <span className="flex items-center gap-1.5">
                    Open
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M14 4h6v6M20 4L10 14M9 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Subtle resting frame */}
              <div className="absolute inset-0 ring-0 group-hover:ring-1 group-hover:ring-gold/60 ring-inset transition-all duration-500" />
            </button>
          </Reveal>
        ))}
      </div>

      {/* Footer hint */}
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-black/10">
          <div className="text-xs tracking-[0.22em] uppercase text-ink-muted">
            {filtered.length} of {tagged.length} frames · {projectName}
          </div>
          <div className="text-[10px] tracking-[0.22em] uppercase text-ink-muted">
            Tap any image · Use ← → to navigate · Esc to close
          </div>
        </div>
      </Reveal>

      {openIndex !== null && (
        <Lightbox
          images={tagged.map((t) => ({
            src: t.src,
            label: `${t.category} · ${t.name}`,
          }))}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      )}
    </div>
  );
}
