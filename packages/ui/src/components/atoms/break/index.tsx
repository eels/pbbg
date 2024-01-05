import * as Styled from '@/ui/components/atoms/break/styled';

export interface BreakProps {
  className?: string;
}

export default function Break({ className }: BreakProps) {
  return (
    <Styled.Wrapper className={className}>
      <Styled.Rule />
      <Styled.Icon icon='sword-right' />
      <Styled.Rule />
    </Styled.Wrapper>
  );
}
