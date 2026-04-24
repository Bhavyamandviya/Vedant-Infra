"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "up" | "down" | "left" | "right" | "fade" | "scale";

interface Props {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  as?: "div" | "section" | "span" | "li" | "article" | "figure";
}

const TRANSFORMS: Record<Direction, { from: string; to: string }> = {
  up:    { from: "translate3d(0, 40px, 0)",  to: "translate3d(0, 0, 0)" },
  down:  { from: "translate3d(0, -40px, 0)", to: "translate3d(0, 0, 0)" },
  left:  { from: "translate3d(-40px, 0, 0)", to: "translate3d(0, 0, 0)" },
  right: { from: "translate3d(40px, 0, 0)",  to: "translate3d(0, 0, 0)" },
  fade:  { from: "translate3d(0, 0, 0)",     to: "translate3d(0, 0, 0)" },
  scale: { from: "scale(0.94)",              to: "scale(1)" }
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 900,
  once = true,
  className = "",
  as: Tag = "div"
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [once]);

  const t = TRANSFORMS[direction];
  const style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? t.to : t.from,
    transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
    willChange: "opacity, transform"
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp: any = Tag;
  return (
    <Comp ref={ref} style={style} className={className}>
      {children}
    </Comp>
  );
}
