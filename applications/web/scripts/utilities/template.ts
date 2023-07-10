import fs from 'fs';

export function getTemplateContent(path: string) {
  return fs.readFileSync(path, 'utf8');
}
