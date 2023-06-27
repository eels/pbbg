import * as Styled from 'components/atoms/MarkdownRenderer/styled';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return <Styled.Wrapper dangerouslySetInnerHTML={{ __html: content }} />;
}
