"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const KEY = "vi-intro-played";

export default function IntroLoader() {
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setMounted(true);
    try {
      const played = sessionStorage.getItem(KEY);
      if (!played) {
        setHidden(false);
        sessionStorage.setItem(KEY, "1");
        document.body.style.overflow = "hidden";
        const t = setTimeout(() => {
          document.body.style.overflow = "";
          setHidden(true);
        }, 2600);
        return () => { clearTimeout(t); document.body.style.overflow = ""; };
      }
    } catch {}
  }, []);

  if (!mounted || hidden) return null;

  return (
    <div className="intro-overlay fixed inset-0 z-[200] bg-[#0e0e0e] flex flex-col items-center justify-center">
      <div className="relative w-[160px] h-[46px] mb-8 opacity-0 anim-fade-up" style={{ animationDelay: "300ms" }}>
        <Image src="/logos_src/Background-gold.svg" alt="Vedant Infra" fill sizes="160px" className="object-contain" priority />
      </div>
      <div className="relative w-[240px] h-[1px] bg-white/15 overflow-hidden">
        <div className="intro-bar absolute inset-0 bg-gold" />
      </div>
      <div className="mt-6 eyebrow !text-white/60 opacity-0 anim-fade-up" style={{ animationDelay: "800ms" }}>
        Est. Vadodara
      </div>
    </div>
  );
}
