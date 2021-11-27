# vite-plugin-naive-ui-md

Markdown for Vite with [Naive UI](https://naiveui.com) Styles.

[Example](https://opensource-7gc3tmxla51046dd-1252721733.tcloudbaseapp.com/)

### Install

With NPM:

```ts
npm install vite-plugin-naive-ui-md -D
```

With Yarn:

```ts
yarn add vite-plugin-naive-ui-md -D
```

With PNPM:

```ts
pnpm install vite-plugin-naive-ui-md -D
```

### vite.config.ts

```ts
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
```

### Import Markdown as Vue components

```html
<template>
  <TEST />
</template>

<script setup lang="ts">
  import TEST from "./TEST.md";
</script>
<style>
  #app {
    padding: 40px;
  }
</style>
```

### TypeScript Shim

```ts
declare module "*.vue" {
  import { ComponentOptions } from "vue";
  const Component: ComponentOptions;
  export default Component;
}

declare module "*.md" {
  import { ComponentOptions } from "vue";
  const Component: ComponentOptions;
  export default Component;
}
```

# TODO

- [ ] Test
- [ ] TOC
