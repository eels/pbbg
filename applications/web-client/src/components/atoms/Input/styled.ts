import { compose } from 'tailwind-compose';

export const Wrapper = compose.div(() => [
  'flex', //
  'flex-col',
  'gap-1',
  'w-full',
]);

export const Label = compose.label(() => [
  'block', //
  'text-sm',
]);

export const Input = compose.input(() => [
  'block', //
  'border',
  'border-neutral-400',
  'py-2',
  'px-4',
  'w-full',
  'focus:outline-none',
  'focus:border-green-600',
]);
