import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';

const directory = path.join(process.cwd(), '..', '..', 'assets', 'icons');

export function getIconContentBySlug(slug: string) {
  const clonedSlug = slug.replace(/\.svg$/, '');
  const pathToSVG = path.join(directory, `${clonedSlug}.svg`);

  return fs.readFileSync(pathToSVG, 'utf8');
}

export function convertIconToSymbolBySlug(slug: string) {
  const content = getIconContentBySlug(slug);
  const dom = new JSDOM(content);
  const svg = dom.window.document.querySelector('svg');

  if (svg === null) {
    return null;
  }

  const symbol = dom.window.document.createElement('symbol');
  const viewBox = svg.getAttribute('viewBox');
  const contentCollection = Array.from(svg.children).map((child) => child.outerHTML);
  const contentString = contentCollection.join('');

  symbol.setAttribute('id', slug.replace(/\.svg$/, ''));
  symbol.setAttribute('viewBox', viewBox ?? '');

  symbol.innerHTML = contentString;

  return symbol;
}

export function wrapIconSymbolsInSVGElement(markup: string) {
  const dom = new JSDOM();
  const svg = dom.window.document.createElement('svg');

  svg.setAttribute('fill', 'none');
  svg.setAttribute('style', 'display:none');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  svg.innerHTML = markup;

  return svg;
}

export function getAllIconSlugs() {
  return fs.existsSync(directory) ? fs.readdirSync(directory) : [];
}

export function getAllIconsAsSymbols() {
  const slugs = getAllIconSlugs();
  const icons = slugs.map((slug) => convertIconToSymbolBySlug(slug));
  const filteredIcons = icons.filter((icon): icon is HTMLElement => icon !== null);
  const markup = filteredIcons.map((icon) => icon.outerHTML);

  return wrapIconSymbolsInSVGElement(markup.join('')).outerHTML;
}
