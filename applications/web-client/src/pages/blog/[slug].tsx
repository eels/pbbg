import { Fragment } from 'react';
import { convertMarkdownToHTML } from 'services/MarkdownService';
import { format, parse } from 'date-fns';
import { getAllPosts, getPostBySlug } from 'services/BlogPostService';
import type { GetStaticPropsContext } from 'next';

interface BlogPostProps {
  content: string;
  data: Record<string, any>;
}

export default function BlogPost({ content, data }: BlogPostProps) {
  const parsedDate = parse(data.date, 'yyyyMMddHHmm', new Date());

  return (
    <Fragment>
      <h1>{data.headline}</h1>
      <div>{format(parsedDate, 'yyyy-MM-dd')}</div>
      <div>{content}</div>
    </Fragment>
  );
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  const slugs = posts.map(({ data }) => ({ params: { slug: data.slug } }));

  return {
    fallback: false,
    paths: slugs,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const slug = params?.slug;
  const constructedSlug = Array.isArray(slug) ? slug.join('/') : slug;
  const post = getPostBySlug(constructedSlug || '');
  const content = await convertMarkdownToHTML(post.content || '');

  return {
    props: {
      ...post,
      content: content,
    },
  };
}
