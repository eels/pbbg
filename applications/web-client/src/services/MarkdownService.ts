import MarkdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';

const md = new MarkdownIt();

export function convertMarkdownToHTML(markdown: string) {
  return md.use(markdownItAttrs).render(markdown);
}
