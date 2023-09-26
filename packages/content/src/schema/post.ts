import { defineDocumentType } from 'contentlayer/source-files';

export const Post = defineDocumentType(() => ({
  computedFields: {
    slug: {
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
      type: 'string',
    },
  },
  contentType: 'mdx',
  fields: {
    date: {
      required: true,
      type: 'date',
    },
    headline: {
      required: true,
      type: 'string',
    },
    status: {
      options: ['DRAFT', 'PUBLISHED'],
      required: true,
      type: 'enum',
    },
  },
  filePathPattern: 'posts/**/*.mdx',
  name: 'Post',
}));
