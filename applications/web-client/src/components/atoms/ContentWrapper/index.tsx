import * as Styled from 'components/atoms/ContentWrapper/styled';
import type { ReactNode } from 'react';

export interface ContentWrapperProps {
  children: ReactNode;
}

export default function ContentWrapper({ children }: ContentWrapperProps) {
  return (
    <Styled.Wrapper>
      <Styled.Container>{children}</Styled.Container>
    </Styled.Wrapper>
  );
}
