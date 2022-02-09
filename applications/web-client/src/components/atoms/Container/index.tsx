import * as Styled from 'components/atoms/Container/styled';
import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <Styled.Container>{children}</Styled.Container>;
}
