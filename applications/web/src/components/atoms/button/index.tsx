'use client';

import * as Styled from './styled';
import ConditionalRender from '@/web/components/utilities/conditional-render';
import type { AvailableIcon } from '@/web/types/icon';
import type { ButtonHTMLAttributes } from 'react';
import type { Object } from 'ts-toolbelt';

interface BaseButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  error?: boolean;
  icon?: AvailableIcon;
  processing?: boolean;
  secondary?: boolean;
}

export type ButtonProps = Object.Either<BaseButton, 'error' | 'secondary'>;

export default function Button({
  children,
  error = false,
  icon,
  processing = false,
  secondary = false,
  ...props
}: ButtonProps) {
  if (processing) {
    props.disabled = processing;
  }

  return (
    <Styled.Button isError={error} isSecondary={secondary} {...props}>
      <Styled.Content isProcessing={processing}>
        <ConditionalRender condition={icon !== undefined}>
          {() => <Styled.Icon icon={icon as AvailableIcon} />}
        </ConditionalRender>
        <span>{children}</span>
      </Styled.Content>
      <ConditionalRender condition={processing === true}>
        {() => <Styled.LoadingIcon icon='spinner' />}
      </ConditionalRender>
    </Styled.Button>
  );
}
