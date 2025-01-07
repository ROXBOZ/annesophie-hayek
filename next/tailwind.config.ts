import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fdf5f3",
          100: "#fbe8e5",
          200: "#f8d6d0",
          300: "#f2b9af",
          400: "#e89181",

          500: "#db6c58",
          600: "#c34d38",
          700: "#a7402e",
          800: "#8a392a",
          900: "#743328",
          950: "#3e1811",
        },

        secondary: {
          50: "#f9f7f7",
          100: "#f2eeee",
          200: "#e8e0e0",
          300: "#d7cacb",
          400: "#beabac",
          500: "#a68d8e",
          600: "#8f7576",
          700: "#765f60",
          800: "#635152",
          900: "#554748",
          950: "#2c2323",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
