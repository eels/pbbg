import * as Styled from '@/web/components/atoms/error/styled';
import type { ReactNode } from 'react';

export interface ErrorProps {
  children: ReactNode;
  className?: string;
}

export default function Error({ children, className }: ErrorProps) {
  return <Styled.Wrapper className={className}>{children}</Styled.Wrapper>;
}
