import * as Styled from 'components/atoms/Button/styled';
import type { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, ...props }: ButtonProps) {
  return <Styled.Button {...props}>{children}</Styled.Button>;
}
