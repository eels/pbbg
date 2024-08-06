import fs from 'node:fs';
import inquirer from 'inquirer';
import path from 'node:path';
import url from 'node:url';
import { hydrateFromVariableMap } from '@pbbg/utilities/hydrate-string';
import { kebabCase, pascalCase } from 'change-case';
import { questions } from '@/squire/commands/create-component/data/questions';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const __uiPackage = path.join(process.cwd(), '..', 'ui');

export async function createComponent() {
  const answers = await inquirer.prompt(questions);
  const componentName = kebabCase(answers.name.toLowerCase());
  const componentType = kebabCase(answers.type.toLowerCase());
  const directory = path.join(__uiPackage, 'src', 'components', componentType, componentName);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const componentTemplateMap: Record<string, string> = {
    'index.template': 'index.tsx',
    'styled.template': 'styled.ts',
  };

  if (answers.tests) {
    componentTemplateMap['index.test.template'] = 'index.test.tsx';
  }

  const dynamicVariablesMap = {
    '%!name': pascalCase(componentName),
    '%!type': pascalCase(componentType),
    '%name': componentName,
    '%type': componentType,
  };

  for (const [template, output] of Object.entries(componentTemplateMap)) {
    const templateContent = fs.readFileSync(path.join(__dirname, 'templates', template), 'utf-8');
    const filename = hydrateFromVariableMap(output, dynamicVariablesMap);
    const content = hydrateFromVariableMap(templateContent, dynamicVariablesMap);

    fs.writeFileSync(path.join(directory, filename), content);
  }
}
