import * as Styled from '@/ui/components/molecules/loading-indicator/styled';
import { useString } from '@/ui/hooks/use-string';

export interface LoadingIndicatorProps {
  className?: string;
  label?: string;
}

export default function LoadingIndicator({ className, label }: LoadingIndicatorProps) {
  const { s } = useString();

  return (
    <Styled.Wrapper className={className}>
      <Styled.Icon icon='spinner' />
      <Styled.Label>{label ?? s('general.loading')}</Styled.Label>
    </Styled.Wrapper>
  );
}
