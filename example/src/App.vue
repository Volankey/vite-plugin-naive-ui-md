<template>
  <n-config-provider :theme="themeObject">
    <n-layout position="absolute" :native-scrollbar="false">
      <n-layout-header
        :bordered="true"
        style="position: sticky; top: 0; z-index: 100"
      >
        <n-h1 style="text-align: center; margin: 0">
          vite-plugin-naive-ui-md
          <NTag
            @click="toggleTheme"
            style="cursor: pointer; vertical-align: middle; margin-left: 20px"
            >{{ themeRef }}</NTag
          ></n-h1
        >
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <NTabs type="segment">
          <NTabPane :name="'readme'" tab="README"><README /></NTabPane>
          <NTabPane :name="'test'" tab="TEST.md"><TEST /></NTabPane> </NTabs
      ></n-layout-content>
    </n-layout>
  </n-config-provider>
</template>

<script setup lang="ts">
import TEST from "./TEST.md";
import README from "./README.md";
import { computed, ref } from "vue";
import {
  NTabs,
  NTabPane,
  NH1,
  NConfigProvider,
  darkTheme,
  NTag,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
} from "naive-ui";
const themeRef = ref<"dark" | "light">("light");
const themeObject = computed(() =>
  themeRef.value === "light" ? undefined : darkTheme
);

function toggleTheme() {
  themeRef.value = themeRef.value === "light" ? "dark" : "light";
}
</script>
