import * as Styled from 'components/atoms/Button/styled';
import ConditionalRender from 'components/utilities/ConditionalRender';
import type { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isProcessing?: boolean;
}

export default function Button({ children, isProcessing, ...props }: ButtonProps) {
  return (
    <Styled.Button isProcessing={isProcessing} {...props}>
      <Styled.Content isProcessing={isProcessing}>{children}</Styled.Content>
      <ConditionalRender condition={isProcessing === true}>
        {() => <Styled.Icon icon='spinner' />}
      </ConditionalRender>
    </Styled.Button>
  );
}
