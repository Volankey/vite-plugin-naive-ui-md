// Create reference instance
import { marked } from "marked";
import fs from "fs";
// regexp to match the import syntax ref:https://github.com/vuepress/vuepress-next/blob/98b7a57856c7b81a82291642e3cf7218699f3523/packages/%40vuepress/markdown/src/plugins/importCodePlugin/createImportCodeBlockRule.ts#L13
const SYNTAX_RE = /^@\[code(?:{(?:(\d+)?-(\d+)?)})?(?: ([^\]]+))?\]\(([^)]*)\)/;

export const importCodeBlocks = {
  name: "importCodeBlocks",
  level: "block", // Is this a block-level or inline-level tokenizer?
  start(src) {
    return src.match(SYNTAX_RE)?.index;
  }, // Hint to Marked.js to stop and check for a match
  tokenizer(src, tokens) {
    const match = src.match(SYNTAX_RE);
    if (match) {
      const filePath = match[4];
      const highlightMatch = match[3];
      const importStartLineNumber = +match[1] || 0;
      const fileContent = fs.readFileSync(filePath, "utf8");
      const textSplice = fileContent.split("\n");
      const importEndLineNumber = +match[2] || textSplice.length - 1;
      const text = textSplice
        .slice(
          importStartLineNumber,
          importEndLineNumber - importStartLineNumber + 1
        )
        .join("\n");
      const token = {
        // Token to generate
        type: "importCodeBlocks", // Should match "name" above
        raw: match[0], // Text to consume from the source
        text, // Additional custom properties
        tokens: [], // Array where child inline tokens will be generated
      };
      this.lexer.inline(token.text, token.tokens); // Queue this data to be processed for inline tokens
      return token;
    }
  },
  renderer(token) {
    console.log(`\`\`\`${this.parser.parseInline(token.tokens)}\`\`\``);
    return `\`\`\`${this.parser.parseInline(token.tokens)}\`\`\``; // parseInline to turn child tokens into HTML
  },
};
