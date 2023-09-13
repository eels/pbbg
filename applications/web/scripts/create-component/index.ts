import fs from 'node:fs';
import inquirer from 'inquirer';
import path from 'node:path';
import { hydrateFromVariableMap } from '@pbbg/utilities/lib/hydrate-string';
import { paramCase, pascalCase } from 'change-case';
import { questions } from '@/web-script/create-component/data/questions';

async function createComponent() {
  const answers = await inquirer.prompt(questions);
  const componentName = paramCase(answers.name.toLowerCase());
  const componentType = paramCase(answers.type.toLowerCase());
  const directory = path.join(process.cwd(), 'src', 'components', componentType, componentName);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const componentTemplateMap: Record<string, string> = {
    'index.template': 'index.tsx',
    'styled.template': 'styled.ts',
  };

  if (answers.storybook) {
    componentTemplateMap['index.stories.template'] = 'index.stories.tsx';
  }

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

createComponent();
