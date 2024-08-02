import * as Styled from '@/ui/components/atoms/container/styled';
import type { ReactNode } from 'react';

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  type: 'content' | 'page';
}

export default function Container({ children, className, type }: ContainerProps) {
  return (
    <Styled.Container $type={type} className={className}>
      {children}
    </Styled.Container>
  );
}
