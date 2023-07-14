'use client';

import NextLink from 'next/link';
import type { LinkProps as NextLinkProps } from 'next/link';
import type { ReactNode } from 'react';

export interface LinkProps extends NextLinkProps {
  children: ReactNode;
  className?: string;
}

export default function Link(props: LinkProps) {
  return <NextLink {...props} prefetch={props.prefetch ?? false} />;
}
