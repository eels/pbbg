'use client';

import * as Styled from '@/web/components/atoms/button/styled';
import ConditionalRender from '@/web/components/utilities/conditional-render';
import Link from '@/web/components/atoms/link';
import cc from 'classcat';
import type { AvailableIcon } from '@/web/types/icon';
import type { LinkProps } from '@/web/components/atoms/link';
import type { Object } from 'ts-toolbelt';
import type { ReactNode } from 'react';

export interface BaseLinkButton extends LinkProps {
  alert?: boolean;
  children: ReactNode;
  className?: string;
  icon?: AvailableIcon;
  secondary?: boolean;
}

export type LinkButtonProps = Object.Either<BaseLinkButton, 'alert' | 'secondary'>;

export default function LinkButton({
  alert = false,
  children,
  className,
  icon,
  secondary = false,
  ...props
}: LinkButtonProps) {
  const conditionalStyleProps = { $isAlert: alert, $isSecondary: secondary };

  return (
    <Link className={cc([Styled.Link(conditionalStyleProps), className])} {...props}>
      <Styled.Content>
        <ConditionalRender condition={icon !== undefined}>
          {() => <Styled.Icon icon={icon as AvailableIcon} />}
        </ConditionalRender>
        <span>{children}</span>
      </Styled.Content>
    </Link>
  );
}
