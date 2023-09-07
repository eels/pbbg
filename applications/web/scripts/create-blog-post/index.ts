import fs from 'node:fs';
import inquirer from 'inquirer';
import path from 'node:path';
import { capitalCase } from 'change-case';
import { format } from 'date-fns';
import { getTemplateContent } from '@/web-script/utilities/template';
import { questions } from '@/web-script/create-blog-post/data/questions';
import { replaceDynamicVariableValues } from '@/web-script/utilities/variables';
import { writeContentToDirectory } from '@/web-script/utilities/output';

function sanitiseHeadline(headline: string) {
  headline = headline.toLowerCase().split(' ').join('-');
  headline = headline.replace(/[^\w\s-]/g, '');

  return headline;
}

async function createBlogPost() {
  const answers = await inquirer.prompt(questions);
  const timestamp = format(new Date(), 'yyyyMMddHHmm');
  const urlSafeHeadline = sanitiseHeadline(answers.headline);
  const slug = `${timestamp}-${urlSafeHeadline}`;
  const directory = path.join(process.cwd(), 'src', 'content', 'posts');

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const dynamicVariablesMap = {
    '%date': timestamp,
    '%headline': capitalCase(answers.headline),
    '%status': 'DRAFT',
  };

  const template = getTemplateContent(path.join(__dirname, 'templates', 'blog-post.md'));
  const post = replaceDynamicVariableValues(dynamicVariablesMap, template);

  writeContentToDirectory(path.join(directory, `${slug}.mdx`), post);
}

createBlogPost();
