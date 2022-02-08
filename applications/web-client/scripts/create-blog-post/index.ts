import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import { format } from 'date-fns';
import { questions } from 'create-blog-post/data/questions';

function getBlogPostTemplate() {
  return fs.readFileSync(path.join(__dirname, 'templates', 'blog-post.md'), 'utf8');
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

function convertHeadlineToTitleCase(headline: string) {
  return headline.replace(/\w\S*/g, (headline) => {
    return headline.charAt(0).toUpperCase() + headline.substring(1).toLowerCase();
  });
}

async function createBlogPost() {
  const answers = await inquirer.prompt(questions);
  const timestamp = format(new Date(), 'yyyyMMddHHmm');
  const headline = answers.headline;
  const urlSafeHeadline = sanitiseHeadline(headline);
  const slug = `${timestamp}-${urlSafeHeadline}`;

  let template = getBlogPostTemplate();

  template = template.replace('%date', timestamp);
  template = template.replace('%headline', convertHeadlineToTitleCase(headline));
  template = template.replace('%slug', slug);
  template = template.replace('%status', 'DRAFT');

  writeBlogPostToDirectory(slug, template);
}

createBlogPost();
