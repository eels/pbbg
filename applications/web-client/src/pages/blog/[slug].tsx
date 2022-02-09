import BlogContent from 'components/atoms/BlogContent';
import BlogHeader from 'components/atoms/BlogHeader';
import Container from 'components/atoms/Container';
import Link from 'next/link';
import { Fragment } from 'react';
import { Post } from 'types/post';
import { getAllPosts } from 'services/BlogPostService';
import type { GetStaticPropsContext } from 'next';

interface BlogIndexProps {
  posts: Post[];
}

export default function BlogIndex({ posts }: BlogIndexProps) {
  return (
    <Fragment>
      <Container>
        {posts.map((post) => (
          <Fragment key={post.data.slug}>
            <BlogHeader data={post.data} />
            <BlogContent content={post.content.preview} />
            <Link href={`/blog/post/${post.data.slug}`}>
              <a>Read more</a>
            </Link>
          </Fragment>
        ))}
      </Container>
    </Fragment>
  );
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  const pages = Array.from(Array(Math.ceil(posts.length / 10)).keys());
  const slugs = pages.map((page) => ({ params: { slug: `${page + 1}` } }));

  return {
    fallback: false,
    paths: slugs,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const slug = params?.slug || '1';
  const constructedSlug = Array.isArray(slug) ? slug.join('') : slug;
  const offset = parseInt(constructedSlug);
  const posts = await getAllPosts();

  return {
    props: {
      posts: posts.slice((offset - 1) * 10, (offset - 1) * 10 + 10),
    },
  };
}
