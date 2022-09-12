import { compose } from 'tailwind-compose';

export const Button = compose.button(() => [
  'text-white', //
  'bg-green-600',
  'hover:bg-green-700',
  'py-2',
  'px-6',
  'focus:outline-none',
]);
