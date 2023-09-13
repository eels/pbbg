import { Auxiliary } from './src/schema/auxiliary';
import { Post } from './src/schema/post';
import { makeSource } from 'contentlayer/source-files';

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [Auxiliary, Post],
});
