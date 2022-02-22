import styles from 'components/atoms/Button/button.module.scss';
import { create } from 'chic-modules';

const styled = create(styles);

export const Button = styled.div.attrs({ role: 'button' })('button');
