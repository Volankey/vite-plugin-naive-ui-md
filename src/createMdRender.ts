import { Options } from "./interface";
import { Renderer } from "marked";
import { escapeHtml } from "./utils";

export function createRenderer(
  naiveComponentsDeps: Set<string>,
  options?: Options
) {
  const renderer = new Renderer();
  const overrides: Partial<Renderer> = {
    table(header, body) {
      naiveComponentsDeps.add("NTable");
      if (body) body = "<tbody>" + body + "</tbody>";
      return (
        '<div class="md-table-wrapper"><n-table single-column class="md-table">\n' +
        "<thead>\n" +
        header +
        "</thead>\n" +
        body +
        "</n-table>\n" +
        "</div>"
      );
    },
    tablerow(content) {
      return "<tr>\n" + content + "</tr>\n";
    },

    tablecell(content, flags) {
      const type = flags.header ? "th" : "td";
      const tag = flags.align
        ? "<" + type + ' align="' + flags.align + '">'
        : "<" + type + ">";
      return tag + content + "</" + type + ">\n";
    },

    code: (code, language = "html") => {
      const hljs = options?.hljs;
      const isLanguageValid = !!(
        hljs &&
        language &&
        hljs.getLanguage(language)
      );
      const pureCode = escapeHtml(code);
      const highlighted = isLanguageValid
        ? hljs.highlight(code, { language }).value
        : pureCode;
      const content = `<n-code><pre  v-pre>${highlighted}</pre></n-code>`;
      naiveComponentsDeps.add("NCode");

      if (options?.wrapCodeWithCard) {
        naiveComponentsDeps.add("NCard");
        naiveComponentsDeps.add("NScrollbar");
      }
      return options?.wrapCodeWithCard
        ? `<n-card size="small" class="md-card" content-style="padding: 0;">
            <n-scrollbar x-scrollable content-style="padding: 12px; 16px;">
              ${content}
            </n-scrollbar>
          </n-card>`
        : content;
    },
    heading: (text, level) => {
      const id = text.replace(/ /g, "-");
      naiveComponentsDeps.add("NH" + level);
      return `<n-h${level} id="${id}">${text}</n-h${level}>`;
    },
    blockquote: (quote) => {
      naiveComponentsDeps.add("NBlockquote");
      return `<n-blockquote>${quote}</n-blockquote>`;
    },
    hr: () => {
      naiveComponentsDeps.add("NHr");

      return "<n-hr />";
    },
    paragraph: (text) => {
      naiveComponentsDeps.add("NP");

      return `<n-p>${text}</n-p>`;
    },
    link(href, _, text) {
      if (href && /^(http:|https:)/.test(href)) {
        naiveComponentsDeps.add("NA");

        return `<n-a href="${href}" title="${text}" target="_blank">${text}</n-a>`;
      }
      return `<router-link to="${href}" title="${text}" #="{ navigate, href }" custom><n-a :href="href" @click="navigate">${text}</n-a></router-link>`;
    },
    list(body, ordered, start) {
      naiveComponentsDeps.add("NOl");
      naiveComponentsDeps.add("NUl");
      const type = ordered ? "n-ol" : "n-ul";
      const startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
      return `<${type}${startatt}>\n` + body + `</${type}>\n`;
    },
    listitem(text) {
      naiveComponentsDeps.add("NLi");
      return `<n-li>${text}</n-li>`;
    },
    codespan(code) {
      naiveComponentsDeps.add("NText");
      return `<n-text code>${code}</n-text>`;
    },
    strong(text) {
      naiveComponentsDeps.add("NText");

      return `<n-text strong>${text}</n-text>`;
    },
    checkbox(checked) {
      naiveComponentsDeps.add("NCheckbox");
      return `<n-checkbox :checked="${checked}" style="vertical-align: -2px; margin-right: 8px;" />`;
    },
    em(text) {
      return text;
    },
  };
  Object.keys(overrides).forEach((key) => {
    // @ts-ignore
    renderer[key] = overrides[key];
  });
  return renderer;
}
