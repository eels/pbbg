import { defineDocumentType } from 'contentlayer/source-files';

export const Auxiliary = defineDocumentType(() => ({
  computedFields: {
    slug: {
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
      type: 'string',
    },
  },
  contentType: 'mdx',
  fields: {
    title: {
      required: true,
      type: 'string',
    },
  },
  filePathPattern: 'auxiliary/**/*.mdx',
  name: 'Auxiliary',
}));
