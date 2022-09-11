import BlogHeader from 'components/atoms/BlogHeader';
import Head from 'next/head';
import MarkdownRenderer from 'components/atoms/MarkdownRenderer';
import { Fragment } from 'react';
import { getAllPosts, getPostBySlug } from 'services/BlogPostService';
import { titleify } from 'utilities/titleify';
import type { GetStaticPropsContext } from 'next';
import type { PostContent, PostData } from 'types/post';

interface BlogPostProps {
  content: PostContent;
  data: PostData;
}

export default function BlogPost({ content, data }: BlogPostProps) {
  return (
    <Fragment>
      <Head>
        <title>{titleify(data.headline)}</title>
      </Head>
      <BlogHeader data={data} />
      <MarkdownRenderer content={content.post} />
    </Fragment>
  );
}

export function getStaticPaths() {
  const posts = getAllPosts();
  const slugs = posts.map(({ data }) => ({ params: { slug: data.slug } }));

  return {
    fallback: false,
    paths: slugs,
  };
}

export function getStaticProps({ params }: GetStaticPropsContext) {
  const slug = params?.slug;
  const constructedSlug = Array.isArray(slug) ? slug.join('/') : slug;
  const post = getPostBySlug(constructedSlug || '');

  return {
    props: {
      ...post,
    },
  };
}
