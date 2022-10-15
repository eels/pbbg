import { compose } from 'tailwind-compose';
import type { InputHTMLAttributes } from 'react';

export const Wrapper = compose.div(() => [
  'flex',
  'flex-col',
  'gap-1',
  'w-full',
]);

export const Label = compose.label(() => [
  'block',
  'text-sm',
]);

export interface StyledInput extends InputHTMLAttributes<HTMLInputElement> {
  hasError: boolean;
}

export const Input = compose.input<StyledInput, HTMLInputElement>((conditional) => [
  'block',
  'border',
  'py-2',
  'px-4',
  'w-full',
  'focus:outline-none',
  conditional('border-neutral-400', ({ hasError }) => !hasError),
  conditional('border-red-600', ({ hasError }) => hasError),
  conditional('focus:border-green-700', ({ hasError }) => !hasError),
  conditional('focus:border-red-600', ({ hasError }) => hasError),
]);

export const Error = compose.div(() => [
  'text-sm',
  'text-red-600',
]);
