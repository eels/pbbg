import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import { paramCase, pascalCase } from 'change-case';
import { questions } from 'create-component/data/questions';

function getComponentTemplateContent(filename: string) {
  return fs.readFileSync(path.join(__dirname, 'templates', filename), 'utf8');
}

function getComponentTemplateMap() {
  return {
    'component.stories.template': '%filename.stories.tsx',
    'index.template': 'index.tsx',
    'styled.template': 'styled.tsx',
    'styles.module.template': '%filename.module.scss',
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

async function createComponent() {
  const answers = await inquirer.prompt(questions);
  const componentFilename = paramCase(answers.name);
  const componentName = pascalCase(answers.name);
  const componentType = answers.type.toLowerCase();
  const directory = path.join(process.cwd(), 'src/components', componentType, componentName);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const dynamicVariablesMap = {
    '%!type': pascalCase(componentType),
    '%filename': componentFilename,
    '%name': componentName,
    '%type': componentType,
  };

  const templates = Object.entries(getComponentTemplateMap());

  for (const [template, output] of templates) {
    const templateContent = getComponentTemplateContent(template);
    const filename = replaceDynamicVariableValues(dynamicVariablesMap, output);
    const content = replaceDynamicVariableValues(dynamicVariablesMap, templateContent);

    writeComponentToDirectory(path.join(directory, filename), content);
  }
}

createComponent();
