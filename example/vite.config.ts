import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import naiveUIMD from "vite-plugin-naive-ui-md";
import hljs from "highlight.js";
// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    naiveUIMD({
      hljs: hljs,
      wrapCodeWithCard: true,
    }),
  ],
});
