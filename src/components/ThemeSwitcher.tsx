"use client";

import { useEffect, useState } from "react";

/**
 * Floating theme switcher.
 *
 * Click the swatch button to expand a panel showing all four palette
 * options. Selecting one writes `data-theme="…"` onto <html> and the
 * whole site re-paints (the colour tokens in tailwind.config.ts and
 * globals.css are bound to CSS variables defined per theme).
 *
 * Selection is persisted in localStorage so it survives reloads.
 */
// Default is "forest" (no data-theme attribute set on <html>).
type ThemeId = "forest" | "marble";

interface Theme {
  id: ThemeId;
  name: string;
  subtitle: string;
  bg: string;
  accent: string;
  accentSoft: string;
  text: string;
}

const THEMES: Theme[] = [
  {
    id: "forest",
    name: "Heritage Forest",
    subtitle: "Forest + Old Gold",
    bg: "#0e1a14",
    accent: "#c8a249",
    accentSoft: "#e0c47e",
    text: "#f1ead4",
  },
  {
    id: "marble",
    name: "Pearl Marble",
    subtitle: "Marble + Antique Brass",
    bg: "#ebe3d3",
    accent: "#8c6a3f",
    accentSoft: "#b89968",
    text: "#2a2014",
  },
];

const STORAGE_KEY = "vi-theme";

export default function ThemeSwitcher() {
  const [active, setActive] = useState<ThemeId>("forest");
  const [mounted, setMounted] = useState(false);

  // Read persisted theme on mount
  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? (window.localStorage.getItem(STORAGE_KEY) as ThemeId | null)
        : null;
    if (stored && THEMES.some((t) => t.id === stored)) {
      setActive(stored);
      apply(stored);
    } else {
      apply("forest");
    }
    setMounted(true);
  }, []);

  function apply(id: ThemeId) {
    if (typeof document === "undefined") return;
    if (id === "forest") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", id);
    }
  }

  function toggle() {
    const nextId = active === "forest" ? "marble" : "forest";
    setActive(nextId);
    apply(nextId);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextId);
    } catch {
      /* ignore */
    }
  }

  if (!mounted) return null;

  const current = THEMES.find((t) => t.id === active) ?? THEMES[0];

  return (
    <div className="fixed bottom-6 right-24 z-[60] print:hidden">
      <button
        onClick={toggle}
        aria-label="Toggle dark/light mode"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border transition duration-200 ease-out hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        style={{
          borderColor: current.accent,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(10px)",
        }}
      >
        {active === "forest" ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" style={{ color: current.accent }}>
            <path d="M12 3v1m6.364 1.636l-.707-.707M21 12h-1m-1.636 6.364l-.707.707M12 20v1m-6.364-1.636l-.707.707M3 12h1m1.636-6.364l-.707-.707M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" style={{ color: current.accent }}>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </div>
  );
}
