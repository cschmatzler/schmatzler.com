import { defineMarkdocConfig, component } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";
import catppuccinLatte from "./catppuccin-latte.ts";

export default defineMarkdocConfig({
  extends: [
    shiki({
      theme: catppuccinLatte,
    }),
  ],
});
