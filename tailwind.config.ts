import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        cream: "#F8F1E5",
        beige: "#EADCC8",
        sky: "#0EA5E9",
        deep: "#0284C7",
      },
      boxShadow: {
        soft: "0 20px 55px -30px rgba(17, 24, 39, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
