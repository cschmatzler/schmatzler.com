import { defineMarkdocConfig, component } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";
import catppuccinLatte from "./src/shiki/catppuccin-latte.ts";

export default defineMarkdocConfig({
  extends: [
    shiki({
      theme: catppuccinLatte,
    }),
  ],
});
