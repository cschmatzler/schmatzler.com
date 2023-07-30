const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        base: "#eff1f5",
        text: "#4c4f69",
        mantle: "#e6e9ef",
        mauve: "#8839ef",
        pink: "#ea76cb",
        yellow: "#df8e1d",
        subtext: "#6c6f85",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
