import * as Styled from '@/web/components/atoms/content-container/styled';
import type { ReactNode } from 'react';

export interface ContentContainerProps {
  children?: ReactNode;
  className?: string;
}

export default function ContentContainer({ children, className }: ContentContainerProps) {
  return <Styled.Wrapper className={className}>{children}</Styled.Wrapper>;
}
