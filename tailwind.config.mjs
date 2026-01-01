/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        waves: "url('/assets/waves1.webp')"
      },
      colors: {
        background: "#0C0F19",
        "blue-brand": '#4BBAEA',
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
