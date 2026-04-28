"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import Lightbox from "@/components/Lightbox";

interface Layout {
  src: string;
  label: string;
}

export default function LayoutsGallery({ layouts }: { layouts: Layout[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {layouts.map((l, i) => (
          <Reveal key={l.src} delay={i * 70}>
            <button
              onClick={() => setOpenIndex(i)}
              className="group block w-full text-left bg-bg-elev border border-gold/10 hover:border-gold/45 hover:shadow-[0_24px_60px_-24px_rgba(219,157,35,0.30)] transition-all duration-500 rounded-2xl overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#13100b]">
                <Image
                  src={l.src}
                  alt={l.label}
                  fill
                  sizes="33vw"
                  className="object-contain p-5 transition-transform duration-700 group-hover:scale-[1.06]"
                />
                {/* hover scrim with magnifier hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 bg-black/80 text-white text-[10px] tracking-[0.22em] uppercase px-4 py-2 inline-flex items-center gap-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
                      <path d="M11 8v6M8 11h6" strokeLinecap="round" />
                    </svg>
                    Click to zoom
                  </div>
                </div>
              </div>
              <div className="px-5 py-4 flex items-center justify-between border-t border-black/5">
                <div className="eyebrow !text-ink-primary">{l.label}</div>
                <div className="text-gold text-xs tracking-[0.18em] uppercase">View →</div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={layouts}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      )}
    </>
  );
}
