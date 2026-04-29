"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

interface Item {
  src: string;
  title: string;
  category: string;
  href: string;
}

const ITEMS: Item[] = [
  { src: "/vedant/royalmanison/Front-morning.jpg", title: "Royal Mansions", category: "5BHK Villa", href: "/projects/royal-mansions" },
  { src: "/vedant/royalheritage/Building-Entrance.jpg", title: "Royal Heritage", category: "5BHK Bungalow", href: "/projects/royal-heritage-villa" },
  { src: "/vedant/royalpark/Home-Front-Page.jpg", title: "Park Royal", category: "4B2HK Bungalow", href: "/projects/park-royal" },
  { src: "/vedant/royalcrest/Cam_02.jpg", title: "Royal Crest", category: "4BHK Bungalow", href: "/projects/royal-crest" },
  { src: "/vedant/ROYALGREENPARK/Entrance.jpg", title: "Royal Green Park", category: "Master-planned Community", href: "/projects" },
];

export default function PortfolioMasonry() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
      {ITEMS.map((it, i) => (
        <Reveal key={it.src} delay={i * 90} direction="up" className={i === 4 ? "md:col-span-2 lg:col-span-1" : ""}>
          <Link
            href={it.href}
            className="relative group block w-full aspect-[16/10] overflow-hidden rounded-2xl"
          >
            <Image
              src={it.src}
              alt={it.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent transition-opacity duration-500" />

            {/* Bottom-left meta */}
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 transition-transform duration-500 group-hover:-translate-y-1">
              <div className="text-[10px] tracking-[0.22em] uppercase text-gold mb-2">
                {it.category}
              </div>
              <div className="font-serif text-2xl md:text-3xl text-white leading-tight">
                {it.title}
              </div>
            </div>

            {/* Top-right arrow */}
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-1 group-hover:translate-x-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="absolute inset-0 ring-0 group-hover:ring-1 group-hover:ring-gold/60 ring-inset transition-all duration-500" />
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

