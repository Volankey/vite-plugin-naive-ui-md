import { createRenderer } from "./createMdRender";
import { Parser, Lexer, marked } from "marked";
import { Options } from "./interface";
import { importCodeBlocks } from "./plugins/import-code-block/tokenizer";

marked.use(importCodeBlocks);

export async function convertMd2VueTemplateSource(
  text: string,
  options?: Options
) {
  const naiveComponentsDeps: Set<string> = new Set();
  marked.parser.renderer = createRenderer(naiveComponentsDeps, options);
  marked.parser.gfm = true;
  const parser = marked.parser;
  const lexer = new Lexer();

  const tokens = lexer.lex(text);
  const md2VueTemplateSource = parser.parse(tokens);
  const sfc = `<template><div>${md2VueTemplateSource}</div></template>\n<script setup>import {${Array.from(
    naiveComponentsDeps
  ).join(",")}} from 'naive-ui'</script>`;
  return sfc;
}
