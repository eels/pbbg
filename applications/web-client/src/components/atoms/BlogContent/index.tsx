import * as Styled from './styled';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return <Styled.Wrapper dangerouslySetInnerHTML={{ __html: content }} />;
}
