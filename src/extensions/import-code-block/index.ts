import path from "path";
import fs from "fs";
import type { marked } from "marked";
// regexp to match the import syntax ref:https://github.com/vuepress/vuepress-next/blob/98b7a57856c7b81a82291642e3cf7218699f3523/packages/%40vuepress/markdown/src/plugins/importCodePlugin/createImportCodeBlockRule.ts#L13
const SYNTAX_RE = /^@\[code(?:{(?:(\d+)?-(\d+)?)})?(?: ([^\]]+))?\]\(([^)]*)\)/;

export function createCodeBlockRule(filepath?: string) {
  const cmd = filepath ? path.join(filepath, "../") : "";
  const importCodeBlocks = {
    name: "importCodeBlocks",
    level: "block", // Is this a block-level or inline-level tokenizer?
    start(src: string) {
      return src.match(SYNTAX_RE)?.index;
    }, // Hint to Marked.js to stop and check for a match
    tokenizer(this: marked.TokenizerThis, src: string, tokens: []) {
      const match = src.match(SYNTAX_RE);
      if (match) {
        const filePath = match[4];
        const importStartLineNumber = match[1] ? +match[1] : 1;
        const fileContent = fs.readFileSync(path.join(cmd, filePath), "utf8");
        const textSplice = fileContent.split("\n");
        const importEndLineNumber = match[2] ? +match[2] : textSplice.length;
        const highlightMatch = match[3] || "";

        const text =
          `\`\`\`${highlightMatch}\n` +
          textSplice
            .slice(importStartLineNumber - 1, importEndLineNumber)
            .join("\n") +
          "\n```";
        const token = {
          // Token to generate
          type: "importCodeBlocks", // Should match "name" above
          raw: match[0], // Text to consume from the source
          text, // Additional custom properties
          tokens: [], // Array where child inline tokens will be generated
        };
        this.lexer.blockTokens(token.text, token.tokens); // Queue this data to be processed for inline tokens
        return token;
      }
    },
    renderer(this: marked.RendererThis, token: any) {
      return `${this.parser.parse(token.tokens)}`; // parseInline to turn child tokens into HTML
    },
  };
  return importCodeBlocks;
}
