import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import { capitalCase } from 'change-case';
import { format } from 'date-fns';
import { questions } from 'create-blog-post/data/questions';

function getBlogPostTemplateContent() {
  return fs.readFileSync(path.join(__dirname, 'templates/blog-post.md'), 'utf8');
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

  let template = getBlogPostTemplateContent();

  template = template.replace('%date', timestamp);
  template = template.replace('%headline', capitalCase(answers.headline));
  template = template.replace('%slug', slug);
  template = template.replace('%status', 'DRAFT');

  writeBlogPostToDirectory(slug, template);
}

createBlogPost();
