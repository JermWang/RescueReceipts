import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Park identity — matches public/redesign/RescueReceipts Park.dc.html
        cream: {
          50: "#FDFEFD",
          100: "#F4FBF6",
          200: "#EAF9EE",
        },
        warm: {
          orange: "#F07856",
          orangeDark: "#D95F3D",
        },
        soft: {
          green: "#7FD99A",
          greenDark: "#3FA868",
          greenPale: "#CFF3DA",
        },
        gold: {
          DEFAULT: "#FFC857",
          soft: "#FFE9B8",
          deep: "#8A5E12",
        },
        sol: {
          purple: "#7C3AED",
          green: "#14F195",
        },
        ink: {
          DEFAULT: "#1F3038",
          soft: "#4A6470",
          mid: "#33505C",
        },
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-baloo)", "ui-rounded", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      backgroundImage: {
        paper:
          "radial-gradient(at top left, rgba(127,217,154,0.16), transparent 45%), radial-gradient(at bottom right, rgba(124,58,237,0.07), transparent 50%), linear-gradient(180deg, #FDFEFD 0%, #F4FBF6 60%, #EAF9EE 100%)",
      },
      boxShadow: {
        receipt: "0 1px 0 rgba(31,48,56,0.05), 0 14px 30px -14px rgba(31,48,56,0.22)",
        soft: "0 10px 26px -12px rgba(31,48,56,0.22)",
        pop: "0 3px 0 #1F3038",
        popSm: "0 2px 0 #1F3038",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        stamp: {
          "0%": { transform: "scale(1.5) rotate(-14deg)", opacity: "0" },
          "60%": { transform: "scale(0.94) rotate(-7deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(-6deg)", opacity: "1" },
        },
        bobble: {
          "0%,100%": { transform: "translateY(0) rotate(-1.5deg)" },
          "50%": { transform: "translateY(-5px) rotate(1.5deg)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        stamp: "stamp 600ms ease-out both",
        bobble: "bobble 4.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
