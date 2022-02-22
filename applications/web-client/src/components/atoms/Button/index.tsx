import * as Styled from 'components/atoms/Button/styled';

export interface ButtonProps {
  copy: string;
}

export default function Button({ copy }: ButtonProps) {
  return <Styled.Button>{copy}</Styled.Button>;
}
