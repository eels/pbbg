import { useMDXComponent } from 'next-contentlayer/hooks';

export interface MDXContentProps {
  code: string;
}

export default function MDXContent({ code }: MDXContentProps) {
  return useMDXComponent(code)({});
}
