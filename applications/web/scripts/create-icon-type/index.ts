import fs from 'node:fs';
import path from 'node:path';
import { getAllIconSlugs } from '@/web/services/icons';
import { hydrateFromVariableMap } from '@pbbg/utilities/lib/hydrate-string';

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
