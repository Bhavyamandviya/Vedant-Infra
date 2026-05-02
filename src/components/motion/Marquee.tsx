"use client";

import React, { useRef } from "react";

interface Props {
  items: React.ReactNode[];
  speed?: number;
  className?: string;
  gap?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
}

export default function Marquee({
  items,
  speed = 40,
  className = "",
  gap = "3rem",
  reverse = false,
  pauseOnHover = true,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!pauseOnHover || !trackRef.current) return;
    trackRef.current.style.animationPlayState = "paused";
  };

  const handleMouseLeave = () => {
    if (!pauseOnHover || !trackRef.current) return;
    trackRef.current.style.animationPlayState = "running";
  };

  return (
    <div className={`marquee ${className}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div
        ref={trackRef}
        className="marquee-track"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
          gap,
        }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee-group" style={{ gap }} aria-hidden={copy === 1}>
            {items.map((item, i) => (
              <div key={`${copy}-${i}`} className="marquee-item">{item}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}