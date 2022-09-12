import * as Styled from 'components/atoms/Input/styled';
import { forwardRef } from 'react';
import { paramCase } from 'change-case';
import type { HTMLInputTypeAttribute } from 'react';

export interface InputProps {
  autoComplete?: string;
  label: string;
  type: HTMLInputTypeAttribute;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { autoComplete, label, type } = props;
  const name = paramCase(label);

  return (
    <Styled.Wrapper>
      <Styled.Label htmlFor={name}>{label}</Styled.Label>
      <Styled.Input ref={ref} autoComplete={autoComplete} id={name} type={type} />
    </Styled.Wrapper>
  );
});

Input.displayName = 'Input';

export default Input;
