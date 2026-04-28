"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import Lightbox from "@/components/Lightbox";

export default function GalleryGrid({ images, projectName }: { images: string[]; projectName: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {images.map((src, i) => (
          <Reveal key={src} delay={i * 50} direction="scale">
            <button
              onClick={() => setOpenIndex(i)}
              className={[
                "relative overflow-hidden rounded-2xl group block w-full",
                i % 5 === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square",
              ].join(" ")}
            >
              <Image
                src={src}
                alt={`${projectName} gallery ${i + 1}`}
                fill
                sizes="33vw"
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <div className="text-white text-[10px] tracking-[0.22em] uppercase flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
                  </svg>
                  View
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={images.map((src, i) => ({ src, label: `${projectName} · ${i + 1}` }))}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      )}
    </>
  );
}
