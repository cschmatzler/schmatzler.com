const defaultTheme = require("tailwindcss/defaultTheme");
import { variants } from "@catppuccin/palette";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", ...defaultTheme.fontFamily.sans],
        mono: ["Fira Code", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        base: variants.latte.base.hex,
        text: variants.latte.text.hex,
        subtext: variants.latte.subtext0.hex,
        mantle: variants.latte.mantle.hex,
        crust: variants.latte.crust.hex,
        overlay: variants.latte.overlay0.hex,
        teal: variants.latte.teal.hex,
        rosewater: variants.latte.rosewater.hex,
        surface: variants.latte.surface0.hex,
        mauve: variants.latte.mauve.hex,
        pink: variants.latte.pink.hex,
        yellow: variants.latte.yellow.hex,
        sky: variants.latte.sky.hex,
        lavender: variants.latte.lavender.hex,
        green: variants.latte.green.hex,
        peach: variants.latte.peach.hex,
        maroon: variants.latte.maroon.hex,
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              "text-decoration-thickness": "1px",
              "font-weight": "600",
            },
            "code::before": {
              content: "",
            },
            "code::after": {
              content: "",
            },
            ":not(pre) > code": {
              "border-radius": "0.5rem",
              background: variants.latte.crust.hex,
              "padding-left": "6px",
              "padding-top": "2px",
              "padding-bottom": "2px",
              "padding-right": "6px",
            },
            pre: {
              border: "3px solid " + variants.latte.crust.hex,
            },
          },
        },
        catppuccin: {
          css: {
            "--tw-prose-body": variants.latte.subtext0.hex,
            "--tw-prose-headings": variants.latte.text.hex,
            "--tw-prose-links": variants.latte.text.hex,
            "--tw-prose-code": variants.latte.maroon.hex,
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
