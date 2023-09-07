import fs from 'node:fs';

export function writeContentToDirectory(path: string, content: string) {
  fs.writeFileSync(path, content);
}
