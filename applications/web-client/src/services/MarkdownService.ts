import html from 'remark-html';
import { remark } from 'remark';

export async function convertMarkdownToHTML(markdown: string) {
  return (await remark().use(html).process(markdown)).toString();
}
