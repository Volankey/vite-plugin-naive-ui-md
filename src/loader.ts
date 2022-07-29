import { createRenderer } from "./createMdRender";
import { marked } from "marked";
import { Options } from "./interface";

export async function convertMd2VueTemplateSource(
  text: string,
  filepath?: string,
  options?: Options
) {
  const naiveComponentsDeps: Set<string> = new Set();
  marked.use({
    renderer: createRenderer(naiveComponentsDeps, options),
    gfm: true,
  });
  options?.markedSetup?.(marked, {
    filepath,
  });
  const md2VueTemplateSource = marked.parse(text);
  const sfc = `<template><div>${md2VueTemplateSource}</div></template>\n<script setup>import {${Array.from(
    naiveComponentsDeps
  ).join(",")}} from 'naive-ui'</script>`;
  return sfc;
}
