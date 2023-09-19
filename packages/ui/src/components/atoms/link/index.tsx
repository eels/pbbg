import type { AnchorHTMLAttributes, ReactNode } from 'react';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  className?: string;
}

export default function Link({ children, className, ...props }: LinkProps) {
  return (
    <a className={className} {...props}>
      {children}
    </a>
  );
}
