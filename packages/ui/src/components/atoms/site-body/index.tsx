import * as Styled from '@/ui/components/atoms/site-body/styled';
import type { ReactNode } from 'react';

export interface SiteBodyProps {
  children: ReactNode;
  className?: string;
}

export default function SiteBody({ children, className }: SiteBodyProps) {
  return <Styled.Wrapper className={className}>{children}</Styled.Wrapper>;
}
