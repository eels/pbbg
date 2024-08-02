import { compose } from 'tailwind-compose';

export interface StyledContainerProps {
  $type: 'content' | 'page';
}

const contentStyles = [
  'max-w-content',
];

const pageStyles = [
  'max-w-[calc(theme(spacing.page)+theme(spacing.8))]',
  'px-4',
];

export const Container = compose.div<StyledContainerProps>((conditional) => [
  'mx-auto',
  conditional(contentStyles, ({ $type }) => $type === 'content'),
  conditional(pageStyles, ({ $type }) => $type === 'page'),
]);
