import BlogHeader from 'components/atoms/BlogHeader';
import BlogPagination from 'components/atoms/BlogPagination';
import Link from 'next/link';
import MarkdownRenderer from 'components/atoms/MarkdownRenderer';
import { Fragment } from 'react';
import { POSTS_PER_PAGE } from 'config/constants';
import { getAllPosts } from 'services/BlogPostService';
import type { GetStaticPropsContext } from 'next';
import type { Post } from 'types/post';

interface BlogIndexProps {
  currentPage: number;
  posts: Post[];
  totalPages: number;
}

export default function BlogIndex({ currentPage, posts, totalPages }: BlogIndexProps) {
  return (
    <Fragment>
      {posts.map((post) => (
        <div key={post.data.slug}>
          <BlogHeader data={post.data} />
          <MarkdownRenderer content={post.content.preview} />
          <Link href={`/blog/post/${post.data.slug}`}>
            <a>Read more</a>
          </Link>
        </div>
      ))}
      <BlogPagination current={currentPage} total={totalPages} />
    </Fragment>
  );
}

export function getStaticPaths() {
  const posts = getAllPosts();
  const pages = Array.from(Array(Math.ceil(posts.length / POSTS_PER_PAGE)).keys());
  const slugs = pages.map((page) => ({ params: { slug: `${page + 1}` } }));

  return {
    fallback: false,
    paths: slugs,
  };
}

export function getStaticProps({ params }: GetStaticPropsContext) {
  const slug = params?.slug || '1';
  const constructedSlug = Array.isArray(slug) ? slug.join('') : slug;
  const offset = parseInt(constructedSlug);
  const posts = getAllPosts();
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
