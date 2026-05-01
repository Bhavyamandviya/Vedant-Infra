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
  const [open, setOpen] = useState(false);
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
      // forest is the default in :root — clear the attribute
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", id);
    }
  }

  function pick(id: ThemeId) {
    setActive(id);
    apply(id);
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  }

  if (!mounted) return null;

  const current = THEMES.find((t) => t.id === active) ?? THEMES[0];

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col-reverse items-end gap-3 print:hidden">
      {/* The button — always visible */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change theme"
        className="group flex items-center gap-3 px-4 py-3 backdrop-blur transition-all"
        style={{
          background: "rgba(0,0,0,0.75)",
          border: `1px solid ${current.accent}`,
          color: current.accentSoft,
        }}
      >
        {/* Tiny three-dot palette swatch preview */}
        <span className="flex items-center gap-1">
          <span
            className="block w-2.5 h-2.5"
            style={{ background: current.bg, border: `1px solid ${current.accent}` }}
          />
          <span
            className="block w-2.5 h-2.5"
            style={{ background: current.accent }}
          />
          <span
            className="block w-2.5 h-2.5"
            style={{ background: current.accentSoft }}
          />
        </span>
        <span className="text-[10px] tracking-[0.28em] uppercase font-medium">
          {current.name}
        </span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={[
            "transition-transform",
            open ? "rotate-180" : "rotate-0",
          ].join(" ")}
        >
          <path d="M3 4.5l3 3 3-3" strokeLinecap="round" />
        </svg>
      </button>

      {/* Panel — expanded list of all four options */}
      {open && (
        <div
          className="w-[260px] backdrop-blur shadow-2xl"
          style={{
            background: "rgba(0,0,0,0.85)",
            border: `1px solid ${current.accent}`,
            animation: "fade-up 240ms ease-out both",
          }}
        >
          <div
            className="px-4 py-3 text-[9px] tracking-[0.32em] uppercase border-b"
            style={{
              color: current.accent,
              borderColor: `${current.accent}40`,
            }}
          >
            Choose Palette
          </div>
          <ul>
            {THEMES.map((t) => {
              const selected = t.id === active;
              return (
                <li key={t.id}>
                  <button
                    onClick={() => pick(t.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
                    style={{
                      background: selected
                        ? `${t.accent}1a`
                        : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${t.accent}26`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = selected
                        ? `${t.accent}1a`
                        : "transparent";
                    }}
                  >
                    {/* Swatch */}
                    <span
                      className="flex items-stretch border shrink-0"
                      style={{
                        borderColor: `${t.accent}80`,
                        width: "44px",
                        height: "26px",
                      }}
                    >
                      <span
                        style={{ background: t.bg, flex: 1 }}
                      />
                      <span
                        style={{ background: t.accent, flex: 1 }}
                      />
                      <span
                        style={{ background: t.accentSoft, flex: 1 }}
                      />
                      <span
                        style={{ background: t.text, flex: 1 }}
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className="block text-[12px] font-serif leading-tight"
                        style={{ color: t.text }}
                      >
                        {t.name}
                      </span>
                      <span
                        className="block text-[9px] tracking-[0.22em] uppercase mt-0.5"
                        style={{ color: t.accent }}
                      >
                        {t.subtitle}
                      </span>
                    </span>
                    {selected && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke={t.accent}
                        strokeWidth="2"
                        className="shrink-0"
                      >
                        <path
                          d="M2 7.5l3 3 7-7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
          <div
            className="px-4 py-2.5 text-[8px] tracking-[0.28em] uppercase border-t text-center"
            style={{
              color: `${current.text}80`,
              borderColor: `${current.accent}40`,
            }}
          >
            Saved to this browser
          </div>
        </div>
      )}
    </div>
  );
}
