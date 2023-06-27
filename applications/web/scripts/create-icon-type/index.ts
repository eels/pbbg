import fs from 'fs';
import path from 'path';
import { getAllIconSlugs } from 'services/IconService';

function getIconTypeTemplateContent() {
  return fs.readFileSync(path.join(__dirname, 'templates/index.template'), 'utf8');
}

function replaceDynamicVariableValues(map: Record<string, string>, input: string) {
  const entries = Object.entries(map);

  for (const [variable, value] of entries) {
    input = input.replace(new RegExp(variable, 'g'), value);
  }

  return input;
}

function writeTypeToDirectory(path: string, content: string) {
  fs.writeFileSync(path, content);
}

async function createIconType() {
  const templateContent = getIconTypeTemplateContent();
  const icons = getAllIconSlugs().map((icon) => icon.replace(/\.svg$/, ''));

  const dynamicVariablesMap = {
    '%array': JSON.stringify(icons, null, 2).replace(/"/g, "'"),
  };

  const content = replaceDynamicVariableValues(dynamicVariablesMap, templateContent);

  writeTypeToDirectory(path.join(process.cwd(), 'src/types/icon.ts'), content);
}

createIconType();
