import * as Styled from '@/web/components/atoms/input/styled';
import ConditionalRender from '@/web/components/utilities/conditional-render';
import { forwardRef, useId } from 'react';
import { paramCase } from 'change-case';
import type { AvailableIcon } from '@/web/types/icon';
import type { InputHTMLAttributes } from 'react';
import type { Object } from 'ts-toolbelt';

interface BaseInput extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  icon?: AvailableIcon;
  label: string;
}

export type InputProps = Object.AtLeast<BaseInput, 'id' | 'label'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error = false, errorMessage, icon, label, ...props }, ref) => {
    const { className, hidden, id, ...inputProps } = props;
    const identifier = useId();
    const name = id ?? [identifier, paramCase(label ?? identifier)].join('-');

    return (
      <Styled.Wrapper className={className} isHidden={hidden ?? false}>
        <ConditionalRender condition={label !== undefined}>
          {() => <Styled.Label htmlFor={name}>{label}</Styled.Label>}
        </ConditionalRender>

        <Styled.Container>
          <Styled.InputContainer>
            <ConditionalRender condition={icon !== undefined}>
              {() => <Styled.Icon icon={icon as Exclude<typeof icon, undefined>} />}
            </ConditionalRender>
            <Styled.Input
              ref={ref}
              hasError={error}
              hasIcon={icon !== undefined}
              hidden={hidden}
              id={name}
              {...inputProps}
            />
          </Styled.InputContainer>
        </Styled.Container>

        <ConditionalRender condition={error && errorMessage !== undefined}>
          {() => <Styled.Error>{errorMessage}</Styled.Error>}
        </ConditionalRender>
      </Styled.Wrapper>
    );
  },
);

Input.displayName = 'Input';

export default Input;
