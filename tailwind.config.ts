import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import { flavors } from "@catppuccin/palette";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Manrope", ...defaultTheme.fontFamily.sans],
				mono: ["Fira Code", ...defaultTheme.fontFamily.mono],
			},
			typography: () => ({
				DEFAULT: {
					css: {
						a: {
							"text-decoration-thickness": "1px",
							"font-weight": "600",
						},
						code: {
							"font-weight": "400",
						},
						"code::before": {
							content: "",
						},
						"code::after": {
							content: "",
						},
						":not(pre) > code": {
							"border-radius": "0.5rem",
							background: flavors.latte.colors.crust.hex,
							"padding-left": "6px",
							"padding-top": "2px",
							"padding-bottom": "2px",
							"padding-right": "6px",
						},
						pre: {
							border: `4px solid ${flavors.latte.colors.crust.hex}`,
							"border-radius": "0.5rem",
						},
					},
				},
				lg: {
					css: {
						pre: {
							"border-radius": "0.5rem",
						},
					},
				},
				catppuccin: {
					css: {
						"--tw-prose-body": flavors.latte.colors.subtext0.hex,
						"--tw-prose-headings": flavors.latte.colors.text.hex,
						"--tw-prose-links": flavors.latte.colors.text.hex,
					},
				},
			}),
		},
	},
	plugins: [
		require("@catppuccin/tailwindcss")({ defaultFlavor: "latte" }),
		require("@tailwindcss/typography"),
	],
} satisfies Config;
