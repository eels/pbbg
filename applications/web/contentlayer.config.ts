import { defineDocumentType, makeSource } from 'contentlayer/source-files';

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
      description: 'The date of the post',
      required: true,
      type: 'date',
    },
    title: {
      description: 'The title of the post',
      required: true,
      type: 'string',
    },
  },
  filePathPattern: 'posts/**/*.mdx',
  name: 'Post',
}));

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [Post],
});
