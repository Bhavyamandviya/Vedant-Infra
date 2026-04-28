import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // All theme tokens are driven by CSS variables — see :root and the
        // [data-theme="…"] blocks in globals.css. Switching the theme just
        // sets data-theme on <html> and the whole site re-paints.
        bg: "var(--c-bg)",
        "bg-elev": "var(--c-bg-elev)",
        "bg-line": "var(--c-bg-line)",
        gold: "var(--c-accent)",
        "gold-soft": "var(--c-accent-soft)",
        footer: "var(--c-bg)",
        ink: {
          primary: "var(--c-text)",
          secondary: "var(--c-text-secondary)",
          muted: "var(--c-text-muted)"
        }
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "'Playfair Display'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"]
      },
      letterSpacing: {
        "vl": "0.18em"
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.25rem",
          md: "2rem",
          lg: "3rem"
        }
      }
    }
  },
  plugins: []
};

export default config;
