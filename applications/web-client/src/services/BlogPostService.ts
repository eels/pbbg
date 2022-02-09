import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { convertMarkdownToHTML } from 'services/MarkdownService';
import { extractParagraphs } from 'utilities/extract-paragraphs';
import type { Post, PostContent, PostData } from 'types/post';

const directory = path.join(process.cwd(), 'src/data/blog');

export function filterDraftPosts(posts: Post[]) {
  return posts.filter(({ data }) => data.status !== 'DRAFT');
}

export async function getPostBySlug(slug: string) {
  const clonedSlug = slug.replace(/\.md$/, '');
  const pathToPost = path.join(directory, `${clonedSlug}.md`);
  const file = fs.readFileSync(pathToPost, 'utf8');
  const { content, data } = matter(file);

  data.slug = clonedSlug;
  data.timeToRead = Math.max(1, Math.floor(content.split(' ').length / 200));

  const convertedContent = await convertMarkdownToHTML(content);

  const postContent = {
    post: convertedContent,
    preview: extractParagraphs(convertedContent, 1),
  };

  return {
    content: postContent as PostContent,
    data: data as PostData,
  };
}

export function getPostSlugs() {
  return fs.existsSync(directory) ? fs.readdirSync(directory) : [];
}

export async function getAllPosts() {
  const slugs = getPostSlugs().reverse();
  const posts = slugs.map(async (slug) => getPostBySlug(slug));

  return filterDraftPosts(await Promise.all(posts));
}
