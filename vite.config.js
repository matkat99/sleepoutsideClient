import { resolve } from "path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  root: "src/",
  plugins: [svelte()],
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve("src/index.html"),
        cart: resolve("src/cart/index.html"),
        checkout: resolve("src/checkout/index.html"),
        product1: resolve("src/product_pages/index.html"),
        profile: resolve("src/profile/index.html"),
      },
    },
  },
});
