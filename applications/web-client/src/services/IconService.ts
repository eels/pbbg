import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const directory = path.join(process.cwd(), 'public/icons');

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

  svg.removeAttribute('viewBox');
  svg.setAttribute('style', 'display:none');

  symbol.setAttribute('id', slug.replace(/\.svg$/, ''));
  symbol.setAttribute('viewBox', viewBox ?? '');

  symbol.innerHTML = contentString;
  svg.innerHTML = symbol.outerHTML;

  return svg;
}

export function getAllIconSlugs() {
  return fs.existsSync(directory) ? fs.readdirSync(directory) : [];
}

export function getAllIconsAsSymbols() {
  const slugs = getAllIconSlugs();
  const icons = slugs.map((slug) => convertIconToSymbolBySlug(slug));
  const filteredIcons = icons.filter((icon): icon is SVGSVGElement => icon !== null);
  const markup = filteredIcons.map((icon) => icon.outerHTML);

  return markup.join('');
}
