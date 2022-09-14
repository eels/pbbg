import * as Styled from 'components/atoms/Form/styled';
import type { FormHTMLAttributes } from 'react';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {}

export default function Form({ children, ...props }: FormProps) {
  return (
    <Styled.Form noValidate {...props}>
      {children}
    </Styled.Form>
  );
}
