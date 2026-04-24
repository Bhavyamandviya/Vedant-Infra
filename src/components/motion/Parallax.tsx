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
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <div
        style={{
          transform: `translate3d(0, ${offset}px, 0)`,
          willChange: "transform"
        }}
      >
        {children}
      </div>
    </div>
  );
}
