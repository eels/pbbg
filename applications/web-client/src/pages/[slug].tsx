import Head from 'next/head';
import MarkdownRenderer from 'components/atoms/MarkdownRenderer';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { Fragment } from 'react';
import { convertMarkdownToHTML } from 'services/MarkdownService';
import { titleify } from 'utilities/titleify';
import type { AuxiliaryData } from 'types/auxiliary';
import type { GetStaticPropsContext } from 'next';

interface AuxiliaryProps {
  content: string;
  data: AuxiliaryData;
}

export default function Auxiliary({ content, data }: AuxiliaryProps) {
  return (
    <Fragment>
      <Head>
        <title>{titleify(data.title)}</title>
      </Head>
      <MarkdownRenderer content={content} />
    </Fragment>
  );
}

export function getStaticPaths() {
  const pages = ['credits', 'privacy', 'terms'];
  const slugs = pages.map((page) => ({ params: { slug: page } }));

  return {
    fallback: false,
    paths: slugs,
  };
}

export function getStaticProps({ params }: GetStaticPropsContext) {
  const slug = params?.slug;
  const constructedSlug = Array.isArray(slug) ? slug.join('') : slug;
  const directory = path.join(process.cwd(), 'src/data/auxiliary');
  const file = fs.readFileSync(path.join(directory, `${constructedSlug}.md`), 'utf8');
  const { content, data } = matter(file);

  return {
    props: {
      content: convertMarkdownToHTML(content),
      data: data,
    },
  };
}
