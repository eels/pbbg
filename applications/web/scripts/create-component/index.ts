import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import { getTemplateContent } from '@/web-script/utilities/template';
import { paramCase, pascalCase } from 'change-case';
import { questions } from '@/web-script/create-component/data/questions';
import { replaceDynamicVariableValues } from '@/web-script/utilities/variables';
import { writeContentToDirectory } from '@/web-script/utilities/output';

async function createComponent() {
  const answers = await inquirer.prompt(questions);
  const componentName = paramCase(answers.name.toLowerCase());
  const componentType = paramCase(answers.type.toLowerCase());
  const directory = path.join(process.cwd(), 'src', 'components', componentType, componentName);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const componentTemplateMap = {
    'index.stories.template': 'index.stories.tsx',
    'index.template': 'index.tsx',
    'styled.template': 'styled.ts',
  };

  const dynamicVariablesMap = {
    '%!name': pascalCase(componentName),
    '%!type': pascalCase(componentType),
    '%name': componentName,
    '%type': componentType,
  };

  for (const [template, output] of Object.entries(componentTemplateMap)) {
    const templateContent = getTemplateContent(path.join(__dirname, 'templates', template));
    const filename = replaceDynamicVariableValues(dynamicVariablesMap, output);
    const content = replaceDynamicVariableValues(dynamicVariablesMap, templateContent);

    writeContentToDirectory(path.join(directory, filename), content);
  }
}

createComponent();
