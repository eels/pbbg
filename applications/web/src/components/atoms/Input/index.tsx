import * as Styled from 'components/atoms/Input/styled';
import ConditionalRender from 'components/utilities/ConditionalRender';
import { forwardRef, useId } from 'react';
import { paramCase } from 'change-case';
import type { HTMLInputTypeAttribute } from 'react';

export interface InputProps {
  autoComplete?: string;
  error?: string;
  label: string;
  type?: HTMLInputTypeAttribute;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { autoComplete: ac, error, label, type = 'text' } = props;
  const identifier = useId();
  const name = [identifier, paramCase(label)].join('-');
  const hasError = error !== undefined;

  return (
    <Styled.Wrapper>
      <Styled.Label htmlFor={name}>{label}</Styled.Label>
      <Styled.Input ref={ref} autoComplete={ac} hasError={hasError} id={name} type={type} />
      <ConditionalRender condition={hasError}>
        {() => <Styled.Error>{error}</Styled.Error>}
      </ConditionalRender>
    </Styled.Wrapper>
  );
});

Input.displayName = 'Input';

export default Input;
