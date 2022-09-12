import * as Styled from 'components/atoms/Button/styled';
import type { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children }: ButtonProps) {
  return <Styled.Button>{children}</Styled.Button>;
}
