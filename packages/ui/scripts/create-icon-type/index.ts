import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import { getAllIconSlugs } from '@pbbg/ui/src/services/icons';
import { hydrateFromVariableMap } from '@pbbg/utilities/lib/hydrate-string';

// @ts-expect-error - import.meta is only available when using build tsconfig
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

async function createIconType() {
  const template = fs.readFileSync(path.join(__dirname, 'templates', 'icon.template'), 'utf-8');
  const icons = getAllIconSlugs().map((icon) => icon.replace(/\.svg$/, ''));
  const directory = path.join(process.cwd(), 'src', 'types');

  const dynamicVariablesMap = {
    '%array': JSON.stringify(icons, null, 2).replace(/"/g, "'"),
  };

  const content = hydrateFromVariableMap(template, dynamicVariablesMap);

  fs.writeFileSync(path.join(directory, 'icon.ts'), content);
}

createIconType();
