import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import catppuccinLatte from "./src/shiki/catppuccin-latte";

export default defineConfig({
	site: "https://schmatzler.com",
	integrations: [sitemap(), mdx()],
	vite: { plugins: [tailwindcss()] },
	devToolbar: {
		enabled: false,
	},
	markdown: {
		shikiConfig: {
			theme: catppuccinLatte,
		},
	},
});
