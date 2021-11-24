# vite-plugin-naive-ui-md
Markdown for Vite with Naive UI Styles

### Install
```
npm install vite-plugin-naive-ui-md -D
```
### vite.config.ts
```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import naiveUIMD from 'vite-plugin-naive-ui-md'
import hljs from 'highlight.js'
// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    naiveUIMD({
      'hljs':hljs,
      'wrapCodeWithCard':true,
    })
  ]
})

```

### Import Markdown as Vue components
```
<template>
  <TEST/>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TEST from './TEST.md'

</script>
<style>
#app {
  padding: 40px;
}
</style>
```

# TODO
- [ ]  TOC