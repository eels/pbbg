export interface PostContent {
  post: string;
  preview: string;
}

export interface PostData {
  date: number;
  headline: string;
  slug: string;
  status: 'DRAFT' | 'PUBLISHED';
  timeToRead: number;
}

export interface Post {
  content: PostContent;
  data: PostData;
}
