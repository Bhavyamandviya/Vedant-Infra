import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#f9f9f9",
        gold: "#db9d23",
        footer: "#795532",
        ink: {
          primary: "#1a1a1a",
          secondary: "#374151",
          muted: "#6b7280"
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
