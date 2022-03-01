import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import { capitalCase } from 'change-case';
import { format } from 'date-fns';
import { questions } from 'create-blog-post/data/questions';

function getBlogPostTemplateContent() {
  return fs.readFileSync(path.join(__dirname, 'templates/blog-post.md'), 'utf8');
}

function replaceDynamicVariableValues(map: Record<string, string>, input: string) {
  const entries = Object.entries(map);

  for (const [variable, value] of entries) {
    input = input.replace(new RegExp(variable, 'g'), value);
  }

  return input;
}

function writeBlogPostToDirectory(slug: string, content: string) {
  const directory = path.join(process.cwd(), 'src/data/blog');

  fs.writeFileSync(path.join(directory, `${slug}.md`), content);
}

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

  const dynamicVariablesMap = {
    '%date': timestamp,
    '%headline': capitalCase(answers.headline),
    '%slug': slug,
    '%status': 'DRAFT',
  };

  const template = getBlogPostTemplateContent();
  const post = replaceDynamicVariableValues(dynamicVariablesMap, template);

  writeBlogPostToDirectory(slug, post);
}

createBlogPost();
