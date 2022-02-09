import styles from './styles.module.scss';
import { create } from 'chic-modules';

const styled = create(styles);

export const Wrapper = styled.div('wrapper');

export const Headline = styled.h2('headline');

export const MetaInformation = styled.div('meta-information');

export const MetaInformationItem = styled.div('meta-information-item');
