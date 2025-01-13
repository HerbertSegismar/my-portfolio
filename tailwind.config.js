/** @type {import('tailwindcss').Config} */

import fluid, { screens, fontSize } from "fluid-tailwind";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens, // Tailwind's default screens, in `rem`
    fontSize, // Tailwind's default font sizes, in `rem` (including line heights)
    extend: {
      screens: {
        xs: "20rem",
      },
    },
  },
  plugins: [fluid],
};
