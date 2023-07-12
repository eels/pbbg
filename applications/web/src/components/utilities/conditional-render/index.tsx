import type { ReactNode } from 'react';

export interface ConditionalRenderProps {
  children: () => ReactNode;
  condition: boolean;
}

export default function ConditionalRender({ children, condition }: ConditionalRenderProps) {
  return condition ? children() : null;
}
