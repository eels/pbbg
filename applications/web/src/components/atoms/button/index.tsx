'use client';

import * as Styled from './styled';
import ConditionalRender from '@/web/components/utilities/conditional-render';
import type { AvailableIcon } from '@/web/types/icon';
import type { ButtonHTMLAttributes } from 'react';
import type { Object } from 'ts-toolbelt';

interface BaseButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  alert?: boolean;
  icon?: AvailableIcon;
  processing?: boolean;
  secondary?: boolean;
}

export type ButtonProps = Object.Either<BaseButton, 'alert' | 'secondary'>;

export default function Button({
  alert = false,
  children,
  icon,
  processing = false,
  secondary = false,
  ...props
}: ButtonProps) {
  if (processing) {
    props.disabled = processing;
  }

  return (
    <Styled.Button isAlert={alert} isSecondary={secondary} {...props}>
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
