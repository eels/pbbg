import BlogContent from 'components/atoms/BlogContent';
import BlogHeader from 'components/atoms/BlogHeader';
import Container from 'components/atoms/Container';
import Head from 'next/head';
import { Fragment } from 'react';
import { getAllPosts, getPostBySlug } from 'services/BlogPostService';
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
        <title>{data.headline}</title>
      </Head>
      <Container>
        <BlogHeader data={data} />
        <BlogContent content={content.post} />
      </Container>
    </Fragment>
  );
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  const slugs = posts.map(({ data }) => ({ params: { slug: data.slug } }));

  return {
    fallback: false,
    paths: slugs,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const slug = params?.slug;
  const constructedSlug = Array.isArray(slug) ? slug.join('/') : slug;
  const post = await getPostBySlug(constructedSlug || '');

  return {
    props: {
      ...post,
    },
  };
}
