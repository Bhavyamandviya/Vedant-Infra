"use client";

import { useEffect, useState } from "react";

interface Testimonial {
  name: string;
  residence: string;
  quote: string;
}

export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 6500);
    return () => clearInterval(t);
  }, [items.length]);

  const cur = items[i];

  return (
    <div>
      <svg width="44" height="34" viewBox="0 0 34 26" fill="none" className="text-gold mb-10 mx-auto">
        <path d="M0 26V13.2C0 9 0.9 5.6 2.7 3.1C4.6 0.6 7.3 -0.6 10.7 0L11.6 3.4C9.9 3.6 8.6 4.2 7.7 5.2C6.9 6.2 6.4 7.7 6.4 9.6H12V26H0ZM22 26V13.2C22 9 22.9 5.6 24.7 3.1C26.6 0.6 29.3 -0.6 32.7 0L33.6 3.4C31.9 3.6 30.6 4.2 29.7 5.2C28.9 6.2 28.4 7.7 28.4 9.6H34V26H22Z" fill="currentColor"/>
      </svg>

      <div className="relative min-h-[200px]">
        <blockquote
          key={i}
          className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.3] text-center text-ink-primary max-w-4xl mx-auto anim-fade-up"
        >
          "{cur.quote}"
        </blockquote>
        <div className="mt-10 text-center anim-fade-up" style={{ animationDelay: "200ms" }} key={`meta-${i}`}>
          <div className="text-ink-primary text-lg">{cur.name}</div>
          <div className="eyebrow mt-2">Resident · {cur.residence}</div>
        </div>
      </div>

      <div className="mt-14 flex items-center justify-center gap-3">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Testimonial ${idx + 1}`}
            className="h-[2px] transition-all duration-500 bg-ink-primary/20 hover:bg-gold"
            style={{ width: idx === i ? 40 : 16, backgroundColor: idx === i ? "#db9d23" : undefined }}
          />
        ))}
      </div>
    </div>
  );
}
