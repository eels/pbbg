import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import type { Slug } from 'types/post';

const directory = path.join(process.cwd(), 'src/data/blog');

export function getPostSlugs() {
  return fs.existsSync(directory) ? fs.readdirSync(directory) : [];
}

export function getPostBySlug(slug: Slug) {
  const clonedSlug = slug.replace(/\.md$/, '');
  const pathToPost = path.join(directory, `${clonedSlug}.md`);
  const file = fs.readFileSync(pathToPost, 'utf8');
  const { content, data } = matter(file);

  data.slug = clonedSlug;

  return {
    content,
    data,
  };
}

export function filterDraftPosts(posts: Record<string, any>[]) {
  return posts.filter(({ data }) => data.status !== 'DRAFT');
}

export function getAllPosts() {
  return filterDraftPosts(getPostSlugs().map((slug) => getPostBySlug(slug)));
}
