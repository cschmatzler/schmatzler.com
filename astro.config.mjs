import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import markdoc from "@astrojs/markdoc";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
	site: "https://medium.place",
	integrations: [tailwind(), markdoc(), sitemap()],
});
