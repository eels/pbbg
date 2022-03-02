import * as Styled from 'components/atoms/Layout/styled';
import type { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Styled.Wrapper>
      <Styled.Gradient>{children}</Styled.Gradient>
    </Styled.Wrapper>
  );
}
