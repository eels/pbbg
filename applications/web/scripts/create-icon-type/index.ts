import path from 'path';
import { getAllIconSlugs } from '@/web/services/icons';
import { getTemplateContent } from '@/web-script/utilities/template';
import { replaceDynamicVariableValues } from '@/web-script/utilities/variables';
import { writeContentToDirectory } from '@/web-script/utilities/output';

async function createIconType() {
  const templateContent = getTemplateContent(path.join(__dirname, 'templates', 'icon.template'));
  const icons = getAllIconSlugs().map((icon) => icon.replace(/\.svg$/, ''));
  const directory = path.join(process.cwd(), 'src', 'types');

  const dynamicVariablesMap = {
    '%array': JSON.stringify(icons, null, 2).replace(/"/g, "'"),
  };

  const content = replaceDynamicVariableValues(dynamicVariablesMap, templateContent);

  writeContentToDirectory(path.join(directory, 'icon.ts'), content);
}

createIconType();
