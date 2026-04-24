"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export default function Parallax({ children, speed = 0.2, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const node = ref.current;
        if (node) {
          const r = node.getBoundingClientRect();
          const center = r.top + r.height / 2 - window.innerHeight / 2;
          setOffset(-center * speed);
        }
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return (
    // Remove overflow:hidden here — let the parent clip instead
    <div ref={ref} className={className}>
      <div
        style={{
          transform: `translate3d(0, ${offset}px, 0)`,
          willChange: "transform",
          // Scale up slightly so edges don't show when shifted
          scale: "1.15",
          height: "100%",
          width: "100%",
          position: "absolute",
          inset: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
