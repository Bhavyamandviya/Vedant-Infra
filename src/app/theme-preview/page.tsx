/* eslint-disable react/no-unknown-property */
import Link from "next/link";

export const dynamic = "force-static";

/**
 * Three rich, royal palette options.
 * Each card shows the surface, accent, button, and a small preview
 * card so the difference between them is obvious.
 */
const THEMES = [
  {
    id: "wine",
    name: "Wine Cellar",
    subtitle: "Deep Burgundy + Champagne Gold",
    feel:
      "Old-world opulence — feels like a private wine cellar or jewel box. Warm, intimate, sensual.",
    page: "#1a0d12",
    elev: "#2a1820",
    line: "#3a2630",
    accent: "#d4a958",
    accentSoft: "#e8c878",
    text: "#f7eedc",
    textSecondary: "#c9b9a4",
    textMuted: "#8a7a68",
  },
  {
    id: "navy",
    name: "Palace Navy",
    subtitle: "Midnight Navy + Antique Brass",
    feel:
      "Diplomatic and palatial. Cooler, more formal — the colour of state rooms, embassy halls and old libraries.",
    page: "#0a1228",
    elev: "#141d3a",
    line: "#1f2a4a",
    accent: "#b8924a",
    accentSoft: "#d4af6f",
    text: "#ede5d3",
    textSecondary: "#b8b0a0",
    textMuted: "#6f6a5e",
  },
  {
    id: "forest",
    name: "Heritage Forest",
    subtitle: "Deep Forest + Old Gold",
    feel:
      "English manor / heritage library. Earthy and confident — leather-bound, generations-old, considered.",
    page: "#0e1a14",
    elev: "#172823",
    line: "#243530",
    accent: "#c8a249",
    accentSoft: "#e0c47e",
    text: "#f1ead4",
    textSecondary: "#b8b09a",
    textMuted: "#7a7568",
  },
];

export default function ThemePreview() {
  return (
    <main className="min-h-screen bg-[#0a0805] text-[#f5f1ea] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-[10px] tracking-[0.32em] uppercase text-[#db9d23] mb-4">
            Internal Preview · Pick a Direction
          </div>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-4">
            Three royal palettes for{" "}
            <em className="not-italic" style={{ color: "#db9d23" }}>
              Vedant Infra
            </em>
            .
          </h1>
          <p className="text-[#b8b0a4] max-w-2xl mx-auto leading-relaxed">
            Three options that feel rich without resorting to the standard
            black + gold. Compare the warmth and tone of each — pick whichever
            best matches the brand.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {THEMES.map((t, idx) => (
            <div
              key={t.id}
              className="rounded-none overflow-hidden border"
              style={{ background: t.page, borderColor: t.line }}
            >
              {/* Header */}
              <div
                className="px-7 py-6 border-b flex items-center justify-between"
                style={{ borderColor: t.line }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-2xl font-serif leading-none"
                    style={{ color: t.accent }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="block w-8 h-px"
                    style={{ background: t.accent }}
                  />
                  <span
                    className="text-[10px] tracking-[0.30em] uppercase"
                    style={{ color: t.textSecondary }}
                  >
                    Option {String.fromCharCode(64 + idx + 1)}
                  </span>
                </div>
              </div>

              {/* Sample hero */}
              <div className="px-7 py-10" style={{ background: t.page }}>
                <div
                  className="text-[10px] tracking-[0.32em] uppercase mb-4"
                  style={{ color: t.accent }}
                >
                  Vedant Infra · Vadodara
                </div>
                <h2
                  className="font-serif text-3xl leading-tight mb-4"
                  style={{ color: t.text }}
                >
                  {t.name}
                </h2>
                <div
                  className="text-[11px] tracking-[0.18em] uppercase mb-6"
                  style={{ color: t.textSecondary }}
                >
                  {t.subtitle}
                </div>

                {/* Sample card */}
                <div
                  className="border p-5 mb-6"
                  style={{ background: t.elev, borderColor: t.line }}
                >
                  <div
                    className="font-serif text-3xl leading-none mb-2"
                    style={{ color: t.accent }}
                  >
                    150+
                  </div>
                  <div
                    className="text-[10px] tracking-[0.28em] uppercase"
                    style={{ color: t.textSecondary }}
                  >
                    Residences delivered
                  </div>
                </div>

                {/* Sample buttons */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span
                    className="inline-flex items-center justify-center px-5 py-3 text-[10px] tracking-[0.18em] uppercase font-medium"
                    style={{ background: t.accent, color: t.page }}
                  >
                    Book Appointment
                  </span>
                  <span
                    className="inline-flex items-center justify-center px-5 py-3 text-[10px] tracking-[0.18em] uppercase font-medium border"
                    style={{ borderColor: t.accent, color: t.accentSoft }}
                  >
                    View Projects
                  </span>
                </div>

                {/* Booking pill */}
                <div className="mb-6">
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-[9px] tracking-[0.28em] uppercase border"
                    style={{
                      background: `${t.accent}1f`,
                      borderColor: `${t.accent}80`,
                      color: t.accentSoft,
                    }}
                  >
                    <span
                      className="block w-1.5 h-1.5 rounded-full"
                      style={{ background: t.accent }}
                    />
                    Booking Open
                  </span>
                </div>

                {/* Body copy */}
                <p
                  className="text-sm leading-relaxed mb-2"
                  style={{ color: t.text }}
                >
                  {t.feel}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: t.textMuted }}
                >
                  Royalty experienced not only in palaces, but in homes.
                </p>
              </div>

              {/* Swatch row */}
              <div
                className="px-7 py-5 border-t"
                style={{ borderColor: t.line, background: t.elev }}
              >
                <div
                  className="text-[10px] tracking-[0.28em] uppercase mb-3"
                  style={{ color: t.textSecondary }}
                >
                  Palette
                </div>
                <div className="grid grid-cols-5 gap-1">
                  {[t.page, t.elev, t.accent, t.accentSoft, t.text].map(
                    (c, i) => (
                      <div
                        key={i}
                        className="aspect-square border"
                        style={{
                          background: c,
                          borderColor: t.line,
                        }}
                        title={c}
                      />
                    )
                  )}
                </div>
                <div className="mt-3 grid grid-cols-5 gap-1 text-[8px] tracking-wider text-center font-mono">
                  {[t.page, t.elev, t.accent, t.accentSoft, t.text].map(
                    (c, i) => (
                      <div key={i} style={{ color: t.textMuted }}>
                        {c}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/home-designs"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase text-[#db9d23] hover:text-white transition-colors"
          >
            ← Back to home design options
          </Link>
          <div className="mt-6 text-sm text-[#b8b0a4] max-w-xl mx-auto leading-relaxed">
            Tell me which one feels right —{" "}
            <span className="text-[#db9d23]">Wine Cellar</span>,{" "}
            <span className="text-[#db9d23]">Palace Navy</span>, or{" "}
            <span className="text-[#db9d23]">Heritage Forest</span> — and I'll
            replace the current black + gold with that palette across the whole
            site.
          </div>
        </div>
      </div>
    </main>
  );
}
