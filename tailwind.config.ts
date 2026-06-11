import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fdfbf5",
          100: "#f8f1e2",
          200: "#f0e3c4",
        },
        warm: {
          orange: "#f97a3d",
          orangeDark: "#e15a1f",
        },
        soft: {
          green: "#7fb685",
          greenDark: "#4f8a5b",
        },
        sol: {
          purple: "#9945ff",
          green: "#14f195",
        },
        ink: {
          DEFAULT: "#2a221c",
          soft: "#5a4a3d",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Inter", "sans-serif"],
        display: ['"Fraunces"', "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      backgroundImage: {
        "paper": "radial-gradient(at top left, rgba(249,122,61,0.08), transparent 40%), radial-gradient(at bottom right, rgba(153,69,255,0.08), transparent 50%), linear-gradient(180deg, #fdfbf5 0%, #f8f1e2 100%)",
      },
      boxShadow: {
        receipt: "0 1px 0 rgba(0,0,0,0.04), 0 12px 28px -12px rgba(80,55,30,0.25)",
        soft: "0 8px 24px -10px rgba(80,55,30,0.20)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        stamp: {
          "0%": { transform: "scale(1.4) rotate(-12deg)", opacity: "0" },
          "60%": { transform: "scale(0.95) rotate(-8deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(-6deg)", opacity: "1" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        stamp: "stamp 600ms ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
