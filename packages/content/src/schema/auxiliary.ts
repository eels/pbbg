/* eslint-disable import/no-relative-parent-imports */
/* See: https://github.com/contentlayerdev/contentlayer/issues/238 */

import { defineDocumentType } from 'contentlayer/source-files';
import { removeExtension } from '../../../../node_modules/@pbbg/utilities/src/extensions';

export const Auxiliary = defineDocumentType(() => ({
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
