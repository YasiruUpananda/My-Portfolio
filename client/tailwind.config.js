/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        hud: {
          bg: "#0a0e17",
          panel: "#0d1321",
          cyan: "#00f2ff",
          yellow: "#ffcc00",
          muted: "#6b7a99",
        },
      },
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Rajdhani", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 15px rgba(0, 242, 255, 0.35)",
        "glow-yellow": "0 0 12px rgba(255, 204, 0, 0.4)",
      },
      animation: {
        "border-pulse": "border-pulse 3s ease-in-out infinite",
      },
      keyframes: {
        "border-pulse": {
          "0%, 100%": { borderColor: "rgba(0, 242, 255, 0.4)" },
          "50%": { borderColor: "rgba(0, 242, 255, 0.8)" },
        },
      },
    },
  },
  plugins: [],
};
