import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import catppuccinLatte from "./src/shiki/catppuccin-latte";

// https://astro.build/config
export default defineConfig({
  site: "https://medium.place",
  integrations: [tailwind(), sitemap(), mdx()],
  devToolbar: {
    enabled: false,
  },
  markdown: {
    shikiConfig: {
      theme: catppuccinLatte,
    },
  },
});
