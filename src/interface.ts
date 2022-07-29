import { HLJSApi } from "highlight.js";
export interface Context {
  filepath?: string;
}

export interface Options {
  hljs?: HLJSApi;
  wrapCodeWithCard?: boolean;
  markedSetup?: (marked: any, ctx: Context) => void;
}
