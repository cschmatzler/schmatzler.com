/* eslint-disable turbo/no-undeclared-env-vars */
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import markdoc from "@astrojs/markdoc";

export default defineConfig({
  site: "https://schmatzler.dev",
  integrations: [sitemap(), tailwind(), markdoc()],
});
