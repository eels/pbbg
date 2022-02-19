import MarkdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import { minify } from 'html-minifier';

const md = new MarkdownIt();

const minifyOptions = {
  collapseWhitespace: true,
  conservativeCollapse: true,
};

export function convertMarkdownToHTML(markdown: string) {
  return minify(md.use(markdownItAttrs).render(markdown), minifyOptions);
}
