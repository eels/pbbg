import BlogContent from 'components/atoms/BlogContent';
import BlogHeader from 'components/atoms/BlogHeader';
import BlogPagination from 'components/atoms/BlogPagination';
import Container from 'components/atoms/Container';
import Link from 'next/link';
import { Fragment } from 'react';
import { POSTS_PER_PAGE } from 'config/constants';
import { Post } from 'types/post';
import { getAllPosts } from 'services/BlogPostService';
import type { GetStaticPropsContext } from 'next';

interface BlogIndexProps {
  currentPage: number;
  posts: Post[];
  totalPages: number;
}

export default function BlogIndex({ currentPage, posts, totalPages }: BlogIndexProps) {
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
        <BlogPagination current={currentPage} total={totalPages} />
      </Container>
    </Fragment>
  );
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  const pages = Array.from(Array(Math.ceil(posts.length / POSTS_PER_PAGE)).keys());
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
  const pages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const pointer = (offset - 1) * POSTS_PER_PAGE;

  return {
    props: {
      currentPage: offset,
      posts: posts.slice(pointer, pointer + POSTS_PER_PAGE),
      totalPages: pages,
    },
  };
}
