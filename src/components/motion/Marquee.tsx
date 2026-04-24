"use client";

import React from "react";

interface Props {
  items: React.ReactNode[];
  speed?: number; // seconds for a full cycle
  className?: string;
  gap?: string;
  reverse?: boolean;
}

export default function Marquee({
  items,
  speed = 40,
  className = "",
  gap = "3rem",
  reverse = false
}: Props) {
  return (
    <div className={`marquee ${className}`}>
      <div
        className="marquee-track"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
          gap
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
