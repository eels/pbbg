import { JSDOM } from 'jsdom';

export function extractParagraphs(content: string, quantity: number) {
  const dom = new JSDOM(content);
  const paragraphs = dom.window.document.querySelectorAll('p');

  if (paragraphs.length === 0) {
    return '';
  }

  const paragraphsArray = Array.from(paragraphs);
  const paragraphsQuantity = paragraphsArray.slice(0, quantity);

  return paragraphsQuantity.map((paragraph) => paragraph.outerHTML).join('');
}
