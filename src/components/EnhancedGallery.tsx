"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import Lightbox from "@/components/Lightbox";

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
      activeFilter === "All" ? tagged : tagged.filter((t) => t.category === activeFilter),
    [tagged, activeFilter]
  );

  if (images.length === 0) return null;

  const featured = tagged[0];
  const gridImages = filtered.filter((t) => t.index !== featured.index);

  // Clean bento pattern: repeating groups of 5
  // [wide, tall, normal, normal, wide-short]
  const getBentoClass = (i: number): string => {
    const pos = i % 5;
    if (pos === 0) return "col-span-2 row-span-2"; // big square
    if (pos === 1) return "col-span-1 row-span-2"; // tall
    if (pos === 2) return "col-span-1 row-span-1"; // normal
    if (pos === 3) return "col-span-1 row-span-1"; // normal
    if (pos === 4) return "col-span-2 row-span-1"; // wide
    return "col-span-1 row-span-1";
  };

  return (
    <div className="space-y-10">

      {/* ── FILTER PILLS ── */}
      <Reveal>
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => {
            const count = c === "All" ? tagged.length : tagged.filter((t) => t.category === c).length;
            const active = c === activeFilter;
            return (
              <button
                key={c}
                onClick={() => setActiveFilter(c)}
                className={[
                  "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase transition-all duration-300 border",
                  active
                    ? "bg-gold text-white border-gold shadow-[0_0_20px_rgba(219,157,35,0.35)]"
                    : "bg-transparent text-ink-secondary border-gold/20 hover:border-gold/60 hover:text-ink-primary",
                ].join(" ")}
              >
                {c}
                <span className={["tabular-nums text-[9px]", active ? "text-white/70" : "text-ink-muted"].join(" ")}>
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* ── HERO FEATURE ── */}
      {activeFilter === "All" && (
        <Reveal direction="scale">
          <button
            onClick={() => setOpenIndex(featured.index)}
            className="group relative block w-full overflow-hidden rounded-2xl"
          >
            {/* 16:9 ratio — cinematic but not too squashed */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <Image
                src={featured.src}
                alt={`${projectName} — ${featured.name}`}
                fill
                priority
                sizes="100vw"
                className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.04]"
              />

              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

              {/* Gold corner accent */}
              <div className="absolute top-6 right-6 w-16 h-16 border-t border-r border-gold/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute bottom-6 left-6 w-16 h-16 border-b border-l border-gold/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div className="flex items-end justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-block w-6 h-px bg-gold" />
                      <span className="text-[10px] tracking-[0.3em] uppercase text-gold">
                        Featured · {featured.category}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl text-white leading-[1.15] max-w-2xl">
                      {featured.caption}
                    </h3>
                    <p className="mt-3 text-white/60 text-sm tracking-wide">{featured.name}</p>
                  </div>

                  {/* CTA pill */}
                  <div className="hidden md:flex shrink-0 items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 text-white text-[10px] tracking-[0.22em] uppercase group-hover:bg-gold/20 group-hover:border-gold/40 transition-all duration-500">
                    View Frame
                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                      <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Index badge */}
              <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-white/70">
                01 / {String(tagged.length).padStart(2, "0")}
              </div>
            </div>
          </button>
        </Reveal>
      )}

      {/* ── BENTO GRID ── */}
      <div
        className="grid grid-cols-3 md:grid-cols-4 gap-3"
        style={{ gridAutoRows: "220px" }}
      >
        {(activeFilter === "All" ? gridImages : filtered).map((t, i) => (
          <Reveal
            key={`${t.src}-${activeFilter}-${i}`}
            delay={Math.min(i * 50, 500)}
            direction="up"
            className={getBentoClass(i)}
          >
            <button
              onClick={() => setOpenIndex(t.index)}
              className="relative w-full h-full overflow-hidden group block rounded-xl"
            >
              <Image
                src={t.src}
                alt={`${projectName} — ${t.name}`}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.07]"
              />

              {/* Resting overlay — subtle tint */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Category chip — top left */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-400 -translate-y-1 group-hover:translate-y-0">
                <span className="bg-gold/90 backdrop-blur-sm text-white text-[8px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full">
                  {t.category}
                </span>
              </div>

              {/* Expand icon — top right */}
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-1 group-hover:translate-y-0">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" />
                </svg>
              </div>

              {/* Caption — bottom */}
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="font-serif text-white text-sm md:text-base leading-snug line-clamp-2">
                  {t.caption}
                </p>
                <p className="mt-1.5 text-white/60 text-[10px] tracking-[0.18em] uppercase">{t.name}</p>
              </div>

              {/* Gold ring on hover */}
              <div className="absolute inset-0 rounded-xl ring-0 group-hover:ring-1 group-hover:ring-gold/50 ring-inset transition-all duration-500" />
            </button>
          </Reveal>
        ))}
      </div>

      {/* ── FOOTER ── */}
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gold/10">
          <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-ink-muted">
            <span className="inline-block w-4 h-px bg-gold/40" />
            {filtered.length} of {tagged.length} frames · {projectName}
          </div>
          <div className="text-[10px] tracking-[0.2em] uppercase text-ink-muted">
            Tap to expand · ← → navigate · Esc to close
          </div>
        </div>
      </Reveal>

      {openIndex !== null && (
        <Lightbox
          images={tagged.map((t) => ({ src: t.src, label: `${t.category} · ${t.name}` }))}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      )}
    </div>
  );
}