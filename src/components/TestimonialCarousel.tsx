"use client";

import Reveal from "@/components/motion/Reveal";

interface Testimonial {
  name: string;
  residence: string;
  quote: string;
}

export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((cur, i) => (
        <Reveal key={i} delay={i * 100} direction="up" className="bg-bg-elev border border-gold/15 p-8 md:p-10 rounded-2xl flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex gap-1.5 mb-6 text-gold">
              {[...Array(5)].map((_, idx) => (
                <svg key={idx} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <blockquote className="font-serif text-xl md:text-2xl leading-[1.4] text-ink-primary mb-8">
              "{cur.quote}"
            </blockquote>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold font-serif text-xl shrink-0">
              {cur.name.charAt(0)}
            </div>
            <div>
              <div className="text-ink-primary font-medium">{cur.name}</div>
              <div className="text-sm text-ink-secondary mt-0.5">Resident · {cur.residence}</div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
