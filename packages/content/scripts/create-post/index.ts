import fs from 'node:fs';
import inquirer from 'inquirer';
import path from 'node:path';
import url from 'node:url';
import { capitalCase } from 'change-case';
import { format } from 'date-fns';
import { hydrateFromVariableMap } from '@pbbg/utilities/lib/hydrate-string';
import { questions } from '@pbbg/content/scripts/create-post/data/questions';

// @ts-expect-error - import.meta is only available when using build tsconfig
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

function sanitiseHeadline(headline: string) {
  headline = headline.toLowerCase().split(' ').join('-');
  headline = headline.replace(/[^\w\s-]/g, '');

  return headline;
}

async function createBlogPost() {
  const answers = await inquirer.prompt(questions);
  const urlSafeHeadline = sanitiseHeadline(answers.headline);
  const slug = `${format(new Date(), 'yyyyMMddHHmm')}-${urlSafeHeadline}`;
  const directory = path.join(process.cwd(), 'src', 'content', 'posts');

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const dynamicVariablesMap = {
    '%date': format(new Date(), 'yyyy-MM-dd'),
    '%headline': capitalCase(answers.headline),
    '%status': 'DRAFT',
  };

  const template = fs.readFileSync(path.join(__dirname, 'templates', 'blog-post.md'), 'utf-8');
  const post = hydrateFromVariableMap(template, dynamicVariablesMap);

  fs.writeFileSync(path.join(directory, `${slug}.mdx`), post);
}

createBlogPost();
