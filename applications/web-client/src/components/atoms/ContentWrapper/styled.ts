import { compose } from 'tailwind-compose';

export const Wrapper = compose.div(() => [
  'p-1', //
  'bg-neutral-500',
]);

export const Container = compose.div(() => [
  'p-2', //
  'bg-white/10',
]);
