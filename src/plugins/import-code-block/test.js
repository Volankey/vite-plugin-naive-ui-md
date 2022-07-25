const { marked } = require("marked");
const fs = require("fs");
const SYNTAX_RE = /^@\[code(?:{(?:(\d+)?-(\d+)?)})?(?: ([^\]]+))?\]\(([^)]*)\)/;

const importCodeBlocks = {
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
      const text =
        "```" +
        textSplice
          .slice(
            importStartLineNumber,
            importEndLineNumber - importStartLineNumber + 1
          )
          .join("\n") +
        "```";
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
  walkTokens,
  renderer(token) {
    return `${this.parser.parseInline(token.tokens)}`; // parseInline to turn child tokens into HTML
  },
};
function walkTokens(token) {
  console.log(token);
  if (token.type === "code") {
    token.tokens = this.Lexer.lexInline(token.text);
  }
}
marked.use({
  extensions: [importCodeBlocks],
  walkTokens,
});
fs.writeFileSync(
  "./1.html",
  marked.parse(fs.readFileSync("./test.md", "utf8")),
  "utf8"
);
