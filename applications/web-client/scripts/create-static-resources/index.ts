import fs from 'fs';
import path from 'path';
import { description, name, theme, title } from 'resources/strings/seo';
import { format } from 'date-fns';

function getComponentTemplateContent(filename: string) {
  return fs.readFileSync(path.join(__dirname, 'templates', filename), 'utf8');
}

function getComponentTemplateMap() {
  return {
    'humans.template': 'humans.txt',
    'site.webmanifest.template': 'site.webmanifest',
  };
}

function replaceDynamicVariableValues(map: Record<string, string>, input: string) {
  const entries = Object.entries(map);

  for (const [variable, value] of entries) {
    input = input.replace(new RegExp(variable, 'g'), value);
  }

  return input;
}

function writeComponentToDirectory(path: string, content: string) {
  fs.writeFileSync(path, content);
}

function createStaticResources() {
  const directory = path.join(process.cwd(), 'public');

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const dynamicVariablesMap = {
    '%appname': name,
    '%datetime': format(new Date(), 'yyyy/MM/dd HH:mm'),
    '%description': description[0],
    '%theme': theme,
    '%title': title,
  };

  const templates = Object.entries(getComponentTemplateMap());

  for (const [template, output] of templates) {
    const templateContent = getComponentTemplateContent(template);
    const content = replaceDynamicVariableValues(dynamicVariablesMap, templateContent);

    writeComponentToDirectory(path.join(directory, output), content);
  }
}

createStaticResources();
