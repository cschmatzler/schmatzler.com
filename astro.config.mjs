/* eslint-disable turbo/no-undeclared-env-vars */
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import markdoc from "@astrojs/markdoc";

export default defineConfig({
  site: "https://medium.place",
  integrations: [tailwind(), markdoc()],
});
