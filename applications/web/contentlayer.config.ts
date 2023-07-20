import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { removeExtension } from './src/utilities/extensions';

const Auxiliary = defineDocumentType(() => ({
  computedFields: {
    slug: {
      resolve: (doc) => removeExtension(doc._raw.sourceFileName),
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

const Post = defineDocumentType(() => ({
  computedFields: {
    url: {
      resolve: (doc) => `/posts/${doc._raw.flattenedPath}`,
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

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [Auxiliary, Post],
});
