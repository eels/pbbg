import Container from 'components/atoms/Container';
import Head from 'next/head';
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
      <Head>
        <title>{data.headline}</title>
      </Head>
      <Container>
        <h1>{data.headline}</h1>
        <div>Posted {format(parsedDate, 'EEEE, LLLL do yyyy HH:mm aa')}</div>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
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
