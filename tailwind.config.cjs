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
        subtext: "#6c6f85",
        mantle: "#e6e9ef",
        crust: "#dce0e8",
        overlay: "#8c8fa1",
        teal: "#179299",
        rosewater: "#dc8a78",
        surface: "#acb0be",
        mauve: "#8839ef",
        pink: "#ea76cb",
        yellow: "#df8e1d",
        sky: "#04a5e5",
        lavender: "#7287fd",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
