import { component, defineMarkdocConfig } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";
import catppuccinLatte from "./src/shiki/catppuccin-latte.ts";

export default defineMarkdocConfig({
	tags: {
		admonition: {
			render: component("./src/components/Admonition.astro"),
			attributes: {
				title: { type: String },
			},
		},
	},
	extends: [
		shiki({
			theme: catppuccinLatte,
		}),
	],
});
