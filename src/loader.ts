import { createRenderer } from "./createMdRender";
import { Parser, Lexer } from "marked";
import { Options } from "./interface";

export async function convertMd2VueTemplateSource(
  text: string,
  options?: Options
) {
  const naiveComponentsDeps: Set<string> = new Set();
  const parser = new Parser({
    gfm: true,
    renderer: createRenderer(naiveComponentsDeps, options),
  });
  const lexer = new Lexer();

  const tokens = lexer.lex(text);
  const md2VueTemplateSource = parser.parse(tokens);
  const sfc = `<template><div>${md2VueTemplateSource}</div></template>\n<script setup>import {${Array.from(
    naiveComponentsDeps
  ).join(",")}} from 'naive-ui'</script>`;
  return sfc;
}
