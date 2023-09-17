import { compose } from 'tailwind-compose';

export const Wrapper = compose.div(() => [
  'text-sm',
  'font-medium',
  'text-red-500',
]);
